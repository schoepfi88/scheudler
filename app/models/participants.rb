class Participants < ActiveRecord::Base
	belongs_to :users
	belongs_to :events
	delegate :name, :to => :users


	def self.change_participation(event, user_id)
		part = Participants.where(:event_id => event[:id]).where(:user_id => user_id).first
		part.accepted = event[:accepted]
		part
	end

	def self.get_members(eventid)
	#	returnlist = []
		p = Participants.where(:event_id == eventid[:id]).where(:accepted => 'true')
	#	p
	#	p.each do |p|
	#		returnlist << User.find(:id == p.user_id).pluck(:name)
	#	end
	#	returnlist
		p
	end

	def self.create_part(event_id, group_id)
		group_members = Member.where(group_id: group_id).pluck(:user_id)
		group_members.each do |mem|
			Participants.create(user_id: mem, event_id: event_id)
		end
	end
end
