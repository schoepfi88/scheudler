json.array!(@mygroups) do |group|
	json.name group.name
	json.icon group.icon
	json.id group.id
end
