//Jmustafa  ---------------------- Start Check Browser -------------------------------
// Returns the version of Internet Explorer or a -1
// (indicating the use of another browser).
function GetInternetExplorerVersion() {
    var IEVersion = -1; // Return value assumes failure.
    if (navigator.appName == 'Microsoft Internet Explorer') {
        var UserAgent = navigator.userAgent;
        var Expression = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if (Expression.exec(UserAgent) != null)
            IEVersion = parseFloat(RegExp.$1);
    }
    else if (navigator.userAgent.indexOf("rv:11.0") > 0)
        IEVersion = 11;
    return IEVersion;
}

var form_submitted = false;
function vDisableMultiClick(control) {
    if (form_submitted) {
        return false;
    }
    else {
        form_submitted = true;
        return true;
    }

}
function ValidateLettersWithSpaceOnly(sender) {
    if (sender.value == "undefined")
        return false;
    var clipboardDataTemp = sender.value;
    var strUnValidChars = "<>;',#%&$";
    var strChar;
    var FilteredChars = "";
    try {
        for (i = 0; i < clipboardDataTemp.length; i++) {
            strChar = clipboardDataTemp.charAt(i);
            if (strUnValidChars.indexOf(strChar) <= -1) {
                FilteredChars = FilteredChars + strChar;
            }
        }
        sender.value = FilteredChars;
    } catch (ex) {
        console.log(ex.message);
    }
}
//check the version of IE by passing parameter in "nIEVersion" if the browser is not IE then will return true
//"CheckWithDocumentMode" : True - this will compare ie document mode with browser mode 
// if equal or grater than the result return true else return false
//"sRedirectPage" : Redirect Page with path if not valid IE version
function IsRecentIEVersion(nIEVersion, bCheckWithDocumentMode/*True Or False*/, sRedirectPage) {
    var IsRecentVersion = true; // true: Default for other browsers
    var CheckWithDocumentMode = typeof bCheckWithDocumentMode !== 'undefined' ? bCheckWithDocumentMode : true; //Default value for parameter.
    var RedirectPage = typeof sRedirectPage !== 'undefined' ? sRedirectPage : ''; //Default value for parameter.
    var version = GetInternetExplorerVersion();

    if (version > -1) {
        if (version >= nIEVersion)// 8.0 Pass By Param
        {
            if (CheckWithDocumentMode) {
                IsRecentVersion = (document.documentMode >= nIEVersion) // Check Document mode like version or not
            }
            else {
                IsRecentVersion = true;
            }
        }
        else
            IsRecentVersion = false;
    }
    else
        IsRecentVersion = false;

    //Redirect Page if not valid IE version
    if (!IsRecentVersion && RedirectPage != '') {
        window.location = RedirectPage;
    }
    return IsRecentVersion;
}
//Jmustafa  ---------------------- End Check Browser -------------------------------


function OpenPopup(url, width, height, queryString) {
    var featuresDialog = 'dialogwidth:' + width + 'px;dialogheight:' + height + 'px;toolbar=no;location=no; directories=no;menubar=no;Status:no;resizable:no;scroll:yes;help:no';
    var featuresOpen = 'resizable=0,scrollbars=1,width=' + width + 'px;height=' + height + 'px';
    var windowObj;
    if ($.browser.msie) {
        windowObj = window.showModalDialog(url + '?' + queryString, window, featuresDialog);
    }
    else {
        windowObj = window.open(url + '?' + queryString, window, featuresOpen);
        return undefined;
    }
    return windowObj;
}

function Resize() {
    $(window).resize(function () {
        centerConfirmDialog(ConfirmDialogWidth, ConfirmDialogHeight);
    });

    $(window).resize(function () {
        centerAlertDialog(AlertDialogWidth, AlertDialogHeight);
    });
}

/*/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/Loading Setup BEGIN\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/*/
var LoadingStatus = 0;
function loadLoadingDialog() {
    //loads popup only if it is disabled
    if (LoadingStatus == 0) {
        LoadingStatus = 1;
        if ($.browser.msie && $.browser.version < 7) {
            $("select").each(function () {
                $(this).hide();
            });
        }
        $("#LoadBackGround").css({
            "opacity": "0.7",
            "width": "100%",
            "zIndex": "900"
        });
        $("#LoadBackGround").fadeIn("fast");
        $("#Loading").fadeIn("fast");
    }
}

