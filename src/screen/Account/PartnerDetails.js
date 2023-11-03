import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import SafeView from '../../components/SafeView';
import CommonLinearGradient from '../../components/CommonLinearGradient';
import TextInputItem from '../../components/TextInputItem';
import {Colors} from '../../themes/Colors';
import {verticalScale} from '../../utils/helpers/dimen1';
import {TouchableOpacity} from '@gorhom/bottom-sheet';
import {Fonts} from '../../themes/ImagePath';

const PartnerDetails = () => {
  const [fName, setFName] = useState('');
  const [shopName, setShopName] = useState('');
  const [address, setAddress] = useState('');
  const [upiId, setUpiId] = useState('');
  const [gstDetails, setGstDetails] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fssaiNumber, setFssaiNumber] = useState('');
  return (
    <SafeView>
      <CommonLinearGradient heading={'Partner Details'} />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: '20%'}}>
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              marginTop: verticalScale(30),
            }}>
            <TextInputItem
              viewbordercolor="red"
              placeholder={'Name'}
              width={'100%'}
              height={normalize(50)}
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
              placeholder={'GST (optional)'}
              width={'100%'}
              height={normalize(50)}
              borderWidth={1}
              borderRadius={10}
              marginTop={normalize(10)}
              value={shopName}
              onChangeText={val => setShopName(val)}
              textColor={Colors.placeholder}
              placeholderTextColor={Colors.placeholder}
              isRightIconVisible={false}
              fontSize={13}
              fontFamily="Poppins-Medium"
            />
            <TextInputItem
              viewbordercolor="red"
              placeholder={'PAN'}
              width={'100%'}
              height={normalize(50)}
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
            <TextInputItem
              viewbordercolor="red"
              placeholder={'Bank Account Number'}
              width={'100%'}
              height={normalize(50)}
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
            <TextInputItem
              viewbordercolor="red"
              placeholder={'IFSC CODE'}
              width={'100%'}
              height={normalize(50)}
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
            <TextInputItem
              viewbordercolor="red"
              placeholder={'Account Holder Name'}
              width={'100%'}
              height={normalize(50)}
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
            <TextInputItem
              viewbordercolor="red"
              placeholder={'Address'}
              width={'100%'}
              height={normalize(50)}
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
            <TextInputItem
              viewbordercolor="red"
              placeholder={'Pincode'}
              width={'100%'}
              height={normalize(50)}
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
            <TextInputItem
              viewbordercolor="red"
              placeholder={'Software that you are currently selling (if any)'}
              width={'100%'}
              height={normalize(80)}
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
            <TextInputItem
              viewbordercolor="red"
              placeholder={'Hardware that you are currently selling (if any)'}
              width={'100%'}
              height={normalize(90)}
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
          </View>
          <TouchableOpacity
            style={{
              paddingHorizontal: normalize(100),
              backgroundColor: Colors.darkblue,
              marginHorizontal: normalize(18),
              padding: normalize(15),
              borderRadius: 10,
            }}>
            <Text
              style={{
                color: Colors.lightdark_White,
                fontSize:normalize(13),
                fontWeight: '700',
                fontFamily: Fonts.Poppins_Bold,
                textAlign:'center'
              }}>
              Proceed To Pay
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeView>
  );
};

export default PartnerDetails;

const styles = StyleSheet.create({});
