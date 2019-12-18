import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ActivityIndicator,
    Alert,
    TextInput,
    Button,
    Animated,
} from 'react-native';

import styled from 'styled-components';

import Textarea from 'react-native-textarea';
import { Card } from 'react-native-shadow-cards';

import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import noPreview from '../assets/images/no-preview.png';
import Rest from '../services/Rest';

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
        this.state = {
            image: this.props.navigation.state.params.imageUrl,
            imageUri: this.props.navigation.state.params.imageUrl,
            loader: false,
            errMsg: false,
            description: this.props.navigation.state.params.description,
            title: this.props.navigation.state.params.title,
            titleChng: false,
            descriptionChng: false,
            imageChng: false,
            left: new Animated.Value(900),
        };
    }

    handleChoosePhoto = async (imageOpt) => {
        this.setState({imageUri: undefined, imageChng: true});
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
    
        if (!result.cancelled) {
            this.setState({
                image: result.base64,
                imageUri: result.uri,
                imageSrc: {
                  uri: result.uri
                },
                errMsg: false
            }, () => {
            //   console.log('image: ', 'data:image/jpeg;base64,' + this.state.image);
            });
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
    
        if (!result.cancelled) {
          this.setState({
                image: result.base64,
                imageUri: result.uri,
                imageSrc: {
                  uri: result.uri
                },
                errMsg: false
            }, () => {
            //   console.log('image: ', 'data:image/jpeg;base64,' + this.state.image);
          });
        }
    };

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
    };

    componentDidMount() {
        this.getPermissionAsync();
        Animated.spring(this.state.left, {
            toValue: 0
        }).start();
    }

    constructProject = async () => {
        if (!this.state.title.length || !this.state.description.length || !this.state.imageUri.length) {
            this.setState({errMsg: true});
            return;
        }
        let query = {
            id: this.props.navigation.state.params._id,
            title: this.state.title,
            description: this.state.description,
            image: this.state.imageUri
        };

        if (!this.state.imageChng) {
            delete query.image;
        }
        if (!this.state.titleChng) {
            delete query.title;
        }
        if (!this.state.descriptionChng) {
            delete query.description;
        }

        this.setState({loader: true});
        Rest.editProject(query).then((res) => {
            // console.log('res: ', res.data);
            this.setState({loader: false});
            this.props.navigation.state.params.getAllProjects();
            this.props.navigation.navigate('Home');
        }).catch(err => {
            console.log('error: ', err);
        });
    };

    render() {
        return (
            <AnimatedContainer style={{ top: this.state.left }}>
                <Card style={styles.subForm}>
                    <Text>T I T L E</Text>
                    <TextInput 
                        style={styles.titleInput}
                        placeholder="Enter the title"
                        onChangeText={(text) => this.setState({title: text, errMsg: false, titleChng: true})}
                        defaultValue={this.state.title}
                        ></TextInput>
                    <Text>D E S C R I P T I O N</Text>
                    <Textarea
                        containerStyle={styles.textareaContainer}
                        style={styles.textarea}
                        onChangeText={(text) => this.setState({description: text, errMsg: false, descriptionChng: true})}
                        defaultValue={this.state.description}
                        maxLength={300}
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
                <View
                    style={styles.imageCont}
                    >
                    <Card style={styles.cardImage}>
                        <Image
                            style={styles.previewImage}
                            source={this.state.imageUri ? {uri: this.state.imageUri} : noPreview} />
                    </Card>
                </View>
                {
                    this.state.errMsg ? <Text style={styles.errMsgStyle}>Don't leave empty fields</Text> : <Text></Text>
                }
                <View style={styles.buttonCont}>
                    {
                        this.state.loader
                        ? <ActivityIndicator size="large" color="#ba03fc" /> 
                        : <Button
                            color="#454545"
                            style={styles.submitButton}
                            title="Submit Project"
                            onPress={() => this.constructProject()}
                            />
                    }
                </View>
            </AnimatedContainer>
        );
    }
}

const Container = styled.View`
    position: absolute;
    background: #f7f7f7;
    width: 100%;
    height: 100%;
    z-index: 100;
    padding: 20px;
    display: flex;
    alignItems: center;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const styles = StyleSheet.create({
    cardImage: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 190,
        width: 160,
    },
    previewImage: {
        height: 180,
        width: 150,
    },
    imageCont: {
        width: '100%',
        position: 'relative',
        bottom: 75,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    formContainer: {
        padding: 20,
        margin: 20,
        height: '95%',
        flex: 1,
        display: 'flex',
        alignItems: 'center',
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
        position: 'absolute',
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
    },
    buttonCont: {
        position: 'absolute',
        width: 150,
        height: 50,
        bottom: 15,
        margin: 'auto',
        backgroundColor: '#454545',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    errMsgStyle: {
        position: 'absolute',
        color: 'red',
        bottom: 80,
        zIndex: 9999,
    }
});