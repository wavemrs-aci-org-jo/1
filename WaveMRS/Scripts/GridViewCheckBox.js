//--------------------------------------------------------------------------------------------
// Created By    : Qutyba A. N. Al-Tallaq													  
// Creation time : 11/09/2007                                                                           
// Comment       : Check Boxes selection Validation for the GridView Check Box template column
// -------------------------------------------------------------------------------------------

// look for selected note
function ValidateGridViewCheckBoxSelection(gvFullID, cbItemID, tdToShow, tdToHide, lblErrroLableID, bDoPostBack) {
    gvFullID = gvFullID + "_ctl" ;
	var InitialChkBoxID = 2 ;  //check Box ID will start from _ctl02, _ctl03
	var sIndex = ( (InitialChkBoxID < 10) ? ("0" + InitialChkBoxID) : InitialChkBoxID);	
	var objID = gvFullID + sIndex + '_' + cbItemID;
	var anyChecked = false; 
	
	while(document.getElementById(objID) != null)
	{
		if (document.getElementById(objID).checked == true)
		{
			anyChecked = true ;
			break;
		}
		InitialChkBoxID++;
		sIndex = ( (InitialChkBoxID < 10) ? ("0" + InitialChkBoxID) : InitialChkBoxID);	
	    objID = gvFullID + sIndex + '_' + cbItemID;
	}//while end
	
	if(!anyChecked) // no item(s) were checked 
	{
        if(document.getElementById(lblErrroLableID) != null)
        {
	        document.getElementById(lblErrroLableID).style.display = "block";
	    }
	}
	else
	{
	    if(document.getElementById(lblErrroLableID) != null)
	    {
            document.getElementById(lblErrroLableID).style.display = "none";
        }
        if(tdToHide != null)
        {
            document.getElementById(tdToHide).style.display = "none";
        }
        if(tdToShow != null)
        {
            document.getElementById(tdToShow).style.display = "block";
        }
        if(bDoPostBack == true)
        {
            return true;
        }
	}
	return false;
}

//----------------------------------------------------------------------------------------------------------------
//for AllNotes page
//[Done by Qtallaq @ 12/03/2007]
//This Function Check Or Uncheck All the CheckBoxes According To The Header CheckBox

function CheckAllCheckBoxes(gvFullID,cbHeaderID,cbItemID, lblErrroLableID)
{
	gvFullID =  gvFullID + "_ctl" ;
	var InitialChkBoxID = 2 ;  //check Box ID will start from _ctl02, _ctl03
	var sIndex = ( (InitialChkBoxID < 10) ? ("0" + InitialChkBoxID) : InitialChkBoxID);	
	var bHeaderState = document.getElementById(gvFullID + '01_' + cbHeaderID).checked;
	var objID = gvFullID + sIndex + '_' + cbItemID;
	
	while(document.getElementById(objID) != null)
	{
	    if(!document.getElementById(objID).disabled)
	    {
		    document.getElementById(objID).checked = bHeaderState;
	    }
	    InitialChkBoxID++;
        sIndex = ( (InitialChkBoxID < 10) ? ("0" + InitialChkBoxID) : InitialChkBoxID);	
	    var objID = gvFullID + sIndex + '_' + cbItemID;
	}//while end
	
	if(bHeaderState)
	{
	    if(document.getElementById(lblErrroLableID) != null)
	    {
	        document.getElementById(lblErrroLableID).style.display = "none";
	    }
	}
			
}//end function

//----------------------------------------------------------------------------------------------------------------		
//[Done by Qtallaq @ 12/03/2007]
//This Function Check the Current CheckBox and Check The Others Except the Header CheckBox
//If All checkBoxes Are Checked Then Check The Header
//If At least On Is UnChecked Then Uncheck The Header CheckBox
function CheckThisCheckBox(gvFullID,cbHeaderID,cbItemID, lblErrroLableID)
{
	gvFullID = gvFullID + "_ctl" ;
	var InitialChkBoxID = 2 ;  //check Box ID will start from _ctl02, _ctl03
	var sIndex = ( (InitialChkBoxID < 10) ? ("0" + InitialChkBoxID) : InitialChkBoxID);	
	var bHeaderState = true;
	var objID = gvFullID + sIndex + '_' + cbItemID;

	while(document.getElementById(objID) != null)
	{
		if(document.getElementById(objID).checked == false && !document.getElementById(objID).disabled)
		{
			bHeaderState = false;
			break;
		}
		InitialChkBoxID++;
		sIndex = ( (InitialChkBoxID < 10) ? ("0" + InitialChkBoxID) : InitialChkBoxID);	
	    var objID = gvFullID + sIndex + '_' + cbItemID;
	}//while end
	
	document.getElementById(gvFullID + '01_' + cbHeaderID).checked = bHeaderState;
	if(document.getElementById(lblErrroLableID) != null)
	{
      document.getElementById(lblErrroLableID).style.display = "none";
    }
}//end function

