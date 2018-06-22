var CashierCRMOD = (function(){
    
// Private variables
    var layout;
    var cashierCarousel;
    var appWindow;
    var cashierHomeID;
    var templateID;
    var printID;


// Bind events ----------------------------------------------------------------------------------->
events.on("setCashierCarousel", setCashierCarousel);

function setCashierCarousel(cellDesc){
    switch(cellDesc){
        case "home":
             cashierCarousel.cells(cashierHomeID).setActive();
            break;

        case "template":
             cashierCarousel.cells(templateID).setActive();
            break;

        default:
            cashierCarousel.cells(cashierHomeID).setActive();
            break;
    }
}
// ------------------------------------------------------------------------------------------------>

// Private methods
    var _initMODS = function(){

        cashierHomeMOD.init(cashierCarousel.cells(cashierHomeID));
        templateMOD.init(cashierCarousel.cells(templateID));
        printMOD.init(cashierCarousel.cells(printID));
    };

// Public methods
    var init = function(tabBlock){

        layout = tabBlock.attachLayout({
            pattern: "1C",
            cells: [
                {id: "a", header: false}
            ]
        });

        cashierCarousel = layout.cells("a").attachCarousel({
            item_width: "auto",
            item_height: "auto",
          }); 
          
          cashierCarousel.hideControls();

          cashierHomeID = cashierCarousel.addCell();
          templateID = cashierCarousel.addCell();
          printID = cashierCarousel.addCell();
        
          appWindow = new dhtmlXWindows();
          appWindow.attachEvent("onClose", function(win){
            win.hide();
            win.setModal(false);
            return false;
          });

          var scriptArray = [ cashReceipts2.getPaths("mods")+"cashierHomeMOD.js?v=" + Math.random(),
                              cashReceipts2.getPaths("mods")+"templateMOD.js?v=" + Math.random(),
                              cashReceipts2.getPaths("mods")+"printMOD.js?v=" + Math.random()
          
   
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