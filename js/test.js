var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var path = require('chromedriver').path;

var service = new chrome.ServiceBuilder(path).build();
// chrome.setDefaultService(service);

new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();