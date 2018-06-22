var AdminCRMOD = (function(){
// Private variables
    var layout;
    var adminCarousel;
    var appWindow;
    var adminHomeID;
    var stationSelectID;
    var templateCreatorID;

// Bind events ----------------------------------------------------------------------------------->
events.on("setAdminCarousel", setAdminCarousel);

function setAdminCarousel(cellDesc){
    switch(cellDesc){
        case "home":
            adminCarousel.cells(adminHomeID).setActive();
            break;

        case "stationSelect":
            adminCarousel.cells(stationSelectID).setActive();
            break;

        case "templateCreator":
            adminCarousel.cells(templateCreatorID).setActive();
            break;

        default:
            adminCarousel.cells(adminHomeID).setActive();
            break;
    }
}
// ------------------------------------------------------------------------------------------------>

// Private methods
    var _initMODS = function(){
        AdminHomeMOD.init(adminCarousel.cells(adminHomeID));
        StationSelectMOD.init(adminCarousel.cells(stationSelectID));
        TemplateCreatorMOD.init(adminCarousel.cells(templateCreatorID));
        //GLCreatorMOD.init(appWindow);
        SubDescriptionMOD.init(appWindow);
        uploaderMOD.init();
    };

// Public methods
    var init = function(tabBlock){

        layout = tabBlock.attachLayout({
            pattern: "1C",
            cells: [
                {id: "a", header: false}
            ]
        });

        adminCarousel = layout.cells("a").attachCarousel({
            item_width: "auto",
            item_height: "auto",
          }); 
          adminCarousel.hideControls();

        adminHomeID = adminCarousel.addCell();
        stationSelectID = adminCarousel.addCell();
        templateCreatorID = adminCarousel.addCell();

        appWindow = new dhtmlXWindows();
    	appWindow.attachEvent("onClose", function(win){
          win.hide();
          win.setModal(false);
          return false;
        });

        var scriptArray = [ cashReceipts2.getPaths("mods")+"AdminHomeMOD.js?v=" + Math.random(),
                            cashReceipts2.getPaths("mods")+"StationSelectMOD.js?v=" + Math.random(),
                            cashReceipts2.getPaths("mods")+"TemplateCreatorMOD.js?v=" + Math.random(),
                            cashReceipts2.getPaths("mods")+"GLCreatorMOD.js?v=" + Math.random(),
                            cashReceipts2.getPaths("mods")+"SubDescriptionMOD.js?v=" + Math.random(),
                            "/dhtmlx/dhtmlxVault/codebase/dhtmlxvault.js?v=" + Math.random(),
							"/modz/uploaderMOD.js?v=" + Math.random()
        ];

        var loaderPromise = scriptLoader.load(scriptArray);
            loaderPromise.then(function(){
                console.log("AdminCR MODS are loaded");
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