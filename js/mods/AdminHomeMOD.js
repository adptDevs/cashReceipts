var AdminHomeMOD = (function(){
// Private variables here
	var layout;
	var form;
	var cashSSFormPOP;
	var fileUploadForm;
/////////////////////////////////////////////////////////////////// 

// Private methods
	var _form_onButtonClick = function(){


		form.attachEvent("onButtonClick", function(name){

			switch(name){

				case'beginCreateSS':

					events.emit("setAdminCarousel", "stationSelect");

				break;

				case 'importSS':
					cashSSFormPOP.show("importSS");
					fileUploadForm.setItemWidth("parkName", 320); 
				break;
			}
		});
		
		fileUploadForm.attachEvent("onButtonClick", function(name){
			if(name == "ok" && fileUploadForm.validate()){
			  var businessDate = fileUploadForm.getCalendar("businessDate").getDate(true);
			  var template = fileUploadForm.getCombo("selectTemplate").getComboText();
			  var parkName = template.split("-")[0];
			  console.log(parkName);
			  if(parkName == "Bull Shoals"){
				parkName = "Bull Shoals-White River";
			  }

			  if(template.indexOf("-N/A") !== -1){
					template = template.substring(0, template.length - 4);
			  }

			  var shift = fileUploadForm.getCombo("shiftType").getComboText();
			  var fileName = template+"_"+shift+"_"+businessDate;
			  console.log("File: "+fileName);
			  events.emit("openUploader", [cashReceipts2.getPaths("ext")+"upload_conf_cr.php", cashReceipts2.getPaths("ext")+"crUploader.php", "Import Cash Reciept Files", "?parkName="+parkName+"&fileName="+fileName, fileName]);
			}else if(name == "cancel"){
			  cashSSFormPOP.hide();
			}
		});
	};

//////////////////////////////////////////////////////////////////

// Public methods
    var init = function(cell){

    	form = cell.attachForm(crForms.cashSSFormData);
		cashSSFormPOP = new dhtmlXPopup({form: form, id: ["importSS"]});

		fileUploadForm = cashSSFormPOP.attachForm(window.crForms.fileUploadFormData);
    	fileUploadForm.getCombo("selectTemplate").load(cashReceipts2.getPaths("connectors")+"templateCOMBO.php", function(){
			fileUploadForm.getCombo("selectTemplate").setOptionWidth(600);
		});



    	_form_onButtonClick();

    };

///////////////////////////////////////////////////////////////

    return{
        init: init
    }
})();