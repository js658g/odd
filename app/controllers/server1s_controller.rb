class Server1sController < ApplicationController
  # GET /server1s
  # GET /server1s.json
  def index
    @server1s = Server1.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @server1s }
    end
  end

  # GET /server1s/1
  # GET /server1s/1.json
  def show
    @server1 = Server1.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @server1 }
    end
  end

  # GET /server1s/new
  # GET /server1s/new.json
  def new
    @server1 = Server1.new

    @server_options = Server1.all.map{|u| [ u.server_name, u.id ] }
    @server_ips = Server1.all.map{|u| [ u.IP, u.id ] }
    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @server1 }
    end
  end


  def test
    puts "========test method=========="
    serv = params[:destServ]
    puts serv
    puts "---------"
    @server1_1 = Server1.find(params[:destServ])
    puts "ip addresses: #{@server1_1.IP}"
    @ip_list = @server1_1.IP
    puts @ip_list
    respond_to do |format|
      format.js
      format.html
#      format.json { render json: @server1s }
    end

    puts "=========================="
  end

  # GET /server1s/1/edit
  def edit
    @server1 = Server1.find(params[:id])
  end

  # POST /server1s
  # POST /server1s.json
  def create
    @server1 = Server1.new(params[:server1])
    #@roles1.assigned_privileges_id = params[:assigned_privileges_id].to_s
    @server1.IP = params[:IP].to_s
    @server1.IPRouting = params[:IPRouting].to_s

    #@users1.projects_assigned = params[:projects_assigned].to_s
    puts "=====create ====="
    puts params[:IP].to_s
    puts @server1.IP
    puts "=====end ====="
    respond_to do |format|
      if @server1.save
        format.html { redirect_to @server1, notice: 'Server was successfully created.' }
        format.json { render json: @server1, status: :created, location: @server1 }
      else
        format.html { render action: "new" }
        format.json { render json: @server1.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /server1s/1
  # PUT /server1s/1.json
  def update
    @server1 = Server1.find(params[:id])

    respond_to do |format|
      if @server1.update_attributes(params[:server1])
        format.html { redirect_to @server1, notice: 'Server was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @server1.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /server1s/1
  # DELETE /server1s/1.json
  def destroy
    @server1 = Server1.find(params[:id])
    @server1.destroy

    respond_to do |format|
      format.html { redirect_to server1s_url }
      format.json { head :no_content }
    end
  end
end
