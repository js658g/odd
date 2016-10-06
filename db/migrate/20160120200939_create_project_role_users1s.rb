class CreateProjectRoleUsers1s < ActiveRecord::Migration
  def change
    create_table :project_role_users1s do |t|
      t.integer :project_id
      t.integer :role_id
      t.integer :users1_id

      t.timestamps
    end
  end
end
