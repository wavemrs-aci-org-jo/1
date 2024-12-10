//******************************************************************************************************************//
//* File Name     : InputLanguage.js                                                                               *//
//* Created By    : Khaled Khelawy [KKhelawy].                                                                     *//
//* Creation Date : 13.11.2012                                                                                     *//
//* Comment       : Force textbox to write arabic or english regardless of user input languge.                     *//
//* Version       : 1.0                                                                                            *//
//******************************************************************************************************************//

///	<summary>
///	Global Members.
///	</summary>
var isSpecialCase = false;

var ArabicUnicode = [1584, 1590, 1589, 1579, 1602, 1601, 1594, 1593, 1607, 1582, 1581, 1580, 1583, 1588, 1587,
                              1610, 1576, 1604, 1575, 1578, 1606, 1605, 1603, 1591, 1574, 1569, 1572, 1585, 1609,
                              1577, 1608, 1586, 1592, 1617, 1614, 1611, 1615, 1612, 1573, 8216, 247, 215, 1563,
                              60, 62, 124, 1616, 1613, 93, 91, 1571, 1600, 1548, 47, 126, 1618, 125,
                              123, 1570, 8217, 44, 46, 1567];

var EnglishUnicode = [96, 113, 119, 101, 114, 116, 121, 117, 105, 111, 112, 91, 93, 97, 115,
                              100, 102, 103, 104, 106, 107, 108, 59, 39, 122, 120, 99, 118, 110,
                              109, 44, 46, 47, 126, 81, 87, 69, 82, 89, 85, 73, 79, 80,
                              123, 125, 124, 65, 83, 68, 70, 72, 74, 75, 76, 90, 88, 67,
                              86, 78, 77, 60, 62, 63];
var KeyDownUnicode = 0;
///	<summary>
///	Force Textbox to write english character regardless of user input languge.
///	</summary>
$.fn.EnglishInput = function () {
    $(this).unbind('keypress')
    $(this).keypress(function (e) {
        var CurrentUnicode = e.keyCode ? e.keyCode : e.charCode;

        //BEGIN :: Handle case of two arabic characters  like " لا لآ لأ لإ " ::
        if (isSpecialCase == true) {
            switch (CurrentUnicode) {
                case 1604:
                    return false;
                    break;
                case 1575:
                    return $(this).SetCharacter(String.fromCharCode(98));
                    break;
                case 1573:
                    return $(this).SetCharacter(String.fromCharCode(84));
                    break;
                case 1571:
                    return $(this).SetCharacter(String.fromCharCode(71));
                    break;
                case 1570:
                    return $(this).SetCharacter(String.fromCharCode(66));
                    break;

            } //end switch
        } //end if
        //END   :: Handle case of two arabic characters  like " لا لآ لأ لإ " ::

        //BEGIN :: Handle Cases of Sepecial character {}[]/,.<>~  ::
        if (
                (KeyDownUnicode == 219 && CurrentUnicode == 91) ||
                (KeyDownUnicode == 221 && CurrentUnicode == 93) ||
                (KeyDownUnicode == 191 && CurrentUnicode == 47) ||
                (KeyDownUnicode == 111 && CurrentUnicode == 47) ||
                (KeyDownUnicode == 219 && CurrentUnicode == 123) ||
                (KeyDownUnicode == 221 && CurrentUnicode == 125) ||
                (KeyDownUnicode == 188 && CurrentUnicode == 44 && (!e.shiftKey)) ||
                (KeyDownUnicode == 190 && CurrentUnicode == 46 && (!e.shiftKey)) ||
                (KeyDownUnicode == 110 && CurrentUnicode == 46 && (!e.shiftKey)) ||
                (KeyDownUnicode == 188 && CurrentUnicode == 60 && e.shiftKey) ||
                (KeyDownUnicode == 190 && CurrentUnicode == 62 && e.shiftKey) ||
                (KeyDownUnicode == 192 && CurrentUnicode == 126 && e.shiftKey)
           ) {
            return $(this).SetCharacter(String.fromCharCode(CurrentUnicode));
        }
        //END   :: Handle Cases of Sepecial character {}[]/,.<>~  ::

        //BEGIN :: Handle Case Of Special Character ( and ) ::
        if (KeyDownUnicode == 57 && e.shiftKey) {
            return $(this).SetCharacter(String.fromCharCode(40));
        }
        else if (KeyDownUnicode == 48 && e.shiftKey) {
            return $(this).SetCharacter(String.fromCharCode(41));
        }
        //END   :: Handle Case Of Special Character ( and ) ::

        return $(this).FindMatchedUniCode(CurrentUnicode, ArabicUnicode, EnglishUnicode);
    });
    //Attach key down to textbox to detirmine special cases character
    $(this).AttachKeyDown();
}

