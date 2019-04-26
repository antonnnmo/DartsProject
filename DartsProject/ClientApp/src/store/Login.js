const loadGame = 'LOAD_GAME';
const updatePlayer = 'UPDATE_PLAYER';
const updateScore = 'UPDATE_SCORE';
const initialState = { };

export const actionCreators = {
    register: (login, pwd, synonym, name) => async (dispatch, getState) => {
        fetch('api/Identity/Register', {
            method: 'POST',
            body: JSON.stringify({ Name: login, Password: pwd, Synonym: synonym, UserName: name }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            if (res.status === 401) {
                alert("АШИПКА. ПРОВЕРЬ ПАРОЛЬ ИЛИ ЗАРЕГИСТРИРУЙСЯ");
            }
            else {
                res.json().then((result) => {
                    localStorage.setItem("token", result.token);

                    if (result.isError) {
                        alert(result.errorMessage);
                    }
                    else {
                        //localStorage.setItem("contactName", result.name);
                        var tokenExpiredOnDate = new Date();
                        tokenExpiredOnDate.setMinutes(tokenExpiredOnDate.getMinutes() + 30 * 60);
                        localStorage.setItem("tokenExpiredOn", tokenExpiredOnDate.getTime().toString());
                        localStorage.setItem("userId", result.id);
                        document.location.reload();
                    }
                });
            }
        }).catch((err: any) => console.log(err));
    },

    login: (login, pwd) => async (dispatch, getState) => { 
        fetch('api/Identity/Token', {
            method: 'POST',
            body: JSON.stringify({ Name: login, Password: pwd }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            if (res.status === 401) {
                alert("АШИПКА. ПРОВЕРЬ ПАРОЛЬ ИЛИ ЗАРЕГИСТРИРУЙСЯ");
            }
            else {
                res.json().then((result) => {
                    localStorage.setItem("token", result.token);
                    //localStorage.setItem("contactName", result.name);
                    var tokenExpiredOnDate = new Date();
                    tokenExpiredOnDate.setMinutes(tokenExpiredOnDate.getMinutes() + 30*60);
                    localStorage.setItem("tokenExpiredOn", tokenExpiredOnDate.getTime().toString());
                    localStorage.setItem("userId", result.id);
                    document.location.reload();
                });
            }
        }).catch((err: any) => console.log(err));
    },
};

export const reducer = (state, action) => {
    state = state || initialState;

    /*    if (action.type === selectUserType) {
            state.selectedUsers.push(action.userId);
            return { ...state, selectedUsers: state.selectedUsers, date: new Date() };
        }
    
        if (action.type === unselectUserType) {
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
