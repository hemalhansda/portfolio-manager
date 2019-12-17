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

export default class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Card style={styles.statusBar}>
                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate('WorkOn');
                    }}
                    style={styles.homeBtn}>
                    <Image style={styles.icon} source={workIcon}/>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate('Dashboard');
                    }}
                    style={styles.introEditBtn}>
                    <Image style={styles.icon} source={dashboardIcon}/>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        this.props.setModalVisible(true);
                    }}
                    style={styles.addButton}>
                    <Text style={styles.addButtonText}>
                        +
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate('Shuffle');
                    }}
                    style={styles.shuffleBtn}>
                    <Image style={styles.icon} source={shuffleIcon}/>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate('Settings');
                    }}
                    style={styles.accBtn}>
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
    },
    icon: {
        height: 20,
        width: 20,
    }
});