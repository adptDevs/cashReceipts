var Archive = (function(){

// Private variables
	var layout;
	var archiveTab;

	
	var _initMODS = function(){
		archiveCRMOD.init(archiveTab);
	};

	var init = function(tabbar, sectionACL){

		tabbar.addTab("archive", "ARCHIVED RECORDS");	// CASHIER TAB
	

		archiveTab = tabbar.tabs("archive");
		


		var scriptArray = [cashReceipts2.getPaths("apps")+"archiveCRMOD.js?v=" + Math.random()];

		var loaderPromise = scriptLoader.load(scriptArray);
			loaderPromise.then(function(){
				console.log("Archive MODS are loaded");
				_initMODS();
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