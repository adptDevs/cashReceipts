var archiveCRMOD = (function(){
    
// Private variables
    var layout;
    var archiveCarousel;
    var appWindow;
    var archiveHomeID;
    var templateID;


// Bind events ----------------------------------------------------------------------------------->
events.on("setArchiveCarousel", setArchiveCarousel);

function setArchiveCarousel(cellDesc){
    switch(cellDesc){

        case "home":
             archiveCarousel.cells(archiveHomeID).setActive();
            break;

        default:
        archiveCarousel.cells(archiveHomeID).setActive();
            break;
    }
}
// ------------------------------------------------------------------------------------------------>

// Private methods
    var _initMODS = function(){

        ArchiveHOME.init(archiveCarousel.cells(archiveHomeID));
        
    };

// Public methods
    var init = function(tabBlock){

        layout = tabBlock.attachLayout({
            pattern: "1C",
            cells: [
                {id: "a", header: false}
            ]
        });

        archiveCarousel = layout.cells("a").attachCarousel({
            item_width: "auto",
            item_height: "auto",
          }); 
          
          archiveCarousel.hideControls();

          archiveHomeID = archiveCarousel.addCell();
         
        
          appWindow = new dhtmlXWindows();
          appWindow.attachEvent("onClose", function(win){
            win.hide();
            win.setModal(false);
            return false;
          });

          var scriptArray = [ cashReceipts2.getPaths("mods")+"ArchiveHOME.js?v=" + Math.random()
                              
          
   
        ];

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