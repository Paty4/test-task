import { combineReducers, createStore } from 'redux';
import mainReducer from './mainReducer';


const redusers = combineReducers({mainReducer});

const store = createStore(redusers);



export default store;