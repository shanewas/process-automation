document.onclick = function(event) {
  if (event === undefined) event = window.event; // IE hack
  var target = "target" in event ? event.target : event.srcElement; // another IE hack

  var root =
    document.compatMode === "CSS1Compat"
      ? document.documentElement
      : document.body;
  var mxy = [event.clientX + root.scrollLeft, event.clientY + root.scrollTop];

  var path = getPathTo(target);
  var txy = getPageXY(target);
  alert(
    "Clicked element " +
      path +
      " offset " +
      (mxy[0] - txy[0]) +
      ", " +
      (mxy[1] - txy[1])
  );
};

function getPathTo(element) {
  if (element.id !== "") return 'id("' + element.id + '")';
  if (element === document.body) return element.tagName;

  var ix = 0;
  var siblings = element.parentNode.childNodes;
  for (var i = 0; i < siblings.length; i++) {
    var sibling = siblings[i];
    if (sibling === element)
      return (
        getPathTo(element.parentNode) +
        "/" +
        element.tagName +
        "[" +
        (ix + 1) +
        "]"
      );
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
// const electron = require("electron");
// const path = require("path");
// const url = require("url");
// let $ = require("jquery");
// window.$ = $;
// if (typeof module === "object") {
//   window.module = module;
//   module = undefined;
// }

// if (window.module) module = window.module;

// window.onload = function() {
//   var x = document.getElementsByTagName("BODY")[0];
//   x.id = "main";
//   // var body = document.getElementById("main");
//   const body = document.querySelector("body");
//   body.addEventListener(
//     "click",
//     e => {
//       if (e.shiftKey) {
//         e.preventDefault();
//         getXPath(e);
//         // console.log(xpath(e));
//       }
//     },
//     false
//   );

//   // function getXPath(element) {
//   //   var elm = element.path[0];
//   //   console.log(element.path);
//   //   console.log(elm.tagName);
//   // }
// };
// // $("#test").click(function() {
// //   var value = getXPath(this);
// //   alert(value);
// // });

// function getXPath(element) {
//   var val = element.value;
//   //alert("val="+val);
//   var xpath = "";
//   for (; element && element.nodeType == 1; element = element.parentNode) {
//     //alert(element);
//     var id =
//       $(element.parentNode)
//         .children(element.tagName)
//         .index(element) + 1;
//     id > 1 ? (id = "[" + id + "]") : (id = "");
//     xpath = "/" + element.tagName.toLowerCase() + id + xpath;
//   }
//   return xpath;
// }

// // var recorder = {
// //   moveListener: function() {
// //     var that = this;

// //     $(window).mousemove(function(e) {
// //       if (that.state == 1) {
// //         that.frames.push([e.clientX, e.clientY]);
// //       }
// //     });
// //   },

// //   record: function() {
// //     var that = this;
// //     that.frames = [];
// //     that.state = 1;
// //     that.startTime = new Date().getTime() / 1000;

// //     $("button.r").text("recording..");
// //     $("button.p").text("stop & play");
// //   },

// //   playback: function() {
// //     var that = this;
// //     that.state = 2;

// //     $("button.r").text("record");
// //     $("button.p").text("playing..");

// //     that.endTime = new Date().getTime() / 1000;
// //     that.time = (that.endTime - that.startTime) * 3;

// //     $(that.frames).each(function(i, move) {
// //       setTimeout(function() {
// //         $("div.cursor").css({
// //           left: move[0],
// //           top: move[1]
// //         });

// //         if (i == that.frames.length - 1) {
// //           $(".p").text("stop & play");
// //         }
// //       }, that.time * i);
// //     });
// //   }
// // };

// // recorder.state = 2; //1 = Recording | 2 = Stopped
// // recorder.frames = [];

// // /*
// //  * Listen for the mouse movements
// //  */
// // recorder.moveListener();
