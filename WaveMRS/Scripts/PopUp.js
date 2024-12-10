

function showClientPopup(url, nDivWidth) {
    var divPopup = '#divClientPopUp';
    var iframePopup = $('#iframeClientPopUp');
    var PopupBackGround = '#divBackground';

    iframePopup.attr('src', url);

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
    //if (divPopup.indexOf('UCdivPopup') >= 0)
    $(divPopup).css('zIndex', 1005);
    //    else
    //    $(divPopup).css('zIndex', 950);*/

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
    $(divPopup).resize(function () {
        resizePopup(divPopup, PopupBackGround);
    });
    $(window).resize(function () {
        resizePopup(divPopup, PopupBackGround);
    });
};

function CloseClientPopup() {
    var divPopup = '#divClientPopUp';
    $('#iframeClientPopUp').removeAttr('src');
    var ConfirmBackGround = '#divBackground';

    //Clear iframe src


    if (divPopup.indexOf('#') >= 0) {
        divPopup = divPopup.substring(1);
        ConfirmBackGround = ConfirmBackGround.substring(1);
    }
    $('[id*=' + divPopup + ']').hide();
    $('[id*=' + ConfirmBackGround + ']').hide();
    return false;
};

$(document).ready(function () {
    $('[id*=_EN]').EnglishInput();
    $('[id*=_En]').EnglishInput();
    $('[id*=_en]').EnglishInput();

    $("#divPopup").focusout(function () {
        $('body').removeClass('stop-scrolling')
    });

    $("#divPopup").focusin(function () {
        $('body').addClass('stop-scrolling')
    });

});


function OnClientDropDownOpening(sender, eventArgs) {
    sender.trackChanges();
    $('.RadComboBoxDropDown').find('.rcbItem').css("display", "block")
    sender.set_text("");
    sender._filterText = '';
    //    sender._updating = true;
    //    sender.clearSelection();
    sender.commitChanges();
}