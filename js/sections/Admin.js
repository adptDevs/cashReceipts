var Admin = (function(){

// Private variables
	var layout;
	var adminTab;
	var cashierTab;
	var	cashierManagerTab;
	var fileServerTab;
	
	var _initMODS = function(){
		AdminCRMOD.init(adminTab);
		fileServerGridMOD.init(fileServerTab, "/_apps/cashReceipts2/");
	};

	var init = function(tabbar, sectionACL){

		tabbar.addTab("admin", "ADMIN");						  // ADMIN TAB
		//tabbar.addTab("cashier", "CASHIER FORM GENERATOR");      // CASHIER TAB
		//tabbar.addTab("cashierManger", "CASHIER FORM MANAGER"); // CASHIER MANAGER TAB
		tabbar.addTab("centralOfficeTAB","CASH RECEIPT FILE SERVER"); // FILE SERVER TAB

		adminTab = tabbar.tabs("admin");
		//cashierTab = tabbar.tabs("cashier");
		//cashierManagerTab = tabbar.tabs("cashierManger");
		fileServerTab = tabbar.tabs("centralOfficeTAB");


		adminTab.setActive();

		var scriptArray = [cashReceipts2.getPaths("apps")+"AdminCRMOD.js?v=" + Math.random(),
							"/modz/fileServerGridMOD.js?v=" + Math.random()
	];

		var loaderPromise = scriptLoader.load(scriptArray);
			loaderPromise.then(function(){
				console.log("Admin MODS are loaded");
				_initMODS();

				dhx.ajax.get(cashReceipts2.getPaths("ext")+"getLocations.php", function(text){
              
				}).then(function(realdata){
				  var locations = JSON.parse(realdata);
				  console.log(locations);
				  var fileStructure = '{items:[';
				  for(var i = 0; i < locations.length; i++){
					fileStructure += '{id:"'+locations[i].loc_name.trim()+'", text:"'+locations[i].loc_name.trim()+'", icon:"folder.png"},';
				  }
				  fileStructure = fileStructure.slice(0, -1);
				  fileStructure += "]}";

				  var gridStructure = [
					  {
						  "columnName": "Facility",
						  "filter": "#select_filter",
						  "type": "ro",
						  "align": "left",
						  "sort": "str",
						  "width": "150",
						  "dbColumn": "''"
					  },
					  {
						"columnName": "Station",
						"filter": "#select_filter",
						"type": "ro",
						"align": "left",
						"sort": "str",
						"width": "150",
						"dbColumn": "''"
					},
					{
						"columnName": "Modifier",
						"filter": "#select_filter",
						"type": "ro",
						"align": "left",
						"sort": "str",
						"width": "150",
						"dbColumn": "''"
					},
					{
						"columnName": "Shift",
						"filter": "#select_filter",
						"type": "ro",
						"align": "left",
						"sort": "str",
						"width": "150",
						"dbColumn": "''"
					},
					{
						"columnName": "Business date",
						"filter": "#text_filter",
						"type": "ro",
						"align": "left",
						"sort": "str",
						"width": "*",
						"dbColumn": "''"
					}
				  ]
	
				  events.emit("loadFileServerGrid", [fileStructure, gridStructure]);
				});
			}, function(err){
				console.log("An error occurred!");
				console.log(err);

				// Throw up error page
				//errorPage.setErrorPage(parent, "load");
			});
	};

	return{
		init: init
	}
})();