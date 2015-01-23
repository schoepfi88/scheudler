class Api::EventController < Api::RestController
	require 'google/api_client'
	include CalendarModule
   
  def index  
		out = Array.new
		
		Event.get_events(current_user.id).each do |ev|
			out.push(ev.to_json)
		end

    respond_with out
  end
end
