const sheetName = 'Form1';
const scriptProp = PropertiesService.getScriptProperties();

function initialSetup() {
  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  scriptProp.setProperty('key', activeSpreadsheet.getId());
}

function formatDate(date) {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0'); // January is 0
  const yyyy = date.getFullYear();
  return ${dd}/${mm}/${yyyy};
}

function formatTime(date) {
  const hh = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  const ss = String(date.getSeconds()).padStart(2, '0');
  return ${hh}:${min}:${ss};
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    const doc = SpreadsheetApp.openById(scriptProp.getProperty('key'));
    const sheet = doc.getSheetByName(sheetName);

    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const emailIndex = headers.indexOf('Email') + 1;
    const logoutIndex = headers.indexOf('Logout') + 1;

    const date = formatDate(new Date());
    const time = formatTime(new Date());

    if (e.parameter.Event === 'login') {
      const nextRow = sheet.getLastRow() + 1;
      const newRow = headers.map(function(header) {
        if (header === 'Date') {
          return date;
        } else if (header === 'Login') {
          return time;
        } else if (header === 'Logout') {
          return '';
        } else {
          return e.parameter[header] || '';
        }
      });

      sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);

      return ContentService
        .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
        .setMimeType(ContentService.MimeType.JSON);
    } else if (e.parameter.Event === 'logout') {
      const email = e.parameter.Email;
      const range = sheet.getRange(2, emailIndex, sheet.getLastRow() - 1, 1);
      const values = range.getValues();

      for (let i = 0; i < values.length; i++) {
        if (values[i][0] === email) {
          const row = i + 2;
          sheet.getRange(row, logoutIndex).setValue(time);

          return ContentService
            .createTextOutput(JSON.stringify({ 'result': 'success', 'row': row }))
            .setMimeType(ContentService.MimeType.JSON);
        }
      }

      return ContentService
        .createTextOutput(JSON.stringify({ 'result': 'error', 'error': 'User not found' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  } catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': JSON.stringify(e) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}