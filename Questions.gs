//---questions sheet
let sheetQuestions = "questions";
let idPrefixQuestions = "q-";
let rangeQuestions = "range_questions";

//---add a question to the questions sheet
function addQuestion(contents){
  let chatId = contents.message.chat.id;
  if(!doesUserExist(chatId)){
    let name = getName(contents);
    let questionId = createId(idPrefixQuestions);
    let currentDate = Utilities.formatDate(new Date(), timeZone, dateFormat);
    SpreadsheetApp.getActive().getSheetByName(sheetQuestions).appendRow([chatId, questionId, currentDate, name, feedback,"" ,"N"]);
  }
}

//----send reply - to be called when send button is clicked
function sendReplyAndUpdateQuestionSheet(){
  let res = getAnsweredQuestions();
  //sendReply(res[1]);
  updateQuestionSheet(res[0]);
}

function sendQuestionReply(answeredArr){
  for(var i=0;i<answeredArr.length;i++){
    //Chat Id(A)
    chatId = answeredArr[i][0];
    //Answer(F)
    message = answeredArr[i][5];
    sendMessage(chatId, message);
  }
}

//---get questions list to send a reply
function getAnsweredQuestions(){
  var questionArr = SpreadsheetApp.getActive().getRangeByName(rangeQuestions).getValues();
  var lastColumnCount = SpreadsheetApp.getActive().getRangeByName(rangeQuestions).getLastColumn();
  let answeredArr = [];
  let rowIdArr = [];
  questionArr.forEach(function(row, rowId) {
      if(questionArr[rowId][lastColumnCount-1]=='Y'){
        answeredArr.push(questionArr[rowId]);
        rowIdArr.push(rowId);
      }
  });
  return [rowIdArr, answeredArr];
}

function updateQuestionSheet(rowIdArr){
  var questionRange = SpreadsheetApp.getActive().getRangeByName(rangeQuestions)
  var questionArr = questionRange.getValues();
  for(var i=0;i<rowIdArr.length;i++){
    //Replied column
    questionArr[rowIdArr[i]][6] = "Y";
    //send column
    questionArr[rowIdArr[i]][7] = "N";
  }
  questionRange.setValues(questionArr);
}


//---test
function testSendReplyAndUpdateQuestionSheet(){
  sendReplyAndUpdateQuestionSheet();
}


function testAnsweredQuestions(){
  let res = getAnsweredQuestions();
  console.log(res[0]);
  console.log(res[1]);
}

function testUpdateQuestionSheet(){
  let rowIdArr = [0, 2];
  updateQuestionSheet(rowIdArr);
}