//disabling
function hideLoadingDialog() {
    //disables popup only if it is enabled
    if (LoadingStatus == 1) {
        LoadingStatus = 0;
        $("#LoadBackGround").fadeOut("slow");
        $("#Loading").fadeOut("slow");
        $("#LoadBackGround").css({
            "height": "1px",
            "width": "1px"
        });
        if ($.browser.msie && $.browser.version < 7) {
            $("select").each(function () {
                $(this).show();
            });
        }
    }
}

//centering
function centerLoadingDialog() {
    if (LoadingStatus == 1) // loaded
    {
        //request data for centering
        var windowWidth = $(window).width();
        var windowHeight = $(window).height();
        //centering
        $("#Loading").css({
            "position": "fixed",
            "_position": "absolute",
            "top": ((windowHeight / 2) - ($("#Loading").height() / 2)) + "px",
            "left": ((windowWidth / 2) - ($("#Loading").width() / 2)) + "px"
        });
        //IE 6 hack
        $("#LoadBackGround").css({
            "position": "fixed",
            "_position": "absolute",
            "height": (windowHeight + $(window).scrollTop()) + "px",
            "width": (windowWidth + $(window).scrollLeft()) + "px"
        });
    }
}

function DisableTabWhileLoading() {
    $(document).bind('keypress keydown', function (e) {
        if (LoadingStatus == 1) {
            var keycode = (window.event) ? event.keyCode : e.keyCode; // MSIE or Firefox?
            //disbale the tab button when showing the loading
            if (keycode == 9) {
                return false;
            }
        }
    });
}
/*/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/Loading Setup END\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/*/

function DisableConfirmDialog() {
    $(document).keypress(function (e) {
        if (ConfirmStatus == 1) {
            if (e.keyCode == 27 && ConfirmStatus == 1) {
                hideConfirmDialog();
                return false;
            }
            if (e.keyCode == 9) {
                return false; //disbale the tab button when showing the dialog
            }
        }
    });
}


function DisableAlertDialog() {
    $(document).keypress(function (e) {
        if (AlertStatus == 1) {
            if (e.keyCode == 27 && AlertStatus == 1) {
                //hideAlertDialog(); To solove bind after close alert dialog
                return false;
            }
            if (e.keyCode == 9) {
                return false; //disbale the tab button when showing the dialog
            }
        }
    });
}

function ResizeMaintain() {
    $(window).resize(function () {
        centerConfirmDialog(ConfirmDialogWidth, ConfirmDialogHeight);
        centerLoadingDialog();
    });

    $(window).resize(function () {
        centerAlertDialog(AlertDialogWidth, AlertDialogHeight);
        centerLoadingDialog();
    });
}

function ScrollMaintain() {
    $(window).scroll(function () {
        centerConfirmDialog(ConfirmDialogWidth, ConfirmDialogHeight);
        centerLoadingDialog();
    });

    $(window).scroll(function () {
        centerAlertDialog(AlertDialogWidth, AlertDialogHeight);
        centerLoadingDialog();
    });
}

function DisableForm() {
    loadLoadingDialog();
    centerLoadingDialog();
    return false;
}

function EnableForm() {
    hideLoadingDialog();
}

function beginRequestHandler(sender, args) {
    DisableForm();

}

function endRequestHandler(sender, args) {
    EnableForm();
    $('[id*=_EN]').EnglishInput();
    $('[id*=_En]').EnglishInput();
    $('[id*=_en]').EnglishInput();
    showValidations();
    showTabValidations();
}

function pageLoad() {
    $("#Loading").hide();
    Sys.WebForms.PageRequestManager.getInstance().add_beginRequest(beginRequestHandler);
    Sys.WebForms.PageRequestManager.getInstance().remove_endRequest(endRequestHandler);
    Sys.WebForms.PageRequestManager.getInstance().add_endRequest(endRequestHandler);
    Sys.WebForms.PageRequestManager.getInstance().add_pageLoaded(function (sender, args) {
        if (sender._postBackSettings != null) {
            if (sender._postBackSettings.sourceElement != undefined && sender._postBackSettings.sourceElement.className == 'CustomLinkButton')
                if (document.getElementById('txtfocus') != undefined)
                    document.getElementById('txtfocus').focus();
        }
    });
}

$(document).ready(function () {

    $('[id*=_EN]').EnglishInput();
    $('[id*=_En]').EnglishInput();
    $('[id*=_en]').EnglishInput();

    $("#dvCloseValidations").click(function () {
        hiddenDivValidations();
    });
    showTabValidations();
});

