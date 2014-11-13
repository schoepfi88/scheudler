class TemplatesController < ProtectedController
 layout false, except: [:index]

  def index
  end

  def dashboard
  end

  def calendar
  end

  def events
  end

  def groups
	@groups = Group.joins(:members).where(members: {user_id: current_user.id})
  end

  def groups_create
  end

  def groups_dashboard
	@group = Group.find(params[:id])
	#@is_admin = if current_user.id == @group.admin_id then true else false end
	@is_admin = false
	@group.admins.each do |admin|
		@is_admin = if current_user.id == admin.user_id then true end
	end
	@is_member = false
	@group.members.each do |member|
		@is_member = if current_user.id == member.user_id then true end
	end
  end

  def statistic
  end

  def account
  end

end
