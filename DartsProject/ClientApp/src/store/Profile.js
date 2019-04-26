const loadProfile = 'LOAD_PROFILE';
const updatePlayer = 'UPDATE_PLAYER';
const updateScore = 'UPDATE_SCORE';
const initialState = { profileInfo: {}};

export const actionCreators = {
    loadData: () => async (dispatch, getState) => {
        var token = localStorage.getItem("token");
        fetch('api/Users/getInfo', {
            method: 'GET',
            body: null,
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(function (res) {
            if (res.status === 401) {
                dispatch({ type: 'REDIRECT', page: '/login' });
            }
            else {
                res.json().then((result) => {
                    dispatch({ type: loadProfile, result});
                }).catch((err) => console.log(err));
            }
        });
    },

    uploadAvatar: (file) => async (dispatch, getState) => {
        var token = localStorage.getItem("token");
        var data = new FormData()
        data.append('file', file);
        fetch('api/Image/AddAvatar', {
            method: 'POST',
            body: data,
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(function (res) {
            if (res.status === 401) {
                dispatch({ type: 'REDIRECT', page: '/login' });
            }
            else {
                res.json().then((result) => {
                    alert("Да ты прям крут!");
                }).catch((err) => console.log(err));
            }
        });
    },
};

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === loadProfile) {
        return { ...state, profileInfo: action.result };
    }
    
        /*if (action.type === unselectUserType) {
            state.selectedUsers.splice(state.selectedUsers.indexOf(action.userId), 1)
            return { ...state, selectedUsers: state.selectedUsers, date: new Date() };
        }
    
        if (action.type === loadUsersType) {
            return { ...state, users: action.users };
        }
    
        if (action.type === decrementCountType) {
            return { ...state, count: state.count - 1 };
        }*/

    return state;
};
