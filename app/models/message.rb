class Message < ActiveRecord::Base
	belongs_to :sender, :class_name => 'User'
	belongs_to :receiver, :class_name => 'Group'

	def self.calcTime()
        beginDate2014 = Time.new(2014,3,30,2,0)
        endDate2014 = Time.new(2014,10,26,3,0)
        beginDate2015 = Time.new(2015,3,29,2,0)
        endDate2015 = Time.new(2015,10,25,3,0)
        nowTime = Time.at(Time.now.to_i + 3600)
        if nowTime.between?(beginDate2014, endDate2014) || nowTime.between?(beginDate2015, endDate2015)
            sendTime = Time.at(nowTime.to_i + 3600)
        else 
            sendTime = nowTime
        end
        sendTime
    end
end
