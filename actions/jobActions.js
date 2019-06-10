import axios from 'axios';
import reverseGeoCode from 'latlng-to-zip';
import qs from 'qs';
import {
	FETCH_JOBS
} from './types';

// Indeed API: 4201738803816157
const JOB_ROOT_URL = 'https://api.indeed.com/ads/apisearch?';
const JOB_QRY_PARAMS = {
	publisher: '4201738803816157',
	format: 'json',
	v: '2',
	latlong: 1,
	radius: 10,
	q: 'javascript'
};

const buildJobUrl = (zip) => {
	const query = qs.stringify({...JOB_QRY_PARAMS, l: zip});
	return `${JOB_ROOT_URL}${query}`;
};

export const fetchJobs = (region, callback) => {
	return async (dispatch) => {
		try {
			let zip = await reverseGeoCode(region);
			let { data } = await axios.get(buildJobUrl(zip));
			console.log(data)
			dispatch({
				type: FETCH_JOBS,
				payload: data
			})
			callback();
		} catch(e) {
			console.error(e);
		}
	}
};
