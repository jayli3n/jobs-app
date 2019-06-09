import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import {
	facebookLogin
} from '../actions';

class AuthScreen extends Component {
	componentDidMount() {
		this.props.facebookLogin();
	}

	render() {
		return (
			<View>
				<Text>Auth Screen</Text>
				<Text>Auth Screen</Text>
				<Text>Auth Screen</Text>
				<Text>Auth Screen</Text>
				<Text>Auth Screen</Text>
				<Text>Auth Screen</Text>
			</View>
		)
	}
}

export default connect(null, { facebookLogin })(AuthScreen);
