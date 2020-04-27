const initState={
    headers:[],
    selectedHeader:null,
    status:[],
    filepath:null,
    process:[],
    botName:null,
    prevStatus:null
}

const loadHeaders = (state,headers,path) =>{
            const headerExample=headers
            const status = new Array(headerExample.length).fill("notSelected");
            return {
                ...state,
                headers:headerExample,
                status:status,
                filepath:path
            }

}
const changeHeaders = (state,index) =>{
    if(state.selectedHeader===null)
    {
        const newstatus = [...state.status];
        const prev=newstatus[index]
        newstatus[index]="changing";
        return {
            ...state,
            status:newstatus,
            selectedHeader:index,
            prevStatus:prev
        }
    }
    else
    {
        if(index===state.selectedHeader)
        {
            return{
                ...state
            }
        }
        else{
            
        const newstatus = [...state.status];
        const prev=newstatus[index]
        newstatus[index]="changing";
        newstatus[state.selectedHeader]=state.prevStatus;
        return {
            ...state,
            status:newstatus,
            selectedHeader:index,
            prevStatus:prev

        }
        }
        
    }

}
const selectHeaders = (state) =>{
    const newstatus = [...state.status];
    newstatus[state.selectedHeader]="used";
    
    return {
        ...state,
        status:newstatus,
        selectedHeader:null
    }

}

const UnselectHeader = (state,index) =>{
    const newstatus = [...state.status];
        newstatus[index]="notSelected";
        return {
            ...state,
            status:newstatus,
        }
}
const EntryProcess = (state,process) =>{
    const newprocess = [...state.process,process];
        return {
            ...state,
            process:newprocess,
        }
}
const editProcess = (state,process) =>{
        return {
            ...state,
            process:process,
        }
}


const rootReducer = (state=initState,action) =>{

    console.log(action.type)

    switch(action.type) {
        case "LOAD_HEADERS":
            return loadHeaders(state,action.headers,action.path)
        case "CHANGE_HEADER":
            return changeHeaders(state,action.index)
        case "USE_HEADER":
            return selectHeaders(state) 
        case "UNSELECT_HEADER":
            return UnselectHeader(state,action.index)
        case "SEND_PROCESS":
        return EntryProcess(state,action.process)
        case "EDIT_PROCESS":
        return editProcess(state,action.process)
        default:
        return state
      }
    
}
export default rootReducer

