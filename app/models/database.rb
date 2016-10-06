class Database < ActiveRecord::Base
  attr_accessible :JDBC_URL, :database_id, :datacenter_location, :db_login, :db_name, :db_password, :db_type, :name, :server_host, :server_login, :server_password
end
