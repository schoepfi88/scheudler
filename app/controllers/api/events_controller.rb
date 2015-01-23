class Api::EventsController < Api::RestController
	include CalendarModule

   respond_to :json

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
    @events
  end

  def create
    key = ENV["GOOGLE_GCM_API_KEY"]
    gcm = GCM.new(key)
    group_id = create_params[:group_id]

    registration_ids=[]
    group_members = Member.where(group_id: group_id).pluck(:user_id)
    # add regId of group members
    group_members.each do |u|
      # don't send to sender
      if u != current_user.id
        member = User.find(u)
        # only if regId exist
        if member.regId != nil
          registration_ids << member.regId
        end
      end
    end
	
	init_calendar
	gcal_id = Group.find(group_id).calendar_id
    event = Event.create_event(create_params)
	gcal_event_insert(gcal_id, event)
    title = "New Event: " + event.name
    mess = event.start.to_s + event.name.to_s
    event.save!
    options = {data: {title: event.name, message: mess}, collapse_key: "updated_score"}
    response = gcm.send(registration_ids, options)
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
      params.permit(:name, :description, :location, :start, :end, :group_id)
    end

    def part_params
      params.permit(:id, :accepted)
    end
end
