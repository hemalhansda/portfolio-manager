import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

export default class WorkOn extends React.Component {
    static navigationOptions = {
        title: 'Manage Skills',
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