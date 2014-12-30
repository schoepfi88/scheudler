class Event < ActiveRecord::Base
	require 'json'

	belongs_to :group
	has_many :participants
	has_many :users, :through => :participants
	attr_accessor :gcal_id
  attr_accessor :title
	attr_accessor :start
	attr_accessor :end
	attr_accessor 

	def to_json
		event = {
      'id' => self.gcal_id,
      'title' => self.name,
      'start' => self.start.dateTime.strftime('%Y-%m-%d %H:%M:%S'),
      'end' => self.end.dateTime.strftime('%Y-%m-%d %H:%M:%S')
    }
	end

  def convert_to_gcal_event
    event = {
      'summary' => self.name,
      'start' => self.start,
      'end' =>  self.end
    }
  end
end
