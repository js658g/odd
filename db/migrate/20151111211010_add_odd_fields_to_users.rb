class AddOddFieldsToUsers < ActiveRecord::Migration
  def change
    add_column :users, :description, :string
    add_column :users, :first_name, :string
    add_column :users, :last_name, :string
    add_column :users, :department, :string
    add_column :users, :days, :integer
    add_column :users, :disable, :string
    add_column :users, :privacy, :string
    add_column :users, :is_group, :string
    add_column :users, :title, :string
    add_column :users, :profile, :string
    add_column :users, :admin_roles, :string
    add_column :users, :is_sa, :string
    add_column :users, :support, :string
    add_column :users, :othernumber, :string
    add_column :users, :last_pass_update, :integer
    add_column :users, :is_locked, :string
    add_column :users, :grantor, :string
  end
end
