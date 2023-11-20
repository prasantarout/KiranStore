import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Easing,
  Dimensions,
  //   Animated,
} from 'react-native';
import * as REA from 'react-native-reanimated';
import React, {useState, useRef, useEffect} from 'react';
import {
  Camera,
  useCameraDevices,
  useFrameProcessor,
} from 'react-native-vision-camera';
import {scanBarcodes, BarcodeFormat} from 'vision-camera-code-scanner';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
} from 'react-native-reanimated';
import {Colors} from '../../themes/Colors';
import {Fonts, Icons} from '../../themes/ImagePath';
import Loader from '../../utils/helpers/Loader';
import {ActivityIndicator} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProductReducer, {
  clearBarcodeDetails,
  clearBarcodeDetailsRequest,
  getProductByBarcodeRequest,
  getProductByBarcodeSuccess,
} from '../../redux/reducer/ProductReducer';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import axios from 'axios';

const Barcode = props => {
  const [cameraPermission, setCameraPermission] = useState();
  const [dummy, setDummy] = useState(true);
  const [cameraLoader, setCameraLoader] = useState(false);

  const barcodeScanned = useSharedValue(false);
  const [data, setData] = useState('');
  const detectorResult = useSharedValue('');
  let devices = useCameraDevices('wide-angle-camera');
  const ProductReducer = useSelector(state => state.ProductReducer);
  const dispatch = useDispatch();
  const {flag} = props?.route?.params ? props?.route?.params : '';
  let device = devices.back;
  const isFocus = useIsFocused();

  useEffect(() => {
    (async () => {
      const cameraPermissionStatus = await Camera.requestCameraPermission();
      setCameraPermission(cameraPermissionStatus);
      console.log('1 call');
    })();
    return () => {
      console.log('unmount');
    };
  }, []);

  const offset = useSharedValue(100);
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{translateY: offset.value + 160}],
  }));

  React.useEffect(() => {
    offset.value = withRepeat(
      withTiming(-offset.value - 25, {duration: 500}),
      -1,
      true,
    );
    return () => {
      console.log('unmount2');
      offset.value = 100;
    };
  }, []);

  const frameProcessor = useFrameProcessor(
    frame => {
      'worklet';
      const detectedBarcodes = scanBarcodes(frame, [BarcodeFormat.ALL_FORMATS]);
      const barcodesStr = detectedBarcodes
        .map(barcode => barcode.displayValue)
        .join('');

      if (barcodesStr) {
        // setCameraLoader(true);
        REA.runOnJS(setCameraLoader)(true);
        REA.runOnJS(setDummy)(false);
        REA.runOnJS(setData)(barcodesStr);
        //   setData(barcodesStr);

        // Handle the barcode data as needed
        console.log('Scanned Barcode:', barcodesStr);
      }
    },
    [isFocus],
  );

  useEffect(() => {
    if (!dummy) {
      setTimeout(() => {
        navigatewithData(data);
      }, 2000);
    }
    return () => {
      // frameProcessor.cancel();
      setDummy(false);
      setCameraLoader(false);
      console.log('unmount 3');
    };
  }, [dummy, data]);

  const navigatewithData = async code => {
    try {
      var dataValue;
      await AsyncStorage.getItem('user_id').then(value => {
        if (value != null) {
          dataValue = value;
        }
      });
      let obj = new FormData();
      obj.append('barcode', code);
      obj.append('user_id', dataValue);
      // console.log(obj,"obj>>>>>>>>>>>>>>>>.")
      let apiUrl = 'https://bhanumart.com/dev/new_api/get-product-by-barcode';
      const response = await axios.post(apiUrl, obj);
      // console.log(response)
      if (response.data?.response[0]?.status === 'Valid') {
        if (flag === 1) {
          props?.navigation?.navigate('ProductManually', {item: data});
        } else if (flag === 2) {
          props?.navigation?.navigate('TabStack1', {
            screen: 'AllStock',
            params: {
              item: data,
            },
          });
        } else {
          props?.navigation?.navigate('AddPRoductToMyShop', {
            productDetail: response?.data,
            barcode: data,
          });
        }
        // props?.navigation.navigate('AddPRoductToMyShop',{productDetail:response?.data,barcode:data})
      } else {
        console.log('API response does not have expected data:', response.data);
      }
    } catch (error) {
      // Handle API request error
      console.error('API call error:', error);
      if (error.response) {
        console.error(
          'Server responded with non-2xx status:',
          error.response.status,
        );
        console.error('Response data:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Request setup error:', error.message);
      }
    }
  };

  // let status = '';
  // if (status === '' || ProductReducer.status !== status) {
  //     switch (ProductReducer.status) {
  //       case 'Product/getProductByBarcodeRequest':
  //         status = ProductReducer.status;
  //         break;

  //       case 'Product/getProductByBarcodeSuccess':
  //         status = ProductReducer.status;

  //         if (flag === 1) {
  //           props?.navigation?.navigate('ProductManually', {item: data});
  //         } else if (flag === 2) {
  //           props?.navigation?.navigate('TabStack1', {
  //             screen: 'AllStock',
  //             params: {
  //               item: data,
  //             },
  //           });
  //         } else {
  //           props?.navigation?.navigate('AddPRoductToMyShop', {item: data});
  //         }
  //         // setCameraLoader(false)
  //         // dispatch(clearBarcodeDetails())
  //         // dispatch(clearBarcodeDetailsRequest([]));
  //         // dispatch(getProductByBarcodeSuccess(''));
  //         break;

  //       case 'Product/getProductByBarcodeFailure':
  //         status = ProductReducer.status;
  //         break;

  //       default:
  //         break;
  //     }
  //   }

  useFocusEffect(
    React.useCallback(() => {
      // Put the logic you want to execute when the screen is focused here
      setCameraLoader(false);
      setData('');
      setDummy(true);
      dispatch(clearBarcodeDetailsRequest([]));
      // barcodeScanned.value = false;
    }, []),
  );

  if (device && cameraPermission === 'authorized') {
    return (
      <View style={{flex: 1}}>
        <TouchableOpacity
          // onPress={() => props.navigation.goBack()}
          style={{
            position: 'absolute',
            top: Platform.OS === 'ios' ? 55 : 30,
            left: 20,
            zIndex: 9999,
          }}>
          {/* <Image
                source={Icons.check}
                style={{
                  resizeMode: 'contain',
                  width: normalize(25),
                  height: normalize(25),
                  tintColor: Colors.white,
                }}
              /> */}
        </TouchableOpacity>
        <Camera
          style={styles.camera}
          device={device}
          isActive={barcodeScanned ? true : true}
          frameProcessor={frameProcessor}
          frameProcessorFps={5}
        />
        <View
          style={{
            borderWidth: 6,
            borderRadius: normalize(10),
            borderColor: cameraLoader ? '#5FC1F9' : '#d9d9d9',
            width: normalize(250),
            height: normalize(250),
            position: 'absolute',
            top: '30%',
            left: '11%',
            right: '10%',
          }}>
          {/* <Text
            style={{
              color: Colors.white,
              fontFamily: Fonts.Roboto_Bold,
              fontSize: normalize(14),
              position: 'absolute',
              bottom: 10,
              right: '25%',
            }}>
            Scan Barcode Here
          </Text> */}
          <View
            style={{
              justifyContent: 'center',
              //   flex: 1,
              alignItems: 'center',
              //   marginTop: normalize(80),
            }}>
            {cameraLoader && (
              <ActivityIndicator
                size={'large'}
                color="white"
                style={{marginTop: normalize(80)}}
              />
            )}
          </View>

          <View style={styles.container}>
            {!cameraLoader && (
              <Animated.View style={[styles.square, animatedStyles]} />
            )}
          </View>
        </View>
      </View>
    );
  }
};

