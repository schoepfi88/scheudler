class TemplatesController < ProtectedController
  layout false, except: [:index]
  before_action :is_group_member, only: [:groups_dashboard, :groups_invite, :groups_members]

  def index
  end

  def dashboard
  end

  def calendar
  end

  def events
  end

  def groups
	@groups = Group.joins(:members).where(members: {user_id: @current_user.id})
  end

  def groups_create
	if @current_user.provider != "google_oauth2" then
		redirect_to templates_account_template_path, :alert => t('.cant_create_group')
	end
  end

  def groups_dashboard
	@is_admin = false
	if @group.admins.find_by(user_id: @current_user.id) != nil then
		@is_admin = true
	end
  end

  def groups_members
	@group_members = User.joins(:members).where(members: {group_id: @group.id})
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
	if @group.members.find_by(user_id: @current_user.id) == nil then
		render action: 'dashboard' 
	end
  end
end
