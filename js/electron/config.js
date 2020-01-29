const menu = require('./menu')

//if mac add empty onject with menu
function config(){
    if (process.platform == 'darwin'){
        menu.mainMenuTempate.unshift({})
    }
    
    //Add developer tools inf not in prod
    if(process.env.NODE_ENV !== 'production'){
        menu.mainMenuTempate.push({
            label: 'Developer Tools',
            submenu: [
                {
                    label: 'Toggle DevTools',
                    accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                    click(item, focusedWindow){
                        focusedWindow.toggleDevTools()
                    }
                },
                {
                    role: 'reload'
                }
            ]
        })
    }
}

module.exports = {config}