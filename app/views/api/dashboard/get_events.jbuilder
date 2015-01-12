json.array!(@all_events) do |e|
  json.id e.id
  json.name e.name
  json.location e.location
  json.description e.description
  json.date e.date
  json.time e.time
end