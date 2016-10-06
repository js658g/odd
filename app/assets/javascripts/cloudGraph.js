

function generateCloudGraph(url, imgBase, width, height){

	var svg = d3.select("#cloudGraphView").append("svg").attr("id", "cloudGraphSvg")
			.attr("width", width)
			.attr("height", height);
			
		var force = d3.layout.force()
			.gravity(.05)
			.distance(100)
			.charge(-100)
			.size([width, height]);

		d3.json(url, function(json) {
			force
			  .nodes(json.nodes)
			  .links(json.links)
			  .linkDistance(function(){
				return 200;
			  })
			  .start();

		  var link = svg.selectAll(".link")
			  .data(json.links)
			.enter().append("line")
			  .attr("class", "link");

		  var node = svg.selectAll(".node")
			  .data(json.nodes)
			.enter().append("g")
			  .attr("class", "node")
			  .attr("cursor", "pointer")
			  .call(force.drag);
			
			node.append("circle")			 
			  .attr("cx", function(d){return 0;})
			  .attr("cy", function(d){return 0;})
			  .attr("r", function(d){
					if( d.type=='deployment'){
						return 40;
					}else{
						return (d.depth<=1)?35:25;
					}
			  })	
			  .attr("class", function(d){
										
					if (d.type == "cloud")
					{
						return "nodeCloud"
					}
					else if (d.type == "deployment")
					{
						return "nodeDeployment";
					}
					else
					{
						if(d.healthy==2)
						{
							return "nodeHealthy";
						}else if ( d.healthy==1)
						{
							return "nodeProblem";
						}else 
						{
							return "nodeSick";
						}					
					}
					

			  });			  
			  
		  var imgNode = node.append("image").on("click", clickOnNode)
		      .attr("xlink:href", function(d){
				if(d.type=="deployment"){
					//return imgBase + "/chartNetwork.png";
				}else if (d.type=="cloud"){
					//return imgBase +"/chartCloud.png";
				}else{
					//return imgBase +"/dedicated_server.png";
				}
			  })
			  .attr("x", function(d){return (d.depth<=1)?-32:-24;})
			  .attr("y", function(d){return (d.depth<=1)?-32:-24;})
			  .attr("width", function(d){return (d.depth<=1)?64:48;})
			  .attr("height", function(d){return (d.depth<=1)?64:48;});
					
		  node.append("text")
			  .attr("dx", function(d){return ( d.depth<=0 )?-44:calcuOffset(d.name.length);})
			  .attr("dy", ".45em")
			  .text(function(d) { 
				  return d.name
			  });
		      //.attr("class", "css1");
		  node.append("text")  
		  	  .attr("dx", function(d){return (d.depth<=1)?-15:-15;})
			  .attr("dy", "1.65em")
		  		.text(function(d) { 
			    if (d.type == "cloud"){
			    	return "Cloud";
				}
			    if (d.master == "Master"){
                    return "Master";
                }
                if (d.master == "Slave"){
                    return "Slave";
                }

			  })
			  //.style("font-style","italic")
			  //.style("font-size", "11px");
		      .attr("class", "nodeType");

		  force.on("tick", function() {
			link.attr("x1", function(d) { return d.source.x; })
				.attr("y1", function(d) { return d.source.y; })
				.attr("x2", function(d) { return d.target.x; })
				.attr("y2", function(d) { return d.target.y; });

			node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
		  });
		});
} //end of generate cloudGraph


function calcuOffset(len)
{
	if(len< 8){
		return -22;
	}else if(len>=8 && len < 12){
		return -33;
	}else if(len>=12 && len < 22){
		return -44;
	}else if(len>=22 && len < 32){
		return -70;
	}else{
		return -80;
	}
}

