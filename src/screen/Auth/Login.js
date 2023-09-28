import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../themes/Colors';
import {Fonts, Icons} from '../../themes/ImagePath';
import normalize from '../../utils/helpers/dimen';
// import {HelperText, TextInput} from 'react-native-paper';
import MyStatusBar from '../../utils/helpers/MyStatusBar';

const Login = (props) => {
  const [emailId, setEmailId] = useState('');
  const checkErrors = () => {
    return !emailId.includes('@');
  };

  const checkString = () => {
    return platform === 'Geeks';
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <MyStatusBar backgroundColor={Colors.darkblue} barStyle="light-content" />
      <View
        style={{
          height: '50%',
          flexDirection: 'row',
          marginHorizontal: normalize(1),
          // marginTop: normalize(150),
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
              width:
                Platform.OS === 'android' ? normalize(140) : normalize(120),
            }}>
            A world of possibility in an app
          </Text>
        </View>
      </View>
      <View
        style={{
          // top:normalize(-50),
          // marginTop: normalize(80),
          marginHorizontal: normalize(45),
        }}>
        <View style={{borderBottomWidth: 1, borderBottomColor: 'white'}}>
          <TextInput
           placeholder="Phone Number"
           placeholderTextColor="#fff" 
            value={emailId}
            onChangeText={text => setEmailId(text)}
            style={{
              // backgroundColor: 'transparent',
              fontSize: 18,
              borderRadius: 5,
              paddingVertical: 8, // Adjust the padding as needed
              color:Colors.white
              
            }}
            keyboardType="phone-pad"
          />
        </View>
      </View>
      <TouchableOpacity
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: normalize(25),
          paddingLeft: normalize(20),
        }}>
        <Text style={{color: Colors?.blue}}>
          By login in you are agreed with our policies
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: Colors.white,
          width: normalize(100),
          height: normalize(40),
          borderRadius: 50,
          justifyContent: 'center', // Center the content vertically
          alignItems: 'center', // Center the content horizontally
          // Add left padding to move content to the left
          marginLeft: normalize(170),
          marginTop: normalize(40),
        }}
        onPress={() => props?.navigation.navigate('OtpScreen')}
        >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start', // Align content to the left
            alignItems: 'center',
          }}>
          <Image
            source={Icons.right}
            style={{width: 20, height: 20, marginRight: normalize(10)}}
          />
          <Text
            style={{
              fontSize: normalize(15),
              fontWeight: '600',
              color: Colors.black,
            }}>
            OK
          </Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: Colors.darkblue,
    height: '100%',
  },
});
