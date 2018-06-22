var printMOD = (function(){
    var printLayout;
    var printForm;
    var stationText;
    var saleData = [];
    var taxData = [];
    var doc;

    events.on("printTheForm", printTheForm);
    events.on("setSelectTemplate", setSelectTemplate);
    events.on("addSalesToPrintForm", addSalesToPrintForm);
    events.on("addTaxToPrintForm", addTaxToPrintForm);
    events.on("addOSToPrintForm", addOSToPrintForm);

    function addOSToPrintForm(data){

        
        var counter = 5;

        var printOS = {type: "block", blockOffset: 0, list:[

            {type:"label", label:"Over/Short Total:"},
            {type:"newcolumn"},
            {type:"label", name:"overShortTotal", labelWidth: 100}

          ]};

        printForm.addItem("cashierTempBlock", printOS, counter);

    }

    function addTaxToPrintForm(data){
        //console.log(data);
        for(var z = 0; z < data; z++){
            var taxIndex = z+1;

            if(z == 0){
               
                    var printTaxDATA = {type:"block", list:[
                        {type: "block", blockOffset: 0, list:[
                          {type:"label", label:"Tax Items:"},
                          {type:"label", label:"Tax Type "+taxIndex, labelWidth: 300}
                        ]},
                        {type:"newcolumn"},
                        {type: "block", blockOffset: 0, list:[
                          {type:"label", label:"Register Tape"},
                          {type:"label", name:"taxTYPE_"+z, labelWidth: 100}
                        ]},
                        {type:"newcolumn"},
                        {type: "block", blockOffset: 0, list:[
                          {type:"label", label:"Tax Adjustment"},
                          {type:"label", name:"taxTYPEAdj_"+z, labelWidth: 100}
                        ]},
                        {type:"newcolumn"},
                        {type: "block", blockOffset: 0, list:[
                          {type:"label", label:"Tax Adj. Total"},
                          {type:"label", name:"taxAdjustmentTOTAL_"+z, labelWidth: 100}
                        ]},
                        {type:"newcolumn"},
                        {type: "block", blockOffset: 0, list:[
                          {type:"label", label:"Tax Adj. Reason"},
                          {type:"label", name:"taxAdjNOTES_"+z, labelWidth: 100}
                        ]}
                      ]};     
            }else{
           
                var printTaxDATA = {type:"block", list:[
                    {type: "block", blockOffset: 0, list:[
                      {type:"label", label:"Tax Type "+taxIndex, labelWidth: 300}
                    ]},
                    {type:"newcolumn"},
                    {type: "block", blockOffset: 0, list:[
                      {type:"label", name:"taxTYPE_"+z, labelWidth: 100}
                    ]},
                    {type:"newcolumn"},
                    {type: "block", blockOffset: 0, list:[
                      {type:"label", name:"taxTYPEAdj_"+z, labelWidth: 100}
                    ]},
                    {type:"newcolumn"},
                    {type: "block", blockOffset: 0, list:[
                      {type:"label", name:"taxAdjustmentTOTAL_"+z, labelWidth: 100}
                    ]},
                    {type:"newcolumn"},
                    {type: "block", blockOffset: 0, list:[
                      {type:"label", name:"taxAdjNOTES_"+z, labelWidth: 100}
                    ]}
                  ]};
            }
        printForm.addItem("taxTypeBLOCK", printTaxDATA, taxIndex);
    }
}

// *************************************************************************************************************************************************************************
    function addSalesToPrintForm(data){
       // console.log(data.list);

        var form = data.list;
        for(var i = 0; i < form.length; i++){
           // console.log(form[i]);
            if(i == 0){
                if(form[i].type == "block"){
                    var printDataADJUST = {type:"block", width: "auto", list:[
                        {type: "block", blockOffset: 0, list:[
                            {type:"label", label:"Items:"},
                            {type:"label", label:form[i].list[0].label, labelWidth: 300}
                        ]},
                        {type:"newcolumn"},
                        {type: "block", blockOffset: 0, list:[
                            {type:"label", label:"Register Tape"},
                            {type:"label", name:form[i].list[0].name, labelWidth: 100}
                        ]},
                        {type:"newcolumn"},
                        {type: "block", blockOffset: 0, list:[
                            {type:"label", label:"Tax Exempt"},
                            {type:"label", name:form[i].list[2].name, labelWidth: 100}
                        ]},
                        {type:"newcolumn"},
                        {type: "block", blockOffset: 0, list:[
                            {type:"label", label:"Adjustment"},
                            {type:"label", name:form[i].list[4].name, labelWidth: 100}
                        ]},
                        {type:"newcolumn"},
                        {type: "block", blockOffset: 0, list:[
                            {type:"label", label:"Adj. Total"},
                            {type:"label", name:form[i].list[6].name, labelWidth: 100}
                        ]},
                        {type:"newcolumn"},
                        {type: "block", blockOffset: 0, list:[
                            {type:"label", label:"Adj. Reason"},
                            {type:"label", name:"lineItemAdjNOTES_"+i, labelWidth: 100}
                        ]} // Here remember to incorperate the disabled line item totals change/edit: 01/21/2018
                    ]};
                }else{
                    var printDataADJUST = {type:"block", width: "auto", list:[
                        {type: "block", blockOffset: 0, list:[
                            {type:"label", label:"Items:"},
                            {type:"label", label:form[i].label, labelWidth: 300}
                        ]},
                        {type:"newcolumn"},
                        {type: "block", blockOffset: 0, list:[
                            {type:"label", label:"Register Tape"},
                            {type:"label", name:form[i].name, labelWidth: 100}
                        ]}
                    ]};
                }
                
            }else{
                if(form[i].type == "block"){
                    var printDataADJUST = {type:"block", width: "auto", list:[
                        {type: "block", blockOffset: 0, list:[
                            {type:"label", label:form[i].list[0].label, labelWidth: 300}
                        ]},
                        {type:"newcolumn"},
                        {type: "block", blockOffset: 0, list:[
                            {type:"label", name:form[i].list[0].name, labelWidth: 100}
                        ]},
                        {type:"newcolumn"},
                        {type: "block", blockOffset: 0, list:[
                            {type:"label", name:form[i].list[2].name, labelWidth: 100}
                        ]},
                        {type:"newcolumn"},
                        {type: "block", blockOffset: 0, list:[
                            {type:"label", name:form[i].list[4].name, labelWidth: 100}
                        ]},
                        {type:"newcolumn"},
                        {type: "block", blockOffset: 0, list:[
                            {type:"label", name:form[i].list[5].name, labelWidth: 100}
                        ]},
                        {type:"newcolumn"},
                        {type: "block", blockOffset: 0, list:[
                            {type:"label", name:"lineItemAdjNOTES_"+i, labelWidth: 100}
                        ]}
                    ]};
                }else{
                    var printDataADJUST = {type:"block", width: "auto", list:[
                        {type: "block", blockOffset: 0, list:[
                            {type:"label", label:form[i].label, labelWidth: 300}
                        ]},
                        {type:"newcolumn"},
                        {type: "block", blockOffset: 0, list:[
                            {type:"label", name:form[i].name, labelWidth: 100}
                        ]}
                    ]};
                }

            }
            printForm.addItem("cashierTempBlock", printDataADJUST, i);
        }
       // printForm.addItem("cashierTempBlock", data, 1);
    }
// ************************************************************************************************************************************************************************
    function setSelectTemplate(temp){
        stationText = temp;
    }

    function printTheForm(data){

        // Assign variables from data!!!!!!!!!
        var form = data.form;
        var stID = data.stID;
        var adjList = data.adjList;
        var lineItemString = data.lineItemString;
        var descItemString = data.descItemString;
        var popArray = data.popArray;
        var popArrayTax = data.popArrayTax;
        var popCashADJForm = data.popCashADJForm;
        var popCKADJForm = data.popCKADJForm;
        var popDEBITADJForm = data.popDEBITADJForm;
        var popAMEXADJForm = data.popAMEXADJForm;
        var popDISCADJForm = data.popDISCADJForm;
        var popMCADJForm = data.popMCADJForm;
        var popVISAADJForm = data.popVISAADJForm;
        var popCRTAJDForm = data.popCRTAJDForm;
        var adjArray = data.adjArray;

        var createPrint = function(){ 
            var isOK = false;
            var falseCounterArray = [];
            var diffCounterArray = [];
            //if(canBePrinted==true){
                var copyValues = new Promise(function(resolve, reject){
                    var counter = 0;
                    var effectDate = new Date(form.getItemValue("effectDate"));
                    var effectDateFormatted = (effectDate.getMonth() + 1) + "-" + effectDate.getDate() + "-" + effectDate.getFullYear();
                    printForm.setItemLabel("effectDate", effectDateFormatted);
                    printForm.setItemLabel("shiftType", form.getItemValue("shiftType"));
                    form.forEachItem(function(name){
                    if(form.getItemType(name) == "input" && !name.match("dhxId")){
                        printForm.setItemLabel(name, form.getItemValue(name));
                    }
                    counter++;
                    });

                    var popForm;
                    for(var i = 0; i < popArray.length; i++){
                    popForm = popArray[i]._nodeObj.getForm();
                    printForm.setItemLabel("lineItemAdjNOTES_"+i, popForm.getItemValue("lineItemAdjNOTES_"+i));
                    }

                    var popTaxForm;
                    for(var i = 0; i < popArrayTax.length; i++){
                    popTaxForm = popArrayTax[i]._nodeObj.getForm();
                    printForm.setItemLabel("taxAdjNOTES_"+i, popTaxForm.getItemValue("taxAdjNOTES_"+i));
                    }

                    //popCashADJForm = popCash._nodeObj.getForm();
                    printForm.setItemLabel("cashNotes", popCashADJForm.getItemValue("cashNotes"));

                    //popCKADJForm = popCK._nodeObj.getForm();
                    printForm.setItemLabel("CKNotes", popCKADJForm.getItemValue("CKNotes"));

                    //popDEBITADJForm = popDEBIT._nodeObj.getForm();
                    printForm.setItemLabel("DEBITNotes", popDEBITADJForm.getItemValue("DEBITNotes")); // DEBIT-UPDATE-12/14/2017

                    //popAMEXADJForm = popAMEX._nodeObj.getForm();
                    printForm.setItemLabel("AMEXNotes", popAMEXADJForm.getItemValue("AMEXNotes"));

                    //popDISCADJForm = popDISC._nodeObj.getForm();
                    printForm.setItemLabel("DISCNotes", popDISCADJForm.getItemValue("DISCNotes"));

                    //popMCADJForm = popMC._nodeObj.getForm();
                    printForm.setItemLabel("MCNotes", popMCADJForm.getItemValue("MCNotes"));

                    //popVISAADJForm = popVISA._nodeObj.getForm();
                    printForm.setItemLabel("VISANotes", popVISAADJForm.getItemValue("VISANotes"));

                    //popCRTAJDForm = popCRT._nodeObj.getForm();
                    printForm.setItemLabel("CRTNotes", popCRTAJDForm.getItemValue("CRTNotes"));

                    if(counter > 0){
                    resolve();
                    }else{
                    reject("Error");
                    }

                    for(var key in adjArray){
                 //   console.log(adjArray[key]);
    // DEBIT-UPDATE-12/14/2017
                    if(key != "cashADJ_hasNotes" && key != "ckADJ_hasNotes" && key != "amxADJ_hasNotes" && key != "discADJ_hasNotes" && key != "masterADJ_hasNotes" && key != "visaADJ_hasNotes" && key != "crtADJ_hasNotes" && key != "debitADJ_hasNotes"){
                        var pKey = key.split("_");
                        var popWOW = popArray[pKey[1]]._nodeObj.getForm();
                        var popWOWTax = popArrayTax[pKey[1]]._nodeObj.getForm();
                        
                        if(key == "lineItemAdj_"+pKey[1]+"_hasNotes"){
                        if(popWOW.getItemValue("lineItemAdjNOTES_"+pKey[1]) == ""){

                            //isOK = false;
                            falseCounterArray.push("false");

                        }else{

                        // adjArray[key] = true;
                        falseCounterArray.push("true");
                        
                        }
                        }

    // VERIFYING TAX ADJUSTMENT 10/26/17.............................................................................................................................
                        if(key == "taxAdj_"+pKey[1]+"_hasNotes"){
                        if(popWOWTax.getItemValue("taxAdjNOTES_"+pKey[1]) == ""){

                            //isOK = false;
                            falseCounterArray.push("false");
                            
                        }else{

                        //  adjArray[key] = true;
                        falseCounterArray.push("true");
                        
                        }
                        }
                    }
                    } // END OF POPWOW FOR LOOP

                    if(adjArray.hasOwnProperty("cashADJ_hasNotes")){
                    if(popCashADJForm.getItemValue("cashNotes") == ""){
                        falseCounterArray.push("false");
                    }else{
                        falseCounterArray.push("true");
                    }
                    }

                    if(adjArray.hasOwnProperty("ckADJ_hasNotes")){
                    if(popCKADJForm.getItemValue("CKNotes") == ""){
                        falseCounterArray.push("false");
                    }else{
                        falseCounterArray.push("true");
                    }
                    }

                    if(adjArray.hasOwnProperty("debitADJ_hasNotes")){
                    if(popDEBITADJForm.getItemValue("DEBITNotes") == ""){
                        falseCounterArray.push("false");
                    }else{
                        falseCounterArray.push("true");
                    }
                    } // DEBIT-UPDATE-12/14/2017

                    if(adjArray.hasOwnProperty("amxADJ_hasNotes")){
                    if(popAMEXADJForm.getItemValue("AMEXNotes") == ""){
                        falseCounterArray.push("false");
                    }else{
                        falseCounterArray.push("true");
                    }
                    }

                    if(adjArray.hasOwnProperty("discADJ_hasNotes")){
                    if(popDISCADJForm.getItemValue("DISCNotes") == ""){
                        falseCounterArray.push("false");
                    }else{
                        falseCounterArray.push("true");
                    }
                    }

                    if(adjArray.hasOwnProperty("masterADJ_hasNotes")){
                    if(popMCADJForm.getItemValue("MCNotes") == ""){
                        falseCounterArray.push("false");
                    }else{
                        falseCounterArray.push("true");
                    }
                    }

                    if(adjArray.hasOwnProperty("visaADJ_hasNotes")){
                    if(popVISAADJForm.getItemValue("VISANotes") == ""){
                        falseCounterArray.push("false");
                    }else{
                        falseCounterArray.push("true");
                    }
                    }

                    if(adjArray.hasOwnProperty("crtADJ_hasNotes")){
                    if(popCRTAJDForm.getItemValue("CRTNotes") == ""){
                        falseCounterArray.push("false");
                    }else{
                        falseCounterArray.push("true");
                    }
                    }

    // Check if there are any differences that are not 0 - alert user ...............................................................................................................................................................
                    if(form.getItemValue("cashDIFF") != 0 && (form.getItemValue("cashADJ") == 0 && form.getItemValue("cashSalesADJ") == 0 && form.getItemValue("cashADJSHORT") == 0)){
                    diffCounterArray.push("false");
                    }else{
                    diffCounterArray.push("true");
                    }

                    if(form.getItemValue("checkDIFF") != 0 && (form.getItemValue("ckADJ") == 0 && form.getItemValue("checkSalesADJ") == 0 && form.getItemValue("checkADJSHORT") == 0)){
                    diffCounterArray.push("false");
                    }else{
                    diffCounterArray.push("true");
                    }

                    // UPDATE-DEBIT-12/14/2017
                    if(form.getItemValue("debitDIFF") != 0 && (form.getItemValue("debitADJ") == 0 && form.getItemValue("debitSalesADJ") == 0 && form.getItemValue("debitSHORTADJ") == 0)){
                    diffCounterArray.push("false");
                    }else{
                    diffCounterArray.push("true");
                    }

                    if(form.getItemValue("amxDIFF") != 0 && (form.getItemValue("amxADJ") == 0 && form.getItemValue("amxSalesADJ") == 0 && form.getItemValue("amxSHORTADJ") == 0)){
                    diffCounterArray.push("false");
                    }else{
                    diffCounterArray.push("true");
                    }

                    if(form.getItemValue("discDIFF") != 0 && (form.getItemValue("discADJ") == 0 && form.getItemValue("discSalesADJ") == 0 && form.getItemValue("discCASHSHORTADJ") == 0)){
                    diffCounterArray.push("false");
                    }else{
                    diffCounterArray.push("true");
                    }

                    if(form.getItemValue("mastCDIFF") != 0 && (form.getItemValue("masterADJ") == 0 && form.getItemValue("masterSALESADJ") == 0 && form.getItemValue("masterCASHSHORTADJ") == 0)){
                    diffCounterArray.push("false");
                    }else{
                    diffCounterArray.push("true");
                    }

                    if(form.getItemValue("visaDIFF") != 0 && (form.getItemValue("visaADJ") == 0 && form.getItemValue("visaSalesADJ") == 0 && form.getItemValue("visaCASHSHORTADJ") == 0)){
                    diffCounterArray.push("false");
                    }else{
                    diffCounterArray.push("true");
                    }

                    if(form.getItemValue("crtDIFF") != 0 && (form.getItemValue("crtADJ") == 0 && form.getItemValue("salesCERTADJ") == 0 && form.getItemValue("giftCERTcsADJ") == 0)){
                    diffCounterArray.push("false");
                    }else{
                    diffCounterArray.push("true");
                    }

                });

                copyValues.then(function(){   
                
                    if(diffCounterArray.indexOf("false") == -1){
                    if(falseCounterArray.indexOf("false") == -1){
                   // var stationText = selectTemplateForm.getCombo("selectTemplate").getOption(stID).text; // LOCATION TITLE ON FORMS AS THEY PRINT PRODUCTION EDIT -- 10/20/17
                   // var stationText = "";
                //   console.log(stationText);
                    printForm.setItemLabel('parkNameLabel', '<h1 style="color:blue">'+stationText+'</h1>');

                    printForm.cont.id = "printJob";
                    var printContents = printForm.cont.innerHTML;
                 //   console.log(printForm);

                    var w = window.open('', 'PRINT', 'height=1000,width=1000');
                   // console.log(w);
                    w.document.write('<html><head><title></title>');
                    w.document.write("<link rel='stylesheet' href='/dhtmlx/codebase/dhtmlx.css?v=1.1' type='text/css' media='all'>");
                    w.document.write("<script>function printDoc(){window.focus(); window.print();}</script>");
                    w.document.write('</head><body onload="printDoc();" style="margin-left: 0; width: 100%;">');
                    w.document.write(printContents);
                    w.document.write('</body></html>');
                    w.document.close();
 
                        }
                    }
                }).then(function(){
                    if(diffCounterArray.indexOf("false") == -1){
                    if(falseCounterArray.indexOf("false") == -1){
                        var saveIt = new Promise(
                        function(resolve, reject){

                                var IS_DEV = true;

                            if(!IS_DEV){
                            form.send('/_apps/cashReceipts2/ext/saveTempCost.php?station='+station+'&lineItems='+lineItemString+'&descItems='+descItemString+'&adjList='+adjList,'post', function(r){
                                //console.log(r.xmlDoc.responseText);
                                    dhtmlx.alert({
                                        type: "alert",
                                        text: "Cost Items Are Now Submitted For Review",
                                        title: "Success!",
                                        ok: "Ok"
                                        });


                    // // Clear - Resets form back to 0 .........................................................................................................................................          
                    if(form.getItemType(name) == "input"){

                    form.setItemValue(name, "0");
                                            
                                            }

                    // //ON SAVE BTN > CLEAR THE FORM AND RELOAD IT. [ REMOVE ITEM > ADD ITEM ] .............................................................................................................................. 
                    form.disableItem("print");
                    form.removeItem("cashierTempBlock"); // Remove the current line items from form
                        var whatever = {type: "block", width: "auto", name:'cashierTempBlock', blockOffset: 20, list:[]}; // Create a block around those line items to contaian it.
                                
                    form.addItem('blockForBlock', whatever, 4); // Re-add the Line items, but only once. That way when the usere goes back and forth, there isn't double the amount of data on the form.
                                        
                    form.removeItem("taxTypeBLOCK"); // Remove the current line items from form
                        var whatever2 = {type: "block", width: "auto", name:'taxTypeBLOCK', blockOffset: 0}; // Create a block around those line items to contaian it.
                                        
                    form.addItem('blockFortaxTypeBLOCK', whatever2, 1); // Re-add the Line items, but only once. That way when the usere goes back and forth, there isn't double the amount of data on the form.


                    printForm.removeItem("cashierTempBlock"); // Remove the current line items from form
                    var whateverTAX = {type: "block", width: "auto", name:'cashierTempBlock', blockOffset: 20, list:[]}; // Create a block around those line items to contaian it.
                            
                    printForm.addItem('blockForBlock', whateverTAX, 4); // Re-add the Line items, but only once. That way when the usere goes back and forth, there isn't double the amount of data on the form.
                                    
                    printForm.removeItem("taxTypeBLOCK"); // Remove the current line items from form
                    var whateverTAX2 = {type: "block", width: "auto", name:'taxTypeBLOCK', blockOffset: 0}; // Create a block around those line items to contaian it.
                                    
                    printForm.addItem('blockFortaxTypeBLOCK', whateverTAX2, 1); // Re-add the Line items, but only once. That way when the usere goes back and forth, there isn't double the amount of data on the form.
                            }); // END OF SAVETEMPCOST.PHP
                        }
                        });
                    }else{
                        dhtmlx.alert({
                        type: "alert-error",
                        text: "You've made an adjustment without specifying a reason. Please, reveiw your adjustments.",
                        title: "Error!",
                        ok: "Ok"
                        });
                    }
                    }else{
                    dhtmlx.alert({
                        type: "alert-error",
                        text: "You've made an adjustment without specifying a reason. Please, reveiw your adjustments.",
                        title: "Error!",
                        ok: "Ok"
                    });
                    }
                }).catch(function(error){
                    console.log(error);
                });   
            //}
            };

    
        createPrint();

    }

    var init = function(cell){

        printLayout = cell.attachLayout({
            pattern: "1C",
            cells:[
              {id: "a", text: "Print Version", header: false}
            ]
          });
          
          printForm = printLayout.cells("a").attachForm(crForms.printForm);
    };

    return{
        init: init
    };
})();