//Jmustafa  ---------------------- show Tab Validation -------------------------------
function showTabValidations() {
    $(".rtsLink").click(function () {
        if (typeof (Page_Validators) === 'undefined') {
        }
        else {
            var hdndisableTabValidation = $('[id*=hdnDisableValidationOnTab]')
            if (hdndisableTabValidation != undefined && hdndisableTabValidation.val() != 'True' && this.className.indexOf('rtsDisabled') < 0 && this.className.indexOf('SelectedTab') < 0) {
                if (typeof (ValidatorOnSubmit) == "function" && ValidatorOnSubmit() == false) {

                    showValidations();
                }
            }
        }
    });
};

//Jmustafa  ---------------------- show div Popup -------------------------------
function showDialog(nDivWidth) {
    showPopup('#divPopup', '#divPopupConfirmBackGround', nDivWidth)
};
function showDialogUC(nDivWidth, divPopupID, PopupBackGroundID) {
    showPopup('#' + divPopupID, '#' + PopupBackGroundID, nDivWidth)
};

function CloseDialog() {
    return ClosePopup('divPopup', 'divPopupConfirmBackGround');

};
function CloseDialogUC() {
    return ClosePopup('UCdivPopup', 'UCConfirmBackGround');
};

function showPopup(divPopup, PopupBackGround, nDivWidth) {
    $('[id*=_EN]').EnglishInput();
    $('[id*=_En]').EnglishInput();
    $('[id*=_en]').EnglishInput();
    //Get the screen height and width
    var maskHeight = $(document).height();
    var maskWidth = $(window).width();
    //Set heigth and width to mask to fill up the whole screen
    $(PopupBackGround).css({
        'width': maskWidth,
        'height': maskHeight,
        'display': 'none',
        'position': 'fixed',
        '_position': 'absolute',
        'top': 0,
        'left': 0,
        'background-color': '#086BAC',
        'border': '1px solid #086BAC',
        'zIndex': '900'
    });

    //transition effect
    $(PopupBackGround).fadeTo(700, 0.7);

    //Get the window height and width
    var winH = $(window).height();
    var winW = $(window).width();
    $(divPopup).css('width', nDivWidth);
    //Set the popup window to center
    $(divPopup).css('top', winH / 2 - $(divPopup).height() / 2);
    $(divPopup).css('left', winW / 2 - $(divPopup).width() / 2);
    if (divPopup.indexOf('UCdivPopup') >= 0)
        $(divPopup).css('zIndex', 1005);
    else
        $(divPopup).css('zIndex', 950);

    //transition effect
    $(divPopup).fadeIn(700);
    if ($(divPopup).length > 0)
        $(divPopup)[0].focus();

    $('css3-container').css('top', (winH / 2 - $(divPopup).height() / 2) + 2);
    $('css3-container').css('left', (winW / 2 - $(divPopup).width() / 2) + 2);

    $(divPopup).find('.ClosePopup').unbind('click');
    $(divPopup).find('.ClosePopup').click(function (e) {
        ClosePopup(divPopup, PopupBackGround);
    });
    $(PopupBackGround).keypress(function (e) {
        hidePopup(e, divPopup, PopupBackGround);
    });
    $(divPopup).keypress(function (e) {
        hidePopup(e, divPopup, PopupBackGround);
    });
    $(window).keypress(function (e) {
        hidePopup(e, divPopup, PopupBackGround);
    });
    Sys.WebForms.PageRequestManager.getInstance().add_endRequest(function () {
        resizePopup(divPopup, PopupBackGround);
    });

    $(divPopup).resize(function () {
        resizePopup(divPopup, PopupBackGround);
    });
    $(window).resize(function () {
        resizePopup(divPopup, PopupBackGround);
    });
    vSetControlFocus(divPopup.substring(1));
    hiddenDivValidations();
};

function ClosePopup(divPopup, ConfirmBackGround) {
    if (divPopup.indexOf('#') >= 0) {
        divPopup = divPopup.substring(1);
        ConfirmBackGround = ConfirmBackGround.substring(1);
    }
    $('[id*=' + divPopup + ']').fadeOut(700);
    $('[id*=' + ConfirmBackGround + ']').fadeOut(700);
    if (ConfirmBackGround == 'divPopupConfirmBackGround')
        $('[id*=UCConfirmBackGround]').fadeOut(700);
    hiddenDivValidations();
    $('body').removeClass('stop-scrolling');
    return false;
};

