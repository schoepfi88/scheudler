class Group < ActiveRecord::Base
	validates   :name, :description, presence: true

	has_many :users
	has_many :admins
end
