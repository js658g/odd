class Role < ActiveRecord::Base
  attr_accessible :privileges, :role_description, :role_name

  # has_many :project_role_users1s
  validates_presence_of :role_name, :on => :create


end
