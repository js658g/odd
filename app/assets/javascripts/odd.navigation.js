
/**
*
*  Base64 encode / decode
*  http://www.webtoolkit.info/
*
**/
var Base64 = {

// private property
_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

// public method for encoding
encode : function (input) {
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;

    input = Base64._utf8_encode(input);

    while (i < input.length) {

        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }

        output = output +
        this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
        this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

    }

    return output;
},

// public method for decoding
decode : function (input) {
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;

    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

    while (i < input.length) {

        enc1 = this._keyStr.indexOf(input.charAt(i++));
        enc2 = this._keyStr.indexOf(input.charAt(i++));
        enc3 = this._keyStr.indexOf(input.charAt(i++));
        enc4 = this._keyStr.indexOf(input.charAt(i++));

        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;

        output = output + String.fromCharCode(chr1);

        if (enc3 != 64) {
            output = output + String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
            output = output + String.fromCharCode(chr3);
        }

    }

    output = Base64._utf8_decode(output);

    return output;

},

// private method for UTF-8 encoding
_utf8_encode : function (string) {
    string = string.replace(/\r\n/g,"\n");
    var utftext = "";

    for (var n = 0; n < string.length; n++) {

        var c = string.charCodeAt(n);

        if (c < 128) {
            utftext += String.fromCharCode(c);
        }
        else if((c > 127) && (c < 2048)) {
            utftext += String.fromCharCode((c >> 6) | 192);
            utftext += String.fromCharCode((c & 63) | 128);
        }
        else {
            utftext += String.fromCharCode((c >> 12) | 224);
            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
            utftext += String.fromCharCode((c & 63) | 128);
        }

    }

    return utftext;
},

// private method for UTF-8 decoding
_utf8_decode : function (utftext) {
    var string = "";
    var i = 0;
    var c = c1 = c2 = 0;

    while ( i < utftext.length ) {

        c = utftext.charCodeAt(i);

        if (c < 128) {
            string += String.fromCharCode(c);
            i++;
        }
        else if((c > 191) && (c < 224)) {
            c2 = utftext.charCodeAt(i+1);
            string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
            i += 2;
        }
        else {
            c2 = utftext.charCodeAt(i+1);
            c3 = utftext.charCodeAt(i+2);
            string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            i += 3;
        }

    }

    return string;
}

};

//-----------------------
//Custom JQuery plugin 
jQuery.fn.exists = function(){return this.length>0;};
//--------------------------

function performceUniverseSearch(selection, phraseId, respAreaId)
{

		console.log(univerSearchURI + '?n=' + encodeURIComponent($(selection).val()) + '&q='+encodeURIComponent($(phraseId).val()));		
		$.getJSON(univerSearchURI + '?n=' + encodeURIComponent($(selection).val()) + '&q='+encodeURIComponent($(phraseId).val()), function(data) {						
			if( data && data.length > 0){
				console.log(data);
				showUniversalSearchResult( data, respAreaId);				
			}else{
				$(respAreaId).html("<div class='tabContentSeparator'></div><div class='noSearchResultsContainer'><i class='icon-warning-sign'></i>No search results found. Please refine your query.</div>");
				//$(respAreaId).html("<h3>Could not find any result, please refine your query</h3>");
				$(phraseId).focus();
			}
			$(".globalSearchLoader").css("display", "none");
		});	

}

function performceFunctionSearch()
{

	console.log(navSearchURI + '?q='+encodeURIComponent($("#searchQueryPhrase").val()));
	$.getJSON(navSearchURI + '?q='+encodeURIComponent($("#searchQueryPhrase").val()), function(data) {
		if(data.children){
			//console.log("Got search result back");			
			updateSearchTree("#navigationtree", data.children, true);			
		}
		$(".filterLoader").css("display", "none");
	});			
}

function showUniversalSearchResult(data, respAreaId) 
{                    
       var source   = $("#searchResultTemplate").html();
       
       var template = Handlebars.compile(source);      
       
       $(data).each(function(idx,object){
              var descriptionsDataList = new Array();
              var desc = object.description;
              var searchResultType;
              
              var descArray;
              var descArrayNoTilde;
              var keyValue;
              var keyValueArray;
              var key;
              var value;
              var newObject ;
              var title;
              var descSpace;
                            
			  if (desc.indexOf("#COMMAND") != -1)
					object.isActivitySearch = true;                    					
              else			  			  
                    object.isFileSystemSearch = true;              

			  var descSpaceArray = desc.split(" ");
			  if(object.title != " "){
				  title = object.title;
			  }else if (desc.indexOf("#COMMAND") != -1){
				  title = descSpaceArray[0].substring(11,descSpaceArray[0].length); 
				  console.log("#COMMAND title: " + title);
			  }
			   
			  if(descSpaceArray.length > 1)	  
				  descSpace = desc.substring(descSpaceArray[0].length,desc.length);   
			  else
				  descSpace = desc; 
              
			  //console.log("descSpace: " + descSpace);

              descArray = descSpace.split("~~~");
              //console.log("descArray.length: " + descArray.length);
              //console.log("descArray: " + descArray);
              if(descArray.length > 1){
            	  //console.log("COMMAND Tilde: ");
                  for (var i=0; i<descArray.length; i++)
                  {
                         keyValue = descArray[i];
                         keyValueArray = keyValue.split("~~"); 
                         key = keyValueArray[0];
                         value = keyValueArray[1];
                         newObject = new Object();
    						newObject.key = key;
    						newObject.value = value;
    						
    					if (key == "Type" && value == "f")					
    						object.isFile = true;
    					else if (key == "Type" && value == "d")
    						object.isDirectory = true;
    					 
    					if(key != "")	
    						descriptionsDataList.push(newObject);
                  }
           	  
              }else{
            	  //console.log("COMMAND No Tilde: ");
            	  descArrayNoTilde = descArray[0].split(" -");
            	  //console.log("descArrayNoTilde.length: " + descArrayNoTilde.length);
                  for (var i=0; i<descArrayNoTilde.length; i++)
                  {
                         keyValue = descArrayNoTilde[i];                         
                         keyValueArray = keyValue.split(" "); 
                         
                         key = keyValueArray[0];
                         value = keyValue.substring(key.length+1,keyValue.length); ;
                         newObject = new Object();
    						newObject.key = key;
    						newObject.value = value;
    						
    					if (key == "Type" && value == "f")					
    						object.isFile = true;
    					else if (key == "Type" && value == "d")
    						object.isDirectory = true;
    					
    					if(key != "")	
    						descriptionsDataList.push(newObject);
                  }
              }
                         
              object.descriptions = descriptionsDataList;
              
              //Set time to date from epoch
              if (object.createddate != null && object.createddate != "")
           {
             var dateObject = new Date(0);
               dateObject.setUTCMilliseconds(object.createddate); 
               //console.log(object.createddate);
               object.createddate = dateObject;
           }
           else if (object.lastmodified != null && object.lastmodified != "")
           {
             var lmDateObject = new Date(0);
               lmDateObject.setUTCMilliseconds(object.lastmodified); 
               //console.log(object.lastmodified);
               object.lastmodified = lmDateObject;
           }
              
              //Parse out "program=" in title
              console.log("object.title: " + object.title);
              var titleCheck = object.title;
              if (titleCheck.indexOf("program=") != -1){
	              var titleArray = object.title.split("=");
	              object.title = titleArray[1];
	              console.log("object.title after program= split: " + object.title);
              }else{
            	  object.title = title;
            	  console.log("object.title after NO program= split: " + object.title);
              }
              
              console.log("End title: " + object.title);
              //console.log(title);
              //console.log(object);
              console.log("----------------------------------------");
       });
       
       var html = template({"searchResults":data});
       //console.log(html);
       
       //console.log(respAreaId);
       $(respAreaId).html(html);
       //console.log($(respAreaId).html());
}


function createAllChildrens(treeId, node, childrenData)
{
	console.log("createAllChildren -- treeId: " + treeId + ", node: " + node + ", childrenData: " + childrenData);
	if(childrenData && childrenData.length>0)
	{
		var size = (childrenData)? childrenData.length:0;
		for(var i=0; i<size; i++){
			var childNode = $(treeId).jstree("create", node, "last", childrenData[i], false, true);
			console.log("childNode -- node: " + node + ", childrenData[" + i + "]: " + childrenData[i]);
			if(childrenData[i].children && childrenData[i].children.length>0){
				createAllChildrens(treeId, childNode, childrenData[i].children);
			}
		}
	}
}

