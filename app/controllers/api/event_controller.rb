class Api::EventController < Api::RestController
	require 'google/api_client'
	include CalendarModule
   
  def index  
		init_calendar

		out = Array.new
		bg_color = ['#3465A4', '#f57900', '#4e9a06', '#cc0000', '#75507b', '#edd400']
		fg_color = ['white', 'white', 'black', 'white', 'white', 'black']
		groups = Member.where(user_id: current_user.id).pluck(:group_id)
		groups.each_with_index do |i, index|
			tmp = Group.new
			tmp = Group.where(id: i).first

			events = gcal_events_get(tmp.calendar_id)
		
			events.each do |event|
				if event.start.date.nil? && event.end.date.nil? then
					ev = Event.new
					ev.gcal_id = event.id
					ev.name = event.summary
					ev.start = event.start
					ev.end = event.end
					ev.color = bg_color[index % bg_color.length]
					ev.text_color = fg_color[index % fg_color.length]

					out.push(event)
				end
			end
		end

    respond_with out
  end
end
