Scheudler::Application.routes.draw do

scope "(:locale)", locale: /en|de/ do
  root :to => 'templates#index'

  get '/about', :to => :about, controller: :public
  get '/contact', :to => :contact, controller: :public
  get '/terms', :to => :terms_and_privacy, controller: :public

  # template routes
  namespace :templates do
    get '/dashboard', to: :dashboard, as: 'dashboard_template'
    get '/dashboard/messages/:id', to: :dashboard_messages, as: 'dashboard_messages_template'
    get '/calendar', to: :calendar, as: 'calendar_template'
    get '/events', to: :events, as: 'events_template'
    get '/events_create', to: :events_create, as: 'events_create_template'
    get '/events_dashboard/:id', to: :events_dashboard, as: 'events_dashboard_template'
    get '/groups', to: :groups, as: 'groups_template'
    get '/groups_create', to: :groups_create, as: 'groups_create_template'
    get '/groups_dashboard/:id/invite', to: :groups_invite, as: 'groups_invite_template'
    get '/groups_dashboard/:id/members', to: :groups_members, as: 'groups_members_template'
    get '/groups_dashboard/:id/settings', to: :groups_settings, as: 'groups_settings_template'
    get '/groups_dashboard/:id/:index', to: :groups_dashboard, as: 'groups_dashboard_template'
    get '/statistic', to: :statistic, as: 'statistic_template'
	get '/statistic_groups/:id', to: :statistic_groups, as: 'statistic_groups_template'
    get '/account', to: :account, as: 'account_template'
  end

  #REST API
  namespace :api, defaults: {format: :json} do
    resources :status, only: [:index]
    resources :invite, only: [:create,:destroy]
	 
	  resources :event, only: [:index, :create, :get_events, :participate]
	  get '/events' => 'events#index'
    #get '/events' => 'events#get_events'
    post '/events' => 'events#create'
	  post '/events_participate' => 'events#participate'
    get '/events_dashboard' => 'events#get_members'
    get '/events_dashboard/:id' => 'events#get_members'


    #groups
    resources :groups, only: [:create, :update, :show, :destroy, :index, :invite, :destroy, :remove]
    post '/groups' => 'groups#create'
    post '/groups_invite' => 'groups#invite'
    delete '/groups' => 'groups#destroy'
    delete '/groups_members' => 'groups#remove'
	post '/groups_members' => 'groups#make_admin'

    #account
    resources :account, only: [:update, :destroy]
    put '/account' => 'account#update'

    #dashboard
    resources :dashboard, only: [:destroy, :create, :unread]
    get '/messages' => 'dashboard#get_messages'
    get '/user' => 'user#index'
    get '/dashboard/groups' => 'dashboard#get_groups'
    post '/messages' => 'dashboard#create'
    get '/messages/unread' => 'dashboard#unread'
    get '/messages/:group_id' => 'dashboard#get_all'
    get '/dashboard/invites' => 'dashboard#get_invites'
    get '/dashboard/events' => 'dashboard#get_events'
    post '/dashboard/events' => 'dashboard#accepted'
    post '/dashboard/regId' => 'dashboard#get_regId'
  end



  # Authentication
  match 'auth/:provider/callback', to: 'session#create', via: [:get, :post]
  match 'auth/failure', to: redirect('/'), via: [:get, :post]
  match 'signout', to: 'session#destroy', as: 'signout', via: [:get, :post]
  match 'signin', to: 'session#index', as: 'signin', via: [:get, :post]

   # Error Routes
  match '/404', :to => 'errors#not_found', via: :all
  match '/500', :to => 'errors#server_error', via: :all
end


  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end
  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
