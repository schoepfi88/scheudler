class Api::GroupsController < Api::RestController
	include CalendarModule

    def index
		
    end

	def get
		group = Group.get_group(destroy_params)
		respond_with(group)
	end

	def create
		group = Group.create_new_group(create_params, current_user.id, create_cal(params[:name]))
		group.save!
		respond_with(nil, :location => nil)
	end

	def update
		Group.update_group(params[:id], update_params)
		respond_with(nil, :location => nil)
	end

	def show
	
	end

	def destroy
		gcal_id = Group.delete_group(destroy_params)
		delete_cal(gcal_id)
		respond_with(nil, :location => nil)
	end

	def remove
		init_calendar
		gcal_id = Group.find(params[:group_id]).calendar_id
		u = User.find(params[:user_id])
		
		if u.provider == 'google_oauth2' then
			gcal_acl_delete(gcal_id, u.email)
		end
				
		Group.remove_member(member_params)
		respond_with(nil, :location => nil)
	end

	def make_admin
		u = User.find(params[:user_id])
		
		if u.provider == 'google_oauth2' then
			Group.make_admin(member_params)
			init_calendar
			gcal_id = Group.find(params[:group_id]).calendar_id
			gcal_acl_delete(gcal_id, u.email)
			gcal_acl_add_owner(gcal_id, u.email)
		end
		
		respond_with(nil, :location => nil)
	end

	def invite
		
		user_to_add = Member.add_member(invite_params, params[:_json])
		
		if user_to_add != nil then
			init_calendar
			gcal_id = Group.find(params[:group_id]).calendar_id
			
			user_to_add.each do |email|
				gcal_acl_add_reader(gcal_id, email)
			end
		end
		respond_with(nil, :location => nil)
	end

	private
	def create_params
		params.permit(:name, :description, :icon)
	end

	def destroy_params
		params.permit(:id)
	end

	def member_params
		params.permit(:group_id, :user_id)
	end

	def invite_params
		params.permit(:group_id)
	end

	def update_params
		params.permit(:name, :description, :icon);
	end
end
