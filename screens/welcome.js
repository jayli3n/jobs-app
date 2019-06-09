import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import Slides from '../components/slides';

const SLIDE_DATA = [
	{ text: 'Welcome to JobApp', color: '#03a9f4' },
	{ text: 'Use this to get hired', color: '#009688' },
	{ text: 'Set your location, then swipe away', color: '#03a9f4' }
];

class WelcomeScreen extends Component {
	state = {
		isToken: null
	}

	async componentWillMount() {
		let token = await AsyncStorage.getItem('fb_token');
		if (token) {
			this.props.navigation.navigate('main');
		} else {
			this.setState({
				isToken: false
			});
		}
	}

	onSlidesComplete() {
		this.props.navigation.navigate('auth');
	}

	render() {
		if(this.state.isToken === null){
			return (
				<AppLoading />
			)
		} else if (this.state.isToken === false){
			return (
				<View>
					<Slides data={SLIDE_DATA} onComplete={() => this.onSlidesComplete()} />
				</View>
			)
		} else {
			return null
		}
	}
}

export default WelcomeScreen;
