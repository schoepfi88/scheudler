json.sender_id @mes.sender_id
json.receiver_id @mes.receiver_id
json.text @mes.text
json.name User.find(@mes.sender_id).name
json.image_path User.find(@mes.sender_id).image_path
json.created_at @mes.created_at
