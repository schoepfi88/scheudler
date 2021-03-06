json.array!(@events) do |eve|
	json.id eve.id
	json.name eve.name
	json.description eve.description
	json.icon eve.group.icon
	json.location eve.location
	json.date eve.start
	json.time eve.start
	json.group_id eve.group_id
	json.accepted eve.participants.where(user_id: current_user.id).first.accepted
end