import React from 'react';
import styled from 'styled-components';

import { Animated, TouchableOpacity, Dimensions } from 'react-native';
import * as Icon from '@expo/vector-icons';

const screenHeight = Dimensions.get('window').height;

class ViewProject extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            top: new Animated.Value(900)
        }
    }

    componentDidUpdate() {
        console.log('projectData: ', this.props.projectData);
    }

    toggleModal = () => {
        Animated.spring(this.state.top, {
            toValue: 174
        }).start();
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
                <Body />
            </AnimatedContainer>
        )
    }
}

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