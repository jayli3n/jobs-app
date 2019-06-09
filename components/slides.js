import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Slides extends Component {
	renderSlides() {
		const { data, onComplete } = this.props;
		return data.map((slide, index) => {
			return (
				<View key={index} style={[styles.slideStyle, {backgroundColor: slide.color}]}>
					<Text style={styles.textStyle}>{slide.text}</Text>
					{index === data.length - 1 ? <Button title={'Click Me'} buttonStyle={styles.buttonStyle} onPress={onComplete} raised /> : null}
				</View>
			)
		});
	}

	render() {
		return (
			<ScrollView
				horizontal
				pagingEnabled
				style={styles.containerStyle}
			>
				{this.renderSlides()}
			</ScrollView>
		)
	}
}

const styles = {
	textStyle: {
		fontSize: 45,
		textAlign: 'center',
		color: 'white',
		marginBottom: 20
	},
	slideStyle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		width: SCREEN_WIDTH,
		padding: 20
	},
	containerStyle: {
		height: '100%'
	},
	buttonStyle: {
		backgroundColor: '#0288d1',
	}
}

export default Slides;
