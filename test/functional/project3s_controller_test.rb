require 'test_helper'

class Project3sControllerTest < ActionController::TestCase
  setup do
    @project3 = project3s(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:project3s)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create project3" do
    assert_difference('Project3.count') do
      post :create, project3: { project_description: @project3.project_description, project_name: @project3.project_name, reusable: @project3.reusable }
    end

    assert_redirected_to project3_path(assigns(:project3))
  end

  test "should show project3" do
    get :show, id: @project3
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @project3
    assert_response :success
  end

  test "should update project3" do
    put :update, id: @project3, project3: { project_description: @project3.project_description, project_name: @project3.project_name, reusable: @project3.reusable }
    assert_redirected_to project3_path(assigns(:project3))
  end

  test "should destroy project3" do
    assert_difference('Project3.count', -1) do
      delete :destroy, id: @project3
    end

    assert_redirected_to project3s_path
  end
end