function expandTreeNode(treeId, cmd)
{
	console.log("expandTreeNode: " + treeId);
	//console.log(cmd);
	$.getJSON( navExpandURI, { cmd: cmd } )
	.done(function( data ) {
		//console.log( "JSON Data: " + data.children );
		var size = (data.children)? data.children.length:0;
		for(var i=0; i<size; i++){
			var dc = 	$(treeId).jstree("create", null, "last", data.children[i], false, true);
			//console.log("dc -- " + dc);
			if(data.children[i].children && data.children[i].children.length>0) createAllChildrens(treeId, dc, data.children[i].children);
		}	
	})
	.fail(function( jqxhr, textStatus, error ) {
	  var err = textStatus + ', ' + error;
	  	//console.log( "Request Failed: " + err);
	});
}

var lastExecCmd;

function updateSearchTree(treeId, jsondata, openAll)
{
    alert ("updateSearthTree");
	$(treeId).html("");
	$(treeId).jstree({
		"core" : { "animation" : 250 },
		"json_data" : {
		"data" : jsondata
		},
		"themes" : {
			"theme" : "default",
			"dots" : false,
			"icons" : false
		},
		"plugins" : [ "themes", "json_data", "ui", "types", "crrm" ]					
	}).bind("select_node.jstree", function(e, data)
	{		
		if($(data.rslt.obj[0]).find("> a").attr("rel") == "file"){
			renderedPage = "";
			var type = $(data.rslt.obj).data('type');
			var cmd = $(data.rslt.obj).data('OnExpand');
			console.log("file -- type: " + type + ", cmd: " + cmd);
			
			if( type  && type==='document' ){	
			
				//console.log("1-- type: " + type);
				$("#documentViewFormCmd").val(cmd);
				$("#documentViewForm").submit();
				
			}else{		         
				 //console.log(opFormURINew);
				 //REMOVE ME
				 //console.log(cmd);
				 //console.log("2-- cmd: " + cmd);
				 $.ajax({
		             type: "GET",
		             url: opFormURINew, 		           
		            data: { "cmd":  Base64.encode(cmd)}
		         }).done(function ( html ) {                               
		            $("#offscreen-buffer-area").html(html);
					//console.log("PAINT RESPONSE with HTML -- " + html);					 
					paintResponse();
					
					lastExecCmd = cmd;
			        console.log("lastExecCmd: " + lastExecCmd);

		         });
			}			
			
		}else if ($(data.rslt.obj[0]).find("> a").attr("rel") == "folder" 
				&& $(data.rslt.obj[0]).hasClass("jstree-leaf")				
				&& $(data.rslt.obj).data('OnExpand'))
		{
			console.log("updateSearchTree -- treeId: " + treeId + ", onExpand: " + $(data.rslt.obj).data('OnExpand'));	
			expandTreeNode(treeId, $(data.rslt.obj).data('OnExpand'));
		}
		return data.inst.toggle_node(data.rslt.obj);
	})
	.bind("loaded.jstree", function(e, data)
	{
		//console.log("openall!!");
		if(openAll) $(treeId).jstree('open_all');
	});					
	
	$.jstree._themes = navTreeThemesURI;
}

function fetchDefaultFunctions()
{

		var start = new Date().getTime();
        alert(navNormalURI);
		$.getJSON(navNormalURI + '?t='+start, function(data) {
			if(data.children){
				updateSearchTree("#navigationtree", data.children, false);
			}
		});
		
}

function odd_get_init_tree_root(initTitle, initValue)
{	
	return { data:{"title":initTitle, "icon":"folder", "state" : "closed", "children":[]}, "metadata":{"path":initValue, "type":"folder"} };
}

function showFileBrowser(treeId, jsondata, rootVal, trggr, trggrCmd)
{
	
	var display = "";
	 if(trggr){
		var tgts = trggr.split(";");
		$(tgts).each(function(index, value){
			var nvp = value.split("=");			
			if(nvp[0]=="display"){
				display = nvp[1];
			}
		});
	}	
	var treeArea = $("#" + treeId);
	var oddsfb_tree = treeArea.html("");
	treeArea.jstree({
		"json_data" : {
		"data" : jsondata
		},
		"plugins" : [ "themes", "json_data", "ui", "types", "crrm" ]					
	}).bind("dblclick.jstree", function (event, data) {	
		//console.log(data);	
	}).bind("select_node.jstree", function (event, data) 
	{
	   var path = $(data.rslt.obj).data('path');	
	   if(path ){
			$("#" + display).val(path);
		}
		
		var childc = $.jstree._reference(treeArea)._get_children(data.rslt.obj).length;			
		if($(data.rslt.obj).data('type')=='folder' && childc==0){
			var node = $(data.rslt.obj).data('path');
			if(!node){
				node = '""';
			}else{
				node = node.trim();
			}
			var cmd = odd_format_remote_command(null, trggrCmd) +  " -node " + node;
			//console.log("expandDirectory -- treeId: " + treeId + ", cmd: " + cmd);
			expandDirectory(treeId, cmd);			
		}
		return data.inst.toggle_node(data.rslt.obj);
	})	
	;
	$.jstree._themes = navTreeThemesURI;
}

function expandDirectory(treeId, cmd)
{	
	//TODO name and sorage_id has to be part of trigger command when it need;
	//Current hard code approach is bad;
	//data: { "command": cmd, "storage_id":storageid }
	//console.log("AJAX GET:" + cmd);
	$.ajax({
	  type: "GET",
	  url: autoCompleteUrl,
	  data: { "command": cmd}
	}).done(function( data ) {		
		//console.log(data);
		var list = $(data).text().trim().split("\n");
		$(list).each(function(idx, val){
			if(val && val.indexOf("|")!=-1){
				//console.log(val);
				var dl = val.split("|");
				var cdata;
				var name = dl[1].substring(dl[1].lastIndexOf("/")+1);
				if(dl[0] == 'd'){
					cdata = { data:{"title":name, "icon":"folder", "state" : "open", "children":[]}, "metadata":{"path":dl[1], "type":"folder"} };
				}else{
					cdata = { data:{"title":name, "icon":"file"}, "metadata":{"path":dl[1], "type":"file"} };
				}		
				var dc = $("#" + treeId).jstree("create", null, "last", cdata, false, true);	
			}			
		});
	});
	
}

