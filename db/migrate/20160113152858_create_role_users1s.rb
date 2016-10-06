class CreateRoleUsers1s < ActiveRecord::Migration
  def change
    create_table :role_users1s do |t|
      t.integer :role_id
      t.integer :users1_id
      t.timestamps
    end
  end
end
