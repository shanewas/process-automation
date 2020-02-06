const firebase = require("firebase");
const firebaseConfig = require("../firebase/firebaseConfig");
const usability = require("./usability");

firebase.initializeApp(firebaseConfig);
function xpath(body) {
  var messageRef = firebase.database().ref("xpaths");
  body.addEventListener(
    "click",
    e => {
      if (e.shiftKey) {
        e.preventDefault();
        console.log(e.path[0].tagName);
        console.log(`${getXPath(e)}`);
        var newMessageRef = messageRef.push();
        var type;
        e.path[0].type ? (type = e.path[0].type) : (type = null);
        newMessageRef.set({
          type: type,
          tagName: e.path[0].tagName,
          value: e.path[0].innerHTML,
          xpath: `${getXPath(e)}`
        });
        return `${getXPath(e)}`;
      }
    },
    false
  );
  body.addEventListener("click", e => {
    if (e.altKey) {
      e.preventDefault();
      messageRef.remove();
    }
  });
  body.addEventListener("click", e => {
    if (e.ctrlKey) {
      e.preventDefault();
      messageRef.once("value").then(function(snapshot) {
        // var value = snapshot.val();
        var tagName, type, xpath, value;
        snapshot.forEach(function(childSpanshot) {
          var key = childSpanshot.key;
          type = snapshot
            .child(key)
            .child("type")
            .val();
          value = snapshot
            .child(key)
            .child("tagName")
            .val();
          tagName = snapshot
            .child(key)
            .child("value")
            .val();
          xpath = snapshot
            .child(key)
            .child("xpath")
            .val();
          console.log("type: " + type);
          console.log("value: " + value);
          console.log("tag name: " + tagName);
          console.log("xpaths: " + xpath);
          var usab = new usability(xpath);
          if (value === "INPUT" && type !== "checkbox") {
            // usab.clearPlaceholder()
            usab.form("Some Form Data");
          } else {
            console.log("clicked" + xpath);
            usab.click();
          }
        });
      });
    }
  });
}

function getXPath(event) {
  if (event === undefined) event = window.event; // IE hack
  var target = "target" in event ? event.target : event.srcElement; // another IE hack

  // var root =
  //   document.compatMode === "CSS1Compat"
  //     ? document.documentElement
  //     : document.body;
  // var mxy = [event.clientX + root.scrollLeft, event.clientY + root.scrollTop];

  var path = getPathTo(target);
  // var txy = getPageXY(target);
  // alert(
  //   "Clicked element " +
  //     path +
  //     " offset " +
  //     (mxy[0] - txy[0]) +
  //     ", " +
  //     (mxy[1] - txy[1])
  // );
  // console.log(path);
  return path;
}

function getPathTo(element) {
  if (element.id !== "") return `//*[@id="${element.id}"]`; //'//*[@id="' + element.id + '"]';
  if (element === document.body) return element.tagName;

  var ix = 0;
  var siblings = element.parentNode.childNodes;
  for (var i = 0; i < siblings.length; i++) {
    var sibling = siblings[i];
    if (sibling === element)
      return getPathTo(element.parentNode) + `/${element.tagName}[${ix + 1}]`;
    if (sibling.nodeType === 1 && sibling.tagName === element.tagName) ix++;
  }
}

// function getPageXY(element) {
//   var x = 0,
//     y = 0;
//   while (element) {
//     x += element.offsetLeft;
//     y += element.offsetTop;
//     element = element.offsetParent;
//   }
//   return [x, y];
// }
// function getXPath(element) {
//   var elm = element.path[0];
//   console.log(element.path);
//   console.log(elm.tagName);
// }
// };
module.exports = { xpath };
