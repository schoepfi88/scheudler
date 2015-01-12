class Event < ActiveRecord::Base
	require 'json'

	belongs_to :group
	has_many :participants
	has_many :users, :through => :participants
	
#validates   :name, :description, :location, :date, :group_id
	attr_accessor :gcal_id
  attr_accessor :title
	attr_accessor :start
	attr_accessor :end
	attr_accessor :color
	attr_accessor :text_color

	def to_json
		event = {
      'id' => self.gcal_id,
      'title' => self.name,
      'start' => self.start.dateTime.strftime('%Y-%m-%d %H:%M:%S'),
      'end' => self.end.dateTime.strftime('%Y-%m-%d %H:%M:%S'),
      'color' => self.color,
      'textColor' => self.text_color
    }
	end

  def convert_to_gcal_event
    event = {
      'summary' => self.name,
      'start' => self.start,
      'end' =>  self.end
    }
  end


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
