source 'https://rubygems.org'
# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.0.0'

# postgresql
gem 'pg', '0.16.0'

# ORMapper
gem 'activerecord'

# Use SCSS for stylesheets
gem 'sass-rails', '~> 4.0.0'

# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'

# See https://github.com/sstephenson/execjs#readme for more supported runtimes
# for minification and so on
gem 'therubyracer', platforms: :ruby

# Use jquery as the JavaScript library
gem 'jquery-rails', '>= 3.1.1'

# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 1.2'

#group :doc do
  # bundle exec rake doc:rails generates the API under doc/api.
#  gem 'sdoc', require: false
#end
gem 'rake', '10.3.2'

# Twitter Bootstrap
gem 'bootstrap-sass', '~> 3.1.1'

# http accept lang, read lang from client to set proper default language
gem 'http_accept_language'

# chart js
gem 'chart-js-rails'

#super cool icons
gem "font-awesome-rails"

#authorisation fb and google
gem 'omniauth-facebook'
gem "omniauth-google-oauth2"

#angular js
gem 'angularjs-rails'

#Underscore js, cool collection api's for js
gem 'underscore-rails'

# Angular bindings bootstrap, typeahead
gem 'angular-ui-bootstrap-rails'

#gem "animate-rails"

#alert box
gem 'bootbox-rails'

#calculate distance
gem 'geocoder'

#calendar support
gem 'json_builder'
gem 'google-api-client', :require => 'google/api_client'
gem 'fullcalendar-rails', '~>2.0.2.0'
gem 'momentjs-rails'

#morris charts
gem 'morrisjs-rails'
gem 'raphael-rails'

#datepicker support
gem 'bootstrap-datepicker-rails'

#datetimepicker support
gem 'bootstrap-datetimepicker-rails'

#google cloud messaging service
gem 'gcm'


group :production do
    # Use unicorn as the app server
    gem 'unicorn'

    # mail exception notification, if something goes wrong, not yet configured
    gem 'exception_notification'

    # heroku open needs this gem
    gem 'launchy'

    gem 'rails_12factor'
end

group :development, :test do
    # Use Capistrano for deployment (app Server)
    gem 'capistrano'

    gem 'netrc'

    # developer console rails
    gem 'rb-readline'

    #javascript linter (syntax checker)
    gem 'jshint_on_rails'

    # cool way to test json api's format
    gem 'assert_json'
end


# Use debugger
# gem 'debugger', group: [:development, :test]
