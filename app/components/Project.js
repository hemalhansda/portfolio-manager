import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
} from 'react-native';

import { Card } from 'react-native-shadow-cards';
import AngularImage from './../assets/svgs/angular.png';

export default class Project extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <Card style={styles.note}>
                <Text style={styles.noteTextTitle}>{this.props.eachProject.title}</Text>
                <Text style={styles.noteText}>
                    {this.props.eachProject.description}
                </Text>

                <View style={styles.controls}>
                    <TouchableOpacity onPress={this.props.editMethod} style={styles.noteEdit}>
                        <Text style={styles.innerTextBut}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.deleteMethod(this.props.eachProject._id)} style={styles.noteDelete}>
                        <Text style={styles.innerTextBut}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </Card>
        );
    }
}

const styles = StyleSheet.create({
    note: {
        position: 'relative',
        padding: 20,
        paddingRight: 100,
        borderBottomWidth: 2,
        borderBottomColor: '#ededed',
        margin: 20,
    },
    noteText: {
        paddingLeft: 20,
        borderLeftWidth: 10,
        borderLeftColor: '#454545',
    },
    noteTextTitle: {
        paddingLeft: 20,
        borderLeftWidth: 10,
        borderLeftColor: '#454545',
        fontSize: 14,
        fontWeight: 'bold',
    },
    noteDelete: {
        backgroundColor: 'red',
        margin: 2,
        width: 60,
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        fontWeight: 'bold',
    },
    noteEdit: {
        backgroundColor: '#29B0b9',
        margin: 2,
        width: 60,
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        fontWeight: 'bold',
    },
    innerTextBut: {
        color: 'white',
    },
    controls: {
        flex: 1,
        flexDirection: 'column',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        top: 10,
        bottom: 10,
        right: 10,
    }
});