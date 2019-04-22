const loadGame = 'LOAD_GAME';
const updatePlayer = 'UPDATE_PLAYER';
const updateScore = 'UPDATE_SCORE';
const initialState = { number: 0, gameInfo: [] };

export const actionCreators = {
    loadGameData: () => async (dispatch, getState) => {
        const url = `api/Game`;
        const response = await fetch(url);
        const gameInfo = await response.json();

        dispatch({ type: loadGame, gameInfo });
    },

    shot: (score, scoreType, gameId) => async (dispatch, getState) => {
        var token = localStorage.getItem("token");
        fetch('api/Game/shot', {
            method: 'POST',
            body: JSON.stringify({ score, scoreType, gameId }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then((res: any) => {
            res.json().then((result) => {
                if (result.result === 2) {
                    dispatch({ type: updatePlayer, newPlayer: result.nextPlayer, score: result.score, oldScore: result.oldScore, legIncrement: result.legIncrement });
                }
                else if (result.result === 0) {
                    dispatch({ type: updateScore, newScore: result.score });
                }
            })
        }).catch((err: any) => console.log(err));
    }
};

export const reducer = (state, action) => {
    state = state || initialState;
    var gameInfo = state.gameInfo;
    if (action.type === loadGame) {
        return { ...state, gameInfo: action.gameInfo };
    }

    if (action.type === updatePlayer) {
        gameInfo.users.find(u => u.id === gameInfo.currentUserId).score = action.oldScore;
        gameInfo.currentUserId = action.newPlayer;
        gameInfo.currentTempScore = action.score;
        gameInfo.currentLeg = gameInfo.currentLeg + action.legIncrement;
        return { ...state, gameInfo: gameInfo, date: new Date() };
    }

    if (action.type === updateScore) {
        gameInfo.currentTempScore = action.newScore;
        return { ...state, gameInfo: gameInfo, date: new Date() };
    }

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
