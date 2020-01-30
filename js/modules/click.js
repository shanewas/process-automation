function click(path) {
  var xPathRes = document.evaluate(
    path,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  );
  return xPathRes;
}
module.exports = { click };