var OddJsTreeDataUtils = function()
{
	this.xpath = "";
	this.objTmpl = {"data":{"title":"","attr":{"rel":"folder"},"icon":"folder"},"metadata":{"name":"","xpath":""},"children":[]};
	
	this.odd_xpath_append = function (path, prefix)
	{
		if(prefix){
			if(this.xpath){
				this.xpath = this.xpath + "\n" + prefix +  path;
			}else{
				this.xpath = prefix +  path;
			}	
		}else{
			if(this.xpath){
				this.xpath = this.xpath + "\n" + path;
			}else{
				this.xpath = path;
			}	
		}		
	};
	
	this.odd_invert_to_xpath = function (jsonTreeData, prefix)
	{	
		if(jsonTreeData.metadata.xpath){		
			this.odd_xpath_append(jsonTreeData.metadata.xpath, prefix);
		}
		if(jsonTreeData.children.length>0){
			var len = jsonTreeData.children.length;
			for(var i=0; i<len; i++)
			{
				this.odd_invert_to_xpath(jsonTreeData.children[i], prefix);
			}		
		}		
	};
	
	this.getXpath = function (jsonTreeData, prefix){
		this.xpath = "";
		this.odd_invert_to_xpath(jsonTreeData, prefix);
		return this.xpath;
	};
	
	
	this.odd_get_element_by_path = function (xpath, jsondata)
	{
		var ret;
		//console.log( jsondata.metadata.xpath + " =? "  + xpath );
		if(jsondata.metadata.xpath == xpath){
			return jsondata;
		}else{
			for(var i=0; i<jsondata.children.length; i++)
			{
				ret = this.odd_get_element_by_path(xpath, jsondata.children[i]);
				if(ret) break;
			}
		}	
		return ret;
	};

	this.odd_tree_array_indexOf = function (obj, arrayObj)
	{
		for(var i=0; i<arrayObj.length; i++){
			if(obj==arrayObj[i].data.title) return i;
		}
		return -1;
	};

	this.odd_update_xpath = function(new_xpath, robj)
	{
		robj.metadata.xpath = new_xpath;
		for(var i=0; i<robj.children.length; i++)
		{
			var cnxp = new_xpath + "/" + robj.children[i].data.title;
			this.odd_update_xpath(cnxp, robj.children[i]);
		}
	};
	
	this.odd_move_element_to = function (destXpath, index, xpath, jsondata)
	{
		if(!xpath || !destXpath || !jsondata) return;		
		var name = xpath.substring(xpath.lastIndexOf("/")+1);	
		var robj = this.odd_remove_element(xpath, jsondata);	
		if(robj){		
			var nparent = this.odd_get_element_by_path(destXpath, jsondata);
			this.odd_update_xpath(destXpath + "/" + name, robj);
			if(nparent){
				if(index!=-1){				
					nparent.children.splice(index, 0, robj);	
				}else{				
					nparent.children.push(robj);	
				}
			}
			
		}
		return robj;
	};

	this.odd_remove_element = function(xpath, jsondata)
	{
		if(!xpath || !jsondata) return null;	
		var pxpath = xpath.substring(0, xpath.lastIndexOf("/"));
		var name = xpath.substring(xpath.lastIndexOf("/")+1);
		var parent = this.odd_get_element_by_path(pxpath, jsondata);		
		var idx = this.odd_tree_array_indexOf(name, parent.children);
		if(idx!=-1){
			var robj = parent.children.splice(idx, 1);	
			return robj[0];
		}else{
			return null;
		}	
		
		
		
	};
	
	this.odd_rename_element = function(xpath, new_name, jsondata)
	{
		if(!xpath || !new_name || !jsondata) return null;			
		var node = this.odd_get_element_by_path(xpath, jsondata);		
		var pxpath = xpath.substring(0, xpath.lastIndexOf("/"));
		var new_xpath = pxpath + "/" + new_name;
		node.data.title=new_name;
		node.metadata.xpath=new_xpath;
		return node;
	};
	

	this.odd_add_new_element_to = function (destXpath, index, name, jsondata)
	{
		if(!name || !destXpath || !jsondata) return;
		var nparent = this.odd_get_element_by_path(destXpath, jsondata);		
		var newObj  = $.extend({}, this.objTmpl, true);	
		newObj.data.title = name;
		newObj.metadata.xpath = destXpath + "/" + name;
		if(index!=-1){
			nparent.children.splice(index, 0, newObj);		
		}else{
			nparent.children.push(newObj);	
		}
		return newObj;		
	};
	
	this.odd_update_jstree_node_xpath = function (npxpath, jstreeid, jstreenode)
	{
		if(!npxpath || !jstreeid || !jstreenode) return;
		var xpath = $(jstreenode).data('xpath');
		if(xpath){
			var idx = xpath.lastIndexOf("/");
			var name = xpath;
			if(idx!=-1){
				name = xpath.substring(idx+1);
			}
			var ncxpath = npxpath + "/" + name;
			$(jstreenode).data('xpath', ncxpath);
			$.jstree._reference(jstreeid)._get_children(jstreenode).each(function(idx, cnode){
					var util  = new OddJsTreeDataUtils();
					util.odd_update_jstree_node_xpath(ncxpath, jstreeid, cnode);
			});
		}
	};
	
};

function odd_encrypt(inputField, callbackfunction)
{
	//console.log($(inputField).val);
	var fieldVal =  $(inputField).val();
	var cleandata = (fieldVal && fieldVal.trim())? fieldVal.trim():null; 
	if(cleandata){
		$.post(oddEncryptUrl, { plaintext: cleandata })
		.done(function(data) {
			callbackfunction(data);		
		});
	}else{
		callbackfunction("");
	}
}

function prepare_submit_form_with_cb(formId, post_callback_function)
{
	fill_odd_hiden_value();	
	var submitForm = true;
	console.log("submitForm");
	if($("#action-reaffirmation-message").length>0 && $("#action-reaffirmation-message").text().trim().length>0)
	{
		 submitForm = confirm($("#action-reaffirmation-message").text());		 
	}
	
	if(submitForm){	
		check_encryption_and_submit(formId, post_callback_function);
	}
}

function check_encryption_and_submit(formId, post_callback_function)
{	
	//if(!checkValidation()) 
	//{
	//	$("#error_msg").html("<h2>Please correct all red fields - use alphanumeric and _ + / . @ ' ` - only</h2>").show();
	//	return;
	//}
	
	var $encryptedFields = $("#"+formId).find("input[data-encryption='1'][name!='pwd']");
	var fieldsLength = $encryptedFields.length;
	//console.log("encryptedFields count=" + fieldsLength);
	if( fieldsLength>0 ){
		var count = 0;	
		$encryptedFields.each(function(idx, inputField){			
			var $inputField = $(inputField);			
			//console.log("encryptedFields field=" + $inputField.attr("name"));
			if($inputField.data("encryption")==1){
				count++;
				//console.log("Encrypt field number:" + count);
				odd_encrypt(inputField, function(newVal){
					$(inputField).val(newVal);
					count--;
					//console.log("Encrypted field count:" + count);
					if(count==0){
						pdd_submit_form_with_cb(formId, post_callback_function);						
						$("#"+formId).find("input[data-encryption='1']").each(function(idx, inputField){
							if($(inputField).data("encryption")==1 ){
								$(inputField).val("");		
							}
						});
						$("#"+formId).find("input[name='db_user']").each(function(idx, inputField){							
							$(inputField).val("");
						});
						return; 
					}
				});			
			}

		});	
	}else{
		pdd_submit_form_with_cb(formId, post_callback_function);			
	}
	$("#odd-form-container").hide('slow');
	$("#odd-form-container-dialog").hide('slow');	
	 show_odd_remote_console();
		
}

function pdd_submit_form_with_cb(formId, post_callback_function)
{
	var original = {};
	function replaceAllNewLine(text, re)
	{
		var newtext = "";
		for (var i=0; i < text.length; i++) {
			var c = text.charAt(i);
			if(c=="\n"){
				newtext +=re;
			}else{
				newtext +=c;
			};
		}
		return newtext;
	}	
	var $outgoingForm = $("#"+formId);
	//console.log("#"+formId);
	$outgoingForm.find('textarea[data-odd-newline-substitute]').each(function(idx, field){
		var $this = $(field);
		var replacement = $this.data("odd-newline-substitute").trim();
		var val = $this.val();		
		if(val && replacement){
			original[$this.attr("name")] = val;
			$this.val(replaceAllNewLine(val, replacement));			
		}		
	});
	
	//var sdata = $outgoingForm.serialize();	

	var sdata = $outgoingForm.serializeArray();
	sdata = sdata.concat(
    $("#"+formId + ' input[type=checkbox]:not(:checked)').map(
        function() {
            return {"name": this.name, "value": "0"}
        }).get()
    );
   
	//console.log(sdata);
	$.post(oddFormPostURL, sdata)
	.done(function(data) { 	
			post_callback_function(data);		
	}).fail(function(){			
	});	
	$outgoingForm.find('textarea[data-odd-newline-substitute]').each(function(idx, field){
		var $this = $(field);
		var replacement = $this.data("odd-newline-substitute").trim();
		var val = $this.val();		
		if(val && replacement){			
			$this.val(original[$this.attr("name")]);			
		}		
	});

}


