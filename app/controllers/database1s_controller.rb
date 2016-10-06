class Database1sController < ApplicationController
  before_filter :authenticate_user
  def authenticate_user
    if current_user.nil?
      flash[:error] = 'You must be signed in to view that page.'
      redirect_to :root
    end
  end
  # GET /database1s
  # GET /database1s.json
  def index
    @database1s = Database1.all
    @server_options = Server.all.map{|u| [ u.server_name, u.id ] }
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @database1s }
    end
  end

  # GET /database1s/1
  # GET /database1s/1.json
  def show
    @database1 = Database1.find(params[:id])
    @server_options = Server.all.map{|u| [ u.server_name, u.id ] }
    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @database1 }
    end
  end

  # GET /database1s/new
  # GET /database1s/new.json
  def new
    @database1 = Database1.new
    @server_options = Server.all.map{|u| [ u.server_name, u.id ] }
    @datacenter_options = Datacenter.all.map{|u| [ u.name, u.id ] }
    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @database1 }
    end
  end

  # GET /database1s/1/edit
  def edit
    @database1 = Database1.find(params[:id])

    @server_options = Server.all.map{|u| [ u.server_name, u.id ] }
    @datacenter_options = Datacenter.all.map{|u| [ u.name, u.id ] }
  end

  # POST /database1s
  # POST /database1s.json
  def create
    @database1 = Database1.new(params[:database1])
    @database1.server = params[:server].to_s
    @database1.location = params[:location].to_s
    @database1.db_type = params[:db_type].to_s
    respond_to do |format|
      if @database1.save
        format.html { redirect_to @database1, notice: 'Database was successfully registered.' }
        format.json { render json: @database1, status: :created, location: @database1 }
      else
        format.html { render action: "new" }
        format.json { render json: @database1.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /database1s/1
  # PUT /database1s/1.json
  def update
    @database1 = Database1.find(params[:id])

    respond_to do |format|
      if @database1.update_attributes(params[:database1])
        format.html { redirect_to @database1, notice: 'Database was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @database1.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /database1s/1
  # DELETE /database1s/1.json
  def destroy
    @database1 = Database1.find(params[:id])
    @database1.destroy

    respond_to do |format|
      format.html { redirect_to database1s_url }
      format.json { head :no_content }
    end
  end
end
