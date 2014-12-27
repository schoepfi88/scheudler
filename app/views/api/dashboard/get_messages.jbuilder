json.array!(@messages) do |mes|
	json.sender_id mes.sender_id
	json.receiver_id mes.receiver_id
	json.text mes.text
	json.name User.find(mes.sender_id).name
	json.image_path User.find(mes.sender_id).image_path
end
