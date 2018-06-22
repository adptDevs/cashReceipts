var GLCreatorMOD = (function(){

var layout;
var toolbar;
var toolbar_2;
var form;
var form_2;
var appWindow;
var	descAmntCombo;
var glText;
var glID;
var ptID;
var grid;
var gridColumns;
var gridDP;
var ioCombo;
var ioData;

events.on("setLocationID", setLocationID);
events.on("addGLDescription", addGLDescription);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///   FUNCTIONS HERE    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Window .......................................................................................................................................................

function addGLDescription(){

		if(appWindow.window('addDescriptionWINDOW').isHidden()) {

            appWindow.window('addDescriptionWINDOW').show();
            appWindow.window('addDescriptionWINDOW').bringToTop();
             _parentDisable();

        }else{

          appWindow.window('addDescriptionWINDOW').bringToTop();
          
        }


	}

// Establish Location .......................................................................................................................................................

function setLocationID(id){

ptID = id;

}

// Form 1 & 2 On Button Click .......................................................................................................................................................

var _form_onButtonClick = function(){

	form.attachEvent("onButtonClick", function(name){

		switch(name){

			case 'genDesAmount':

			 glID = form.getItemValue('baseGL');
			 glText = form.getCombo('baseGL').getOption(glID).text;

			 descAmntCombo = form.getItemValue('amountGLDescriptions');

			 _setCustomDescription();


			break;

		}

	});


	form_2.attachEvent("onButtonClick", function(name){

		form_2.send(cashReceipts2.getPaths('ext')+'saveNewGLDescriptions.php?glID='+glID+'&ptID='+ptID+'&descAmnt='+descAmntCombo,'post', function(r){
				console.log(r.xmlDoc.response);
				form_2.removeItem('templateGeneratedDESC');
				form_2.removeItem('glLabel');
				var message = JSON.parse(r.xmlDoc.response);
				
			   dhtmlx.message({
                type: message[0],
                text: message[1],
                expire: -1
              });


		}); 

	});


}

// Form 2 Generated  .......................................................................................................................................................

var _setCustomDescription = function(){


	form_2.setItemLabel('glLabel', '<h1 style="color:blue">'+glText+'</h1>');

	form_2.removeItem('templateGeneratedDESC'); // This is a feature for when the user adds a different number, it resets the form. Therefore, avoiding doubling up on the values.
	var TGBDESC = {type: "block", width: 1000, name:"templateGeneratedDESC", blockOffset: 0, list: []};
	form_2.addItem('templateGeneratedDESC',TGBDESC,1);

	for(var i = 0; i < descAmntCombo; i++){

	        
	              var dataTEMP = {type:"block", blockOffset:0, list:[ // Checked Items - Input - Add Desc Btn - for Template Cell.

	              
	              {type: "input", name: "descName_"+i},
	              {type: "newcolumn"},
	            
	              {type: "combo", name: "descIO_"+i, inputWidth:150},
	              {type: "newcolumn"},
				  {type: "radio", label: "Active", value:1, name:"activeCB_"+i, checked: true},
				  {type: "newcolumn"},
				  {type: "radio", label: "Not Active", value:0, name:"activeCB_"+i, checked: false},
	               
	              ]};

	              form_2.addItem('templateGeneratedDESC', dataTEMP, 1);

	              		 form_2.getCombo("descIO_"+i).load(cashReceipts2.getPaths("connectors")+"io_COMBO_CONNECTOR.php");

		}
}

// Disable Background of Window .......................................................................................................................................................

var _parentDisable = function(){

	appWindow.window('addDescriptionWINDOW').setModal(true); // Disables Background.

}

// Grid Toolbar Functions .......................................................................................................................................................

var _toolbar2 = function(){

	toolbar_2.attachEvent("onClick", function(id){
		
		switch(id){

			case '1': // REFRESH
 					grid.clearAndLoad(cashReceipts2.getPaths("connectors")+"glDescriptionGRID_CONNECTOR.php?columnData="+gridCOMP.getDBColumns("descriptionGrid"));
 			break;

 			case '3': // SAVE
 					gridDP.sendData();
 			break;
	}
});

}

// Update grid Data Processor : Part 1 .......................................................................................................................................................

var _DP_OnBeforeUpdate = function(){

	gridDP.attachEvent("onBeforeUpdate", function(id, state, data){

		console.log(data);
		dhtmlx.message({id: "loadingBox", text: "<div class='dhtmlx-loadingMessage'></div>"});
		return true;

});

}

// Update grid Data Processor : Part 2 .......................................................................................................................................................

var _DP_OnAfterUpdate = function(){

	gridDP.attachEvent("onAfterUpdate", function(id, action, tid, response){
		
				console.log(response);
				if(action != 'error'){
					dhtmlx.message({id: "loadingBox", text: "Data Updated!"});
				}else{
					dhtmlx.message({id: "loadingBox", text: "An error occured! Please try again."});
				}

				grid.clearAndLoad(cashReceipts2.getPaths("connectors")+"glDescriptionGRID_CONNECTOR.php?columnData="+gridCOMP.getDBColumns("descriptionGrid"));

});

}

// Setting combo for IO's in grid .......................................................................................................................................................

var _gridForEachRow = function(){
console.log(grid.getRowsNum());
	

			dhx.ajax.get(cashReceipts2.getPaths("connectors")+"io_WithinGridCombo_CONNECTOR.php?isGridCombo=true", function(text){
	    				
	    				}).then(function(realdata){

	    					ioData = JSON.parse(realdata);
	    					console.log(realdata);

	    					for(var j = 0; j < grid.getRowsNum(); j++){
	    						var id = grid.getRowId(j);
	    						console.log(id);

								grid.setCellExcellType(id,2,'co');
								console.log(id);
								ioCombo = grid.getCombo(2);

		    					for(var i = 0; i < ioData.length; i++){

											ioCombo.put(ioData[i][0],ioData[i][1]);
											//console.log(ioData);


									}
	    					}

	    					//grid.forEachRow(function(id){
	    						//console.log(id);

								// grid.setCellExcellType(id,2,'co');
								// console.log(id);
								// ioCombo = grid.getCombo(2);

		    		// 			for(var i = 0; i < ioData.length; i++){

								// 			ioCombo.put(ioData[i][0],ioData[i][1]);
								// 			//console.log(ioData);


								// 	}
							
						//});

	});
}

// var _getIODATA = function(){



// var _grid_onCellChanged = function(){
	// grid.attachEvent("onCellChanged", function(rId,cInd,nValue){
		
	// 		//_gridForEachRow();


	// 		ioCombo = grid.getCombo(2);
	// 		for(var i = 0; i < ioData.length; i++){

	// 				ioCombo.put(ioData[i][0],ioData[i][1]);


	// 		}
	// 	//}
	// });
// }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var init = function(win){
appWindow = win;
ioData = "";

appWindow.createWindow('addDescriptionWINDOW', 200, 30, 1500, 850);
appWindow.window('addDescriptionWINDOW').setText("");

/////////////////////
///   LAYOUT     /// 
///////////////////

layout = appWindow.window('addDescriptionWINDOW').attachLayout("3J");
    layout.cells('a').setText("Add New Description");
    layout.cells('a').setHeight(400);
    layout.cells('a').setWidth(600);

    layout.cells('c').setText("Customize Descriptions");
    layout.cells('b').setText("Active / Inactive Table");

/////////////////////
///   FORMS      /// 
///////////////////

form = layout.cells("a").attachForm(crForms.personalizedLineItemDATA);
form_2 = layout.cells("c").attachForm(crForms.templateGenDataDESC);

//////////////////////////
///   GRID TOOLBAR   ////
////////////////////////

      toolbar_2 = layout.cells("b").attachToolbar();
      toolbar_2.addButton(1,1,'Refresh','/dhtmlx/codebase/imgs/refresh-green001.gif');
      toolbar_2.addSeparator(2,2);
      toolbar_2.addButton(3,3,'Update','/dhtmlx/codebase/imgs/save.gif');

////////////////////
///   GRID       //  
//////////////////

gridColumns = [

	{
			"columnName": "Line Item",
			"filter": "#select_filter",
			"type": "ro",
			"align": "left",
			"sort": "str",
			"width": "180",
			"dbColumn": "longText"
	},

	{
			"columnName": "Description",
			"filter": "#select_filter",
			"type": "ed",
			"align": "left",
			"sort": "str",
			"width": "150",
			"dbColumn": "Description"
	},
	{
			"columnName": "IO",
			"filter": "#select_filter",
			"type": "ro",
			"align": "left",
			"sort": "str",
			"width": "150",
			"dbColumn": "ioNumber"
	},

		{
			"columnName": "Location",
			"filter": "#select_filter",
			"type": "ro",
			"align": "left",
			"sort": "str",
			"width": "180",
			"dbColumn": "loc_name"
	},
		{
			"columnName": "Active",
			"filter": "#select_filter",
			"type": "ch",
			"align": "left",
			"sort": "str",
			"width": "150",
			"dbColumn": "active"
	}
];


gridCOMP.createGrid(layout.cells('b'), gridColumns, true, "descriptionGrid");
grid = gridCOMP.getGrid();

// Grid Connector //
console.log(cashReceipts2.getPaths("connectors")+"glDescriptionGRID_CONNECTOR.php?columnData="+gridCOMP.getDBColumns("descriptionGrid"));
grid.clearAndLoad(cashReceipts2.getPaths("connectors")+"glDescriptionGRID_CONNECTOR.php?columnData="+gridCOMP.getDBColumns("descriptionGrid"), function(){

	dhtmlx.message.hide("loadingBox");
	_gridForEachRow();

});

// HERE IS WHERE YOU LEFT OFF ABOUT THE AJAX FUNCTION TO EDIT THE IO NUMBERS....



/////////////////////////////
///   GRID DATA PROCESSOR  /
///////////////////////////

gridDP = new dataProcessor(cashReceipts2.getPaths("ext")+"glDescription_GRID_UPDATE_DP.php");
		 gridDP.init(grid);
		 gridDP.setTransactionMode("POST", false);
		 gridDP.setUpdateMode("off");


appWindow.window('addDescriptionWINDOW').hide();

/////////////////////
//   INIT EVENTS  //
///////////////////
 
_form_onButtonClick();
_toolbar2();
_DP_OnAfterUpdate();
_DP_OnBeforeUpdate();

// _getIODATA();
// _grid_onCellChanged();

    };

    return{
        init: init
    }
})();