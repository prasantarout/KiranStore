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
  FlatList,
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
import ProductReducer, {
  CreateurchaseOrderRequest,
  VendorAddRequest,
  VendorListRequest,
  clearBarcodeDetails,
  clearProductDetails,
  createurchaseOrderRequest,
  getProductDetailsRequest,
  getPurchaseProductRequest,
  purchaseOrderRequest,
} from '../../redux/reducer/ProductReducer';
import {useSelector, useDispatch} from 'react-redux';
import Loader from '../../utils/helpers/Loader';
import {debug} from 'react-native-reanimated';
import {Fonts, Icons} from '../../themes/ImagePath';
import Modal from 'react-native-modal';
import { Alert } from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';

const Purchase = props => {
  const data = [
    {label: 'Upi', value: '1'},
    {label: 'Card', value: '2'},
    {label: 'Cash', value: '3'},
  ];

  const productId = props?.route?.params?.product;
  
  const purchaseFlag = props?.route?.params?.purchaseFlag;


  const quantities1 = ['Yes', 'No'];
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [value1, setValue1] = useState(null);
  const [isFocus1, setIsFocus1] = useState(false);
  const [CalenderVisible, setCalenderVisible] = useState(false);
  const [gstDetails, setGstDetails] = useState('');
  const [name, setName] = useState('');
  const [address, setaddress] = useState('');
  const [phone, setPhoneNumber] = useState('');
  const [isModalVisible2, setModalVisible2] = useState(false);
  const [email, setEmail] = useState('');
  const [limit, setLimit] = useState(10);
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  // const [CalenderVisible, setCalenderVisible] = useState(false);
  const [CalenderVisible1, setCalenderVisible1] = useState(false);
  const [CalenderVisible2, setCalenderVisible2] = useState(false);
  const [isModalVisible1, setIsModalVisible1] = useState(false);

  const [vendor, setVendor] = useState('');
  const [price, setPrice] = useState('');
  const [invoice, setInvoice] = useState('');
  const [billDate, setBillDate] = useState('');
  const [discount, setDiscount] = useState('');
  const [labour, setLabour] = useState('');
  const [vehicleCharge, setVehicleCharge] = useState('');
  const [Replaceble, setReplaceble] = useState('');

  const toggleModal1 = () => {
    setIsModalVisible1(!isModalVisible1);
  };

  const hideDatePicker = () => {
    setCalenderVisible(false);
  };
  const dispatch = useDispatch();

  const handleConfirm = (date, productIndex, variantIndex) => {
   
    const formattedDate = moment(date).format('MM/DD/YYYY');
    
    handleChange(formattedDate, variantIndex, productIndex, 'expiryDate');
    setCalenderVisible(false); // Close the date picker modal
  };

  const handleConfirm1 = (date, productIndex, variantIndex) => {
    const formattedDate = moment(date).format('MM/DD/YYYY');
    handleChange(formattedDate, variantIndex, productIndex, 'expiryDateAlert');
    setCalenderVisible1(false); // Close the date picker modal
  };

  const handleConfirm2 = (date, productIndex, variantIndex) => {
    const formattedDate = moment(date).format('MM/DD/YYYY');
    setBillDate(formattedDate);
    // handleChange(formattedDate,variantIndex,productIndex,'expiryDateAlert');
    setCalenderVisible2(false); // Close the date picker modal
  };

  const toggleBottomSheet = () => {
    setBottomSheetVisible(!isBottomSheetVisible);
    handleClosePress();
  };
  const toggleModal2 = () => {
    setModalVisible2(!isModalVisible2);
  };

  const handleQuantitySelect1 = (value, index, productIndex) => {
    console.log(value, index, productIndex, '>>>>>>>>>>gst');
    const updatedVariants = [...variants];
    const targetVariant = updatedVariants[index].find(
      (variant, i) => i === index,
    );

    if (targetVariant) {
      targetVariant.inclusiveGst = value;
      setVariants(updatedVariants);
    }
    setModalVisible2(false); // Close the modal after selection
  };



//*************************************************remove variant********************************************************************************************************

  const handleRemoveVariant = (productIndex, variantIndex) => {
    // Show an alert to confirm removal
    Alert.alert(
      'Product Remove',
      'Are you sure you want to remove this Prooduct?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            // If the user selects "Yes", proceed to remove the variant
            const updatedVariants = [...variants];
            updatedVariants[productIndex].splice(variantIndex, 1);
            setVariants(updatedVariants);
            ProductReducer.getProductDetailsRes
           dispatch(clearProductDetails(''));
          },
        },
      ],
      { cancelable: false }
    );
  };
  
