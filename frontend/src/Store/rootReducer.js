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
const areotherusing=(state,index,header)=>{
    var newprocess=[...state.process]
    for(var x=0;x<newprocess.length;x++)
    {
        if(x!==index)
        {
            if(newprocess[x].dataHeader===header)
            {
                return true
            }
        }
    }
    return false

}
const selectHeaders = (state,index) =>{
    var newprocess=[...state.process];
    const newstatus = [...state.status];

    if("dataHeader" in newprocess[index] && !areotherusing(state,index,newprocess[index].dataHeader))
    {   
        newstatus[newprocess[index].dataHeaderindex]="notSelected";
    }
    newprocess[index].dataHeader=state.headers[state.selectedHeader]
    newprocess[index].dataHeaderindex=state.selectedHeader
    delete newprocess[index].MenualData
    newstatus[state.selectedHeader]="used";
    
    return {
        ...state,
        status:newstatus,
        selectedHeader:null,
        process:newprocess
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
const clearAll = () =>{
    return {
        headers:[],
        selectedHeader:null,
        status:[],
        filepath:null,
        process:[],
        botName:null,
        prevStatus:null
    }
}
const clearFlowchart = (state) =>{

    const status = new Array(state.headers.length).fill("notSelected");
    return {
        ...state,
        process:[],
        status:status,


    }
}
const clearDataset = (state) =>{
    return {
        ...state,
        filepath:null,
        prevStatus:null,
        headers:[],
        selectedHeader:null,
        status:[],

    }
}
const removeStep = (state,index,num_of_step) =>{
    let newprocess = [...state.process];
    newprocess.splice(index,num_of_step)
    return {
        ...state,
        process:newprocess
    }
}

const loadBot = (state,bot) =>{
    return {
        ...state,
        headers:bot.header,
        status:bot.status,
        filepath:bot.filepath,
        selectedHeader:null,
        prevStatus:null,
        botName:bot.botName,
        process:bot.process



    }
}
const menualEntryData = (state,data,index) =>{
    let newprocess = [...state.process];
    newprocess[index].MenualData=data
    const newstatus = [...state.status];
    if("dataHeader" in newprocess[index])
    {
        if( !areotherusing(state,index,newprocess[index].dataHeader))
        {   
            newstatus[newprocess[index].dataHeaderindex]="notSelected";

        }
        delete newprocess[index].dataHeader
        delete newprocess[index].dataHeaderindex
    }
    return {
        ...state,
        process:newprocess,
        status:newstatus
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
            return selectHeaders(state,action.index) 
        case "UNSELECT_HEADER":
            return UnselectHeader(state,action.index)
        case "SEND_PROCESS":
            return EntryProcess(state,action.process)
        case "EDIT_PROCESS":
            return editProcess(state,action.process)
        case "CLEAR_All":
            return clearAll()
        case "CLEAR_FLOWCHART":
            return clearFlowchart(state)
        case "CLEAR_DATASET":
            return clearDataset(state)
        case "REMOVE_STEP":
            return removeStep(state,action.index,action.num_of_step)
        case "LOAD_BOT":
            return loadBot(state,action.bot)
        case "MENUAL_ENTRY":
            return menualEntryData(state,action.data,action.processIndex)
        default:
        return state
      }
    
}
export default rootReducer

