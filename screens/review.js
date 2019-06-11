import React, { Component } from 'react';
import { View, Text, ScrollView, Linking } from 'react-native';
import { Button, Card } from 'react-native-elements';
import { MapView } from 'expo';
import { connect } from 'react-redux';

class ReviewScreen extends Component {
	renderLikedJobs() {
		return this.props.likedJobs.map(job => {
			const { jobtitle, jobkey, company, formattedRelativeTime, url, latitude, longitude } = job;
			const initialRegion = {
				latitude,
				longitude,
				latitudeDelta: 0.045,
				longitudeDelta: 0.02
			}
			return (
				<Card key={jobkey} title={jobtitle}>
					<View style={{ height: 200 }}>
						<MapView 
							style={{ flex: 1 }}
							cachedEnabled={true}
							scrollEnabled={false}
							initialRegion={initialRegion}
						/>
						<View style={{ marginBottom: 10, marginTop: 10, flexDirection: 'row', justifyContent: 'space-around' }}>
							<Text style={{ fontStyle: 'italic' }}>{company}</Text>
							<Text style={{ fontStyle: 'italic' }}>{formattedRelativeTime}</Text>
						</View>
						<Button 
							title='Apply Now'
							backgroundColor='#03A9F4'
							onPress={() => Linking.openURL(url)}
						/>
					</View>
				</Card>
			)
		})
	}

	render() {
		return (
			<ScrollView>
				{this.renderLikedJobs()}
			</ScrollView>
		)
	}
}



const mapStateToProps = ({ likedJobs }) => {
	return {
		likedJobs
	}
}

export default connect(mapStateToProps)(ReviewScreen);
