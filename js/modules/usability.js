const fs = require('fs')
const csv = require('csv-parser')

function usability(path) {
  this.path = path
  this.valueArr = []
}
// part of dropdown work
function setSelectedValue(selectObj, valueToSet) {
  for (let i = 0; i < selectObj.length; i = i + 1) {
    if (selectObj.options[i].text === valueToSet) {
      selectObj.options[i].selected = true
      return
    }
    // console.log(selectObj.length);
  }
}

// reading the csv file and storing in value array
usability.prototype.read_csv = function read_csv(csv_data) {
  fs.createReadStream(csv_data, { bufferSize: 64 * 1024 })
    .pipe(csv())
    .on('data', row => {
      this.valueArr.push(row)
    })
    .on('end', () => {
      console.log('CSV file successfully processed')
    })
}
usability.prototype.valueToFillUp = function valueToFillUp() {
  const keys = Object.keys(this.valueArr[0])
  // console.log(this.value[50].first_name);
  // console.log(keys[0]);
  return keys
}
// clicking on the element of the event
usability.prototype.click = function click() {
  let xPathRes = document.evaluate(
    this.path,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  )
  return xPathRes.singleNodeValue.click()
}

// filling up form field with data passed.
// if no data found will fill up with "no fill up information"
usability.prototype.form = function form(data = 'No Fill Up Information') {
  let xPathRes = document.evaluate(
    this.path,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  )
  return (xPathRes.singleNodeValue.value = data)
}
// radio select
usability.prototype.radio = function radio() {
  let xPathRes = document.evaluate(
    this.path,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  )
  return (xPathRes.singleNodeValue.checked = true)
}
usability.prototype.formFillUP = function formFillUP(j) {
  // for (let j = 0; j < snapshot.numChildren(); j++) {
  // if (j < snapshot.numChildren()) {
  return this.valueToFillUp()[j]
  // }
}
// sending data to dropdown value
usability.prototype.dropDown = function dropDown(data = '0') {
  let xPathRes = document.evaluate(
    this.path,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  )
  setSelectedValue(xPathRes.singleNodeValue, data)
}

module.exports = usability
