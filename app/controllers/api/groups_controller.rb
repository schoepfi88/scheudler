class Api::GroupsController < Api::RestController

    def index
		
    end

	def create
		group = Group.create_new_group(create_params, current_user.id)
		group.save!
		respond_with(group, :location => nil)
	end

	def update

	end

	def show
	
	end

	def destroy

	end

	private
	def create_params
		params.permit(:name, :description)
	end
end
