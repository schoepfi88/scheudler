json.array!(@events) do |eve|
	json.id eve.id
	json.name eve.name
	json.description eve.description
	json.icon eve.group.icon
	json.location eve.location
	json.date eve.start
	json.time eve.start
	json.group_id eve.group_id
	json.accepted Participant.find(eve.id).accepted
end