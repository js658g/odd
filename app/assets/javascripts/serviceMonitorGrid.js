var diameter = 600,
	format = d3.format(",d"),
	color = d3.scale.category20c();

var bubble = d3.layout.pack()
	.sort(null)
	.size([diameter, diameter])
	.padding(0.5);

function serviceMonitorGrid(url)
{
	var grid;
	
	var data = [];
	var columns = [ {	
		id : "service",
		name : "SERVICE",
		field : "SERVICE",
		width : 100,
		resizable: true
	}, {
		id : "status",
		name : "STATUS",
		field : "STATUS",
		sortable : true,
		width : 70,
		resizable: true,
		//formatter: Slick.Formatters.Status
		formatter: statusServiceFormatter
	}, {
		id : "server",
		name : "SERVER",
		field : "SERVER",
		sortable : true,
		width : 120,
		resizable: true
	}, {
		id : "port",
		name : "PORT",
		field : "PORT",
		sortable : true,
		width : 80,
		resizable: true
	},{
		id : "started",
		name : "STARTED",
		field : "STARTED",
		sortable : true,
		width : 190,
		minWidth : 150,
		maxWidth : 200,
		resizable: true,
		formatter: nullFormatter			
	}, {
		id : "stopped",
		name : "STOPPED",
		field : "STOPPED",
		sortable : true,
		width : 190,
		minWidth : 150,
		maxWidth : 190,
		resizable: true,
		formatter: nullFormatter			
	}, {
		id : "Time",
		name : "TIME",
		field : "TIME",
		sortable : true,
		width : 190,
		minWidth : 150,
		maxWidth : 190,
		resizable: true				
	} ];

	var options = {
		editable : false,
		enableAddRow : false,
		enableCellNavigation : true,
		rowHeight: 27
	};
	
	$(document).ready(function() {
		
		$.getJSON(url, function(jsonData) {
			data = jsonData;	
			//displayGrid("#serviceContainerGrid", data, columns, options);
			grid = new Slick.Grid("#serviceContainerGrid", data, columns, options);
				
			setInterval(function(){
				$.getJSON(url, function(jsonData) {				
					data = jsonData;	
					//displayGrid("#serviceContainerGrid", data, columns, options);
					grid.setData(data, false);
					grid.render();
					//alert("Service Monitor called again");
				});
			}
			,10000);
			d3.select(self.frameElement).style("height", diameter + "px");
			
			
		});
	});	
} 

function handleGridClickEvent(e) {
    var cell = grid.getCellFromEvent(e);
    if (grid.getColumns()[cell.cell].id == "service") {
  	  	//console.log(cell);
  	    //console.log(e);
    	//alert("Here service: " + e.target.innerText);
  	  	window.location = "../mvc/oddresources/Resources?schedulerId=" + e.target.innerText; 	  	
    }
    if (grid.getColumns()[cell.cell].id == "linkid") {
  	  	//console.log(cell);
  	    //console.log(e);
    	//alert("Here linkid: " + e.target.innerText);
  	  	window.location = "../mvc/oddlinks/Links?linkid=" + e.target.innerText; 	  	
    }
}

function displayGrid(id, data, columns, options)
{
	grid = new Slick.Grid(id, data, columns, options);
	grid.onClick.subscribe(handleGridClickEvent);
	
}

function renderChart(jsonData)
{
var node = svg.selectAll(".node")
	  .data(bubble.nodes(classes(jsonData))
	  .filter(function(d) { return !d.children; }))
	.enter().append("g")
	  .attr("class", "node")
	  .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
	  
  node.append("title")
	  .text(function(d) { return d.className + "  " + d.host + ":" + d.value + ": " + d.status;  });

  node.append("circle")
	  .attr("r", function(d) { return d.r*0.75; })
	  .style("fill", function(d) { return color(d.packageName); });

  node.append("text")
	  .attr("dy", ".3em")
	  .style("text-anchor", "middle")
	  .text(function(d) { return d.className.substring(0, d.r / 3); });
					  
}

// Returns a flattened hierarchy containing all leaf nodes under the root.
function classes(serviceNodes) {
  var classes = [];
  serviceNodes.forEach(function(svcNode){
			classes.push({packageName: svcNode.service, className: svcNode.service, value: svcNode.port, host: svcNode.server, status: svcNode.status });
  });		 
  return {children: classes};
}
