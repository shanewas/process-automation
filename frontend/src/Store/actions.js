export const loadHeaderAction =() =>{
    return {type:"LOAD_HEADERS"}
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