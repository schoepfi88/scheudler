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
    event.group_id = 1
    event.save!
    respond_with(nil, :location => nil)
  end
  
  def participate
    part = Participants.create_participation(part_params, current_user.id)
    part.save!
    respond_with(nil, :location => nil)
  end

  def reject


  end

  private
    def create_params
      params.permit(:name, :description, :location, :date, :time, :group_id)
    end

    def part_params
      params.permit(:id)
    end
end