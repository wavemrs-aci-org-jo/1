/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%/
%Auther           : Firas Tahabsem [ FTAHABSEM] EduWave - Team]
%Comments         : Validates the text area max size for a single or multiple text boxes on the same page.                                                              
%Modified         : By Rkhalaf @12042012 - To fix last character bug when the user try to do the operation and write in text area
                    at the same time.
                    Modified contain (add new function "CheckLastCharacter").
How To Use:
1.Call the the method: ValidateMaxSize.AttachEvents(_TextAreaID,_lblCharCountID,maxSize)                         
   
2.If you have multiple text boxes then you should call this method on the aspx page using javascript function
to attache the textboxes.
/*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*/

var oArrTextBoxesIDS;
var oArrCounterLabelsIDs;
var oArrMaxSizesValues;

var ValidateMaxSize =
{
    //Returns the id of the label or the max size based on the index of the text box id
    ReturnIDByIndex: function (textAreaID, oArrValues) {
        for (nIndex = 0; nIndex < oArrTextBoxesIDS.length; nIndex++) {
            if (oArrTextBoxesIDS[nIndex] == textAreaID) {
                return oArrValues[nIndex];
            }
        }
    },
    AttachEvents: function (_TextAreaID, _lblCharCountID, maxSize) {
      
        var TextMaxSize = parseInt(maxSize);
        var TextAreaID = _TextAreaID
        var lblCharCountID = _lblCharCountID;

        //Saving each text box ID, char counter label ID, and max sizes
        if (typeof oArrTextBoxesIDS == 'undefined') {
            oArrTextBoxesIDS = new Array();
        }
        if (typeof oArrCounterLabelsIDs == 'undefined') {
            oArrCounterLabelsIDs = new Array();
        }
        if (typeof oArrMaxSizesValues == 'undefined') {
            oArrMaxSizesValues = new Array();
        }

        var objTextArea = document.getElementById(TextAreaID);
        if (objTextArea != null) {
            //-------------------------------------------------
            oArrTextBoxesIDS.push(TextAreaID);
            oArrCounterLabelsIDs.push(lblCharCountID);
            oArrMaxSizesValues.push(maxSize);
            //-------------------------------------------------

            objTextArea.onkeydown = function (e) {
                return ValidateMaxSize.LimitTextSize(e);
            }
            objTextArea.onpaste = function (e) {
                return ValidateMaxSize.LimitTextSize(e);
            }
            objTextArea.ondrop = function (e) {
                return ValidateMaxSize.LimitTextSize(e);
            }
            objTextArea.onkeyup = function (e) {
                return ValidateMaxSize.LimitTextSize(e);
            }
            objTextArea.onmouseout = function (e) {
                return ValidateMaxSize.LimitTextSize(e);
            }
            objTextArea.onmouseover = function (e) //Fix for F.F on drop event :: Browser Bug
            {
                return ValidateMaxSize.LimitTextSize(e);
            }
        }
    },
    LimitTextSize: function (eve) {
        //*--------- Fetching the TextBox ID, Label ID, and MaxSize value----
        //The ID of the text box is returned from the event, then the ID is used
        // to return the index of the array so we can fetch the char count label ID and max size
        // for the that Text Box
        var objTextArea;
        var TextMaxSize;
        var lblCharCountID;

        if (typeof eve == 'undefined') {
            eve = window.event;
        }
        if (eve.srcElement != undefined) //IE
        {
            if (eve.srcElement.id == '') {
                return false;
            }
            objTextArea = document.getElementById(eve.srcElement.id);
        }
        else if (eve.currentTarget != undefined)//FF
        {
            if (eve.currentTarget.id == '') {
                return false;
            }
            objTextArea = document.getElementById(eve.currentTarget.id);
        }

        if (objTextArea.value == undefined || objTextArea.value == null) {
            return false;
        }

        TextMaxSize = ValidateMaxSize.ReturnIDByIndex(objTextArea.id, oArrMaxSizesValues);
        lblCharCountID = ValidateMaxSize.ReturnIDByIndex(objTextArea.id, oArrCounterLabelsIDs);
        //------------------------------------------------------

        if (typeof TextMaxSize == 'undefined' || lblCharCountID == 'undefined') {
            return false;
        }
        var nCharCount = parseInt(objTextArea.value.length);
        var objSpanCount = document.getElementById(lblCharCountID);
        objTextArea.style.textoverflow = 'clip';
        //Used to slice last character
        if (nCharCount >= (TextMaxSize - 1)) {
            ValidateMaxSize.CheckLastCharacter(objTextArea, TextMaxSize);
        }
        if (nCharCount >= TextMaxSize) {
            if (objTextArea.getAttribute('MaxSize') == null) {
                ValidateMaxSize.SliceExtraChars(objTextArea, objSpanCount, TextMaxSize);
            }
            else if (eve.type == "paste" || eve.type == "drop") {
                if (typeof eve.preventDefault != "undefined") {
                    eve.preventDefault();
                }
                else {
                    eve.returnValue = false;
                }
            }
            else if (eve.type == "mouseover" && nCharCount > TextMaxSize)//Fix for F.F on drop event :: Browser Bug
            {
                ValidateMaxSize.SliceExtraChars(objTextArea, objSpanCount, TextMaxSize);
            }
            else if (eve.keyCode != 35 && eve.keyCode != 8 && eve.keyCode != 46 && eve.keyCode != 37 && eve.keyCode != 38 && eve.keyCode != 39 && eve.keyCode != 40 && eve.keyCode != 36) {
                //disable all keys except for the backspace, delete, and the 4 arrows, home and end
                return ValidateMaxSize.enableEdit(objTextArea.id);
            }
        }
        else {
            objTextArea.removeAttribute('MaxSize');
            objSpanCount.innerHTML = objTextArea.value.length;
            return true;
        }
    },
    enableEdit: function (TextAreaID)//If the user is high-lighting the text to edit or delete then enable editing otherwise it will keep disabling it.
    {
        var objTextArea = document.getElementById(TextAreaID);
        var selectedText = "";

        if (document.selection) //IE
        {
            selectedText = document.selection.createRange().text;
        }
        else if (typeof objTextArea.selectionStart != 'undefined') {
            selectedText = objTextArea.value.substring(objTextArea.selectionStart, objTextArea.selectionEnd)
        }
        if (selectedText != "") {
            return true;
        }
        else {
            return false;
        }
    },
    SliceExtraChars: function (objTextArea, objSpanCount, TextMaxSize) {
        var sNote = new String();
        sNote = objTextArea.value;
        objTextArea.setAttribute('MaxSize', 'true');
        objTextArea.value = sNote.slice(0, TextMaxSize);
        objSpanCount.innerHTML = objTextArea.value.length;
        return false;
    },
    CheckLastCharacter: function (field, maxlen) {
        if (field.value.length > maxlen) {
            field.value = field.value.substring(0, maxlen);
        }
    }

}