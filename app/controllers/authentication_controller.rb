class AuthenticationController < ApplicationController
  before_filter :authenticate_user, :only => [:account_settings, :set_account_info]

  def sign_in
    @user = User.new
  end

  # ========= Signing In ==========

  def login
    username_or_email = params[:user][:username]
    user = verify_user(username_or_email)

    if user
      update_authentication_token(user, params[:user][:remember_me])
      user.last_signed_in_on=DateTime.now
      user.save
      session[:user_id] = user.id
      #flash[:notice] = 'Welcome.'
      flash[:notice] = ''
      redirect_to :root
    else
      flash.now[:error] = 'Unknown user.  Please check your username and password.'
      render :action => "sign_in"
    end
  end






  # ========= Signing Out ==========

  def signed_out
    # clear the authentication toke when the user manually signs out
    user = User.find_by_id(session[:user_id])

    if user
      update_authentication_token(user, nil)
      user.save
      session[:user_id] = nil
      flash[:notice] = "You have been signed out."
    else
      redirect_to :sign_in
    end
  end

  # ========= Handles Registering a New User ==========

  def new_user
    @user = User.new
    # @project_options = Project.all.map{|u| [ u.project_name, u.id ] }
    # @role_options = Role.all.map{|u| [ u.role_name, u.id ] }

    # @user_list = User.all.map{|u| [ u.username, u.id ] } works
    @user_list = User.all



    # User.all.each { |u|
    #   puts u.username
    #   puts "--------"
    # }
  end

  def register
    @user = User.new(params[:user])

    # Don't use !verify_recaptcha, as this terminates the connection with the server.
    # It almost seems as if the verify_recaptcha is being called twice with we use "not".
    # if verify_recaptcha
      if @user.valid?
        update_authentication_token(@user, nil)
        @user.signed_up_on = DateTime.now
        @user.last_signed_in_on = @user.signed_up_on
        #puts "==================="

        # selected = params[:projects_assigned]
        # puts selected.to_s
        @user.projects_assigned = params[:projects_assigned].to_s

        @user.roles_assigned = params[:roles_assigned].to_s

        puts @user.projects_assigned
        puts @user.roles_assigned
        puts "==================="
        @user.save
        # UserMailer.welcome_email(@user).deliver
        session[:user_id] = @user.id
        flash[:notice] = 'Welcome.'
        redirect_to :root
      else
        render :action => "new_user"
      end
    # else
    #   flash.delete(:recaptcha_error)  # get rid of the recaptcha error being flashed by the gem.
    #   flash.now[:error] = 'reCAPTCHA is incorrect.  Please try again.'
    #   render :action => "new_user"
    # end
  end

  #========== Project Registration ============

  def new_project
    @project = Project.new
  end

  def project_register
    @project = Project.new(params[:project])

    # Don't use !verify_recaptcha, as this terminates the connection with the server.
    # It almost seems as if the verify_recaptcha is being called twice with we use "not".
    #if verify_recaptcha
      if @project.valid?
        #update_authentication_token(@project, nil)
        #@user.signed_up_on = DateTime.now
        #@user.last_signed_in_on = @user.signed_up_on
        @project.save
        # UserMailer.welcome_email(@user).deliver
        #session[:user_id] = @user.id
        flash[:notice] = 'Project registered succesfully.'
        redirect_to :root
      else
        render :action => "new_user"
      end
    # else
    #   flash.delete(:recaptcha_error)  # get rid of the recaptcha error being flashed by the gem.
    #   flash.now[:error] = 'reCAPTCHA is incorrect.  Please try again.'
    #   render :action => "new_user"
    # end
  end


  #=========== New Storage Configuration

  def storage_configuration
    @storage = Storages.new
  end

  def new_storage_configuration
    @storage = Storages.new(params[:storages])

    # Don't use !verify_recaptcha, as this terminates the connection with the server.
    # It almost seems as if the verify_recaptcha is being called twice with we use "not".
    #if verify_recaptcha
    if @storage.valid?
      #update_authentication_token(@project, nil)
      #@user.signed_up_on = DateTime.now
      #@user.last_signed_in_on = @user.signed_up_on
      @storage.save
      # UserMailer.welcome_email(@user).deliver
      #session[:user_id] = @user.id
      flash[:notice] = 'Storage configured succesfully.'
      redirect_to :root
    else
      render :action => "new_user"
    end
    # else
    #   flash.delete(:recaptcha_error)  # get rid of the recaptcha error being flashed by the gem.
    #   flash.now[:error] = 'reCAPTCHA is incorrect.  Please try again.'
    #   render :action => "new_user"
    # end
  end

  #=========== New Server Registration

  def register_server
    @server = Server.new
  end

  def new_server_registration
    @server = Server.new(params[:server])

    # Don't use !verify_recaptcha, as this terminates the connection with the server.
    # It almost seems as if the verify_recaptcha is being called twice with we use "not".
    #if verify_recaptcha
    if @server.valid?
      #update_authentication_token(@project, nil)
      #@user.signed_up_on = DateTime.now
      #@user.last_signed_in_on = @user.signed_up_on
      @server.save
      # UserMailer.welcome_email(@user).deliver
      #session[:user_id] = @user.id
      flash[:notice] = 'Server registration succesful.'
      redirect_to :root
    else
      render :action => "new_user"
    end
    # else
    #   flash.delete(:recaptcha_error)  # get rid of the recaptcha error being flashed by the gem.
    #   flash.now[:error] = 'reCAPTCHA is incorrect.  Please try again.'
    #   render :action => "new_user"
    # end
  end



  #=========== New Database Registration

  def register_database
    @database = Database.new
    @server_options = Server.all.map{|u| [ u.server_name, u.id ] }
  end

  def new_database_registration
    @database = Database.new(params[:database])

    # Don't use !verify_recaptcha, as this terminates the connection with the server.
    # It almost seems as if the verify_recaptcha is being called twice with we use "not".
    #if verify_recaptcha
    if @database.valid?
      #update_authentication_token(@project, nil)
      #@user.signed_up_on = DateTime.now
      #@user.last_signed_in_on = @user.signed_up_on
      @database.server = params[:server].to_s
      @database.save
      # UserMailer.welcome_email(@user).deliver
      #session[:user_id] = @user.id
      flash[:notice] = 'Database registration succesful.'
      redirect_to :root
    else
      render :action => "new_user"
    end
    # else
    #   flash.delete(:recaptcha_error)  # get rid of the recaptcha error being flashed by the gem.
    #   flash.now[:error] = 'reCAPTCHA is incorrect.  Please try again.'
    #   render :action => "new_user"
    # end
  end


  #=========== smoke test

  def smoke_test
    # @server = Server.new
  end

  def smoke_test

    # @server = Server.new(params[:server])
    #
    # if @server.valid?
    #   @server.save
    #   flash[:notice] = 'Server registration succesful.'
    #   redirect_to :root
    # else
    #   render :action => "new_user"
    # end
  end



  # ========== New Role Details registration

  def new_role
    @role = Role.new
     @privilege_options = Privilege.all.map{|u| [ u.privilege_name, u.id ] }
    puts "----------"
     puts @privilege_options
  end

  def role_register
    @role = Role.new(params[:role])
    # @privilege = Privilege.new(params[:privilege])

    # Don't use !verify_recaptcha, as this terminates the connection with the server.
    # It almost seems as if the verify_recaptcha is being called twice with we use "not".
    #if verify_recaptcha
    if @role.valid?
      #update_authentication_token(@project, nil)
      #@user.signed_up_on = DateTime.now
      #@user.last_signed_in_on = @user.signed_up_on
      puts "======================="
      puts @role.role_name
      #selected = params[:assigned_privileges_id]

      # I always get the last clicked car item

      #puts selected.to_s
      @role.assigned_privileges_id = params[:assigned_privileges_id].to_s
       puts "-----------"

       puts @role.assigned_privileges_id
      puts "==================="
      @role.save
      # UserMailer.welcome_email(@user).deliver
      #session[:user_id] = @user.id
      flash[:notice] = 'Role registered succesfully.'
      redirect_to :root
    else
      render :action => "new_role"
    end
    # else
    #   flash.delete(:recaptcha_error)  # get rid of the recaptcha error being flashed by the gem.
    #   flash.now[:error] = 'reCAPTCHA is incorrect.  Please try again.'
    #   render :action => "new_user"
    # end
  end


  # ========= account password change

  def account_settings1
    @user1 = current_user1
  end

  def set_account_info1
    puts "=======set account info1====="
    old_user = current_user1

    puts "=======calling authenticate====="
    # verify the current password by creating a new user record.
    @user1 = Users1.authenticate_by_username(old_user.username, params[:user1][:password])


    puts "here"
    # verify
    if @user1.nil?

      @user1 = old_user
      @user1.errors[:password] = "Password is incorrect."
      render :action => "account_settings1"
    else
      # update the user with any new username and email
      puts "else----"
      @user1.update(params[:user1])
      # Set the old email and username, which is validated only if it has changed.
      @user1.previous_email = old_user.email
      @user1.previous_username = old_user.username

      if @user1.valid?
        # If there is a new_password value, then we need to update the password.
        @user1.password = @user1.new_password unless @user1.new_password.nil? || @user1.new_password.empty?
        puts "===saving pwd====="
        @user1.save
        flash[:notice] = 'Account settings have been changed.'
        redirect_to :root
      else
        render :action => "account_settings1"
      end
    end
  end

  # ========= Handles Changing Account Settings ==========

  def account_settings
    @user = current_user
  end

  def set_account_info
    old_user = current_user

    # verify the current password by creating a new user record.
    @user = User.authenticate_by_username(old_user.username, params[:user][:password])

    # verify
    if @user.nil?
      @user = old_user
      @user.errors[:password] = "Password is incorrect."
      render :action => "account_settings"
    else
      # update the user with any new username and email
      @user.update(params[:user])
      # Set the old email and username, which is validated only if it has changed.
      @user.previous_email = old_user.email
      @user.previous_username = old_user.username

      if @user.valid?
        # If there is a new_password value, then we need to update the password.
        @user.password = @user.new_password unless @user.new_password.nil? || @user.new_password.empty?
        @user.save
        flash[:notice] = 'Account settings have been changed.'
        redirect_to :root
      else
        render :action => "account_settings"
      end
    end
  end

  # ========= Handles Password Reset ==========

  # HTTP get
  def forgot_password
    @user = User.new
  end

  # HTTP put
  def send_password_reset_instructions
    username_or_email = params[:user][:username]

    if username_or_email.rindex('@')
      user = User.find_by_email(username_or_email)
    else
      user = User.find_by_username(username_or_email)
    end

    if user
      user.password_reset_token = SecureRandom.urlsafe_base64
      user.password_expires_after = 24.hours.from_now
      user.save
      UserMailer.reset_password_email(user).deliver
      flash[:notice] = 'Password instructions have been mailed to you.  Please check your inbox.'
      redirect_to :sign_in
    else
      @user = User.new
      # put the previous value back.
      @user.username = params[:user][:username]
      @user.errors[:username] = 'is not a registered user.'
      render :action => "forgot_password"
    end
  end

  # The user has landed on the password reset page, they need to enter a new password.
  # HTTP get
  def password_reset
    token = params.first[0]
    @user = User.find_by_password_reset_token(token)

    if @user.nil?
      flash[:error] = 'You have not requested a password reset.'
      redirect_to :root
      return
    end

    if @user.password_expires_after < DateTime.now
      clear_password_reset(@user)
      @user.save
      flash[:error] = 'Password reset has expired.  Please request a new password reset.'
      redirect_to :forgot_password
    end
  end

  # The user has entered a new password.  Need to verify and save.
  # HTTP put
  def new_password
    username = params[:user][:username]
    @user = User.find_by_username(username)

    if verify_new_password(params[:user])
      @user.update(params[:user])
      @user.password = @user.new_password

      if @user.valid?
        clear_password_reset(@user)
        @user.save
        flash[:notice] = 'Your password has been reset.  Please sign in with your new password.'
        redirect_to :sign_in
      else
        render :action => "password_reset"
      end
    else
      @user.errors[:new_password] = 'Cannot be blank and must match the password verification.'
      render :action => "password_reset"
    end
  end

  # ========= Private Functions ==========

  private

  def clear_password_reset(user)
    user.password_expires_after = nil
    user.password_reset_token = nil
  end

  def verify_new_password(passwords)
    result = true

    if passwords[:new_password].blank? || (passwords[:new_password] != passwords[:new_password_confirmation])
      result=false
    end

    result
  end

  # Verifies the user by checking their email and password or their username and password
  def verify_user(username_or_email)
    password = params[:user][:password]
    if username_or_email.rindex('@')
      email=username_or_email
      user = User.authenticate_by_email(email, password)
    else
      username=username_or_email
      user = User.authenticate_by_username(username, password)
    end

    user
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
