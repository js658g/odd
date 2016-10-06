require 'test_helper'

class DatabasesControllerTest < ActionController::TestCase
  setup do
    @database = databases(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:databases)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create database" do
    assert_difference('Database.count') do
      post :create, database: { JDBC_URL: @database.JDBC_URL, database_id: @database.database_id, datacenter_location: @database.datacenter_location, db_login: @database.db_login, db_name: @database.db_name, db_password: @database.db_password, db_type: @database.db_type, name: @database.name, server_host: @database.server_host, server_login: @database.server_login, server_password: @database.server_password, string: @database.string }
    end

    assert_redirected_to database_path(assigns(:database))
  end

  test "should show database" do
    get :show, id: @database
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @database
    assert_response :success
  end

  test "should update database" do
    put :update, id: @database, database: { JDBC_URL: @database.JDBC_URL, database_id: @database.database_id, datacenter_location: @database.datacenter_location, db_login: @database.db_login, db_name: @database.db_name, db_password: @database.db_password, db_type: @database.db_type, name: @database.name, server_host: @database.server_host, server_login: @database.server_login, server_password: @database.server_password, string: @database.string }
    assert_redirected_to database_path(assigns(:database))
  end

  test "should destroy database" do
    assert_difference('Database.count', -1) do
      delete :destroy, id: @database
    end

    assert_redirected_to databases_path
  end
end
