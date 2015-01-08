json.array!(@eve) do |events|
  json.id events.id
  json.name events.name
  json.location events.location
  json.description events.description
  json.date events.date
  json.time events.time
end