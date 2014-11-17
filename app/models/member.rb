class Member < ActiveRecord::Base
	belongs_to :groups
	belongs_to :users

	def self.add_member(params)
		params[:email].delete(' ').split(';').each do |email|
			user = User.find_by email: email
			if user != nil then
				#add to group if isn't member already
				if(user.members.where(group_id: params[:group_id], user_id: user.id).size == 0) then
					m = Member.create(group_id: params[:group_id], user_id: user.id)
					m.save!
				end
			end
		end
	end
end
