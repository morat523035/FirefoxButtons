/* nsIPromptService
   http://searchfox.org/mozilla-esr78/source/toolkit/components/windowwatcher/nsIPromptService.idl
   http://searchfox.org/mozilla-esr68/source/toolkit/components/windowwatcher/nsIPromptService.idl
*/

// Firefox 69, remove the array length param in the Services.prompt.select method

// Bug 1501450, add ability to filter preferences directly with about:config, WONTFIX

(function () {
  if (location != "chrome://browser/content/browser.xul" &&
      location != "chrome://browser/content/browser.xhtml") return;
  try {
    CustomizableUI.createWidget({
      id: "__unique_identifier_5_preference_tracker_button", // should match id below
      type: "button",
      defaultArea: CustomizableUI.AREA_MENUBAR,
   // defaultArea: CustomizableUI.AREA_NAVBAR,
      label: "Preference Tracker",
      tooltiptext: "Preference Tracker" + "\n" + "\n" +
        "L: enable or disable preference tracker" + "\n" +
        "R: open button context popup",
      onCommand: function (aEvent) {
        var win = aEvent.target.ownerDocument.defaultView;
        var uid = "__unique_identifier_preference_observer";
        if (typeof win[uid] == "undefined") {
          win[uid] = {};
          win[uid].prefObserver = function (subject, topic, data) {
            // do not track these preferences
            if (data != "example.alpha" &&
                data != "example.beta" &&
                data != "example.gamma" &&
                data != "example.delta" &&
                data != "example.epsilon") {
              win[uid].prefObserver.prefArray.push(data);
            }
          };
          aEvent.target.checked = true;
          win[uid].prefObserver.prefArray = [];
          Services.prefs.addObserver("", win[uid].prefObserver, false);
        } else {
          var dialogTitle = "Preference Tracker";
          if (win[uid].prefObserver.prefArray.length > 0) {
            var dialogText = "Do you want to copy a preference to the clipboard?";
            var selectedIndex = {value: null};
            var ok = Services.prompt.select(win, dialogTitle, dialogText,
           // win[uid].prefObserver.prefArray.length, win[uid].prefObserver.prefArray,
                                                      win[uid].prefObserver.prefArray,
                selectedIndex);
            if (ok) {
              var clipboard = Components.classes["@mozilla.org/widget/clipboardhelper;1"].
                getService(Components.interfaces.nsIClipboardHelper);
              clipboard.copyString(win[uid].prefObserver.prefArray[selectedIndex.value]);
            } else {
              var data = [];
              var out = win[uid].prefObserver.prefArray.join("\n");
              data.push('<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN">', "<html>", "<head>");
              data.push('<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">');
              data.push("<title>" + "Preference Tracker" + "</title>", "</head>", "<body>");
              data.push("<pre>", out, "</pre>", "</body>", "</html>");
              win.gBrowser.addTab("data:text/html;charset=utf-8;base64," + btoa(data.join("\n")), {
                triggeringPrincipal: Services.scriptSecurityManager.getSystemPrincipal(),
              });
           // win.gBrowser.addTab("about:config?filter=" + "/" + out.replace(/\n/g, "|") + "/", {
           //   triggeringPrincipal: Services.scriptSecurityManager.getSystemPrincipal(),
           // });
           // win.gBrowser.addTab("chrome://global/content/config.xhtml?filter=" + "/" +
           //     out.replace(/\n/g, "|") + "/", {
           //   triggeringPrincipal: Services.scriptSecurityManager.getSystemPrincipal(),
           // });
              win.gBrowser.addTab("about:config", {
                triggeringPrincipal: Services.scriptSecurityManager.getSystemPrincipal(),
              });
            }
          } else {
            var dialogText = "No preference changes were found.";
            Services.prompt.alert(win, dialogTitle, dialogText);
          }
          aEvent.target.checked = false;
          Services.prefs.removeObserver("", win[uid].prefObserver);
          delete win[uid];
        }
      },
    });
  } catch (aError) {
    // [check] Show Content Messages in Firefox 109
    // [select] Browser Console Mode Multiprocess in Firefox 110
    Components.utils.reportError(aError);
  };
  var ios = Components.classes["@mozilla.org/network/io-service;1"].
    getService(Components.interfaces.nsIIOService);
  var sss = Components.classes["@mozilla.org/content/style-sheet-service;1"].
    getService(Components.interfaces.nsIStyleSheetService);
  var dataUrl = "data:image/png;base64," +
    "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACGElEQVQ4y5WSzUtUURiHn3" +
    "PObSaZGW9U6jRiWlqNEEGEtHE1tQlqY2mbFlFZRLUPIqyFf0BCRB8WDQZFMqQRBMkgWLSY" +
    "IdLQGQYs/Lhl4zTjV/l1r9PiLrLhVvbbvJvzPOe873kFf8mp87frgQYgBNQCCSAKRO7fOv" +
    "caQPwJPn3hzgngSkWoLqhvL6eodAPz6SmmPxqMRWNJoLX95tkOR8GZS/fqgbsnLzcF95T5" +
    "GJzN0zcMLNvH59MTjPW8SALN0kkgpGyoOFAXdBd7mVqAvqRAWxEUFYHXCxsr/ZTt2x8UUj" +
    "ZoTgKpZEivCmCa8DgJbjf4isHjAU0D0wR2BcgMyJCjQChVu75Ep28YNGXDmzaD7gWXgiUL" +
    "XG6dQaVqHVuQUiQWMtOwLFjnsm/WveBXUIldmZtBSpFwnoGS0bnxNABK2c92KfABW7Drt0" +
    "9fEUpGHQWxRLz0ZfgBi7kMlmX3vGTBLPAFSI1k6O8ZSEqlIr99Y/5d2xGgu7n1DdnAXgzD" +
    "4FDjRUqqSymv8cH3WbIjad6/GkgCrW3XGzu0Qpj4Q456TDoNGFvxt+dSH2ZyKUKpVZsopI" +
    "jcaDn2axNXw0P9MzyaqGbc0q3wsyca/4gshN9OlDBo+vNhY/dB1hBZCPdaW/Ndn6saiV3t" +
    "XYtADU0GWn5ks2I04+G5uTP/1Kg5TvxaJ2uMFpnccdjHYnfO0ugytjURb4nwH/kJY5fLVw" +
    "3nkJIAAAAASUVORK5CYII=";
  var css = "#__unique_identifier_5_preference_tracker_button {";
  css += 'list-style-image: url("' + dataUrl + '") !important;';
  css += "-moz-image-region: auto !important;";
  css += "}";
  var uri = ios.newURI("data:text/css," + encodeURIComponent(css), null, null);
  if (!sss.sheetRegistered(uri, sss.USER_SHEET)) {
    sss.loadAndRegisterSheet(uri, sss.USER_SHEET);
  }
})();
