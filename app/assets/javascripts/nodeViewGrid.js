function showNodeViewGrid(url){
	  //alert("Calling showNodeViewGrid");

	  var grid;
	  var data = [];
	  var columns = [
	    {id: "name", name: "Node Name", field: "name", sortable : true, width: 200}
	  ];
	  
	  var currentServer;

	    columns.push({
	      id: "cpu",
	      name: "CPU %" ,
	      field: "cpuvalue", 
	      sortable : true,
	      width: 130,
	      resizable: true,
	      formatter: cpuUtilizationFormatter
	    });
	    columns.push({
	      id: "mempct",
	      name: "Memory %" ,
	      field: "mempct", 
	      sortable : true,
	      width: 130,
	      resizable: true,
	      formatter: memUtilizationFormatter
		});
	    columns.push({
	      id: "memact", 
	      name: "Memory Actual" ,
	      field: "memvalue", 
	      sortable : true,
	      width: 160,
	      resizable: true,
	      formatter: numberFormatter
		});
	    columns.push({
	      id: "totmem",
	      name: "Memory Total",
	      field: "totmem",
	      sortable : true,
	      width: 160,
	      resizable: true,
	      formatter: numberFormatter
		});
	    columns.push({
	      id: "profiletime",
	      name: "Profile Time",
	      field: "profiletime",
	      sortable : true,
	      width: 160,
	      resizable: true
		});

	  var options = {
	    editable: false,
	    enableAddRow: false,
	    enableCellNavigation: true,
	    cellHighlightCssClass: "changed",
		rowHeight: 27,
		multiColumnSort: true
	  };

	  $(document).ready(function() {
		  
		  $.getJSON(url, function(oddData) {
			  	data = oddData;				  			  
			    grid = new Slick.Grid("#serviceContainerGridNodeView", data, columns, options);
			    
				var changes = {};
				var cpuvalueold = {};
				var memvalueold = {};
				var mempctold = {};				
				var rowsizeold = {};
				var bytesizeold = {};
				var profileTimeold = {};
				
				for (var i = 0; i < data.length; i++) {
					cpuvalueold[i] = data[i].cpuvalue;
					memvalueold[i] = data[i].memvalue;
					mempctold[i] = data[i].mempct;					
					rowsizeold[i] = data[i].rowsize;
					bytesizeold[i] = data[i].bytesize;
					profileTimeold[i] = data[i].profiletime;
				}
				
			    grid.onSort.subscribe(function (e, args) {
			        var cols = args.sortCols;
			        console.log(args);
					console.log(cols);
					data.sort(function (dataRow1, dataRow2) {
			          for (var i = 0, l = cols.length; i < l; i++) {
			            var field = cols[i].sortCol.field;
			            var sign = cols[i].sortAsc ? 1 : -1;
			            var value1 = dataRow1[field], value2 = dataRow2[field];
			            var result = (value1 == value2 ? 0 : (value1 > value2 ? 1 : -1)) * sign;
			            if (result != 0) {
			              return result;
			            }
			          }
			          return 0;
			        });
			        grid.invalidate();
			        grid.render();
			      });
			  
				setInterval(function(){
					$.getJSON(url, function(oddData) {
						data = oddData;
						grid.setData(data, false);
						
						for (var i = 0; i < data.length; i++) {
						/*	
						  var randomselectcpu = Math.random()*10;
						  var randomselectmem = Math.random()*10;
						  var randomselectrowsize = Math.random()*10;
						  var randomselectbytesize = Math.random()*10;
						  if(randomselectcpu >6){	
							  data[i].CPUVALUE = data[i].CPUVALUE * (1 + Math.random()*0.005);
						  }
						  if(randomselectmem >6){
							  data[i].MEMVALUE = data[i].MEMVALUE * (1 + Math.random()*0.005);
						  }
						  if(randomselectrowsize >6){
							  data[i].ROWSIZE = data[i].ROWSIZE * (1 + Math.random()*0.005);
						  }
						  if(randomselectbytesize >6){
							  data[i].BYTESIZE = data[i].BYTESIZE * (1 + Math.random()*0.005);
						  }
						*/  					
					      var deltacpu = Math.abs(data[i].cpuvalue - cpuvalueold[i]);
					      var deltamemact = Math.abs(data[i].memvalue - memvalueold[i]);
					      var deltamempct = Math.abs(data[i].mempct - mempctold[i]);					      
					      var deltarowsize = Math.abs(data[i].rowsize - rowsizeold[i]);
					      var deltabytesize = Math.abs(data[i].bytesize - bytesizeold[i]);
					      
					      if (!changes[i]) {
					        changes[i] = {};
					      }

					      if(deltacpu > 0){					    	  
					    	  changes[i]["cpu"] = "changed";
					      }	else{
							  changes[i]["cpu"] = "unchanged";
						  }
					      
					      if(deltamemact > 0){					    	  
					    	  changes[i]["memact"] = "changed";
					      }	else{
							  changes[i]["memact"] = "unchanged";
						  }
					      
					      if(deltamempct > 0){					    	  
					    	  changes[i]["mempct"] = "changed";
					      }	else{
							  changes[i]["mempct"] = "unchanged";
						  }
					      
					      if(deltarowsize > 0){					    	  
					    	  changes[i]["rows"] = "changed";
					      }	else{
							  changes[i]["rows"] = "unchanged";
						  }
					      
					      if(deltabytesize > 0){					    	  
					    	  changes[i]["bytes"] = "changed";
					      }	else{
							  changes[i]["bytes"] = "unchanged";
						  }
					      
					      if(data[i].PROFILETIME != profileTimeold[i]){					    	  
					    	  changes[i]["profileTime"] = "changed";
					      }	else{
							  changes[i]["profileTime"] = "unchanged";
						  }
					      						      
					      cpuvalueold[i] = data[i].cpuvalue;
					      memvalueold[i] = data[i].memvalue;
					      mempctold[i] = data[i].mempct;
					      rowsizeold[i] = data[i].rowsize;
						  bytesizeold[i] = data[i].bytesize;
						  profileTimeold[i] = data[i].profiletime;
					      
						}

						grid.setCellCssStyles("highlight", changes);											
						grid.render();

					});
				}
				,30000);	    
		  });
		    
	  });
	
}