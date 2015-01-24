class Api::FriendsController < Api::RestController

	def make_friend
		Friend.make_friend(@current_user.id, friend_params)
		respond_with(nil, :location => nil)
	end

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

	def friend_params
		params.permit(:friend_id)
	end
end
