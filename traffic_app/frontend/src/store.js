//redux helps giving each frontend component the exact piece 
// of state it needs
//middleware = logiciel mediateur (can hold business logic inside) fetching
// you can avoid redux by using :children props , context API
//redux have a cost : it adds another layer of abstraction
//a state management library for javascript
//APP STATE : *Model opened/closed
//             *Element clicked
//             *Visible DATA
//             *User did X,closed Y
//             *DATA ready/errored

import { createStore, applyMiddleware }  from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';//look for index.js inside reducer

const initialState = {};

const middleware = [thunk];
//store = redux brain (contain reducers = function produse the state)
const store = createStore (
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);
//main redux method : * store.dispatch()
//                    * store.subscribe()
//                    * store.getState()

export default store;
