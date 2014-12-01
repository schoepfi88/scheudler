class Event < ActiveRecord::Base
	belongs_to :group
	has_many :participants
	has_many :users, :through => :participants
end
