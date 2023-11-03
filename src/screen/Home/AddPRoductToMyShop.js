import React, {useState, useRef,useEffect} from 'react';
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
import {Icons} from '../../themes/ImagePath';
import {verticalScale} from '../../utils/helpers/dimen1';
import CommonBottomSheet from '../../components/BottomSheet';
import TextInputItem from '../../components/TextInputItem';
import {horizontalScale} from '../../utils/helpers/dimen1';
import AsyncStorage from '@react-native-async-storage/async-storage';
import showErrorAlert from '../../utils/helpers/Toast';
import {getProductByBarcodeRequest} from '../../redux/reducer/ProductReducer';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../utils/helpers/Loader'


// import BarcodeScanner from 'react-native-scan-barcode';

const AddPRoductToMyShop = props => {
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [barcode, setBarcode] = useState('');
  const [hasPermission, setHasPermission] = React.useState(false);
const [isScanned, setIsScanned] = React.useState(false);

  const [isScannerOpen, setScannerOpen] = useState(false);

  const bottomSheetRef = useRef(null);
  const dispatch = useDispatch();
  const handleClosePress = () => bottomSheetRef.current.close();
  const toggleBottomSheet = () => {
    setBottomSheetVisible(!isBottomSheetVisible);
    handleClosePress();
  };
  const ProductReducer = useSelector(state => state.ProductReducer);

  useEffect(() => {
    if (barcode.length === 13) {
      handleSearch();
    }
  }, [barcode]);

  const handleSearch = async () => {
    if (barcode === '') {
      showErrorAlert('Please enter a barcode');
    } else {
      try {
        const user_id = await AsyncStorage.getItem('user_id');
        if (user_id !== null) {
          const formData = new FormData();
          formData.append('user_id', user_id);
          formData.append('barcode', barcode);
          dispatch(getProductByBarcodeRequest(formData)); // Dispatch your Redux action here
        } else {
          showErrorAlert('User ID not found. Please log in.');
        }
      } catch (error) {
        showErrorAlert('An error occurred while searching for the product.');
        console.error(error);
      }
    }
  };

  let status = '';
  if (status == '' || ProductReducer.status != status) {
    switch (ProductReducer.status) {
      case 'Product/getProductByBarcodeRequest':
        status = ProductReducer.status;

        break;
      case 'Product/getProductByBarcodeSuccess':
        status = ProductReducer.status;
        // props.navigation.navigate('OtpScreen',{item:AuthReducer.signupResponse?.token})
        // dispatch(productGetFromWishListRequest({ user_id }));
        break;
      case 'Product/getProductByBarcodeFailure':
        status = ProductReducer.status;

        break;
    }
  }







const handleScanIconClick = () => {
  setScannerOpen(true); // Open the scanner when the QR icon is clicked
};

// const renderScanner = () => {
//   return (
//     <View>
//     <TouchableOpacity onPress={handleScanIconClick}>
//     <Image source={Icons.qr} style={styles.icon} />
//     </TouchableOpacity>
    
//     {isScannerOpen ? (
//       <View style={{ flex: 1 }}>
//         <BarcodeScanner
//           onBarCodeRead={(e) => {
//             console.log('Barcode: ' + e.data);
//             console.log('Type: ' + e.type);
//             // Handle the scanned barcode data as needed
//           }}
//           style={{ flex: 1 }}
//         />
//         <TouchableOpacity >
//           <Text>Close Scanner</Text>
//         </TouchableOpacity>
//       </View>
//     ) : null}
//   </View>
//   );
// };

  return (
    <SafeView>
      <CommonLinearGradient heading={'Add Inventory'} />
      <Loader visible={ProductReducer.status==='Product/getProductByBarcodeRequest'}/>
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
              {/* {renderScanner()} */}
              <TextInput
                style={styles.textInput}
                placeholder="Enter Barcode Number"
                value={barcode}
                onChangeText={text => setBarcode(text)}
              />
              <TouchableOpacity onPress={handleSearch}>
                {/* Add your search icon */}
                <Image source={Icons.search} style={styles.icon} />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonOutline}
          onPress={() => {
            props?.navigation.navigate('ProductManually');
          }}>
          <Text style={styles.buttonText1}>Edit Product</Text>
        </TouchableOpacity>
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
        <TouchableOpacity style={styles.horizontalButton}>
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
});