class Users1sController < ApplicationController
  before_filter :authenticate_user
  def authenticate_user
    if current_user.nil?
      flash[:error] = 'You must be signed in to view that page.'
      redirect_to login_path
    end
  end
  # GET /users1s
  # GET /users1s.json
  # def issue_params
  #   params.require(:users1).permit(:tags, :password_field, :description, :email, :is_admin, :phone, :projects_assigned, :roles_assigned, :username, :password, :password_confirmation, :new_password, :new_password_confirmation)
  # end
  # before_filter :set_form_variables, only: [:new, :index]
  # private
  # def set_form_variables
  #   @users1 = Users1.new
    # @projects = Project.all
  # end
  def index
    @users1s = Users1.all
    # @projects = Project.all
    # @projects_assigned = @users1.project_users1s.all

    # @roles = Role.all
    # @roles_assigned = @users1.role_users1s
    # @project_options = Projects1.all.map{|u| [ u.project_name, u.id ] }
    # @role_options = Roles1.all.map{|u| [ u.role_name, u.id ] }
    # @project_options = Project3.all.map{|u| [ u.project_name, u.id ] }
    # @role_options = Roles1.all.map{|u| [ u.role_name, u.id ] }

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @users1s }
    end
  end

  # GET /users1s/1
  # GET /users1s/1.json
  def show
    @users1 = Users1.find(params[:id])
    @existing_projects_roles = ProjectRoleUsers1.where(:users1_id => params[:id])
    @projects = Project.all
    # @projects_assigned = @users1.project_users1s

    @roles = Role.all
    # @roles_assigned = @users1.role_users1s

    # @role_options = Roles1.all.map{|u| [ u.role_name, u.id ] }
    # @project_options = Projects1.all.map{|u| [ u.project_name, u.id ] }
    # @project_options = Project3.all.map{|u| [ u.project_name, u.id ] }
    # @users.projects_assigned
    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @users1 }
    end
  end

  # GET /users1s/new
  # GET /users1s/new.json
  def new
    puts "============new=============="
    @users1 = Users1.new
    @projects = Project.all
    @roles = Role.all

    # params.require(:users1s).permit(:project_name, :project_ids => [])

    # @projects_options = Project.all.map{|u| [ u.project_name, u.id ] }

    # @team = Team.new
    # @users = User.all

    # @users1.project3s.build
    # @project_options = Projects1.all.map{|u| [ u.project_name, u.id ] }
    # @project_options = Project3.all.map{|u| [ u.project_name, u.id ] }
    # @role_options = Roles1.all.map{|u| [ u.role_name, u.id ] }


    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @users1 }
    end
  end

  # GET /users1s/1/edit
  def edit
    puts "--------------edit-----------------"
    @users1 = Users1.find(params[:id])
    @existing_projects_roles = ProjectRoleUsers1.where(:users1_id => params[:id])

    @projects = Project.all
    # @projects_assigned = @users1.project_users1s

    @roles = Role.all
    # @roles_assigned = @users1.role_users1s


    # puts @projects
    puts "===----====="
    # @projects = Project.find(@projects)
    # puts @projects_assigned
    puts "===----====="
    # @projects_assigned.each do |g|
    #   puts g.project_id
    #   puts "--"
    #   puts (Project.find(g.project_id)).project_name #(undefined method `to_i' for
    # end


    #@projects = Project.all
    # @projectusers1 = @users1.projectusers1
    #@projects_assigned = ProjectUsers1.where(:users1_id => params[:id])

    # puts @projects_assigned


    puts "==="

    # @role_options = Roles1.all.map{|u| [ u.role_name, u.id ] }
    # @project_options = Projects1.all.map{|u| [ u.project_name, u.id ] }
    # @project_options = Project3.all.map{|u| [ u.project_name, u.id ] }

    #puts "username: #{@users1.username}"
    #puts @role_options
    #puts @users1.projects_assigned
    #@users1.projects_assigned = Users1.new(project_assigned: 2)
    # puts @users1.projects_assigned
    # @users1 = Users1.new(roles_assigned: 2)
    # puts @users1.roles_assigned

      #@users1 = Users1.new(project_assigned: 2)
  end

  # POST /users1s
  # POST /users1s.json
  def create
    puts "================create=============="
    @projects = Project.all
    @roles = Role.all
    @users1 = Users1.new(params[:users1])

    respond_to do |format|
    if @users1.save
      params[:projects_roles].each do |g|
        ips = g.split("-")
        puts "====="
        puts ips[0].strip
        puts ips[1].strip

        @projid = (Project.where(:project_name => ips[0].strip)).first
        puts @projid.id

        puts (Project.where(:project_name => ips[0].strip))
        puts (Role.where(:role_name => ips[1].strip))
        ProjectRoleUsers1.create!(users1_id: @users1.id, project_id: ((Project.where(:project_name => ips[0].strip)).first).id, role_id: ((Role.where(:role_name => ips[1].strip)).first).id) #(undefined method `to_i' for
      end




      # @project_ids = Project.where(:id => params[:projects])
      # @role_ids = Role.where(:id => params[:roles])
      #
      #
      # @project_ids.each do |g|
      #    ProjectUsers1.create!(users1_id: @users1.id, project_id: Project.find(g).id) #(undefined method `to_i' for
     # end

     # @role_ids.each do |g|
      #  RoleUsers1.create!(users1_id: @users1.id, role_id: Role.find(g).id) #(undefined method `to_i' for
     # end

      format.html { redirect_to @users1, notice: 'User was successfully created.' }
      format.json { render json: @users1, status: :created, location: @users1 }

    else
      puts "---else block---"
        format.html { render action: "new" }
        format.json { render json: @users1.errors, status: :unprocessable_entity }
    end
    end
  end
  # PUT /users1s/1
  # PUT /users1s/1.json
  def update
    puts "----------------Update---------------"

    @users1 = Users1.find(params[:id])

    respond_to do |format|
      if @users1.update_attributes(params[:users1])
        @project_ids = Project.where(:id => params[:projects])
        @role_ids = Role.where(:id => params[:roles])
        puts "======================="
        puts @project_ids
        puts "=================="
        # @users1.project_users1s.delete
        # @users1.project_users1s.clear

        # @project_ids = Project.where(:id => params[:projects])


        @pru = ProjectRoleUsers1.where(:users1_id => params[:id])
        if @pru.exists?
          @pru.destroy_all
        else
          # do nothing
        end
        puts "==========="
        puts params[:projects_roles]
        params[:projects_roles].each do |g|

          ips = g.split("-")
          puts ips
          puts "====="
          puts ips[0].strip
          puts ips[1].strip

          @projid = (Project.where(:project_name => ips[0].strip)).first
          puts @projid.id

          puts (Project.where(:project_name => ips[0].strip))
          puts (Role.where(:role_name => ips[1].strip))
          ProjectRoleUsers1.create!(users1_id: @users1.id, project_id: ((Project.where(:project_name => ips[0].strip)).first).id, role_id: ((Role.where(:role_name => ips[1].strip)).first).id) #(undefined method `to_i' for
        end




        # @pu = ProjectUsers1.where(:users1_id => params[:id])
        # @ru = RoleUsers1.where(:users1_id => params[:id])
        # @pu.destroy_all
        # @ru.destroy_all


        # @project_ids = Project.where(:id => params[:projects])
        # @role_ids = Role.where(:id => params[:roles])
        #
        # @project_ids.each do |g|
        #   ProjectUsers1.create!(users1_id: @users1.id, project_id: Project.find(g).id) #(undefined method `to_i' for
        # end
        # @role_ids.each do |g|
        #   RoleUsers1.create!(users1_id: @users1.id, role_id: Role.find(g).id) #(undefined method `to_i' for
        # end

        #
        # @pu.update_attributes
        # gu = g.groups_users.where('user_id = ?',u.id)
        # gu.update_attributes (:status => 'inactive')

        # pu = g.project_users1s.where('user_id = ?',u.id)
        # pu.update_attributes (:project_id => '@project_ids')

        # project_users1s.update_attributes()
        puts "deleted..."

        # users1_params[:project_users1s_attributes][:project_id].each do |g|
        #   @users1.projects << Project.find(g).id
        # end

        # @project.update!(project_params.except :genres_projects_attributes)

         @project_ids.each do |g|
           # ProjectUsers1.update_attributes(users1_id: @users1.id, project_id: Project.find(g).id) #(undefined method `to_i' for
         end

        format.html { redirect_to @users1, notice: 'User was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @users1.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /users1s/1
  # DELETE /users1s/1.json
  def destroy
    puts "----------delete------------"
    @users1 = Users1.find(params[:id])
    @pru = ProjectRoleUsers1.where(:users1_id => params[:id])
    @pru.destroy_all

    @users1.destroy

    respond_to do |format|
      format.html { redirect_to users1s_url }
      format.json { head :no_content }
    end
  end

  def update_authentication_token(user, remember_me)
    if remember_me == 1
      # create an authentication token if the user has clicked on remember me
      auth_token = SecureRandom.urlsafe_base64
      user.authentication_token = auth_token
      cookies.permanent[:auth_token] = auth_token
    else              # nil or 0
      # if not, clear the token, as the user doesn't want to be remembered.
      user.authentication_token = nil
      cookies.permanent[:auth_token] = nil
    end
  end



end
