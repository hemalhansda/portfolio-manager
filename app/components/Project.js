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
import editIcon from '../assets/images/edit.png';
import deleteIcon from '../assets/images/delete.png';

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
                    <TouchableOpacity onPress={() => this.props.editMethod(this.props.eachProject)} style={styles.noteEdit}>
                        <View style={styles.innerTextBut}>
                            <Image style={styles.iconStyle} source={editIcon}></Image>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.deleteMethod(this.props.eachProject._id)} style={styles.noteDelete}>
                        <View style={styles.innerTextBut}>
                            <Image style={styles.iconStyle} source={deleteIcon}></Image>
                        </View>
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
        margin: 10,
        marginLeft: 20,
        marginRight: 20,
        minHeight: 120,
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
        backgroundColor: '#f3f0f5',
        margin: 2,
        width: 60,
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        fontWeight: 'bold',
    },
    noteEdit: {
        backgroundColor: '#f3f0f5',
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
    },
    iconStyle: {
        height: 17,
        width: 17,
        margin: 2,
        position: 'relative',
        top: 0,
        zIndex: 9999,
    }
});