var StationSelectMOD = (function(){

// Private variables here
	var layout;
	var form;

// Private methods
	var _form_onButtonClick = function(){


		form.attachEvent("onButtonClick", function(name){

			switch(name){

				case'backSSBtn':

					events.emit("setAdminCarousel", "home");
					
				break;

				case'createSSBtn':

					var locationID = form.getItemValue("selectPTFormSS");
					var stationID = form.getItemValue("selectStationFormSS");
    				var facilityID = form.getItemValue("selectFacilityFormSS");
    				var modID = form.getItemValue("selectModFormSS");
    				events.emit("setLocationID", locationID);
    				dhx.ajax.get(cashReceipts2.getPaths("ext")+"getLocationVerification.php?locationID="+locationID+"&stationID="+stationID+"&facilityID="+facilityID+"&modID="+modID, function(text)
    				{

    				}).then(function(realdata){

    					

    					if(realdata == "yes"){

    						events.emit("setAdminCarousel", "templateCreator");
    						events.emit("loadCheckboxes"); // Broadcasting to Template Creator to load Checkboxes


    					

						} // END OF IF


									 else{

										  dhtmlx.alert({
										                    type: "alert-warning",
										                    text: "This location does NOT exist. Please review.",
										                    title: "Alert!",
										                    ok: "Ok"
										                  });
										}	

    				}); // END OF THEN

				break;
			}
    	});
	};


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 


    var init = function(cell){

    	form = cell.attachForm(crForms.cashSSTempCreateData);


    	_form_onButtonClick();
    };

    return{
        init: init
    }
})();