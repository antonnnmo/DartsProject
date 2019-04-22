const decrementCountType = 'DECREMENT_COUNT';
const loadUsersType = 'LOAD_USERS';
const selectUserType = 'SELECT_USER';
const unselectUserType = 'UNSELECT_USER';
const redirect = 'REDIRECT';
const cleanRedirect = 'CLEAN_REDIRECT';
const forgetRedirect = 'FORGET_REDIRECT';
const initialState = { users: [], selectedUsers: [], isRedirect: false, redirectPage: '' };

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
    },

    startGame: (users) => async (dispatch, getState) => {
        var token = localStorage.getItem("token");
        fetch('api/Game/create', {
            method: 'POST',
            body: JSON.stringify({ Users: users }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then((res: any) => {
            res.json().then((result) => {
                //TODO добавить передачу id игры
                dispatch({ type: cleanRedirect, page: 'activeGame'});
            })
        }).catch((err: any) => console.log(err));
    },

    forgetRedirect: () => ({ type: forgetRedirect }),
};

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === selectUserType) {
        state.selectedUsers.push(action.userId);
        return { ...state, selectedUsers: state.selectedUsers, date: new Date() };
    }

    if (action.type === unselectUserType) {
        state.selectedUsers.splice(state.selectedUsers.indexOf(action.userId), 1)
        return { ...state, selectedUsers: state.selectedUsers,date: new Date() };
    }

    if (action.type === loadUsersType) {
        return { ...state, users: action.users };
    }

    if (action.type === forgetRedirect) {
        return { ...state, isRedirect: false };
    }

    if (action.type === redirect) {
        return { ...state, isRedirect: true, redirectPage: action.page};
    }

    if (action.type === cleanRedirect) {
        return { ...initialState, isRedirect: true, redirectPage: action.page };
    }

    if (action.type === decrementCountType) {
        return { ...state, count: state.count - 1 };
    }

    return state;
};
