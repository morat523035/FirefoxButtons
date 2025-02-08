(function () {
  if (location != "chrome://browser/content/browser.xul" &&
      location != "chrome://browser/content/browser.xhtml") return;
  try {
    CustomizableUI.createWidget({
      id: "__unique_identifier_6_zoom_scroll_button", // should match id below
      type: "custom",
      defaultArea: CustomizableUI.AREA_MENUBAR,
   // defaultArea: CustomizableUI.AREA_NAVBAR,
      onBuild: function (aDocument) {
        var XUL_NS = "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul";
        var toolbarbutton = aDocument.createElementNS(XUL_NS, "toolbarbutton");
        toolbarbutton.zoomNormal = function () {
          FullZoom.reset();
        };
        toolbarbutton.zoomOut = function () {
          FullZoom.reduce();
        };
        toolbarbutton.zoomIn = function () {
          FullZoom.enlarge();
        };
        toolbarbutton.zoomScroll = function (aEvent) {
          if (aEvent.detail < 0) {
            toolbarbutton.zoomOut();
          } else {
            toolbarbutton.zoomIn();
          }
        };
        toolbarbutton.addEventListener("DOMMouseScroll", toolbarbutton.zoomScroll, false);
        toolbarbutton.onclick = function (aEvent) {
          if (aEvent.button == 0) {
            toolbarbutton.zoomNormal();
          }
        };
        var dataUrl = "data:image/png;base64," +
          "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAA" +
          "AACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH1QYdERIIyN9seAAAAuNJREFUOMulku1P" +
          "UlEcx13r4W/on2j1oje96F/oRbNWyzZFCbgXEARk5gMYqOCWTyWVBZpOYcta+dyLNAaiF+" +
          "GCD8gFArz4MEIbqAxBub/OdcUy3XrRb/tuZ+ec7+f3cE5R0V+hUMot4ko8XSkRMqJKDIRi" +
          "wX5NrdJQ9K+oVspvCsX4gXOBYALBECz7KMa7QsGqPwAEMc/gIiyDQDfONDeoa6+LJTgyBq" +
          "Hb8jUrNNhT8j4yJzW5gddlTfUMW7PhcBhQRXmNVn3tFAAXCdKBQAD0g3ZkIhmHP7FDJ9KJ" +
          "SHzv6P1cLIxA+admezaIEmBC/t4Jc219jWLIPJgzfrBl0UXGR6e2tn5kEtu7B8lYIn3kjS" +
          "ZDhsmgVWJ0M8OfiWz/QF+mQV0nLgD4GBcCAQq47dPwbpbOUuupw2h8/zCW2M9F43vg/raT" +
          "VA0tr0qN5Ia6nwCK8gPrKQBQX4w/EASUAUYXNp3O4LZraS05u7qemlmhkxvKPq+oykTWSN" +
          "+QrewdmqbZWTB/9M/PRSIRUPS6mLaP1Mi4a3PMQW1/mlmKv3z7JTIgMZH3ZUYPjiCNolfz" +
          "R+wckCdbADzRqhw2m+1QO0gc8Z/Z7ceZTKRc2ut9WGX0SGVG8pbMRFaU6qemdRZnfn5+7k" +
          "DT1DhTADTrNGWNGjXtpdaAfTbxa9cLidFTLTV5yqRGtxq9SjFucDxmzxapKDziV3yXKST1" +
          "J15CgPO2zBbz9hQROoY80I54KnsIhbiH6L+nGnZVoT37wiJ0Pe9kmpq1aR6fu1t89/blAq" +
          "BFr72C+sp0dHbEgnQcukcWQdnnYliYYXQJVkLrIMB4+cnJCdA2a0CmkOa5vPI4LhRcPQFB" +
          "law3qOpCbe1ttNVq3WWHq9Pr/OXcsrWSkhKOUITBxMQY6FpbwOFw5BEATv1KBCpFGkcVpZ" +
          "GAXbN77BmGYU2syekkwOfzwZkAFOeQziNdQLr4S5d+rzkcTjkyMqwZ6U7R/8ZPP7TuhDo2" +
          "if0AAAAASUVORK5CYII=";
        var props = {
          id: "__unique_identifier_6_zoom_scroll_button",
          class: "toolbarbutton-1 chromeclass-toolbar-additional",
          label: "Zoom Scroll",
          tooltiptext: "Zoom Scroll" + "\n" + "\n" +
            "L: reset zoom level" + "\n" + "R: open button context popup" + "\n" +
            "U: reduce zoom level" + "\n" + "D: enlarge zoom level",
          style: 'list-style-image: url("' + dataUrl + '"); -moz-image-region: auto;',
        };
        for (var p in props) toolbarbutton.setAttribute(p, props[p]);
        return toolbarbutton;
      },
    });
  } catch (aError) {
    // [check] Show Content Messages in Firefox 109
    // [select] Browser Console Mode Multiprocess in Firefox 110
    Components.utils.reportError(aError);
  };
})();
