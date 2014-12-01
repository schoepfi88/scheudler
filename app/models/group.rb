class Group < ActiveRecord::Base
	has_many :admins
	has_many :members
	has_many :events
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

	def self.delete_group(params)
		g = Group.find(params[:id])
		g.members.destroy_all
		g.admins.destroy_all
		g.events.destroy_all
		g.destroy
		nil
	end

	def self.remove_member(params)
		Member.where(:group_id => params[:group_id]).where(:user_id => params[:user_id]).destroy_all
		nil
	end
end
