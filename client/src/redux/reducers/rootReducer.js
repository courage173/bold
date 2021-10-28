import { combineReducers } from 'redux';
import ui from './ui';
import user from './user';
import scholarship from './scholarship';
import application from './application';

const rootReducer = combineReducers({
    ui,
    user,
    scholarship,
    application,
});

export default rootReducer;
