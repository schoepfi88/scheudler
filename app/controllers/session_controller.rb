class SessionController < ApplicationController
        around_filter :wrap_in_transaction, only: [:create]

    def index
    end

    def create
        user = User.from_omniauth(request.env["omniauth.auth"])
        session[:user_id] = user.id
        user.save!
        redirect_to root_url, :notice => t('misc.titles.logged_in')
    end

    def destroy
        session[:user_id] = nil
        redirect_to root_url
    end
end