//----------------------------------------------------------------------------------------------------------------		
//[Done by ASAlhi @ 30/10/2007]
//This Function Show the Cell with the CellID (tdToShow)
//and Hide the Cell with Cell ID (tdToHide)
function SwitchView(tdToShow, tdToHide)
{
    document.getElementById(tdToShow).style.display = "block";
    document.getElementById(tdToHide).style.display = "none";
    return false;
}
//[Done By bashar al sukhon @ 2012/01/25]
///Checkbox Header 
function CheckAllCheckBoxesJQ(cbHeader, itemID,gvID,ResultLabelID) {  
    var cblCheckedItems = $('*[id*="' + gvID + '"] input[id*="' + itemID + '"]'); // document.getElementsByName('cbSelectItems');
    //Clear Label Result
    if (ResultLabelID != '') {
        $('*[id*="' + ResultLabelID + '"]').text('');
    }
    $('*[id*="' + gvID + '"] input[id*="cbItem"]').each(function (i) {
        if (!$(this).is(":disabled")) {
            $(this)[0].checked = cbHeader.checked;
        }
    });
}
//[Done By bashar al sukhon @ 2012/01/25]
///CheckBox Items
//Summany //check the checkbox header or not plus clear resultLabel
// itemID       --> checkbox item
// itemHeaderID --> checkbox item header
// gvID         --> Grid view Name
// ResultLabelID--> Result Label
function CheckThisCheckBoxJQ(itemID, itemHeaderID, gvID,ResultLabelID) {    
    //return true or false ===> if all checkbox count equals checked box count
    var nAllCheckBoxes = $('*[id*="' + gvID + '"] input[id*="' + itemID + '"]:checkbox').length;
    nAllCheckBoxes = nAllCheckBoxes - $('*[id*="' + gvID + '"] input[id*="' + itemID + '"]:disabled').length;
    var nAllCheckBoxesChecked = $('*[id*="' + gvID + '"] input[id*="' + itemID + '"]:checked').length;
    ////////////////////////////////
    if (nAllCheckBoxesChecked > 0 && ResultLabelID != '') {
    $('*[id*="' + ResultLabelID + '"]').text('');
    }
    ////////////////////////////////
    $('*[id*="' + gvID + '"] input[id*="' + itemHeaderID + '"]:checkbox')[0].checked = (nAllCheckBoxes == nAllCheckBoxesChecked);
}
//[Done By bashar al sukhon @ 2012/01/25]
///ValidateGridViewCheckBoxSelectionJQ
//Summany //return true or false if select any items or not
//itemID        --> checkbox item
//gvID          --> Grid view Name
//Message       --> Message
//LabelID       --> Result Label
function ValidateGridViewCheckBoxSelectionJQ( gvID,itemID, Message, LabelID) {
    var nAllCheckBoxesChecked = $('*[id*="' + gvID + '"] input[id*="' + itemID + '"]:checked').length;
    if (LabelID != '') {
        $('*[id*="' + LabelID + '"]').text('');
    }
    if (nAllCheckBoxesChecked <= 0) {
        if (LabelID != null) {
            $('*[id*="' + LabelID + '"]')[0].innerHTML = Message;
        }
        return false; 
    }
    return true;
}

function btnValidateGridViewCheckBoxSelectionJQ(Message, LabelID) {
    var nAllCheckBoxesChecked = $('input[type=checkbox]:checked').length;
    if (LabelID != '') {
        if ($('*[id*="' + LabelID + '"]').length > 0) {
            $('*[id*="' + LabelID + '"]').text('');
        }
    }
    if (nAllCheckBoxesChecked <= 0) {
        if (LabelID != null) {
            if ($('*[id*="' + LabelID + '"]').length > 0) {
                $('*[id*="' + LabelID + '"]')[0].innerHTML = Message;
            }
        }
        return false;
    }
    return true;
}

