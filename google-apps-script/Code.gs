/**
 * ALMERÍAGA — webhook Google Sheets.
 * Contrat exact (handoff Figma 5:39731) : 8 clés dans cet ordre.
 *   type, product_slug, nom, telephone, wilaya, message, utm_source, utm_campaign
 * Aucune clé supplémentaire, aucune transformation de nom.
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) {
    return json({ ok: false, error: "Server busy" });
  }

  try {
    var data = JSON.parse(e.postData.contents);
    var expectedSecret = PropertiesService.getScriptProperties().getProperty("LEADS_WEBHOOK_SECRET");

    if (expectedSecret && data.secret !== expectedSecret) {
      return json({ ok: false, error: "Unauthorized" });
    }

    var lead = data.lead || {};
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Leads");
    if (!sheet) {
      sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet("Leads");
      sheet.appendRow([
        "type", "product_slug", "nom", "telephone", "wilaya", "message", "utm_source", "utm_campaign"
      ]);
      sheet.getRange("A1:H1").setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    // Anti-injection de formules : toute valeur commençant par = + - @ est préfixée par '.
    var safe = function (value) {
      var s = String(value == null ? "" : value);
      return /^[=+\-@\t\r]/.test(s) ? "'" + s : s;
    };

    sheet.appendRow([
      safe(lead.type),
      safe(lead.product_slug),
      safe(lead.nom),
      String(lead.telephone || ""), // texte : conserve le +
      safe(lead.wilaya),
      safe(lead.message),
      safe(lead.utm_source),
      safe(lead.utm_campaign)
    ]);

    // Force les cellules texte (téléphone, code wilaya) à rester en texte.
    var row = sheet.getLastRow();
    sheet.getRange(row, 4, 1, 1).setNumberFormat("@");
    sheet.getRange(row, 5, 1, 1).setNumberFormat("@");

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: err.toString() });
  } finally {
    lock.releaseLock();
  }
}

function json(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
