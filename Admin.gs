//----admin sheet

let rangeAdmin = "range_admin";

//get admin details
function getAdminChatIds() {
  var adminTable = SpreadsheetApp.getActive().getRangeByName(rangeAdmin).getValues();
  let adminChatIdArr = [];
  adminTable.forEach(function(row, rowId) {
      if(adminTable[rowId][3]=='Y'){
        adminChatIdArr.push(adminTable[rowId][0]);
      }
  });
  return adminChatIdArr;
}





//---test
function testGetAdminChatIds(){
  let adminChatIdArr = getAdminChatIds();
  console.log(adminChatIdArr);
}
