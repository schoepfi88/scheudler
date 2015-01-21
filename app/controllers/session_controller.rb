class SessionController < ApplicationController
        around_filter :wrap_in_transaction, only: [:create]

    def index
    end

    def create
      auth = request.env["omniauth.auth"]
      check_mail = auth.info.email
      check_user = User.where(email: check_mail).first
      # new user
      if check_user == nil
        user = User.from_omniauth(auth)
        session[:token] = auth["credentials"]["token"]
        session[:user_id] = user.id
        user.save!
      
      else
        # is not dummy user
        if check_user.oauth_token != "dummy"
          user = User.from_omniauth(auth)
          session[:token] = auth["credentials"]["token"]
          session[:user_id] = user.id
          user.save!
        #dummy user
        else 
          User.from_omniauth_existing_user(auth, check_user)
          session[:token] = auth["credentials"]["token"]
          session[:user_id] = check_user.id
          # create participants for all events created before user was logged in
          group_ids = Member.where(user_id: check_user.id).pluck(:group_id)
          group_ids.each do |g|
            events = Event.where(group_id: g)
            events.each do |e|
              Participant.create_part(e.id, g)
            end
          end
          check_user.save!
        end
      end
      
      redirect_to root_url, :notice => t('misc.titles.logged_in')
    end

    def destroy
      session[:user_id] = nil
      session[:token] = nil
      redirect_to root_url
    end
end
