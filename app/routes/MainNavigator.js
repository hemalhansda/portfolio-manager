import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import {
  Easing,
  Animated,
} from 'react-native';

import Main from '../components/Main';
import EditProject from '../components/EditProject';
import Shuffle from '../components/Shuffle';
import WorkOn from '../components/WorkOn';
import Settings from '../components/Settings';
import Dashboard from '../components/Dashboard';

const Routes = createStackNavigator({
  Home: {screen: Main},
  Edit: {screen: EditProject},
  Shuffle: {screen: Shuffle},
  WorkOn: {screen: WorkOn},
  Settings: {screen: Settings},
  Dashboard: {screen: Dashboard},
},
{
  initialRouteName: 'Home',
  transitionConfig: () => transitionConfig(),
});

const MainNavigator = createAppContainer(Routes);

const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 750,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: sceneProps => {      
      const { layout, position, scene } = sceneProps

      const thisSceneIndex = scene.index
      const width = layout.initWidth

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex],
        outputRange: [width, 0],
      })

      return { transform: [ { translateX } ] }
    },
  }
};

export default MainNavigator;