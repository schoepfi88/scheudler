class Api::DashboardController < ApplicationController
	require 'gcm'	
	respond_to :json
	$max_messages = 7
	$max_messages_all = 25
	def get_groups
		groups = Member.where(user_id: current_user.id).pluck(:group_id)
		@mygroups = Array.new
		groups.each do |i|
			tmp = Group.new
			tmp = Group.where(id: i).first
			@mygroups << tmp
		end
		@mygroups
	end

	def create
		gcm = GCM.new(ENV['GCM_API'])
		registration_ids= ["APA91bFNkjbijIP8-5G7R8j7w-FvFVWiFWhzzbPS8vcthMYA2G9h7eY9xjQQJAmfI9iCv7f1zmS6VlABI0qPlrIbuY3SUeYlBYZWLnouS-pJbnOuryE4boyFbOIlhI39Vj-HEfCWCBbch9ApiTwv-i-AEpwoIezPqCmHARD886XCHbDKNzzR9Fk"] 
		@mes = Message.new(mes_params)
		@mes.sender_id = current_user.id
		@mes.created_at = Message.calcTime()
		@mes.readers = [current_user.id]
		options = {data: {title: current_user.name, message: mes_params[:text]}, collapse_key: "updated_score"}
		response = gcm.send(registration_ids, options)
		@mes.save!
	end

	def get_regId
		u = User.where(name: "Christoph Schöpf").first
		u.regId = params[:regId]
		u.save!
		respond_with(nil, :location => nil)
	end

	def get_messages
		@messages = []
		different_groups = Member.where(user_id: current_user.id).pluck(:group_id)
		different_groups.each do |g|
			group_messages = Message.where(receiver_id: g)
			#sort that actuall messages are at the bottom
			group_messages.sort! { |a,b| a.created_at <=> b.created_at }
			# only last 7
			if group_messages.length > $max_messages
				number = $max_messages - group_messages.length
				group_messages = group_messages.drop(number.abs)
			end
			# set readers
			group_messages.each do |m|
				if !m.readers.include?(current_user.id) 
                    	m.readers = m.readers + [current_user.id]
                    	m.save!
                	end
			end
			@messages << group_messages
		end
		@messages
	end

	def get_all
		group_id = params[:group_id]
		@messages_all = Message.where(receiver_id: group_id)
		@messages_all.sort! { |a,b| a.created_at <=> b.created_at }
		# set readers
		@messages_all.each do |m|
			if !m.readers.include?(current_user.id) 
               	m.readers = m.readers + [current_user.id]
               	m.save!
           	end
		end
		# only last $max_messages_all
		if @messages_all.length > $max_messages_all
			number = $max_messages_all - @messages_all.length
			@messages_all = @messages_all.drop(number.abs)
		end
		@messages_all
	end

	def unread
		group_counter = []
		group_counter_undisplayed = []
		last_mes_ids = []
		different_groups = Member.where(user_id: current_user.id).pluck(:group_id)
		different_groups.each do |g|
			counter = 0
			undisplayed = 0
			group_messages = Message.where(receiver_id: g)
			group_messages.each do |m|
				len = group_messages.length
				displayed = len - $max_messages
				if !m.readers.include?(current_user.id) && group_messages.index(m) > (displayed - 1)
                    	counter += 1
                	end
			end
			group_messages.sort! { |a,b| a.created_at <=> b.created_at }
			if (group_messages.length > 0)
				last_mes_ids << group_messages.last.id
			else
				last_mes_ids << -1
			end
			# count undisplayed messages
			group_messages.each do |m|
				len = group_messages.length
				displayed = len - $max_messages
				if len > displayed
					if !m.readers.include?(current_user.id) && (group_messages.index(m) <= (displayed - 1))
						undisplayed += 1
					end
				end
			end
			group_counter << counter
			group_counter_undisplayed << undisplayed
		end
		respond_with({unread: group_counter, last_mes: last_mes_ids, undisplayed: group_counter_undisplayed})
	end

	def get_invites
		@all_invites = []
		groups_of_user = Member.where(user_id: current_user.id).pluck(:group_id)
		groups_of_user.each do |g|
			e = Event.where(group_id: g)
			e.each do |e1|
				check = Participant.where(user_id: current_user.id, event_id: e1.id).first
				if check != nil
					if check.accepted == nil 
						@all_invites << e1
					end
				end

			end
		end
		@all_invites
	end

	def get_events
		@all_events = []
		groups_of_user = Member.where(user_id: current_user.id).pluck(:group_id)
		groups_of_user.each do |g|
			e = Event.where(group_id: g)
			e.each do |e1|
				check = Participant.where(user_id: current_user.id, event_id: e1.id).first
				if check != nil
					if check.accepted == true 
						@all_events << e1
					end
				end
			end
		end
		@all_events
	end

	def accepted
		part = Participant.where(user_id: current_user.id, event_id: acc_params[:eve_id]).first
		part.accepted = acc_params[:bool]
		part.save!
		redirect_to :back
	end

	private
	def mes_params
		params.permit(:sender_id, :receiver_id, :text, :readers)
	end

	private
	def acc_params
		params.permit(:bool, :eve_id)
	end

	private
	def reg_params
		params.permit(:regId)
	end
end
