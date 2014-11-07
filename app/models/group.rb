class Group < ActiveRecord::Base
	has_many :users, class_name: "User", foreign_key: "user_id"
	has_many :users, class_name: "User", foreign_key: "admin_id"
	validates   :name, :description, :admin_id, presence: true

	def self.create_new_group(params, admin_id)
		g = Group.new()
		g.name = params[:name]
		g.description = params[:description]
		g.admin_id = admin_id
		g
	end
end
