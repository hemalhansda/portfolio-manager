import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Modal,
    TouchableHighlight,
    Alert,
    TextInput,
} from 'react-native';

export default class CreateProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return(
            <View style={styles.formContainer}>
                <Text>Enter Title</Text>
                <TextInput style={styles.titleInput}></TextInput>
                <Text>Enter Description</Text>
                <TextInput style={styles.titleInput}></TextInput>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    formContainer: {
        padding: 20,
        margin: 20,
    },
    titleInput: {
        backgroundColor: 'grey',
        borderBottomColor: 'black'
    },
});