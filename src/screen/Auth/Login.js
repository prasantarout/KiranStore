import {StyleSheet, Text, View,} from 'react-native';
import React,{useState} from 'react';
import {Colors} from '../../themes/Colors';
import {Fonts} from '../../themes/ImagePath';
import normalize from '../../utils/helpers/dimen';
import { HelperText, TextInput } from 'react-native-paper';


const Login = () => {
  const [emailId, setEmailId] = useState('');
  const checkErrors = () => {
    return !emailId.includes('@');
  };
  
  const checkString = () => {
    return platform === 'Geeks';
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          height: '50%',
          flexDirection: 'row',
          marginHorizontal: normalize(1),
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              transform: [{rotate: '-90deg'}],
              fontFamily: Fonts.Poppins_Bold,
              fontWeight: '600',
              fontSize: normalize(25),
              color: Colors.white,
            }}>
            Sign In
          </Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: normalize(-10),
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: normalize(15),
              fontWeight: '400',
              fontFamily: Fonts?.Poppins_Medium,
              letterSpacing: 2,
              width: normalize(120),
            }}>
            A world of possibility in an app
          </Text>
        </View>
      </View>
      <View
        style={{
        marginTop:normalize(-50),
        marginHorizontal: normalize(45)}}>
       <TextInput label="Phone Number" value={emailId} 
        onChangeText={(text) => setEmailId(text)} 
        style={{backgroundColor:Colors.darkblue,fontSize:18}}
        theme={{colors: {primary: 'white'}}}
       
      />
   
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkblue,
    height: '100%',
  },
});
