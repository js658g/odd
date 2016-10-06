class SessionsController < ApplicationController
    layout "sessions_layout"
  def new
    puts "=========sessions/new=============="
       render :layout => false
  end

  def create

    puts "=========session/create======="
    #user = Users1.find_by(email: params[:session][:email].downcase)
    #user = Users1.find_by_username
    user = Users1.find_by_username(params[:session][:username])

    puts "user: #{user}"
    #pwd = BCrypt::Engine.hash_secret(params[:session][:password], user.password_salt)
    if user && user.password_hash == BCrypt::Engine.hash_secret(params[:session][:password], user.password_salt)

      puts "=========valid user======="
      #flash[:notice] = 'Welcomeeeee.'
      log_in user
      #redirect_to user
      redirect_to :root
    #if user && user.authenticate(params[:session][:password])
      # Log the user in and redirect to the user's show page.
    else
      # Create an error message.
      puts "======invalid user======="

       flash[:danger] = 'Invalid email/password combination' # Not quite right!
        # redirect_to login_path
      # redirect_to login_path, :flash => { :error => "Insufficient rights!" }
       render 'new' #, :layout => false
      # format.html { render "tabelle/show", :layout => false  }
      # respond_to do |format|
      #   redirect_to login_path #, :notice => "Invalid email/password combination"
        # flash[:notice] = 'Invalid email/password combination' # Not quite right!
        #   format.html { render action: "new", :layout => false }

        # end

    end
  end

  def destroy
    log_out
    #redirect_to root_url
    redirect_to login_path
  end
end


