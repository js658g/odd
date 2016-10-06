class CreateStorage1s < ActiveRecord::Migration
  def change
    create_table :storage1s do |t|
      t.string :storage_id
      t.string :storage_name
      t.string :storage_type
      t.string :cloud_master
      t.integer :primary_repository

      t.timestamps
    end
  end
end
