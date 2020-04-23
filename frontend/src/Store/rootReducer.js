const initState={
    headers:[],
    datasets : ["Cradit Card data","Transaction data","ATM Data"],
    selectedHeader:null,
    status:[]
}

const loadHeaders = (state) =>{
            const headerExample=["Firstname","Lastname","Email id","Transaction Id","Date of birth"]
            const status = new Array(headerExample.length).fill("notSelected");
            return {
                ...state,
                headers:headerExample,
                status:status
            }

}
const changeHeaders = (state,index) =>{
    if(state.selectedHeader===null)
    {
        const newstatus = [...state.status];

        newstatus[index]="changing";
        return {
            ...state,
            status:newstatus,
            selectedHeader:index
        }
    }
    else
    {
        const newstatus = [...state.status];
        newstatus[index]="changing";
        newstatus[state.selectedHeader]="notSelected";
        return {
            ...state,
            status:newstatus,
            selectedHeader:index
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
const rootReducer = (state=initState,action) =>{

    console.log(action.type)

    switch(action.type) {
        case "LOAD_HEADERS":
            return loadHeaders(state)
        case "CHANGE_HEADER":
            return changeHeaders(state,action.index)
        case "USE_HEADER":
            return selectHeaders(state) 
        case "UNSELECT_HEADER":
            return UnselectHeader(state,action.index)
        default:
            return state
      }
    
}
export default rootReducer

