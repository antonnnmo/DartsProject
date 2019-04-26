import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import * as Users from './Users';
import * as Game from './Game';
import * as Login from './Login';
import * as Profile from './Profile';
import * as Winner from './Winner';
import * as Liders from './Liders';

export default function configureStore (history, initialState) {
  const reducers = {
      users: Users.reducer,
      game: Game.reducer,
      login: Login.reducer,
      winner: Winner.reducer,
      liders: Liders.reducer,
      profile: Profile.reducer
  };

  const middleware = [
    thunk,
    routerMiddleware(history)
  ];

  // In development, use the browser's Redux dev tools extension if installed
  const enhancers = [];
  const isDevelopment = process.env.NODE_ENV === 'development';
  if (isDevelopment && typeof window !== 'undefined' && window.devToolsExtension) {
    enhancers.push(window.devToolsExtension());
  }

  const rootReducer = combineReducers({
    ...reducers,
    routing: routerReducer
  });

  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware), ...enhancers)
  );
}
