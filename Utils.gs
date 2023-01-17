//---utility functions

function getName(contents){
  if(!contents && !contents.message && !contents.message.chat){
    let name = contents.message.chat.first_name +" "+contents.message.chat.last_name
    return name;
  }
  return null;
}

function createId(idPrefix){
  return idPrefix + (+new Date * Math.random()).toString(36).substring(0,6);
}

//---send message

function sendMessage(chatId, message){
  let data = {
    method: "post",
    payload: {
      method: "sendMessage",
      chat_id: String(chatId),
      text: message,
      parse_mode: "HTML"
    }
  };

  UrlFetchApp.fetch("https://api.telegram.org/bot"+token+"/", data);
}

// send message with inline options
function sendMessageWithInlineActions(chatId, message, keyboard) {
   let data = {
    method: "post",
    payload: {
      method: "sendMessage",
      chat_id: String(chatId),
      text: String(message),
      parse_mode: "HTML",
      reply_markup: JSON.stringify(keyboard)
    }
  };
  UrlFetchApp.fetch("https://api.telegram.org/bot"+token+"/", data);
  logActivity("sent", JSON.stringify(data));
}

//--- test
function testCreateId(){
  let code = createId("t-");
  console.log(code);
}