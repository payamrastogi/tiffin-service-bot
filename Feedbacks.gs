//---feedbacks sheet
let sheetFeedbacks = "feedbacks";
let idPrefixFeedbacks = "f-";
let rangeFeedbacks = "range_feedbacks";

//---add a feedback to the feedbacks sheet
function addFeedback(contents){
  let chatId = contents.message.chat.id;
  if(!doesUserExist(chatId)){
    let name = getName(contents);
    let feedbackId = createId(idPrefixFeedbacks);
    let currentDate = Utilities.formatDate(new Date(), timeZone, dateFormat);
    SpreadsheetApp.getActive().getSheetByName(sheetFeedbacks).appendRow([chatId, feedbackId,currentDate, name, feedback,"" ,"N"]);
  }
}

//----send reply - to be called when send button is clicked
function sendReplyAndUpdateFeedbackSheet(){
  let res = getFeedbackReplies();
  //sendReply(res[1]);
  updateFeebackSheet(res[0]);
}

function sendFeedbackReply(answeredArr){
  for(var i=0;i<answeredArr.length;i++){
    //Chat Id(A)
    chatId = answeredArr[i][0];
    //Answer(F)
    message = answeredArr[i][5];
    sendMessage(chatId, message);
  }
}

//---get feeback list to send a reply
function getFeedbackReplies(){
  var feedbacksArr = SpreadsheetApp.getActive().getRangeByName(rangeFeedbacks).getValues();
  var lastColumnCount = SpreadsheetApp.getActive().getRangeByName(rangeFeedbacks).getLastColumn();
  let repliedArr = [];
  let rowIdArr = [];
  feedbacksArr.forEach(function(row, rowId) {
      if(feedbacksArr[rowId][lastColumnCount-1]=='Y'){
        repliedArr.push(feedbacksArr[rowId]);
        rowIdArr.push(rowId);
      }
  });
  return [rowIdArr, repliedArr];
}

function updateFeedbackSheet(rowIdArr){
  var feedbacksRange = SpreadsheetApp.getActive().getRangeByName(rangeFeedbacks)
  var feedbacksArr = feedbacksRange.getValues();
  for(var i=0;i<rowIdArr.length;i++){
    //Replied column
    feedbacksArr[rowIdArr[i]][6] = "Y";
    //send column
    feedbacksArr[rowIdArr[i]][7] = "N";
  }
  feedbacksRange.setValues(feedbacksArr);
}


//---test
function testSendReplyAndUpdateFeedbackSheet(){
  sendReplyAndUpdateFeedbackSheet();
}


function testGetFeedbackReplies(){
  let res = getFeedbackReplies();
  console.log(res[0]);
  console.log(res[1]);
}

function testUpdateFeedbackSheet(){
  let rowIdArr = [1];
  updateFeedbackSheet(rowIdArr);
}
