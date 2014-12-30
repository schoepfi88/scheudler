class Api::EventController < Api::RestController
	require 'google/api_client'
	
	API_VERSION = 'v3'
  CALENDAR_ID = 'bqh0i24famv71aaa84mneavovg@group.calendar.google.com'
   
  def index  
		init_calendar
   
    events = gcal_events_get(CALENDAR_ID)
		
		out = Array.new

		events.each do |event|
			ev = Event.new
			ev.gcal_id = event.id
			ev.name = event.summary
			ev.start = event.start
			ev.end = event.end

			out.push(ev.to_json)
		end

    respond_with out
  end

private
	def gcal_events_get(gcal_id)
		params = {
      calendarId: gcal_id
    }
    result = @client.execute(
      :api_method => @calendar.events.list,
      :parameters => params,
      :headers => {'Content-Type' => 'application/json'}
		)
		return result.data.items
	end

	def gcal_event_insert(gcal_id, event)
		params = {
      calendarId: gcal_id
    }
    result = @client.execute(
      :api_method => @calendar.events.insert,
      :parameters => params,
      :body_object => event.convert_to_gcal_event
    )
	end

	def gcal_event_update(gcal_id, event)
    params = {
      calendarId: gcal_id,
      eventId: event.gcal_id
    }
    result = @client.execute(
      :api_method => calendar.events.update,
      :parameters => params,
      :body_object => event.convert_to_gcal_event
    )
  end

	def gcal_event_delete(gcal_id, event_id)
    params = {
      calendarId: gcal_id,
      eventId: event_id
    }
    result = @client.execute(
      :api_method => @calendar.events.delete,
      :parameters => params
    )
  end

	def gcal_calendar_list
		result = @client.execute(
      :api_method => @calendar.calendar_list.list
    )
		return result.data.items
	end

	def gcal_calendar_create(group_name)
		cal = {
			"kind" => "calendar#calendar",
			"summary" => "Scheudler " + group_name + " Calendar",
			"description" =>"Scheudler group calendar",
			"timeZone" => "Europe/Vienna"
		}
		result = @client.execute(
		  :api_method => @calendar.calendars.insert,
		  :body_object => cal
		)
		return result.data.id
	end

	def gcal_acl_list(gcal_id)
		params = {
      calendarId: gcal_id
    }
    result = @client.execute(
      :api_method => @calendar.acl.list,
      :parameters => params
    )
		return result.data.items
	end
 
  def init_calendar
		@client = Google::APIClient.new(
			:application_name => 'Scheudler',
			:application_version => '1.0.0'
		)
    @client.authorization.access_token = session[:token]
		@calendar = @client.discovered_api('calendar', API_VERSION)
  end

end
