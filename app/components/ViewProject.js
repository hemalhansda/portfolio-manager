import React from 'react';
import styled from 'styled-components';

import {
    Animated,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    Text,
    View,
    Image,
    Modal,
    TouchableHighlight,
    Alert,
} from 'react-native';

import { Card } from 'react-native-shadow-cards';
import * as Icon from '@expo/vector-icons';
import noPreview from '../assets/images/no-preview.png';

const screenHeight = Dimensions.get('window').height;
const {width, height} = Dimensions.get('window');

class ViewProject extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            top: new Animated.Value(900),
            image: {},
            title: '',
            description: '',
        }
    }

    componentDidUpdate() {
        console.log('projectData: ', this.props.projectData);
    }

    toggleModal = () => {
        this.setState({
            image: {
                uri: this.props.projectData.imageUrl
            },
            title: this.props.projectData.title,
            description: this.props.projectData.description,
        }, () => {
            Animated.spring(this.state.top, {
                toValue: 174
            }).start();
        });
    }

    closeModal = () => {
        Animated.spring(this.state.top, {
            toValue: screenHeight
        }).start();
    }

    render() {
        return (
            <AnimatedContainer style={{ top: this.state.top }}>
                {/* <Header /> */}
                <TouchableOpacity
                    onPress={this.closeModal}
                    style={{ position: "absolute", top: -23, left: "50%", marginLeft: -22, zIndex: 1 }}
                >
                    <CloseView style={{ elevation: 10 }}>
                        <Icon.Ionicons name='ios-close' size={44} color='blue' />
                    </CloseView>
                </TouchableOpacity>
                <Body>
                    <Card style={styles.cardContainer}>
                        <Image
                            style={styles.previewImage}
                            source={this.state.image.uri ? this.state.image : noPreview} />
                    </Card>
                    <Text style={styles.titleStyle}>{this.state.title}</Text>
                    <Text style={styles.descStyle}>{this.state.description}</Text>
                </Body>
            </AnimatedContainer>
        )
    }
}

const styles = StyleSheet.create({
    cardContainer: {
        margin: 40,
        width: 180,
        alignItems: 'center',
    },
    previewImage: {
        height: 180,
        width: 150,
        margin: 10,
    },
    titleStyle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    descStyle: {
        fontSize: 17,
        margin: 20,
    }
});

const Container = styled.View`
    position: absolute;
    background: white;
    opacity: 0.8;
    width: 100%;
    height: 100%;
    z-index: 100;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Header = styled.View`
    background: #333;
    height: 150px;
`;

const Body = styled.View`
    background: #eaeaea;
    height: ${screenHeight};
    display: flex;
    align-items: center;
`;

const CloseView = styled.View`
    width: 50px;
    height: 50px;
    border-radius: 30px;
    background: white;
    justify-content: center;
    align-items: center;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5);
`;

export default ViewProject;