function hidePopup(e, divPopup, ConfirmBackGround) {
    var unicode = (e.keyCode ? e.keyCode : e.which);
    if (unicode == 27) {
        if (divPopup.indexOf('#') >= 0) {
            divPopup = divPopup.substring(1);
            ConfirmBackGround = ConfirmBackGround.substring(1);
        }
        $('[id*=' + divPopup + ']').fadeOut(300);
        $('[id*=' + ConfirmBackGround + ']').fadeOut(300);
        hiddenDivValidations();
    }
};

function resizePopup(divPopup, PopupBackGround) {
    var box = $(divPopup);
    //Get the screen height and width
    var maskHeight = $(document).height();
    var maskWidth = $(window).width();

    //Set height and width to mask to fill up the whole screen
    $(PopupBackGround).css({ 'width': maskWidth, 'height': maskHeight });

    //Get the window height and width
    var winH = $(window).height();
    var winW = $(window).width();

    //Set the popup window to center
    box.css('top', winH / 2 - box.height() / 2);
    box.css('left', winW / 2 - box.width() / 2);
};
//End ---------------------- show div Popup -------------------------------


//----------------------Code for the Context Action Menu added By F.T. 10/3/2012----------------------------//
function ShowDeleteConfirmation(sMessageBody, sTitle, Argument, Operation, ConfirmationDialogWidth, ConfirmationDialogHeight) {
    if (ConfirmationDialogWidth == '') {
        ConfirmationDialogWidth = document.getElementById('hdnMessageDimension').value.split(',')[0];
    }
    if (ConfirmationDialogHeight == '') {
        ConfirmationDialogHeight = document.getElementById('hdnMessageDimension').value.split(',')[1];
    }
    return showConfirmation(sMessageBody, 'lblMSG', 'ibtnYes', 'ibtnNo', 'ibtnClose', 'lblConfirmTitleText', sTitle, Argument, ConfirmationDialogWidth, ConfirmationDialogHeight, Operation);
}
//---------------------- Code for auto Hide Lable Result after showing result ----------------------------//
function AutoHideLabelResult(LabelID) {
    $(LabelID).fadeOut(5000);
}
//End----------------------Code for the Context Action Menu added By F.T. 10/3/2012----------------------------//


//Jmustafa 23082012 ---------------------- Call ASHX -------------------------------
var httpReq = null;
function callASHX(querystring) {
    httpReq = ajaxRequest_XMLHttpRequest();
    httpReq.onreadystatechange = XMLHttpRequestCompleted;
    httpReq.open("GET", querystring, true);
    httpReq.send(null);
}

