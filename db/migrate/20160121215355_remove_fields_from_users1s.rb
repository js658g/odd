class RemoveFieldsFromUsers1s < ActiveRecord::Migration
  def up
    remove_column :users1s, :projects_assigned
    remove_column :users1s, :roles_assigned
  end

  def down
    add_column :users1s, :roles_assigned, :string
    add_column :users1s, :projects_assigned, :string
  end
end
