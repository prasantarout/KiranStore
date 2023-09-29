import React, {useState, useEffect} from 'react';
import {
  Text,
  Image,
  View,
  StyleSheet,
  Platform,
  BackHandler,
} from 'react-native';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';
import {
  createStackNavigator,
  TransitionSpecs,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';
import {Icons} from '../themes/ImagePath';
import {Colors} from '../themes/Colors';
import Home from '../screen/Home/Home';
import Report from '../screen/reports/Report';
import More from '../screen/more/More';
import OnlineShop from '../screen/onlineShop/OnlineShop';
import normalize from '../utils/helpers/dimen';

const OnlineStoreStack = createStackNavigator();
const MoreStack = createStackNavigator();
const ReportStack = createStackNavigator();
const HomeStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const BottomNav = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        // unmountOnBlur: true,
        keyboardHidesTabBar: true,
        tabBarHideOnKeyboard: true,
        showIcon: true,
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: Colors.placeholder,
          // borderTopRightRadius: 30,
          // borderTopLeftRadius: 30,
          height: Platform.OS === 'ios' ? normalize(70) : normalize(70),
          position: 'absolute',
          bottom: 0,
          shadowColor: Colors.black2,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 15,
          elevation: 5,
        },
        labelStyle: {
          fontSize: normalize(5),
          fontWeight: 'bold',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({focused}) => {
            return (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  top: Platform.OS === 'ios' ? normalize(8) : null,
                  backgroundColor: focused ? Colors.darkblue : '',
                  padding: normalize(10),
                  borderRadius: 10,
                  flex: 1, // Equal width
                  flexDirection: 'column', // Stack icon and text vertically
                }}>
                <Image
                  style={{
                    height: focused ? normalize(25) : normalize(18),
                    width: focused ? normalize(25) : normalize(18),
                    tintColor: focused ? Colors.white : Colors.black,
                  }}
                  source={focused ? Icons.home : Icons.home}
                  resizeMode="contain"
                />
                <Text
                  style={{
                 
                    color: focused ? Colors.white : Colors.black,
                    fontSize: normalize(10),
                  }}>
                  Home
                </Text>
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name="Report"
        component={ReportStackScreen}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({focused}) => {
            return (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  top: Platform.OS === 'ios' ? normalize(8) : null,
                  backgroundColor: focused ? Colors.darkblue : '',
                  padding: normalize(10),
                  borderRadius: 10,
                  flex: 1, // Equal width
                  flexDirection: 'column', // Stack icon and text vertically
                }}>
                <Image
                  style={{
                    height: focused ? normalize(25) : normalize(18),
                    width: focused ? normalize(25) : normalize(18),
                    tintColor: focused ? Colors.white : Colors.black,
                  }}
                  source={focused ? Icons.dashboard : Icons.dashboard}
                  resizeMode="contain"
                />
                <Text
                  style={{
                   
                    color: focused ? Colors.white : Colors.black,
                    fontSize: normalize(10),
                  }}>
                  Report
                </Text>
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name="Online Shop"
        component={OnlineStackScreen}
        // listeners={({navigation}) => ({
        //   blur: () => navigation.setParams({screen: undefined}),
        // })}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({focused}) => {
            return (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  top: Platform.OS === 'ios' ? normalize(8) : null,
                  backgroundColor: focused ? Colors.darkblue : '',
                  padding: normalize(5),
                  borderRadius: 10,
                  flex: 1, // Equal width
                  flexDirection: 'column', // Stack icon and text vertically
                }}>
                <Image
                  style={{
                    height: focused ? normalize(25) : normalize(21),
                    width: focused ? normalize(25) : normalize(21),
                    tintColor: focused ? Colors.white : Colors.black,
                  }}
                  source={focused ? Icons.internet : Icons.internet}
                  resizeMode="contain"
                />
                <Text
                  style={{
                   
                    color: focused ? Colors.white : Colors.black,
                    fontSize: normalize(10),
                  }}>
                  Online Shop
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="More"
        component={MoreStackScreen}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({focused}) => {
            return (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  top: Platform.OS === 'ios' ? normalize(8) : null,
                  backgroundColor: focused ? Colors.darkblue : '',
                  padding: normalize(10),
                  borderRadius: 10,
                  flex: 1, // Equal width
                  flexDirection: 'column', // Stack icon and text vertically
                }}>
                <Image
                  style={{
                    height: focused ? normalize(25) : normalize(18),
                    width: focused ? normalize(25) : normalize(18),
                    tintColor: focused ? Colors.white : Colors.black,
                  }}
                  source={focused ? Icons.menu : Icons.menu}
                  resizeMode="contain"
                />
                <Text
                  style={{
                  
                    color: focused ? Colors.white : Colors.black,
                  }}>
                  More
                </Text>
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNav;

const styles = StyleSheet.create({});

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator
      initialRouteName={''}
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        unmountOnBlur: true,
      }}>
      <HomeStack.Screen name="home" component={Home} />
    </HomeStack.Navigator>
  );
};
const ReportStackScreen = () => {
  return (
    <ReportStack.Navigator
      initialRouteName={''}
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        unmountOnBlur: true,
      }}>
      <ReportStack.Screen name="report" component={Report} />
    </ReportStack.Navigator>
  );
};
const OnlineStackScreen = () => {
  return (
    <OnlineStoreStack.Navigator
      initialRouteName={''}
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        unmountOnBlur: true,
      }}>
      <OnlineStoreStack.Screen name="onlineShop" component={OnlineShop} />
    </OnlineStoreStack.Navigator>
  );
};

const MoreStackScreen = () => {
  return (
    <MoreStack.Navigator
      initialRouteName={''}
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        unmountOnBlur: true,
      }}>
      <MoreStack.Screen name="more" component={More} />
    </MoreStack.Navigator>
  );
};
