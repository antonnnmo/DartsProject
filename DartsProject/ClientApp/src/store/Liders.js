const loadLidersType = 'LOAD_LIDERS';
const initialState = { info: {} };

export const actionCreators = {
    loadData: () => async (dispatch, getState) => {
        const url = `api/Liders`;
        const response = await fetch(url);
        const info = await response.json();

        dispatch({ type: loadLidersType, info });
    }
};

export const reducer = (state, action) => {
    state = state || initialState;
    
    if (action.type === loadLidersType) {
        return { ...state, info: action.info };
    }
    

    return state;
};
