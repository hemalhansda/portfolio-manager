import React from 'react';

import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default class EditProject extends React.Component {
    static navigationOptions = {
        title: 'Edit Project',
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

    componentDidMount() {
        console.log('props: ', this.props.navigation.state.params);
    }

    render() {
        return (
            <View>
                <Text> Hello World </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({

});