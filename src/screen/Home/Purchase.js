import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  Image,
  Button,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import SafeView from '../../components/SafeView';
import CommonLinearGradient from '../../components/CommonLinearGradient';
import {Dropdown} from 'react-native-element-dropdown';
import {horizontalScale, verticalScale} from '../../utils/helpers/dimen1';
import TextInputItem from '../../components/TextInputItem';
import {Colors} from '../../themes/Colors';
import normalize from '../../utils/helpers/dimen';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import CommonBottomSheet from '../../components/BottomSheet';
import showErrorAlert from '../../utils/helpers/Toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import connectionrequest from '../../utils/helpers/NetInfo';
import {
  VendorAddRequest,
  VendorListRequest,
} from '../../redux/reducer/ProductReducer';
import {useSelector, useDispatch} from 'react-redux';
import Loader from '../../utils/helpers/Loader';
import {debug} from 'react-native-reanimated';
import {Icons} from '../../themes/ImagePath';
import Modal from 'react-native-modal';
// import { TouchableOpacity } from 'react-native-gesture-handler';

const Purchase = props => {
  const data = [
    {label: 'Item 1', value: '1'},
    {label: 'Item 2', value: '2'},
    {label: 'Item 3', value: '3'},
    {label: 'Item 4', value: '4'},
    {label: 'Item 5', value: '5'},
    {label: 'Item 6', value: '6'},
    {label: 'Item 7', value: '7'},
    {label: 'Item 8', value: '8'},
  ];
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [value1, setValue1] = useState(null);
  const [isFocus1, setIsFocus1] = useState(false);
  const [CalenderVisible, setCalenderVisible] = useState(false);
  const [gstDetails, setGstDetails] = useState('');
  const [name, setName] = useState('');
  const [address, setaddress] = useState('');
  const [phone, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

  const [isModalVisible1, setIsModalVisible1] = useState(false);

  const toggleModal1 = () => {
    setIsModalVisible1(!isModalVisible1);
  };

  const hideDatePicker = () => {
    setCalenderVisible(false);
  };
  const dispatch = useDispatch();

  const handleConfirm = date => {
    // setDob(moment(date).format("MM/DD/YYYY"));
    setExpirydate(moment(date).format('MM/DD/YYYY'));
    console.log(moment(date).format('MM/DD/YYYY'), 'Fsfnsf');
    hideDatePicker();
  };

  const toggleBottomSheet = () => {
    setBottomSheetVisible(!isBottomSheetVisible);
    handleClosePress();
  };

  const bottomSheetRef = useRef(null);
  const handleClosePress = () => bottomSheetRef.current.close();

  const AddSuppliers = async () => {
    var dataValue;
    await AsyncStorage.getItem('user_id').then(value => {
      if (value != null) {
        const data = value;
        dataValue = data;
      }
    });
    if (name === '') {
      showErrorAlert('Please enter valid name');
    } else if (phone === '') {
      showErrorAlert('Please enter valid phone number');
    } else if (phone.length !== 10) {
      showErrorAlert('Phone number must be 10 digits');
    } else if (address === '') {
      showErrorAlert('Please enter valid address');
    } else if (email === '') {
      showErrorAlert('Please enter valid email');
    } else if (gstDetails === '') {
      showErrorAlert('Please enter valid gst details');
    } else {
      let obj = new FormData();
      obj.append('user_id', dataValue);
      obj.append('name', name);
      obj.append('email', email);
      obj.append('mobile', phone);
      obj.append('gst_no', gstDetails);
      obj.append('address', address);
      connectionrequest()
        .then(() => {
          dispatch(VendorAddRequest(obj));
          // showErrorAlert("Message sent successfully!");
          // setFname("");
          // setLname("");
          // setEmail("");
          // setNumber("");
          // setMsg("");
        })
        .catch(err => {
          showErrorAlert('Please connect To Internet');
        });
    }
  };

  const ProductReducer = useSelector(state => state.ProductReducer);
  console.log(ProductReducer?.getVendorRes?.vendors, 'sndksdsd');

  async function GettingItem() {
    var dataValue;
    await AsyncStorage.getItem('user_id').then(value => {
      if (value != null) {
        const data = value;
        dataValue = data;
      }
    });
    let obj = {
      user_id: dataValue,
    };
    dispatch(VendorListRequest(obj));
  }

  let status = '';
  if (status == '' || ProductReducer.status != status) {
    switch (ProductReducer.status) {
      case 'Product/VendorAddRequest':
        status = ProductReducer.status;
        break;
      case 'Product/VendorAddSuccess':
        status = ProductReducer.status;
        console.log(status, 'Fsfdnk');
        // props.navigation.navigate('OtpScreen',{item:AuthReducer.signupResponse?.token})
        // dispatch(VendorListRequest({ user_id }));
        GettingItem();

        break;
      case 'Product/VendorAddFailure':
        status = ProductReducer.status;
        break;
    }
  }

  return (
    <SafeView>
      <CommonLinearGradient
        heading={'Purchase'}
        title={'Add Supplier'}
        flag={16}
        onPress={toggleBottomSheet}
      />
      <Loader visible={ProductReducer.status === 'Product/VendorAddRequest'} />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1, paddingBottom: '50%'}}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              //   flex: 1,
              width: '90%',
              alignSelf: 'center',
              marginTop: verticalScale(30),
              //   flexDirection: 'row', // Added flexDirection for horizontal layout
              //   alignItems: 'center', // Vertically align content
            }}>
            <View style={styles.container}>
              <View style={{flex: 1}}>
                <Dropdown
                  style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={
                    ProductReducer?.getVendorRes?.vendors?.length > 0
                      ? ProductReducer?.getVendorRes?.vendors
                      : []
                  }
                  // search
                  maxHeight={300}
                  labelField="name"
                  valueField="name"
                  placeholder={!isFocus ? 'Select vendors' : '...'}
                  // searchPlaceholder="Search..."
                  value={value}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    setValue(item.value);
                    setIsFocus(false);
                  }}
                />
              </View>
              <View style={{flex: 1, marginLeft: 10}}>
                <Dropdown
                  style={[styles.dropdown, isFocus1 && {borderColor: 'blue'}]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={data}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus1 ? 'Cash' : '...'}
                  searchPlaceholder="Search..."
                  value={value1}
                  onFocus={() => setIsFocus1(true)}
                  onBlur={() => setIsFocus1(false)}
                  onChange={item => {
                    setValue1(item.value);
                    setIsFocus1(false);
                  }}
                />
              </View>
            </View>
            <View style={styles.inputSection}>
              <View style={{flex: 1, marginRight: 10}}>
                <TextInputItem
                  viewbordercolor="red"
                  placeholder={'Invoice.'}
                  width={normalize(140)}
                  height={normalize(45)}
                  borderWidth={1}
                  borderRadius={10}
                  marginTop={normalize(5)}
                  value={''}
                  // onChangeText={val => setVariantName(val)}
                  textColor={Colors.placeholder}
                  placeholderTextColor={Colors.placeholder}
                  isRightIconVisible={false}
                  fontSize={13}
                  fontFamily="Poppins-Medium"
                />
              </View>
              <TouchableOpacity
                style={{flex: 1}}
                onPress={() => setCalenderVisible(!CalenderVisible)}>
                <TextInputItem
                  viewbordercolor="red"
                  placeholder={'Bill Date.'}
                  width={normalize(140)}
                  height={normalize(45)}
                  borderWidth={1}
                  borderRadius={10}
                  marginTop={normalize(5)}
                  value={''}
                  // onChangeText={val => setVariantName(val)}
                  textColor={Colors.placeholder}
                  placeholderTextColor={Colors.placeholder}
                  isRightIconVisible={false}
                  fontSize={13}
                  fontFamily="Poppins-Medium"
                  editable={false}
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                backgroundColor: Colors.backGround,
                elevation: 3,
                // marginHorizontal: normalize(1),
                paddingHorizontal: 10,
                marginTop: normalize(12),
                width: '100%',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={Icons.gift}
                    style={{height: normalize(15), width: normalize(15)}}
                  />
                  <Text style={{color: Colors.black, marginLeft: normalize(5)}}>
                    Ramdev Hing Premium Strong 100 g
                  </Text>
                </View>
                <Text style={{color: Colors.black}}>Rs 0</Text>
              </View>
              <Text
                style={{
                  marginTop: normalize(2),
                  textAlign: 'left',
                  marginLeft: normalize(22),
                }}>
                Current Quantity: -1
              </Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    marginTop: normalize(15),
                  }}>
                  <TouchableOpacity
                    style={{
                      padding: 10,
                      borderWidth: 1,
                      borderRadius: 15,
                      width: 50,
                    }}
                    onPress={() => toggleModal1()}>
                    <Text style={{color: Colors.black}}>Edit</Text>
                  </TouchableOpacity>

                  <View style={{flex: 1, marginTop: normalize(10)}}>
                    <TouchableOpacity
                      style={{padding: 10, borderWidth: 1, borderRadius: 15}}>
                      <Text>Remove</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{flexDirection: 'column'}}>
                  <View
                    style={{marginTop: normalize(10), flexDirection: 'row'}}>
                    <TextInputItem
                      viewbordercolor="red"
                      placeholder={'Purchase Price.'}
                      width={normalize(100)}
                      height={normalize(45)}
                      borderWidth={1}
                      borderRadius={10}
                      marginTop={normalize(5)}
                      value={''}
                      // onChangeText={val => setVariantName(val)}
                      textColor={Colors.placeholder}
                      placeholderTextColor={Colors.placeholder}
                      isRightIconVisible={false}
                      fontSize={13}
                      fontFamily="Poppins-Medium"
                      editable={false}
                    />
                    <View style={{left: 5}}>
                      <TextInputItem
                        viewbordercolor="red"
                        placeholder={'Quantity.'}
                        width={normalize(100)}
                        height={normalize(45)}
                        borderWidth={1}
                        borderRadius={10}
                        marginTop={normalize(5)}
                        value={''}
                        // onChangeText={val => setVariantName(val)}
                        textColor={Colors.placeholder}
                        placeholderTextColor={Colors.placeholder}
                        isRightIconVisible={false}
                        fontSize={13}
                        fontFamily="Poppins-Medium"
                        editable={false}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      marginTop: normalize(10),
                      flexDirection: 'row',
                    }}>
                    <TextInputItem
                      viewbordercolor="red"
                      placeholder={'WholeSale'}
                      width={normalize(100)}
                      height={normalize(45)}
                      borderWidth={1}
                      borderRadius={10}
                      marginTop={normalize(5)}
                      value={''}
                      // onChangeText={val => setVariantName(val)}
                      textColor={Colors.placeholder}
                      placeholderTextColor={Colors.placeholder}
                      isRightIconVisible={false}
                      fontSize={13}
                      fontFamily="Poppins-Medium"
                      editable={false}
                    />
                    <View style={{left: 5}}>
                      <TextInputItem
                        viewbordercolor="red"
                        placeholder={'Gst'}
                        width={normalize(100)}
                        height={normalize(45)}
                        borderWidth={1}
                        borderRadius={10}
                        marginTop={normalize(5)}
                        value={''}
                        // onChangeText={val => setVariantName(val)}
                        textColor={Colors.placeholder}
                        placeholderTextColor={Colors.placeholder}
                        isRightIconVisible={false}
                        fontSize={13}
                        fontFamily="Poppins-Medium"
                        editable={false}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      marginTop: normalize(10),
                      flexDirection: 'row',
                    }}>
                    <TextInputItem
                      viewbordercolor="red"
                      placeholder={'Discount'}
                      width={normalize(100)}
                      height={normalize(45)}
                      borderWidth={1}
                      borderRadius={10}
                      marginTop={normalize(5)}
                      value={''}
                      // onChangeText={val => setVariantName(val)}
                      textColor={Colors.placeholder}
                      placeholderTextColor={Colors.placeholder}
                      isRightIconVisible={false}
                      fontSize={13}
                      fontFamily="Poppins-Medium"
                      editable={false}
                    />
                    <View style={{left: 5}}>
                      <TextInputItem
                        viewbordercolor="red"
                        placeholder={'Notes'}
                        width={normalize(100)}
                        height={normalize(45)}
                        borderWidth={1}
                        borderRadius={10}
                        marginTop={normalize(5)}
                        value={''}
                        // onChangeText={val => setVariantName(val)}
                        textColor={Colors.placeholder}
                        placeholderTextColor={Colors.placeholder}
                        isRightIconVisible={false}
                        fontSize={13}
                        fontFamily="Poppins-Medium"
                        editable={false}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.inputSections}>
            <View style={styles.inputRow}>
              <Text style={styles.label}>CGST:</Text>
              <TextInput
                style={styles.input}
                placeholder="Rs 0"
                textAlign="left"
              />
            </View>
            <View style={styles.inputRow}>
              <Text style={styles.label}>SGST:</Text>
              <TextInput
                style={styles.input}
                placeholder="Rs 0"
                textAlign="left"
              />
            </View>
            <View style={styles.inputRow}>
              <Text style={styles.label}>Extra:</Text>
              <TextInput
                style={styles.input}
                placeholder="Rs 0"
                textAlign="left"
              />
            </View>
            <View style={styles.inputRow}>
              <Text style={styles.label}>Total Amount:</Text>
              <TextInput
                style={styles.input}
                placeholder="Rs 0"
                textAlign="left"
              />
            </View>
          </View>
          <View
            style={{
              // marginTop: normalize(20),
              backgroundColor: Colors.lightbackground,
              // height: '30%',
              justifyContent: 'center',
              marginHorizontal: 20,
              marginTop: normalize(20),
            }}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{color: Colors.black}}>Total Qty:0</Text>
              <Text style={{color: Colors.black}}>Total Tax Amt: Rs.0</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: normalize(10),
              }}>
              <Text style={{color: Colors.black}}>Total Disc:Rs 0</Text>
              <Text style={{color: Colors.black}}>Subtotal: Rs.0</Text>
            </View>
          </View>
          <View
            style={{marginHorizontal: normalize(10), marginTop: normalize(10)}}>
            <TextInputItem
              viewbordercolor="red"
              placeholder={'Enter Details.'}
              //   width={normalize(140)}
              height={normalize(45)}
              borderWidth={1}
              borderRadius={10}
              marginTop={normalize(5)}
              value={''}
              // onChangeText={val => setVariantName(val)}
              textColor={Colors.placeholder}
              placeholderTextColor={Colors.placeholder}
              isRightIconVisible={false}
              fontSize={13}
              fontFamily="Poppins-Medium"
            />
          </View>
          <TouchableOpacity
            style={{
              padding: normalize(10),
              justifyContent: 'center',
              alignItems: 'center',
              //   backgroundColor: Colors.darkblue,
              borderWidth: 1,
              height: normalize(50),
              borderColor: Colors.darkblue,
              paddingHorizontal: horizontalScale(130),
              borderRadius: 10,
              marginHorizontal: 10,
            }}
            onPress={() => props?.navigation.navigate('TabStack1')}>
            <Text
              style={{
                fontSize: normalize(20),
                fontWeight: '500',
                color: Colors.black,
              }}>
              + Add
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: normalize(10),
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: Colors.darkblue,
              //   borderWidth: 1,
              height: normalize(50),
              borderColor: Colors.darkblue,
              paddingHorizontal: horizontalScale(130),
              borderRadius: 10,
              marginHorizontal: 10,
              marginTop: normalize(20),
            }}>
            <Text
              style={{
                fontSize: normalize(20),
                fontWeight: '500',
                color: Colors.white,
              }}>
              Save
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            textColor={Colors.darkblue}
            backdropStyleIOS={Colors.darkblue}
            buttonTextColorIOS={Colors.darkblue}
            isVisible={CalenderVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
          <CommonBottomSheet
            isVisible={isBottomSheetVisible}
            onClose={toggleBottomSheet}
            close={bottomSheetRef}
            moment={2}>
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
                keyboardType={'numeric'}
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
                placeholder={'email'}
                width={'100%'}
                height={normalize(50)}
                borderWidth={1}
                borderRadius={10}
                marginTop={normalize(10)}
                value={email}
                onChangeText={val => setEmail(val)}
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
                  paddingHorizontal: horizontalScale(140),
                  borderRadius: 10,
                }}
                onPress={AddSuppliers}>
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
      <Modal
        isVisible={isModalVisible1}
        onBackdropPress={toggleModal1}
        style={{
          justifyContent: 'flex-end',
          margin: 0,
        }}>
        <View
          style={{
            backgroundColor: 'white',
            padding: 20,
            alignItems: 'center',
            height: '50%',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}>
          <View
            style={{
              top: normalize(10),
              position: 'absolute',
              right: normalize(93),
              // justifyContent: 'center',
              // alignItems: 'center',
            }}>
            {/* <Image
              style={{height: normalize(100), width: normalize(100)}}
              source={Icons.premium}
            /> */}
            <Text
              style={{
                fontSize: normalize(13),
                fontWeight: '700',
                color: Colors.black,
                marginTop: normalize(10),
                left: 0,
              }}>
              Ramdev Premium high Strong 100g
            </Text>
          </View>
          <View
            style={{
              position: 'absolute',
              flexDirection: 'row',
              alignItems: 'center',

              top: normalize(45),
              left: 0,
              marginHorizontal: normalize(40),
            }}>
            <Text style={{fontSize: normalize(13), marginRight: normalize(10)}}>
              Add / Remove Quantity:
            </Text>

            <TouchableOpacity
              style={{
                backgroundColor: Colors.blue,
                width: 'auto',
                height: normalize(40),
                justifyContent: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: normalize(15),
                borderRadius: 10,
                paddingHorizontal: normalize(10), // Add horizontal padding
              }}>
              <Text
                style={{
                  fontSize: normalize(14),
                  color: Colors.white,
                  fontWeight: '700',
                }}>
                Add
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: Colors.lightGrey,
                //
                height: normalize(40),
                justifyContent: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: normalize(15),
                borderRadius: 10,
                marginLeft: normalize(5),
                paddingHorizontal: normalize(10), // Add horizontal padding
              }}>
              <Text
                style={{
                  fontSize: normalize(14),
                  color: Colors.white,
                  fontWeight: '700',
                }}>
                Remove
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              position: 'absolute',
              flexDirection: 'row',
              alignItems: 'center',

              top: normalize(130),
              left: 0,
              marginHorizontal: normalize(40),
            }}>
            <Text style={{fontSize: normalize(13), marginRight: normalize(10)}}>
              Current Quantity:
            </Text>

            <Text
              style={{
                fontSize: normalize(14),
                color: Colors.black,
                fontWeight: '700',
              }}>
              -1.0
            </Text>

            <Text
              style={{
                left: normalize(5),
                fontSize: 18,
                width: 100,
                fontWeight: '800',
                color: Colors.green,
              }}>
              +
            </Text>
            <View style={{right: normalize(65)}}>
              <TextInputItem
                viewbordercolor="red"
                // placeholder={'Gst'}
                width={normalize(70)}
                height={normalize(50)}
                borderWidth={1}
                borderRadius={10}
                marginTop={normalize(10)}
                right={30}
                // marginRight={normalize(30)}
                value={gstDetails}
                onChangeText={val => setGstDetails(val)}
                textColor={Colors.placeholder}
                placeholderTextColor={Colors.placeholder}
                isRightIconVisible={false}
                fontSize={13}
                fontFamily="Poppins-Medium"
              />
            </View>
            <Text style={{fontSize: normalize(15), right: normalize(60)}}>
              =
            </Text>
            <Text style={{fontSize: normalize(15), right: normalize(50)}}>
              -1.0
            </Text>
          </View>
        </View>
        <View>
          <TouchableOpacity>
            <Text>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Save</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeView>
  );
};

export default Purchase;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'white',

    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  inputSection: {
    marginTop: 15,
    flexDirection: 'row',
  },
  inputSections: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    marginHorizontal: normalize(10),
    backgroundColor: Colors.rejectedBtnColor,
    // bottom: normalize(20),
    marginTop: normalize(20),
  },
  inputRow: {
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    margin: 10,
  },
  label: {
    width: 100, // Adjust the width as needed
    fontSize: 16,
    marginTop: 20,
    color: Colors.black,
  },
  input: {
    // flex: 1,
    // borderWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'gray',
    // borderRadius: 5,
    // paddingLeft:normalize(60),
    height: 40,
    flex: 0.6,
    width: 50,
  },
});
