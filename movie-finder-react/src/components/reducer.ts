const initalState = {
    searchQuery : '',
    isFocus : false,
    dropdownContentVisible : false,
};

const enum REDUCER_ACTION_TYPE {
    SET_SEARCH_QUERY,
    TOGGLE_FOCUS,
}


type ReducerAction = 
    | { type: REDUCER_ACTION_TYPE.SET_SEARCH_QUERY, payload: string }
    | { type: REDUCER_ACTION_TYPE.TOGGLE_FOCUS, payload: boolean };

const reducer = (state : typeof initalState , action : ReducerAction): typeof initalState => {
    switch(action.type){
        case REDUCER_ACTION_TYPE.SET_SEARCH_QUERY:
            return {...state , searchQuery : action.payload , dropdownContentVisible : true};
        case REDUCER_ACTION_TYPE.TOGGLE_FOCUS:
            return {...state , isFocus : action.payload};

        default:
            return state;
    }
}

export {initalState , reducer , REDUCER_ACTION_TYPE};