function posttOddForm(formId)
{
	var original = {};
	function replaceAllNewLine(text, re)
	{
		var newtext = "";
		for (var i=0; i < text.length; i++) {
			var c = text.charAt(i);
			if(c=="\n"){
				newtext +=re;
			}else{
				newtext +=c;
			};
		}
		return newtext;
	}	
	var $outgoingForm = $("#"+formId);
	$outgoingForm.find('textarea[data-odd-newline-substitute]').each(function(idx, field){
		var $this = $(field);
		var replacement = $this.data("odd-newline-substitute").trim();
		var val = $this.val();		
		if(val && replacement){
			original[$this.attr("name")] = val;
			$this.val(replaceAllNewLine(val, replacement));			
		}		
	});
	
	//var sdata = $outgoingForm.serialize();	

	var sdata = $outgoingForm.serializeArray();
	sdata = sdata.concat(
    $("#"+formId + ' input[type=checkbox]:not(:checked)').map(
        function() {
            return {"name": this.name, "value": "0"}
        }).get()
    );
	  
	$.post(oddFormPostURL, sdata)
	.done(function(data) { 		
		$("#offscreen-buffer-area").html(data);	
		paintResponse();
		//$("#loadingAnimationContainer").hide();		
	}).fail(function(){
		//console.log("error");	
	});	
	$outgoingForm.find('textarea[data-odd-newline-substitute]').each(function(idx, field){
		var $this = $(field);
		var replacement = $this.data("odd-newline-substitute").trim();
		var val = $this.val();		
		if(val && replacement){			
			$this.val(original[$this.attr("name")]);			
		}	
	});
	
}


/**
<param name="time_locale" value="@locale" required="yes" getopt="yes" quoted="double"/>
<param name="time_utc" value="@utc" required="yes" getopt="yes" quoted="double"/>
<param name="time_utc_topBarOffset" value="@topBarOffset" required="yes" getopt="yes" quoted="double"/>
*/
function fill_odd_hiden_value()
{
	var $odd_utc = $("input[type='hidden'][name='time_utc']");
	if($odd_utc.length>0){
		var dt = new Date();
		var utcstr = "";
		utcstr += dt.getUTCFullYear();
		utcstr += "-";
		var m = dt.getUTCMonth();
		if(m<9){
			utcstr += "0" + (m+1);
		}else{
			utcstr += (m+1);
		}
		utcstr += "-";
		var d = dt.getUTCDate();
		if(d<10){
			utcstr += "0" + d;
		}else{		
			utcstr += d;
		}
		utcstr += " ";
		d = dt.getUTCHours();
		if(d<10){
			utcstr += "0" + d;
		}else{		
			utcstr += d;
		}
		utcstr += ":";
		d = dt.getUTCMinutes();
		if(d<10){
			utcstr += "0" + d;
		}else{		
			utcstr += d;
		}
		utcstr += ":";
		d = dt.getUTCSeconds();
		if(d<10){
			utcstr += "0" + d;
		}else{		
			utcstr += d;
		}
		$odd_utc.val(utcstr);		
		
		var utctopBarOffset = dt.getTimezoneOffset() * -1;		
		var topBarOffsetstr =(utctopBarOffset<0)?"-":"";
		utctopBarOffset=Math.abs(utctopBarOffset);
		var d1 = utctopBarOffset/60;
		if(d1<10){
			topBarOffsetstr += "0" + d1;
		}else{		
			topBarOffsetstr += d1;
		}		
		topBarOffsetstr += ":";
		var d2 = utctopBarOffset%60;
		if(d2<10){
			topBarOffsetstr += "0" + d2;
		}else{		
			topBarOffsetstr += d2;
		}
		//console.log("$$$$$$$$$$$$$$$$$$$$$$:" + topBarOffsetstr);
		var $odd_utc_topBarOffset = $("input[type='hidden'][name='time_utc_topBarOffset']");		
		if($odd_utc_topBarOffset) $odd_utc_topBarOffset.val(topBarOffsetstr);
		$("#time_utc_offset").val(topBarOffsetstr);
		
	}
}

function submitOddForm(formId)
{	
	//if(!checkValidation()) 
	//{
	//	$("#error_msg").html("<h2>Please correct all red fields - use alphanumeric and _ + / . @ ' ` - only</h2>").show();
	//	return;
	//}
	
	fill_odd_hiden_value();		
	var submitForm = true;
	console.log("submitForm");
	if($("#action-reaffirmation-message").length>0 && $("#action-reaffirmation-message").text().trim().length>0)
	{
		 submitForm = confirm($("#action-reaffirmation-message").text());		 
	}
	
	if(submitForm){		
		console.log("submitForm go");
		perform_submission(formId);
	}
}

function perform_submission(formId)
{	
	
	var $encryptedFields = $("#"+formId).find("input[data-encryption='1'][name!='pwd']");
	var fieldsLength = $encryptedFields.length;
	//console.log("encryptedFields count=" + fieldsLength);
	if( fieldsLength>0 ){
		var count = 0;	
		$encryptedFields.each(function(idx, inputField){			
			var $inputField = $(inputField);			
			//console.log("encryptedFields field=" + $inputField.attr("name"));
			if($inputField.data("encryption")==1){
				count++;
				//console.log("Encrypt field number:" + count);				
				odd_encrypt(inputField, function(newVal){
					$(inputField).val(newVal);
					count--;
					//console.log("Encrypted field count:" + count);
					if(count==0){
						posttOddForm(formId);
						//console.log("After submission");
						$("#"+formId).find("input[data-encryption='1']").each(function(idx, inputField){
							if($(inputField).data("encryption")==1 ){							
								//console.log(inputField);
								$(inputField).val("");		
							}
						});
						$("#"+formId).find("input[name='db_user']").each(function(idx, inputField){
							//console.log(inputField);
							$(inputField).val("");
						});
						return; 
					}
				});			
			}

		});	
	}else{
		posttOddForm(formId);			
	}
	
	console.log("renderedPage: " + renderedPage);
	if (renderedPage != "action_only")
	    $("#odd-form-container").hide('slow');
	else
	{
	    // paint the page again to clear the form for action_only.jsp
		$.ajax({
		  type: "GET",
		  url: opFormURINew, 
		  data: { "cmd": Base64.encode(lastExecCmd)}
		}).done(function ( html ) { 
		  $("#offscreen-buffer-area").html(html); 
		  paintResponse();
		  console.log("lastExecCmd in action_only: " + lastExecCmd);
		});
	}
	
	//$("#odd-form-container").hide('slow');
	$("#odd-form-container-dialog").hide('slow');	
	 show_odd_remote_console();
		
}
/*
function checkValidation(){
    var valid  = true;
    $("input[pattern]").each(function (idx, field){
        if(field.validity.valid==false){
            valid  =  false;
            return;
        }
    });
    console.log("checkValidation: " + valid);	
    return valid;
}
*/
var odd_remote_console_loop = 0;
var current_job_id = 0;


function odd_wait_for_console()
{
	var $cnl = $("#oddRemoteConsole");
	//console.log("odd_wait_for_console() called: " );	
	$("#oddRemoteConsoleMessageBox").html("");
	function check_visibility()
	{
		//if(!$cnl.show().is(":visible")){
		if(!isResizableDialogVisible){
			//console.log("1 check visibility");
			showResizableDialog();
			setTimeout(check_visibility(), 1000);
		}else{
			fetch_odd_remote_console();	
		}
	};
	check_visibility();
}


function show_odd_remote_console()
{
	current_job_id = 0;
	clear_odd_console();
	var $cnl = $("#oddRemoteConsole");	
	odd_remote_console_loop = 1;	
	odd_wait_for_console();
}



function hide_odd_remote_console()
{	
	odd_remote_console_loop = 0;	
	//$('#oddRemoteConsole').hide();
	hideResizableDialog();
}


function clear_odd_console()
{
	//console.log("clear_odd_console() called: " );
	$("#oddRemoteConsoleMessageBox").html("");
}

