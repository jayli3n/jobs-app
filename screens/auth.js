import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import {
	facebookLogin
} from '../actions';

class AuthScreen extends Component {
	componentDidMount() {
		this.props.facebookLogin();
		this.onAuthComplete(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.onAuthComplete(nextProps);
	}

	onAuthComplete(props) {
		if(props.token) {
			this.props.navigation.navigate('main');
		}
	}

	render() {
		return (
			<View>
				<Text>Please Login through Facebook</Text>
			</View>
		)
	}
}

const mapStateToProps = (state) => {
	const { auth } = state;
	return {
		token: auth.token
	};
}

export default connect(mapStateToProps, { facebookLogin })(AuthScreen);
