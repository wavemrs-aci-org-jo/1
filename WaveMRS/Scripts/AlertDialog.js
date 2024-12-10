//0 means disabled; 1 means enabled;
var AlertStatus = 0; // use for Alert dialog
var AlertDialogWidth = 0; // use for Alert Dialog Width
var AlertDialogHeight = 0; // use for Alert Dialog Hight
var LastVScrollValue;
var LastHScrollValue;

//loading
function loadAlertDialog(){
    LastVScrollValue = $(window).scrollTop();
    LastHScrollValue = $(window).scrollLeft();

	//loads popup only if it is disabled
	if(AlertStatus==0){
		$("#ConfirmBackGround").css({
			"opacity": "0.7",
			"width"  : "100%",
			"zIndex" : "900"
		});
		$("#ConfirmBackGround").fadeIn("fast");
		$("#AlertBox").fadeIn("fast");
		AlertStatus = 1;
		if($.browser.msie && $.browser.version == 6.0)
        {
            $("select").each(function() {
                $(this).hide();
            });
        }
	}
}

//disabling
function hideAlertDialog(){
	//disables popup only if it is enabled
	if(AlertStatus==1)
	{
	    AlertStatus = 0;
	    $("#ConfirmBackGround").css({
			"height" : "1",
			"width"  : "1"
		});
		$("body").css({
		"overflow" : ""
		});
		$("#ConfirmBackGround").fadeOut("normal");
		$("#AlertBox").fadeOut("normal");
		$(window).scrollTo( { top:LastVScrollValue, left:LastHScrollValue}, 800,{queue:true} );
		if($.browser.msie && $.browser.version == 6.0)
        {
            $("select").each(function() {
                $(this).show();
            });
        }
	}
}

//centering
function centerAlertDialog(){
	//request data for centering
	if(AlertStatus == 1)
	{
	    var windowWidth = document.documentElement.clientWidth;
	    var windowHeight = document.documentElement.clientHeight;
	    $("body").css({
		    "overflow" : "hidden"
		    });
    		
	    //centering
	    $("#AlertBox").css({
		    "position": "absolute",
		    "top": windowHeight / 2 - AlertDialogHeight / 2 + $(window).scrollTop(),
		    "left": windowWidth / 2 - AlertDialogWidth / 2 + $(window).scrollLeft(),
		    "height" : AlertDialogHeight,
		    "width"  : AlertDialogWidth,
		    "zIndex" : "1000"
	    });
	    //only need force for IE6
	    $("#ConfirmBackGround").css({
		    "height": windowHeight,
		    "width": windowWidth
	    });
	}
}

function showAlert(msg,lbl,btnBackID,btnClosID,lblTitleID,titleText,AlerttionDialogWidth,AlerttionDialogHeight,returnmsg,returnlbl,returnlblWidth)
{
    AlertDialogWidth = AlerttionDialogWidth;
    AlertDialogHeight = AlerttionDialogHeight;
    loadAlertDialog();
    centerAlertDialog();
        
    $('#' + lblTitleID).text(titleText);
    $('#' + lbl).text(msg);
    $('#' + returnlbl).html(returnmsg);
    $('#' + returnlbl).css({
		   
		 "width" : returnlblWidth
		    
	    });
	    
	//$('#' + returnlbl).attr("disabled", true); 
	
	$('#' + returnlbl).focus(function() {
      this.blur();
    });

	
    $('#' + btnBackID).click(function(){
	    hideAlertDialog();
	    return false;
    });  

    $('#' + btnClosID).click(function(){
	    hideAlertDialog();
	    return false;
    });
    return false;
}
