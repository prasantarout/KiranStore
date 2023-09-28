import {StyleSheet, Text, View} from 'react-native';
import React,{useEffect} from 'react';

const SplashScreen = (props) => {
  useEffect(()=>{
    setTimeout(()=>{
     props?.navigation.navigate('Login')
     },100)
   },[])
  return (
    <View
      style={{
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text>SplashScreen</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
