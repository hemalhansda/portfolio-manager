import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Modal,
    TouchableHighlight,
    RefreshControl,
    Alert,
} from 'react-native';
import Project from './Project';
import Rest from '../services/Rest';
import CreateProject from './CreateProject';

import Placeholder from './Placeholder';
import Navbar from './Navbar';
import { PermissionsAndroid } from 'react-native';
import Footer from './Footer';
import ViewProject from '../components/ViewProject';

export default class Main extends React.Component {
    static navigationOptions = {
      title: 'Home',
      headerTitle: () => <Navbar />,
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
          projectList: [],
          modalVisible: false,
          refreshing: false,
          viewProjectHandler: false,
          projectData: {},
          overlay: false,
        };
    }

    componentDidMount() {
      this.getAllProjects();
    }

    getAllProjects = () => {
      this.setState({projectList: []}, () => {
        Rest.getAllProjects().then((res) => {
          this.setState({projectList: res.data.data, refreshing: false});
        }).catch((err) => {
          console.log('err: ', err);
        });
      });
    }

    setModalVisible(visible) {
      this.setState({modalVisible: visible});
    }

    deleteMethod = (id) => {
      Rest.deleteProject({id: id}).then((res) => {
        this.getAllProjects();
      });
    }

    onRefresh = () => {
      this.setState({refreshing: true});
      this.getAllProjects();
    }

    editMethod = (params) => {
      params.getAllProjects = () => this.getAllProjects();
      this.props.navigation.navigate('Edit', params);
    };

    overlayHandler = (boolVal) => {
      this.setState({overlay: boolVal});
    };

    viewProject = (projectData) => {
      this.setState({projectData: projectData}, () => {
        this.projectModal.toggleModal();
      });
    };

    render() {
        return(
            <View style={styles.container}>
                {/* <Navbar /> */}
                <ViewProject
                  overlayHandler={this.overlayHandler}
                  projectData={this.state.projectData}
                  ref={ref => this.projectModal = ref}
                />
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setModalVisible(false);
                    }}>
                    <CreateProject
                      getAllProjects={this.getAllProjects}
                      modalSetter={() => this.setModalVisible(false)}
                    />
                </Modal>
                <ScrollView
                  refreshControl={
                    <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
                  }
                  style={styles.scrollContainer}>
                    {
                        this.state.projectList.length ? this.state.projectList.map((eachProject) => {
                            return <Project 
                              key={eachProject._id}
                              viewProject={this.viewProject}
                              eachProject={eachProject}
                              editMethod={this.editMethod}
                              deleteMethod={this.deleteMethod}
                            />
                        }) : (this.state.refreshing ? <Text></Text> : <Placeholder />)
                    }
                </ScrollView>
                {
                  this.state.overlay ? <View style={styles.overlay}></View> : null
                }
                <Footer 
                  setModalVisible={(boolVal) => this.setModalVisible(boolVal)}
                  navigation={this.props.navigation}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f7f7f7',
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
      marginBottom: 55,
      marginTop: 20,
    },
    textInput: {
      alignSelf: 'stretch',
      color: '#fff',
      padding: 20,
      backgroundColor: '#252525',
      borderTopWidth: 2,
      borderTopColor: '#ededed',
    },
    overlay: {
      position: 'absolute',
      height: '100%',
      width: '100%',
      backgroundColor: 'black',
      opacity: 0.5,
    }
});