class ServerIpRoute < ActiveRecord::Base
  attr_accessible :destination_id, :destination_ip, :source_id, :source_ip
end
