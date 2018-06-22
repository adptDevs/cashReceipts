var ArchiveHOME = (function(){
    
var layout;
var form;
var gridColumns;
var archivedGrid;
var recentSubmissionGrid;
var tabbar;
var toolbar;
var printForm;
var currentRowID;

/////////////////////////////////////////////////////////////////// 
    
// Private methods
      
var _onRowSelect = function(){

    recentSubmissionGrid.attachEvent("onRowSelect", function(id,ind){
        
        dhtmlx.message({id: "archiveLoadingBox", expire:35000, text: "<img src='/data/gifs/ghosty-success.gif' width='28' height='21'>&nbsp;Loading data. Please wait..."});
      currentRowID = id;
      printForm.clear();
      console.log(cashReceipts2.getPaths("ext")+"getCRDetail.php?id="+currentRowID);
      printForm.load(cashReceipts2.getPaths("ext")+"getCRDetail.php?id="+currentRowID).then(function(text){

        printForm.removeItem("cashierTempBlock"); 
        var whatever = {type: "block", width: "auto", name:'cashierTempBlock', blockOffset: 20, list:[]};
        printForm.addItem('blockForBlock', whatever, 4); 
        
        printForm.removeItem("taxTypeBLOCK"); 
        var whatever2 = {type: "block", width: "auto", name:'taxTypeBLOCK', blockOffset: 0}; 
        printForm.addItem('blockFortaxTypeBLOCK', whatever2, 1);

        var jsonOBJ = xmlToJSON.parseString(text);
           console.log(jsonOBJ.data[0]);

        var crData = jsonOBJ.data[0];
        console.log(JSON.parse(crData.templates[0]._text));

        var taxItems = crData.taxTypes[0]._text;

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
    
           printForm.addItem("taxTypeBLOCK", taxDATA, 4);

    
           //events.emit("addTaxToPrintForm", taxDATA);
    
/**
 * WE GOTTA DO THE POPS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * 
 * 
 * 
 * AHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * 
 *      *screams internally
 * 
 *      *Aaron actually screeches
 */

           //popArrayTax.push(new dhtmlXPopup({form: printForm,id:["addTAXADJBTN_"+z]}));  // * NOTE: 'popArray' is a global varible array to capter all popups *
    
                        } // END OF TAX LOOP
    
                        events.emit("addTaxToPrintForm", taxItems);

      
        //printForm.removeItem('cashierTempBlock',JSON.parse(crData.templates[0]._text),1,1);
        
        printForm.addItem('cashierTempBlock',JSON.parse(crData.templates[0]._text),1,1);
        
        
        

        events.emit("addSalesToPrintForm", JSON.parse(crData.templates[0]._text));

// HERE WE ARE CHANGING NULL VALUES TO 0.00 TO POPULATE THE FORM        
        for (var property in crData) {
            if (crData.hasOwnProperty(property)) {
                //console.log("PROPERTY: "+property+" VALUE -> "+crData[property][0]._text);
               if( crData[property][0]._text == undefined){
               // console.log("SET DAT NULL TO ZEEEROO!!!");
                crData[property][0]._text = 0.00;
               }
            }
        }

// SHIFT - B.DATE VALUES:
            printForm.setItemValue("effectDate", crData.businessDate[0]._text);
            printForm.setItemValue("shiftType", crData.stSftID[0]._text);

// CASH LOG VALUES:
            printForm.setItemValue("hundreds", crData.bills_hundreds[0]._text);
            printForm.setItemValue("fifties", crData.bills_fifties[0]._text);
            printForm.setItemValue("twenties", crData.bills_twenties[0]._text);
            printForm.setItemValue("tens", crData.bills_tens[0]._text);
            printForm.setItemValue("fives", crData.bills_fives[0]._text);
            printForm.setItemValue("twos", crData.bills_twos[0]._text);
            printForm.setItemValue("ones", crData.bills_ones[0]._text);
            printForm.setItemValue("rQuarters", crData.roll_quarters[0]._text);
            printForm.setItemValue("rDimes", crData.roll_dimes[0]._text);
            printForm.setItemValue("rNickles", crData.roll_nickles[0]._text);
            printForm.setItemValue("rPennies", crData.roll_pennies[0]._text);
            printForm.setItemValue("dollar", crData.coin_dollars[0]._text);
            printForm.setItemValue("HDollar", crData.coin_halfDollars[0]._text);
            printForm.setItemValue("Quarters", crData.coin_quarters[0]._text);
            printForm.setItemValue("Dimes", crData.coin_dimes[0]._text);
            printForm.setItemValue("Nickles", crData.coin_nickles[0]._text);
            printForm.setItemValue("Pennies", crData.coin_pennies[0]._text);
            printForm.setItemValue("cf", crData.cashFund[0]._text);

// REGISTER BALANCE VALUES:
            printForm.setItemValue("beginBal", crData.regBegBal[0]._text);
            printForm.setItemValue("endBal", crData.regEndBal[0]._text);
            printForm.setItemValue("returnBal", crData.returns[0]._text);
            printForm.setItemValue("securityDep", crData.secDeposits[0]._text);
            printForm.setItemValue("otherRegBalAdj", crData.otherBalAdj_1[0]._text);
            printForm.setItemValue("otherRegBalAdj2", crData.otherBalAdj_2[0]._text);

// PAYMENT SET.TAPE VALUES:            
            printForm.setItemValue("countSheetCK", crData.chkCountSheet[0]._text);
            printForm.setItemValue("amxSettlementTape", crData.settlementTape_3[0]._text);
            printForm.setItemValue("discSettlementTape", crData.settlementTape_4[0]._text);
            printForm.setItemValue("masterSettlementTape", crData.settlementTape_5[0]._text);
            printForm.setItemValue("visaSettlementTape", crData.settlementTape_6[0]._text);
            printForm.setItemValue("GIFTUCRT", crData.settlementTape_7[0]._text);
            printForm.setItemValue("debitSettlementTape", crData.settlementTape_8[0]._text);

// PAYMENT REGISTER TAPE VALUES:
            printForm.setItemValue("CASH", crData.paymentType_1[0]._text);
            printForm.setItemValue("CK", crData.paymentType_2[0]._text);
            printForm.setItemValue("AMEX", crData.paymentType_3[0]._text);
            printForm.setItemValue("DISC", crData.paymentType_4[0]._text);
            printForm.setItemValue("MAST", crData.paymentType_5[0]._text);
            printForm.setItemValue("VISA", crData.paymentType_6[0]._text);
            printForm.setItemValue("UCRT", crData.paymentType_7[0]._text);
            printForm.setItemValue("DEBIT", crData.paymentType_8[0]._text);

// PAYMENT ADJ VALUES:
            printForm.setItemValue("cashADJ", crData.paymentType_1_adj[0]._text);
            printForm.setItemValue("ckADJ", crData.paymentType_2_adj[0]._text);
            printForm.setItemValue("amxADJ", crData.paymentType_3_adj[0]._text);
            printForm.setItemValue("discADJ", crData.paymentType_4_adj[0]._text);
            printForm.setItemValue("masterADJ", crData.paymentType_5_adj[0]._text);
            printForm.setItemValue("visaADJ", crData.paymentType_6_adj[0]._text);
            printForm.setItemValue("crtADJ", crData.paymentType_7_adj[0]._text);
            printForm.setItemValue("debitADJ", crData.paymentType_8_adj[0]._text);

// PAYMENT SALES ADJ VALUES:
            printForm.setItemValue("cashSalesADJ", crData.paymentType_1_salesAdj[0]._text);
            printForm.setItemValue("checkSalesADJ", crData.paymentType_2_salesAdj[0]._text);
            printForm.setItemValue("amxSalesADJ", crData.paymentType_3_salesAdj[0]._text);
            printForm.setItemValue("discSalesADJ", crData.paymentType_4_salesAdj[0]._text);
            printForm.setItemValue("masterSALESADJ", crData.paymentType_5_salesAdj[0]._text);
            printForm.setItemValue("visaSalesADJ", crData.paymentType_6_salesAdj[0]._text);
            printForm.setItemValue("salesCERTADJ", crData.paymentType_7_salesAdj[0]._text);
            printForm.setItemValue("debitSalesADJ", crData.paymentType_8_salesAdj[0]._text);

// PAYMENT O/S ADJ VALUES:
            printForm.setItemValue("cashADJSHORT", crData.paymentType_1_overShort[0]._text);
            printForm.setItemValue("checkADJSHORT", crData.paymentType_2_overShort[0]._text);
            printForm.setItemValue("amxSHORTADJ", crData.paymentType_3_overShort[0]._text);
            printForm.setItemValue("discCASHSHORTADJ", crData.paymentType_4_overShort[0]._text);
            printForm.setItemValue("masterCASHSHORTADJ", crData.paymentType_5_overShort[0]._text);
            printForm.setItemValue("visaCASHSHORTADJ", crData.paymentType_6_overShort[0]._text);
            printForm.setItemValue("giftCERTcsADJ", crData.paymentType_7_overShort[0]._text);
            printForm.setItemValue("debitSHORTADJ", crData.paymentType_8_overShort[0]._text);



            printForm.setItemValue("totalCHARGE", crData.totalPayments[0]._text);

            //printForm.setItemValue("totalCASH", crData.netDeposit[0]._text);
           // printForm.setItemValue("netCashTOTAL", crData.netDeposit[0]._text);

           console.log(printForm.getItemValue("totalSales"));

            printForm.forEachItem(function(name){
                
                _calculateCashLog(name);                                                                 // CASH LOG
                _calculateTotalDailyActivity();                                                         // TDA 
                _calculateDebit(name);                                                                 // DEBIT
                _calculateCRT(name);                                                                  // GIFT CERT.
                _calculateVISA(name);                                                                // VISA
                _calculateMC(name);                                                                 // MASTER CARD
                _calculateDISC(name);                                                              // DISCOVER
                _calculateAMX(name);                                                              // AMERICAN EXPRESS
                _calculateSettlementTapeTotal(name);                                             // SETTLEMENT TAPE TOTAL
                _calculateRegisterTapeTotal(name);                                              // REGISTER TAPE TOTAL
                _calculateDifferenceTotal(name);                                               // DIFFERENCE TOTAL
                _calculatePaymentADJTotal(name);                                              // PAYMENT ADJ TOTAL
                _calculateSalesADJTotal(name);                                               // SALE ITEM ADJ TOTAL
                _calculateOSADJTotal(name);                                                 // OVERSHORT TOTAL
                _calculateADJCreditTotal(name);                                            // OVERALL CREDIT CARD TOTAL
        
                
               
        
            });
        
            dhtmlx.message.hide("archiveLoadingBox");


      });
    
  });
  
  };
  
  
// CASH LOG MATH LOGIC >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
var _calculateCashLog = function(name,value){

    if(name == "hundreds"){
        var value100Times = parseFloat(printForm.getItemValue("hundreds"));
        printForm.setItemValue("hundredsX", (value100Times * 100).toFixed(2));
        }
        
        
        if(name == "fifties"){
        var value50Times = parseFloat(printForm.getItemValue("fifties"));
        printForm.setItemValue("fiftiesX", (value50Times * 50).toFixed(2));
        
        }
        
        if(name == "twenties"){
        var value1Times = parseFloat(printForm.getItemValue("twenties"));
        printForm.setItemValue("twentiesX", (value1Times * 20).toFixed(2));
        
        }
        
        if(name == "tens"){
        var value2Times = parseFloat(printForm.getItemValue("tens"));
        printForm.setItemValue("tensX", (value2Times * 10).toFixed(2));
        
        }
        
        if(name == "fives"){
        var value22Times = parseFloat(printForm.getItemValue("fives"));
        printForm.setItemValue("fivesX", (value22Times * 5).toFixed(2));
        
        }
        
        if(name == "twos"){
        var value3Times = parseFloat(printForm.getItemValue("twos"));
        printForm.setItemValue("twosX", (value3Times * 2).toFixed(2));
        
        }
        
        if(name == "ones"){
        var value4Times = parseFloat(printForm.getItemValue("ones"));
        printForm.setItemValue("onesX", (value4Times * 1).toFixed(2));
        console.log(value4Times);
        
        }
        
        // Cash Log > Rolled Coins......................................................................................................................................................
        if(name == "rQuarters"){
        var value5Times = parseFloat(printForm.getItemValue("rQuarters"));
        printForm.setItemValue("rQuartersX", (value5Times * 10).toFixed(2));
        
        }
        
        if(name == "rDimes"){
        var value6Times = parseFloat(printForm.getItemValue("rDimes"));
        printForm.setItemValue("rDimesX", (value6Times * 5).toFixed(2));
        
        }
        
        if(name == "rNickles"){
        var value7Times = parseFloat(printForm.getItemValue("rNickles"));
        printForm.setItemValue("rNicklesX", (value7Times * 2).toFixed(2));
        
        }
        
        if(name == "rPennies"){
        var value8Times = parseFloat(printForm.getItemValue("rPennies"));
        printForm.setItemValue("rPenniesX", (value8Times * .5).toFixed(2));
        
        }
        
        // Cash Log > Loose Coins......................................................................................................................................................
        
        if(name == "dollar"){
        var value9Times = parseFloat(printForm.getItemValue("dollar"));
        printForm.setItemValue("dollarX", (value9Times * 1).toFixed(2));
        
        }
        
        if(name == "HDollar"){
        var value10Times = parseFloat(printForm.getItemValue("HDollar"));
        printForm.setItemValue("HDollarX", (value10Times * .5).toFixed(2));
        
        }
        
        if(name == "Quarters"){
        var value11Times = parseFloat(printForm.getItemValue("Quarters"));
        printForm.setItemValue("QuartersX",(value11Times * .25).toFixed(2));
        
        }
        
        if(name == "Dimes"){
        var value12Times = parseFloat(printForm.getItemValue("Dimes"));
        printForm.setItemValue("DimesX", (value12Times * .10).toFixed(2));
        
        }
        
        if(name == "Nickles"){
        var value13Times = parseFloat(printForm.getItemValue("Nickles"));
        printForm.setItemValue("NicklesX", (value13Times * .05).toFixed(2));
        
        }
        
        if(name == "Pennies"){
        var value14Times = parseFloat(printForm.getItemValue("Pennies"));
        printForm.setItemValue("PenniesX", (value14Times * 0.01).toFixed(2));
        
        }
        
        // Cash Log > Total ....................................................................................................................................................................................................
        var hundredaroo = parseFloat(printForm.getItemValue("hundredsX"));
        var fiftyaroo = parseFloat(printForm.getItemValue("fiftiesX"));
        var twentyaroo = parseFloat(printForm.getItemValue("twentiesX"));
        var tenaroo = parseFloat(printForm.getItemValue("tensX"));
        var fivearoo = parseFloat(printForm.getItemValue("fivesX"));
        var twoaroo = parseFloat(printForm.getItemValue("twosX"));
        var onearoo = parseFloat(printForm.getItemValue("onesX"));
        var rQuartaroo = parseFloat(printForm.getItemValue("rQuartersX"));
        var rDimearoo = parseFloat(printForm.getItemValue("rDimesX"));
        var rNicklearoo = parseFloat(printForm.getItemValue("rNicklesX"));
        var rPenniearoo = parseFloat(printForm.getItemValue("rPenniesX"));
        var dollararoo = parseFloat(printForm.getItemValue("dollarX"));
        var hDollararoo = parseFloat(printForm.getItemValue("HDollarX"));
        var quarteraroo = parseFloat(printForm.getItemValue("QuartersX"));
        var dimearoo = parseFloat(printForm.getItemValue("DimesX"));
        var nicklearoo = parseFloat(printForm.getItemValue("NicklesX"));
        var penniearoo = parseFloat(printForm.getItemValue("PenniesX"));
        var cfaroo = parseFloat(printForm.getItemValue("cf"));

        printForm.setItemValue("cashLogTOTAL", ((hundredaroo)+fiftyaroo+twentyaroo+tenaroo+fivearoo+twoaroo+onearoo+rQuartaroo+rDimearoo+rNicklearoo+rPenniearoo+dollararoo+hDollararoo+quarteraroo+dimearoo+nicklearoo+penniearoo).toFixed(2));


        var cashLogTotalaroo = parseFloat(printForm.getItemValue("cashLogTOTAL")); // CASH LOG TOTAL

        printForm.setItemValue("netCashTOTAL", (cashLogTotalaroo - cfaroo).toFixed(2)); // NET CASH

        printForm.setItemValue("cashLogTotalMIMIC", parseFloat(printForm.getItemValue("netCashTOTAL"))); // CASH REGISTER TOTAL

    };

// TDA MATH LOGIC >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

var _calculateTotalDailyActivity = function(name){

    var returnaroo = parseFloat(printForm.getItemValue("returnBal"));
    var securityaroo = parseFloat(printForm.getItemValue("securityDep"));
    var otheraroo = parseFloat(printForm.getItemValue("otherRegBalAdj"));
    var otheraroo2 = parseFloat(printForm.getItemValue("otherRegBalAdj2"));
    var OSTotalAdjaroo = parseFloat(printForm.getItemValue("overShortTotalAdjDailyActivity"));
    var endbalaroo = parseFloat(printForm.getItemValue("endBal"));
    var beginaroo = parseFloat(printForm.getItemValue("beginBal"));

    printForm.setItemValue("dailyTotalActivity", ((endbalaroo-beginaroo)-returnaroo-securityaroo-otheraroo-otheraroo2+parseFloat(printForm.getItemValue("overShortTotalAdjDailyActivity"))).toFixed(2)); 

};

// DEBIT DIFF/TOTAL MATH LOGIC >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

var _calculateDebit = function(name){

        var debitaroo = parseFloat(printForm.getItemValue("DEBIT"));
        var debitADJaroo = parseFloat(printForm.getItemValue("debitADJ"));
        var debitSalesAdjaroo = parseFloat(printForm.getItemValue("debitSalesADJ"));
        var debitCOSaroo = parseFloat(printForm.getItemValue("debitSHORTADJ"));
        var debitSetTapearoo = parseFloat(printForm.getItemValue("debitSettlementTape"));
        
        printForm.setItemValue("totalDEBIT", ((debitaroo)+debitADJaroo+debitSalesAdjaroo+debitCOSaroo).toFixed(2));
        printForm.setItemValue("debitDIFF", (debitSetTapearoo - debitaroo).toFixed(2));
    };
    
// AMX DIFF/TOTAL MATH LOGIC >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    
var _calculateAMX = function(name){
    
        var amexaroo = parseFloat(printForm.getItemValue("AMEX"));
        var amexADJaroo = parseFloat(printForm.getItemValue("amxADJ"));
        var amexSalesAdjaroo = parseFloat(printForm.getItemValue("amxSalesADJ"));
        var amexCOSaroo = parseFloat(printForm.getItemValue("amxSHORTADJ"));
        var amexSetTapearoo = parseFloat(printForm.getItemValue("amxSettlementTape"));
    
        printForm.setItemValue("totalAMX", ((amexaroo)+amexADJaroo+amexSalesAdjaroo+amexCOSaroo).toFixed(2));
        printForm.setItemValue("amxDIFF", (amexSetTapearoo - amexaroo).toFixed(2));
    
    
    };
    
// DISCOVER CARD DIFF/TOTAL MATH LOGIC >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    
var _calculateDISC = function(name){
    
        var discoveraroo = parseFloat(printForm.getItemValue("DISC"));
        var discoverADJaroo = parseFloat(printForm.getItemValue("discADJ"));
        var discSalesAdjaroo = parseFloat(printForm.getItemValue("discSalesADJ"));
        var discoverCSaroo = parseFloat(printForm.getItemValue("discCASHSHORTADJ"));
        var disSetTapearoo = parseFloat(printForm.getItemValue("discSettlementTape"));
        
        printForm.setItemValue("discADJTOTAL", ((discoveraroo)+discoverADJaroo+discSalesAdjaroo+discoverCSaroo).toFixed(2));
        printForm.setItemValue("discDIFF", (disSetTapearoo - discoveraroo).toFixed(2));
    
    };
    
// MASTER CARD DIFF/TOTAL MATH LOGIC >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    
var _calculateMC = function(name){
    
        var mcaroo = parseFloat(printForm.getItemValue("MAST"));
        var mcADJaroo = parseFloat(printForm.getItemValue("masterADJ"));
        var mcSalesAdjaroo = parseFloat(printForm.getItemValue("masterSALESADJ"));
        var mcCSaroo = parseFloat(printForm.getItemValue("masterCASHSHORTADJ"));
        var mcSetTapearoo = parseFloat(printForm.getItemValue("masterSettlementTape"));
        
        printForm.setItemValue("masterADJTOTAL", ((mcaroo)+mcADJaroo+mcSalesAdjaroo+mcCSaroo).toFixed(2));
        printForm.setItemValue("mastCDIFF", (mcSetTapearoo - mcaroo).toFixed(2));
    
    };
    
// VISA DIFF/TOTAL MATH LOGIC >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    
var _calculateVISA = function(name){
    
        var visaaroo = parseFloat(printForm.getItemValue("VISA"));
        var visaADJaroo = parseFloat(printForm.getItemValue("visaADJ"));
        var visaSalesAdjaroo = parseFloat(printForm.getItemValue("visaSalesADJ"));
        var visaCSaroo =  parseFloat(printForm.getItemValue("visaCASHSHORTADJ"));
        var visaSetTapearoo = parseFloat(printForm.getItemValue("visaSettlementTape"));
        
        printForm.setItemValue("visaADJTOTAL", ((visaaroo)+visaADJaroo+visaSalesAdjaroo+visaCSaroo).toFixed(2));
        printForm.setItemValue("visaDIFF", (visaSetTapearoo - visaaroo).toFixed(2));
    
    };
    
// GIFT CERT. DIFF/TOTAL MATH LOGIC >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    
var _calculateCRT = function(name){
    
        var crtaroo = parseFloat(printForm.getItemValue("UCRT"));
        var crtGIFTaroo = parseFloat(printForm.getItemValue("GIFTUCRT"));
        var crtADJaroo = parseFloat(printForm.getItemValue("crtADJ"));
        var crtSalesAdjaroo = parseFloat(printForm.getItemValue("salesCERTADJ"));
        var crtCSaroo = parseFloat(printForm.getItemValue("giftCERTcsADJ"));
        
        printForm.setItemValue("totalADJGIFTCERT", ((crtaroo)+crtADJaroo+crtSalesAdjaroo+crtCSaroo).toFixed(2));
        printForm.setItemValue("crtDIFF", (crtGIFTaroo - crtaroo).toFixed(2));
    
    };

// SETTLEMENT TAPE TOTAL MATH LOGIC >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

var _calculateSettlementTapeTotal = function(name){

    var amexSetTapesaroo = parseFloat(printForm.getItemValue("amxSettlementTape")); 
    var discSetTapesaroo = parseFloat(printForm.getItemValue("discSettlementTape"));
    var mcSetTapesaroo = parseFloat(printForm.getItemValue("masterSettlementTape"));
    var visaSetTapesaroo = parseFloat(printForm.getItemValue("visaSettlementTape"));
    var debitSetTapearoo = parseFloat(printForm.getItemValue("debitSettlementTape"));

    printForm.setItemValue("totalSettlementTape",(amexSetTapesaroo+discSetTapesaroo+mcSetTapesaroo+visaSetTapesaroo+debitSetTapearoo).toFixed(2));

};

// REGISTER TAPE TOTAL MATH LOGIC >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

var _calculateRegisterTapeTotal = function(name){

    var amexRegTapesaroo = parseFloat(printForm.getItemValue("AMEX"));
    var discRegTapesaroo = parseFloat(printForm.getItemValue("DISC"));
    var mcRegTapesaroo = parseFloat(printForm.getItemValue("MAST"));
    var visaRegTapesaroo = parseFloat(printForm.getItemValue("VISA"));
    var debitRegTapesaroo = parseFloat(printForm.getItemValue("DEBIT")); 

    printForm.setItemValue("totalRegTape", (amexRegTapesaroo+discRegTapesaroo+mcRegTapesaroo+visaRegTapesaroo+debitRegTapesaroo).toFixed(2));
};

// DIFFERENCE TOTAL MATH LOGIC >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

var _calculateDifferenceTotal = function(name){

    var amexDIFFaroo = parseFloat(printForm.getItemValue("amxDIFF"));
    var discDIFFaroo = parseFloat(printForm.getItemValue("discDIFF"));
    var mcDIFFaroo = parseFloat(printForm.getItemValue("mastCDIFF"));
    var visaDIFFaroo = parseFloat(printForm.getItemValue("visaDIFF"));
    var debitDiFFaroo = parseFloat(printForm.getItemValue("debitDIFF"));

    printForm.setItemValue("totalDIFF", (amexDIFFaroo+discDIFFaroo+mcDIFFaroo+visaDIFFaroo+debitDiFFaroo).toFixed(2));
};

//  PAYMENT ADJ TOTAL MATH LOGIC >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

var _calculatePaymentADJTotal = function(name){

    var amexADJaroo = parseFloat(printForm.getItemValue("amxADJ"));
    var discoverADJaroo = parseFloat(printForm.getItemValue("discADJ"));
    var mcADJaroo = parseFloat(printForm.getItemValue("masterADJ"));
    var visaADJaroo = parseFloat(printForm.getItemValue("visaADJ"));
    var debitADJaroo = parseFloat(printForm.getItemValue("debitADJ"));

    printForm.setItemValue("totalPayAdj", (amexADJaroo+discoverADJaroo+mcADJaroo+visaADJaroo+debitADJaroo).toFixed(2));
};

// SALES ADJUSTMENT TOTAL MATH LOGIC >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
var _calculateSalesADJTotal = function(name){

        var amexSalesaroo = parseFloat(printForm.getItemValue("amxSalesADJ"));
        var discSalesaroo = parseFloat(printForm.getItemValue("discSalesADJ"));
        var mcSalesaroo = parseFloat(printForm.getItemValue("masterSALESADJ"));
        var visaSalesaroo = parseFloat(printForm.getItemValue("visaSalesADJ"));
        var debitSalesaroo = parseFloat(printForm.getItemValue("debitSalesADJ")); 
        
        printForm.setItemValue("totalSalesAdj", (amexSalesaroo+discSalesaroo+mcSalesaroo+visaSalesaroo+debitSalesaroo).toFixed(2));
    
    };

// OVER SHORT ADJ TOTAL MATH LOGIC >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

var _calculateOSADJTotal = function(name){

    var cashOSaroo = parseFloat(printForm.getItemValue("cashADJSHORT"));
    var checkOSaroo = parseFloat(printForm.getItemValue("checkADJSHORT"));
    var debitOSaroo = parseFloat(printForm.getItemValue("debitSHORTADJ")); // DEBIT-UPDATE-12/14/2017
    var amexOSaroo = parseFloat(printForm.getItemValue("amxSHORTADJ"));
    var discOSaroo = parseFloat(printForm.getItemValue("discCASHSHORTADJ"));
    var mcOSaroo = parseFloat(printForm.getItemValue("masterCASHSHORTADJ"));
    var visaOSaroo = parseFloat(printForm.getItemValue("visaCASHSHORTADJ"));
    var crtOSaroo = parseFloat(printForm.getItemValue("giftCERTcsADJ"));
    
    printForm.setItemValue("overShortTotal", ((cashOSaroo)+checkOSaroo+debitOSaroo+amexOSaroo+discOSaroo+mcOSaroo+visaOSaroo+crtOSaroo).toFixed(2));
    printForm.setItemValue("finalSaleAdj", (parseFloat(printForm.getItemValue("overShortTotal"))+parseFloat(printForm.getItemValue("finalSale"))+parseFloat(printForm.getItemValue("totalSales"))).toFixed(2));
    printForm.setItemValue("totalOSAdj", (amexOSaroo+discOSaroo+mcOSaroo+visaOSaroo+debitOSaroo).toFixed(2)); 
    printForm.setItemValue("overShortTotalAdjDailyActivity", ((cashOSaroo)+checkOSaroo+debitOSaroo+amexOSaroo+discOSaroo+mcOSaroo+visaOSaroo+crtOSaroo).toFixed(2));
    
    _calculateTotalDailyActivity();

};

// OVERALL CREDIT CARD TOTAL MATH LOGIC >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

var _calculateADJCreditTotal = function(name){

    amexTotalaroo = parseFloat(printForm.getItemValue("totalAMX"));
    disTotalaroo = parseFloat(printForm.getItemValue("discADJTOTAL"));
    mcTotalaroo =  parseFloat(printForm.getItemValue("masterADJTOTAL"));
    visaTotalaroo = parseFloat(printForm.getItemValue("visaADJTOTAL"));
    debitTotalaroo = parseFloat(printForm.getItemValue("totalDEBIT")); 

    printForm.setItemValue("totalCREDIT", (amexTotalaroo+disTotalaroo+mcTotalaroo+visaTotalaroo+debitTotalaroo).toFixed(2));

};

//////////////////////////////////////////////////////////////////
    
// Public methods

var init = function(cell){
    
/////////////////////
///    LAYOUT   ////
///////////////////

layout = cell.attachLayout({

    pattern: "2U",
    
          cells: [

            {id: "a", text: "Archived Grid Filter", header: true},
            {id: "b", text: "Archived Form Preview", header: true}
            
          ]
    
    });

/////////////////////
///    TAB BAR   ///
///////////////////

tabbar = layout.cells("a").attachTabbar({
    tabs: [
        {id: "a1", text: "Archived Records", active: true},
        {id: "a2", text: "Recent Submissions"}
    ]
});

////////////////////
///   GRID       //  
//////////////////

gridColumns = [

    {
        "columnName": "Business Date",
        "filter": "#select_filter",
        "type": "ro",
        "align": "left",
        "sort": "str",
        "width": "180",
        "dbColumn": "businessDate"
    },

	{
		"columnName": "Park",
		"filter": "#select_filter",
		"type": "ro",
		"align": "left",
		"sort": "str",
		"width": "180",
		"dbColumn": "Location"
    },
    
    {
		"columnName": "Facility",
		"filter": "#select_filter",
		"type": "ro",
		"align": "left",
		"sort": "str",
		"width": "150",
		"dbColumn": "Facility"
    },

    {
		"columnName": "Station",
		"filter": "#select_filter",
		"type": "ro",
		"align": "left",
		"sort": "str",
		"width": "150",
		"dbColumn": "Station"
    },

    {
        "columnName": "Shift",
        "filter": "#select_filter",
        "type": "ro",
        "align": "left",
        "sort": "str",
        "width": "180",
        "dbColumn": "stationShift"
    },
];


gridCOMP.createGrid(tabbar.tabs("a1"), gridColumns, true, "archivedGrid");
archivedGrid = gridCOMP.getGrid(); 

gridCOMP.createGrid(tabbar.tabs("a2"), gridColumns, true, "recentSubmissionGrid");

recentSubmissionGrid = gridCOMP.getGrid(); 
recentSubmissionGrid.attachFooter("<b>Total:</b>");
recentSubmissionGrid.attachFooter("#stat_count");

recentSubmissionGrid.attachEvent("onFilterStart", function(indexes, values){
    //values[1] = crConstants.currentLocation.loc_name.trim();
    values[1] = values[1].trim();
    console.log(values);
    return true;
});

dhtmlx.message({id: "recentLoadingBox", expire:35000, text: "<img src='/data/gifs/ghosty-success.gif' width='28' height='21'>&nbsp;Loading data. Please wait..."});

console.log(cashReceipts2.getPaths("connectors")+"recentSubmissionGrid_CONNECTOR.php?columnData="+gridCOMP.getDBColumns("recentSubmissionGrid"));

recentSubmissionGrid.load(cashReceipts2.getPaths("connectors")+"recentSubmissionGrid_CONNECTOR.php?columnData="+gridCOMP.getDBColumns("recentSubmissionGrid"), function(){

    dhtmlx.message.hide("recentLoadingBox");
    // if(crConstants.currentLocation != ""){
    //     recentSubmissionGrid.filterBy(4, crConstants.currentLocation.loc_name, true); // UNCOMMENT FOR BETA
    // }
    console.log(crConstants.currentLocation);
   // recentSubmissionGrid.filterBy(1, "Devil's Den", true);

});

////////////////////
///   TOOLBAR    //  
//////////////////

  toolbar = layout.cells("b").attachToolbar({
        icon_path: "/dhtmlx/codebase/imgs/",
        items:[

            {id: "printCopy", type: "button", text: "Print", img: "print.gif", img_disabled: "print_dis.gif"}
 
        ]

    });

////////////////////
///   PRINT      //  
//////////////////
printForm = layout.cells("b").attachForm(crForms.cashGenTempData);
printForm.hideItem("hideCashLogBUTTON");
printForm.hideItem("print");
printForm.hideItem("backBtn");

_onRowSelect();


        };
    
    ///////////////////////////////////////////////////////////////
    
        return{
            init: init
        }
    })();