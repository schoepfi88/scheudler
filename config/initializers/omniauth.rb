Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, ENV['SCHEUDLER_FACEBOOK_ID'], ENV['SCHEUDLER_FACEBOOK_AUTH_PASSWORD'], secure_image_url: true
  provider :google_oauth2, ENV["SCHEUDLER_GOOGLE_ID"] , ENV["SCHEUDLER_GOOGLE_AUTH_PASSWORD"], {
    access_type: 'offline',
    scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar'
  }
end
