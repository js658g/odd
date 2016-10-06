class AddIpToServers < ActiveRecord::Migration
  def change
    add_column :servers, :IP, :string
  end
end
