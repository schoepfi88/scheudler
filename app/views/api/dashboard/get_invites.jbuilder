json.array!(@all_invites) do |e|
  json.id e.id
  json.name e.name
  json.location e.location
  json.description e.description
  json.accepted Participant.where(event_id: e.id, user_id: current_user.id).first.accepted
  json.date e.start
  json.time e.start
  json.icon Group.find(e.group_id).icon
end