///	<summary>
///	Force Textbox to write arabic character regardless of user input languge.
///	</summary>
$.fn.ArabicInput = function () {
    $(this).keypress(function (e) {
        var CurrentUnicode = e.keyCode ? e.keyCode : e.charCode;
        if (isSpecialCase == true) {//Handle case of two arabic characters.
            switch (CurrentUnicode) {
                case 84:
                    return $(this).SetCharacter(String.fromCharCode(1604) + String.fromCharCode(1573));
                    break;
                case 71:
                    return $(this).SetCharacter(String.fromCharCode(1604) + String.fromCharCode(1571));
                    break;
                case 66:
                    return $(this).SetCharacter(String.fromCharCode(1604) + String.fromCharCode(1570));
                    break;
                case 98:
                    return $(this).SetCharacter(String.fromCharCode(1604) + String.fromCharCode(1575));
                    break;

            } //end switch
        } //end if special case

        //BEGIN :: Handle Cases of Sepecial character {}[]/,.<>  ::
        if (
                (KeyDownUnicode == 221 && CurrentUnicode == 62 && e.shiftKey) ||
                (KeyDownUnicode == 219 && CurrentUnicode == 60 && e.shiftKey) ||
                (KeyDownUnicode == 68 && CurrentUnicode == 93 && e.shiftKey) ||
                (KeyDownUnicode == 70 && CurrentUnicode == 91 && e.shiftKey) ||
                (KeyDownUnicode == 188 && CurrentUnicode == 44 && e.shiftKey) ||
                (KeyDownUnicode == 190 && CurrentUnicode == 46 && e.shiftKey) ||
                (KeyDownUnicode == 90 && CurrentUnicode == 126 && e.shiftKey) ||
                (KeyDownUnicode == 76 && CurrentUnicode == 47 && e.shiftKey) ||
                (KeyDownUnicode == 67 && CurrentUnicode == 125 && e.shiftKey) ||
                (KeyDownUnicode == 86 && CurrentUnicode == 123 && e.shiftKey) ||
                (KeyDownUnicode == 190 && CurrentUnicode == 62 && e.shiftKey) ||
                (KeyDownUnicode == 192 && CurrentUnicode == 126 && e.shiftKey)
           ) {
            return $(this).SetCharacter(String.fromCharCode(CurrentUnicode));
        }
        //END   :: Handle Cases of Sepecial character {}[]/,.<>  ::


        //BEGIN :: Handle Case Of Special Character ( and ) ::
        if (KeyDownUnicode == 57 && e.shiftKey) {
            return $(this).SetCharacter(String.fromCharCode(41));
        }
        else if (KeyDownUnicode == 48 && e.shiftKey) {
            return $(this).SetCharacter(String.fromCharCode(40));
        }
        //END   :: Handle Case Of Special Character ( and ) ::

        return $(this).FindMatchedUniCode(CurrentUnicode, EnglishUnicode, ArabicUnicode);
    });
    //Attach key down to textbox to detirmine special cases character
    $(this).AttachKeyDown();
}

///	<summary>
///	Attach key down to textbox to detirmine special cases character.
///	</summary>
$.fn.AttachKeyDown = function () {
    $(this).keydown(function (e) {
        isSpecialCase = false;
        KeyDownUnicode = e.keyCode ? e.keyCode : e.charCode;
        if ((KeyDownUnicode == 84 && e.shiftKey) || (KeyDownUnicode == 71 && e.shiftKey) || KeyDownUnicode == 66)//Arabic Two Characters.
        {
            isSpecialCase = true;
        }
    });
}
///	<summary>
///	Get matched unicode from array.
///	</summary>
$.fn.FindMatchedUniCode = function (SearchItem, SourceArray, LookUpArray) {
    if ($.inArray(SearchItem, SourceArray) != -1) {//Is Exist in array
        var FoundItem = LookUpArray[$.inArray(SearchItem, SourceArray)];
        if (FoundItem != null) {
            return $(this).SetCharacter(String.fromCharCode(FoundItem));
        }
    }
    return true; //to handle case of backspace FF
}

///	<summary>
///Set character into selection:
///	</summary>
$.fn.SetCharacter = function (CharacterValue) {
    //Set Character Value:
    if (document.selection) {//IE
        var oRange = document.selection.createRange();
        oRange.text = CharacterValue;
        //Move Selection:
        oRange.collapse(false);
        oRange.select();
    }

    else if (this.selectionStart || this.selectionStart == "0") {// Chrome + FF
        var start = this.selectionStart;
        var end = this.selectionEnd;

        $(this).val($(this).val().substring(0, start) + CharacterValue + $(this).val().substring(end, $(this).val().length));
        this.selectionStart = start + 1;
        this.selectionEnd = start + 1;
    }
    else {
        $(this).val($(this).val() + CharacterValue);
    }

    return false;
}