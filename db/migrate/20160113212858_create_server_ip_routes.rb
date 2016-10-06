class CreateServerIpRoutes < ActiveRecord::Migration
  def change
    create_table :server_ip_routes do |t|
      t.integer :source_id
      t.string :source_ip
      t.integer :destination_id
      t.string :destination_ip

      t.timestamps
    end
  end
end
