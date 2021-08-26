const electron = require("electron");
const path = require("path");

const { BrowserWindow } = electron;

let window;
function createWindow(
  loadurl,
  parent = null,
  modal = false,
  frame = true,
  preload = false,
  payload = "./script/preload"
) {
  // create new window
  window = new BrowserWindow({
    parent: parent,
    width: 1200,
    height: 1000,
    minWidth: 300,
    modal: modal,
    frame: frame,
    show: false,
    title: "AIW Core",
    icon: path.join(__dirname, "../../../logo.png"),
    webPreferences: {
      webSecurity: true,
      nodeIntegration: false, //default false
      javascript: true, //default true
      nodeIntegrationInSubFrames: false, //Experimental option for enabling Node.js support in sub-frames such as iframes and child windows.
      //All your preloads will load for every iframe, you can use process.isMainFrame to determine if you are in the main frame or not.
      allowRunningInsecureContent: false, //Allow an https page to run JavaScript, CSS or plugins from http URLs. Default is false
      //   sandbox: true,
      enableRemoteModule: false,
      nodeIntegrationInWorker: false, //default false
      scrollBounce: true, //Enables scroll bounce (rubber banding) effect on macOS. Default is false.
      plugins: true, //Whether plugins should be enabled. Default is false
      backgroundThrottling: true, //Whether to throttle animations and timers when the page becomes background.
      //This also affects the Page Visibility API. Defaults to true
      contextIsolation: false, //Whether to run Electron APIs and the specified preload script in a separate JavaScript context.
      //Defaults to false. The context that the preload script runs in will still have full access to the document and window
      //globals but it will use its own set of JavaScript builtins (Array, Object, JSON, etc.)
      //and will be isolated from any changes made to the global environment by the loaded page.
      //The Electron API will only be available in the preload script and not the loaded page.
      //This option should be used when loading potentially untrusted remote content to ensure the loaded content cannot
      //tamper with the preload script and any Electron APIs being used.
      worldSafeExecuteJavaScript: true, //If true, values returned from webFrame.executeJavaScript will be sanitized to ensure JS
      //values can't unsafely cross between worlds when using contextIsolation
      preload: preload ? path.join(__dirname, payload) : null,
      v8CacheOptions: "bypassHeatCheckAndEagerCompile",
      /**
       * v8CacheOptions String (optional) - Enforces the v8 code caching policy used by blink. Accepted values are
       * none - Disables code caching
       * code - Heuristic based code caching
       * bypassHeatCheck - Bypass code caching heuristics but with lazy compilation
       * bypassHeatCheckAndEagerCompile - Same as above except compilation is eager. Default policy is code.
       */
    },
  });

  if (loadurl == "none") {
    return window;
  } else {
    window.loadURL(loadurl);
    return window;
  }
}

module.exports = { createWindow };
