require 'test_helper'

class Project2sControllerTest < ActionController::TestCase
  setup do
    @project2 = project2s(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:project2s)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create project2" do
    assert_difference('Project2.count') do
      post :create, project2: { project_description: @project2.project_description, project_name: @project2.project_name, reusable: @project2.reusable, users1s_id: @project2.users1s_id }
    end

    assert_redirected_to project2_path(assigns(:project2))
  end

  test "should show project2" do
    get :show, id: @project2
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @project2
    assert_response :success
  end

  test "should update project2" do
    put :update, id: @project2, project2: { project_description: @project2.project_description, project_name: @project2.project_name, reusable: @project2.reusable, users1s_id: @project2.users1s_id }
    assert_redirected_to project2_path(assigns(:project2))
  end

  test "should destroy project2" do
    assert_difference('Project2.count', -1) do
      delete :destroy, id: @project2
    end

    assert_redirected_to project2s_path
  end
end
