require 'test_helper'

class Projects1sControllerTest < ActionController::TestCase
  setup do
    @projects1 = projects1s(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:projects1s)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create projects1" do
    assert_difference('Projects1.count') do
      post :create, projects1: { project_description: @projects1.project_description, project_name: @projects1.project_name, reusable: @projects1.reusable }
    end

    assert_redirected_to projects1_path(assigns(:projects1))
  end

  test "should show projects1" do
    get :show, id: @projects1
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @projects1
    assert_response :success
  end

  test "should update projects1" do
    put :update, id: @projects1, projects1: { project_description: @projects1.project_description, project_name: @projects1.project_name, reusable: @projects1.reusable }
    assert_redirected_to projects1_path(assigns(:projects1))
  end

  test "should destroy projects1" do
    assert_difference('Projects1.count', -1) do
      delete :destroy, id: @projects1
    end

    assert_redirected_to projects1s_path
  end
end
