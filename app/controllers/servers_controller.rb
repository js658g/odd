class ServersController < ApplicationController
  before_filter :authenticate_user
  respond_to :html, :json, :js
  def authenticate_user
    if current_user.nil?
      flash[:error] = 'You must be signed in to view that page.'
      redirect_to login_path
    end
  end


  # GET /servers
  # GET /servers.json
  def index
    @servers = Server.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @servers }
    end
  end

  # GET /servers/1
  # GET /servers/1.json
  def show
    puts "=================show================="
    @server = Server.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @server }
    end
  end

  # GET /servers/new
  # GET /servers/new.json
  def new
    @server = Server.new

    @server_options = Server.all.map{|u| [ u.server_name, u.id ] }
    # @server_ips = Server.all.map{|u| [ u.IP, u.id ] }


    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @server }
    end
  end
  def test1
    puts "========test11111 method=========="
    serv = params[:destServ]
    puts serv
    puts "---------"
    @serverips = Server.find(params[:destServ])
    puts "ip addresses: #{@serverips.IP}"
    @listIP = @serverips.IP
    puts @listIP
    respond_to do |format|
      format.js
      format.html
    end
    puts "=========================="
    end
  def test
    # puts "========test method=========="
    # serv = params[:destServ]
    # puts serv
    # puts "---------"
    # @server1_1 = Server.find(params[:destServ])
    # puts "ip addresses: #{@server1_1.IP}"
    # @ip_list = @server1_1.IP
    # puts @ip_list
    # respond_to do |format|
    #   format.js
    #   format.html
    # end
    # puts "=========================="



    puts "========test method==========" #mornig first thing why does it say exists method undefined if a recor exists in servers table for id 21
    serv = params[:info]
    puts serv
    puts "---------"
    # @server1_1 = Server.where(:id => params[:destServ]) works returns true
    # @server1_1 = ServerIpRoute.where(:id => params[:destServ]) works perfectly
    @server1_1 = ServerIpRoute.where(:source_id => params[:info]) #works but does not throw ajax popup but redirects


    puts @server1_1.exists?
    @ip_list = @server1_1.exists?

    respond_to do |format|
      format.js #{ render nothing: true }
      format.html
      # format.json #{ render nothing: true }
      # format.html
    end
    puts "=========================="




    # puts "============checkIPRoute============="
    # id = params[:info]
    # puts id
    # puts "---------"
    # # @iproutes = Server.find(params[:id])
    # @iproutes = ServerIpRoute.where(:source_id => params[:info])
    # # @ip_list = @iproutes.protocols
    # # puts @ip_list
    # puts @iproutes
    # @iproutes.each do |g|
    #   puts g.source_id
    #   puts g.source_ip
    #   puts g.destination_id
    #   puts g.destination_ip
    #   puts "--"
    #   puts (Server.find(g.source_id)).server_name #(undefined method `to_i' for
    #
    # end
    # puts "Route Exists: #{@iproutes.exists?}"
    # # @iproutes = @iproutes.exists?
    # # puts @iproutes
    # respond_to do |format|
    #
    #   format.js  #{ render :partial => 'checkIPRoute', :layout => false } #{ render layout: false, content_type: 'text/javascript' }
    #   format.html
    # end
    # puts "=========================="

  end

  def checkIPRoute
    puts "============checkIPRoute============="
    id = params[:id]
    puts id
    puts "---------"
    @iproutes = ServerIpRoute.where(:source_id => params[:id])
    puts @iproutes
    @iproutes.each do |g|
      puts g.source_id
      puts g.source_ip
      puts g.destination_id
      puts g.destination_ip
      puts "--"
      puts (Server.find(g.source_id)).server_name #(undefined method `to_i' for

    end
    puts "Route Exists: #{@iproutes.exists?}"
    @iproutes = @iproutes.exists?
    puts @iproutes
    respond_to do |format|

      format.js  #{ render :partial => 'checkIPRoute', :layout => false } #{ render layout: false, content_type: 'text/javascript' }
      format.html
    end
    puts "=========================="
  end
  # GET /servers/1/edit
  def edit
    puts "=================EDIT================"
    @server = Server.find(params[:id])
     @server_options = Server.all.map{|u| [ u.server_name, u.id ] }

    #@projects_assigned = ProjectUsers1.where(:users1_id => params[:id])
    @existing_routes = ServerIpRoute.where(:source_id => params[:id])

    @existing_routes.each do |g|
      puts g.source_id
      puts g.source_ip
      puts g.destination_id
      puts g.destination_ip
      puts "--"
      puts (Server.find(g.source_id)).server_name #(undefined method `to_i' for

    end

    # puts @server.IP
    #
    # puts @server.IP.delete('[]')
    # @ips_assigned = @server.IP.delete('[]')

    # @ips_assigned.each do |val|
      # puts val
    # end



      # @servers = Server.all
    # @ips_assigned = @server.IP.split(",")

    # puts @server.IP
    # value = params[:IP].to_s
    # puts value
    # puts value.scan(/\d/).join('').to_s
    # @ips_assigned = value
    # puts value
    # value = value.gsub(/\;/, "");
    # puts value
    # value = value.gsub(/\[/, "");
    # puts value
    # @server.IP = value.gsub(/\]/, "");
    # puts @server.IP


  end

  # POST /servers
  # POST /servers.json
  def create
    puts "===============create=============="
    @server = Server.new(params[:server])
    @server.IP = params[:IP].to_s
    puts params[:IPRouting].to_s
    # puts "==============="
    # iproutes = params[:IPRouting].to_s.delete! '[]'
    # puts iproutes
    # puts "==============="
    # puts iproutes.to_s.delete!
    # puts iproutes
    # puts "==============="
    # puts params[:IPRouting].to_s.split(",")

    # @server1.IPRouting = params[:IPRouting].to_s

    # @project_ids = Project.where(:id => params[:projects])
    # @role_ids = Role.where(:id => params[:roles])

    # @project_ids.each do |g|
    #   ServerIpRoute.create!(server_id: @server.id, destination_id: params[:destServ], use_ip: params[:]) #(undefined method `to_i' for
    # end

    # @role_ids.each do |g|
    #   RoleUsers1.create!(users1_id: @users1.id, role_id: Role.find(g).id) #(undefined method `to_i' for
    # end


    respond_to do |format|
      if @server.save
        @server_options = Server.all.map{|u| [ u.server_name, u.id ] }
        params[:IPRouting].each do |g|

          ips = g.split(",")
          puts @server.id
          puts "====="

           puts ips[0] #src ip
           puts ips[1] #dest ip
           puts ips[2]
           # puts params[:dest_server]
           puts "--"
          #dest = Server.where(server_name: ips[2]).first
            puts "+++++"

          @server_options.each do |name, id|
            puts name
            puts id
            if ips[2].strip == name.strip
              puts "inside if"
              ServerIpRoute.create!(source_id: @server.id, destination_id: id, source_ip: ips[0], destination_ip: ips[1]) #(undefined method `to_i' for
              @dest_id = id
            end
          end
          puts "+++++"
          puts @dest_id


          #@dest = Server.find_by_server_name(ips[2])
          #puts @dest
          #puts "--------"

          # puts ips[2] dest ser
          # @items = Supplier.find_by_name('THE NAME').items
          # @destserv = Server.find_by_server_name(ips[2])
          # puts @destserv



        end

        format.html { redirect_to @server, notice: 'Server was successfully created.' }
        format.json { render json: @server, status: :created, location: @server }
      else
        @server_options = Server.all.map{|u| [ u.server_name, u.id ] }

        format.html { render action: "new" }
        format.json { render json: @server.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /servers/1
  # PUT /servers/1.json
  def update
    @server = Server.find(params[:id])
    @server.IP = params[:IP].to_s
    puts "=======================UPDATE================"
    puts params[:IPRouting].to_s


    respond_to do |format|
      if @server.update_attributes(params[:server])
        @server_options = Server.all.map{|u| [ u.server_name, u.id ] }

        @serveriproute = ServerIpRoute.where(:source_id => params[:id])
        @serveriproute.destroy_all

        params[:IPRouting].each do |g|

          ips = g.split(",")
          puts @server.id
          puts "====="

          puts ips[0] #src ip
          puts ips[1] #dest ip
          puts ips[2]
          # puts params[:dest_server]
          puts "--"
          #dest = Server.where(server_name: ips[2]).first
          puts "+++++"

          @server_options.each do |name, id|
            puts name
            puts id
            if ips[2].strip == name.strip
              puts "inside if"
              ServerIpRoute.create!(source_id: @server.id, destination_id: id, source_ip: ips[0], destination_ip: ips[1]) #(undefined method `to_i' for
              @dest_id = id
            end
          end
          puts "+++++"
          puts @dest_id
        end

          format.html { redirect_to @server, notice: 'Server was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @server.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /servers/1
  # DELETE /servers/1.json
  def destroy
    @server = Server.find(params[:id])
    @serveriproute = ServerIpRoute.where(:source_id => params[:id])


    if @server #added because delete gets submitted twice because of the jquery delete alert
      puts "================DELETE================"
      puts params[:id]
      # puts @serveriproute.exists?
      @server.destroy
      puts @serveriproute.exists?
        if @serveriproute.exists?
          puts "ip route exists"
          @serveriproute.destroy_all
        else
          puts "no ip route exists"
        end

      # @serveriproute.destroy_all
      puts "-------deleted successfully------------"
    else
    end
    respond_to do |format|
      format.html #{ redirect_to servers_url }
      format.js   #{ render :layout => false }
    end
  end
end
