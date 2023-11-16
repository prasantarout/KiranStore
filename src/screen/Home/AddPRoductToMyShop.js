import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  FlatList,
  Image,
  TextInput,
} from 'react-native';
import SafeView from '../../components/SafeView';
import CommonLinearGradient from '../../components/CommonLinearGradient';
import normalize from '../../utils/helpers/dimen';
import {Colors} from '../../themes/Colors';
import {Fonts, Icons} from '../../themes/ImagePath';
import {verticalScale} from '../../utils/helpers/dimen1';
import CommonBottomSheet from '../../components/BottomSheet';
import TextInputItem from '../../components/TextInputItem';
import {horizontalScale} from '../../utils/helpers/dimen1';
import AsyncStorage from '@react-native-async-storage/async-storage';
import showErrorAlert from '../../utils/helpers/Toast';
import {
  clearBarcodeDetailsRequest,
  clearBarcodeDetailsSuccess,
  getProductByBarcodeRequest,
} from '../../redux/reducer/ProductReducer';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../utils/helpers/Loader';
import {clearProductStatus} from '../../redux/reducer/ProductReducer';
// import BarcodeScanner from 'react-native-scan-barcode';
import {useFocusEffect} from '@react-navigation/native';
const AddPRoductToMyShop = props => {
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [isTorchOn, setIsTorchOn] = useState(false);
  const [barcode, setBarcode] = useState('');
  const [showProduct, setShowProduct] = useState(false);
  const item = props?.route?.params ? props?.route?.params : '';

  const bottomSheetRef = useRef(null);
  const dispatch = useDispatch();
  const handleClosePress = () => bottomSheetRef.current.close();
  const toggleBottomSheet = () => {
    setBottomSheetVisible(!isBottomSheetVisible);
    handleClosePress();
  };

  const ProductReducer = useSelector(state => state.ProductReducer);
  console.log(ProductReducer.getProductByBarcodeRes[0]?.status, 'barocxmcxc');

  const handleSearch = async () => {
    if (barcode === '') {
      showErrorAlert('Please enter a barcode');
    } else {
      try {
        const user_id = await AsyncStorage.getItem('user_id');
        if (user_id !== null) {
          let obj = new FormData();
          obj?.append('user_id', user_id);
          obj?.append('barcode', barcode);
          dispatch(getProductByBarcodeRequest(obj)); // Dispatch your Redux action here
        } else {
          showErrorAlert('User ID not found. Please log in.');
        }
      } catch (error) {
        showErrorAlert('An error occurred while searching for the product.');
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (barcode.length === 12) {
      handleSearch();
    }
  }, [barcode]);

  useEffect(() => {
    let status = '';
    if (status == '' || ProductReducer.status != status) {
      switch (ProductReducer.status) {
        case 'Product/getProductByBarcodeRequest':
          status = ProductReducer.status;

          break;
        case 'Product/getProductByBarcodeSuccess':
          status = ProductReducer.status;
          setShowProduct(true);
          // dispatch(clearProductStatus(ProductReducer.status))
          // props.navigation.navigate('OtpScreen',{item:AuthReducer.signupResponse?.token})
          // dispatch(productGetFromWishListRequest({ user_id }));
          break;
        case 'Product/getProductByBarcodeFailure':
          status = ProductReducer.status;
          setShowProduct(true);
          break;
      }
    }
  }, [ProductReducer]);

  useFocusEffect(
    React.useCallback(() => {
      // Reset the state or perform any other refresh logic here
      // setBarcode('');
      // setShowProduct(false);
    }, []),
  );

  const ProductBox = () => {
    return (
      <>
        {/* {ProductReducer.getProductByBarcodeRes[0]?.message==="Products Found" ? ( */}
        <View style={styles.container}>
          <Text style={{fontSize: 15, marginBottom: normalize(40)}}>
            {ProductReducer.getProductByBarcodeRes[0]?.message ===
            'No Products Found'
              ? 'product not found,are you want to add product manually ?'
              : 'This is the product you were searching for?'}
          </Text>
          <View style={{bottom: 20}}>
            <Image
              source={Icons.gift} // Replace with the actual image source
              style={styles.productImage}
            />
          </View>
          <Text style={{color: 'black'}}>
            {ProductReducer.getProductByBarcodeRes[0]?.message ===
            'No Products Found'
              ? item?.item
              : ProductReducer?.getProductByBarcodeRes[0]?.product_name}
          </Text>
          <Text style={styles.productPrice}>
            {ProductReducer.getProductByBarcodeRes[0]?.message ===
            'No Products Found'
              ? ''
              : `Price Rs ${ProductReducer.getProductByBarcodeRes[0]?.mrp}`}
          </Text>

          <View style={styles.buttonContainer1}>
            <TouchableOpacity
              style={styles.noButton}
              onPress={() =>{
                  setShowProduct(false)
                  // dispatch(clearBarcodeDetailsRequest({}))
              }}>
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.yesButton}
              onPress={() => {
                props?.navigation?.navigate('ProductManually', {
                  item: item?.item,
                });
                // dispatch(clearProductStatus);
              }}>
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* ) : null} */}
      </>
    );
  };

  const [scannerOpen, setScannerOpen] = useState(false);
  const handleScanIconClick = () => {
    // setScannerOpen(true);
    props?.navigation.navigate('Barcode');
    dispatch(clearBarcodeDetailsRequest({}));
    // Open the scanner when the QR icon is clicked
  };

  const renderScanner = () => {
    return (
      <View>
        <TouchableOpacity onPress={handleScanIconClick}>
          <Image source={Icons.qr} style={styles.icon} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeView>
      <CommonLinearGradient heading={'Add Inventory'} />
      <Loader
        visible={ProductReducer.status === 'Product/getProductByBarcodeRequest'}
      />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: '5%'}}>
          <View
            style={{
              flex: 1,
              width: '90%',
              alignSelf: 'center',
              marginTop: verticalScale(30),
            }}>
            <View style={styles.inputContainer}>
              {/* Left Icon */}
              {renderScanner()}

              <TextInput
                style={styles.textInput}
                placeholder="Enter Barcode Number"
                value={barcode}
                keyboardType="numeric"
                onChangeText={text => setBarcode(text)}
              />
              <TouchableOpacity onPress={handleSearch}>
                {/* Add your search icon */}
                <Image source={Icons.search} style={styles.icon} />
              </TouchableOpacity>
            </View>
            {showProduct !== false && ProductBox()}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={styles.buttonContainer}>
        {/* <TouchableOpacity
          style={styles.buttonOutline}
          onPress={() => {
            props?.navigation.navigate('ProductManually');
          }}>
          <Text style={styles.buttonText1}>Edit Product</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => props.navigation.navigate('ProductManually')}>
          <Text style={styles.buttonText}>Add products manually</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.horizontalButtonsContainer}>
        <TouchableOpacity
          style={styles.horizontalButton}
          onPress={() => props.navigation.navigate('Search')}>
          <Text style={styles.horizontalButtonText}>Search by name</Text>
        </TouchableOpacity>
        <View style={styles.horizontalDivider} />
        <TouchableOpacity
          style={styles.horizontalButton}
          onPress={() => {
            props?.navigation.navigate('Barcode');
            dispatch(clearBarcodeDetailsRequest({}));
          }}>
          <Text style={styles.horizontalButtonText}>Scan barcode</Text>
        </TouchableOpacity>
      </View>
    </SafeView>
  );
};

export default AddPRoductToMyShop;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(10),
    borderBottomWidth: 1,
    borderColor: Colors.borderColor,
    paddingBottom: verticalScale(5),
  },
  icon: {
    width: normalize(20),
    height: normalize(20),
    resizeMode: 'contain',
    marginHorizontal: normalize(5),
  },
  textInput: {
    flex: 1,
    fontSize: normalize(16),
    paddingLeft: normalize(10),
    marginLeft: normalize(10),
  },
  buttonContainer: {
    marginVertical: verticalScale(20),
    alignItems: 'center',
  },
  buttonOutline: {
    borderWidth: 1,
    borderColor: Colors.backgroundDark,
    borderRadius: normalize(5),
    paddingHorizontal: normalize(70),
    paddingVertical: normalize(10),
    marginBottom: normalize(20),
  },
  button: {
    backgroundColor: Colors.darkblue,
    borderRadius: normalize(5),
    paddingHorizontal: normalize(40),
    paddingVertical: normalize(12),
    marginBottom: normalize(10),
  },
  buttonText: {
    color: Colors.white,
    fontSize: normalize(16),
    textAlign: 'center',
  },
  buttonText1: {
    color: Colors.black,
    fontSize: normalize(16),
    textAlign: 'center',
  },
  horizontalDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftColor: 'white',
    borderWidth: 1,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.borderColor,
  },
  orText: {
    marginHorizontal: normalize(10),
    color: Colors.borderColor,
  },
  horizontalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(15),
    backgroundColor: Colors.darkblue,
  },
  horizontalButton: {
    flex: 1,
    borderRadius: normalize(5),
    paddingVertical: normalize(10),
  },
  horizontalButtonText: {
    color: 'white',
    fontSize: normalize(16),
    textAlign: 'center',
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%', // Cover the entire screen
    backgroundColor: 'white', // Change this to your desired background color
  },
  rnholeView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    width: '90%',
    height: '80%',
    marginTop: normalize(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: 90,
    height: 90,
  },
  productName: {
    fontSize: 15,
    // marginTop: 10,
    textAlign: 'justify',
    marginHorizontal: 8,
  },
  productPrice: {
    fontSize: 16,
    marginTop: 5,
    textAlign: 'right',
  },
  buttonContainer1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    // marginLeft:10
  },
  yesButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginLeft: 20,
  },
  noButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
