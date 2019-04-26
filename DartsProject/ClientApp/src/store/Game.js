const loadGame = 'LOAD_GAME';
const updatePlayer = 'UPDATE_PLAYER';
const updatePlayerBack = 'UPDATE_PLAYER_BACK';
const endGame = 'ENDGAME';
const finishGame = 'FINISH_GAME';
const updateScore = 'UPDATE_SCORE';
const initialState = { number: 0, gameInfo: [], isEndGame: false };

export const actionCreators = {
    loadGameData: () => async (dispatch, getState) => {
        const url = `api/Game`;
        const response = await fetch(url);
        const gameInfo = await response.json();

        dispatch({ type: loadGame, gameInfo });
    },

    cancelLastShot: (gameId) => async (dispatch, getState) => {
        var token = localStorage.getItem("token");
        fetch('api/Game/cancelLastShot', {
            method: 'POST',
            body: JSON.stringify({ gameId }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then((res: any) => {
            res.json().then((result) => {
                if (result.result === 2) {
                    dispatch({ type: updatePlayerBack, newPlayer: result.nextPlayer, score: result.score, oldScore: result.oldScore, legIncrement: result.legIncrement, shots: result.shots });
                }
                else if (result.result === 0) {
                    dispatch({ type: updateScore, newScore: result.score, shots: result.shots });
                }
                else if (result.result === 1) {
                    document.location = `/winner?gameId={gameId}`;
                }
                else if (result.result === 3) {
                    dispatch({ type: endGame });
                }
            })
        }).catch((err: any) => console.log(err));
    },

    winGame: (userId, gameId) => async (dispatch, getState) => {
        var token = localStorage.getItem("token");
        fetch('api/Game/win', {
            method: 'POST',
            body: JSON.stringify({ userId, gameId }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then((res: any) => {
            res.json().then((result) => {
                if (result.result === 1) {
                    document.location = `/winner?gameId={gameId}`;
                }
            })
        }).catch((err: any) => console.log(err));
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
                    dispatch({ type: updatePlayer, newPlayer: result.nextPlayer, score: result.score, oldScore: result.oldScore, legIncrement: result.legIncrement, shots: [] });
                }
                else if (result.result === 0) {
                    dispatch({ type: updateScore, newScore: result.score, shots: result.shots });
                }
                else if (result.result === 1) {
                    document.location = `/winner?gameId={gameId}`;
                }
                else if (result.result === 3) {
                    dispatch({ type: endGame });
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

    if (action.type === updatePlayerBack) {
        if (action.oldScore > -1) {
            gameInfo.users.find(u => u.id === action.newPlayer).score = action.oldScore;
        }
        gameInfo.currentUserId = action.newPlayer;
        gameInfo.currentTempScore = action.score;
        gameInfo.currentLeg = gameInfo.currentLeg + action.legIncrement;
        gameInfo.shots = action.shots;
        return { ...state, gameInfo: gameInfo, date: new Date() };
    }

    if (action.type === updatePlayer) {
        if (action.oldScore > -1) {
            gameInfo.users.find(u => u.id === gameInfo.currentUserId).score = action.oldScore;
        }
        gameInfo.currentUserId = action.newPlayer;
        gameInfo.currentTempScore = action.score;
        gameInfo.currentLeg = gameInfo.currentLeg + action.legIncrement;
        gameInfo.shots = action.shots;
        return { ...state, gameInfo: gameInfo, date: new Date() };
    }

    if (action.type === updateScore) {
        gameInfo.currentTempScore = action.newScore;
        gameInfo.shots = action.shots;
        return { ...state, gameInfo: gameInfo, date: new Date() };
    }

    if (action.type === endGame) {
        
        return { ...state, isEndGame: true };
    }

    if (action.type === finishGame) {

        return { ...state, isEndGame: false };
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
