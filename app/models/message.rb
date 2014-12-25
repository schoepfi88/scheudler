class Message < ActiveRecord::Base
	belongs_to :sender, :class_name => 'User'
	belongs_to :receiver, :class_name => 'User'
    	validates :sender_id, :receiver_id, :text, presence: true
end
