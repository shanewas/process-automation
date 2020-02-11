// function click(path) {
//   var xPathRes = document.evaluate(
//     path,
//     document,
//     null,
//     XPathResult.FIRST_ORDERED_NODE_TYPE,
//     null
//   );
//   return xPathRes.singleNodeValue;
// }
// module.exports = { click };

// My module
function usability(path) {
  this.path = path;
}

usability.prototype.click = function click() {
  var xPathRes = document.evaluate(
    this.path,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  );
  return xPathRes.singleNodeValue.click();
};

usability.prototype.form = function form(data = "No Fill Up Information") {
  var xPathRes = document.evaluate(
    this.path,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  );
  return (xPathRes.singleNodeValue.value = data);
};

usability.prototype.radio = function radio() {
  var xPathRes = document.evaluate(
    this.path,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  );
  return (xPathRes.singleNodeValue.checked = true);
};
usability.prototype.dropDown = function dropDown(data = "0") {
  var xPathRes = document.evaluate(
    this.path,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  );
  setSelectedValue(xPathRes.singleNodeValue, data);
};
function setSelectedValue(selectObj, valueToSet) {
  for (var i = 0; i < selectObj.options.length; i++) {
    if (selectObj.options[i].text === valueToSet) {
      selectObj.options[i].selected = true;
      return;
    }
  }
}
module.exports = usability;
