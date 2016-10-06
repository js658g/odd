# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20160205212221) do

  create_table "database1s", :force => true do |t|
    t.string   "service_id"
    t.string   "name"
    t.string   "server"
    t.string   "db_type"
    t.string   "location"
    t.string   "server_login"
    t.string   "server_password"
    t.datetime "created_at",      :null => false
    t.datetime "updated_at",      :null => false
    t.string   "database"
    t.string   "host"
    t.string   "port"
    t.string   "username"
    t.string   "password"
  end

  create_table "databases", :force => true do |t|
    t.string   "database_id"
    t.string   "name"
    t.string   "JDBC_URL"
    t.string   "db_type"
    t.string   "datacenter_location"
    t.string   "server_host"
    t.string   "server_login"
    t.string   "server_password"
    t.string   "db_name"
    t.string   "db_login"
    t.string   "db_password"
    t.datetime "created_at",          :null => false
    t.datetime "updated_at",          :null => false
  end

  add_index "databases", ["database_id"], :name => "index_databases_on_database_id", :unique => true

  create_table "datacenters", :force => true do |t|
    t.string   "name"
    t.string   "address"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "privileges", :force => true do |t|
    t.string "privilege_name"
  end

  create_table "project_role_users1s", :force => true do |t|
    t.integer  "project_id"
    t.integer  "role_id"
    t.integer  "users1_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "project_users1s", :force => true do |t|
    t.integer  "project_id"
    t.integer  "users1_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "projects", :force => true do |t|
    t.string   "project_name"
    t.string   "project_description"
    t.boolean  "reusable"
    t.datetime "created_at",          :null => false
    t.datetime "updated_at",          :null => false
  end

  create_table "projects1s", :force => true do |t|
    t.string   "project_name"
    t.string   "project_description"
    t.boolean  "reusable"
    t.datetime "created_at",          :null => false
    t.datetime "updated_at",          :null => false
  end

  create_table "role_users1s", :force => true do |t|
    t.integer  "role_id"
    t.integer  "users1_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "roles", :force => true do |t|
    t.string   "role_name"
    t.string   "role_description"
    t.text     "privileges"
    t.datetime "created_at",       :null => false
    t.datetime "updated_at",       :null => false
  end

  create_table "roles1s", :force => true do |t|
    t.string   "role_name"
    t.string   "role_description"
    t.text     "assigned_privileges_id"
    t.datetime "created_at",             :null => false
    t.datetime "updated_at",             :null => false
  end

  create_table "server1s", :force => true do |t|
    t.string   "server_name"
    t.string   "installation_dir"
    t.string   "tool_dir"
    t.string   "protocols"
    t.string   "location"
    t.text     "IP"
    t.string   "server_login"
    t.string   "server_password"
    t.string   "description"
    t.datetime "created_at",       :null => false
    t.datetime "updated_at",       :null => false
    t.text     "IPRouting"
  end

  add_index "server1s", ["server_name"], :name => "index_server1s_on_server_name", :unique => true

  create_table "server_ip_routes", :force => true do |t|
    t.integer  "source_id"
    t.string   "source_ip"
    t.integer  "destination_id"
    t.string   "destination_ip"
    t.datetime "created_at",     :null => false
    t.datetime "updated_at",     :null => false
  end

  create_table "servers", :force => true do |t|
    t.string   "server_name"
    t.string   "installation_dir"
    t.string   "tool_dir"
    t.string   "protocols"
    t.string   "location"
    t.string   "server_login"
    t.string   "server_password"
    t.string   "description"
    t.datetime "created_at",       :null => false
    t.datetime "updated_at",       :null => false
    t.string   "IP"
  end

  add_index "servers", ["server_name"], :name => "index_servers_on_server_name", :unique => true

  create_table "storage1s", :force => true do |t|
    t.string   "storage_id"
    t.string   "storage_name"
    t.string   "storage_type"
    t.string   "cloud_master"
    t.integer  "primary_repository"
    t.datetime "created_at",         :null => false
    t.datetime "updated_at",         :null => false
  end

  create_table "storages", :force => true do |t|
    t.string   "storage_id"
    t.string   "storage_name"
    t.string   "storage_type"
    t.string   "cloud_master"
    t.integer  "primary_repository"
    t.datetime "created_at",         :null => false
    t.datetime "updated_at",         :null => false
  end

  create_table "users", :force => true do |t|
    t.string   "username"
    t.string   "email"
    t.string   "password_hash"
    t.string   "password_salt"
    t.string   "password_reset_token"
    t.datetime "password_expires_after"
    t.string   "authentication_token"
    t.datetime "last_signed_in_on"
    t.datetime "signed_up_on"
    t.boolean  "is_admin"
    t.string   "phone"
    t.string   "description"
    t.string   "projects_assigned"
    t.string   "roles_assigned"
  end

  create_table "users1s", :force => true do |t|
    t.string   "username"
    t.string   "email"
    t.string   "password_hash"
    t.string   "password_salt"
    t.string   "password_reset_token"
    t.string   "password_expires_after"
    t.string   "authentication_token"
    t.string   "phone"
    t.string   "description"
    t.boolean  "is_admin"
    t.datetime "created_at",             :null => false
    t.datetime "updated_at",             :null => false
  end

end
