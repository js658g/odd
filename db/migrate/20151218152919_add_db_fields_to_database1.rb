class AddDbFieldsToDatabase1 < ActiveRecord::Migration
  def change
    add_column :database1s, :database, :string
    add_column :database1s, :host, :string
    add_column :database1s, :port, :string
    add_column :database1s, :username, :string
    add_column :database1s, :password, :string
  end
end
