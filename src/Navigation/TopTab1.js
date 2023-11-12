import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MyStock from '../screen/Home/MyStock';
import AllStock from '../screen/Home/AllStock';
import ArciveStock from '../screen/Home/ArciveStock';
import SafeView from '../components/SafeView';
import CommonLinearGradient from '../components/CommonLinearGradient';
// import ArciveStock from '../screen/Home/ArciveStock';
import LowStock from '../screen/Home/LowStock';
const Tab = createMaterialTopTabNavigator();

function TabStack1(props) {
  const flag=props?.route?.params;
    return (
      <SafeView>
       <CommonLinearGradient heading={'Add Products'} flag={10}/>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#FFFFFF',
          tabBarInactiveTintColor: '#F8F8F8',
          tabBarStyle: {
            backgroundColor: '#102A70',
          },
          tabBarLabelStyle: {
            textAlign: 'center',
            fontSize: 12
          },
          tabBarIndicatorStyle: {
            borderBottomColor: '#FFFFFF',
            borderBottomWidth: 2,
          },
        }}>
        <Tab.Screen
          name="AllStock"
          component={AllStock}
          initialParams={{ flag: flag }}
          options={{
            tabBarLabel: 'All Stocks',
          }}  />
        <Tab.Screen
          name="LowStock"
          component={LowStock}
          options={{
            tabBarLabel: 'Low Stock',
          }} />
          <Tab.Screen
          name="ArciveStock"
          component={ArciveStock}
          options={{
            tabBarLabel: 'Archive Stock',
          }} />
      </Tab.Navigator>
      </SafeView>
    );
  }

  export default TabStack1;