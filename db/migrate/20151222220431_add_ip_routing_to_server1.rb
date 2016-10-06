class AddIpRoutingToServer1 < ActiveRecord::Migration
  def change
    add_column :server1s, :IPRouting, :text
  end
end
