const electron = require("electron");
const path = require("path");
const url = require("url");
// const body = null;
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
        // getXPath(e);
        console.log(xpath(e));
      }
    },
    false
  );
  function xpath(el) {
    if (typeof el == "string")
      return document.evaluate(el, document, null, 0, null);
    if (!el || el.nodeType != 1) return "";
    if (el.id) return "//*[@id='" + el.id + "']";
    var sames = [].filter.call(el.parentNode.children, function(x) {
      return x.tagName == el.tagName;
    });
    return (
      xpath(el.parentNode) +
      "/" +
      el.tagName.toLowerCase() +
      (sames.length > 1 ? "[" + ([].indexOf.call(sames, el) + 1) + "]" : "")
    );
  }
  function getXPaths(element) {
    var xpath = "";
    for (; element && element.nodeType == 1; element = element.parentNode) {
      var id =
        $(element.parentNode)
          .children(element.tagName)
          .index(element) + 1;
      id > 1 ? (id = "[" + id + "]") : (id = "");
      xpath = "/" + element.tagName.toLowerCase() + id + xpath;
    }
    console.log(xpath);
    return xpath;
  }
  function getElementXPath(element) {
    if (element && element.id) return '//*[@id="' + element.id + '"]';
    else return getElementTreeXPath(element);
  }
  function getElementTreeXPath(element) {
    var paths = []; // Use nodeName (instead of localName)
    // so namespace prefix is included (if any).
    for (
      ;
      element && element.nodeType == Node.ELEMENT_NODE;
      element = element.parentNode
    ) {
      var index = 0;
      var hasFollowingSiblings = false;
      for (
        var sibling = element.previousSibling;
        sibling;
        sibling = sibling.previousSibling
      ) {
        // Ignore document type declaration.
        if (sibling.nodeType == Node.DOCUMENT_TYPE_NODE) continue;

        if (sibling.nodeName == element.nodeName) ++index;
      }

      for (
        var sibling = element.nextSibling;
        sibling && !hasFollowingSiblings;
        sibling = sibling.nextSibling
      ) {
        if (sibling.nodeName == element.nodeName) hasFollowingSiblings = true;
      }

      var tagName =
        (element.prefix ? element.prefix + ":" : "") + element.localName;
      var pathIndex =
        index || hasFollowingSiblings ? "[" + (index + 1) + "]" : "";
      paths.splice(0, 0, tagName + pathIndex);
    }

    return paths.length ? "/" + paths.join("/") : null;
  }
  // let div = document.createElement("div");
  //*[@id="main"]/div/div[1]/div/h1
  // div.className = "document";
  // div.innerHTML = '<div onclick="addclick()"></div>';

  // document.body.append(div);
  //   document.body.style.backgroundColor = "red";
  //   // console.log(x)
  //   var seq = [];
};
function getXPath(element) {
  var elm = element.path[0];
  console.log(element.path);
  console.log(elm.tagName);
}
var isHovered = false;

// function keyDown(event) {
//   if (!isHovered) return;
//   var key = event.keyCode;
//   if (key === 84) {
//     console.log("we are hovered and pressing T!");
//   }
// }

// function hoveredBox() {
//   isHovered = true;
// }

// document.addEventListener("keypress", keyDown);
// document.getElementById("main").addEventListener("mouseenter", hoveredBox);
// document.getElementById("main").addEventListener("mouseleave", function() {
//   isHovered = false;
// });
function addclick() {
  //   var target = event.target;
  //   seq.push(target.id);
  console.log("pushed");
}
// /html/bdoy / div / div[7] / span / center / div[1] / img;
function callMe() {
  var frame = $("iframe"),
    contents = frame.contents(),
    body = contents.find("body");

  var script2 = document.createElement("script");
  script2.type = "text/javascript";
  script2.text = " console.log('Potato')";
  $(body).append(script2);
}

// function codegeneretor(xpaths, seq) {
//   code = "";
//   xpaths.forEach(function(item, index) {
//     var line =
//       seq[index] +
//       '= driver.find_element_by_xpath("' +
//       item +
//       '")\n' +
//       "element.click()\n";

//     code += line;
//   });
//   return code;
// }
