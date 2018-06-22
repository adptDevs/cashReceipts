/* 

This mod will have the following:

    Location Select - - 
    Favorites - -

           

*/

var cashierHomeMOD = (function(){

    // Private variables here
        var layout;
        var form;
        var form_2;
        var form_3;
        var favoritePopup;
        var contextMenu;
        var templateIcon = "/dhtmlx/codebase/imgs/templateIcon.png";
        var templateIcon_width = "50px";
        var templateIcon_height = "50px";
        var dvData;
        var userData;
        
        events.on("enableGenBtn", enableGenBtn); // * Hey, Listen * -- 'templateMOD.js'

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// EVENTS ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function enableGenBtn(id){

    form.enableItem("genBtn");
}
var _onItemDblClick = function(){ 

    form_2.attachEvent("onItemDblClick", function(id, ev, html){ // Double click on the favorite park to open template.

    events.emit("openCashReceipt", id); // * Broadcast * - 'templateMOD.js' - Opens up the Template for that location..
    events.emit("setCashierCarousel", "template");

    var temp = form_2.get(id);
    var tempName = temp.Location+"-"+temp.Facility+"-"+temp.Station+"-"+temp.Modifier;

    events.emit("setSelectTemplate", tempName);

    return true;

  });
}
// ***********************************************************************************************************************************************

var contextMenu_dblClick = function(){

    form_2.attachEvent("onBeforeContextMenu", function(id, e){

    contextMenu._doOnContextBeforeCall(e,{id:id});

    return  false;

  });
}

// ***********************************************************************************************************************************************
var contextMenu_OnClick = function(){

    contextMenu.attachEvent("onClick", function(id, zoneId, cas){
            
    switch(id){
  
                  case 'delete':
                    
                    dhx.ajax.post("/_apps/cashReceipts/ext/updateFavorites.php", "userID="+userData+"&stationID="+zoneId+"&mode='delete'", function(text){
                    }).then(function(realdata){
                    
                      dhtmlx.message({
                        text: realdata,
                        type: "messageSuccess"
                      });
  
                      dhtmlx.message.hide("templateNameError");
                      
                      form_2.remove(zoneId);
                      form_2.refresh();
                    });
                    break;
                }
              });
            }
// ***********************************************************************************************************************************************            
var form_3_onButtonClick = function(){

    form_3.attachEvent("onButtonClick", function(name){

        switch(name){
    
                    case 'saveTemplateName':
    
                        if(form.getItemValue("selectTemplate") != ""){
    
                            var templateName = form_3.getItemValue("newTemplateName");
        
                            if(templateName == ""){  // If the New Template Name is blank ALERT!
        
                                dhtmlx.message({
                                id: "templateNameError",
                                text: "<p style = 'color: #ff9933;'>You must create a template a name!</p>",
                                expire: 3000,
                                type: "messageError"
                                });
        
                            }else{
        
                                var stationID = form.getItemValue("selectTemplate");
                                var stationData = form.getCombo("selectTemplate").getOption(stationID).text.split("-");
        
                                dhx.ajax.post(cashReceipts2.getPaths("ext")+"updateFavorites.php", "userID="+userData+"&stationID="+stationID+"&templateName="+templateName+"&mode='insert'", function(text){
                                }).then(function(realdata){
                                
                                dhtmlx.message({
                                    text: realdata,
                                    type: "messageSuccess"
                                });
        
                                dhtmlx.message.hide("templateNameError");
                                
                                form_2.add({
                                    id: stationID,
                                    Name:templateName,
                                    Location: stationData[0],
                                    Facility: stationData[1],
                                    Station: stationData[2],
                                    Modifier: stationData[3]
                                });

                                favoritePopup.hide();
                                form.disableItem("saveToFavorites");
                                });
                            }
                            }
                    break;
  
               case 'cancel':
  
                    templateFormPop.hide();
  
                    break;
                }
              });
            }

// ***********************************************************************************************************************************************
  

var form_onChange = function(){

form.attachEvent("onChange", function(name, value){

    if(name == "selectTemplate"){
  
            var stationID = form.getItemValue("selectTemplate");
  
            if(form_2.exists(stationID)){
  
                form.disableItem("saveToFavorites");
  
                  }else{
  
                    form.enableItem("saveToFavorites");
  
                  }
                }
              });
            }
// *************************************************************************************************************************************************************             

var _form_onButtonClick = function(){

    form.attachEvent("onButtonClick", function(name){

        switch(name){
      
                      case 'genBtn':

                         var stationID = form.getItemValue("selectTemplate");

                         form.disableItem("genBtn"); 

                         if(stationID != ""){
      
                          dhtmlx.message.hide("templateGoError");
                        
                             events.emit("openCashReceipt", stationID); // * Broadcast * - 'templateMOD.js' - Opens up the Template for that location..

                            events.emit("setCashierCarousel", "template");
                            //console.log(form.getCombo("selectTemplate").getComboText());
                            events.emit("setSelectTemplate", form.getCombo("selectTemplate").getComboText());

                          }else{
      
                          dhtmlx.message({
                            id: "templateGoError",
                            text: "<p style = 'color: #ff9933;'>You must select a location!</p>",
                            expire: 3000,
                            type: "messageError"
                          });
      
                        }
      
                        break;
      
                    case 'saveToFavorites':
      
                    favoritePopup.show("saveToFavorites");
      
                        break;
                    }
                  }); 
                } 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
    
    
var init = function(cell){

    userData = cashReceipts2.getUserInfo()["usrID"];
            
/////////////////////
///    LAYOUT   ////
///////////////////

layout = cell.attachLayout({

    pattern: "2E",
    
          cells: [

            {id: "a", text: "Location Select", header: true},
            {id: "b", text: "Favorites", header: true}
            
          ]
    
    });

    
/////////////////////
///    FORMS    ////
///////////////////
            
    form = layout.cells("a").attachForm(crForms.selectTemplateFormDataV2); // LOCATION SEARCH FORM
           favoritePopup = new dhtmlXPopup({ form: form, id: "saveToFavorites"}); 
   
    form_2 = layout.cells("b").attachDataView({ // FAVORITES FORM

             type:{
             template:"<h3><img src="+templateIcon+" width="+templateIcon_width+" height="+templateIcon_height+">#Name#:</h3><br />#Location# -- #Facility#<br />#Station#, #Modifier#",
             height: 200,
             width: 300
                }

      });

    form_3 = favoritePopup.attachForm(window.crForms.saveToFavoritesFormDataV2); // POP UP'S FORM
   
//////////////////////////
/// FAV. CONTEXT MENU ///
////////////////////////

    contextMenu = new dhtmlXMenuObject();
    contextMenu.renderAsContextMenu();

    contextMenu.loadStruct("/_apps/cashReceipts2/data/favoritesCM.json", function(){

    });

////////////////////
/// COMBO LOAD  ///
//////////////////

form.getCombo("selectTemplate").load(cashReceipts2.getPaths("connectors")+"templateCOMBO.php", function(){

     

        dhx.ajax.get(cashReceipts2.getPaths("ext")+"getFavorites.php?userID="+userData, function(text){
        }).then(function(realdata){

            dvData = JSON.parse(realdata);
              
            for(var i = 0; i < dvData.length; i++){
                form_2.add({
                        id: dvData[i][0],
                        Name: dvData[i][1],
                        Location: dvData[i][2],
                        Facility: dvData[i][3],
                        Station: dvData[i][4],
                        Modifier: dvData[i][5]
                });
              }
        });

      });

////////////////////
/// INIT EVENTS ///
//////////////////

      _form_onButtonClick();
      form_onChange();
      form_3_onButtonClick();
      contextMenu_OnClick();
      contextMenu_dblClick();
      _onItemDblClick();
      
    
    };
    
        return{
            init: init
        }
    })();