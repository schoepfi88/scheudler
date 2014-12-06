class Api::EventController < Api::RestController
   
  def index
    client = Google::APIClient.new
    client.authorization.access_token = session[:token]
    service = client.discovered_api('calendar', 'v3')
    result = client.execute(
      :api_method => service.events.list,
      :parameters => {'calendarId' => 'bqh0i24famv71aaa84mneavovg@group.calendar.google.com'},
      :headers => {'Content-Type' => 'application/json'})
     
    @events = result.data.items
    respond_with @events
  end
end