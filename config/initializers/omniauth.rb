Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, ENV['SCHEUDLER_FACEBOOK_ID'], ENV['SCHEUDLER_FACEBOOK_AUTH_PASSWORD'], secure_image_url: true
end
