import React, { Component } from 'react';
import { View, Text, MapView } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import Swipe from '../components/swipe';
import { likeJob } from '../actions';

class DeckScreen extends Component {
	renderCard(job) {
		const { jobkey, jobtitle, company, formattedRelativeTime, snippet, longitude, latitude } = job;
		<Card title={jobtitle} >
			<View style={{ height: 300 }}>
				<MapView 
					style={{ flex: 1 }}
					scrollEnabled={false}
					cacheEnabled={true}
					initialRegion={ {longitude, latitude, longitudeDelta: 0.045, latitudeDelta: 0.02 }}
				>
				</MapView>
			</View>
			<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
				<Text>{company}</Text>
				<Text>{formattedRelativeTime}</Text>
			</View>
			<Text>{snippet.replace(/<b>/g, '').replace(/<\/b/,'')}</Text>
		</Card>
	}

	renderNoMoreCards() {
		return (
			<Card title='No more jobs'>
			</Card>
		)
	}

	render() {
		return (
			<View>
				<Swipe 
					data={this.props.jobs}
					renderCard={this.renderCard}
					renderNoMoreCards={this.renderNoMoreCards}
					onSwipeRight={job => this.props.likeJob(job)}
				/>
			</View>
		)
	}
}

const mapStateToStates = ({ jobs }) => {
	return {
		jobs: jobs.results
	}
}

export default connect(mapStateToStates, { likeJob })(DeckScreen);
