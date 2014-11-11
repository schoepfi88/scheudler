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
	@groups = Group.all
  end

  def groups_create
  end

  def groups_dashboard
	@group = Group.find(params[:id])
  end

  def statistic
  end

  def account
  end

end