export default Barcode;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#EEF2E6',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  square: {
    width: '100%',
    height: 5,
    backgroundColor: 'red',
  },
  saveArea: {
    backgroundColor: '#3D8361',
  },
  header: {
    height: 50,
    backgroundColor: '#3D8361',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: '#ffffff',
    fontSize: 20,
  },
  caption: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captionText: {
    color: '#100F0F',
    fontSize: 16,
    fontWeight: '600',
  },
  camera: {
    flex: 1,
  },
  photoAndVideoCamera: {
    height: 360,
  },
  barcodeText: {
    // paddingHorizontal: 16,
    // paddingVertical: 20,
    textAlign: 'center',
    color: 'gray',
    fontSize: normalize(14),
    fontFamily: Fonts.Roboto_Medium,

    width: '100%',
  },
  pickerSelect: {
    paddingVertical: 12,
  },
  image: {
    marginHorizontal: 16,
    paddingTop: 8,
    width: 80,
    height: 80,
  },
  dropdownPickerWrapper: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    zIndex: 9,
  },
  btnGroup: {
    margin: 16,
    flexDirection: 'row',
  },
  btn: {
    backgroundColor: '#63995f',
    margin: 13,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 8,
  },
  btnText: {
    color: '#ffffff',
    fontSize: 20,
    textAlign: 'center',
  },
  video: {
    marginHorizontal: 16,
    height: 100,
    width: 80,
    position: 'absolute',
    right: 0,
    bottom: -80,
  },
  scanningLine: {
    position: 'absolute',
    height: 2,
    width: '100%',
    backgroundColor: 'red', // You can change the color as needed
  },
});

//   const animatedValue = useRef(new Animated.Value(0)).current;
//   const [isTop, setIsTop] = useState(true);

//   const startAnimation = toValue => {
//     Animated.timing(animatedValue, {
//       toValue,
//       duration: 2000,
//       easing: Easing.linear,
//       useNativeDriver: true,
//     }).start(() => {
//       setIsTop(!isTop);
//     });
//   };

//   useEffect(() => {
//     startAnimation(isTop ? 1 : 0);
//   }, [isTop]);

//   const translateY = animatedValue.interpolate({
//     inputRange: [0, 1],
//     outputRange: [Dimensions.get('window').height - 520, 0],
//     extrapolate: 'clamp',
//   });

// const [translateY] = useState(new Animated.Value(0));
// const [isTop, setIsTop] = useState(true);

// const startAnimation = () => {
//   setIsTop(!isTop);

//   const toValue = isTop ? 1 : 0;

//   Animated.timing(translateY, {
//     toValue,
//     duration: 2000,
//     easing: Easing.linear,
//     useNativeDriver: false, // Disable the native driver
//   }).start(() => {
//     // Continue the animation when it's finished
//     // startAnimation();
//     setIsTop(!isTop);
//   });
// };

// useEffect(() => {
//   startAnimation(isTop ?1:0);
// }, [isTop]);
