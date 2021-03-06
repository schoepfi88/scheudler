class Group < ActiveRecord::Base
	has_many :admins
	has_many :members
	has_many :events
	has_many :users, :through => :members
	has_many :users, :through => :admins
	has_many    :receivedMessages, :class_name => 'Message', :foreign_key => 'receiver_id'
	validates   :name, :description, :calendar_id, presence: true

	def self.get_group(params)
		g = Group.find(params[:id])
		g
	end

	def self.update_group(id, params)
		g = Group.find(id)
		g.name = params[:name]
		g.description = params[:description]
		g.icon = params[:icon]
		g.save!
		g
	end

	def self.create_new_group(params, admin_id, cal_id)
		g = Group.create(name: params[:name], description: params[:description], icon: params[:icon].split(' ').last, calendar_id: cal_id)
		a = Admin.create(group_id: g.id, user_id: admin_id)
		a.save!
		m = Member.create(group_id: g.id, user_id: admin_id)
		m.save!
		g
	end

	def self.delete_group(params)
		g = Group.find(params[:id])
		g.receivedMessages.destroy_all
		gcal_id = g.calendar_id
		g.members.destroy_all
		g.admins.destroy_all
		g.events.destroy_all
		g.destroy
		nil
		return gcal_id
	end

	def self.remove_member(params)
		member = Member.where(:group_id => params[:group_id]).where(:user_id => params[:user_id])

		#delete dummy user if not member in any other group
		member.each do |m|
			u = User.find(m.user_id)
			m.destroy
			if u.name == "dummy" and u.members.size == 0 then
				u.destroy
			end
		end
		nil
	end

	def self.make_admin(params)
		Admin.create(group_id: params[:group_id], user_id: params[:user_id])
		nil
	end
end
