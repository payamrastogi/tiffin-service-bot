//---------To be provided by the user
let token = "";
let webAppUrl = "";


//---------Run the below functions to test the connectivity and setting up the webhook
// Test if telegram is working
function getMe() {
  let response = UrlFetchApp.fetch("https://api.telegram.org/bot"+token+"/getMe");
  console.log(response.getContentText());
}

function setWebhook() {
  let response = UrlFetchApp.fetch("https://api.telegram.org/bot"+token+"/setWebhook?url="+webAppUrl);
  console.log(response.getContentText());
}


