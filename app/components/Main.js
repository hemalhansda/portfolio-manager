import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import Project from './Project';
import Rest from '../services/Rest';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projectList: []
        };
    }

    componentDidMount() {
        Rest.getAllProjects().then((res) => {
            this.setState({projectList: res.data.data});
        }).catch((err) => {
            console.log('err: ', err);
        });
    }

    render() {
        return(
            <View style={styles.container}>
                <ScrollView style={styles.scrollContainer}>
                    {
                        this.state.projectList ? this.state.projectList.map((eachProject) => {
                            return <Project 
                                key={eachProject._id}
                                eachProject={eachProject}
                            />
                        }) : ''
                    }
                </ScrollView>
                <TouchableOpacity style={styles.addButton}>
                    <Text style={styles.addButtonText}>
                        +
                    </Text>
                </TouchableOpacity>
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
        marginBottom: 100,
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
        width: 90,
        height: 90,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 24
    }
});