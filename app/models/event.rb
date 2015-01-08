class Event < ActiveRecord::Base
	belongs_to :group
	has_many :participants
	has_many :users, :through => :participants
	#validates   :name, :description, :location, :date, :group_id


	def self.create_event(params)
		event = Event.create(name: params[:name], description: params[:description], location: params[:location], date: params[:date], time: params[:time], group_id: params[:group_id])
		event
	end

	def self.get_events(userid)
		returnList = []
		buffer = []
		members = Member.all
		members.each do |m|
			if m.user_id == userid
				buffer << m.group_id
			end
		end
		events = Event.all
		events.each do |e|
			buffer.each do |b|
				if e.group_id == b
					returnList << e
				end
			end
		end
		returnList
	end
end
