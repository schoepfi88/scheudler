json.array!(@all_invites) do |e|
  json.id e.id
  json.name e.name
  json.location e.location
  json.description e.description
  json.date e.date
  json.time e.time
  json.accepted e.accepted
  json.icon Group.find(e.group_id).icon
end