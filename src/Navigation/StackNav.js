import React from 'react';
import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionSpecs,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';
import Language from '../screen/Auth/Language';
import Login from '../screen/Auth/Login';
import Register from '../screen/Auth/Register';
import OtpScreen from '../screen/Auth/OtpScreen';
import NavigationScreen from '../screen/Auth/NavigationScreen';
import SplashScreen from '../screen/splashScreen/SplashScreen';
import BottomNav from './BottomNav';
const StackNav = () => {
  const Stack = createStackNavigator();
  const mytheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
    },
  };
  const MyTransition = {
    gestureDirection: 'vertical',
    transitionSpec: {
      open: TransitionSpecs.TransitionIOSSpec,
      close: TransitionSpecs.TransitionIOSSpec,
    },
    headerStyleInterpolator: HeaderStyleInterpolators.forFade,
    cardStyleInterpolator: ({current, next, layouts}) => {
      return {
        cardStyle: {
          transform: [
            {
              translateX: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [layouts.screen.width, 1],
              }),
            },
          ],
        },
        overlayStyle: {
          opacity: current.progress.interpolate({
            inputRange: [0, 0.1],
            outputRange: [0, 0.1],
          }),
        },
      };
    },
  };
  //
  const Screens = {
    SplashScreen: SplashScreen,
    Login: Login,
    OtpScreen: OtpScreen,
    NavigationScreen: NavigationScreen,
    Language: Language,
    BottomNav:BottomNav
    
  };

  return (
    <NavigationContainer theme={mytheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          ...MyTransition,
          animationEnabled: true,
        }}>
        {Object.entries({
          ...Screens,
        }).map(([name, component]) => {
          return <Stack.Screen name={name} component={component} key={name} />;
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default StackNav;
