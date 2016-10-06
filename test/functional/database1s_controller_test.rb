require 'test_helper'

class Database1sControllerTest < ActionController::TestCase
  setup do
    @database1 = database1s(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:database1s)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create database1" do
    assert_difference('Database1.count') do
      post :create, database1: { db_type: @database1.db_type, location: @database1.location, name: @database1.name, server: @database1.server, server_login: @database1.server_login, server_password: @database1.server_password, service_id: @database1.service_id }
    end

    assert_redirected_to database1_path(assigns(:database1))
  end

  test "should show database1" do
    get :show, id: @database1
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @database1
    assert_response :success
  end

  test "should update database1" do
    put :update, id: @database1, database1: { db_type: @database1.db_type, location: @database1.location, name: @database1.name, server: @database1.server, server_login: @database1.server_login, server_password: @database1.server_password, service_id: @database1.service_id }
    assert_redirected_to database1_path(assigns(:database1))
  end

  test "should destroy database1" do
    assert_difference('Database1.count', -1) do
      delete :destroy, id: @database1
    end

    assert_redirected_to database1s_path
  end
end
