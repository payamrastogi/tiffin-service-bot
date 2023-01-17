//--order sheet
let sheetOrders = "orders";
let idPrefixOrder = "o-";
let rangeOrder = "range_order";

//-- process response from a user
function doPost(e){
  let contents = JSON.parse(e.postData.contents);
  if (contents.callback_query){
    let chat_id = contents.callback_query.from.id;
    let data = JSON.parse(contents.callback_query.data);
    logActivity("received", JSON.stringify(data));
    if(data.status == "done"){
      markAsDone(data.rangeName, data.rowId, data.colId);
      sendMessage("Well Done!");
    } else if (data.status == "wip"){
      sendMessage("Keep going!");
    } else if (data.status == "skip"){
      sendMessage("You can still do it.");
    }
  } else if (contents.message){
    let chat_id = contents.message.chat.id;
    let text = contents.message.text;
    logActivity("received", text);
  }
}

//---add a feedback to the feedbacks sheet
function addOrder(contents){
  if (contents.callback_query){
    let chatId = contents.callback_query.from.id;
    if(doesUserExist(chatId)){
      let data = JSON.parse(contents.callback_query.data);
      let menuId = data.menuId;
      let menuDate = data.menuDate;
      let tiffinCount = data.tiffinCount;
      let menu = getMenuById(menuId);
      let menuPrice = menu[3];
      let total  = menuPrice * tiffinCount;
      let name = getName(contents);
      let orderId = createId(idPrefixOrder);
      let currentDate = Utilities.formatDate(new Date(), timeZone, dateFormat);
      //Chat Id,	Menu Id,	Menu Date,	Order Id,	Order Date,	Name,	Order Count,	Total,	Collected (Y/N)
      SpreadsheetApp.getActive().getSheetByName(sheetOrders).appendRow([chatId, menuId, menuDate, orderId, currentDate,"" ,tiffinCount, total, "N"]);
    }
  }
}

function sendOrderConfirmation(chatId, orderId, tiffinCount, total){
  var keyboard = getOrderConfirmationKeyboardOptions(orderId);
  var confirmationMessage = `Order Id: ${orderId}\nTiffin Count: ${tiffinCount}\nTotal:${total}\nThank You!`
  sendMessageWithInlineActions(chatId, confirmationMessage, keyboard);
}

function getOrderConfirmationKeyboardOptions(orderId){
  var keyboard = {
    "inline_keyboard":[
      [
        {
          "text": "Cancel",
          "callback_data": JSON.stringify({
            "action": "cancel",
            "orderId": orderId,
          })
        },
        {
          "text": "Add 1 Tiffin",
          "callback_data": JSON.stringify({
            "action": "add",
            "orderId": orderId,
          })
        },
        {
          "text": "Remove 1 Tiffin",
          "callback_data": JSON.stringify({
            "action": "remove",
            "orderId": orderId,
          })
        }
      ]
    ]
  };
  return keyboard;
}


