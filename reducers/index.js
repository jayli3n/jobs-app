import { combineReducers } from'redux';
import auth from './authReducer';
import jobs from './jobsReducers';
import likedJobs from './likesReducer';

export default combineReducers({
	auth,
	jobs,
	likedJobs
})