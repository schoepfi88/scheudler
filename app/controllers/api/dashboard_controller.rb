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
		@mes.created_at = Message.calcTime()
		@mes.save
	end

	def get_messages
		@messages = []
		different_groups = Member.where(user_id: current_user.id).pluck(:group_id)
		different_groups.each do |g|
			group_messages = Message.where(receiver_id: g)
			#sort that actuall messages are at the bottom
			group_messages.sort! { |a,b| a.created_at <=> b.created_at }
			# only last 10
			if group_messages.length > 10
				number = 10 - group_messages.length
				group_messages = group_messages.drop(number.abs)
			end
			@messages << group_messages
		end
		@messages
	end



	private
	def mes_params
		params.permit(:sender_id, :receiver_id, :text, :readers)
	end
end
