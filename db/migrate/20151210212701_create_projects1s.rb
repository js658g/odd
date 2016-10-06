class CreateProjects1s < ActiveRecord::Migration
  def change
    create_table :projects1s do |t|
      t.string :project_name
      t.string :project_description
      t.boolean :reusable

      t.timestamps
    end
  end
end