// initialize XMLHttpRequest object
function ajaxRequest_XMLHttpRequest() {
    var xmlHttp;
    try {
        // Opera 8.0+, Firefox, Safari
        xmlHttp = new XMLHttpRequest();
    }
    catch (e) {
        // IEBrowsers
        try {
            xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (e) {
            try {
                xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch (e) {
                return false;
            }
        }
    }
    return xmlHttp;
}

function XMLHttpRequestCompleted() {
    if (httpReq.readyState == 4) {
        try {
            //alert(httpReq.responseText);
        }
        catch (e) {
        }
    }
}
//End  ---------------------- Call ASHX -------------------------------



//@ Jumatafa  ---------------------- Show Scanner Popup -------------------------------
function ShowScannerPopup(hdnFilesName, MaxFileNo, LanguageID, ImageName, hControl1, hControl2) {
    var url = "../WebCapture/Capture_Scan.aspx";
    var Language;
    if (LanguageID = 1)
        Language = 'English';
    else
        Language = 'Arabic';
    var queryString = "AttachType=1&Language=" + Language + "&AttachName=" + ImageName + "&R=" + Math.random() + "&FilesName=" + hdnFilesName; //&RefNo=&AttachName=ImageName
    var retVal = OpenPopup(url, 1000, 900, queryString);
    if (retVal != undefined) {
        //    var RowIndex = $('[id*=' + DivName + ']').find('div').length;
        if (retVal != undefined && retVal != null) {
            var data = retVal;
            if (hdnFilesName != '' && $('[id*=' + hdnFilesName + ']').length > 0) {
                if (MaxFileNo != undefined && MaxFileNo > 1) {
                    $('[id*=' + hdnFilesName + ']')[0].value += data + ";";
                }
                else {
                    $('[id*=' + hdnFilesName + ']')[0].value = data + ";";
                }
            }
            //        $('[id*=' + hControl1 + ']')[0].style.display = 'none';
            //        $('[id*=' + hControl2 + ']')[0].style.display = 'none';
        }
    }

    return false;
}
//End  ---------------------- Show Scanner Popup -------------------------------


//Jmustafa  ---------------------- Uplaoder Attachment -------------------------------
function vDownloadFile(sPath) {
    window.open(sPath, 'Download');
}


function deleteImg(Index, hdnFilesName, sPath) {
    removeImage('tb' + Index, hdnFilesName, sPath);
    callASHX("../UploadFileGH.ashx?Opration=Delete&FileName=" + sPath);
}

function removeImage(uniqueID, hdnFilesName, imgId) {
    $('#' + hdnFilesName)[0].value = $('#' + hdnFilesName)[0].value.replace(imgId + ';', '');
    $('#' + uniqueID).remove();
}
//End  ---------------------- Uplaoder Attachment -------------------------------



function OpenFile(url, width, height, queryString) {
    var featuresOpen = 'width:' + width + 'px;height:' + height + 'px';
    window.open(url + '?' + queryString, "window", featuresOpen);
    return false;
}


function validationFailed(sender, eventArgs) {
    if (document.getElementById("hdnCurrentLangage").value == '1') {
        $(".ErrorHolder").append("<p>Please check the following file type and file size'" + eventArgs.get_fileName() + "'.</p>").fadeIn("slow");
    }
    else {
        $(".ErrorHolder").append("<p>يرجى التحقق من نوع الملف و حجم الملف التالي'" + eventArgs.get_fileName() + "'.</p>").fadeIn("slow");
    }
}

function HidedvancedSearch(trFileExtensions) {
    if (document.getElementById(trFileExtensions).style.display == 'none') {
        document.getElementById(trFileExtensions).style.display = '';
        return false;
    }
    else {
        document.getElementById(trFileExtensions).style.display = 'none';
        return false;
    }
    return false;
}

function OnClientFileUploaded(upload, args) {
    if ($('[id*=btnScanFile]') != null && $('[id*=btnScanFile]').length > 0)
        $('[id*=btnScanFile]')[0].style.display = 'none';

}

function OnClienFileUploadRemoving(upload, eventArgs) {
    if ($('[id*=btnScanFile]') != null && $('[id*=btnScanFile]').length > 0)
        $('[id*=btnScanFile]')[0].style.display = 'block';
}

//Jmustafa Set focus in first control
function vSetControlFocus(content) {
    if (document.getElementById(content) != null) {
        var inputs = /*document.getElementById(content).document.querySelectorAll('input[type=text]');*/document.getElementById(content).getElementsByTagName("input").type == 'text';
        var bFound = false;
        for (i = 0; i < inputs.length; i++) {
            if (inputs[i].type != "hidden" && inputs[i].style.visibility != "hidden" && inputs[i].style.display != 'none') {
                if (inputs[i].disabled != true && inputs[i].id != '' && inputs[i].id != 'txtfocus') {
                    try {
                        inputs[i].focus();
                        var bFound = true;
                    }
                    catch (err) { }
                }
            }
            if (bFound == true)
                break;
        }
    }
}


//Combobox HandleKeyPress Method (to check text inserted in ddl when enter kay)
function OnClientKeyPressing_ComboBox(sender, args) {
    if (args.get_domEvent().keyCode == 13) {
        var item = sender.findItemByText(sender.get_text());
        if (sender.get_text() == "" || item == null) {
            if (sender._highlightedItem == undefined) {

                if (sender.id != "undefined" && sender.id != null) {
                    var combo = $find(sender.id);
                } else {
                    var clientID = sender._clientStateFieldID.split("_ClientState")[0]
                    var combo = $find(clientID);
                }
                if (combo != null)
                    combo.requestItems();
            }
        }
        else {
            item.select();
        }
        sender.commitChanges();
    }
}


//Combobox OnClientBlur Method (to check text inserted in ddl)
function OnClientBlur_ComboBox(sender, args) {
    var item = sender.findItemByText(sender.get_text());
    if (item == null) {
        if (sender._postBackReference == null || sender._postBackReference == "") {
            sender.set_text("");
            sender._selectedItem = null;
            sender.commitChanges();
        } else {
            sender.set_text("");
            sender._selectedItem = null;
            sender.commitChanges();
        }

    }
    else {
        if (Page_IsValid) {
            if (sender._selectedItem != null)
                if (sender._selectedItem._text != null)
                    if (sender._selectedItem._text == item._text)
                        item.select();
                    else {
                        sender.set_text("");
                        sender.commitChanges();
                    }
        }
        else {
            sender.set_text("");
            sender.commitChanges();
        }
    }
    sender.hideDropDown();
}

function Scan(hdnData, language_id, user_name, Page_name) {
    debugger;
    var ErrorHolder = $('#' + hdnData).parent().find('.ErrorHolder');
    var UserData = {
        language_id: language_id,
        user_name: user_name,
        Page_name: Page_name,
        Single_Return_Type: 'jpg'
    }
    ErrorHolder.html('')
    $.ajax({
        type: "POST",
        crossDomain: true,
        url: "http://localhost:8181/ITGScanTools/ITGAPI/ScanTools/Scan",
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            ErrorHolder.html('')
            if (data == 'undefined' || data == null || data == '') {
                ErrorHolder.append("<p style='color: red;'>لم يتم رفع الملف بنجاح يرجى المحاولة مرة اخرى</p>").fadeIn("slow");
            }
            else {
                $('#' + hdnData).val(data);
                ErrorHolder.append("<p style='color: red;'>تم رفع الملف بنجاح</p>").fadeIn("slow");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            ErrorHolder.html('')
            ErrorHolder.append("<p style='color: red;'>لم يتم رفع الملف بنجاح يرجى المحاولة مرة اخرى</p>").fadeIn("slow");
        },
        data: JSON.stringify(UserData)
    });
    return false;
}

function IsAvailable(hdnData, updateParam, installParams, language_id, user_name, Page_name) {
    debugger;
    try {
        $.ajax({
            timeout: 2500,
            type: "GET",
            crossDomain: true,
            dataType: "json",
            url: "http://localhost:8181/ITGScanTools/ITGAPI/ScanTools/IsAvailable",
            success: function (data) {
                Scan(hdnData, language_id, user_name, Page_name);
                //alert(data.version);
                if (!true)//data.version != "1.0") 
                {
                    var r = confirm('update Available please update the scan tool to latest Version');
                    if (r == true) {
                        var Data = showConfirmationScan(updateParam, 400, 150, 5, 'AlertConfirmation', "تنبية !");
                        if (Data == true) {
                            download();
                        }
                        else {
                        }
                    } else {
                    }
                }
                else {
                    //Scan(hdnData);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //var Data = showConfirmation({ 'message': 'هل انت متاكد من عدم ادخال المفوض الاداري ؟ ', 'lblMessageConatiner': 'lblMSG', 'btnYesID': 'ibtnYes', 'btnNoID': 'ibtnNo', 'btnClosID': 'ibtnClose', 'lblTitleID': 'lblConfirmTitleText', 'titleText': 'تنبية !', 'Data': '5', 'DialogWidth': '400', 'DialogHeight': '150', 'Operation': 'AlertConfirmation' });
                var Data = showConfirmationScan(installParams, 400, 150, 5, 'AlertConfirmation', "تنبية !");
                if (Data == true) {
                    download();
                }
                else {
                }
            }
        });
    } catch (e) {
        //var Data = showConfirmation({ 'message': 'هل انت متاكد من عدم ادخال المفوض الاداري ؟ ', 'lblMessageConatiner': 'lblMSG', 'btnYesID': 'ibtnYes', 'btnNoID': 'ibtnNo', 'btnClosID': 'ibtnClose', 'lblTitleID': 'lblConfirmTitleText', 'titleText': 'تنبية !', 'Data': '5', 'DialogWidth': '400', 'DialogHeight': '150', 'Operation': 'AlertConfirmation' });
        var Data = showConfirmationScan(installParams, 400, 150, 5, 'AlertConfirmation', "تنبية !");
        if (Data == true) {
            download();
        }
        else {
        }
    }
}
function download() {
    //convert to server download
    //var link = document.createElement("a");
    //link.setAttribute('download', "ITGScanTools_Installer.msi");
    //link.href = '';
    //document.body.appendChild(link);
    //link.click();
    //link.remove();
}