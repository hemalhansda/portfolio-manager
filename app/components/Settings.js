import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

export default class Settings extends React.Component {
    static navigationOptions = {
        title: 'Settings',
        headerStyle: {
          backgroundColor: '#614e7a',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View>
                <Text>
                    Hello World
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({

});