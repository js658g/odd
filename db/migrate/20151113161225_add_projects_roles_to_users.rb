class AddProjectsRolesToUsers < ActiveRecord::Migration
  def change
    add_column :users, :projects_assigned, :string
    add_column :users, :roles_assigned, :string
  end
end
