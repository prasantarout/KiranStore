import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import React,{useState,useRef} from 'react';
import SafeView from '../../components/SafeView';
import CommonLinearGradient from '../../components/CommonLinearGradient';
import {Icons} from '../../themes/ImagePath';
import {Colors} from '../../themes/Colors';
import { useNavigation } from '@react-navigation/native';
import CommonBottomSheet from '../../components/BottomSheet';
import TextInputItem from '../../components/TextInputItem';
import { calcW } from '../../utils/helpers/dimen2';
import { horizontalScale } from '../../utils/helpers/dimen1';
const MyCustomers = (props) => {
  
  const navigation=useNavigation();

  const [gstDetails, setGstDetails] = useState('');
  const [name,setName] = useState('');
  const [address, setaddress] = useState('');
  const [phone, setPhoneNumber] = useState('');
  const [Notes, setNotes] = useState('');
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const bottomSheetRef = useRef(null);
  const handleClosePress = () => bottomSheetRef.current.close();
  const toggleBottomSheet = () => {
    setBottomSheetVisible(!isBottomSheetVisible);
    handleClosePress();
  };
 
 
  return (
    <SafeView>
      <CommonLinearGradient heading={'My Customers'} />
      <KeyboardAvoidingView
        // style={{ flex: 1 }}
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        enabled>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <TextInput style={styles.textInput} placeholder="Search" />
            <TouchableOpacity style={styles.textInputs} 
            onPress={() =>navigation.navigate('CustomerLedgerRecord')}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignsItem: 'center',
                }}>
                <View style={{marginVertical: 4}}>
                  <Text style={{fontSize: 15, fontWeight: '500'}}>
                    You Will Give
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '600',
                      color: Colors.red,
                      marginTop: 5,
                    }}>
                    RS 0.0
                  </Text>
                </View>
                <View style={{marginVertical: 4}}>
                  <Text style={{fontSize: 15, fontWeight: '500'}}>
                    You Will Get
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '600',
                      color: Colors.green,
                      marginTop: 5,
                    }}>
                    RS 0.0
                  </Text>
                </View>
                <Image
                  source={Icons.skip}
                  style={{
                    height: normalize(20),
                    width: normalize(20),
                    marginVertical: normalize(10),
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
          style={styles.fab}
          onPress={() => {
            toggleBottomSheet()
          }}>
          <Image source={Icons.plus} style={styles.fabIcon} 
           tintColor={Colors.white}
          />
        </TouchableOpacity>
        <CommonBottomSheet
        isVisible={isBottomSheetVisible}
        onClose={toggleBottomSheet}
        close={bottomSheetRef} 
        moment={1}
        >
      
        <View style={{marginTop: normalize(10)}}>
          <TextInputItem
            viewbordercolor="red"
            placeholder={'Name'}
            width={'100%'}
            height={normalize(50)}
            borderWidth={1}
            borderRadius={10}
            marginTop={normalize(10)}
            value={name}
            onChangeText={val => setName(val)}
            textColor={Colors.placeholder}
            placeholderTextColor={Colors.placeholder}
            isRightIconVisible={false}
            fontSize={13}
            fontFamily="Poppins-Medium"
          />
            <TextInputItem
            viewbordercolor="red"
            placeholder={'Phone Number'}
            width={'100%'}
            height={normalize(50)}
            borderWidth={1}
            borderRadius={10}
            marginTop={normalize(10)}
            value={phone}
            onChangeText={val => setPhoneNumber(val)}
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
            onChangeText={val => setaddress(val)}
            textColor={Colors.placeholder}
            placeholderTextColor={Colors.placeholder}
            isRightIconVisible={false}
            fontSize={13}
            fontFamily="Poppins-Medium"
          />
            <TextInputItem
            viewbordercolor="red"
            placeholder={'Notes'}
            width={'100%'}
            height={normalize(50)}
            borderWidth={1}
            borderRadius={10}
            marginTop={normalize(10)}
            value={Notes}
            onChangeText={val => setNotes(val)}
            textColor={Colors.placeholder}
            placeholderTextColor={Colors.placeholder}
            isRightIconVisible={false}
            fontSize={13}
            fontFamily="Poppins-Medium"
          />
            <TextInputItem
            viewbordercolor="red"
            placeholder={'Gst'}
            width={'100%'}
            height={normalize(50)}
            borderWidth={1}
            borderRadius={10}
            marginTop={normalize(10)}
            value={gstDetails}
            onChangeText={val => setGstDetails(val)}
            textColor={Colors.placeholder}
            placeholderTextColor={Colors.placeholder}
            isRightIconVisible={false}
            fontSize={13}
            fontFamily="Poppins-Medium"
          />
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
                paddingHorizontal:horizontalScale(140),
                borderRadius: 10,
              }}>
              <Text
                style={{
                  fontSize: normalize(20),
                  fontWeight: '500',
                  color: Colors.white,
                }}>
                 Add
              </Text>
            </TouchableOpacity>
          </View>
        </CommonBottomSheet>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeView>
  );
};

export default MyCustomers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: normalize(20),
  },
  textInput: {
    width: '100%',
    height: normalize(45),
    borderWidth: 1,
    borderColor: 'gray',
    marginTop: 20,
    borderRadius: 10,
    padding: 10,
  },
  textInputs: {
    width: '100%',
    height: normalize(56),
    borderWidth: 1,
    borderColor: 'gray',
    marginTop: 20,
    borderRadius: 10,
    padding: 10,
  },
  fab: {
    position: 'absolute',
    width: normalize(56),
    height: normalize(56),
    borderRadius: normalize(28),
    backgroundColor: Colors.darkblue,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: normalize(20), // Adjust the bottom position as needed
    right: normalize(20), // Adjust the right position as needed
  },
  fabIcon: {
    height: normalize(24),
    width: normalize(24),
    resizeMode: 'contain',
  },
});
