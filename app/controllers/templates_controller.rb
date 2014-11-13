class TemplatesController < ProtectedController
  layout false, except: [:index]
  before_action :is_group_member, only: [:groups_dashboard, :groups_invite]

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
	@is_admin = false
	@group.admins.each do |admin|
		@is_admin = if current_user.id == admin.user_id then true end
	end
	
	@is_member = false
	@group.members.each do |member|
		@is_member = if current_user.id == member.user_id then true end
	end
  end

  def groups_invite
  end

  def statistic
  end

  def account
  end

  private

  def is_group_member
	@group = Group.find(params[:id])

	#redirect to dashboard if not in group
	if @group.members.find_by(user_id: current_user.id) == nil then
		render action: 'dashboard' 
	end
  end
end
