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
} from 'react-native';
import Project from './Project';
import Rest from '../services/Rest';
import CreateProject from './CreateProject';

import { Card } from 'react-native-shadow-cards';
import Placeholder from './Placeholder';
import Navbar from './Navbar';
import { PermissionsAndroid } from 'react-native';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projectList: [],
            modalVisible: false,
        };
    }

    componentDidMount() {
        // this.requestPermissions();
        Rest.getAllProjects().then((res) => {
            this.setState({projectList: res.data.data});
        }).catch((err) => {
            console.log('err: ', err);
        });
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    async requestPermissions() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'Cool Photo App Camera Permission',
              message:
                'Cool Photo App needs access to your camera ' +
                'so you can take awesome pictures.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the camera');
          } else {
            console.log('Camera permission denied');
          }
        } catch (err) {
          console.warn(err);
        }
        try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
              {
                title: 'Cool Photo App Storage Permission',
                message:
                  'Cool Photo App needs access to your Storage ' +
                  'so you can take awesome pictures.',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
              },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              console.log('You can use the Storage');
            } else {
              console.log('Storage permission denied');
            }
          } catch (err) {
            console.warn(err);
          }
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
              {
                title: 'Cool Photo App Storage Permission',
                message:
                  'Cool Photo App needs access to your camera ' +
                  'so you can take awesome pictures.',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
              },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              console.log('You can use the Storage');
            } else {
              console.log('Storage permission denied');
            }
          } catch (err) {
            console.warn(err);
          }
    }

    render() {
        return(
            <View style={styles.container}>
                <Navbar />
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        this.setModalVisible(false);
                    }}>
                    <CreateProject />
                </Modal>
                <ScrollView style={styles.scrollContainer}>
                    {
                        this.state.projectList.length ? this.state.projectList.map((eachProject) => {
                            return <Project 
                                key={eachProject._id}
                                eachProject={eachProject}
                            />
                        }) : <Placeholder />
                    }
                </ScrollView>
                <Card style={styles.statusBar}>
                    <TouchableOpacity
                        onPress={() => {
                            this.setModalVisible(true);
                        }}
                        style={styles.addButton}>
                        <Text style={styles.addButtonText}>
                            +
                        </Text>
                    </TouchableOpacity>
                </Card>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: '#E91E63',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 10,
        borderBottomColor: "#ddd",
    },
    headerText: {
        color: 'white',
        fontSize: 18,
        padding: 26,
    },
    scrollContainer: {
        flex: 1,
        marginBottom: 0,
        marginTop: 20,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
    },
    textInput: {
        alignSelf: 'stretch',
        color: '#fff',
        padding: 20,
        backgroundColor: '#252525',
        borderTopWidth: 2,
        borderTopColor: '#ededed',
    },
    addButton: {
        position: 'absolute',
        zIndex: 11,
        right: '39%',
        bottom: 5,
        backgroundColor: '#454545',
        width: 60,
        height: 60,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 24
    },
    statusBar: {
        backgroundColor: '#f5f5f5',
        height: 50,
        width: '100%',
    }
});