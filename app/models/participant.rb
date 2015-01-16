class Participant < ActiveRecord::Base
	belongs_to :users
	belongs_to :events
	
	def self.change_participation(event, user_id)
		part = Participant.where(:event_id => event[:id]).where(:user_id => user_id).first
		part.accepted = event[:accepted]
		part
	end

	def self.get_members(eventid)
		p = User.joins(:participants).where("users.id = participants.user_id AND participants.event_id = ? AND participants.accepted = true", eventid[:id])
		p
	end

	def self.create_part(event_id, group_id)
		group_members = Member.where(group_id: group_id).pluck(:user_id)
		group_members.each do |mem|
			Participant.create(user_id: mem, event_id: event_id)
		end
	end

	def self.create_user_charts(user_id, groups)
		user_data = [0, 0, 0]
		groups_data = []
		year_data = []
		month_count = []

		for i in 0..11
			month_count << [0, 0, 0]
		end
	
		#For each group
		groups.each do |g|
			#Get group events
			group_events = Event.where(:group_id => g.id)

			accepted = 0
			rejected = 0
			unanswered = 0
	
			#For each event
			group_events.each do |e|
				#Get participations of current user
				participations = e.participants.where(:user_id => user_id)
				#Count participations
				participations.each do |p|
					if p.accepted == nil
						unanswered += 1
						month_count[p.updated_at.month - 1][2] += 1
					elsif !p.accepted
						rejected += 1
						month_count[p.updated_at.month - 1][1] += 1
					else
						accepted += 1
						month_count[p.updated_at.month - 1][0] += 1
					end
				end
			end
		
			user_data[0] += accepted
			user_data[1] += rejected
			user_data[2] += unanswered

			if accepted + rejected + unanswered != 0
				groups_data << [g.name, accepted, rejected, unanswered]
			end
		end

		for i in 0..11
			year_data << ['2015-' + (i + 1).to_s, month_count[i][0], month_count[i][1], month_count[i][2]]
		end

		response = []
		response << user_data
		response << groups_data
		response << year_data
		response
	end

	def self.create_group_charts(user_id, group_id)
		user_data = [0, 0, 0]
		groups_data = []
		year_data = []
		month_count = []

		for i in 0..11
			month_count << [0, 0, 0]
		end
	
		#For each group
		g = Group.find(group_id)
		#Get group events
		group_events = Event.where(:group_id => g.id)

		members = g.members

		members.each do |m|

			accepted = 0
			rejected = 0
			unanswered = 0

			#For each event
			group_events.each do |e|
				#Get participations of current user
				participations = e.participants.where(:user_id => m.user_id)
				#Count participations
				participations.each do |p|
					if p.accepted == nil
						unanswered += 1
						if m.user_id == user_id then
							month_count[p.updated_at.month - 1][2] += 1
						end
					elsif !p.accepted
						rejected += 1
						if m.user_id == user_id then
							month_count[p.updated_at.month - 1][1] += 1
						end
					else
						accepted += 1
						if m.user_id == user_id then
							month_count[p.updated_at.month - 1][0] += 1
						end
					end
				end
			end
	
			if m.user_id == user_id then
				user_data[0] += accepted
				user_data[1] += rejected
				user_data[2] += unanswered
			end

			if accepted + rejected + unanswered != 0
				groups_data << [User.find(m.user_id).name, accepted, rejected, unanswered]
			end
		end

		groups_data.sort! { |a,b| b[1] <=> a[1] }

		for i in 0..11
			year_data << ['2015-' + (i + 1).to_s, month_count[i][0], month_count[i][1], month_count[i][2]]
		end

		response = []
		response << user_data
		response << groups_data[0,5]
		response << year_data
		response
	end
end
