import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
} from 'react-native';
import Footer from './Footer';

const { width, height } = Dimensions.get('window');

export default class Dashboard extends React.Component {
    static navigationOptions = {
        title: 'Manage Dashboard',
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
        this.state = {};
    }

    componentDidMount() {
        this.footer.setState({dashboard: true, home: false});
    }

    render() {
        return (
            <View>
                <View style={{height: height - 55}}>
                    
                </View>
                <Footer 
                    ref={ref => this.footer = ref}
                    navigation={this.props.navigation}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({

});