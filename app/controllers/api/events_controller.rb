class Api::EventsController < Api::RestController

  def index
    #client = Google::APIClient.new
    #client.authorization.access_token = session[:token]
    #service = client.discovered_api('calendar', 'v3')
    #result = client.execute(
    #  :api_method => service.events.list,
    #  :parameters => {'calendarId' => 'bqh0i24famv71aaa84mneavovg@group.calendar.google.com'},
    #  :headers => {'Content-Type' => 'application/json'})
     
    #@events = result.data.items
    #respond_with @events
    @events = Event.get_events(current_user.id)
    respond_with @events
  end

  def create
    event = Event.create_event(create_params)
    event.save!
    Participant.create_part(event.id, event.group_id)
    respond_with(nil, :location => nil)
  end
  
  def participate
    part = Participant.change_participation(part_params, current_user.id)
    part.save!
    respond_with(nil, :location => nil)
  end

  def get_members
	@evemem = Participant.get_members(part_params)
    respond_with @evemem
  end

  private
    def create_params
      params.permit(:name, :description, :location, :date, :time, :group_id)
    end

    def part_params
      params.permit(:id, :accepted)
    end
end
