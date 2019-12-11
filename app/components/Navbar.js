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
    Image,
} from 'react-native';

import mainIcon from './../../assets/layers.png';

import { Card } from 'react-native-shadow-cards';

export default class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Card style={styles.navbarCont}>
                <Image source={mainIcon} style={styles.iconDesign}></Image>
                <Text style={styles.textDesign}>Portfolio Manager</Text>
            </Card>
        );
    }
}

const styles = StyleSheet.create({
    navbarCont: {
        display: 'flex',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        height: 90,
        top: 0,
        backgroundColor: '#f5f5f5',
        width: '100%',
    },
    iconDesign: {
        height: 35,
        width: 35,
        position: 'relative',
        left: -170,
        top: 28,
    },
    textDesign: {
        position: 'relative',
        left: -60,
        bottom: 2,
        fontSize: 18,
        color: '#575757',
        fontWeight: 'bold',
    }
});