class Database1 < ActiveRecord::Base
  attr_accessible :db_type, :database, :host, :port, :username, :password, :location, :name, :server, :server_login, :server_password, :service_id
end
