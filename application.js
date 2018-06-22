var cashReceipts2 = (function(){
	// Private variables
	var appName = "Cash Receipts 2.0";
	var appDir = "cashReceipts2";
	var sectionPath = "/_apps/cashReceipts2/js/sections/";
	var modPath = "/_apps/cashReceipts2/js/mods/";
	var componentPath = "/_apps/cashReceipts2/js/components/";
	var appPath = "/_apps/cashReceipts2/js/";
	var conPath = "/_apps/cashReceipts2/connectors/";
	var dataPath = "/_apps/cashReceipts2/data/";
	var extPath = "/_apps/cashReceipts2/ext/";
	var appLayout;
	var tabbar;
	var userInfo;
	var appSections;

// Bind events ----------------------------------------------------------------------------------->
	events.on("setAppTab", setAppTab);

	function setAppTab(tabId){
		tabbar.tabs(tabId).setActive();
	}
// ------------------------------------------------------------------------------------------------>

// Private methods
	var _initMODS = function(sec){
		console.log(sec);
		for(var i = 0; i < sec.length; i++){
			console.log(sec[i][0]);
			window[sec[i][0]].init(tabbar, sec[i][1]);
		}
	};

// Public methods
	var getAppDirectory = function(){
		return appDir;
	};

	var getUserInfo = function(){
		return userInfo;
	};

	var getPaths = function(type){
		switch(type){
			case "apps":
				return appPath;
				break;

			case "connectors":
				return conPath;
				break;

			case "data":
				return dataPath;
				break;

			case "ext":
				return extPath
				break;

			case "sections":
				return sectionPath
				break;

			case "mods":
				return modPath;
				break;

			case "components":
				return componentPath;
				break;

			default:
				return "error";
				break;
		}
	};

	var init = function(parent, acl, sections, userData, sectionList){
		var scriptArray = [dataPath+"crForms.js?v=" + Math.random(),
							"/components/gridCOMP.js?v=" + Math.random()
		];
		for(var i = 0; i < sectionList.length; i++){
			scriptArray.push(sectionPath+sectionList[i][0]+".js");
		}

		var loaderPromise = scriptLoader.load(scriptArray);
			loaderPromise.then(function(){
				console.log("CR2 MODS are loaded");
				// Create layout;
				appLayout = new dhtmlXLayoutObject({
					parent:	parent,
					pattern: "2U",
					cells: [
						{id: 'a', text: '', header: false},
						{id: 'b', text: 'Documentation', collapse: true}
					]
				});
				tabbar = appLayout.cells("a").attachTabbar({
					align: "left",
					mode: "top"
				});

				// Set user data
				userInfo = userData;

				// Set app sections
				appSections = sectionList;

				// Initialize mods
				_initMODS(sectionList);
			}, function(err){
				console.log("An error occurred!");
				console.log(err);

				// Throw up error page
				//errorPage.setErrorPage(parent, "load");
			});
	};

	return{
		runApp: init,
		getAppDirectory: getAppDirectory,
		getUserInfo: getUserInfo,
		getPaths: getPaths
	}
})();