import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Main from '../components/Main';
import EditProject from '../components/EditProject';

const Routes = createStackNavigator({
  Home: {screen: Main},
  Edit: {screen: EditProject},
},
{
  initialRouteName: 'Home',
});

const MainNavigator = createAppContainer(Routes);

export default MainNavigator;