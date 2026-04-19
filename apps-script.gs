const MENTOR_SHEET_ID = '1fXhrZKK7xGOf4kW_d2AeojdnZcTzPwu_g1xD_QbctGU';
const MENTEE_SHEET_ID = '1-KWrBW57JJOUXerP6Ev483dAT1sOh5YcLBd0nh_Iplc';

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const sheetId = data.role === 'mentor' ? MENTOR_SHEET_ID : MENTEE_SHEET_ID;
  const sheet = SpreadsheetApp.openById(sheetId).getActiveSheet();

  sheet.appendRow([
    new Date(),
    data.name,
    data.email,
    data.expertise,
    data.message,
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}
