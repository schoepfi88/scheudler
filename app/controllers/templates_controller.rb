class TemplatesController < ProtectedController
  layout false, except: [:index]
  before_action :is_group_member, only: [:groups_dashboard, :groups_invite, :groups_members, :statistic_groups]
  before_action :is_group_admin, only: [:groups_settings]
  before_action :is_admin_var, only: [:groups_dashboard, :groups_members]
  before_action :is_google_user, only: [:groups, :groups_create, :friends, :dashboard]
  before_action :get_user_groups, only: [:events, :events_create, :statistic, :groups]

  def index
  end

  def dashboard
  end

  def calendar
  end

  def events
  	@event = Event.get_events(@current_user.id)
  end

  def events_create
  end

  def events_dashboard
  	@event = Event.find(params[:id])
  end

  def events_location
	@event = Event.find(params[:id])
  end

  def groups
  end

  def groups_create
	if !@is_google_user then
		#redirect_to templates_account_template_path, :alert => t('.cant_create_group')
		redirect_to templates_dashboard_template_path
	end
  end

  def groups_dashboard
  end

  def groups_members
	@friends = @current_user.friends
	@group_members = User.joins(:members).where(members: {group_id: @group.id})
  end

  def groups_invite
	@friends = []
	@current_user.friends.each do |f|
		u = User.find(f.friend_id)
		if @group.members.where(user_id: u.id).size == 0 then
			tmp = []
			tmp << u.id
			tmp << u.name
			tmp << u.email
			@friends << tmp
		end
	end
  end

  def groups_settings
  end

  def statistic
	response = Participant.create_user_charts(@current_user.id, @groups)
	@user_data = response[0]
	@groups_data = response[1]
	@year_data = response[2]
  end

  def statistic_groups
	response = Participant.create_group_charts(@current_user.id, params[:id])
	@user_data = response[0]
	@groups_data = response[1]
	@year_data = response[2]
  end

  def friends
	@friends = @current_user.friends
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

  def get_user_groups
	@groups = Group.joins(:members).where(members: {user_id: @current_user.id})
  end
end
