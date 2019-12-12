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

// import ImagePicker from 'react-native-image-crop-picker';

import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

export default class CreateProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: undefined
        };
    }

    handleChoosePhoto = async (imageOpt) => {
        // if (imageOpt === 'gallery') {
        //     ImagePicker.openPicker({
        //         width: 300,
        //         height: 400,
        //         cropping: true
        //     }).then(image => {
        //         console.log(image);
        //     });
        // } else if (imageOpt === 'camera') {
        //     ImagePicker.openCamera({
        //         width: 300,
        //         height: 400,
        //         cropping: true,
        //       }).then(image => {
        //         console.log(image);
        //       });
        // } else {
        //     Alert.alert('Failure! Can\'t do this operation right now.');
        // }

        if (imageOpt === 'gallery') {
            this._pickImage();
        } else if (imageOpt === 'camera') {
            this._pickCamera();
        } else {
            Alert.alert('Failure! Can\'t do this operation right now.');
        }
    }

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [3, 4],
          quality: 1,
          base64: true
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          this.setState({ image: result.uri });
        }
    };

    _pickCamera = async () => {
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [3, 4],
          quality: 1,
          base64: true
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          this.setState({ image: result.uri });
        }
    };

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
    }

    componentDidMount() {
        this.getPermissionAsync();
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
                <Card style={styles.subFormTwo}>
                    <View style={styles.imageButton}>
                        <Button
                            color="#454545"
                            title="Upload Photo" onPress={() => this.handleChoosePhoto('gallery')} />
                    </View>
                    <View style={styles.imageButton}>
                        <Button
                            color="#454545"
                            title="Camera" onPress={() => this.handleChoosePhoto('camera')} />
                    </View>
                </Card>
                <Button
                    color="#454545"
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
    subFormTwo: {
        marginBottom: 100,
        padding: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 80,
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
    imageButton: {
        width: '40%',
        margin: 5,
    }
});