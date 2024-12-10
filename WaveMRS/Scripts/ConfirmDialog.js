var ConfirmStatus = 0; // use for confirmation dialog, 0 means disabled; 1 means enabled;
var ConfirmDialogWidth = 0; // use for Confirm Dialog Width
var ConfirmDialogHeight = 0; // use for Confirm Dialog Hight
var LastVScrollValue; // used to obtain the window vertical scroll value if any, when showing the confirmation.
var LastHScrollValue; // used to obtain the window horizontal scroll value if any, when showing the confirmation.

//loading
function loadConfirmDialog() {
    //loads popup only if it is disabled
    if (ConfirmStatus == 0) {
        LastVScrollValue = $(window).scrollTop();
        LastHScrollValue = $(window).scrollLeft();
        ConfirmStatus = 1;

        $("#ConfirmBackGround").css({
            "opacity": "0.7",
            "width": "100%",
            "zIndex": "999"
        });
        $("#ConfirmBackGround").fadeIn("fast");
        $("#ConfirmBox").fadeIn("fast");
        if ($.browser.msie && $.browser.version < 7) {
            $("select").each(function () {
                $(this).hide();
            });
        }
    }
}

//disabling
function hideConfirmDialog() {
    //disables popup only if it is enabled
    if (ConfirmStatus == 1) {
        ConfirmStatus = 0;
        $("#ConfirmBackGround").fadeOut("normal");
        $("#ConfirmBox").fadeOut("normal");
        $("body").css({
            "overflow": ""
        });
        $("#ConfirmBackGround").css({
            "height": "1px",
            "width": "1px"
        });
        $(window).scrollTo({ top: LastVScrollValue, left: LastHScrollValue }, 600, { queue: true });
        if ($.browser.msie && $.browser.version < 7) {
            $("select").each(function () {
                $(this).show();
            });
        }
    }
}

//centering
function centerConfirmDialog() {
    //request data for centering
    if (ConfirmStatus == 1) {
        $(window).scrollTo({ top: 0, left: 0 }, 300, { queue: true });
        $("body").css({
            "overflow": "hidden",
            "_overflow": "hidden"
        });

        var windowWidth = $(window).width();
        var windowHeight = $(window).height();
        //centering
        $("#ConfirmBox").css({
            "position": "fixed",
            "_position": "absolute",
            "top": ((windowHeight / 2) - (ConfirmDialogHeight / 2)) + "px",
            "left": ((windowWidth / 2) - (ConfirmDialogWidth / 2)) + "px",
            "height": ConfirmDialogHeight + "px",
            "width": ConfirmDialogWidth + "px",
            "zIndex": "1000"
        });

        //only need force for IE6
        $("#ConfirmBackGround").css({
            "position": "fixed",
            "_position": "absolute",
            "height": windowHeight + $(window).scrollTop(),
            "width": windowWidth + $(window).scrollLeft()
        });
    }
}

function showConfirmation(params) {
    if (document.getElementById('ConfirmBox') != null) {
        var bIsOK = true;
        if (typeof (params.functionToCallBefore) == 'function') {
            if (params.functionArgs) {
                bIsOK = params.functionToCallBefore.apply(params.functionToCallBefore, params.functionArgs);
            }
            else {
                bIsOK = params.functionToCallBefore.call(params.functionToCallBefore);
            }
        }
        if (bIsOK) {
            ConfirmDialogWidth = params.DialogWidth;
            ConfirmDialogHeight = params.DialogHeight;
            loadConfirmDialog();
            centerConfirmDialog();

            $("input:hidden[id$='_Data']:first").val(params.Data);
            $("input:hidden[id$='_Operation']:first").val(params.Operation);
            $('#' + params.lblTitleID).text(params.titleText);
            $('#' + params.lblMessageConatiner).html(params.message);

            $('#' + params.btnYesID).click(function () {
                hideConfirmDialog();
                return true;
            });

            $('#' + params.btnNoID).click(function () {
                hideConfirmDialog();
                return false;
            });

            $('#' + params.btnClosID).click(function () {
                hideConfirmDialog();
                return false;
            });
        }
        return false;
    }
    else {
        return confirm(params.message);
    }
}



function showConfirmationScan(message, DialogWidth, DialogHeight, Data, Operation, titleText) {
    debugger;
    if (document.getElementById('ConfirmBox') != null) {
        var bIsOK = true;
        if (bIsOK) {
            ConfirmDialogWidth = DialogWidth;
            ConfirmDialogHeight = DialogHeight;
            loadConfirmDialog();
            centerConfirmDialog();

            $("input:hidden[id$='_Data']:first").val(Data);
            $("input:hidden[id$='_Operation']:first").val(Operation);
            $('#lblConfirmTitleText').text(titleText);
            $('#lblMSG').html(message);

            $('#ibtnYes').hide();
            $('#ibtnNo').hide();

            $('#ibtnYesScan').show();
            $('#ibtnNoScan').show();

            $('#ibtnYesScan').click(function () {
                hideConfirmDialog();
                return true;
            });

            $('#ibtnNoScan').click(function () {
                hideConfirmDialog();
                return false;
            });

            $('#ibtnClose').click(function () {
                hideConfirmDialog();
                return false;
            });
        }
        return false;
    }
    else {
        return confirm(message);
    }
}