import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import EnableProducts from '../screen/onlineShop/EnableProducts';
import DisableProducts from '../screen/onlineShop/DisableProducts';
import SafeView from '../components/SafeView';
import CommonLinearGradient from '../components/CommonLinearGradient';
const Tab = createMaterialTopTabNavigator();

function TabStack() {
    return (
      <SafeView>
       <CommonLinearGradient heading={'Enable / disable Products'} flag={10}/>
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
          name="EnableProducts"
          component={EnableProducts}
          options={{
            tabBarLabel: 'Enable Products',
          }}  />
        <Tab.Screen
          name="DisableProducts"
          component={DisableProducts}
          options={{
            tabBarLabel: 'Disable Products',
          }} />
      </Tab.Navigator>
      </SafeView>
    );
  }

  export default TabStack;