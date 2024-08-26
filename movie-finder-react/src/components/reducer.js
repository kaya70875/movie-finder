const initalState = {
    searchQuery : '',
    isFocus : false,
};

function reducer(state , action){
    switch(action.type){
        case 'SET_SEARCH_QUERY':
            return {...state , searchQuery : action.payload , dropdownContentVisible : true};
        case 'TOGGLE_FOCUS':
            return {...state , isFocus : action.payload};

        default:
            return state;
    }
}

export {initalState , reducer};