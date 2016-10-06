require 'test_helper'

class Storage1sControllerTest < ActionController::TestCase
  setup do
    @storage1 = storage1s(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:storage1s)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create storage1" do
    assert_difference('Storage1.count') do
      post :create, storage1: { cloud_master: @storage1.cloud_master, primary_repository: @storage1.primary_repository, storage_id: @storage1.storage_id, storage_name: @storage1.storage_name, storage_type: @storage1.storage_type }
    end

    assert_redirected_to storage1_path(assigns(:storage1))
  end

  test "should show storage1" do
    get :show, id: @storage1
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @storage1
    assert_response :success
  end

  test "should update storage1" do
    put :update, id: @storage1, storage1: { cloud_master: @storage1.cloud_master, primary_repository: @storage1.primary_repository, storage_id: @storage1.storage_id, storage_name: @storage1.storage_name, storage_type: @storage1.storage_type }
    assert_redirected_to storage1_path(assigns(:storage1))
  end

  test "should destroy storage1" do
    assert_difference('Storage1.count', -1) do
      delete :destroy, id: @storage1
    end

    assert_redirected_to storage1s_path
  end
end
