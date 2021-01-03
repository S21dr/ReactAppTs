import profileReducer from './profileReducer'
import messagesReducer from './messagesReducer'
import frendsReducer from './frendsReducer'
import authReducer from './auth-reducer';
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form'
import appReducer from './appReducer';
const { combineReducers, createStore, applyMiddleware } = require("redux");



let rootReducer = combineReducers(
    {
        app: appReducer,
        profilePage: profileReducer,
        messagesPage: messagesReducer,
        frendsPage: frendsReducer,
        auth: authReducer,
        form: formReducer,
    }
);

type rootReducer = typeof rootReducer

export type AppStateType = ReturnType<rootReducer>

let store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

//@ts-ignore
window.state = store;

export default store;