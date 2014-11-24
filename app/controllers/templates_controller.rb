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
	@groups = Group.joins(:members).where(members: {user_id: @current_user.id})
  end

  def groups_create
	if @current_user.provider != "google_oauth2" then
		flash[:alert] = t('.cant_create_group')
		#redirect_to templates_groups_template_path
		redirect_to url_for(:controller => :templates, :action => :groups)
		#render action: 'groups'
		#redirect_to "/#/groups"
	end
  end

  def groups_dashboard
	@is_admin = false
	if @group.admins.find_by(user_id: @current_user.id) != nil then
		@is_admin = true
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
	if @group.members.find_by(user_id: @current_user.id) == nil then
		render action: 'dashboard' 
	end
  end
end
