class CreateUsers1s < ActiveRecord::Migration
  def change
    create_table :users1s do |t|
      t.string :username
      t.string :email
      t.string :password_hash
      t.string :password_salt
      t.string :password_reset_token
      t.string :password_expires_after
      t.string :authentication_token
      t.string :phone
      t.string :description
      t.boolean :is_admin
      t.string :projects_assigned
      t.string :roles_assigned

      t.timestamps
    end
  end
end
