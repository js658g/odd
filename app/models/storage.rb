class Storage < ActiveRecord::Base
  attr_accessible :cloud_master, :primary_repository, :storage_id, :storage_name, :storage_type

  validates_presence_of :storage_id, :on => :create

  validates_presence_of :storage_name, :on => :create

  validates_presence_of :storage_type, :on => :create

end
