


var TemplateCreatorMOD = (function(){

var layout;
var toolbar;
var form; 
var form_2;
var formInput = "";

events.on("loadCheckboxes", loadCheckboxes); // Listening to the Station Select MOD's Broadcast for Checkbox Loader.

function loadCheckboxes(){

dhx.ajax.get(cashReceipts2.getPaths("ext")+"checkboxSelectTemp.php", function(text){
									

             				 }).then(function(realdata){ //dconsole.log(realdata);

             				 	
    								var selectData = JSON.parse(realdata);
									  var counter = 0;
     							  var columnCounter = 0;

     							    while(counter < selectData.length){

       									 var selectDataLOGIC = (selectData[counter][0]+"_"+selectData[counter][1]);
       									 var item ={type:"checkbox", name: selectDataLOGIC,

       									 label:selectData[counter][2], labelWidth:150};

										 form.addItem("checkboxSelect",item,1);


										 if(columnCounter == 45){

											var itemCol = {type: "newcolumn", offset:50};
											form.addItem("checkboxSelect",itemCol,columnCounter);
											columnCounter = 0;

										}

										     counter++; // End loop for data counter
										     columnCounter++; // End loop for column counter

     								 } // END OF WHILE

    }); // END OF ADJAX

}

var _form_onButtonClick = function(){

  form.attachEvent("onButtonClick", function(name){

      switch(name){

      case 'backSSBtnSELECT': // 'Back' to StationSelectMOD.
      
      events.emit("setAdminCarousel", "stationSelect");
    
      break;

      case 'genSSBtnSELECT': // 'Generate' Checkbox Selections. 
      
        form_2.removeItem("templateGenerated"); 

        var TGB = {type: "block", width: 1000, name:"templateGenerated", blockOffset: 0, list: []};

        form_2.addItem("templateGeneratedBLOCK",TGB, 1);

            form.forEachItem(function(name){

              if(name != 'backSSBtnSELECT' && name != 'genSSBtnSELECT' && name != 'selectLABEL' && name != 'checkboxSelect' && name != 'tet' && name != 'tet2'){

              if(form.isItemChecked(name)){

              //console.log(form.getItemLabel(name).replace("&amp;", " and ")); 

        
              var dataTEMP = {type:"block", blockOffset:0, list:[ // Checked Items - Input - Add Desc Btn - for Template Cell.

              {type:'input', name:name, label:form.getItemLabel(name).replace("&amp;", " and "), position:"label-left", labelWidth:150, numberFormat:"0,000.00"},
              
              {type:"newcolumn"},  
              
              {type: "button", value: "Add Description", name: "addDesc"}
               
              ]};
          

            form_2.addItem("templateGenerated", dataTEMP,1);


          

         formInput += JSON.stringify(dataTEMP);
         formInput += "|";

          }
        }
      
      });
      

        form_2.showItem('saveGenTemp'); // show save button
    
      break;

     }

      });

toolbar.attachEvent("onClick", function(id){

  switch(id){
        case "1":
          events.emit("addGLDescription");
          break;

      }
  });

};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var init = function(cell){

/////////////////////
///    LAYOUT   ////
///////////////////

layout = cell.attachLayout({

pattern: "2U",

      cells: [
        {id: "a", text: "Line Item Selection", header: false},
        {id: "b", text: "Template", header: true}
      ]

});

/////////////////////
///    FORMS    ////
///////////////////

    	form = layout.cells("a").attachForm(crForms.cashSSTempSelectData);
      form_2 = layout.cells("b").attachForm(crForms.templateGenData);

/////////////////////
///   TOOLBAR   ////
///////////////////

      toolbar = layout.cells("b").attachToolbar();
      toolbar.addButton(1,1,'Add New Line Item Description','/dhtmlx/codebase/imgs/treeView.png');

  
/////////////////////
///   INIT EVENTS  /
///////////////////
 
_form_onButtonClick();


    };

    return{
        init: init
    }
})();