function fetch_odd_remote_console()
{
	
	//console.log("Your are fetching _odd_remote_console");
	//$("#oddRemoteConsole").find("#odd_button_diaglog_cancel").css('visibility', 'visible');
	
	if(!odd_remote_console_loop) return;
	var consoleurl = formController + "/console";	
	$.ajax({
        type: "GET",
        url: consoleurl
    }).done(function(data){ 
    	if(!odd_remote_console_loop) return;
		if(data && data.trim()){
    		var lists = data.split("\n");
			$(lists).each(function(idx, l){
				var cl = l.trim();
			    var jobIds = cl.match(/\(Job Id=(\d+)\)$/i);
				//debugger; 				
				if(jobIds){
					if(typeof odd_cancel_command === "undefined" || !odd_cancel_command){
						$("#oddRemoteConsole").dialog('widget').find("#odd_button_diaglog_cancel").css('visibility', 'hidden');
					}else if( odd_cancel_command && odd_cancel_command.trim()){
						
						//$("#oddRemoteConsole").find("#odd_button_diaglog_cancel").css('visibility', 'visible').unbind("click").click(function(){				
						
						$("#oddRemoteConsole").dialog('widget').find("#odd_button_diaglog_cancel").css('visibility', 'visible');
						
						$("#oddRemoteConsole").dialog('widget').find("#odd_button_diaglog_cancel").unbind("click").click(function(){										
							var cmd1s = odd_cancel_command.split(";");
							var cmd = cmd1s[0].split("=")[1];
							//console.log("Your are clicking on cancel:" + cmd);
							var odd_user = typeof odd_userid !== 'undefined'?odd_userid:'@';
							var cancelCmd = odd_format_remote_command(null, cmd, {"sessionid": jobIds[1], "user":odd_userid});
							//console.log("Your are clicking on cancel:" + cancelCmd);
							var params = {};
							//console.log("command:" + command + ", el: " + el);		
							params["command"] = cancelCmd;		
							$.ajax({
								type: "GET",
								url: autoCompleteUrl,        
								data: params
							}).done(function(data){
								;
							}).fail(function(err){
								alert(err);	
							});	
							if(cmd1s.length>1){
								var msg = cmd1s[1].split("=")[1];
								$("#oddRemoteConsoleMessageBox").append(msg + "<br/>");
							}
						});				
					}
				}else{
					var jobCompleteds = cl.match(/^job completed/i);					
					//console.log("jobCompleteds: " + jobCompleteds);
					if(jobCompleteds){
						$("#oddRemoteConsole").dialog('widget').find("#odd_button_diaglog_cancel").css('visibility', 'hidden');
					}	
				}
				if(cl && cl.length>0){
					//console.log("fetch_odd_remote_console() called: " );
					$("#oddRemoteConsoleMessageBox").append(cl + "<br/>");
				}
				
				// scroll to the bottom
				var $remoteConsole = $('#oddRemoteConsole');
				if($remoteConsole){
					var scrollHight = $remoteConsole.prop("scrollHeight");				
					var remoteConsoleHeight = $remoteConsole.height();	
					if(scrollHight>remoteConsoleHeight){
						$remoteConsole.scrollTop(scrollHight);
					}	
				}				
			});
    	}
		if(odd_remote_console_loop){
			setTimeout(fetch_odd_remote_console, 1000);
		}    	
    }).fail(function(err){
		//console.log(err);			
	});	

}

var isResizableDialogVisible = false;

function showResizableDialog()
{
	//console.log("--- showResizableDialog ---");
	$(this).scrollTop(0);
	$( "#oddRemoteConsole" ).dialog({	
		width: 550,
		height: 400,
		minWidth: 300,
		minHeight: 300,
		buttons: [{
			
				text: "Cancel Request",
				id: "odd_button_diaglog_cancel"
			
			/*
			,
			Cancel: function() {
			  //$( this ).dialog( "close" );
			  hideResizableDialog();
			}
			*/
		}],
		close: function( event, ui ) 
		{
			hide_odd_remote_console();
		}
	});
	
	$('#oddRemoteConsole').dialog('widget').find('#odd_button_diaglog_cancel').css('visibility', 'hidden');	
	isResizableDialogVisible = true;
}

function hideResizableDialog()
{
	$( "#oddRemoteConsole" ).dialog( "destroy" );
	isResizableDialogVisible = false;
}


function submit_odd_wizard_form(formId)
{
	var diaglogform = $(".odd_form_wizard_dialog").filter(":visible");
	var curr_form_id = diaglogform.data("diaglog-form-id");
	var max_form_id=$("#odd_wizard_form_max_diaglog_id").data("max-diaglog-form-id");
	var next_form_id = (curr_form_id<max_form_id)?(curr_form_id+1):max_form_id;	
	//console.log("Current Diaglog formid=" + curr_form_id + " max id=" + max_form_id + " next form id=" + next_form_id);
	if(next_form_id>curr_form_id)
	{
		diaglogform.hide('slow');
		$("#odd-parameter-form-" + next_form_id).show('slow');
		$("#odd-parameter-form-" + next_form_id).find("ul.tabNavContainer-tab").find("li").first().addClass("selected");
		$("#odd-parameter-form-" + next_form_id).find("div.tabNavContentContainer").find("div.parameter-groups").hide().first().show('slow');
		
	}else{
		submitOddForm(formId);
	}	
}

/*
// the following defines odd trigger and pull functions for runtime data fill in
*/
var OptionTempl = "{{#each opts}}<option value={{this}}>{{this}}</option>{{/each}}";

/*
//Update;lock=service_id,server;unlock=db,resource|Add;unlock=service_id|Delete;lock=service_id;Test Connection;lock=service_id
*/
function parse_lock_trigger(trgTarget)
{	
	var triggers = trgTarget.split("|").map(function(item, idx){
			var trgObj = {};
			var trgDefs = item.split(";");
			trgObj["key"] = trgDefs[0];
			if(trgDefs.length>1){
				var nvp = trgDefs[1].split("=");
				trgObj[nvp[0]] = nvp[1];
			}
			if(trgDefs.length>2){
				var nvp = trgDefs[2].split("=");
				trgObj[nvp[0]] = nvp[1];
			}			
			return trgObj;
	});		
	return triggers;
}



function odd_ui_trigger(el, trgTarget)
{	
	//console.log(trgTarget);
	var $ctrl = $(el);
	var fval = $ctrl.val();
	var type = $ctrl.data("odd-input-type");
	var triggers = parse_lock_trigger(trgTarget);
	var neg_val = null;
	$(triggers).each(function(idx, trgObj){	
		if(trgObj.key && trgObj.key.charAt(0)=='!') {
			neg_val = trgObj.key.substring(1);
		}	
	});	
	if(type=='radiogroup' || type=='string' || type=='hidden'){		
		$(triggers).each(function(idx, trgObj){	
			if(fval && trgObj.key && fval.toUpperCase() == trgObj.key.toUpperCase()){				
				if(trgObj.lock){
					var locks = trgObj.lock.split(",");
					$(locks).each(function(idx,item){
						var fid = "#" + item;						
						if( $(fid).data("odd-input-type")=='picklist'){
							$(fid).prop("disabled", true);
						}else{
							$(fid).prop("readonly", true);
						}
					});
				}
				if(trgObj.unlock){
					var unlocks = trgObj.unlock.split(",");
					$(unlocks).each(function(idx,item){
						var fid = "#" + item;
						if( $(fid).data("odd-input-type")=='picklist'){
							$(fid).prop("disabled", false);
						}else{
							$(fid).prop("readonly", false);
						}
						
					});
				}
			}else if(neg_val && fval && fval!=neg_val){
				if(trgObj.lock){
					var locks = trgObj.lock.split(",");
					$(locks).each(function(idx,item){
						var fid = "#" + item;						
						if( $(fid).data("odd-input-type")=='picklist'){
							$(fid).prop("disabled", true);
						}else{
							$(fid).prop("readonly", true);
						}
					});
				}
				if(trgObj.unlock){
					var unlocks = trgObj.unlock.split(",");
					$(unlocks).each(function(idx,item){
						var fid = "#" + item;
						if( $(fid).data("odd-input-type")=='picklist'){
							$(fid).prop("disabled", false);
						}else{
							$(fid).prop("readonly", false);
						}
						
					});
				}
			}
		});
		
	}
}



