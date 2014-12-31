class Api::EventController < Api::RestController
	require 'google/api_client'
	include CalendarModule
   
  def index  
		init_calendar

		out = Array.new

		groups = Member.where(user_id: current_user.id).pluck(:group_id)
		groups.each do |i|
			tmp = Group.new
			tmp = Group.where(id: i).first

			events = gcal_events_get(tmp.calendar_id)
		
			events.each do |event|
				ev = Event.new
				ev.gcal_id = event.id
				ev.name = event.summary
				ev.start = event.start
				ev.end = event.end

				out.push(ev.to_json)
			end
		end

    respond_with gcal_acl_list("uj20iijkkq6gr4v4ile0ifajeg@group.calendar.google.com")
  end
end