//*******************************end remove varinat ****************************************************

  const bottomSheetRef = useRef(null);
  const handleClosePress = () => bottomSheetRef.current.close();

  const ProductReducer = useSelector(state => state.ProductReducer);


  //***********************************getting vendor list***************************************
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

  //******************************end*********************************
  let status = '';
  if (status == '' || ProductReducer.status != status) {
    switch (ProductReducer.status) {
      case 'Product/VendorAddRequest':
        status = ProductReducer.status;
        break;
      case 'Product/VendorAddSuccess':
        status = ProductReducer.status;
        console.log(status, 'Fsfdnk');
        handleClosePress();
        // props.navigation.navigate('OtpScreen',{item:AuthReducer.signupResponse?.token})
        // dispatch(VendorListRequest({ user_id }));
        GettingItem();

        break;
      case 'Product/VendorAddFailure':
        status = ProductReducer.status;
        break;

      case 'Product/getProductDetailsRequest':
        status = ProductReducer.status;
        break;
      case 'Product/getProductDetailsSuccess':
        status = ProductReducer.status;
        console.log(status, 'Fsfdnk');
        //  dispatch(getPurchaseProductRequest())
        break;
      case 'Product/getProductDetailsFailure':
        status = ProductReducer.status;
        break;
    }
  }

  //***********************************gettting product detials to render the varinat based on product length*************************************
  async function getProductDetails(productId) {
    var dataValue;
    await AsyncStorage.getItem('user_id').then(value => {
      if (value != null) {
        const data = value;
        dataValue = data;
      }
    });
    let obj = new FormData();
    obj.append('user_id', dataValue);
    obj.append('product_id', productId.product_id);
    obj.append('variant_id', productId.variant_id);
  
    // return
    dispatch(getProductDetailsRequest(obj));
  }

// end product detials************************************


  const [showVariants, setShowVariants] = useState(false);
  const [currentVariantIndex, setCurrentVariantIndex] = useState(0);

 
 
  React.useEffect(() => {
    const unsubscribe = props?.navigation.addListener('focus', () => {
      if (
        purchaseFlag === undefined ||
        ProductReducer.getProductDetailsRes.length > 0
      ) {
        getProductDetails(productId);
        setShowVariants(true);
        setCurrentVariantIndex(0); // Set the initial index when navigating to the screen
      }
      GettingItem();
    });
    return unsubscribe;
  }, [props?.navigation, isFocus, purchaseFlag, productId]);

  
  const [variants, setVariants] = useState([]);
 
//***********************dynamically set variant filed with the product detials item like mrp etc*******************************************
  useEffect(() => {
    // debugger;
    // Assuming getProductDetailsRes is an array of variants
    if (ProductReducer?.getProductDetailsRes) {
      const initialVariants = ProductReducer?.getProductDetailsRes?.map(
        productDetails =>
          productDetails?.map(variant => ({
            productId: variant?.product_id,
            variantId: variant?.variant_id,
            product_name: variant?.product_name,
            quantity: variant.quantity ? variant.quantity : '',
            mrp: variant.mrp ? variant.mrp : '',
            batch_no: variant.batch_no ? variant.batch_no : '',
            purchase: variant.purchase_price ? variant.purchase_price : '',
            expiryDate: variant?.exp_date ? variant?.exp_date : '',
            expiryDateAlert: variant?.exp_date_alert
              ? variant?.exp_date_alert
              : '',
            mobile_price: variant?.mobile_sale_price
              ? variant?.mobile_sale_price
              : '',
            store_price: variant?.unit_store_price
              ? variant?.unit_store_price
              : '',
            wholesale_price: variant?.wholesale_sale_price
              ? variant?.wholesale_sale_price
              : '',
            inclusiveGst: variant?.inclusiveGst ? variant?.inclusiveGst : 'yes',
          })),
      );
      setVariants(initialVariants);
    }
  }, [ProductReducer?.getProductDetailsRes]);
 
  // end of dynamically render

//**************************his method used for change the variant filed value/user can manually chnage*******************************
const handleChange = (text, productIndex, variantIndex, property) => {
    const updatedVariants = [...variants]; // Copy the variants array
    updatedVariants[productIndex][variantIndex][property] = text; // Update the specific property
    setVariants(updatedVariants);
  };
//***************************************************************************************** */
  const [apiCallSuccess, setApiCallSuccess] = useState(
    Array(variants.length).fill(false),
  );
  
  /**********************generating random sessionId for add product it should be single and unique unitll user click on save button*****************************/ 
  const generateRandomSessionId = () => {
    // Generate a random alphanumeric string for the session ID
    const randomSessionId = Math.random().toString(36).substring(2, 15);
    return randomSessionId;
  };
  const sessionId = generateRandomSessionId();



