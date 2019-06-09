import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import {
	FACEBOOK_LOGIN_SUCCESS,
	FACEBOOK_LOGIN_FAIL
} from './types';

export const facebookLogin = () => {
	return async (dispatch) => {
		let token = await AsyncStorage.getItem('fb_token');

		if(token) {
			// FB login is done
			dispatch({
				type: FACEBOOK_LOGIN_SUCCESS,
				payload: token
			})
		} else {
			// Start up FB login process
			doFacebookLogin(dispatch);
		}
	}
};

const doFacebookLogin = async (dispatch) => {
	let result = await Facebook.logInWithReadPermissionsAsync('414461119393450', {
		permissions: ['public_profile']
	});

	const { type, token } = result;
	if (type === 'cancel') {
		return dispatch({
			type: FACEBOOK_LOGIN_FAIL
		})
	} else if (type === 'success') {
		await AsyncStorage.setItem('fb_token', token);
		dispatch({
			type: FACEBOOK_LOGIN_SUCCESS,
			payload: token
		})
	}
};