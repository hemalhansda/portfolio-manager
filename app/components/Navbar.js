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
            <View style={styles.navbarCont}>
                <Image source={mainIcon} style={styles.iconDesign}></Image>
                <Text style={styles.textDesign}>Portfolio Manager</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    navbarCont: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconDesign: {
        height: 35,
        width: 35,
        marginLeft: 17,
    },
    textDesign: {
        fontSize: 18,
        marginLeft: 17,
        color: 'white',
        fontWeight: 'bold',
    }
});