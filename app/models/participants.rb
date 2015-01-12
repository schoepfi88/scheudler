class Participants < ActiveRecord::Base
	belongs_to :users
	belongs_to :events


	def self.create_participation(event, user_id)
		part = Participants.create(event_id: event[:id], user_id: user_id)
		part
	end

	def self.create_part(event_id, group_id)
		group_members = Member.where(group_id: group_id).pluck(:user_id)
		group_members.each do |mem|
			Participants.create(user_id: mem, event_id: event_id)
		end
	end
end