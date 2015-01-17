module CalendarModule

	API_VERSION = 'v3'
  CALENDAR_ID = 'bqh0i24famv71aaa84mneavovg@group.calendar.google.com'

  def init_calendar
		init_calendar_token(session[:token])
  end
  
  def init_calendar_token(token)
		@client = Google::APIClient.new(
			:application_name => 'Scheudler',
			:application_version => '1.0.0'
		)
    @client.authorization.access_token = token
		@calendar = @client.discovered_api('calendar', API_VERSION)
  end


	def create_cal(name)
		init_calendar
		return gcal_calendar_create(name)
	end

	def delete_cal(gcal_id)
		init_calendar
		gcal_calendar_delete(gcal_id)
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
		
		gcal_acl_public_read(result.data.id)

		return result.data.id
	end

	def gcal_calendar_delete(gcal_id)
		params = {
      calendarId: gcal_id
    }
    result = @client.execute(
      :api_method => @calendar.calendars.delete,
      :parameters => params
    )
		result
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

	def gcal_acl_public_read(gcal_id)
		acl = {
			"kind" => "calendar#aclRule",
			"id" => "default",
			"scope" => {
				"type" => "default",
				"value" => "__public_principal__@public.calendar.google.com"
			},
			"role" => "reader"
		}
		params = {
      calendarId: gcal_id
    }
		result = @client.execute(
		  :api_method => @calendar.acl.insert,
			:parameters => params,
		  :body_object => acl
		)
		return result.data
	end
	
	def gcal_acl_add_reader(gcal_id, email)
		acl = {
			"kind" => "calendar#aclRule",
			"id" => "user:" + email,
			"scope" => {
				"type" => "user",
				"value" => email
			},
			"role" => "reader"
		}
		params = {
      calendarId: gcal_id
    }
		result = @client.execute(
		  :api_method => @calendar.acl.insert,
			:parameters => params,
		  :body_object => acl
		)
		return result.data
	end
	
	def gcal_acl_add_owner(gcal_id, email)
		acl = {
			"kind" => "calendar#aclRule",
			"id" => "user:" + email,
			"scope" => {
				"type" => "user",
				"value" => email
			},
			"role" => "owner"
		}
		params = {
      calendarId: gcal_id
    }
		result = @client.execute(
		  :api_method => @calendar.acl.insert,
			:parameters => params,
		  :body_object => acl
		)
		return result.data
	end
	
	def gcal_acl_delete(gcal_id, email)
		id = "user:" + email
	
		params = {
      calendarId: gcal_id,
			ruleId: id
    }
		result = @client.execute(
		  :api_method => @calendar.acl.delete,
			:parameters => params
		)
		return result.data
	end
	
	def gcal_list_remove(gcal_id)
		params = {
      calendarId: gcal_id
    }
		result = @client.execute(
      :api_method => @calendar.calendar_list.delete,
      :parameters => params
    )
    result
	end

end
