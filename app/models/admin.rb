class Admin < ActiveRecord::Base
	belongs_to :groups
	belongs_to :users
end
