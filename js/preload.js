// const electron = require("electron");
// const path = require("path");
// const url = require("url");

window.onload = function() {
  var x = document.getElementsByTagName("BODY")[0];
  x.id = "main";
  // var body = document.getElementById("main");
  const body = document.querySelector("body");
  body.addEventListener(
    "click",
    e => {
      if (e.shiftKey) {
        e.preventDefault();
        getXPath(e);
      }
    },
    false
  );
};

function getXPath(event) {
  if (event === undefined) event = window.event; // IE hack
  var target = "target" in event ? event.target : event.srcElement; // another IE hack

  var root =
    document.compatMode === "CSS1Compat"
      ? document.documentElement
      : document.body;
  var mxy = [event.clientX + root.scrollLeft, event.clientY + root.scrollTop];

  var path = getPathTo(target);
  var txy = getPageXY(target);
  // alert(
  //   "Clicked element " +
  //     path +
  //     " offset " +
  //     (mxy[0] - txy[0]) +
  //     ", " +
  //     (mxy[1] - txy[1])
  // );
  console.log(path);
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

function getPageXY(element) {
  var x = 0,
    y = 0;
  while (element) {
    x += element.offsetLeft;
    y += element.offsetTop;
    element = element.offsetParent;
  }
  return [x, y];
}

// function getXPath(element) {
//   var elm = element.path[0];
//   console.log(element.path);
//   console.log(elm.tagName);
// }
// };
