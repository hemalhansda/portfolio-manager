import React, { Component } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
  Platform,
} from 'react-native';
import SortableList from 'react-native-sortable-list';

import Footer from './Footer';

const window = Dimensions.get('window');

const { width, height } = Dimensions.get('window');
import Rest from '../services/Rest';
import Placeholder from './Placeholder';

export default class Shuffle extends Component {
  static navigationOptions = {
    title: 'Re-Arrange Project Order',
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
    this.state = {
      projectListObj: {},
      loader: true,
    };
  }

  componentDidMount() {
    this.footer.setState({shuffle: true, home: false});
    Rest.getAllProjects().then((res) => {
      const projectList = res.data.data;
      const projectListObj = this.convertArrayToObject(projectList, '_id');
      this.order = Object.keys(projectListObj);
      this.setState({projectListObj: projectListObj, loader: false});
    });
  }

  convertArrayToObject = (array, key) => {
    const initialValue = {};
    return array.reduce((obj, item) => {
      return {
        ...obj,
        [item[key]]: item,
      };
    }, initialValue);
  };

  orderShuffled = (key, currentOrder) => {
    let shuffler = [];
    let incOrder = 1;
    currentOrder.forEach((id) => {
      shuffler.push({
        id,
        order: incOrder++
      });
    });
    const shuffleQuery = { orders: shuffler };
    Rest.shuffleProject(shuffleQuery).then((res) => {
      this.props.navigation.state.params.getAllProjects();
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.extender}>
          {/* <Text style={styles.title}>Projects Sortable List</Text> */}
          {
            this.state.loader === false
            ? <SortableList
                style={styles.list}
                contentContainerStyle={styles.contentContainer}
                data={this.state.projectListObj}
                order={this.order}
                renderRow={this._renderRow}
                onReleaseRow={(key, currentOrder) => {
                  this.orderShuffled(key, currentOrder);
                }} />
            : <View style={styles.list}>
                <Placeholder
                  styleContents={{ width: 350, margin: 10, height: 90, borderRadius: 5 }}
                />
              </View>
          }
        </View>
        <Footer
          ref={ref => this.footer = ref}
          navigation={this.props.navigation}
        />
      </View>
    );
  }

  _renderRow = ({data, active}) => {
    return <Row data={data} active={active} />
  }
}

class Row extends Component {

  constructor(props) {
    super(props);

    this._active = new Animated.Value(0);

    this._style = {
      ...Platform.select({
        ios: {
          transform: [{
            scale: this._active.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.1],
            }),
          }],
          shadowRadius: this._active.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 10],
          }),
        },

        android: {
          transform: [{
            scale: this._active.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.07],
            }),
          }],
          elevation: this._active.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 6],
          }),
        },
      })
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.active !== nextProps.active) {
      Animated.timing(this._active, {
        duration: 300,
        easing: Easing.bounce,
        toValue: Number(nextProps.active),
      }).start();
    }
  }

  render() {
   const {data, active} = this.props;

    return (
      <Animated.View style={[
        styles.row,
        this._style,
      ]}>
        <Image source={{uri: data.imageUrl}} style={styles.image} />
        <Text style={styles.text}>{data.title}</Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  extender: {
    height: height - 55
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',

    ...Platform.select({
      ios: {
        paddingTop: 20,
      },
    }),
  },

  title: {
    fontSize: 20,
    paddingVertical: 20,
    color: '#999999',
    marginLeft: 40,
    marginRight: 40,
  },

  list: {
    flex: 1,
    marginTop: 20,
  },

  contentContainer: {
    width: window.width,

    ...Platform.select({
      ios: {
        paddingHorizontal: 30,
      },

      android: {
        paddingHorizontal: 0,
      }
    })
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    height: 80,
    flex: 1,
    marginTop: 7,
    marginBottom: 12,
    borderRadius: 4,


    ...Platform.select({
      ios: {
        width: window.width - 30 * 2,
        shadowColor: 'rgba(0,0,0,0.2)',
        shadowOpacity: 1,
        shadowOffset: {height: 2, width: 2},
        shadowRadius: 2,
      },

      android: {
        width: window.width - 30 * 2,
        elevation: 0,
        marginHorizontal: 30,
      },
    })
  },

  image: {
    width: 50,
    height: 50,
    marginRight: 15,
    borderRadius: 25,
  },

  text: {
    fontSize: 24,
    color: '#222222',
  },
});