class Event < ActiveRecord::Base
	require 'json'

	belongs_to :group
	has_many :participants
	has_many :users, :through => :participants
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
#validates   :name, :description, :location, :date, :group_id


	def self.create_event(params)
		event = Event.create(name: params[:name], description: params[:description], location: params[:location], date: params[:date], time: params[:time], group_id: params[:group_id])
		event
	end

	def self.get_events(userid)
		returnList = []
		groups_of_user = Member.where(user_id: userid).pluck(:group_id)
		groups_of_user.each do |g|
			e = Event.where(group_id: g)
			e.each do |e1|
				returnList << e1
			end
		end
		returnList
	end
end
