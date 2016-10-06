require 'test_helper'

class ServersControllerTest < ActionController::TestCase
  setup do
    @server = servers(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:servers)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create server" do
    assert_difference('Server.count') do
      post :create, server: { description: @server.description, installation_dir: @server.installation_dir, location: @server.location, protocols: @server.protocols, server_login: @server.server_login, server_name: @server.server_name, server_password: @server.server_password, tool_dir: @server.tool_dir }
    end

    assert_redirected_to server_path(assigns(:server))
  end

  test "should show server" do
    get :show, id: @server
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @server
    assert_response :success
  end

  test "should update server" do
    put :update, id: @server, server: { description: @server.description, installation_dir: @server.installation_dir, location: @server.location, protocols: @server.protocols, server_login: @server.server_login, server_name: @server.server_name, server_password: @server.server_password, tool_dir: @server.tool_dir }
    assert_redirected_to server_path(assigns(:server))
  end

  test "should destroy server" do
    assert_difference('Server.count', -1) do
      delete :destroy, id: @server
    end

    assert_redirected_to servers_path
  end
end
