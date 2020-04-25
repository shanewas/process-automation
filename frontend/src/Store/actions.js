export const loadHeaderAction =(headers) =>{
    return {type:"LOAD_HEADERS",headers}
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