/* ---------------------------------------------------------------------------------------------------*/
/* File Name        : EditableDate.js  														          */
/* Created By       : Ahmad Alomari + Mohmmad younis										          */
/* Creation Date    : 20/05/2008    							              `				          */
/* Comment   	    : to Edit Date In Text Box as any format and js correct it to the standard format */
/* ---------------------------------------------------------------------------------------------------*/      

        function FormatEnteredDate(tbControlID,dd,Mon,yyyy) 
        { 	
	        myDate = new Date ;	
	       
			/****Check Day****/
			if((dd == "") || (dd == "0") || (dd == "00"))
	        {
	            dd = myDate.getDate();
	        }
	         if((dd > 31) || (dd <= 0))
            {
                dd = myDate.getDate();	
            }
	        if(isNaN(dd))
	        {
	            dd = myDate.getDate();
	        }
	        if(dd.toString().length == 1 )
	        {
	            dd = "0" + dd;
	        }
           
	        /********************/
	        /****Check Month****/
	        if((Mon == "") || (Mon == "0") || (Mon == "00"))
	        {
	            Mon = myDate.getMonth()  + 1;
	        }
	        if(isNaN(Mon))
	        {
	            Mon = myDate.getMonth()  + 1;
	        }
	        if(Mon > 12)
	        {
	            Mon = myDate.getMonth()  + 1;
	        }
	        if(Mon.toString().length == 1 )
	        {
	            Mon = "0" + Mon;
	        }	
	        /*******************/
	        /****Check Year****/
	        if((yyyy == "") || (yyyy == "0") || (yyyy == "00") || (yyyy > "2200"))
	        {
	            yyyy = myDate.getFullYear();
	        }
	        if(isNaN(yyyy))
	        {
	            yyyy = myDate.getFullYear();	
	        }
	        if(yyyy.toString().length < 4 )
	        {
	            switch(yyyy.toString().length)
	            {
	                case 0 :
	                    yyyy = myDate.getFullYear();	
	                    break;
	                case 1 :
	                    yyyy = "200" + yyyy;	
	                    break;
	                case 2 :
	                    yyyy = "20" + yyyy;	
	                     break;
	                case 3 :
	                    yyyy = "2" + yyyy;	
	                     break;
	            }
	        }	
	        /********************/
	       CheckDaysInMonth(tbControlID,dd,Mon,yyyy);
        }
               
        function CheckDaysInMonth(tbControlID,dd,Mon,yyyy)
        {
            myDate = new Date ;	
            var Mons = Mon.toString();
            switch(Mons)
            {
                case "01": case "03": case "05": case "07": case "08": case "10": case "12":
                    if((dd > 31) || (dd <= 0))
                        dd = myDate.getDate();
                        
                    break;
                   
               case "04": case "06": case "09": case "11": 
                    if((dd > 30) || (dd <= 0))
                        dd = myDate.getDate();
                    
                    break; 
                      
               case "02":
                    // is it a leap year
		            if( yyyy%4==0 && ( (yyyy%100!=0) || (yyyy%400==0) ) )
		            {
			          if((dd > 29) || (dd <= 0))
                        dd = myDate.getDate();
			        }
		            else 
		            {
			           if((dd > 28) || (dd <= 0))
                        dd = myDate.getDate();
			        } 
                    break;                              
            }
            
            document.getElementById(tbControlID).value = dd + "/" + Mons + "/" + yyyy;
        }
        
        function returnDate(tbControlID)
        {
            var DateValue = document.getElementById(tbControlID).value;
            var dd,Mon,yyyy;
            myDate = new Date ;
            	
            if(DateValue.indexOf('*') > 0)
            {
				DateValue   = replaceAll(DateValue,'*','/');
            }
            if(DateValue.indexOf('.') > 0)
            {
				DateValue   = replaceAll(DateValue,'.','/');
            }
            if(DateValue.indexOf('-') > 0)
            {
				DateValue   = replaceAll(DateValue,'-','/');
            }
            if(DateValue.indexOf('\\') > 0)
            {
				DateValue   = replaceAll(DateValue,'\\','/');
            }
            
            switch (DateValue.split('/').length)
            {
				 case 1 :
					if(DateValue.indexOf('/') != -1)//index of return character position else if not exist retrn -1
					{
						dd   = DateValue.split('/')[0];
						Mon  = myDate.getMonth()  + 1;
						yyyy = myDate.getFullYear();
						FormatEnteredDate(tbControlID,dd,Mon,yyyy);					
					}
					else
					{
						switch(DateValue.length)
						{
							case 1: 
								dd   = DateValue.substr(0,1);
								Mon  = myDate.getMonth()  + 1;
								yyyy = myDate.getFullYear();
								break;
								
							case 2: 
								dd   = DateValue.substr(0,2);
								Mon  = myDate.getMonth()  + 1;
								yyyy = myDate.getFullYear();
								break;
								
							case 3: 
								dd   = DateValue.substr(0,2);
								Mon  = DateValue.substr(2,2);
								yyyy = myDate.getFullYear();
								break;
								
							case 4: 
								dd   = DateValue.substr(0,2);
								Mon  = DateValue.substr(2,2);
								yyyy = myDate.getFullYear();
								break;
															
							case 5: 
								dd   = DateValue.substr(0,2);
								Mon  = DateValue.substr(2,2);
								yyyy = DateValue.substr(4,1);
								break;
								
							case 6: 
								//Special Case for data entry that enter date like 112001 -means-> 01/01/2001
								dd   = '0' + DateValue.substr(0,1);
								Mon  = '0' + DateValue.substr(1,1);
								yyyy = DateValue.substr(2,4);
								break;
								
							case 7: 
								dd   = DateValue.substr(0,2);
								Mon  = DateValue.substr(2,2);
								yyyy = DateValue.substr(4,3);
								break;
							
							case 8:
								dd   = DateValue.substr(0,2);
								Mon  = DateValue.substr(2,2);
								yyyy = DateValue.substr(4,4);
								break;
							
							default:
								dd   = DateValue.substr(0,2);
								Mon  = DateValue.substr(2,2);
								yyyy = DateValue.substr(4,4);
								break;	
						}
						FormatEnteredDate(tbControlID,dd,Mon,yyyy);	
					}
					return false;

                 case 2 :
                    dd   = DateValue.split('/')[0];
                    Mon  = DateValue.split('/')[1];
                    yyyy = myDate.getFullYear();
                    FormatEnteredDate(tbControlID,dd,Mon,yyyy);
                    return false; 
                    
                case 3 :
                    dd   = DateValue.split('/')[0];
                    Mon  = DateValue.split('/')[1];
                    yyyy = DateValue.split('/')[2];
                    FormatEnteredDate(tbControlID,dd,Mon,yyyy);
                    return false; 
            }
        }
        
        function GetDateFormated(e,tbControlID)
        {           
            var code = (e.keyCode ? e.keyCode : e.which);
            if(code == 13)
            {                 
                returnDate(tbControlID);
            }
            else
            {
                return false;
            }           
           
        }
        
        function GridGetDateFormated(tbControlID)
        {           
            var code = (event.keyCode ? event.keyCode : event.which);
            if(code == 13)
            {                 
                returnDate(tbControlID);
            }
            else
            {
                return false;
            }           
           
        }
        
        function ResetEnter()
        {
            /*var code = (event.keyCode ? event.keyCode : event.which);
            if(code == 13)
            {
                return false; 
            }*/
        }
        
        function replaceAll(str, from, to)
		{
			for (p = 0; p < str.length; p++)
			{ 
				var idx = str.indexOf(from);
				while ( idx > -1 )
				{
					str = str.replace(from, to); 
					idx = str.indexOf(from);
				}
			}
			 return str;
		}