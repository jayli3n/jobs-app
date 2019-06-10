import { combineReducers } from'redux';
import auth from './authReducer';
import jobs from './jobsReducers';

export default combineReducers({
	auth: auth,
	jobs:jobs
})