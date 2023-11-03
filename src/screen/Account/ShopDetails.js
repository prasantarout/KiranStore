import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import SafeView from '../../components/SafeView';
import CommonLinearGradient from '../../components/CommonLinearGradient';
import TextInputItem from '../../components/TextInputItem';
import calcH, {calcW} from '../../utils/helpers/dimen2';
import {horizontalScale, verticalScale} from '../../utils/helpers/dimen1';
import {Colors} from '../../themes/Colors';
import {Icons} from '../../themes/ImagePath';
import showErrorAlert from '../../utils/helpers/Toast';
import { useDispatch, useSelector } from 'react-redux';
import Lodaer from '../../utils/helpers/Loader'
import { EditProfileRequest } from '../../redux/reducer/AuthReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ShopDetails = (props) => {
  const [fName, setFName] = useState('');
  const [email, seteEmail] = useState('');
  const [address, setAddress] = useState('');
  const [mobile, setMobile] = useState('');
  const [location, setLocation] = useState('');
  const [city, setCity] = useState('');
  const [referral_code, setReferralCode] = useState('');

  const [onlineStoreChecked, setOnlineStoreChecked] = useState(false);
  const [showOutOfStockChecked, setShowOutOfStockChecked] = useState(false);

  const handleOnlineStoreToggle = () => {
    setOnlineStoreChecked(!onlineStoreChecked);
  };

  const handleShowOutOfStockToggle = () => {
    setShowOutOfStockChecked(!showOutOfStockChecked);
  };
  const dispatch=useDispatch();
  const AuthReducer=useSelector((state)=>state.AuthReducer);
  console.log(AuthReducer.signupResponse,"fnjfj")

  let item=AsyncStorage.getItem('login').then(result=>{
    if(result!=null){
      const data=result?.token;
      dataValue=data;
     }
    })
    console.log(item,"FfCnXF")
  
    const handleSubmit = () => {
    
    if(fName===''){
      showErrorAlert('Please enter your name')
    }else if(email===''){
      showErrorAlert('Please enter your email')
    }else if(address===''){
      showErrorAlert('Please enter your address')
    }else if(mobile===''){
      showErrorAlert('Please enter your mobile')
    }else if(location===''){
      showErrorAlert('Please enter your location')
    }else if(city===''){
      showErrorAlert('Please enter your city')
    }else if(referral_code===''){ 
      showErrorAlert('Please enter your referral code')
  }else{
     let obj=new FormData();
     obj.append('user_id',85);
     obj.append('name',fName);
     obj.append('email',email);
     obj.append('mobile',mobile);
     obj.append('address',address);
     obj.append('location',location);
     obj.append('city',city);
     obj.append('referral_code',referral_code);
     dispatch(EditProfileRequest(obj));
  }
}

