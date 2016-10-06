class CreateDatabase1s < ActiveRecord::Migration
  def change
    create_table :database1s do |t|
      t.string :service_id
      t.string :name
      t.string :server
      t.string :db_type
      t.string :location
      t.string :server_login
      t.string :server_password

      t.timestamps
    end
  end
end
