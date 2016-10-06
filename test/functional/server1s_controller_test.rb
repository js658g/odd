require 'test_helper'

class Server1sControllerTest < ActionController::TestCase
  setup do
    @server1 = server1s(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:server1s)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create server1" do
    assert_difference('Server1.count') do
      post :create, server1: { IP: @server1.IP, description: @server1.description, installation_dir: @server1.installation_dir, location: @server1.location, protocols: @server1.protocols, server_login: @server1.server_login, server_name: @server1.server_name, server_password: @server1.server_password, tool_dir: @server1.tool_dir }
    end

    assert_redirected_to server1_path(assigns(:server1))
  end

  test "should show server1" do
    get :show, id: @server1
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @server1
    assert_response :success
  end

  test "should update server1" do
    put :update, id: @server1, server1: { IP: @server1.IP, description: @server1.description, installation_dir: @server1.installation_dir, location: @server1.location, protocols: @server1.protocols, server_login: @server1.server_login, server_name: @server1.server_name, server_password: @server1.server_password, tool_dir: @server1.tool_dir }
    assert_redirected_to server1_path(assigns(:server1))
  end

  test "should destroy server1" do
    assert_difference('Server1.count', -1) do
      delete :destroy, id: @server1
    end

    assert_redirected_to server1s_path
  end
end
