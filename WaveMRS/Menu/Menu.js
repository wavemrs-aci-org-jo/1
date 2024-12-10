function __OpenMenuChilds(sTdID, nLevelNo) {
    var Flag = false;
    var ParentTd = sTdID.substr(0, sTdID.indexOf("_child"));
    __CloseMenuChilds(sTdID, nLevelNo);
    if (document.getElementById(sTdID).style.display == 'none') {
        if (nLevelNo == 0) {
            document.getElementById(sLevel1TdID).value = sTdID;
            document.getElementById(ParentTd).className = "MenuLevel1Up";
        }
        else if (nLevelNo == 1) {
            document.getElementById(sLevel2TdID).value = sTdID;
            document.getElementById(ParentTd).className = "MenuLevel2Up";
        }
        Flag = true;
    }
    else if (document.getElementById(sTdID).style.display == '') {
        if (nLevelNo == 0) {
            document.getElementById(sLevel1TdID).value = '';
            document.getElementById(ParentTd).className = "MenuLevel1Down";
        }
        else if (nLevelNo == 1) {
            document.getElementById(sLevel2TdID).value = '';
            document.getElementById(ParentTd).className = "MenuLevel2Down";
        }
        Flag = false;
    }
    if (Flag) {
        document.getElementById(sTdID).style.display = '';
    }
    if (!Flag) {
        document.getElementById(sTdID).style.display = 'none';
    }
}

function __CloseMenuChilds(sTdID, nLevelNo) {
    if (nLevelNo == 0) {
        for (i = 0; i < arrMenuLevel2IDs.length; i++) {
            if (arrMenuLevel2IDs[i] != sTdID) {
                document.getElementById(arrMenuLevel2IDs[i]).style.display = 'none';
                var Level1ParentTd = document.getElementById(arrMenuLevel2IDs[i].substr(0, arrMenuLevel2IDs[i].indexOf("_child")));
                if (Level1ParentTd.className == "MenuLevel1Standard" || Level1ParentTd.className == "ParentOfSelectedLink")
                    Level1ParentTd.className = "MenuLevel1Standard";
                else
                    Level1ParentTd.className = "MenuLevel1Down";
            }
        }
        for (i = 0; i < arrMenuLevel3IDs.length; i++) {
            if (arrMenuLevel3IDs[i] != sTdID) {
                document.getElementById(arrMenuLevel3IDs[i]).style.display = 'none';
                var Level2ParentTd = arrMenuLevel3IDs[i].substr(0, arrMenuLevel3IDs[i].indexOf("_child"));
                document.getElementById(Level2ParentTd).className = "MenuLevel2Down";
            }
        }
        document.getElementById(sLevel1TdID).value = '';
        document.getElementById(sLevel2TdID).value = '';

    }
    else if (nLevelNo == 1) {
        for (i = 0; i < arrMenuLevel3IDs.length; i++) {
            if (arrMenuLevel3IDs[i] != sTdID) {
                document.getElementById(arrMenuLevel3IDs[i]).style.display = 'none';
                var Level2ParentTd = arrMenuLevel3IDs[i].substr(0, arrMenuLevel3IDs[i].indexOf("_child"));
                document.getElementById(Level2ParentTd).className = "MenuLevel2Down";
            }
        }
        document.getElementById(sLevel2TdID).value = '';
    }
}
