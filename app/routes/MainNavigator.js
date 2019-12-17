import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

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
});

const MainNavigator = createAppContainer(Routes);

export default MainNavigator;