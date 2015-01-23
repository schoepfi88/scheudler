class Event < ActiveRecord::Base
	require 'json'

	belongs_to :group
	has_many :participants
	has_many :users, :through => :participants
	
#validates   :name, :description, :location, :date, :group_id
	attr_accessor :gcal_id
  	attr_accessor :title
	attr_accessor :endTime
	attr_accessor :color
	attr_accessor :text_color

	def to_json
		event = {
      'id' => self.gcal_id,
      'title' => self.name,
      'start' => self.start.strftime('%Y-%m-%d %H:%M:%S').to_datetime + 1/24.0,
      'end' => self.endTime.strftime('%Y-%m-%d %H:%M:%S').to_datetime + 1/24.0,
      'color' => self.color,
      'textColor' => self.text_color
    }
	end

	def convert_to_gcal_event
		event = {
		  'summary' => self.name,
		  'start' => { 'dateTime' => self.start.to_datetime.rfc3339},
		  'end' =>  { 'dateTime' => (self.start.to_datetime + 1/24.0).rfc3339},
		  'attendees' => [],
		  'location' => self.location,
		  'description' => self.description
		}
	end


	def self.create_event(params)
		event = Event.create(name: params[:name], description: params[:description], location: params[:location], start: (params[:start].to_datetime - 1/24.0), group_id: params[:group_id])
		event
	end

	def self.get_events(userid)
		returnList = []
		groups_of_user = Member.where(user_id: userid).pluck(:group_id)
		groups_of_user.each do |g|
			e = Event.where(group_id: g)
			#e.joins(:group)
			e.each do |e1|
				returnList << e1
			end
		end
		returnList
	end
end