let status="";
if (status == "" || AuthReducer.status != status) {
  switch (AuthReducer.status) {
    case "Auth/EditProfileRequest":
      status = AuthReducer.status;
      
      break;
    case "Auth/EditProfileSuccess":
      status = AuthReducer.status;
      props.navigation.goBack('');
      // dispatch(productGetFromWishListRequest({ user_id }));
      break;
    case "Auth/EditProfileFailure":
      status = AuthReducer.status;
      
      break;
  }
}

  // user_id,name,email,mobile,address,location,city,referral_code
  return (
    <SafeView>
      <CommonLinearGradient heading={'Shop Details'} />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: '50%'}}>
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              marginTop: verticalScale(30),
            }}>
            {/* <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <View
                style={{
                  height: horizontalScale(80),
                  width: horizontalScale(80),
                  position: 'relative',
                  // bottom: -horizontalScale(53),
                  borderRadius: (horizontalScale(107) * 2) / 4,
                  borderWidth: 4,
                  borderColor: Colors.white,

                  shadowColor: Colors.primaryColor,
                  shadowOffset: {
                    width: 0,
                    height: 7,
                  },
                  shadowOpacity: 0.43,
                  shadowRadius: 9.51,
                  elevation: 15,
                }}>
                <Image
                  source={Icons.user}
                  style={{
                    height: '100%',
                    width: '100%',
                    borderRadius: (horizontalScale(107) * 2) / 4,
                  }}
                  resizeMode={'cover'}
                />
                <TouchableOpacity
                  // onPress={() => setCameraPicker(true)}
                  style={styles.cameraButtonStyle1}>
                  <Image source={Icons.photo} style={styles.buttonImg} />
                </TouchableOpacity>
              </View>
            </View> */}
            <View style={{marginTop: normalize(20)}}>
              <TextInputItem
                viewbordercolor="red"
                placeholder={'Name'}
                width={'100%'}
                height={'9%'}
                borderWidth={1}
                borderRadius={10}
                marginTop={normalize(10)}
                value={fName}
                onChangeText={val => setFName(val)}
                textColor={Colors.black}
                placeholderTextColor={Colors.placeholder}
                isRightIconVisible={false}
                fontSize={13}
                fontFamily="Poppins-Medium"
              />
              <TextInputItem
                viewbordercolor="red"
                placeholder={'Email'}
                width={'100%'}
                height={'9%'}
                borderWidth={1}
                borderRadius={10}
                marginTop={normalize(10)}
                value={ email
              }
                onChangeText={val => seteEmail(val)}
                textColor={Colors.placeholder}
                placeholderTextColor={Colors.placeholder}
                isRightIconVisible={false}
                fontSize={13}
                fontFamily="Poppins-Medium"
              />
           
              <TextInputItem
                viewbordercolor="red"
                placeholder={'Address'}
                width={'100%'}
                height={'9%'}
                borderWidth={1}
                borderRadius={10}
                marginTop={normalize(10)}
                value={address}
                onChangeText={val => setAddress(val)}
                textColor={Colors.placeholder}
                placeholderTextColor={Colors.placeholder}
                isRightIconVisible={false}
                fontSize={13}
                fontFamily="Poppins-Medium"
              />
              {/* <TouchableOpacity
                style={{
                  justifyContent: 'flex-end',
                  flexDirection: 'row',
                  alignItems: 'center',
                  bottom: normalize(2),
                }}>
                <Image
                  source={Icons.current}
                  style={{
                    width: normalize(18),
                    height: normalize(18),
                    marginRight: normalize(10),
                  }}
                />
                <Text style={{fontSize: normalize(13), fontWeight: '500'}}>
                  use current location
                </Text>
              </TouchableOpacity> */}
              <TextInputItem
                viewbordercolor="red"
                placeholder={'mobile'}
                width={'100%'}
                height={'9%'}
                borderWidth={1}
                keyboardType={'numeric'}
                borderRadius={10}
                marginTop={normalize(10)}
                value={mobile}
                onChangeText={val => setMobile(val)}
                textColor={Colors.placeholder}
                placeholderTextColor={Colors.placeholder}
                isRightIconVisible={false}
                fontSize={13}
                fontFamily="Poppins-Medium"
              />
              <TextInputItem
                viewbordercolor="red"
                placeholder={'Location'}
                width={'100%'}
                height={'9%'}
                borderWidth={1}
                borderRadius={10}
                marginTop={normalize(10)}
                value={location}
                onChangeText={val => setLocation(val)}
                textColor={Colors.placeholder}
                placeholderTextColor={Colors.placeholder}
                isRightIconVisible={false}
                fontSize={13}
                fontFamily="Poppins-Medium"
              />
              <TextInputItem
                viewbordercolor="red"
                placeholder={'City'}
                width={'100%'}
                height={'9%'}
                borderWidth={1}
                borderRadius={10}
                marginTop={normalize(10)}
                value={city}
                onChangeText={val => setCity(val)}
                textColor={Colors.placeholder}
                placeholderTextColor={Colors.placeholder}
                isRightIconVisible={false}
                fontSize={13}
                fontFamily="Poppins-Medium"
              />
              <TextInputItem
                viewbordercolor="red"
                placeholder={'referral_code'}
                width={'100%'}
                height={'9%'}
                borderWidth={1}
                borderRadius={10}
                marginTop={normalize(10)}
                value={referral_code}
                onChangeText={val => setReferralCode(val)}
                textColor={Colors.placeholder}
                placeholderTextColor={Colors.placeholder}
                isRightIconVisible={false}
                fontSize={13}
                fontFamily="Poppins-Medium"
              />
            </View>
            {/* <View style={styles.toggleContainer}>
              <View style={styles.toggleRow}>
                <View style={styles.toggleColumn}>
                  <Text style={styles.toggleLabel}>
                    Show Counter Sale Button ?
                  </Text>
                </View>
                <TouchableOpacity
                  style={[
                    styles.toggleSwitch,
                    onlineStoreChecked && styles.toggleSwitchActive,
                  ]}
                  onPress={handleOnlineStoreToggle}>
                  <View
                    style={[
                      styles.roundButton,
                      onlineStoreChecked && styles.roundButtonActive,
                    ]}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: Colors.backGround,
                  marginTop: normalize(2),
                }}
              />
            </View> */}
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: normalize(40),
            }}>
            <TouchableOpacity
              style={{
                padding: normalize(10),
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: Colors.darkblue,
                height: normalize(50),
                width: calcW(0.5),
                borderRadius: 10,
              }}
              onPress={handleSubmit}
              >
              <Text
                style={{
                  fontSize: normalize(14),
                  fontWeight: '500',
                  color: Colors.white,
                }}>
                Update Details
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeView>
  );
};

export default ShopDetails;

const styles = StyleSheet.create({
  cameraButtonStyle1: {
    height: horizontalScale(26),
    width: horizontalScale(26),
    backgroundColor: Colors.buttonColor,
    borderRadius: horizontalScale(26) + verticalScale(26) / 2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    alignSelf: 'flex-end',
    // right: 5,
  },
  buttonImg: {
    height: horizontalScale(12),
    width: horizontalScale(12),
    resizeMode: 'contain',
    tintColor: Colors.primaryColor,
  },
  toggleContainer: {
    flexDirection: 'column',
    marginHorizontal: normalize(20),
    bottom: normalize(25),
    width: 300, // Adjust the width as needed
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginVertical: normalize(10),
  },
  toggleColumn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleLabel: {
    marginRight: 10,
    fontSize: normalize(14),
  },
  toggleSwitch: {
    width: 50, // Adjust the width of the toggle buttons
    height: 25, // Adjust the height of the toggle buttons
    backgroundColor: '#ccc',
    borderRadius: 25, // Make it round
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    position: 'relative',
  },
  toggleSwitchActive: {
    backgroundColor: '#007bff', // Change the color when active
  },
  roundButton: {
    width: 20, // Adjust the width of the round button
    height: 20, // Adjust the height of the round button
    borderRadius: 10, // Make it round
    backgroundColor: '#fff',
    position: 'absolute',
    top: 2.5, // Adjust the position to center vertically
    left: 2.5, // Adjust the position to center horizontally
    transition: 'transform 0.3s ease',
  },
  roundButtonActive: {
    transform: [{translateX: 25}], // Move the button to the right when active
  },
  onlineStoreSettings: {
    marginTop: 10,
  },
  onlineStoreLabel: {
    fontWeight: 'bold',
  },
});
