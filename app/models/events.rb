class Events < ActiveRecord::Base
	has_many :participants
	has_many :events_groups
	has_many :users, :through => :participants
	has_many :group, :through => :events_groups
end
