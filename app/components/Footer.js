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
    Image,
} from 'react-native';

import { Card } from 'react-native-shadow-cards';
import workIcon from '../assets/images/portfolio.png';
import dashboardIcon from '../assets/images/dashboard.png';
import shuffleIcon from '../assets/images/shuffle.png';
import accountIcon from '../assets/images/gear-option.png';
import homeIcon from '../assets/images/home.png';

export default class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dashboard: false,
            workOn: false,
            shuffle: false,
            settings: false,
            home: true,
        };
    }

    render() {
        return (
            <Card style={styles.statusBar}>
                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate('WorkOn');
                    }}
                    style={[styles.homeBtn, (this.state.workOn ? styles.selected : null)]}>
                    <Image style={styles.icon} source={workIcon}/>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate('Dashboard');
                    }}
                    style={[styles.introEditBtn, (this.state.dashboard ? styles.selected : null)]}>
                    <Image style={styles.icon} source={dashboardIcon}/>
                </TouchableOpacity>
                {
                    this.state.home
                    ? <TouchableOpacity
                        onPress={() => {
                            this.props.setModalVisible(true);
                        }}
                        style={styles.addButton}>
                        <Text style={styles.addButtonText}>
                            +
                        </Text>
                    </TouchableOpacity>
                    : <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate('Home');
                        }}
                        style={styles.addButton}>
                        <Image style={styles.icon} source={homeIcon}/>
                    </TouchableOpacity>
                }
                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate('Shuffle', { getAllProjects: () => this.props.getAllProjects() });
                    }}
                    style={[styles.shuffleBtn, (this.state.shuffle ? styles.selected : null)]}>
                    <Image style={styles.icon} source={shuffleIcon}/>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate('Settings');
                    }}
                    style={[styles.accBtn, (this.state.settings ? styles.selected : null)]}>
                    <Image style={styles.icon} source={accountIcon}/>
                </TouchableOpacity>
            </Card>
        );
    }
}

const styles = StyleSheet.create({
    addButton: {
        position: 'absolute',
        zIndex: 11,
        right: '42%',
        bottom: 5,
        backgroundColor: '#454545',
        width: 60,
        height: 60,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
    },
    shuffleBtn: {
      position: 'absolute',
      zIndex: 11,
      right: '25%',
      bottom: 7,
      width: 35,
      height: 35,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 8,
    },
    homeBtn: {
      position: 'absolute',
      zIndex: 11,
      right: '84%',
      bottom: 7,
      width: 35,
      height: 35,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 8,
    },
    accBtn: {
      position: 'absolute',
      zIndex: 11,
      right: '7%',
      bottom: 7,
      width: 35,
      height: 35,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 8,
    },
    introEditBtn: {
      position: 'absolute',
      zIndex: 11,
      right: '65%',
      bottom: 7,
      width: 35,
      height: 35,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 8,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 24
    },
    statusBar: {
        backgroundColor: '#e2ddeb',
        height: 50,
        width: '100%',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
    },
    icon: {
        height: 20,
        width: 20,
    },
    selected: {
        backgroundColor: '#f0edf5',
        borderRadius: 20,
    }
});