function updateCloudGraphDimensions(url, imgBase, width, height)
{
	//alert("IN UPDATE CLOUD GRAPH DIMENSIONS -- width: " + width + ", height: " + height);

	var force = d3.layout.force()
			.gravity(.05)
			.distance(100)
			.charge(-100)
			.size([width, height]);	
		
		d3.json(url, function(json) {			
			force
			  .nodes(json.nodes)
			  .links(json.links)
			  .linkDistance(function(){
				return 200;
			  }).start();
			  
			  
	d3.select("#cloudGraphView").selectAll("svg").remove();	
				
	var svg = d3.select("#cloudGraphView").append("svg").attr("id", "cloudGraphSvg")
	.attr("width", width)
	.attr("height", height);
		
	  var link = svg.selectAll(".link")
		  .data(json.links)
		.enter().append("line")
		  .attr("class", "link");

	  var node = svg.selectAll(".node")
		  .data(json.nodes)
		.enter().append("g")
		  .attr("class", "node")
		  .attr("cursor", "pointer")
		  .call(force.drag);
		
		node.append("circle")			 
		  .attr("cx", function(d){return 0;})
		  .attr("cy", function(d){return 0;})
		  .attr("r", function(d){
				if( d.type=='deployment'){
					return 40;
				}else{
					return (d.depth<=1)?35:25;
				}
		  })	
		  .attr("class", function(d){
				
				if (d.type == "cloud")
				{
					return "nodeCloud"
				}
				else if (d.type == "deployment")
				{
					return "nodeDeployment";
				}
				else
				{
					if(d.healthy==2)
					{
						return "nodeHealthy";
					}else if ( d.healthy==1)
					{
						return "nodeProblem";
					}else 
					{
						return "nodeSick";
					}					
				}
				
		  });			  
  
		  var imgNode = node.append("image").on("click", clickOnNode)
			  .attr("xlink:href", function(d){
				if(d.type=="deployment"){
					//return imgBase + "/chartNetwork.png";
				}else if (d.type=="cloud"){
					//return imgBase +"/chartCloud.png";
				}else{
					//return imgBase +"/dedicated_server.png";
				}
			  })
			  .attr("x", function(d){return (d.depth<=1)?-32:-24;})
			  .attr("y", function(d){return (d.depth<=1)?-32:-24;})
			  .attr("width", function(d){return (d.depth<=1)?64:48;})
			  .attr("height", function(d){return (d.depth<=1)?64:48;});
		
			  node.append("text")
				  .attr("dx", function(d){return ( d.depth<=0 )?-44:calcuOffset(d.name.length);})
				  .attr("dy", ".45em")
				  .text(function(d) { return d.name });
		      //.attr("class", "css1");
			  node.append("text")  
			  	  .attr("dx", function(d){return (d.depth<=1)?-15:-15;})
				  .attr("dy", "1.65em")
			  		.text(function(d) { 
				    if (d.type == "cloud"){
				    	return "Cloud";
					}
				    if (d.master == "Master"){
                        return "Master";
                    }
                    if (d.master == "Slave"){
                        return "Slave";
                    }
				  })
				  //.style("font-style","italic")
				  //.style("font-size", "11px");
			      .attr("class", "nodeType");
		
			  force.on("tick", function() {
				link.attr("x1", function(d) { return d.source.x; })
					.attr("y1", function(d) { return d.source.y; })
					.attr("x2", function(d) { return d.target.x; })
					.attr("y2", function(d) { return d.target.y; });
		
				node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
			  });
			  
	}); 
	
}

function updateCloudGraph(url, imgBase, width, height){
	
	//alert("IN UPDATE CLOUD GRAPH2 -- width: " + width + ", height: " + height);				
	
	var healthyold = {};
	var healthy = {};
	var delta = {};
	
	setInterval(function(){	
	
		//alert("IN UPDATE CLOUD GRAPH INTERVAL -- width: " + width + ", height: " + height);	
	  
		var force = d3.layout.force()
			.gravity(.05)
			.distance(100)
			.charge(-100)
			.size([width, height]);	
		
		d3.json(url, function(json) {			
			force
			  .nodes(json.nodes)
			  .links(json.links)
			  .linkDistance(function(){
				return 200;
			  }).start();
		    //alert("Getting json data name 1: " + json.nodes[2].name + " & healthy 1: " + json.nodes[2].healthy);
		    //alert("Getting json data name 2: " + json.nodes[3].name + " & healthy 1: " + json.nodes[3].healthy);		
			//alert("Getting json.nodes.length: " + json.nodes.length);
			
			var cloudChange = 0;
			for (var i = 0; i < json.nodes.length; i++) {
				healthy[i] = json.nodes[i].healthy;
				
				delta[i] = healthyold[i] - healthy[i];
				if(delta[i] > 0) cloudChange = 1;
				healthyold[i] = json.nodes[i].healthy;
			}
			
			//alert("cloudChange: " + cloudChange);
			if(cloudChange > 0) {
				//d3.select("#cloudGraphSvg").remove();	
				d3.select("#cloudGraphView").selectAll("svg").remove();	
				
				var svg = d3.select("#cloudGraphView").append("svg").attr("id", "cloudGraphSvg")
				.attr("width", width)
				.attr("height", height);
					
				  var link = svg.selectAll(".link")
					  .data(json.links)
					.enter().append("line")
					  .attr("class", "link");
			
				  var node = svg.selectAll(".node")
					  .data(json.nodes)
					.enter().append("g")
					  .attr("class", "node")
					  .attr("cursor", "pointer")
					  .call(force.drag);
					
					node.append("circle")			 
					  .attr("cx", function(d){return 0;})
					  .attr("cy", function(d){return 0;})
					  .attr("r", function(d){
							if( d.type=='deployment'){
								return 40;
							}else{
								return (d.depth<=1)?35:25;
							}
					  })	
					  .attr("class", function(d){
							
							if (d.type == "cloud")
							{
								return "nodeCloud"
							}
							else if (d.type == "deployment")
							{
								return "nodeDeployment";
							}
							else
							{
								if(d.healthy==2)
								{
									return "nodeHealthy";
								}
								else if ( d.healthy==1)
								{
									return "nodeProblem";
								}
								else 
								{
									return "nodeSick";
								}					
							}
							
					  });			  
			   
					  var imgNode = node.append("image").on("click", clickOnNode)
					      .attr("xlink:href", function(d){
							if(d.type=="deployment"){
								//return imgBase + "/chartNetwork.png";
							}else if (d.type=="cloud"){
								//return imgBase +"/chartCloud.png";
							}else{
								//return imgBase +"/dedicated_server.png";
							}
						  })
						  .attr("x", function(d){return (d.depth<=1)?-32:-24;})
						  .attr("y", function(d){return (d.depth<=1)?-32:-24;})
						  .attr("width", function(d){return (d.depth<=1)?64:48;})
						  .attr("height", function(d){return (d.depth<=1)?64:48;});
					
						  node.append("text")
						  	  .attr("dx", function(d){return ( d.depth<=0 )?-44:calcuOffset(d.name.length);})
							  .attr("dy", ".45em")
							  .text(function(d) { return d.name });
					      //.attr("class", "css1");
						  node.append("text")  
						  	  .attr("dx", function(d){return (d.depth<=1)?-15:-15;})
							  .attr("dy", "1.65em")
						  		.text(function(d) { 
							    if (d.type == "cloud"){
							    	return "Cloud";
								}
							    if (d.master == "Master"){
			                        return "Master";
			                    }
			                    if (d.master == "Slave"){
			                        return "Slave";
			                    }

							  })
							  //.style("font-style","italic")
							  //.style("font-size", "11px");
						      .attr("class", "nodeType");
					
						  force.on("tick", function() {
							link.attr("x1", function(d) { return d.source.x; })
								.attr("y1", function(d) { return d.source.y; })
								.attr("x2", function(d) { return d.target.x; })
								.attr("y2", function(d) { return d.target.y; });
					
							node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
						  });
				}
			});  
	}
	,15000);

} //end of update cloudGraph

