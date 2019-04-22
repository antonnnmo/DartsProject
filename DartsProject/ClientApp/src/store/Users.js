const decrementCountType = 'DECREMENT_COUNT';
const loadUsersType = 'LOAD_USERS';
const selectUserType = 'SELECT_USER';
const unselectUserType = 'UNSELECT_USER';
const initialState = { users: [], selectedUsers: [] };

export const actionCreators = {
    loadData: () => async (dispatch, getState) => {
        const url = `api/Users`;
        const response = await fetch(url);
        const users = await response.json();

        dispatch({ type: loadUsersType, users });
    },
    loadUsers: () => ({ type: loadUsersType }),
    decrement: () => ({ type: decrementCountType }),

    handleSelected: (userId, isSelected) => async (dispatch, getState) => {
        if (isSelected) {
            dispatch({ type: selectUserType, userId });
        }
        else {
            dispatch({ type: unselectUserType, userId });
        }
    }
};

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === selectUserType) {
        state.selectedUsers.push(action.userId);
        return { ...state, selectedUsers: state.selectedUsers,date: new Date() };
    }

    if (action.type === unselectUserType) {
        state.selectedUsers.splice(state.selectedUsers.indexOf(action.userId), 1)
        return { ...state, selectedUsers: state.selectedUsers,date: new Date() };
    }

    if (action.type === loadUsersType) {
        return { ...state, users: action.users };
    }

    if (action.type === decrementCountType) {
        return { ...state, count: state.count - 1 };
    }

    return state;
};
