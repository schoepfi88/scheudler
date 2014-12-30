class Api::GroupsController < Api::RestController
	include CalendarModule

    def index
		
    end

	def create
		group = Group.create_new_group(create_params, current_user.id, create_cal(params[:name]))
		group.save!
		respond_with(nil, :location => nil)
	end

	def update

	end

	def show
	
	end

	def destroy
		gcal_id = Group.delete_group(destroy_params)
		delete_cal(gcal_id)
		respond_with(nil, :location => nil)
	end

	def remove
		Group.remove_member(remove_params)
		respond_with(nil, :location => nil)
	end

	def invite
		Member.add_member(invite_params)
		respond_with(nil, :location => nil)
	end

	private
	def create_params
		params.permit(:name, :description, :icon)
	end

	def destroy_params
		params.permit(:id)
	end

	def remove_params
		params.permit(:group_id, :user_id)
	end

	def invite_params
		params.permit(:email, :group_id)
	end
end
