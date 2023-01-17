//---menu sheet
let sheetMenu = "menu";
let idPrefixMenu = "m-";
let rangeMenu = "range_menu";

//---get menu list to notify all users
function getMenu(){
  var menuRange = SpreadsheetApp.getActive().getRangeByName(rangeMenu);
  var menuArr = menuRange.getValues();
  var lastColumnCount = SpreadsheetApp.getActive().getRangeByName(rangeMenu).getLastColumn();
  let menuArrToNotify = [];
  let rowIdArr = [];
  menuArr.forEach(function(row, rowId) {
      if(menuArr[rowId][lastColumnCount-1]=='Y'){
        //Menu Id
        menuArr[rowId][0]=createId(idPrefixMenu);
        menuArrToNotify.push(menuArr[rowId]);
        rowIdArr.push(rowId);
      }
  });
  menuRange.setValues(menuArr);
  return [rowIdArr, menuArrToNotify];
}

//--get menu by menuId
function getMenuById(menuId){
  var menuRange = SpreadsheetApp.getActive().getRangeByName(rangeMenu);
  var menuArr = menuRange.getValues();
  for(var i=0;i<menuArr.length;i++){
    if(menuArr[i][0]==menuId){
      return menuArr[i];
    }
  }
  return null;
}

//notify all active users
function sendMenuToActiveUsers(menuArrToNotify){
  var chatIdList = getActiveUserChatIdList();
  for(var i=0;i<chatIdList.length;i++){
    var chatId = chatIdList[i];
    for(var j=0;j<menuArrToNotify.length;j++){
      var keyboard = getOrderKeyboardOptions(menuArrToNotify[j][0], menuArrToNotify[j][1]);
      var menuNotification = createMenuNotification(menuArrToNotify[j]);
      sendMessageWithInlineActions(chatId, menuNotification, keyboard);
    }
  }
}

//create a message from the menu
function createMenuNotification(menu){
  let date = menu[1];
  let items = menu[2];
  let price = menu[3];
  let note = menu[4];
  var menuNotification = `${date}: Tiffin Menu\nPrice: ${price}\n${items}\n${note}`
  return menuNotification;
}


function getOrderKeyboardOptions(menuId, menuDate){
  var keyboard = {
    "inline_keyboard":[
      [
        {
          "text": "  1  ",
          "callback_data": JSON.stringify({
            "tiffinCount": 1,
            "menuId": menuId,
            "menuDate": menuDate
          })
        },
        {
          "text": "  2  ",
          "callback_data": JSON.stringify({
            "tiffinCount": 2,
            "menuId": menuId,
            "menuDate": menuDate
          })
        },
        {
          "text": "  3  ",
          "callback_data": JSON.stringify({
            "tiffinCount": 3,
            "menuId": menuId,
            "menuDate": menuDate
          })
        }
      ]
    ]
  };
}

//--update menu sheet
function updateMenuSheet(rowIdArr){
  var menuRange = SpreadsheetApp.getActive().getRangeByName(rangeMenu)
  var lastColumnCount = SpreadsheetApp.getActive().getRangeByName(rangeMenu).getLastColumn();
  var menuArr = menuRange.getValues();
  for(var i=0;i<rowIdArr.length;i++){
    //notified column
    menuArr[rowIdArr[i]][lastColumnCount-2] = "Y"
    //send column
    menuArr[rowIdArr[i]][lastColumnCount-1] = "N";
  }
  menuRange.setValues(menuArr);
}

