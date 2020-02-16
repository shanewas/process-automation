const firebase = require("firebase");
const path = require("path");
const firebaseConfig = require("../firebase/firebaseConfig");
const usability = require("./usability");
let executed = false;

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
        let j = 0;
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

          // if (!executed) {
          //   executed = true;
          //   usab.read_csv(
          //     `${path.join(__dirname, "../../resources/MOCK_DATA.csv")}`
          //   );
          //   // keys = usab.valueToFillUp();
          //   //sajdjkahgsdfhadasghdas NOT WORKING
          //   console.log(usab.valueToFillUp());
          // }
          // console.log(Object.values(usab.value)[500].first_name);
          // usab.value.forEach(fillUp);
          // usab.value.forEach(myFunction);
          // function myFunction(item, index) {
          // console.log(item);
          // console.log(item.first_name);
          // }
          // var csv = new Csv(xpath);
          if (
            value === "INPUT" &&
            type !== "checkbox" &&
            type !== "radio" &&
            type !== "submit"
          ) {
            let usab = new usability(xpath);
            usab.read_csv(
              `${path.join(__dirname, "../../resources/MOCK_DATA.csv")}`
            );
            // const count = usab.valueArr.length;
            (function myLoop(i) {
              setTimeout(async function() {
                if (j >= snapshot.numChildren()) {
                  j = 0;
                }
                // console.log(count);
                usab.form(
                  Object.values(usab.valueArr)[i][await usab.formFillUP(j++)]
                );
                if (--i) myLoop(i); //  decrement i and call myLoop again if i > 0
              }, 50);
            })(1000); //usab.value.length
            // console.log(
            //   usab.form(Object.values(usab.value)[50][usab.valueToFillUp()])
            // );
            // usab.form(Object.values(usab.value)[50].first_name);
          } else if (value === "INPUT" && type === "radio") {
            usab.radio();
          } else if ((value = "SELECT")) {
            usab.dropDown("Work 1");
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
