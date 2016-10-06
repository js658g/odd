class Datacenter < ActiveRecord::Base
  attr_accessible :address, :name
  validates_presence_of :name, :on => :create

end
