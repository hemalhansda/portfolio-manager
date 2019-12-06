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
    Button,
} from 'react-native';

import Textarea from 'react-native-textarea';

import { Card } from 'react-native-shadow-cards';

export default class CreateProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return(
            <View style={styles.formContainer}>
                <Card style={styles.subForm}>
                    <Text>T I T L E</Text>
                    <TextInput style={styles.titleInput} placeholder="Enter the title"></TextInput>
                    <Text>D E S C R I P T I O N</Text>
                    <Textarea
                        containerStyle={styles.textareaContainer}
                        style={styles.textarea}
                        onChangeText={this.onChange}
                        defaultValue={this.state.text}
                        maxLength={120}
                        placeholderTextColor={'#c7c7c7'}
                        underlineColorAndroid={'transparent'}
                        placeholder="Enter the description"></Textarea>
                </Card>
                <Button
                    style={styles.submitButton}
                    title="Submit Project"
                    onPress={() => Alert.alert('Simple Button pressed')}
                    />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    formContainer: {
        padding: 20,
        margin: 20,
        height: '95%',
        flex: 1,
        display: 'flex',
    },
    subForm: {
        marginBottom: 100,
        padding: 10,
        width: '100%',
    },
    titleInput: {
        backgroundColor: '#e8e8e8',
        borderBottomColor: 'black',
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 5,
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 14,
        height: 50,
        shadowOffset: {  width: 10,  height: 10,  },
    },
    desInput: {
        backgroundColor: '#e8e8e8',
        borderBottomColor: 'black',
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 5,
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 14,
        height: 80,
        shadowOffset: {  width: 10,  height: 10,  },
        justifyContent: 'flex-start',
    },
    submitButton: {
        padding: 5,
        margin: 40,
        borderRadius: 5,
        height: 100,
        position: 'absolute',
        bottom: 0,
    },
    textareaContainer: {
        height: 100,
        padding: 5,
        borderRadius: 5,
        shadowOffset: {  width: 10,  height: 10,  },
        backgroundColor: '#e8e8e8',
    },
    textarea: {
        textAlignVertical: 'top',  // hack android
        height: 100,
        fontSize: 14,
        color: '#333',
    },
});