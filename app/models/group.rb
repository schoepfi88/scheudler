class Group < ActiveRecord::Base
	has_many :admins
	has_many :members
	has_many :events_groups
	has_many :events, :through => :events_groups
	has_many :users, :through => :members
	has_many :users, :through => :admins
	validates   :name, :description, presence: true

	def self.create_new_group(params, admin_id)
		g = Group.create(name: params[:name], description: params[:description], icon: params[:icon].split(' ').last)
		a = Admin.create(group_id: g.id, user_id: admin_id)
		a.save!
		m = Member.create(group_id: g.id, user_id: admin_id)
		m.save!
		g
	end
end
