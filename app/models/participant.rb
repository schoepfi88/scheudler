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
end
