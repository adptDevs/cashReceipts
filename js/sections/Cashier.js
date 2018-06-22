var Cashier = (function(){

// Private variables
	var layout;
	var cashierTab;

	
	var _initMODS = function(){
		CashierCRMOD.init(cashierTab);
	};

	var init = function(tabbar, sectionACL){

		tabbar.addTab("cashier", "CASHIER FORM GENERATOR");	// CASHIER TAB
	

		cashierTab = tabbar.tabs("cashier");
		


		var scriptArray = [cashReceipts2.getPaths("apps")+"CashierCRMOD.js?v=" + Math.random()];

		var loaderPromise = scriptLoader.load(scriptArray);
			loaderPromise.then(function(){
				console.log("Cashier MODS are loaded");
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