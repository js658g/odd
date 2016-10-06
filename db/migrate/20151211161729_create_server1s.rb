class CreateServer1s < ActiveRecord::Migration
  def change
    create_table :server1s do |t|
      t.string :server_name
      t.string :installation_dir
      t.string :tool_dir
      t.string :protocols
      t.string :location
      t.text :IP
      t.string :server_login
      t.string :server_password
      t.string :description

      t.timestamps
    end
    add_index :server1s, :server_name, :unique => true
  end
end
