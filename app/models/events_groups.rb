class EventsGroups < ActiveRecord::Base
	belongs_to :group
	belongs_to :events
end
