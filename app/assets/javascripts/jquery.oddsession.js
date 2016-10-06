/**
 * This session manager jquery plugin is created to keep track of Odd backend session to prevent ajax from session expiring error 
 */
(function ( $ ) {
 
    $.fn.manageOddSession = function(options) {
    	 
    	var settings = $.extend({             
             interval: 60,  
             url: "/oddweb/secure/keepAlive",
             logout: "/oddweb/j_spring_security_logout"
         }, options );
    	 
    	return this.each(function()
		{
			var $this = $(this);			
			startMonitorSession($this);
			
		});
    	 
    	function startMonitorSession($this)
    	{
    		setInterval(function($this){
    			monitorSession($this);    			
    		}, settings.interval*1000);
    	};
    	 
    	
    	function monitorSession($this)
    	{
    		$.getJSON(settings.url, function(data) {						
    			if(data && data.state=='WARN'){
    				$this.dialog().show();    				
    			}else if (data && data.state=='TIMEOUT'){
    				window.location = settings.logout;
    			}    			
    		}).fail(function(err) {
    			window.location = settings.logout;
			});;	
    		
    	};
       
    };  
 
}( jQuery ));
