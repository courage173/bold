import { combineReducers } from 'redux';
import ui from './ui';
import user from './user';
import scholarship from './scholarship';

const rootReducer = combineReducers({
    ui,
    user,
    scholarship,
});

export default rootReducer;
