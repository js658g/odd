BasicAuth::Application.routes.draw do
  resources :databases


  # post "servers/:id" => 'servers#test'

  post "servers/:id" => 'servers#test'
  post "servers/newpage/:id" => 'servers#test1'




  # delete 'servers/:id/edit' => 'servers#edit', :via => :get #dont know if this works but somebody said its a hack after you delete it uses delete instaed of get to reload index #this is a hack ActionController::RoutingError (No route matches [DELETE] "/servers"): this error pops up after deleting the record and trying to redirect
   # delete "servers/:id" => "servers#destory"

  # post "servers/test"
  resources :servers

  # delete "servers/:id" => 'servers#destroy'

  # delete 'logout'  => 'sessions#destroy'





  resources :storages


  resources :roles


  resources :projects


  resources :project3s


  resources :project2s


  resources :datacenters


  get "sessions/new"

  post "server1s/test"

   # post "servers/test"
  # match 'servers/:id' => 'servers#test', via: :post
   # post "servers/checkIPRoute"



  get    'login'   => 'sessions#new'
  post   'login'   => 'sessions#create'
  delete 'logout'  => 'sessions#destroy'

  resources :database1s


  resources :server1s


  resources :storage1s


  resources :roles1s


  resources :projects1s
  delete "projects1s/:id" => 'projects1s#destroy'


  resources :users1s

  # map.resources :users1s, :has_many => :project3s

  #put "media/:id/update" => "media#update"
  #raiget "users1s/:id/edit" => "users1s#edit", :as => "user1"
 # post "user1/:id/update" => "users1s#update", :as => "user1"
  #delete "user/:id" => "admin#delete_user", :as => "user"

  # get "users1s/:id/edit" => "users1s#edit"
  # put "users1s/:id/edit" => "users1s#update"


  match 'users1s/:id/edit' => 'users1s#edit', via: :get
  match 'users1s/:id' => 'users1s#update', via: :post #this line updates the form calls update method  localhost:3000/users1s/13/edit

  # get "sign_in1" => "authentication#sign_in1"
  # post "sign_in1" => "authentication#login1"

  get "users1s/sign_in1" => "users1s#sign_in1"
  post "users1s/sign_in1" => "users1s#login1"


  # match 'users1s/sign_in1' => 'users1s#sign_in1', via: :get
  # match 'users1s/sign_in1' => 'users1s#login1', via: :post #this line updates the form calls update method  localhost:3000/users1s/13/edit


  #
  # get "new_user" => "authentication#new_user"
  # post "new_user" => "authentication#register"
  #
  # get "users1s/new" => "users1s#new"
  # post "users1s/:id/edit" => "users1s#create"




  root :to=>"home#index"
  # root :to=>"sessions#new"


  get "signed_out" => "authentication#signed_out"
  get "forgot_password" => "authentication#forgot_password"
  get "password_sent" => "authentication#password_sent"

  get "sign_in" => "authentication#sign_in"
  post "sign_in" => "authentication#login"

  get "new_user" => "authentication#new_user"
  post "new_user" => "authentication#register"

  get "new_project" => "authentication#new_project"
  post "new_project" => "authentication#project_register"

  get "storage_configuration" => "authentication#storage_configuration"
  post "storage_configuration" => "authentication#new_storage_configuration"

  get "register_server" => "authentication#register_server"
  post "register_server" => "authentication#new_server_registration"

  get "register_database" => "authentication#register_database"
  post "register_database" => "authentication#new_database_registration"


  get "smoke_test" => "authentication#smoke_test"
  post "smoke_test" => "authentication#smoke_test"


  # get "new_role" => "authentication#new_role"
  # post "new_role" => "authentication#role_register"


  get "account_settings" => "authentication#account_settings"
  put "account_settings" => "authentication#set_account_info"

  get "account_settings1" => "authentication#account_settings1"
  put "account_settings1" => "authentication#set_account_info1"

  get "forgot_password" => "authentication#forgot_password"
  put "forgot_password" => "authentication#send_password_reset_instructions"
  get "password_reset" => "authentication#password_reset"
  put "password_reset" => "authentication#new_password"

  get "admin_users" => "admin#users"
  delete "user/:id" => "admin#delete_user", :as => "user"

  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
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

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  # root :to => 'welcome#index'

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id))(.:format)'
end
