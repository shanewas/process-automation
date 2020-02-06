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

usability.prototype.clearPlaceholder = function clearPlaceholder(field) {
  var placeholder = field.getAttribute("placeholder") || field.value;

  if (clearPlaceholder.supported === undefined) {
    clearPlaceholder.supported =
      "placeholder" in document.createElement("input");
  }

  if (!clearPlaceholder.supported) {
    field.value = field.value || placeholder;
    field.onfocus = function() {
      if (this.value === placeholder) {
        this.value = "";
      }
    };
    field.onblur = function() {
      if (this.value === "") {
        this.value = placeholder;
      }
    };
  }
};
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
  

  
 console.log(xPathRes.singleNodeValue.shrink)
  return (xPathRes.singleNodeValue.value=data);
};

module.exports = usability;