function clickOnNode(d)
{
	if(d.type=="deployment"){
		;
	}else if (d.type=="cloud"){
		//var utilparam = "../schedulers/Schedulers?cloudId=" + d.name;
		//alert("utilparam:" + utilparam);
		//document.getElementById("iframe_cloudview").contentWindow.location = utilparam;

		document.getElementById("iframe_dashboard").src = "about:blank";
		document.getElementById("iframe_cpuipaddress").src = "about:blank";
		
		var usageparam = "../secure/capacity/UsageView?cloudId=" + d.name;
		//alert("usageparam:" + usageparam);
		document.getElementById("iframe_usageview").contentWindow.location = usageparam;
		
		//var treeparam = "../mvc/capacity/CollapsibleTree";
		//document.getElementById("iframe_collapsetreeview").contentWindow.location = treeparam;
		//alert("treeparam:" + treeparam);
		
		//var storageparam = "../storages/Storages?cloudId=" + d.name;
		//alert("storageparam:" + storageparam);
		//document.getElementById("iframe_storageview").contentWindow.location = storageparam;
		
		//openIFrame(param);
		//alert("param: " + param);
		//window.location = "../schedulers/Schedulers?cloudId=" + d.name; //target="iframe_schedulers"
	}else if (d.type=="node"){
		console.log(d);
		console.log(d.master);
		//var n = d.name.split(": ");	
		var ipaddr = d.name;
		var node = d.master;
		//alert("n[0]: " + n[0]+ " & n[1]: " + n[1]);
		
		var utilparam = "../secure/capacity/ServerUtilView?node=" + ipaddr;
		//var utilparam = "../mvc/capacity/ServerUtilView?node=" + n[1];
		//alert("utilparam:" + utilparam);
		document.getElementById("iframe_dashboard").contentWindow.location = utilparam;
		
		var usageparam = "../secure/capacity/UsageView?node=" + node +  "&ipaddr=" + ipaddr ;
		//var usageparam = "../mvc/capacity/UsageView?node=" + n[0] +  "&ipaddr=" + n[1] ;
		//alert("usageparam:" + usageparam);
		document.getElementById("iframe_usageview").contentWindow.location = usageparam;
		
		var cpuaddressparam = "../secure/capacity/CpuAddressView?node=" + node +  "&ipaddr=" + ipaddr ;
		//var cpuaddressparam = "../mvc/capacity/CpuAddressView?node=" + n[0] +  "&ipaddr=" + n[1] ;
		//alert("cpuaddressparam:" + cpuaddressparam);
		document.getElementById("iframe_cpuipaddress").contentWindow.location = cpuaddressparam;
		
		//var schedulerparam = "../schedulers/Schedulers?node=" + n[0] +  "&ipaddr=" + n[1] ;
		//alert("schedulerparam:" + schedulerparam);
		//document.getElementById("iframe_cloudview").contentWindow.location = schedulerparam;
		
		//openIFrame(param);
		//alert("param: " + param);
		//window.location = "../schedulers/Schedulers?cloudId=" + d.name; //target="iframe_schedulers"
	}else{
		window.location = "node/nodeId";
	}
}

function openIFrame(param){
	$(document).ready(function(){
		$("#OpenButton").click(function(){
			//alert("Should open");
			d3.select("#iframe_dashboard").attr("src", param);														
		});
	});
}

