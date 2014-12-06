class SessionController < ApplicationController
        around_filter :wrap_in_transaction, only: [:create]

    def index
    end

    def create
      auth = request.env["omniauth.auth"]
      user = User.from_omniauth(auth)
      session[:token] = auth["credentials"]["token"]
      session[:user_id] = user.id
      user.save!
      redirect_to root_url, :notice => t('misc.titles.logged_in')
    end

    def destroy
      session[:user_id] = nil
      session[:token] = nil
      redirect_to root_url
    end
end
