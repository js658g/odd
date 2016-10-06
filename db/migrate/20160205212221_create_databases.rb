class CreateDatabases < ActiveRecord::Migration
  def change
    create_table :databases do |t|
      t.string :database_id
      t.string :name
      t.string :JDBC_URL
      t.string :db_type
      t.string :datacenter_location
      t.string :server_host
      t.string :server_login
      t.string :server_password
      t.string :db_name
      t.string :db_login
      t.string :db_password

      t.timestamps
    end
    add_index :databases, :database_id, :unique => true
  end
end