/************************************this function call for add product api call******************************************************/ 

  const AddProductDetails = async () => {
    const dataValue = await AsyncStorage.getItem('user_id');

    if (!dataValue) {
      showErrorAlert('User ID not found');
      return;
    }

    for (let i = 0; i < variants.length; i++) {
      const variantArray = variants[i]; // Access the inner array
      const variant = variantArray[0];
      console.log(variant, 'vanzxczxcx>..............');

      if (
        !variant.quantity ||
        !variant.mrp ||
        !variant.purchase ||
        !variant.batch_no ||
        !variant.expiryDate ||
        !variant.expiryDateAlert ||
        !variant.inclusiveGst ||
        !variant.mobile_price ||
        !variant.store_price ||
        !variant.wholesale_price
      ) {
        showErrorAlert('All fields are required for the purchase');
        return;
      }

      let obj = new FormData();
      obj.append('user_id', dataValue);
      obj.append('token', sessionId);
      obj.append('product_id', variant.productId);
      obj.append('variant_id', variant.variantId);
      obj.append('quantity', variant.quantity);
      obj.append('mrp', variant.mrp);
      obj.append('purchase_price', variant.purchase);
      obj.append('batch_no', variant.batch_no);
      obj.append('exp_date', variant.expiryDate);
      obj.append('exp_date_alert', variant.expiryDateAlert);
      obj.append('inclusive_gst', variant.inclusiveGst);
      obj.append('mobile_price', variant.mobile_price);
      obj.append('store_price', variant.store_price);
      obj.append('wholesale_price', variant.wholesale_price);
      console.log(obj, 'Dxcnxcxc>>>>>>>>>>>');
      // return
      try {
        await connectionrequest();
        dispatch(purchaseOrderRequest(obj));

        // Wait for the API call to complete before proceeding to the next variant
        await new Promise(resolve => setTimeout(resolve, 1000)); // Adjust the delay as needed

        // Set the state for the corresponding variant based on the ProductReducer status
        if (ProductReducer?.status === 'Product/purchaseOrderSuccess') {
          setApiCallSuccess(prevState => {
            const newState = [...prevState];
            newState[i] = true;
            return newState;
          });
        }
      } catch (err) {
        showErrorAlert('Please connect to the Internet');
        return;
      }
    }
  };

/************************end of add product********************************/ 

  // user_id,invoice_no,token,date,vendor_id, discount_percentage,labour_chage,vehicle_charge,replaceble


/**********************this function is for save purchase and this is final save for purchase**************************************/ 

  const SavePurchase = async() => {
    const dataValue = await AsyncStorage.getItem('user_id');

    if (!dataValue) {
      showErrorAlert('User ID not found');
      return;
    }
    if(variants.length===0){
      showErrorAlert('Please add product on bills');
      return;
    }
    if(vendor==''){
      showErrorAlert('Please select vendor');
      return;
    }
    if(invoice===''){
      showErrorAlert('Please enter invoice');
      return;
    }
    if(billDate==''){
      showErrorAlert('please enter bill date')
      return
    }
    if(discount===''){
      showErrorAlert('please enter discount percentge')
      return
    }
    if(labour===''){
      showErrorAlert('Please enter labour charge');
      return
    }
    if(vehicleCharge===''){
      showErrorAlert('Please enter vehicle charge');
      return
    }
   let obj=new FormData();
   obj.append('user_id',dataValue)
   obj.append('token',sessionId)
   obj.append('vendor_id',vendor);
   obj.append('invoice_no',invoice);
   obj.append('discount_percentage',discount)
   obj.append('date',billDate)
   obj.append('labour_chage',labour)
   obj.append('vehicle_charge',vehicleCharge)
   obj.append('replaceble',Replaceble)
   dispatch(createurchaseOrderRequest(obj))
  };

