class Participants < ActiveRecord::Base
	belongs_to :users
	belongs_to :events


	def self.create_participation(event, user_id)
		part = Participants.create(event_id: event[:id], user_id: user_id)
		part
	end

	def self.get_members(eventid)
		p = Participants.all
		p
	end
end
