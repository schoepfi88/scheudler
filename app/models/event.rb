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
		if self.endTime.nil? then
			self.endTime = self.start.to_datetime.advance(:hours => 1)
		end
		event = {
      'title' => self.name,
      'start' => self.start.to_datetime.new_offset(Rational(1, 24)),
      'end' => self.endTime.to_datetime.new_offset(Rational(1, 24)),
      'color' => self.color,
      'textColor' => self.text_color
    }
	end

	def convert_to_gcal_event
		event = {
		  'summary' => self.name,
		  'start' => { 'dateTime' => self.start.to_datetime.rfc3339},
		  'end' =>  { 'dateTime' => (self.start.to_datetime.advance(:hours => 1)).rfc3339},
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
		bg_color = ['#3465A4', '#f57900', '#4e9a06', '#cc0000', '#75507b', '#edd400']
		fg_color = ['white', 'white', 'black', 'white', 'white', 'black']
		
		returnList = []
		groups_of_user = Member.where(user_id: userid).pluck(:group_id)
		groups_of_user.each_with_index do |g, index|
			e = Event.where(group_id: g)
			e.each do |e1|
				now = Time.new.to_s 
				if now.to_s < e1.start.to_s
					e1.color = bg_color[index % bg_color.length]
					e1.text_color = fg_color[index % fg_color.length]
					returnList << e1
				end
			end
		end
		returnList.sort! { |a,b| a.start <=> b.start }
	end
end
