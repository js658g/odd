class RemoveFieldsFromUsers < ActiveRecord::Migration
  def up
    remove_column :users, :first_name
    remove_column :users, :last_name
    remove_column :users, :department
    remove_column :users, :days
    remove_column :users, :disable
    remove_column :users, :privacy
    remove_column :users, :is_group
    remove_column :users, :title
    remove_column :users, :profile
    remove_column :users, :admin_roles
    remove_column :users, :is_sa
    remove_column :users, :support
    remove_column :users, :othernumber
    remove_column :users, :last_pass_update
    remove_column :users, :is_locked
    remove_column :users, :grantor
    remove_column :users, :userid
  end

  def down
    add_column :users, :userid, :string
    add_column :users, :grantor, :string
    add_column :users, :is_locked, :string
    add_column :users, :last_pass_update, :string
    add_column :users, :othernumber, :string
    add_column :users, :support, :string
    add_column :users, :is_sa, :string
    add_column :users, :admin_roles, :string
    add_column :users, :profile, :string
    add_column :users, :title, :string
    add_column :users, :is_group, :string
    add_column :users, :privacy, :string
    add_column :users, :disable, :string
    add_column :users, :days, :string
    add_column :users, :department, :string
    add_column :users, :last_name, :string
    add_column :users, :first_name, :string
  end
end
