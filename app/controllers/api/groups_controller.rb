class Api::GroupsController < Api::RestController

    def index
		
    end

	def create
		group = Group.create_new_group(create_params, current_user.id)
		group.save!
		respond_with(nil, :location => nil)
	end

	def update

	end

	def show
	
	end

	def destroy
		Group.delete_group(destroy_params)
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

	def invite_params
		params.permit(:email, :group_id)
	end
end
