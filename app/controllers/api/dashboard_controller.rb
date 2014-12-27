class Api::DashboardController < ApplicationController

	def get_groups
		groups = Member.where(user_id: current_user.id).pluck(:group_id)
		@mygroups = Array.new
		groups.each do |i|
			tmp = Group.new
			tmp = Group.where(id: i).first
			@mygroups << tmp
		end
		@mygroups
	end

	def create
		@mes = Message.new(mes_params)
		@mes.sender_id = current_user.id
		@mes.save
	end

	def get_messages
		@messages = Message.all
	end



	private
	def mes_params
		params.permit(:sender_id, :receiver_id, :text, :readers)
	end
end
