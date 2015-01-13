class TemplatesController < ProtectedController
  layout false, except: [:index]
  before_action :is_group_member, only: [:groups_dashboard, :groups_invite, :groups_members]
  before_action :is_group_admin, only: [:groups_settings]
  before_action :is_admin_var, only: [:groups_dashboard, :groups_members]
  before_action :is_google_user, only: [:groups, :groups_create, :account, :dashboard]

  def index
  end

  def dashboard
  end

  def calendar
  end

  def events
  @event = Event.get_events(@current_user.id)
  @groups = Group.joins(:members).where(members: {user_id: @current_user.id})
  end

  def events_create
  @groups = Group.joins(:members).where(members: {user_id: @current_user.id})
  end

  def events_dashboard
  #@event_members = Participants.get_members(params[:id])
  end

  def groups
	@groups = Group.joins(:members).where(members: {user_id: @current_user.id})
  end

  def groups_create
	if !@is_google_user then
		#redirect_to templates_account_template_path, :alert => t('.cant_create_group')
		redirect_to templates_account_template_path
	end
  end

  def groups_dashboard
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
	if @group == nil || @group.members.find_by(user_id: @current_user.id) == nil then
		render action: 'dashboard'
	end
  end

  def is_group_admin
	@group = Group.find(params[:id])

	#redirect to dashboard if not in group
	if @group == nil || @group.admins.find_by(user_id: @current_user.id) == nil then
		render action: 'dashboard'
	end
  end

  def is_admin_var
	@is_admin = false
	if @group.admins.find_by(user_id: @current_user.id) != nil then
		@is_admin = true
	end
  end

  def is_google_user
	@is_google_user = true
	if @current_user.provider != "google_oauth2" then
		@is_google_user = false;
	end
  end
end
