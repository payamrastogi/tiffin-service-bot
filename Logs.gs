//---logs sheet
let sheetLogs = "logs";

function addLog(content, action){
  SpreadsheetApp.getActive().getSheetByName(sheetlogs).appendRow([new Date(), chatId, action, content]);
}
