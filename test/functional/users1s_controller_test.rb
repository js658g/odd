require 'test_helper'

class Users1sControllerTest < ActionController::TestCase
  setup do
    @users1 = users1s(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:users1s)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create users1" do
    assert_difference('Users1.count') do
      post :create, users1: { authentication_token: @users1.authentication_token, description: @users1.description, email: @users1.email, is_admin: @users1.is_admin, password_expires_after: @users1.password_expires_after, password_hash: @users1.password_hash, password_reset_token: @users1.password_reset_token, password_salt: @users1.password_salt, phone: @users1.phone, projects_assigned: @users1.projects_assigned, roles_assigned: @users1.roles_assigned, username: @users1.username }
    end

    assert_redirected_to users1_path(assigns(:users1))
  end

  test "should show users1" do
    get :show, id: @users1
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @users1
    assert_response :success
  end

  test "should update users1" do
    put :update, id: @users1, users1: { authentication_token: @users1.authentication_token, description: @users1.description, email: @users1.email, is_admin: @users1.is_admin, password_expires_after: @users1.password_expires_after, password_hash: @users1.password_hash, password_reset_token: @users1.password_reset_token, password_salt: @users1.password_salt, phone: @users1.phone, projects_assigned: @users1.projects_assigned, roles_assigned: @users1.roles_assigned, username: @users1.username }
    assert_redirected_to users1_path(assigns(:users1))
  end

  test "should destroy users1" do
    assert_difference('Users1.count', -1) do
      delete :destroy, id: @users1
    end

    assert_redirected_to users1s_path
  end
end
