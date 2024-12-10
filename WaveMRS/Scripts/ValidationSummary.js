//*******************************************************************************************************************//
//* File Name     : ValidationSummary.js                                                                            *//
//* Created By    : Jehad Mustafa.                                                                                  *//
//* Creation Date : 22.04.2013                                                                                      *//
//* Comment       : Show  all Validation in Validation Div                                                          *//
//* Version       : 1.0                                                                                             *//
//*******************************************************************************************************************//

function getAllValidationInPage(bShowDivValidations) {
    $("#dvGeneralValidationSummary").empty();
    $("span.ValidationsStyle").each(function () {// Get Text from all control have class ValidationsStyle
        if ($(this).is(':visible') && $(this).css('visibility') != 'hidden' && $(this).text() != '') {
            bShowDivValidations = true;
            $("#dvGeneralValidationSummary").append($(this).text() + '<br />');
            $(this).css('visibility', 'hidden');
        }
    });
    $(".MasterOperationResult").each(function () { // Get Text from all control have class MasterOperationResult
        if ($(this).is(':visible') && $(this).css('visibility') != 'hidden' && $(this).text() != '') {
            bShowDivValidations = true;
            $("#dvGeneralValidationSummary").append($(this).text() + '<br />');
            $(this).css('visibility', 'hidden');
        }
    });
    return bShowDivValidations;
}

function showValidations() {
    var bShowDivValidations = false;
    $("#dvValidations div.OperationResultSummary").each(function () { // hidden all Validation Summary
        if ($(this).css('display') != 'none')
            bShowDivValidations = true;
    });

    $("#dvValidations .OperationResult").each(function () { // hidden all control have calss OperationResult
        if ($.trim($(this).text()) != '' && $(this).css('display') != 'none') {
            bShowDivValidations = true;
        }
    });

    bShowDivValidations = getAllValidationInPage(bShowDivValidations);

    if (bShowDivValidations) {
        $("#dvValidations").css("box-shadow", "#666 3px 3px 3px");
        $("#dvValidations").css("opacity", "0.9");
        $("#dvValidations").show('slow');
    }
    else {
        $("#dvValidations").css("box-shadow", "none");
        $("#dvValidations").hide('slow');
    }
}


function hiddenDivValidations() {
    $("#dvValidations").css("box-shadow", "none");
    $("#dvValidations").hide('slow');
}


function ShowOperationResult(sMessage) {
    $("#dvOperationResult").html(sMessage);
    $("#dvOperationResult").css("opacity", "0.9");
    setTimeout('$("#dvOperationResultContainer").show(); $("#dvOperationResult").fadeIn("slow");', 500);
    //Fade message out in 6 seconds
    setTimeout('$("#dvOperationResult").fadeOut("slow", function() {$("#dvOperationResultContainer").hide();});', 6000);
}

