function doPost(e) {
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: "Server busy" }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  try {
    var data = JSON.parse(e.postData.contents);
    var expectedSecret = PropertiesService.getScriptProperties().getProperty("LEADS_WEBHOOK_SECRET");

    if (expectedSecret && data.secret !== expectedSecret) {
      return ContentService.createTextOutput(JSON.stringify({ ok: false, error: "Unauthorized" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var lead = data.lead || {};
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Leads");
    if (!sheet) {
      sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet("Leads");
      sheet.appendRow([
        "lead_id", "recu_le", "type", "produit", "nom", "telephone", "wilaya_code", "wilaya",
        "quantite", "volume", "boutique", "statut", "notes",
        "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term",
        "fbclid", "ttclid", "event_id"
      ]);
      sheet.getRange("A1:U1").setFontWeight("bold");
    }

    var now = new Date();
    var yyyy = now.getFullYear();
    var mm = ("0" + (now.getMonth() + 1)).slice(-2);
    var dd = ("0" + now.getDate()).slice(-2);
    var datePrefix = "L-" + yyyy + mm + dd + "-";
    
    var lastRow = sheet.getLastRow();
    var nextNum = lastRow > 1 ? lastRow : 1;
    var numStr = ("000" + nextNum).slice(-3);
    var leadId = datePrefix + numStr;

    var attr = lead.attribution || {};
    var formulaSafe = function(val) {
      var s = String(val || "");
      if (/^[=+\-@\t\r]/.test(s)) {
        return "'" + s;
      }
      return s;
    };

    sheet.appendRow([
      formulaSafe(leadId),
      formulaSafe(lead.receivedAt || now.toISOString()),
      formulaSafe(lead.kind),
      formulaSafe(lead.product),
      formulaSafe(lead.name),
      String(lead.phone || ""), // phone as text
      formulaSafe(lead.wilayaCode),
      formulaSafe(lead.wilayaName),
      formulaSafe(lead.quantity),
      formulaSafe(lead.volume),
      formulaSafe(lead.shop),
      "Nouveau",
      "",
      formulaSafe(attr.utm_source),
      formulaSafe(attr.utm_medium),
      formulaSafe(attr.utm_campaign),
      formulaSafe(attr.utm_content),
      formulaSafe(attr.utm_term),
      formulaSafe(attr.fbclid),
      formulaSafe(attr.ttclid),
      formulaSafe(lead.eventId)
    ]);

    return ContentService.createTextOutput(JSON.stringify({ ok: true, lead_id: leadId }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