function odd_auto_complete(el, trgTarget, command)
{
	
	if(!command){
		odd_ui_trigger(el, trgTarget);		
		return ;
	}	
	//No value has been set yet
	//console.log("Trigger command:" + command);		
	//console.log("TRG on:" + $(el).attr("name") + " val=" + $(el).val());		
	if(trgTarget){
		var tgts = trgTarget.split(";");   
		for(var i=0; i<tgts.length; i++)
		{
			if($("#" + tgts[i]).data("odd-input-type")=='picklist'){					
				$("#" + tgts[i]).find("> option").each(function (index, opt){	
					if($(opt).val()){
						$(opt).remove();
					}				
				});	
				
			}else if($("#" + tgts[i]).data("odd-input-type")=='list'){
				$("#" + tgts[i]).val("");
			}else if($("#" + tgts[i]).data("odd-input-type")=='multiselect'){
				var areaId = "#multiselect_" + tgts[i];				
				$(areaId).html("<textarea></textarea>");
				
			}else{
				$("#" + tgts[i]).val("");
			}
		}		
    }	
	if(!$(el).val().length) return;
	var params = {};
	//console.log("command:" + command + ", el: " + el);		
	params["command"] = odd_format_remote_command(el, command);			
    //console.log("Trigger command params:" + params["command"]);	
	
	$.ajax({
        type: "GET",
        url: autoCompleteUrl,        
        data: params
    }).done(function(data){
    				
		if(trgTarget){
    		var tgts = trgTarget.split(";");   
    		for(var i=0; i<tgts.length; i++)
			{
				odd_autocomplete_by_type(tgts[i], data);				
			}    		
    	}
    	
    }).fail(function(err){
		alert(err);	
	});	
		
}

function odd_autocomplete_by_type(elid, data)
{
	var el = "#" + elid;
	var odd_input_type = $(el).data("odd-input-type");
	//console.log("elid=" +   elid + "|type=" + odd_input_type );
	if( odd_input_type=='list'){
		odd_fill_list_trigger_data(elid, data);
	}else if( odd_input_type=='picklist'){
		odd_fill_picklist_trigger_data(elid, data);
	}else if( odd_input_type == 'multiselect'){
		odd_fill_multiselect_trigger_data(elid, data);
	}else if( odd_input_type == 'tree'){
		odd_fill_tree_trigger_data(elid, data);
	}else if( odd_input_type == 'string'){
		odd_fill_string_trigger_data(elid, data);
	}else if( odd_input_type == 'checkbox'){
		odd_fill_checkbox_trigger_data(elid, data);
	}else{
		$(el).val(data);
	}
	
}

function odd_fill_string_trigger_data(listid, data)
{
	//console.log(data);
	var selectedData = $(data).find("control");
	if(selectedData.length>0){
		selectedData.each(function(idx, clt){			
			var name =$(clt).attr("name");
			var value =$(clt).attr("value");
			$("#" + name).val(value);	
		});		
	}else if(data){		
		$("#" + listid).val(data);	
	}
}

function odd_fill_tree_trigger_data(treeid, data)
{
	var root = odd_get_init_tree_root(data, data);
	$("#" + treeid).html("");
	showFileBrowser(treeid, root, data, $("#" + treeid).data("trigger"), $("#" + treeid).data("trigger-command"));
}

function odd_fill_multiselect_trigger_data(listid, data)
{
	//console.log("odd_fill_multiselect_trigger_data>>" + data);
	var rawdata = data.replace(/^\s+|\s+$/g, '');
	var sourcedata = rawdata.split(",");
	//console.log("odd_fill_multiselect_trigger_data>>" + data);
	var areaId = "#multiselect_" + listid;
	var tmplId = "#multiselect_tmpl_" + listid;		
	var htmlSrc = '<div class="multiCheckboxSelectionContainer"><span class="iconFontAdd" onclick="select_all_'+ listid +'()"><i class="icon-plus-sign"></i><a style="cursor: pointer">SELECT ALL</a></span><span class="iconFontDelete" onclick="deselect_all_'+ listid +'()"><i class="icon-minus-sign"></i><a style="cursor: pointer">DESELECT ALL</a></span></div><div class="multiCheckboxContainer">';
		
	$(sourcedata).each(function(idx, value){
		var htmlTmpl = $(tmplId).html();		
		var template = Handlebars.compile(htmlTmpl);
		var html    = template({"index":idx, "opt":value});	
		htmlSrc = htmlSrc + html;
	});		
	
	htmlSrc = htmlSrc + "</div>";	
	$(areaId).html(htmlSrc);
	
	
	var selected_value = "";	
	if(gridData){
		var fid = listid;
		var colIndex = dataBindingRules[fid];
		var rowdata = gridData[odd_selected_data_row];
		selected_value = rowdata[colIndex];
	}	
	$(areaId).find("input[type='checkbox']").each(function(idx, chbx){
		if(selected_value && selected_value.indexOf($(chbx).val())!=-1){
			$(chbx).prop('checked', true);
		}else{
			$(chbx).prop('checked', false);
		}		
	});
	
}

function odd_fill_list_trigger_data(listid, data)
{
	var sourcedata = data.split(",");
	var el = "#" + listid;
	$(el).autocomplete({
		source:sourcedata,
		minLength: 0,
		change: function( event, ui ) {
			$(el).trigger("change");
		},
		select: function( event, ui ) {
			$(el).trigger("change");
		}
	}).focus(function(){ 
		$(el).autocomplete( "search", "" );
	}).click(function(){  
		$(el).autocomplete( "search", "" );
	});	
}

function odd_fill_picklist_trigger_data(picklistid, data)
{
	var selectElement;	
	//console.log("[DEBUG]....." + $.type(picklistid));
	
	if( $.type(picklistid)=='string'){
		selectElement = $("#" + picklistid);
		//console.log("1 selectElement: " + $("#" + picklistid).attr('id'));
	}else{
		selectElement = $(picklistid);
		//console.log("2 selectElement: " + $(picklistid).attr('id'));
	}
	
	var selected_value = "";	
	if(typeof gridData != 'undefined' && 
		typeof dataBindingRules != 'undefined' &&
		gridData){
		var fid = selectElement.attr("id");
		var colIndex = dataBindingRules[fid];
		var rowdata = gridData[odd_selected_data_row];
		if(colIndex) selected_value = rowdata[colIndex];
	}
	var opts = data.split(",");		
	var template = Handlebars.compile(OptionTempl);	
	var html    = template({"opts":opts});	
	selectElement.find("option").each(function(idx, opt){
		var v = $(opt).val();
		var t = $(opt).text().trim();
		if((v && t) || (!v && !t)){
			$(opt).remove();
		}
	});
	selectElement.append(html);	
	selectElement.find("option").each(function(idx, opt){		
		if(!$(opt).val() && !$(opt).text().trim()){
			$(opt).remove();
		}else if($(opt).val() && $(opt).val().toUpperCase()==selected_value.toUpperCase()){
			$(opt).prop("selected", true);
			selectElement.trigger("change");
		}else{
			$(opt).prop("selected", false);
		}		
	});
	
	
}

function odd_fill_checkbox_trigger_data(elid, data)
{
	alert("elid: " + elid + ", data: " + data);
}

