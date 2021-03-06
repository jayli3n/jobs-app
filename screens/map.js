import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import { MapView } from 'expo';
import { connect } from 'react-redux';
import {
	fetchJobs
} from '../actions'

class MapScreen extends Component {
	state = {
		mapLoaded: false,
		region: {
			longitude: -122,
			latitude: 37,
			longitudeDelta: 0.04,
			latitudeDelta: 0.09
		}
	}

	componentDidMount() {
		this.setState({mapLoaded: true});
	}

	onRegionChangeComplete(region) {
		this.setState({region});
	}

	searchArea() {
		this.props.fetchJobs(this.state.region, () => this.props.navigation.navigate('deck'));
	}

	render() {
		if (!this.state.mapLoaded){
			return (
				<View style={{flex: 1, justifyContent: 'center'}}>
					<ActivityIndicator size='large' />
				</View>
			)
		}

		return (
			<View style={{flex: 1}}>
				<MapView 
					style={{flex: 1}}
					region={this.state.region}
					onRegionChangeComplete={(region) => this.onRegionChangeComplete(region)}
				/>
				<View style={{ position: 'absolute', bottom: 20, left: 0, right: 0 }}>
					<Button
						large
						title='Search this area'
						backgroundColor='#009688'
						icon={{ name: 'search' }}
						onPress={() => this.searchArea()}
					/>
				</View>
			</View>
		)
	}
}

export default connect(null, { fetchJobs })(MapScreen);
