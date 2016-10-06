class Project < ActiveRecord::Base
  attr_accessible :project_description, :project_name, :reusable
  # has_and_belongs_to_many :users1

  # has_many :project, through: :project_users1s
  has_many :project_role_users1s

  validates_presence_of :project_name, :on => :create

end