function odd_format_remote_command(el, cmdTpl, data)
{
	////console.log(el);
	////console.log($(el).val());
	//console.log("cmdTpl: " + cmdTpl);
	var paramObj = typeof data !== 'undefined' ? data:{};
	
	var len = cmdTpl.length;
	var ret = "";
	for(var i=0; i<len; i++)
	{
		if(cmdTpl.charAt(i)=='@'){
			
			//console.log("@: true");
			
			var varName = "";
			for(var j=i+1; j<len; j++){
				if(j>=len-1){				
					if(j==len-1) varName = varName + cmdTpl.charAt(j);					
					if(varName.length>0){
					
						var val = "";
						if(varName=='self' && el){
							val = $(el).val();
						}else if(paramObj[varName]){
							val = paramObj[varName];
						}else{
							val = $("#" + varName).val();	
						}												
						
						val = (val)?val.replace(/"/g, '\\"'):"";						
						//console.log("val 1: " + val);						
						if(val.indexOf('"')!=-1 || val.indexOf(' ')!=-1){
							val = '"' + val + '"';
						}						
						ret =  ret + val;		
						i = j;
						break;
					}else{
						ret =  ret + "@";
						break;
					}
				}else if(cmdTpl.charAt(j)==' '){					
					if(varName.length>0){						
						var val = "";
						if(varName=='self' && el) {
							val = $(el).val();
						}else if(paramObj[varName]){
							val = paramObj[varName];
						}else{
							val = $("#" + varName).val();
						}						
						val = val.replace(/"/g, '\\"');
						if(val.indexOf('"')!=-1 || val.indexOf(' ')!=-1){
							val = '"' + val + '"';
						}			
						
						ret =  ret + val;
						ret =  ret + " ";
						varName = "";
						i = j;
						break;
					}else{
						ret =  ret + "@ ";
						i = j;
						break;
					}
				}else{					
					varName = varName + cmdTpl.charAt(j);
				}
			}
		}else{
			 ret =  ret + cmdTpl.charAt(i);
		}
	}
	return ret;
}


function odd_pull_list(el, cmd)
{	
	var params = {};
	params["command"] = odd_format_remote_command(el, cmd);
	//console.log(params["command"]);
	var odd_input_type = $(el).data("odd-input-type");
	$.ajax({
		type: "GET",
		url: autoCompleteUrl,        
		data: params
	}).done(function(data){
		if(data){
			//console.log(data);
			if(odd_input_type=='list'){
				$(el).removeAttr("onfocus");
				var sourcedata = data.split(",");				
				$(el).autocomplete({
					source:sourcedata,
					minLength: 0,
					change: function( event, ui ) {
						$(el).trigger("change");
					},
					select: function( event, ui ) {
						$(el).trigger("change");
					}
				}).focus(function(){ 
					$(el).autocomplete( "search", "" );
				}).click(function(){  
					$(el).autocomplete( "search", "" );
				});
				$(el).autocomplete( "search", "" );	
			}else if (odd_input_type=='picklist'){
				odd_fill_picklist_trigger_data(el, data);				
			}else{
				alert("pull trigger is not implemented for type:" + odd_input_type);
			}
			
			
		}			
	}).fail(function(err){
		alert(err);
	});	
}

//Form tab controller
function showParamDiv(divid, liid)
{	
	
	$(".parameter-groups").each(function(idx, pg){
		$(pg).hide();
	});
	$("#" + divid).show();	
	$(".tabNavContainer-tab > li").removeClass("selected");
	$("#" + liid).addClass("selected");
	enableDataPicker();
	//enableNonBubblingDivScrolling();	
	perform_odd_tab_select_trigger();
	return false;
	
}


function perform_odd_tab_select_trigger()
{
	
	//console.log("perform_odd_tab_select_trigger");
	$("input[data-odd-tab-select-trigger='true']").each(function(idx, input){	
		var type = $(input).data("odd-input-type");		
		if(!type){			
		}else if(type=='radiogroup'){					
				var tgcmd = $(input).data("odd-input-trigger-command");				
				var tgt = $(input).data("odd-input-trigger");				
				if(odd_is_target_loaded(tgt)==false){
					//console.log("perform_odd_tab_select_trigger>>" + 'radiogroup');
					odd_auto_complete(input, tgt, tgcmd);
				}				
		}else if(type=='string'){			
			var tgt = $(input).data("odd-input-trigger");
			if(tgt && odd_is_ui_trigger(tgt)){				
				odd_ui_trigger(input, tgt);
			}else if(odd_is_target_loaded(tgt)==false){
				//console.log("perform_odd_tab_select_trigger>>" + 'string' + " target=" + tgt + " value=" + $(input).val());
				var tgcmd = $(input).data("odd-input-trigger-command");				
				odd_auto_complete(input, tgt, tgcmd);	
			}				
		}else{
			var tgcmd = $(input).data("odd-input-trigger-command");				
			var tgt = $(input).data("odd-input-trigger");				
			if(odd_is_target_loaded(tgt)==false){
				//console.log("perform_odd_tab_select_trigger>>" + 'radiogroup');
				odd_auto_complete(input, tgt, tgcmd);
			}	
			//console.log("perform_odd_tab_select_trigger>>" + 'other');
		}
	});
	
	$("select[data-odd-tab-select-trigger='false'][onchange*='odd_auto_complete']").each(function(idx, input){	
		var $select = $(input);
		var tgts = $select.data("odd-input-trigger");
		//console.log(input);
		//console.log(tgts);
		if(odd_is_target_loaded($select.attr("id")) && tgts){
			//console.log(tgts);
			if(odd_is_target_loaded(tgts)==false){
				$select.trigger("change");
			}
		}
	});	
}

function odd_is_ui_trigger(tgt)
{
	var islock = false;
	if(tgt){
		var ar = $(tgt.split("|")).each(function(idx, fd){
			$(fd.split(";")).each(function(idx1, lock){
				if(lock.indexOf("lock")==0 || lock.indexOf("unlock")==0 ){
					islock = true;
				}
			});
		});
	}
	return islock;
}


function odd_is_target_loaded(tgts)
{
	if(!tgts) return true;
	if(odd_is_ui_trigger(tgts)) return true;
	
	
	var targts = tgts.split(";");
	//console.log("TARGETS:" + targts);
	
	
	var gotVal = false;
	$.each(targts, function(idx, item){
		var $item = $("#" + item);
		var type = $item.data("odd-input-type");		
		if(type=='string' ){
			if( $item.val() && $item.val().trim()>0 ){				
				gotVal = true;
			}
		}else if( type=='picklist'){
			 //console.log("BABY U R HERE:" + targts);
			 $item.find("> option").each(function(idx, opt){				
				var $opt = $(opt);
				//console.log("Loop Each $opt val:" + $opt.val() + " SELECTed=" + $opt.prop("selected"));
				if( $opt.val()  && $opt.prop("selected")){		
					gotVal = true;
				}				
			 });
		 }else if( type=='multiselect') {
			 $("input[id^='" +item + "']").each(function(idx, chkbx){
					if($(chkbx).prop("checked")){
						gotVal = true;
					}
			 });
		 }
	});
	return gotVal;
}


function hidenTheAtgForm()
{
	if($("#odd-form-row").length>0){
		
		$("#odd-form-container").hide('slow', function(){
			$("#odd-form-container").appendTo("#odd-form-buffer");
			$("#odd-form-row").remove();
		});
	}
	$(".parameter-groups").each(function(idx, pg){
		if(idx==0){
			$(pg).show();
		}else{
			$(pg).hide();
		}
		
	});	
	$(".tabNavContainer-tab > li").removeClass("selected");
	disableDataPicker();
	//disableNonBubblingDivScrolling();
}

//dataBindingRules
function bindOddInputForm(formid, dbrs, rowData)
{
	var frmSelector = "#" + formid;
	
	$(frmSelector).find("input").each(function( idx, input){
		var $inputTgt = $(input);
		var itype = $inputTgt.attr("type");
		if(itype=='checkbox') {
				;
		}else if (itype=='radio'){
			   ;			
		}else if (itype=='fileupload'){
			$inputTgt.val("");			
		}else if (itype=='password'){
			var paramName = $(input).attr("name");
			//console.log(paramName);
			if(paramName == 'pwd'){
				var idx = dbrs[paramName];
				if(idx>=0){
					var v = rowData[idx];
					$inputTgt.val(v);
				}
			}else{
				$inputTgt.val("");
			}
			//console.log($(input));
		}else{
			var odd_input_type = $inputTgt.data("odd-input-type");
			if(odd_input_type==='fileupload'){
				$inputTgt.val("");	
				$(".progressBar").find(".progress-bar-success").css('width', '0%');
				$(".odd-upload-files-report-table").find("tbody").html("");
				$(".odd-upload-files-report-text").html("");
			}else{			
				var paramName = $inputTgt.attr("name");				
				var idx = dbrs[paramName];
				if(idx>=0){
					var v = rowData[idx];
					if(v==" ")v="";
					$inputTgt.val(v);
					var trigger = $inputTgt.data("odd-input-trigger");
					var cmd = $inputTgt.data("odd-input-trigger-command");
					var onloadTrigger =  $inputTgt.data('odd-tab-select-trigger');				
					if(onloadTrigger==true){					
						odd_auto_complete(input, trigger, cmd);
					}			
				}
			}
		}
			
	});

	$(frmSelector).find("select").each(function( idx, input){
		var paramName = $(input).attr("name");	
		var idx = dbrs[paramName];
		if(idx>=0){
			var v = rowData[idx];
			$(input).find("option").each(function(oidx, optx){
				if($(optx).val()==v){
					$(optx).prop('selected', true);
				}else{
				    $(optx).prop('selected', false);
				}			
			});		
		}				
	});

	$(frmSelector).find("input[type='checkbox']").each(function( idx, chbx){
		var name = $(chbx).attr("name");
		var paramName = name.replace(/__\d+$/, "");
		var idx = dbrs[paramName];
		if(idx>=0 && idx < rowData.length){			
			var v = rowData[idx];			
			if(v){
				var va = v.split(",");
				if($.inArray($(chbx).val(), va)!=-1){
					$(chbx).prop('checked', true);
				}else{
					$(chbx).prop('checked', false);
				}
			}else{
				$(chbx).prop('checked', false);
			}				
		}	
		
		if ($(chbx).attr("data-odd-input-trigger"))
		{
			triggerCbEvent($(chbx));
		}

		//alert("idx: " + idx + ", chbx: " + chbx);
	});
	
	$(frmSelector).find("input[type='radio']").each(function( idx, chbx){
		var paramName = $(chbx).attr("name");		
		var idx = dbrs[paramName];
		if(idx>=0  && idx < rowData.length){
			var v = rowData[idx];
			
			if(v && v.indexOf($(chbx).val())!=-1){
				$(chbx).prop('checked', true);
			}else{
				$(chbx).prop('checked', false);
			}	
		}
					
	});	
	
	$(frmSelector).find("textarea").each(function( idx, input){
		var paramName = $(input).attr("name");	
		//console.log(paramName);
		var idx = dbrs[paramName];
		if(idx>=0){
			var v = rowData[idx];
			//console.log(v);	
			$(input).val(v);
		}				
	});
	
	//Show first tab first;
	resetFormView();	
	//disableNonBubblingDivScrolling();
	//enableNonBubblingDivScrolling();
	perform_odd_tab_select_trigger();
}

function resetFormView()
{
	$(".odd_form_wizard_dialog").hide().first().show();
	$('.tabNavContainer-tab > li').removeClass("selected");
	$(".odd_form_wizard_dialog").each(function(idx, dlg){$(dlg).filter(":visible").find('.tabNavContainer-tab > li').first().addClass("selected");});
	$(".odd_form_wizard_dialog").each(function(idx, dlg){$(dlg).filter(":visible").find('.parameter-groups').hide().first().show();});
}

function showFormDialog(menuItem)
{
	$("#"+menuItem).show();
	$("#"+menuItem + "-dialog").show('slow');
	//Show first tab first;
	resetFormView();
	//enableNonBubblingDivScrolling();
} 

function enableDataPicker()
{
	$("input[data-odd-input-type='calendar']").datepicker({
		showOn: "button",
        buttonImage: oddImagesPath + "calendar.png",
        buttonImageOnly: false
	});
	
}

function disableDataPicker()
{	
	$("input[data-odd-input-type='calendar']").datepicker( "destroy" );
}

var OddActionTableUtil = {};
OddActionTableUtil.selectAll = function (oddActionTable, valFieldId)
{
	var dataValue = "";	
	//console.log(oddActionTable);
	//console.log(valFieldId);
	$(oddActionTable).find("input[type='checkbox'][name^='multiSelect_']").each(function(index, chbx){
			$(chbx).prop("checked", true);
			var dataIndex = $(chbx).data("value");
			//console.log(dataIndex);
			var row = gridData[dataIndex];
			var strVal = row.join(colDelimiter);
			if( dataValue ){
				dataValue = dataValue + rowDelimiter + strVal;
			}else{
				dataValue = strVal;
			}										
	});	
    $('#'+valFieldId).val(dataValue);	
    //console.log(dataValue);
};

OddActionTableUtil.deselectAll = function (oddActionTable, valFieldId)
{
	$("input[type='checkbox'][name^='multiSelect_']").each(function(index, chbx){
		$(chbx).prop("checked", false);																
	});
	$('#'+valFieldId).val("");	
};

function enableNonBubblingDivScrolling()
{
	$(".actiontable-form-container").addClass('nonBubblingScrollingDiv');	
	//console.log("enableNonBubblingDivScrolling() called: ");
	$('.nonBubblingScrollingDiv').on('DOMMouseScroll mousewheel', function(ev) {
		var $this = $(this),
			scrollTop = this.scrollTop,
			scrollHeight = this.scrollHeight,
			height = $this.height(),
			delta = ev.originalEvent.wheelDelta,
			up = delta > 0;
		console.log("delta called: " + delta);
		var prevent = function() {
			ev.stopPropagation();
			ev.preventDefault();
			ev.returnValue = false;
			return false;
		};
		
		if (!up && -delta > scrollHeight - height - scrollTop) {
			// Scrolling down, but this will take us past the bottom.			
			$this.scrollTop(scrollHeight);
			return prevent();
		} else if (up && delta > scrollTop) {
			// Scrolling up, but this will take us past the top.
			$this.scrollTop(0);
			return prevent();
		}
	});
	
}

function disableNonBubblingDivScrolling()
{	
	$(".actiontable-form-container").removeClass('nonBubblingScrollingDiv');
}


function fixButtonPositionOnScroll(barPosition, topBarOffset, tableOffset)
{
	
	var fixedBarWidth = $(".multiActionTable").width() + 2;
	var fixedPositionBarHeight = $(".multiActionTable").height();
	
	//console.log("fixedPositionBarHeight: " + fixedPositionBarHeight);
	
	// bar's original position on normal load (when total header is visible / scrollbar is not at top of page)
	var origTopBarPosition = barPosition;
	var topBarZIndex = 100;			
	var tableZIndex = 99;	
	
	// bar's position when page loads (could be in middle of page when header is not visible)
	var onLoadTopBarPosition = $(window).scrollTop();	
	//console.log("onLoadTopBarPosition: " + onLoadTopBarPosition);
	

		
	// if offset is included, add it to the original position
	if (topBarOffset != 0)
	{
		origTopBarPosition = origTopBarPosition + topBarOffset;
	}
	
	//console.log("-------origTopBarPosition: " + origTopBarPosition);
	
	var tableYPos = $(".multiActionTable").position();
	//console.log("multiActionTable offset y: " + tableYPos);
	
	// set the original position
	if (onLoadTopBarPosition > origTopBarPosition)		// when the user is anywhere but the top of the page (scrollbar is not at top of page), set the fixed top position to 0
	{
		$("#fixedPositionBar").css("position", "fixed");
		$("#fixedPositionBar").css("top", 0);
		$("#fixedPositionBar").css("z-index", topBarZIndex);
	}
	else												// when the user is at top of the page
	{			
		$(".multiActionTable").css("position", "relative");
		$(".multiActionTable").css("top", 0);
		$(".multiActionTable").css("z-index", tableZIndex);
	}		
	
	
	
	// set bar width to width of table
	$("#fixedPositionBar").css("width", fixedBarWidth);	
	
	// handle window resize events, and make sure the bar matches the width of the table
	$(window).resize(function()
	{
		fixedBarWidth = $(".multiActionTable").width();		// width of table
		$("#fixedPositionBar").css("width", fixedBarWidth);	// set bar width to width of table
		//console.log("resize!");
	
	});
	
	// when user starts scrolling
	$(window).scroll(function()
	{
		
		var scrollTopPos = $(window).scrollTop();								// get user's scrolling position		
	
		//console.log("scrollTopPos: " + scrollTopPos);
				
		$(".multiActionTable").css("position", "relative");
		$(".multiActionTable").css("top", tableOffset);
		$(".multiActionTable").css("z-index", tableZIndex);
		
		
		if (scrollTopPos >= origTopBarPosition)											// if the user is beyond fixed bar's original position and first mouse scroll
		{
			//console.log("GREATHER THAN " + origTopBarPosition + " scrollTopPos: " + scrollTopPos);			
			$("#fixedPositionBar").css("position", "fixed");
			$("#fixedPositionBar").css("top", 0);
			$("#fixedPositionBar").css("z-index", topBarZIndex);
		}
		else															// when user is at default mouse scroll position (top of page)
		{
			//console.log("LESS THAN " + origTopBarPosition + " scrollTopPos: " + scrollTopPos);
			$("#fixedPositionBar").css("position", "absolute");
			$("#fixedPositionBar").css("top", origTopBarPosition);
			$("#fixedPositionBar").css("z-index", topBarZIndex);
			
			$(".multiActionTable").css("top", tableOffset);			
		}
		
	
	});
	
	
}