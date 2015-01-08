class Api::DashboardController < ApplicationController
	respond_to :json
	$max_messages = 7
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
		@mes = Message.new(mes_params)
		@mes.sender_id = current_user.id
		@mes.created_at = Message.calcTime()
		@mes.readers = [current_user.id]
		@mes.save!
	end

	def get_messages
		@messages = []
		different_groups = Member.where(user_id: current_user.id).pluck(:group_id)
		different_groups.each do |g|
			group_messages = Message.where(receiver_id: g)
			#sort that actuall messages are at the bottom
			group_messages.sort! { |a,b| a.created_at <=> b.created_at }
			# only last 10
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

	private
	def mes_params
		params.permit(:sender_id, :receiver_id, :text, :readers)
	end
end
