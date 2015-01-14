json.array!(@events) do |eve|
	json.id eve.id
	json.name eve.name
	json.description eve.description
	json.icon eve.group.icon
	json.location eve.location
	json.time eve.time
	json.group_id eve.group_id
end