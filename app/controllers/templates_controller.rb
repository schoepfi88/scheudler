class TemplatesController < ProtectedController
  layout false, except: [:index]
  before_action :is_group_member, only: [:groups_dashboard, :groups_invite, :groups_members]
  before_action :is_group_admin, only: [:groups_settings]
  before_action :is_admin_var, only: [:groups_dashboard, :groups_members]
  before_action :is_google_user, only: [:groups, :groups_create, :account, :dashboard]
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
  #@event_members = Participants.get_members(params[:id])
  end

  def groups
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
	@user_data = [0, 0, 0]
	@groups_data = []
	@year_data = []
	month_count = []

	for i in 0..11
		month_count << [0, 0, 0]
	end
	
	#For each group
	@groups.each do |g|
		#Get group events
		group_events = Event.where(:group_id => g.id)

		accepted = 0
		rejected = 0
		unanswered = 0
	
		#For each event
		group_events.each do |e|
			#Get participations of current user
			participations = e.participants.where(:user_id => @current_user.id)
			#Count participations
			participations.each do |p|
				if p.accepted == nil
					unanswered += 1
					month_count[p.updated_at.month - 1][2] += 1
				elsif !p.accepted
					rejected += 1
					month_count[p.updated_at.month - 1][1] += 1
				else
					accepted += 1
					month_count[p.updated_at.month - 1][0] += 1
				end
			end
		end
		
		@user_data[0] += accepted
		@user_data[1] += rejected
		@user_data[2] += unanswered

		if accepted + rejected + unanswered != 0
			@groups_data << [g.name, accepted, rejected, unanswered]
		end
	end

	for i in 0..11
		@year_data << ['2015-' + (i + 1).to_s, month_count[i][0], month_count[i][1], month_count[i][2]]
	end

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

  def get_user_groups
	@groups = Group.joins(:members).where(members: {user_id: @current_user.id})
  end
end
