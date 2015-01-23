class Friend < ActiveRecord::Base
	belongs_to :users

	def self.make_friend(user_id, params)
		if Friend.where(user_id: user_id, friend_id: params[:friend_id]).size == 0 then
			f = Friend.create(user_id: user_id, friend_id: params[:friend_id])
			f.save!
			f
		else
			nil
		end
	end
end
