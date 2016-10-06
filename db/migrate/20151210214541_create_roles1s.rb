class CreateRoles1s < ActiveRecord::Migration
  def change
    create_table :roles1s do |t|
      t.string :role_name
      t.string :role_description
      t.text :assigned_privileges_id

      t.timestamps
    end
  end
end
