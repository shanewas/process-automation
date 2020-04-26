export const loadHeaderAction =(headers,path) =>{
    return {type:"LOAD_HEADERS",headers,path}
}

export function ChangeHeaderAction(index){
    return{type:"CHANGE_HEADER",index}
}

export function UseHeaderAction(){
    return{type:"USE_HEADER"}
}

export function UnselectHeaderAction(index){
    return{type:"UNSELECT_HEADER",index}
}

export function SendProcessAction(process){
    return{type:"SEND_PROCESS",process}
}
export function editProcessAction(process){
    return{type:"SEND_PROCESS",process}
}
export function selectBotAction(bot){
    return{type:"SELECT_BOT",bot}
}