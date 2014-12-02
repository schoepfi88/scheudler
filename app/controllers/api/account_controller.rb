class Api::AccountController < Api::RestController

	def update
		User.update(update_params)
		respond_with(nil, :location => nil)
	end

	def destroy
		
	end

	private
	def update_params
		params.permit(:id, :back_link_enabled)
	end
end
