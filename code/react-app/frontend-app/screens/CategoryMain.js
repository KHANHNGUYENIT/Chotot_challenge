
import Category from '../screens/Category';
import ElectricDevice from '../screens/ElectricDevice';

import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation';

const RootStack = createStackNavigator(
    {
      Home: {
      screen: Category
    },
    Profile: {
      screen: ElectricDevice
    },
  });
const CategoryMain = createAppContainer(RootStack);

export default CategoryMain; 



