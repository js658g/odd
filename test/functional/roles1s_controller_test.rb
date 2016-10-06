require 'test_helper'

class Roles1sControllerTest < ActionController::TestCase
  setup do
    @roles1 = roles1s(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:roles1s)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create roles1" do
    assert_difference('Roles1.count') do
      post :create, roles1: { assigned_privileges_id: @roles1.assigned_privileges_id, role_description: @roles1.role_description, role_name: @roles1.role_name }
    end

    assert_redirected_to roles1_path(assigns(:roles1))
  end

  test "should show roles1" do
    get :show, id: @roles1
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @roles1
    assert_response :success
  end

  test "should update roles1" do
    put :update, id: @roles1, roles1: { assigned_privileges_id: @roles1.assigned_privileges_id, role_description: @roles1.role_description, role_name: @roles1.role_name }
    assert_redirected_to roles1_path(assigns(:roles1))
  end

  test "should destroy roles1" do
    assert_difference('Roles1.count', -1) do
      delete :destroy, id: @roles1
    end

    assert_redirected_to roles1s_path
  end
end
