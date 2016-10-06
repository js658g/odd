class Server < ActiveRecord::Base
  attr_accessible :description, :installation_dir, :location, :IP, :IPRouting, :protocols, :server_login, :server_name, :server_password, :tool_dir

  has_many :server_ip_routes
  # has_many :destinations, through: :server_ip_routes
  validates_presence_of :server_name, :on => :create
  validates_presence_of :server_login, :on => :create
  validates_presence_of :server_password, :on => :create


end
