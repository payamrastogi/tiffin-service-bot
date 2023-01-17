//----users sheet
let sheetName = "users";
let timeZone = "EST";
let dateFormat = "YYYY-MM-DD";
let rangeUsers = "range_users";

function addUser(contents){
  let chatId = contents.message.chat.id;
  if(!doesUserExist(chatId)){
    let username = contents.message.chat.username;
    let name = contents.message.chat.first_name +" "+contents.message.chat.last_name
    let joinedOn = Utilities.formatDate(new Date(), timeZone, dateFormat);
    SpreadsheetApp.getActive().getSheetByName(sheetName).appendRow(["Y", name, username, joinedOn, chatId]);
  }
}

function doesUserExist(chatId){
  var users = SpreadsheetApp.getActive().getRangeByName(rangeUsers).getValues();
  for(var i=0; i<users.length; i++){
    if(users[i][0]===(chatId)){
      return true;
    }
  }
  return false;
}

//--get a list of all active user's chat id
function getActiveUserChatIdList(){
  var users = SpreadsheetApp.getActive().getRangeByName(rangeUsers).getValues();
  var lastColumnCount = SpreadsheetApp.getActive().getRangeByName(rangeUsers).getLastColumn();
  let chatIdList = [];
  for(var i=0;i<users.length;i++){
    if(users[i][lastColumnCount-1]=='Y'){
      chatIdList.push(users[i][0]);
    }
  }
  return chatIdList;
}

