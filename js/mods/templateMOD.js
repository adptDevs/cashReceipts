/* 

This mod will have the following:

    Cashier Template - - 

*/

var templateMOD = (function(){

// Private variables here
var layout;
var form;
var printForm;
var template;
var numberOfSaleItems;
var popArray = [];
var popArrayTax = [];
var popCash;
var popCK;
var popDEBIT; 
var popAMEX;
var popVISA;
var popDISC;
var popMC;
var popCRT;
var adjArray = {};
var taxItems = 0;
var templateNames = [];
var descriptionNames = {};
var disabledItems = [];
var canBePrinted = false;
var stID;


events.on("openCashReceipt", openCashReceipt ); // * Hey, Listen * -- 'templateMOD.js'
    

// ******************************************************************************************************************************************************************************      

function openCashReceipt(id){

    dhx.ajax.post("/_apps/cashReceipts2/ext/getTemp.php","stationID="+id, function(text){
        
    }).then(function(realdata){
           
       var responseBACK = JSON.parse(realdata);

       stID = id;
           //console.log(responseBACK);

       var saleItems = responseBACK[0]; // ALL THE DATA
            //console.log(saleItems);
            //console.log(saleItems.substring(0, 1098));

        numberOfSaleItems = responseBACK[5];
            taxItems = parseInt(responseBACK[4]);
            _addTaxItems();
            _addPops();
            
            
        var sales = JSON.parse(saleItems);
        console.log(sales);
        var salesList = sales.list;
        console.log(salesList);

        var currentGL = ""; // MAIN GL
        for(var i = 0; i < salesList.length; i++){
            if(salesList[i].name != undefined){
                //descriptionNames.push(salesList[i].name);
                descriptionNames[salesList[i].name] = currentGL;
                if(disabledItems.indexOf(currentGL) == -1){
                    disabledItems.push(currentGL);
                }
            }else{
                currentGL = salesList[i].list[0].name;
                templateNames.push(currentGL);
            }
          }

          console.log(templateNames);
          console.log(descriptionNames);
      
       form.addItem('cashierTempBlock',sales,1,1);
       events.emit("addSalesToPrintForm", sales);

       form.setItemValue("cf", parseFloat(responseBACK[2]));
       form.setItemValue("beginBal", parseFloat(responseBACK[3]));

          for(var i = 0; i < disabledItems.length; i++){
            form.disableItem(disabledItems[i]);
          }

          events.emit("addOSToPrintForm",sales); // BROADCAST -- 'printMOD.js'
 
         });

        }    

// ******************************************************************************************************************************************************************************      
var _addTaxItems = function(){
    
    for(var z = 0; z < taxItems; z++){

        var taxIndex = z + 1;
    
        if(z==0){
    
            var taxDATA = {type:"block", width:900, list:[
                                        {type:"label", offsetLeft:110, label:"Register Tape"},
                                        {type:"input", name: "taxTYPE_"+z, labelWidth:100, inputWidth:100, numberFormat:"0,000.00", value:"0.00", label:"Tax Type "+taxIndex, position:"label-left"}, // Adding Adjustment for every sale item.
                                        {type:"newcolumn"},
                                        {type:"label", label:"Tax Adjustment"},
                                        {type:"input", name: "taxTYPEAdj_"+z, labelWidth:100, inputWidth:100, numberFormat:"0,000.00", value:"0.00"}, // Adding Adjustment for every sale item.
                                        {type:"newcolumn"},
                                        {type:"label", label:"Tax Adj. Total"},
                                        {type:"input", name: "taxAdjustmentTOTAL_"+z, disabled:true, labelWidth:150, inputWidth:100, numberFormat:"0,000.00", value:"0.00"}, // Adjusted total for every sale item
                                        {type:"newcolumn"},
        
                                        {type:"button", offsetTop:30, name: "addTAXADJBTN_"+z, value:"<img src='/dhtmlx/codebase/imgs/add.gif' style='position:absolute;width:18px;height:18px;left:16px;margin-top:2px'> <span style=';margin-left:20px;'>Add Tax Adjustment Details</span>", position:"absolute"}, // Adding Adjustment buttons to each line item.
                                        {type:"newcolumn"},
                                        {type:"label", name: "taxNotice_"+z, hidden: true, label:"<img src='/dhtmlx/codebase/imgs/attention.png' height='25' width='25' style='position:absolute;left:230px;top:30px;'>", offsetTop: 30, offsetLeft: 225}
                                       
                                        ]};

                                    
        }else{
                    

            var taxDATA = {type:"block", width:900, list:[
                                {type:"input", name: "taxTYPE_"+z, labelWidth:100, inputWidth:100, numberFormat:"0,000.00", value:"0.00", label:"Tax Type "+taxIndex, position:"label-left"}, // Adding Adjustment for every sale item.
                                {type:"newcolumn"},
                                {type:"input", name: "taxTYPEAdj_"+z, labelWidth:100, inputWidth:100, numberFormat:"0,000.00", value:"0.00"}, // Adding Adjustment for every sale item.
                                {type:"newcolumn"},
                                {type:"input", name: "taxAdjustmentTOTAL_"+z, disabled:true, labelWidth:150, inputWidth:100, numberFormat:"0,000.00", value:"0.00"}, // Adjusted total for every sale item
                                {type:"newcolumn"},
        
                                {type:"button", name: "addTAXADJBTN_"+z, value:"<img src='/dhtmlx/codebase/imgs/add.gif' style='position:absolute;width:18px;height:18px;left:16px;margin-top:2px'> <span style=';margin-left:20px;'>Add Tax Adjustment Details</span>", position:"absolute"}, // Adding Adjustment buttons to each line item.
                                {type:"newcolumn"},
                                {type:"label", name: "taxNotice_"+z, hidden: true, label:"<img src='/dhtmlx/codebase/imgs/attention.png' height='25' width='25' style='position:absolute;left:230px;'>", offsetTop: -50, offsetLeft: 225}
                           
                           
                           
                            ]};

                        }

       form.addItem("taxTypeBLOCK", taxDATA, 4);

       //events.emit("addTaxToPrintForm", taxDATA);

       popArrayTax.push(new dhtmlXPopup({form: form,id:["addTAXADJBTN_"+z]}));  // * NOTE: 'popArray' is a global varible array to capter all popups *

                    } // END OF TAX LOOP

                    events.emit("addTaxToPrintForm", taxItems);

};

// ******************************************************************************************************************************************************************************      

var _addPops = function(){

// ATTACH POPS TO SALE ITEMS
console.log(numberOfSaleItems);

for(var m=0; m < numberOfSaleItems; m++){

    popArray.push(new dhtmlXPopup({form: form,id:["addADJBTN_"+m]})); 

}

// POP ADJUSTMENT ..........................................................................................................................................................................         
for(var j=0; j < popArray.length; j++){

                  var popData =[{type:"block", list:[

                  {type:"input", labelWidth: 150, inputWidth: 250, name:"lineItemAdjNOTES_"+j, rows:6, label:"Reason For Adjustment:"}
                  ]}];

                  popArray[j].attachForm(popData);

                  popArray[j].hide("addADJBTN_"+j);
                }

// POP ADJUSTMENT TAX ..........................................................................................................................................................................         
for(var t=0; t < popArrayTax.length; t++){

                  var popDataTax =[{type:"block", list:[

                    {type:"input", position:"label-top", inputWidth: 250, name:"taxAdjNOTES_"+t, rows:6, label:"Reason For Tax Adjustment:"}
                    ]}];

                  popArrayTax[t].attachForm(popDataTax);

                  popArrayTax[t].hide("addTAXADJBTN_"+t);
                }

// POP CASH ADJ ............................................................................................................................................................................................
                popCash = new dhtmlXPopup({form: form,id:"adjReasonCash"});
   
                var popDataCash =[{type:"block", list:[

                  {type:"input", position:"label-top", inputWidth: 250, name:"cashNotes", rows:6, label:"Reason For Adjustment:"}
                  ]}];

                popCash.attachForm(popDataCash);

// POP CK ADJ ............................................................................................................................................................................................
                popCK = new dhtmlXPopup({form: form,id:"adjReasonCheck"});
 
                var popDataCk =[{type:"block", list:[

                  {type:"input", position:"label-top", inputWidth: 250, name:"CKNotes", rows:6, label:"Reason For Adjustment:"}
                  ]}];

                popCK.attachForm(popDataCk);

// POP debit ADJ ............................................................................................................................................................................................
                popDEBIT = new dhtmlXPopup({form: form,id:"adjReasonDEBIT"});
                 
                 var popDataDEBIT =[{type:"block", list:[

                    {type:"input", position:"label-top", inputWidth: 250, name:"DEBITNotes", rows:6, label:"Reason For Adjustment:"}
                    ]}];

                popDEBIT.attachForm(popDataDEBIT);

                // DEBIT-UPDATE-12/14/2017

// POP amx ADJ ............................................................................................................................................................................................
                popAMEX = new dhtmlXPopup({form: form,id:"adjReasonAMEX"});
                 
                 var popDataAMEX =[{type:"block", list:[

                    {type:"input", position:"label-top", inputWidth: 250, name:"AMEXNotes", rows:6, label:"Reason For Adjustment:"}
                    ]}];

                popAMEX.attachForm(popDataAMEX);



// POP DISC ADJ ............................................................................................................................................................................................
                popDISC = new dhtmlXPopup({form: form,id:"adjReasonDISC"});
                 
                 var popDataDISC =[{type:"block", list:[

                    {type:"input", position:"label-top", inputWidth: 250, name:"DISCNotes", rows:6, label:"Reason For Adjustment:"}
                    ]}];

                popDISC.attachForm(popDataDISC);

// POP MC ADJ ............................................................................................................................................................................................
                popMC = new dhtmlXPopup({form: form,id:"adjReasonMC"});
                 
                 var popDataMC =[{type:"block", list:[

                    {type:"input", position:"label-top", inputWidth: 250, name:"MCNotes", rows:6, label:"Reason For Adjustment:"}
                    ]}];

                popMC.attachForm(popDataMC);

// POP VISA ADJ ............................................................................................................................................................................................
                popVISA = new dhtmlXPopup({form: form,id:"adjReasonVISA"});
                 
                 var popDataVISA =[{type:"block", list:[

                    {type:"input", position:"label-top", inputWidth: 250, name:"VISANotes", rows:6, label:"Reason For Adjustment:"}
                    ]}];

                popVISA.attachForm(popDataVISA);

// POP CRT ADJ ............................................................................................................................................................................................
                popCRT = new dhtmlXPopup({form: form,id:"adjReasonCRT"});
                 
                 var popDataCRT =[{type:"block", list:[

                    {type:"input", position:"label-top", inputWidth: 250, name:"CRTNotes", rows:6, label:"Reason For Adjustment:"}
                    ]}];

                    popCRT.attachForm(popDataCRT);

}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//_onButtonClick Functions ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var _form_onButtonClick = function(){

    form.attachEvent("onButtonClick", function(name){

        _hideShowCashLog(name);
        _showPopsTax();
        _showPops();
        _backButton(name);
        _printSaveButton(name);

    });
};

// Event for logic for pop up adjustments // ***********************************************************************************************************************************************

_backButton = function(name){

    switch(name){
        
        case 'backBtn': 
            events.emit("setCashierCarousel", "home");
            
            form.removeItem("cashierTempBlock"); 
            var whatever = {type: "block", width: "auto", name:'cashierTempBlock', blockOffset: 20, list:[]};
            form.addItem('blockForBlock', whatever, 4); 
            
            form.removeItem("taxTypeBLOCK"); 
            var whatever2 = {type: "block", width: "auto", name:'taxTypeBLOCK', blockOffset: 0}; 
            form.addItem('blockFortaxTypeBLOCK', whatever2, 1);
            
            form.forEachItem(function (name){     

            form.setItemValue(name, "0");
      
            });

            events.emit("enableGenBtn"); // * Broadcast * - 'cashierHomeMOD.js' - Opens up the Template for that location..

        break;
        }

};
// Print / Save // ***********************************************************************************************************************************************

_printSaveButton = function(name){

    switch(name){
        
        case 'print': 
        if(form.validate()){ // CORRECT!
            canBePrinted = true;
            var station = stID;
            var lineItemVal = []; // array for all line items
            var descItemVal = [];
            var lineItemADJVal = [];
            var taxADJVal = [];
            var paymentADJVal = [];
           

        // For loop for all the names, created a multi dim array
            for(var i=0;i<templateNames.length;i++){
        console.log(form.getItemValue(templateNames[i]));
                lineItemVal.push([templateNames[i], form.getItemValue(templateNames[i])]);

            }

            console.log(descriptionNames);
            // descriptionNames.forEach(function(item, index){
            //     console.log(item);
            //     descItemVal.push([descriptionNames[index], form.getItemValue(descriptionNames[index])]);
            // });

            for(var property in descriptionNames){
                //console.log(descriptionNames[property]);
                // HERE! YA DINGUS
                descItemVal.push([property, form.getItemValue(property), (descriptionNames[property].split("_")[1])]);
            }
            
            var popForm;
            for(var i = 0; i < popArray.length; i++){
                popForm = popArray[i]._nodeObj.getForm();
                lineItemADJVal.push(["lineItemAdjNOTES_"+i, popForm.getItemValue("lineItemAdjNOTES_"+i)]);
            }

            var popTaxForm;
            for(var i = 0; i < popArrayTax.length; i++){
                popTaxForm = popArrayTax[i]._nodeObj.getForm();
                taxADJVal.push(["taxAdjNOTES_"+i, popTaxForm.getItemValue("taxAdjNOTES_"+i)]);
            }

            popCashADJForm = popCash._nodeObj.getForm();
            paymentADJVal.push(["cashNotes", popCashADJForm.getItemValue("cashNotes")]);

            popCKADJForm = popCK._nodeObj.getForm();
            paymentADJVal.push(["CKNotes", popCKADJForm.getItemValue("CKNotes")]);

            popAMEXADJForm = popAMEX._nodeObj.getForm();
            paymentADJVal.push(["AMEXNotes", popAMEXADJForm.getItemValue("AMEXNotes")]);

            popDISCADJForm = popDISC._nodeObj.getForm();
            paymentADJVal.push(["DISCNotes", popDISCADJForm.getItemValue("DISCNotes")]);

            popMCADJForm = popMC._nodeObj.getForm();
            paymentADJVal.push(["MCNotes", popMCADJForm.getItemValue("MCNotes")]);

            popVISAADJForm = popVISA._nodeObj.getForm();
            paymentADJVal.push(["VISANotes", popVISAADJForm.getItemValue("VISANotes")]);

            popCRTAJDForm = popCRT._nodeObj.getForm();
            paymentADJVal.push(["CRTNotes", popCRTAJDForm.getItemValue("CRTNotes")]);

            popDEBITADJForm = popDEBIT._nodeObj.getForm();
            paymentADJVal.push(["DEBITNotes", popDEBITADJForm.getItemValue("DEBITNotes")]); // DEBIT-UPDATE-12/14/2017

            var adjs = {
            "lineItems": lineItemADJVal,
            "taxItems": taxADJVal,
            "payments": paymentADJVal
            };

            var adjList = JSON.stringify(adjs);
            var lineItemString = JSON.stringify(lineItemVal);
            var descItemString = JSON.stringify(descItemVal);

        
            var printData = {
                "form": form,
                "stID": stID,
                "adjList": adjList,
                "lineItemString": lineItemString,
                "descItemString": descItemString,
                "popArray": popArray,
                "popArrayTax": popArrayTax,
                "popCashADJForm": popCash._nodeObj.getForm(),
                "popCKADJForm": popCK._nodeObj.getForm(),
                "popDEBITADJForm": popDEBIT._nodeObj.getForm(),
                "popAMEXADJForm": popAMEX._nodeObj.getForm(),
                "popDISCADJForm": popDISC._nodeObj.getForm(),
                "popMCADJForm": popMC._nodeObj.getForm(),
                "popVISAADJForm": popVISA._nodeObj.getForm(),
                "popCRTAJDForm": popCRT._nodeObj.getForm(),
                "adjArray": adjArray

            };

            console.log(descItemVal);

            dhtmlx.message({id: "crLoadingBox", expire:35000, text: "<img src='/data/gifs/ghosty-success.gif' width='28' height='21'>&nbsp;SAVING DATA...PLEASE WAIT."});
            form.send(cashReceipts2.getPaths("ext")+"saveTempCost_v2.php?station="+stID+"&lineItems="+lineItemString+"&descItems="+descItemString+"&adjList="+adjList, "post", function(r){
                console.log(r.xmlDoc.responseText);
                dhtmlx.alert({
                    type: "alert",
                    text: "Cost Items Are Now Submitted For Review",
                    title: "Success!",
                    ok: "Ok"
                });
                dhtmlx.message.hide("crLoadingBox");

                events.emit("printTheForm", printData);
            });

                
        }else{
            dhtmlx.alert({
                title:"Uh oh!",
                type:"alert-error",
                text:"You have not entered a Buisness Date OR Shift. Please review."
              });

            canBePrinted = false;
        }
        break;

        }

};
// Event for logic for pop up adjustments // ***********************************************************************************************************************************************

_showPops = function(){
    for(var c=0; c < popArray.length; c++){
  
        popArray[c].show("addADJBTN_"+c);
        
    }
  
      popCash.show("adjReasonCash");
      popCK.show("adjReasonCheck");
      popDEBIT.show("adjReasonDEBIT");
      popAMEX.show("adjReasonAMEX");
      popDISC.show("adjReasonDISC");
      popMC.show("adjReasonMC");
      popVISA.show("adjReasonVISA");
      popCRT.show("adjReasonCRT");
  
};

// Event for logic for pop up TAX adjustments // ***********************************************************************************************************************************************

_showPopsTax = function(){
        for(var i=0; i < popArrayTax.length; i++){

         popArrayTax[i].show("addTAXADJBTN_"+i);

    } 
};

// Event for logic on Cash Log SHOW // ***********************************************************************************************************************************************

var _hideShowCashLog = function(name){

    switch(name){
  
        case 'showCashLogBUTTON':

        form.showItem('clFIELDSET');
        form.showItem('hideCashLogBUTTON');
        form.hideItem('showCashLogBUTTON');
  
      break;
  
        case 'hideCashLogBUTTON':

        form.hideItem('clFIELDSET');
        form.showItem('showCashLogBUTTON');
        form.hideItem('hideCashLogBUTTON');
  
      break;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//_onChange Functions /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var _form_onChange = function(){

    form.attachEvent("onChange", function(name,value){
        _calculateCashLog(name);
        _valiDate(name);
        _calculateTotalDailyActivity();
        _calculateTAX(name,value);
        _calculateSaleItems(name);
        _calculateTOTALSaleItemAdj(name);
        _cashAndCheckTotal(name);
        
       // _calculateCash(name);            // CASH
       // _calculateCheck(name);          // CHECK
        _calculateDebit(name);         // DEBIT
        _calculateCRT(name);          // GIFT CERT.
        _calculateVISA(name);        // VISA
        _calculateMC(name);         // MASTER CARD
        _calculateDISC(name);      // DISCOVER
        _calculateAMX(name);      // AMERICAN EXPRESS
    
        _calculateSettlementTapeTotal(name); 
        _calculateRegisterTapeTotal(name);
        _calculateDifferenceTotal(name);
        _calculatePaymentADJTotal(name);
        _calculateSalesADJTotal(name);
        _calculateOSADJTotal(name);
        _calculateADJCreditTotal(name);

        _calculateTOTALSaleItemAdj(name);
        _FINALTOTAL(name);
        _FINALPAYMENTTOTAL(name);

        _adjustmentPOPUPS(name,value);
        _saleItemOSInput(name,value);
        _PAYMENTANDSALEVALIDATION(name,value);

    });

};

//***********************************************************************************************************************************************

var _calculateCashLog = function(name,value){

    if(name == "hundreds"){
        var value100Times = parseFloat(form.getItemValue("hundreds"));
        form.setItemValue("hundredsX", (value100Times * 100).toFixed(2));
        }
        
        
        if(name == "fifties"){
        var value50Times = parseFloat(form.getItemValue("fifties"));
        form.setItemValue("fiftiesX", (value50Times * 50).toFixed(2));
        
        }
        
        if(name == "twenties"){
        var value1Times = parseFloat(form.getItemValue("twenties"));
        form.setItemValue("twentiesX", (value1Times * 20).toFixed(2));
        
        }
        
        if(name == "tens"){
        var value2Times = parseFloat(form.getItemValue("tens"));
        form.setItemValue("tensX", (value2Times * 10).toFixed(2));
        
        }
        
        if(name == "fives"){
        var value22Times = parseFloat(form.getItemValue("fives"));
        form.setItemValue("fivesX", (value22Times * 5).toFixed(2));
        
        }
        
        if(name == "twos"){
        var value3Times = parseFloat(form.getItemValue("twos"));
        form.setItemValue("twosX", (value3Times * 2).toFixed(2));
        
        }
        
        if(name == "ones"){
        var value4Times = parseFloat(form.getItemValue("ones"));
        form.setItemValue("onesX", (value4Times * 1).toFixed(2));
        
        }
        
        // Cash Log > Rolled Coins......................................................................................................................................................
        if(name == "rQuarters"){
        var value5Times = parseFloat(form.getItemValue("rQuarters"));
        form.setItemValue("rQuartersX", (value5Times * 10).toFixed(2));
        
        }
        
        if(name == "rDimes"){
        var value6Times = parseFloat(form.getItemValue("rDimes"));
        form.setItemValue("rDimesX", (value6Times * 5).toFixed(2));
        
        }
        
        if(name == "rNickles"){
        var value7Times = parseFloat(form.getItemValue("rNickles"));
        form.setItemValue("rNicklesX", (value7Times * 2).toFixed(2));
        
        }
        
        if(name == "rPennies"){
        var value8Times = parseFloat(form.getItemValue("rPennies"));
        form.setItemValue("rPenniesX", (value8Times * .5).toFixed(2));
        
        }
        
        // Cash Log > Loose Coins......................................................................................................................................................
        
        if(name == "dollar"){
        var value9Times = parseFloat(form.getItemValue("dollar"));
        form.setItemValue("dollarX", (value9Times * 1).toFixed(2));
        
        }
        
        if(name == "HDollar"){
        var value10Times = parseFloat(form.getItemValue("HDollar"));
        form.setItemValue("HDollarX", (value10Times * .5).toFixed(2));
        
        }
        
        if(name == "Quarters"){
        var value11Times = parseFloat(form.getItemValue("Quarters"));
        form.setItemValue("QuartersX",(value11Times * .25).toFixed(2));
        
        }
        
        if(name == "Dimes"){
        var value12Times = parseFloat(form.getItemValue("Dimes"));
        form.setItemValue("DimesX", (value12Times * .10).toFixed(2));
        
        }
        
        if(name == "Nickles"){
        var value13Times = parseFloat(form.getItemValue("Nickles"));
        form.setItemValue("NicklesX", (value13Times * .05).toFixed(2));
        
        }
        
        if(name == "Pennies"){
        var value14Times = parseFloat(form.getItemValue("Pennies"));
        form.setItemValue("PenniesX", (value14Times * 0.01).toFixed(2));
        
        }
        
        // Cash Log > Total ....................................................................................................................................................................................................
        var hundredaroo = parseFloat(form.getItemValue("hundredsX"));
        var fiftyaroo = parseFloat(form.getItemValue("fiftiesX"));
        var twentyaroo = parseFloat(form.getItemValue("twentiesX"));
        var tenaroo = parseFloat(form.getItemValue("tensX"));
        var fivearoo = parseFloat(form.getItemValue("fivesX"));
        var twoaroo = parseFloat(form.getItemValue("twosX"));
        var onearoo = parseFloat(form.getItemValue("onesX"));
        var rQuartaroo = parseFloat(form.getItemValue("rQuartersX"));
        var rDimearoo = parseFloat(form.getItemValue("rDimesX"));
        var rNicklearoo = parseFloat(form.getItemValue("rNicklesX"));
        var rPenniearoo = parseFloat(form.getItemValue("rPenniesX"));
        var dollararoo = parseFloat(form.getItemValue("dollarX"));
        var hDollararoo = parseFloat(form.getItemValue("HDollarX"));
        var quarteraroo = parseFloat(form.getItemValue("QuartersX"));
        var dimearoo = parseFloat(form.getItemValue("DimesX"));
        var nicklearoo = parseFloat(form.getItemValue("NicklesX"));
        var penniearoo = parseFloat(form.getItemValue("PenniesX"));
        var cfaroo = parseFloat(form.getItemValue("cf"));

        form.setItemValue("cashLogTOTAL", ((hundredaroo)+fiftyaroo+twentyaroo+tenaroo+fivearoo+twoaroo+onearoo+rQuartaroo+rDimearoo+rNicklearoo+rPenniearoo+dollararoo+hDollararoo+quarteraroo+dimearoo+nicklearoo+penniearoo).toFixed(2));


        var cashLogTotalaroo = parseFloat(form.getItemValue("cashLogTOTAL"));

        form.setItemValue("netCashTOTAL", (cashLogTotalaroo - cfaroo).toFixed(2)); 

        form.setItemValue("cashLogTotalMIMIC", parseFloat(form.getItemValue("netCashTOTAL")));

    };

// Date Validation ***********************************************************************************************************************************************

var _valiDate = function(name,value){

    if(name == "effectDate"){

    var userDate = form.getItemValue("effectDate");

    if(userDate != ""){

            var validDate = new Date();

            validDate.setHours(0,0,0,0);
            userDate.setHours(0,0,0,0);

  if(userDate > validDate){

    dhtmlx.confirm({
                  type: "confirm",
                  text: "The date you have selected is NOT the current date.",
                  title: "Reminder!",
                  ok: "Yes, I know."
                });

  }else if(userDate < validDate){

    dhtmlx.alert({
                  type: "alert-warning",
                  text: "The date you have selected is BEFORE the current date.",
                  title: "Alert!",
                  ok: "Ok"
                });
  }
       
    }
}

};

// ***********************************************************************************************************************************************

var _calculateTotalDailyActivity = function(name){

    var returnaroo = parseFloat(form.getItemValue("returnBal"));
    var securityaroo = parseFloat(form.getItemValue("securityDep"));
    var otheraroo = parseFloat(form.getItemValue("otherRegBalAdj"));
    var otheraroo2 = parseFloat(form.getItemValue("otherRegBalAdj2"));
    var OSTotalAdjaroo = parseFloat(form.getItemValue("overShortTotalAdjDailyActivity"));
    var endbalaroo = parseFloat(form.getItemValue("endBal"));
    var beginaroo = parseFloat(form.getItemValue("beginBal"));

    form.setItemValue("dailyTotalActivity", ((endbalaroo-beginaroo)-returnaroo-securityaroo-otheraroo-otheraroo2+parseFloat(form.getItemValue("overShortTotalAdjDailyActivity"))).toFixed(2)); 

};


// ***********************************************************************************************************************************************

var _calculateCash = function(name){

    var casharoo = parseFloat(form.getItemValue("CASH"));
    var cashADJaroo = parseFloat(form.getItemValue("cashADJ"));
    var cashSalesAdjaroo = parseFloat(form.getItemValue("cashSalesADJ"));
    var cashCSaroo = parseFloat(form.getItemValue("cashADJSHORT"));

    form.setItemValue("cashADJTOTAL", ((casharoo)+cashADJaroo+cashSalesAdjaroo+cashCSaroo).toFixed(2));
    form.setItemValue("cashDIFF", (parseFloat(form.getItemValue("cashLogTotalMIMIC")) - casharoo).toFixed(2));


};

// ***********************************************************************************************************************************************

var _calculateCheck = function(name){

    var checkaroo = parseFloat(form.getItemValue("CK"));
    var countSheetaroo = parseFloat(form.getItemValue("countSheetCK"));
    var checkADJaroo = parseFloat(form.getItemValue("ckADJ"));
    var checkCSaroo = parseFloat(form.getItemValue("checkADJSHORT"));
    var checkSalesAdjaroo = parseFloat(form.getItemValue("checkSalesADJ"));

    form.setItemValue("checkADJTOTAL", ((checkaroo)+checkADJaroo+checkCSaroo+checkSalesAdjaroo).toFixed(2));
    form.setItemValue("checkDIFF", (checkaroo - countSheetaroo).toFixed(2));

};

// ***********************************************************************************************************************************************

var _cashAndCheckTotal = function(name){
   
    _calculateCheck();
    _calculateCash();

    var totalCashInDraweraroo = parseFloat(form.getItemValue("totalCashDrawer"));
    var cashAdjTotalaroo = parseFloat(form.getItemValue("cashADJTOTAL"));
    var checkADJTOTALaroo = parseFloat(form.getItemValue("checkADJTOTAL"));

    form.setItemValue("totalCASH",((cashAdjTotalaroo)+checkADJTOTALaroo).toFixed(2));

};

// ***********************************************************************************************************************************************

var _calculateDebit = function(name){

    var debitaroo = parseFloat(form.getItemValue("DEBIT"));
    var debitADJaroo = parseFloat(form.getItemValue("debitADJ"));
    var debitSalesAdjaroo = parseFloat(form.getItemValue("debitSalesADJ"));
    var debitCOSaroo = parseFloat(form.getItemValue("debitSHORTADJ"));
    var debitSetTapearoo = parseFloat(form.getItemValue("debitSettlementTape"));
    
    form.setItemValue("totalDEBIT", ((debitaroo)+debitADJaroo+debitSalesAdjaroo+debitCOSaroo).toFixed(2));
    form.setItemValue("debitDIFF", (debitSetTapearoo - debitaroo).toFixed(2));
};

// ***********************************************************************************************************************************************

var _calculateAMX = function(name){

    var amexaroo = parseFloat(form.getItemValue("AMEX"));
    var amexADJaroo = parseFloat(form.getItemValue("amxADJ"));
    var amexSalesAdjaroo = parseFloat(form.getItemValue("amxSalesADJ"));
    var amexCOSaroo = parseFloat(form.getItemValue("amxSHORTADJ"));
    var amexSetTapearoo = parseFloat(form.getItemValue("amxSettlementTape"));

    form.setItemValue("totalAMX", ((amexaroo)+amexADJaroo+amexSalesAdjaroo+amexCOSaroo).toFixed(2));
    form.setItemValue("amxDIFF", (amexSetTapearoo - amexaroo).toFixed(2));


};

// ***********************************************************************************************************************************************

var _calculateDISC = function(name){

    var discoveraroo = parseFloat(form.getItemValue("DISC"));
    var discoverADJaroo = parseFloat(form.getItemValue("discADJ"));
    var discSalesAdjaroo = parseFloat(form.getItemValue("discSalesADJ"));
    var discoverCSaroo = parseFloat(form.getItemValue("discCASHSHORTADJ"));
    var disSetTapearoo = parseFloat(form.getItemValue("discSettlementTape"));
    
    form.setItemValue("discADJTOTAL", ((discoveraroo)+discoverADJaroo+discSalesAdjaroo+discoverCSaroo).toFixed(2));
    form.setItemValue("discDIFF", (disSetTapearoo - discoveraroo).toFixed(2));

};

// ***********************************************************************************************************************************************

var _calculateMC = function(name){

    var mcaroo = parseFloat(form.getItemValue("MAST"));
    var mcADJaroo = parseFloat(form.getItemValue("masterADJ"));
    var mcSalesAdjaroo = parseFloat(form.getItemValue("masterSALESADJ"));
    var mcCSaroo = parseFloat(form.getItemValue("masterCASHSHORTADJ"));
    var mcSetTapearoo = parseFloat(form.getItemValue("masterSettlementTape"));
    
    form.setItemValue("masterADJTOTAL", ((mcaroo)+mcADJaroo+mcSalesAdjaroo+mcCSaroo).toFixed(2));
    form.setItemValue("mastCDIFF", (mcSetTapearoo - mcaroo).toFixed(2));

};

// ***********************************************************************************************************************************************

var _calculateVISA = function(name){

    var visaaroo = parseFloat(form.getItemValue("VISA"));
    var visaADJaroo = parseFloat(form.getItemValue("visaADJ"));
    var visaSalesAdjaroo = parseFloat(form.getItemValue("visaSalesADJ"));
    var visaCSaroo =  parseFloat(form.getItemValue("visaCASHSHORTADJ"));
    var visaSetTapearoo = parseFloat(form.getItemValue("visaSettlementTape"));
    
    form.setItemValue("visaADJTOTAL", ((visaaroo)+visaADJaroo+visaSalesAdjaroo+visaCSaroo).toFixed(2));
    form.setItemValue("visaDIFF", (visaSetTapearoo - visaaroo).toFixed(2));

};

// ***********************************************************************************************************************************************

var _calculateCRT = function(name){

    var crtaroo = parseFloat(form.getItemValue("UCRT"));
    var crtGIFTaroo = parseFloat(form.getItemValue("GIFTUCRT"));
    var crtADJaroo = parseFloat(form.getItemValue("crtADJ"));
    var crtSalesAdjaroo = parseFloat(form.getItemValue("salesCERTADJ"));
    var crtCSaroo = parseFloat(form.getItemValue("giftCERTcsADJ"));
    
    form.setItemValue("totalADJGIFTCERT", ((crtaroo)+crtADJaroo+crtSalesAdjaroo+crtCSaroo).toFixed(2));
    form.setItemValue("crtDIFF", (crtGIFTaroo - crtaroo).toFixed(2));

};

// ***********************************************************************************************************************************************

var _calculateSettlementTapeTotal = function(name){

    var amexSetTapesaroo = parseFloat(form.getItemValue("amxSettlementTape")); 
    var discSetTapesaroo = parseFloat(form.getItemValue("discSettlementTape"));
    var mcSetTapesaroo = parseFloat(form.getItemValue("masterSettlementTape"));
    var visaSetTapesaroo = parseFloat(form.getItemValue("visaSettlementTape"));
    var debitSetTapearoo = parseFloat(form.getItemValue("debitSettlementTape"));

    form.setItemValue("totalSettlementTape",(amexSetTapesaroo+discSetTapesaroo+mcSetTapesaroo+visaSetTapesaroo+debitSetTapearoo).toFixed(2));

};

// ***********************************************************************************************************************************************

var _calculateRegisterTapeTotal = function(name){

    var amexRegTapesaroo = parseFloat(form.getItemValue("AMEX"));
    var discRegTapesaroo = parseFloat(form.getItemValue("DISC"));
    var mcRegTapesaroo = parseFloat(form.getItemValue("MAST"));
    var visaRegTapesaroo = parseFloat(form.getItemValue("VISA"));
    var debitRegTapesaroo = parseFloat(form.getItemValue("DEBIT")); 

    form.setItemValue("totalRegTape", (amexRegTapesaroo+discRegTapesaroo+mcRegTapesaroo+visaRegTapesaroo+debitRegTapesaroo).toFixed(2));
};

// ***********************************************************************************************************************************************

var _calculateDifferenceTotal = function(name){

    var amexDIFFaroo = parseFloat(form.getItemValue("amxDIFF"));
    var discDIFFaroo = parseFloat(form.getItemValue("discDIFF"));
    var mcDIFFaroo = parseFloat(form.getItemValue("mastCDIFF"));
    var visaDIFFaroo = parseFloat(form.getItemValue("visaDIFF"));
    var debitDiFFaroo = parseFloat(form.getItemValue("debitDIFF"));

    form.setItemValue("totalDIFF", (amexDIFFaroo+discDIFFaroo+mcDIFFaroo+visaDIFFaroo+debitDiFFaroo).toFixed(2));
};

// ***********************************************************************************************************************************************

var _calculatePaymentADJTotal = function(name){

    var amexADJaroo = parseFloat(form.getItemValue("amxADJ"));
    var discoverADJaroo = parseFloat(form.getItemValue("discADJ"));
    var mcADJaroo = parseFloat(form.getItemValue("masterADJ"));
    var visaADJaroo = parseFloat(form.getItemValue("visaADJ"));
    var debitADJaroo = parseFloat(form.getItemValue("debitADJ"));

    form.setItemValue("totalPayAdj", (amexADJaroo+discoverADJaroo+mcADJaroo+visaADJaroo+debitADJaroo).toFixed(2));
};

// ***********************************************************************************************************************************************

var _calculateSalesADJTotal = function(name){

    var amexSalesaroo = parseFloat(form.getItemValue("amxSalesADJ"));
    var discSalesaroo = parseFloat(form.getItemValue("discSalesADJ"));
    var mcSalesaroo = parseFloat(form.getItemValue("masterSALESADJ"));
    var visaSalesaroo = parseFloat(form.getItemValue("visaSalesADJ"));
    var debitSalesaroo = parseFloat(form.getItemValue("debitSalesADJ")); 
    
    form.setItemValue("totalSalesAdj", (amexSalesaroo+discSalesaroo+mcSalesaroo+visaSalesaroo+debitSalesaroo).toFixed(2));

};

// ***********************************************************************************************************************************************

var _calculateOSADJTotal = function(name){

    var cashOSaroo = parseFloat(form.getItemValue("cashADJSHORT"));
    var checkOSaroo = parseFloat(form.getItemValue("checkADJSHORT"));
    var debitOSaroo = parseFloat(form.getItemValue("debitSHORTADJ")); // DEBIT-UPDATE-12/14/2017
    var amexOSaroo = parseFloat(form.getItemValue("amxSHORTADJ"));
    var discOSaroo = parseFloat(form.getItemValue("discCASHSHORTADJ"));
    var mcOSaroo = parseFloat(form.getItemValue("masterCASHSHORTADJ"));
    var visaOSaroo = parseFloat(form.getItemValue("visaCASHSHORTADJ"));
    var crtOSaroo = parseFloat(form.getItemValue("giftCERTcsADJ"));
    
    form.setItemValue("overShortTotal", ((cashOSaroo)+checkOSaroo+debitOSaroo+amexOSaroo+discOSaroo+mcOSaroo+visaOSaroo+crtOSaroo).toFixed(2));
    form.setItemValue("finalSaleAdj", (parseFloat(form.getItemValue("overShortTotal"))+parseFloat(form.getItemValue("finalSale"))+parseFloat(form.getItemValue("totalSales"))).toFixed(2));
    form.setItemValue("totalOSAdj", (amexOSaroo+discOSaroo+mcOSaroo+visaOSaroo+debitOSaroo).toFixed(2)); 
    form.setItemValue("overShortTotalAdjDailyActivity", ((cashOSaroo)+checkOSaroo+debitOSaroo+amexOSaroo+discOSaroo+mcOSaroo+visaOSaroo+crtOSaroo).toFixed(2));
    
    _calculateTotalDailyActivity();

};

// ***********************************************************************************************************************************************

var _calculateADJCreditTotal = function(name){

    amexTotalaroo = parseFloat(form.getItemValue("totalAMX"));
    disTotalaroo = parseFloat(form.getItemValue("discADJTOTAL"));
    mcTotalaroo =  parseFloat(form.getItemValue("masterADJTOTAL"));
    visaTotalaroo = parseFloat(form.getItemValue("visaADJTOTAL"));
    debitTotalaroo = parseFloat(form.getItemValue("totalDEBIT")); 

    form.setItemValue("totalCREDIT", (amexTotalaroo+disTotalaroo+mcTotalaroo+visaTotalaroo+debitTotalaroo).toFixed(2));

};

// ***********************************************************************************************************************************************
var _calculateSaleItems = function(name,value){
    var adjustmentTOTAL = 0.00;
    var adjustedTotalTOTAL = 0.00;
    var taxExemptTOTAL = 0.00;

if(name.match(/SaleItemAdjustment_*/) || templateNames.indexOf(name) != -1 || name.match(/taxItemExempt_*/)){
    _addSales();
    
}else if(descriptionNames.hasOwnProperty(name) == true){
    
    var currentGL = descriptionNames[name];
    //form.getItemValue("SaleItemAdjustmentTOTAL_"+currentGL);

    var newValue = parseFloat(form.getItemValue(currentGL)) + parseFloat(form.getItemValue(name));
    form.setItemValue(currentGL, newValue);
    
    _addSales();
    
}


/**
 * array:
 *      [0] => "Vending"
 *      [1] => "Admission Fees"
 * 
 * array.indexOf("Admission Fees") -> 1
 * array.indexOf("Vending") -> 0
 * array.indexOf("Is Aaron cool?") -> -1
 * 
 * assocArray:
 *      ["TEST 3"] => "Admission Fees"
 *      ["TEST 1"] => "Admission Fees"
 *      ["TEST 2"] => "Admission Fees"
 * 
 * assocArray.hasOwnProperty("TEST 3") -> true
 * 
 * 
 * myObj = {
 *      firstName: "Mean"
 *      lastName: "G"
 * }
 * 
 * myObj.hasOwnProperty("firsName") -> true
 * myObj.hasOwnProperty("midName") -> false
 */


    
//if(templateNames.indexOf(name)!= -1){

// var totalItems = 0;

// for(var i = 0; i < templateNames.length; i++){
// totalItems = parseFloat(form.getItemValue(templateNames[i]))+totalItems;
// }

// form.setItemValue("totalSales", (totalItems).toFixed(2)); // TOTAL SALES -- REGISTER TAPE TOTALS

//}

}

var _addSales = function(){
    var adjustmentTOTAL = 0.00;
    var adjustedTotalTOTAL = 0.00;
    var taxExemptTOTAL = 0.00;

    // Loop through each line item and do the following:
    for(var i = 0; i < templateNames.length; i++){ 
        //console.log(templateNames[i]);
        // 1.) Calculate the "Adjusted Total" for each line item
        form.setItemValue("SaleItemAdjustmentTOTAL_"+templateNames[i], parseFloat(form.getItemValue(templateNames[i])) + parseFloat(form.getItemValue("SaleItemAdjustment_"+templateNames[i])));

        // 2.) Calculate the total adjustments of each line item
        adjustmentTOTAL = adjustmentTOTAL + parseFloat(form.getItemValue("SaleItemAdjustment_"+templateNames[i]));
        console.log(adjustmentTOTAL);    
        // 3.) Calculate the adjusted total total (hehe) of ech line item (I know....confusing....)
        adjustedTotalTOTAL = adjustedTotalTOTAL + parseFloat(form.getItemValue("SaleItemAdjustmentTOTAL_"+templateNames[i]));

        // 4.) Calculate the tax Exempt total
        taxExemptTOTAL = taxExemptTOTAL + parseFloat(form.getItemValue("taxItemExempt_"+templateNames[i]));
    }

    form.setItemValue("finalSale", parseFloat(adjustmentTOTAL));              // ADJUSTMENT TOTALS
    form.setItemValue("finalSaleAdj", parseFloat(adjustedTotalTOTAL));       // ADJUSTMENT TOTAL TOTALS!!
    form.setItemValue("taxExempt", parseFloat(taxExemptTOTAL));             // TAX EXEMPT TOTALS

    var totalItems = 0;

    for(var i = 0; i < templateNames.length; i++){
    totalItems = parseFloat(form.getItemValue(templateNames[i]))+totalItems;
    }

    form.setItemValue("totalSales", (totalItems).toFixed(2)); // TOTAL SALES -- REGISTER TAPE TOTALS
};
// ***********************************************************************************************************************************************

var _calculateTOTALSaleItemAdj = function(name){

    var finalSalearoo = parseFloat(form.getItemValue("finalSale"));
    var taxAdjAdjDIFFaroo = parseFloat(form.getItemValue("taxAdjAdj"));
    form.setItemValue("adjustmentsSalesTOTAL", (finalSalearoo+taxAdjAdjDIFFaroo).toFixed(2));
    
    };


// ***********************************************************************************************************************************************
var _calculateTAX = function(name,value){
    
if(name.match(/taxTYPEAdj_*/) || name.match(/taxTYPE_*/)){ 

    var taxAdjTOTAL = 0.00;
    var taxAdjTOTALTOTAL = 0.00;

    
 for(var i = 0; i < taxItems; i++){ 

        form.setItemValue("taxAdjustmentTOTAL_"+i, parseFloat(form.getItemValue("taxTYPE_"+i)) + parseFloat(form.getItemValue("taxTYPEAdj_"+i)));
    
        taxAdjTOTAL = taxAdjTOTAL + parseFloat(form.getItemValue("taxTYPEAdj_"+i));
        taxAdjTOTALTOTAL = taxAdjTOTALTOTAL + parseFloat(form.getItemValue("taxAdjustmentTOTAL_"+i));
        
    
    }
  
        form.setItemValue("taxAdjAdj", parseFloat(taxAdjTOTAL));                            // Tax Adjustment Totals
        form.setItemValue("taxAdjTotalTotal", parseFloat(taxAdjTOTALTOTAL).toFixed(2));    // Overall Tax Totals
  
        if(name.match(/taxTYPEAdj_*/)){

            var taxNames = name.split("_");
            var taxIndex = parseInt(taxNames[1]);

        if(value > 0){

            form.showItem("taxNotice_"+taxIndex);
            adjArray["taxAdj_"+taxIndex+"_hasNotes"] = false; 

        }else{

            form.hideItem("taxNotice_"+taxIndex);
            delete adjArray["taxAdj_"+taxIndex+"_hasNotes"];

        }
        }
    
  }

  if(name.match()!= -1){

    var taxRegTapearoo = 0;
    
    for(var z = 0; z < taxItems; z++){

    taxRegTapearoo = parseFloat(form.getItemValue("taxTYPE_"+z))+taxRegTapearoo;
    
    }
    
    
    form.setItemValue("regTapeTaxTOTAL",(taxRegTapearoo).toFixed(2));
    }

};

// ***********************************************************************************************************************************************

var _FINALTOTAL = function(name){

    var salesFinal = parseFloat(form.getItemValue("finalSaleAdj")); // TOTAL ADJUSTMENT TOTAL
    var salesRegister = parseFloat(form.getItemValue("totalSales"));
    var taxFinal = parseFloat(form.getItemValue("taxAdjTotalTotal"));
    var taxRegister = parseFloat(form.getItemValue("regTapeTaxTOTAL"));
    
    var finalTotal = salesFinal;
    form.setItemValue("adjFINALTOTAL", (finalTotal+taxFinal).toFixed(2)); // ADJUSTED SALES + TAXES
    form.setItemValue("adjSalesTaxesTOTAL",(salesRegister+taxRegister).toFixed(2));  // TOTAL SALES + TOTAL TAXES
        
        var totalSalesTaxes = parseFloat(form.getItemValue("adjSalesTaxesTOTAL")); // TOTAL SALES + TOTAL TAXES
        var dailyTotalActivity = parseFloat(form.getItemValue("dailyTotalActivity"));
        
    var absTOTAL = ((finalTotal + taxFinal).toFixed(2)); // The absolute final total of sales & tax, including adjustments.
    
    // ALERTS > ERROR > TAXES IS GREATER THAN DAILY ACTIVITY ............................................................................
    
    if(absTOTAL > dailyTotalActivity){

       dhtmlx.message.hide("detailSuccess");
            
        dhtmlx.message({
    
          id: "detailError",
          text: "Total Sales + Taxes <b>EXCEEDS</b> your Daily Activity. Please review.",
          expire: -1,
          type: "error"
    
        });
    
        form.disableItem("print");
        form.disableItem("savePRICESBtn");
    
        }
    
    else if(absTOTAL == dailyTotalActivity && dailyTotalActivity != 0){
    
          dhtmlx.message.hide("detailError");
    
          dhtmlx.message({
    
            id: "detailSuccess",
            expire: -1,
            text: "<p style= 'color: #00cc66;'><b>Your Total Sales + Taxes MATCH your Daily Activity!</b></p>",
            type: "messageSuccess"
          
          });
    
          form.disableItem("print");
          form.disableItem("savePRICESBtn");
    
        }
    
    else if(absTOTAL < dailyTotalActivity){
    
          dhtmlx.message.hide("detailSuccess");
    
          dhtmlx.message({
    
            id: "detailError",
            text: "<p style = 'color: white;'>Your Total Sales + Total taxes DO NOT MATCH your daily activity!</p>",
            expire: -1,
            type: "error"
    
          });
    
    
          form.disableItem("print");
          form.disableItem("savePRICESBtn");
    
    }

    // Final Payment  
    var cashTotalaroo = parseFloat(form.getItemValue("totalCASH"));
    var totalCredaroo = parseFloat(form.getItemValue("totalCREDIT"));
    var crtTotalaroo = parseFloat(form.getItemValue("totalADJGIFTCERT"));

    form.setItemValue("totalCHARGE", (cashTotalaroo+totalCredaroo+crtTotalaroo).toFixed(2));    
    var totalPayment = form.getItemValue("totalCHARGE");
    console.log(totalPayment);

    // Final Payment alert validation
    if(totalPayment != 0 && totalPayment != absTOTAL){
      dhtmlx.message.hide("detailSuccess");
      dhtmlx.message({
        id: "detailError",
        text: "<p style = 'color: white;'>Your total payments DO NOT match your total Sales + Taxes!</p>",
        expire: -1,
        type: "error"
      });
      form.disableItem("print");
      form.disableItem("savePRICESBtn");

    }else if(totalPayment == absTOTAL && totalPayment == dailyTotalActivity && totalPayment != 0){
      dhtmlx.message.hide("detailError");
      dhtmlx.message({
        id: "detailSuccess",
        expire: -1,
        text: "<p style = 'color: #00cc66;'><b>Your Total Sales + Taxes AND your total Payments MATCH!</b></p>",
        type: "messageSuccess"
      });
      form.enableItem("print");
     

      form.enableItem("savePRICESBtn");
    }
    
    };

// ***************************************************************************************************************************************************************
var _FINALPAYMENTTOTAL = function(name){




    };

// ***************************************************************************************************************************************************************
var _adjustmentPOPUPS = function(name,value){

    if(name == "cashADJ" || name == "cashSalesADJ" || name == "cashADJSHORT"){

        if(value != "0.00" && value != "0" && value != ""){
 
         form.showItem("adjReasonCash");
         adjArray["cashADJ_hasNotes"] = false;
 
 
 
        }else{
 
            form.hideItem("adjReasonCash");
         delete adjArray["cashADJ_hasNotes"];
 
        }
 
     }
 
 if(name == "ckADJ" || name == "checkSalesADJ" || name == "checkADJSHORT"){
 
       if(value != "0.00" && value != "0" && value != ""){
 
        form.showItem("adjReasonCheck");
       adjArray["ckADJ_hasNotes"] = false;
 
 
       }else{
 
        form.hideItem("adjReasonCheck");
        delete adjArray["ckADJ_hasNotes"];
 
        }
 
     }
 
 if(name == "debitADJ" || name == "debitSalesADJ" || name == "debitSHORTADJ"){
 
       if(value != "0.00" && value != "0" && value != ""){
 
        form.showItem("adjReasonDEBIT");
       adjArray["debitADJ_hasNotes"] = false;
 
       }else{
 
        form.hideItem("adjReasonDEBIT");
       delete adjArray["debitADJ_hasNotes"];
        
        }
 
     }
 
 if(name == "amxADJ" || name == "amxSalesADJ" || name == "amxSHORTADJ"){
 
       if(value != "0.00" && value != "0" && value != ""){
 
        form.showItem("adjReasonAMEX");
       adjArray["amxADJ_hasNotes"] = false;
 
       }else{
 
        form.hideItem("adjReasonAMEX");
        delete adjArray["amxADJ_hasNotes"];
        }
 
     }
 
 if(name == "discADJ" || name == "discSalesADJ" || name == "discCASHSHORTADJ"){
 
       if(value != "0.00" && value != "0" && value != ""){
 
        form.showItem("adjReasonDISC");
       adjArray["discADJ_hasNotes"] = false;
 
       }else{
 
        form.hideItem("adjReasonDISC");
        delete adjArray["discADJ_hasNotes"];
        }
 
     }
 
 if(name == "masterADJ" || name == "masterSALESADJ" || name == "masterCASHSHORTADJ"){
 
       if(value != "0.00" && value != "0" && value != ""){
 
        form.showItem("adjReasonMC");
       adjArray["masterADJ_hasNotes"] = false;
 
       }else{
 
        form.hideItem("adjReasonMC");
        delete adjArray["masterADJ_hasNotes"];
        }
 
     }
 
 if(name == "visaADJ" || name == "visaSalesADJ" || name == "visaCASHSHORTADJ"){
 
       if(value != "0.00" && value != "0" && value != ""){
 
        form.showItem("adjReasonVISA");
       adjArray["visaADJ_hasNotes"] = false;
 
       }else{
 
        form.hideItem("adjReasonVISA");
        delete adjArray["visaADJ_hasNotes"];
        }
 
     }
 
 if(name == "crtADJ" || name == "salesCERTADJ" || name == "giftCERTcsADJ"){
 
       if(value != "0.00" && value != "0" && value != ""){
 
        form.showItem("adjReasonCRT");
       adjArray["crtADJ_hasNotes"] = false;
 
       }else{
 
        form.hideItem("adjReasonCRT");
        delete adjArray["crtADJ_hasNotes"];
 
        }
 
     }

};

// ***************************************************************************************************************************************************************

var _saleItemOSInput = function(name,value){

if(name == "cashADJSHORT" || name == "checkADJSHORT" ||  name == "debitSHORTADJ" || name == "amxSHORTADJ" || name == "discCASHSHORTADJ" || name == "masterCASHSHORTADJ" || name == "visaCASHSHORTADJ" || name == "giftCERTcsADJ"){

          if(value != "0.00" && value != "0" && value != ""){
    
            form.showItem("overShortTotal");
    
          }else{
    
            form.hideItem("overShortTotal");
           
           }
    
        }

    };

var _PAYMENTANDSALEVALIDATION = function(name,value){




    };

// ****************************************************************************************************************************************************************************************

var _onAfterValidate = function(status){

    form.attachEvent("onAfterValidate", function(status){ 
    
        if(status == false){
          
          console.log(status);
          dhtmlx.alert({
                        title:"Uh oh!",
                        type:"alert-error",
                        text:"You have not entered a Buisness Date OR Shift. Please review."
                      });
    
          canBePrinted = false;
        
        }else{
        
          console.log(status);
          canBePrinted = true;
        
        }
        
        });
    
    };
    
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
    
var init = function(cell){

/////////////////////
///    FORM     ////
///////////////////

     form = cell.attachForm(crForms.cashGenTempData); // The cashiers custom template 
            
////////////////////
/// INIT EVENTS ///
//////////////////

    _form_onButtonClick();
    _form_onChange();
    //_onAfterValidate(status);
    

        };
    
        return{
            init: init
        }
    })();