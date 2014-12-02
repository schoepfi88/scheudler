class User < ActiveRecord::Base
	has_many :admins
	has_many :members
	has_many :participants
	has_many :events, :through => :participants
	has_many :groups, :through => :members
	has_many :groups, :through => :admins
    validates   :provider, :uid, :name, :oauth_token, :email, presence: true

    def self.find_by_email(email)
        find_by email: email
    end

    def self.from_omniauth(auth)
        where(auth.slice(:provider,:uid)).first_or_initialize.tap do |user|
            user.provider = auth.provider
            user.uid = auth.uid
            user.name = auth.info.name
            user.oauth_token = auth.credentials.token
            user.oauth_expires_at = Time.at(auth.credentials.expires_at)
            user.image_path = auth.info.image
            user.email = auth.info.email
            user.save!
        end
    end

	def self.update(params)
		u = User.find(params[:id])
		u.back_link_enabled = params[:back_link_enabled]
		u.save!
	end
end
