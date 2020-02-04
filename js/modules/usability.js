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

module.exports = usability;
