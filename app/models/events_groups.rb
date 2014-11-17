class EventsGroups < ActiveRecord::Base
	belongs_to :groups
	belongs_to :events
end
