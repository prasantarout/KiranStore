import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../../themes/Colors';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = props => {
  
   const navigation=useNavigation();
   const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  
   function Navigator(address,item){
  
      if(address===undefined  && isFirstLaunch===null){
        navigation.navigate('Login')
        setIsFirstLaunch(true) 
      }else if(address!==undefined) 
      {
        setIsFirstLaunch(false);
        navigation.navigate('BottomNav');
      }
  }

  useEffect(()=>{
    function getData(){
      let dataValue;
    // let item=AsyncStorage.getItem('otp');
    // let itemVl=JSON.parse(item);
       AsyncStorage.getItem('login').then(result=>{
        if(result!=null){
          const data=result;
          dataValue=data;
         }
        Navigator(dataValue);
      })
     }
    getData();

  },[])

  return (
    <View
      style={{
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: Colors.darkblue,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text style={styles.text}>BHANUMART</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  text: {
    color: Colors.placeholder,
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor:
      '(rgba(4, 3, 50, 1), rgba(71, 71, 96, 0.88),rgba(17, 16, 59, 0.9768),rgba(17, 16, 59, 0.9768)',
    textShadowOffset: {width: -1, height: 10},
    textShadowRadius: 10,
    elevation: 10,
  },
});
