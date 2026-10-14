/**
 * =====================================================================================
 * MAKE MY COTTAGE - GOOGLE SHEETS ENQUIRY SYNC SCRIPT
 * =====================================================================================
 * This Google Apps Script automatically records all website enquiries submitted from
 * Make My Cottage (Contact form & Backend API) into your Google Sheet in real-time.
 *
 * FEATURES:
 * 1. Automatically maps fields to existing columns.
 * 2. "Status" column has an interactive DROPDOWN:
 *    ['New', 'Contacted', 'Not Contacted', 'In Progress', 'Converted', 'Closed']
 * =====================================================================================
 */

var STATUS_OPTIONS = [
  'New',
  'Contacted',
  'Not Contacted',
  'In Progress',
  'Converted',
  'Closed'
];

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: 'Server busy, please retry.' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Parse incoming payload
    var data = {};
    if (e && e.parameter && Object.keys(e.parameter).length > 0) {
      data = e.parameter;
    } else if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (parseErr) {
        data = e.parameter || {};
      }
    }

    // Default headers without "Full Name"
    var defaultHeaders = [
      "Timestamp",
      "First Name",
      "Last Name",
      "Phone Number",
      "Email Address",
      "Project Type",
      "Project Details / Message",
      "Location",
      "Estimated Budget",
      "Source",
      "Status"
    ];

    // Detect existing headers
    var lastCol = sheet.getLastColumn();
    var existingHeaders = [];
    if (sheet.getLastRow() > 0 && lastCol > 0) {
      existingHeaders = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
    }

    // If sheet is empty, create headers
    if (sheet.getLastRow() === 0 || existingHeaders.length === 0 || !existingHeaders[0]) {
      sheet.clear();
      sheet.appendRow(defaultHeaders);
      
      var headerRange = sheet.getRange(1, 1, 1, defaultHeaders.length);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#1B1915");
      headerRange.setFontColor("#FCF6E9");
      headerRange.setFontSize(10);
      headerRange.setWrap(true);
      headerRange.setHorizontalAlignment("center");
      headerRange.setVerticalAlignment("middle");

      sheet.setRowHeight(1, 38);
      sheet.setFrozenRows(1);
      existingHeaders = defaultHeaders;
    }

    // Prepare values
    var timestamp = Utilities.formatDate(new Date(), "Asia/Kolkata", "dd/MM/yyyy, hh:mm:ss a");
    var firstName = data.firstName || (data.name ? data.name.split(" ")[0] : "");
    var lastName = data.lastName || (data.name ? data.name.split(" ").slice(1).join(" ") : "");
    var phone = data.phone ? "'" + data.phone : "";
    var email = data.email || "";
    var projectType = data.projectType || "Wooden Home";
    var message = data.message || "";
    var location = data.location || "Direct Web Lead";
    var estimatedBudget = data.estimatedBudget || "Standard";
    var source = data.source || "Make My Cottage - Contact Form";
    var status = data.status || "New";

    // Field mapping dictionary (case-insensitive)
    var fieldMap = {
      "timestamp": timestamp,
      "first name": firstName,
      "last name": lastName,
      "phone number": phone,
      "phone": phone,
      "email address": email,
      "email": email,
      "project type": projectType,
      "project details / message": message,
      "details": message,
      "message": message,
      "location": location,
      "estimated budget": estimatedBudget,
      "source": source,
      "status": status
    };

    // Dynamically match existing headers
    var rowToAppend = [];
    var statusColNumber = -1;

    for (var i = 0; i < existingHeaders.length; i++) {
      var headerTitle = String(existingHeaders[i]).trim().toLowerCase();
      if (headerTitle === "full name") {
        rowToAppend.push("");
      } else if (headerTitle === "status") {
        statusColNumber = i + 1;
        rowToAppend.push(status);
      } else if (fieldMap.hasOwnProperty(headerTitle)) {
        rowToAppend.push(fieldMap[headerTitle]);
      } else {
        rowToAppend.push("");
      }
    }

    if (rowToAppend.length === 0) {
      rowToAppend = [
        timestamp,
        firstName,
        lastName,
        phone,
        email,
        projectType,
        message,
        location,
        estimatedBudget,
        source,
        status
      ];
      statusColNumber = rowToAppend.length;
    }

    sheet.appendRow(rowToAppend);
    var lastRow = sheet.getLastRow();

    // Format new row
    sheet.getRange(lastRow, 1, 1, rowToAppend.length).setVerticalAlignment("middle");
    sheet.setRowHeight(lastRow, 32);

    // Apply Dropdown Data Validation to the Status cell
    if (statusColNumber > 0) {
      var statusRule = SpreadsheetApp.newDataValidation()
        .requireValueInList(STATUS_OPTIONS, true)
        .setAllowInvalid(true)
        .build();
      sheet.getRange(lastRow, statusColNumber).setDataValidation(statusRule);
    }

    return ContentService
      .createTextOutput(JSON.stringify({
        status: "success",
        message: "Enquiry recorded successfully",
        row: lastRow
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({
        status: "error",
        error: err.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

/**
 * Run this function once in Apps Script to apply the Status dropdown to the whole Status column!
 */
function applyStatusDropdownToAllRows() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var lastCol = sheet.getLastColumn();
  if (lastCol === 0) return;
  var headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];

  var statusColIdx = -1;
  for (var i = 0; i < headers.length; i++) {
    if (String(headers[i]).trim().toLowerCase() === "status") {
      statusColIdx = i + 1;
      break;
    }
  }

  if (statusColIdx > 0) {
    var statusRule = SpreadsheetApp.newDataValidation()
      .requireValueInList(STATUS_OPTIONS, true)
      .setAllowInvalid(true)
      .build();
    sheet.getRange(2, statusColIdx, 500, 1).setDataValidation(statusRule);
    SpreadsheetApp.getUi().alert("Status dropdown successfully applied to column " + statusColIdx + "!");
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: "active",
      message: "Make My Cottage Google Sheets Webhook is active and running!"
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
