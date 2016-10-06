class Projects1sController < ApplicationController
  # GET /projects1s
  # GET /projects1s.json
  def index
    puts "=====index method======"
    @projects1s = Projects1.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @projects1s }
    end
  end

  # GET /projects1s/1
  # GET /projects1s/1.json
  def show
    @projects1 = Projects1.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @projects1 }
    end
  end

  # GET /projects1s/new
  # GET /projects1s/new.json
  def new
    @projects1 = Projects1.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @projects1 }
    end
  end

  # GET /projects1s/1/edit
  def edit
    @projects1 = Projects1.find(params[:id])
  end

  # POST /projects1s
  # POST /projects1s.json
  def create
    @projects1 = Projects1.new(params[:projects1])

    respond_to do |format|
      if @projects1.save
        format.html { redirect_to @projects1, notice: 'Project was successfully created.' }
        format.json { render json: @projects1, status: :created, location: @projects1 }
      else
        format.html { render action: "new" }
        format.json { render json: @projects1.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /projects1s/1
  # PUT /projects1s/1.json
  def update
    @projects1 = Projects1.find(params[:id])

    respond_to do |format|
      if @projects1.update_attributes(params[:projects1])
        format.html { redirect_to @projects1, notice: 'Project was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @projects1.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /projects1s/1
  # DELETE /projects1s/1.json
  def destroy
    puts "====destroy method==="
    @projects1 = Projects1.find(params[:id])
    @projects1.destroy

    respond_to do |format|
      # projects1s_path
      # format.html { redirect_to projects1s_url }
      format.html { redirect_to projects1s_path }
      format.json { head :no_content }
    end
  end
end
