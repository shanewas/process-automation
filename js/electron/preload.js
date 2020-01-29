const firebase = require("firebase");

const xpathCollector = require("./modules/xpath_collector");

window.onload = function() {
  var mainBody = document.getElementsByTagName("BODY")[0];

  var head = document.getElementsByTagName("HEAD")[0];
  mainBody.id = "main";
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "https://www.gstatic.com/firebasejs/7.7.0/firebase-app.js";
  head.appendChild(script);
  // var body = document.getElementById("main");
  const body = document.querySelector("body");

  xpathCollector.xpath(body);
};