/**********************this function is for save purchase and this is final save for purchase**************************************/ 


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



  return (
    <SafeView>
      <CommonLinearGradient
        heading={'Purchase'}
        title={'Add Supplier'}
        flag={16}
        onPress={toggleBottomSheet}
      />
      <Loader visible={ProductReducer.status === 'Product/VendorAddRequest'} />
      <Loader visible={ProductReducer.status === 'Product/getProductDetailsRequest'} />
      <Loader visible={ProductReducer?.status === 'Product/purchaseOrderRequest'} />
      <Loader visible={ProductReducer?.status === 'Product/createurchaseOrderRequest'} />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1, paddingBottom: '20%'}}
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
                  valueField="id"
                  placeholder={!isFocus ? 'Select vendors' : '....'}
                  // searchPlaceholder="Search..."
                  value={value}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    console.log(item.name, 'dsdmdjdzvendor');
                    setValue(item);
                    setVendor(item?.id);
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
                  // search
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
                    setPrice(item?.value);
                    setIsFocus1(false);
                  }}
                />
              </View>
            </View>
            <View style={styles.inputSection1}>
              <View style={{flex: 1, marginRight: 10}}>
                <TextInputItem
                  viewbordercolor="red"
                  placeholder={'Invoice.'}
                  width={normalize(140)}
                  height={normalize(45)}
                  borderWidth={1}
                  borderRadius={10}
                  marginTop={normalize(5)}
                  value={invoice}
                  onChangeText={val => setInvoice(val)}
                  textColor={Colors.placeholder}
                  placeholderTextColor={Colors.placeholder}
                  isRightIconVisible={false}
                  fontSize={13}
                  fontFamily="Poppins-Medium"
                />
              </View>
              <TouchableOpacity
                style={{flex: 1}}
                onPress={() => setCalenderVisible2(!CalenderVisible2)}>
                <TextInputItem
                  viewbordercolor="red"
                  placeholder={'Bill Date.'}
                  width={normalize(140)}
                  height={normalize(45)}
                  borderWidth={1}
                  borderRadius={10}
                  marginTop={normalize(5)}
                  value={billDate}
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

            <View style={{flexDirection: 'column', marginBottom: 10}}>
              {showVariants &&
                variants?.map((productDetails, productIndex) =>
                  productDetails.map((variant, variantIndex) => (
                    <>
                      <View
                        style={[
                          styles.container_section,
                          {marginBottom: normalize(10)},
                        ]}
                        key={`${productIndex}-${variantIndex}`}>
                        <View style={styles.accordionHeader}>
                          <Text
                            style={{
                              color: Colors.black,
                              marginLeft: normalize(5),
                            }}>
                            {variant.product_name}
                          </Text>
                          <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity>
                              <Text>Rs {variant.mrp ? variant.mrp:'0'}</Text>
                            </TouchableOpacity>
                            {/* {numVariants > 1 &&  */}
                            {variantIndex?.length > 0 && (
                              <TouchableOpacity
                                onPress={() => {
                                  // if (numVariants > 1) {
                                  //   setNumVariants(numVariants - 1);
                                  // }
                                  handleRemoveVariant(
                                    productIndex,
                                    variantIndex,
                                  );
                                }}>
                                <Image
                                  source={Icons.delete}
                                  style={{
                                    height: normalize(20),
                                    width: normalize(20),
                                    marginLeft: normalize(10),
                                  }}
                                />
                              </TouchableOpacity>
                            )}
                          </View>
                        </View>

                        <View style={styles.accordionContent}>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}>
                            <View
                              style={[styles.inputSection, {marginLeft: 2}]}>
                              <Text
                                style={{
                                  fontSize: normalize(12),
                                  color: Colors.black,
                                }}>
                                Quantity
                              </Text>
                              <TextInputItem
                                viewbordercolor="red"
                                placeholder={'0'}
                                width={normalize(265)}
                                keyboardType={'numeric'}
                                height={normalize(50)}
                                borderWidth={1}
                                borderRadius={10}
                                marginTop={normalize(5)}
                                value={
                                  variants[productIndex][variantIndex][
                                    'quantity'
                                  ]
                                }
                                onChangeText={text =>
                                  handleChange(
                                    text,
                                    productIndex,
                                    variantIndex,
                                    'quantity',
                                  )
                                }
                                textColor={Colors.placeholder}
                                placeholderTextColor={Colors.placeholder}
                                isRightIconVisible={false}
                                fontSize={13}
                                fontFamily="Poppins-Medium"
                              />
                            </View>
                          </View>

                          <View
                            style={{
                              flexDirection: 'row', // Text inputs are horizontal
                              justifyContent: 'space-between',
                            }}>
                            <View
                              style={{
                                // flexDirection:
                                //   numTextInputs === 0 ? 'row' : 'column',
                                justifyContent: 'space-between',
                              }}>
                              {/* {[...Array(numTextInputs).keys()].map(key => {
                          return ( */}
                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  marginHorizontal: normalize(5),
                                }}>
                                <View style={styles.inputSection}>
                                  <Text
                                    style={{
                                      fontSize: normalize(12),
                                      color: Colors.black,
                                    }}>
                                    Mrp
                                  </Text>
                                  <TextInputItem
                                    viewbordercolor="red"
                                    placeholder={'RS.0'}
                                    width={normalize(125)}
                                    height={normalize(50)}
                                    borderWidth={1}
                                    borderRadius={10}
                                    marginTop={normalize(5)}
                                    keyboardType={'numeric'}
                                    value={variant.mrp}
                                    onChangeText={text =>
                                      handleChange(
                                        text,

                                        productIndex,
                                        variantIndex,
                                        'mrp',
                                      )
                                    }
                                    textColor={Colors.placeholder}
                                    placeholderTextColor={Colors.placeholder}
                                    isRightIconVisible={false}
                                    fontSize={13}
                                    fontFamily="Poppins-Medium"
                                  />
                                </View>

                                <View
                                  style={[
                                    styles.inputSection,
                                    {marginLeft: normalize(11)},
                                  ]}>
                                  <Text
                                    style={{
                                      fontSize: normalize(12),
                                      color: Colors.black,
                                    }}>
                                    Purchase price
                                  </Text>
                                  <TextInputItem
                                    viewbordercolor="red"
                                    placeholder={'0'}
                                    width={normalize(125)}
                                    height={normalize(50)}
                                    borderWidth={1}
                                    borderRadius={10}
                                    keyboardType={'numeric'}
                                    marginTop={normalize(5)}
                                    value={variant.purchase}
                                    onChangeText={text =>
                                      handleChange(
                                        text,

                                        productIndex,
                                        variantIndex,
                                        'purchase',
                                      )
                                    }
                                    textColor={Colors.placeholder}
                                    placeholderTextColor={Colors.placeholder}
                                    isRightIconVisible={false}
                                    fontSize={13}
                                    fontFamily="Poppins-Medium"
                                  />
                                </View>
                              </View>
                            </View>
                          </View>

                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              marginHorizontal: normalize(5),
                              // marginTop: normalize(20),
                            }}>
                            <View style={styles.inputSection}>
                              <Text
                                style={{
                                  fontSize: normalize(12),
                                  color: Colors.black,
                                }}>
                                Batch
                              </Text>
                              <TextInputItem
                                viewbordercolor="red"
                                placeholder={'batch no'}
                                width={normalize(125)}
                                height={normalize(50)}
                                borderWidth={1}
                                borderRadius={10}
                                marginTop={normalize(5)}
                                value={variant.batch_no}
                                onChangeText={text =>
                                  handleChange(
                                    text,

                                    productIndex,
                                    variantIndex,
                                    'batch_no',
                                  )
                                }
                                textColor={Colors.placeholder}
                                placeholderTextColor={Colors.placeholder}
                                isRightIconVisible={false}
                                fontSize={13}
                                fontFamily="Poppins-Medium"
                              />
                            </View>

                            <View style={[styles.inputSection]}>
                              <Text
                                style={{
                                  fontSize: normalize(12),
                                  color: Colors.black,
                                }}>
                                Expiry date
                              </Text>
                              <TouchableOpacity
                                onPress={() =>
                                  setCalenderVisible(!CalenderVisible)
                                }>
                                <TextInputItem
                                  viewbordercolor="red"
                                  placeholder={'Expiry date'}
                                  width={normalize(125)}
                                  height={normalize(50)}
                                  borderWidth={1}
                                  borderRadius={10}
                                  marginTop={normalize(5)}
                                  value={variant.expiryDate}
                                  // onChangeText={val => setaddress(val)}
                                  textColor={Colors.placeholder}
                                  placeholderTextColor={Colors.placeholder}
                                  isRightIconVisible={false}
                                  fontSize={13}
                                  fontFamily="Poppins-Medium"
                                  editable={false}
                                />
                              </TouchableOpacity>
                            </View>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              marginHorizontal: normalize(5),
                            }}>
                            <View style={styles.inputSection}>
                              <Text
                                style={{
                                  fontSize: normalize(12),
                                  color: Colors.black,
                                }}>
                                Expiry date alert
                              </Text>
                              <TouchableOpacity
                                onPress={() =>
                                  setCalenderVisible1(!CalenderVisible1)
                                }>
                                <TextInputItem
                                  viewbordercolor="red"
                                  placeholder={'expiry date alert'}
                                  width={normalize(125)}
                                  height={normalize(50)}
                                  borderWidth={1}
                                  borderRadius={10}
                                  marginTop={normalize(5)}
                                  value={variant.expiryDateAlert}
                                  // onChangeText={val => setExpirydateAlert(val)}
                                  textColor={Colors.placeholder}
                                  placeholderTextColor={Colors.placeholder}
                                  isRightIconVisible={false}
                                  fontSize={13}
                                  fontFamily="Poppins-Medium"
                                  editable={false}
                                />
                              </TouchableOpacity>
                            </View>

                            <View style={[styles.inputSection]}>
                              <Text
                                style={{
                                  fontSize: normalize(12),
                                  color: Colors.black,
                                  bottom: 15,
                                }}>
                                Inclusive gst
                              </Text>
                              <TouchableOpacity
                                style={[
                                  styles.dropdownButton1,
                                  {bottom: normalize(6)},
                                ]}
                                onPress={() => toggleModal2(variantIndex)}>
                                <Text style={styles.dropdownButtonText}>
                                  {variant.inclusiveGst || 'Yes'}
                                </Text>
                                <Image
                                  source={Icons.down} // Replace with your down arrow image
                                  style={styles.downArrow}
                                />
                              </TouchableOpacity>
                            </View>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              marginHorizontal: normalize(5),
                              // marginTop: normalize(10),
                            }}>
                            <View style={styles.inputSection}>
                              <Text
                                style={{
                                  fontSize: normalize(12),
                                  color: Colors.black,
                                }}>
                                Mobile sale price
                              </Text>
                              <TextInputItem
                                viewbordercolor="red"
                                placeholder={'RS.0'}
                                width={normalize(125)}
                                height={normalize(50)}
                                borderWidth={1}
                                borderRadius={10}
                                keyboardType={'numeric'}
                                marginTop={normalize(5)}
                                // value={mobileSalePrice}
                                // onChangeText={val => setMobileSalePrice(val)}
                                value={variant.mobile_price}
                                onChangeText={text =>
                                  handleChange(
                                    text,

                                    productIndex,
                                    variantIndex,
                                    'mobile_price',
                                  )
                                }
                                textColor={Colors.placeholder}
                                placeholderTextColor={Colors.placeholder}
                                isRightIconVisible={false}
                                fontSize={13}
                                fontFamily="Poppins-Medium"
                              />
                            </View>

                            <View style={[styles.inputSection]}>
                              <Text
                                style={{
                                  fontSize: normalize(12),
                                  color: Colors.black,
                                }}>
                                Store sale price
                              </Text>
                              <TextInputItem
                                viewbordercolor="red"
                                placeholder={'0'}
                                width={normalize(125)}
                                height={normalize(50)}
                                borderWidth={1}
                                borderRadius={10}
                                keyboardType={'numeric'}
                                marginTop={normalize(5)}
                                // value={storeSalePrice}
                                // onChangeText={val => setStoreSalePrice(val)}
                                value={variant.store_price}
                                onChangeText={text =>
                                  handleChange(
                                    text,

                                    productIndex,
                                    variantIndex,
                                    'store_price',
                                  )
                                }
                                textColor={Colors.placeholder}
                                placeholderTextColor={Colors.placeholder}
                                isRightIconVisible={false}
                                fontSize={13}
                                fontFamily="Poppins-Medium"
                              />
                            </View>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              marginHorizontal: normalize(5),
                              // marginTop: normalize(10),
                            }}>
                            <View style={styles.inputSection}>
                              <Text
                                style={{
                                  fontSize: normalize(12),
                                  color: Colors.black,
                                }}>
                                Wholesale sale price
                              </Text>
                              {/* wholesale_price */}
                              <TextInputItem
                                viewbordercolor="red"
                                placeholder={'RS.0'}
                                width={normalize(260)}
                                height={normalize(50)}
                                borderWidth={1}
                                borderRadius={10}
                                keyboardType={'numeric'}
                                marginTop={normalize(5)}
                                // value={WholesalePrice}
                                // onChangeText={val => setwholePrice(val)}
                                value={variant.wholesale_price}
                                onChangeText={text =>
                                  handleChange(
                                    text,

                                    productIndex,
                                    variantIndex,
                                    'wholesale_price',
                                  )
                                }
                                textColor={Colors.placeholder}
                                placeholderTextColor={Colors.placeholder}
                                isRightIconVisible={false}
                                fontSize={13}
                                fontFamily="Poppins-Medium"
                              />
                            </View>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'center',
                              alignItems: 'center',
                              // flex:1
                            }}>
                            <TouchableOpacity
                              style={{
                                padding: 10,
                                borderWidth: 1,
                                borderColor: Colors.primaryColor,
                                borderRadius: 10,
                                width: '45%',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                              onPress={()=>handleRemoveVariant(productIndex,variantIndex)}
                              >
                              <Text
                                style={{
                                  fontSize: 15,
                                  fontFamily: Fonts.Poppins_Medium,
                                  color: Colors.textColor,
                                }}>
                                Remove
                              </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={{
                                padding: 10,
                                borderWidth: 2,
                                // borderColor: Colors.primaryColor,
                                backgroundColor: Colors.darkblue,
                                borderRadius: 10,
                                width: '45%',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginLeft: 10,
                              }}
                              onPress={() =>
                                AddProductDetails(productIndex, variantIndex)
                              }
                              disabled={apiCallSuccess[productIndex]}>
                              <Text
                                style={{
                                  fontSize: 15,
                                  fontFamily: Fonts.Poppins_Medium,
                                  color: Colors.white,
                                }}>
                                Add
                              </Text>
                            </TouchableOpacity>
                          </View>
                          <DateTimePickerModal
                            textColor={Colors.primaryColor}
                            backdropStyleIOS={Colors.primaryColor}
                            buttonTextColorIOS={Colors.primaryColor}
                            isVisible={CalenderVisible}
                            mode="date"
                            onConfirm={date =>
                              handleConfirm(date, variantIndex, productIndex)
                            }
                            onCancel={() => setCalenderVisible(false)}
                          />
                          <DateTimePickerModal
                            textColor={Colors.primaryColor}
                            backdropStyleIOS={Colors.primaryColor}
                            buttonTextColorIOS={Colors.primaryColor}
                            isVisible={CalenderVisible1}
                            mode="date"
                            onConfirm={date =>
                              handleConfirm1(date, variantIndex, productIndex)
                            }
                            onCancel={() => setCalenderVisible1(false)}
                          />
                        </View>
                      </View>
                      <Modal
                        animationType="pop"
                        transparent={true}
                        visible={isModalVisible2}
                        onBackdropPress={() => setModalVisible2(false)}
                        onRequestedClose={() => setModalVisible2(false)}>
                        <View style={styles.modalContainer1}>
                          <View style={styles.modalContent1}>
                            <FlatList
                              data={quantities1}
                              keyExtractor={item => item}
                              renderItem={({item, index}) => (
                                <TouchableOpacity
                                  style={styles.modalItem}
                                  onPress={() =>
                                    handleQuantitySelect1(
                                      item,
                                      productIndex,
                                      index,
                                    )
                                  }>
                                  <Text style={styles.modalItemText}>
                                    {item}
                                  </Text>
                                </TouchableOpacity>
                              )}
                            />
                          </View>
                        </View>
                      </Modal>
                    </>
                  )),
                )}
            </View>
            <DateTimePickerModal
              textColor={Colors.primaryColor}
              backdropStyleIOS={Colors.primaryColor}
              buttonTextColorIOS={Colors.primaryColor}
              isVisible={CalenderVisible2}
              mode="date"
              onConfirm={date => handleConfirm2(date)}
              onCancel={() => setCalenderVisible2(false)}
            />
          </View>
          <View style={styles.inputSections}>
            <View style={styles.inputRow}>
              <Text style={styles.labelName}>Total Amount:</Text>
              <TextInput
                style={styles.input1}
                placeholder="Rs 0"
                textAlign="left"
              />
            </View>
          </View>
          {/* <View
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
          </View> */}
          <View style={{flexDirection: 'column'}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginHorizontal: normalize(15),
                marginTop: normalize(20),
              }}>
              <View style={styles.inputSection}>
                <Text
                  style={{
                    fontSize: normalize(12),
                    color: Colors.black,
                  }}>
                  Discount Percentage
                </Text>
                <TextInputItem
                  viewbordercolor="red"
                  placeholder={'Discount Percentage'}
                  width={normalize(140)}
                  height={normalize(50)}
                  borderWidth={1}
                  borderRadius={10}
                  keyboardType={'numeric'}
                  marginTop={normalize(5)}
                  value={discount}
                  onChangeText={val => setDiscount(val)}
                  // value={variant.mobile_price}
                  // onChangeText={text =>
                  //   handleChange(text, index, 'mobile_price')
                  // }
                  textColor={Colors.placeholder}
                  placeholderTextColor={Colors.placeholder}
                  isRightIconVisible={false}
                  fontSize={13}
                  fontFamily="Poppins-Medium"
                />
              </View>

              <View style={[styles.inputSection]}>
                <Text
                  style={{
                    fontSize: normalize(12),
                    color: Colors.black,
                  }}>
                  Labour Chage
                </Text>
                <TextInputItem
                  viewbordercolor="red"
                  placeholder={'Labour Chage'}
                  width={normalize(140)}
                  height={normalize(50)}
                  borderWidth={1}
                  borderRadius={10}
                  keyboardType={'numeric'}
                  marginTop={normalize(5)}
                  value={labour}
                  onChangeText={val => setLabour(val)}
                  // value={variant.store_price}
                  // onChangeText={text =>
                  //   handleChange(text, index, 'store_price')
                  // }
                  textColor={Colors.placeholder}
                  placeholderTextColor={Colors.placeholder}
                  isRightIconVisible={false}
                  fontSize={13}
                  fontFamily="Poppins-Medium"
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginHorizontal: normalize(15),
                // marginTop: normalize(20),
              }}>
              <View style={styles.inputSection}>
                <Text
                  style={{
                    fontSize: normalize(12),
                    color: Colors.black,
                  }}>
                  Vehicle Charge
                </Text>
                <TextInputItem
                  viewbordercolor="red"
                  placeholder={'vehicle charge'}
                  width={normalize(140)}
                  height={normalize(50)}
                  borderWidth={1}
                  borderRadius={10}
                  keyboardType={'numeric'}
                  marginTop={normalize(5)}
                  value={vehicleCharge}
                  onChangeText={val => setVehicleCharge(val)}
                  // value={variant.mobile_price}
                  // onChangeText={text =>
                  //   handleChange(text, index, 'mobile_price')
                  // }
                  textColor={Colors.placeholder}
                  placeholderTextColor={Colors.placeholder}
                  isRightIconVisible={false}
                  fontSize={13}
                  fontFamily="Poppins-Medium"
                />
              </View>

              <View style={[styles.inputSection]}>
                <Text
                  style={{
                    fontSize: normalize(12),
                    color: Colors.black,
                  }}>
                  Replaceble
                </Text>
                <TextInputItem
                  viewbordercolor="red"
                  placeholder={'Replaceble'}
                  width={normalize(140)}
                  height={normalize(50)}
                  borderWidth={1}
                  borderRadius={10}
                  // keyboardType={'numeric'}
                  marginTop={normalize(5)}
                  value={Replaceble}
                  onChangeText={val => setReplaceble(val)}
                  // value={variant.store_price}
                  // onChangeText={text =>
                  //   handleChange(text, index, 'store_price')
                  // }
                  textColor={Colors.placeholder}
                  placeholderTextColor={Colors.placeholder}
                  isRightIconVisible={false}
                  fontSize={13}
                  fontFamily="Poppins-Medium"
                />
              </View>
            </View>
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
            }}
            onPress={SavePurchase}
            >
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
        </ScrollView>
        <CommonBottomSheet
          isVisible={isBottomSheetVisible}
          onClose={toggleBottomSheet}
          close={bottomSheetRef}
          moment={2}>
          <ScrollView showsVerticalScrollIndicator={false}>
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
          </ScrollView>
        </CommonBottomSheet>
      </KeyboardAvoidingView>
      {/* <Modal
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
          
            }}>
           
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
      </Modal> */}
      <DateTimePickerModal
        textColor={Colors.primaryColor}
        backdropStyleIOS={Colors.primaryColor}
        buttonTextColorIOS={Colors.primaryColor}
        isVisible={CalenderVisible1}
        mode="date"
        onConfirm={date => handleConfirm1(date, index)}
        onCancel={() => setCalenderVisible1(false)}
      />
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
  inputSection1: {
    marginTop: 15,
    flexDirection: 'row',
  },
  inputSections: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    // width:'90%',
    marginHorizontal: normalize(12),
    backgroundColor: Colors.rejectedBtnColor,
    // bottom: normalize(20),
    marginTop: normalize(20),
    borderRadius: 10,
  },
  inputRow: {
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-between',
    bottom: 10,
    margin: 10,
    borderRadius: 10,
  },
  labelName: {
    width: 100, // Adjust the width as needed
    fontSize: 16,
    marginTop: 20,
    color: Colors.black,
  },
  input1: {
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

  accordionContent: {
    padding: 10,
  },
  inputSection: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingLeft: 10,
  },

  image: {
    width: 80, // Adjust the width as needed
    height: 80, // Adjust the height as needed
    resizeMode: 'contain',
  },
  rightContent: {
    flex: 1,
    marginLeft: 20, // Add spacing between the image and right content
  },
  textInputSection: {
    marginBottom: 20, // Add spacing between sections
  },
  dropdownSection: {
    backgroundColor: Colors.lightGrey,
    padding: normalize(3),
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    // Add styling for the custom dropdown section
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingLeft: 10,
    marginTop: 5,
  },
  dropdownButton1: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.placeholder,
    borderRadius: 10,
    padding: normalize(10),
    width: normalize(125),
    height: normalize(50),

    // marginTop: 5,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.placeholder,
    borderRadius: 10,
    padding: normalize(8),
    // left:10,
    width: normalize(120),
    height: normalize(50),

    backgroundColor: Colors.backGround,
    // marginTop: 5,
  },
  dropdownButtonText: {
    flex: 1,
  },
  downArrow: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    width: normalize(100),
    marginHorizontal: normalize(170),
    marginBottom: normalize(28),
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  modalContainer1: {
    flex: 1,
    justifyContent: 'center',
    position: 'absolute',
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent1: {
    backgroundColor: 'white',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    width: normalize(100),
    marginHorizontal: normalize(170),
    // marginTop:normalize(300),

    bottom: 0,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  modalItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    // borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  modalItemText: {
    fontSize: 16,
    textAlign: 'center',
  },
  container_section: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    width: '100%',
    // margin: 10,
  },
  accordionHeader: {
    backgroundColor: 'lightgray',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontWeight: 'bold',
  },
  accordionContent: {
    padding: 10,
  },
  inputSection: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingLeft: 10,
  },
  container_section1: {
    alignItems: 'center', // Center the content horizontally
    // marginTop: 30,
  },
  inputContainers: {
    flexDirection: 'row', // Arrange children horizontally
    alignItems: 'center', // Center children vertically
    borderBottomWidth: 1,
    borderColor: 'gray',
    // borderRadius: 5,
    paddingHorizontal: 10,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  textInputs: {
    flex: 1, // Take up remaining space
    marginLeft: 10, // Add spacing between icon and TextInput
  },
});
