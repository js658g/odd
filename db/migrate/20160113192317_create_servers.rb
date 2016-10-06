class CreateServers < ActiveRecord::Migration
  def change
    create_table :servers do |t|
      t.string :server_name
      t.string :installation_dir
      t.string :tool_dir
      t.string :protocols
      t.string :location
      t.string :server_login
      t.string :server_password
      t.string :description

      t.timestamps
    end
    add_index :servers, :server_name, :unique => true
  end
end
