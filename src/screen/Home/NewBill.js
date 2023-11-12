import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import SafeView from '../../components/SafeView';
import CommonLinearGradient from '../../components/CommonLinearGradient';
import normalize from '../../utils/helpers/dimen';
import {Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../themes/Colors';
import {Fonts, Icons} from '../../themes/ImagePath';
import {TouchableOpacity} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import Modal from 'react-native-modal';
import TextInputItem from '../../components/TextInputItem';
import {TextInput} from 'react-native';
import showErrorAlert from '../../utils/helpers/Toast';
import moment from 'moment';
import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addtoCartRequest, getProductRequest, getSaleCartDetailsRequest } from '../../redux/reducer/ProductReducer';
const {width} = Dimensions.get('screen');
const NewBill = props => {
  const [type, setType] = useState('retail');
  const [isFocus, setIsFocus] = useState(false);
  const [isOfferTypeDropDown, setIsOfferTypeDropDown] = useState(false);
  const [value, setValue] = useState(null);
  const [offerValue, setOfferValue] = useState('rupee');
  const [isAddDiscountModal, setIsAddDiscountModal] = useState(false);
  const [isQuickAddModal, setIsQuickAddModal] = useState(false);
  const [isQuickEditModal, setIsQuickEditModal] = useState(false);
  const [isActiveOfferFocus, setIsActiveOfferFocus] = useState(false);
  const [cashCollected, setCashCollected] = useState('0');
  const [applyOffer, setApplyOffer] = useState('0');
  const [isPartialPayment, setIsPartialPayment] = useState(false);
  const [isAdditionalDetails, setIsAdditionalDetails] = useState(false);
  const [isAddCustomerModal, setIsAddCustomerModal] = useState(false);
  const [isAddProductModal, setIsAddProductModal] = useState(false);

  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [priceByQuantity, setPriceByQuantity] = useState('');
  const [isAddMyInventory, setIsAddMyInventory] = useState(false);
  const [wholesalePriceValue, setWholesalePriceValue] = useState('');
  const [cessValue, setCessValue] = useState('');
  const [gstValue, setGstValue] = useState('');
  const [hsnValue, setHsnValue] = useState('');
  const [quantityType, setQuantityType] = useState('piece');
  const [allCart, setAllCart] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(10);

  const ProductReducer = useSelector(state => state.ProductReducer);
  console.log(ProductReducer?.getProductByBarcodeSaleRes,">>>>>>>>>>>>>>>>>>>>>>product")
  // const isFocus = useIsFocused();
  const dispatch = useDispatch();

  const typeArr = [
    {
      title: 'Retail',
      value: 'retail',
    },
    {
      title: 'Wholesale',
      value: 'wholesale',
    },
  ];
  const languageOptions = [
    {value: 'cash', label: 'Cash'},
    {value: 'card', label: 'Card'},
    {value: 'not_paid', label: 'Not Paid'},
    {value: 'upi', label: 'UPI'},
    {value: 'delivery', label: 'Delivery'},
  ];
  const offerType = [
    {value: 'rupee', label: '₹'},
    {value: 'percentage', label: '%'},
  ];
  const quantityTypeArr = [
    {value: 'piece', label: 'Piece'},
    {value: 'kg', label: 'kg'},
    {value: 'gm', label: 'gm'},
    {value: 'ltr', label: 'ltr'},
    {value: 'ml', label: 'ml'},
  ];
  const toggleAddCustomerModal = () => {
    setIsAddCustomerModal(!isAddCustomerModal);
  };
  const toggleAddProductModal = () => {
    setIsAddProductModal(!isAddProductModal);
  };
  const toggleAddDiscountModal = () => {
    setIsAddDiscountModal(!isAddDiscountModal);
  };
  const toggleQuickAddModal = () => {
    setIsQuickAddModal(!isQuickAddModal);
  };
  const [editCartId, setEditCartId] = useState(0);
  const toggleQuickEditModal = () => {
    setIsQuickEditModal(!isQuickEditModal);
  };

  const handleGetProduct = async () => {
    try {
      const user_id = await AsyncStorage.getItem('user_id');
      if (user_id !== null) {
        let obj = new FormData();
        obj?.append('user_id', user_id);
        obj?.append('start', currentPage);
        obj?.append('limit', limit);
        dispatch(getProductRequest(obj)); // Dispatch your Redux action here
      } else {
        showErrorAlert('User ID not found. Please log in.');
      }
    } catch (error) {
      // showErrorAlert('An error occurred while searching for the product.');
      console.error(error);
    }
  };
  useEffect(() => {
    setCurrentPage(1);
    handleGetProduct();
  }, [isFocus, searchQuery]);

  const loadMoreProducts = () => {
    if (!loading && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      handleGetProduct();
    }
  };

  const addDiscountModal = () => {
    return (
      <Modal
        isVisible={isAddDiscountModal}
        onBackdropPress={toggleAddDiscountModal}
        onBackButtonPress={toggleAddDiscountModal}
        style={{
          justifyContent: 'flex-end',
          margin: 0,
        }}>
        <View
          style={{
            backgroundColor: 'white',
            paddingHorizontal: normalize(15),
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            width: '100%',
          }}>
          <View
            style={{
              paddingTop: normalize(15),
            }}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    color: '#001840',
                    fontSize: normalize(11),
                    lineHeight: normalize(13),
                    fontFamily: Fonts.Poppins_SemiBold,
                  }}>
                  Apply Offer
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '90%',
                    alignItems: 'center',
                    height: normalize(45),
                    borderWidth: 1,
                    borderColor: isActiveOfferFocus
                      ? '#001840'
                      : Colors.lightGrey,
                    borderRadius: 10,
                    marginTop: normalize(5),
                    backgroundColor: Colors.white,
                    paddingHorizontal: normalize(15),
                  }}>
                  <View style={{flex: 1}}>
                    <TextInput
                      value={applyOffer}
                      onChangeText={text => {
                        setApplyOffer(text);
                      }}
                      onBlur={() => {
                        setIsActiveOfferFocus(false);
                      }}
                      onFocus={() => setIsActiveOfferFocus(true)}
                      style={{
                        color: isActiveOfferFocus
                          ? '#001840'
                          : Colors.placeholder,
                      }}
                      placeholder="0"
                      maxLength={8}
                      keyboardType="numeric"
                    />
                  </View>
                  <Dropdown
                    data={offerType}
                    value={offerValue}
                    style={[
                      {
                        height: normalize(25),
                        width: normalize(50),
                        borderRadius: normalize(8),
                        borderColor: Colors.backgroundMedium,
                        borderWidth: normalize(1),
                        paddingHorizontal: normalize(10),
                        backgroundColor: Colors.white,
                      },
                      (isOfferTypeDropDown || offerValue != null) && {
                        borderColor: '#001840',
                      },
                    ]}
                    placeholderStyle={{
                      fontSize: normalize(12),
                      fontFamily: Fonts.Poppins_Medium,
                      color: Colors.placeholder,
                    }}
                    selectedTextStyle={{
                      fontSize: normalize(12),
                      fontFamily: Fonts.Poppins_Medium,
                      color: '#001840',
                    }}
                    iconStyle={[
                      {width: 20, height: 20},
                      isOfferTypeDropDown && {tintColor: '#001840'},
                    ]}
                    labelField="label"
                    valueField="value"
                    placeholder={'Select'}
                    onFocus={() => setIsOfferTypeDropDown(true)}
                    onBlur={() => setIsOfferTypeDropDown(false)}
                    onChange={item => {
                      // console.log('item: ', item);
                      setOfferValue(item.value);
                    }}
                  />
                </View>
              </View>
              <View
                style={{
                  justifyContent: 'space-around',
                  alignItems: 'flex-start',
                  paddingVertical: normalize(10),
                }}>
                <Text
                  style={{
                    color: '#001840',
                    fontSize: normalize(11.5),
                    lineHeight: normalize(13),
                    fontFamily: Fonts.Poppins_SemiBold,
                  }}>
                  Total Amount
                </Text>
                <Text
                  style={{
                    color: '#001840',
                    fontSize: normalize(11),
                    lineHeight: normalize(13),
                    fontFamily: Fonts.Poppins_SemiBold,
                  }}>
                  {getTotalAmountAfterOffer() < 0
                    ? '0.00'
                    : addtwozero(getTotalAmountAfterOffer())}
                  {'  '}
                  <Text
                    style={{
                      fontFamily: Fonts.Poppins_Regular,
                      textDecorationLine: 'line-through',
                      textDecorationStyle: 'solid',
                      textDecorationColor: 'black',
                    }}>
                    {getTotalAmountAfterOffer() < 0
                      ? addtwozero(applyOffer)
                      : ` ${addtwozero(getTotalAmount())} `}
                  </Text>
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: normalize(10),
                marginBottom: normalize(15),
              }}>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    color: '#001840',
                    fontSize: normalize(11.5),
                    lineHeight: normalize(13),
                    fontFamily: Fonts.Poppins_SemiBold,
                  }}>
                  Cash collected
                </Text>
                <TextInputItem
                  placeholder={''}
                  width={'90%'}
                  height={normalize(45)}
                  borderWidth={1}
                  borderRadius={10}
                  marginTop={normalize(5)}
                  marginBottom={normalize(0)}
                  color={'#001840'}
                  value={cashCollected}
                  onChangeText={val => setCashCollected(val)}
                  textColor={Colors.placeholder}
                  placeholderTextColor={Colors.placeholder}
                  isRightIconVisible={false}
                  fontSize={13}
                  fontFamily="Poppins-Medium"
                  keyboardType={'number-pad'}
                />
              </View>
              <View
                style={{
                  justifyContent: 'space-around',
                  alignItems: 'flex-start',
                  paddingVertical: normalize(10),
                }}>
                <Text
                  style={{
                    color: '#001840',
                    fontSize: normalize(11.5),
                    lineHeight: normalize(13),
                    fontFamily: Fonts.Poppins_SemiBold,
                  }}>
                  Cash returns
                </Text>
                <Text
                  style={{
                    color: '#001840',
                    fontSize: normalize(11.5),
                    lineHeight: normalize(13),
                    fontFamily: Fonts.Poppins_SemiBold,
                  }}>
                  {addtwozero(cashReturnAmount(cashCollected))}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: normalize(15),
                marginBottom: normalize(15),
                alignItems: 'center',
                opacity: 0.2,
              }}>
              <Pressable
                disabled
                onPress={() => {
                  setIsPartialPayment(!isPartialPayment);
                }}
                style={{
                  height: normalize(15),
                  width: normalize(15),
                  marginRight: normalize(8),
                  borderColor: '#001840',
                  backgroundColor: isPartialPayment ? '#001840' : Colors.white,
                  borderWidth: normalize(1.5),
                  borderRadius: normalize(3),
                }}
              />
              <Text
                style={{
                  color: '#001840',
                  fontSize: normalize(11),
                  lineHeight: normalize(13),
                  fontFamily: Fonts.Poppins_SemiBold,
                }}>
                Is it partial payment?
              </Text>
            </View>
          </View>

          <View
            style={{
              height: normalize(60),
              width: width,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <Pressable
              onPress={() => {
                setIsAddDiscountModal(false);
              }}
              style={{
                height: normalize(40),
                width: normalize(100),
                backgroundColor: '#001840',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: normalize(20),
                borderRadius: normalize(5),
              }}>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: normalize(13),
                  lineHeight: normalize(15),
                  fontFamily: Fonts.Poppins_Medium,
                }}>
                Done
              </Text>
            </Pressable>
            <Pressable
              onPress={createBillOnPress}
              style={{
                height: normalize(40),
                width: normalize(150),
                backgroundColor: '#34c85a',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: normalize(5),
                flexDirection: 'row',
                overflow: 'hidden',
              }}>
              <View style={{flex: 1, paddingLeft: normalize(10)}}>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: normalize(11),
                    fontFamily: Fonts.Poppins_Medium,
                  }}>
                  Total ({allCart.length})
                </Text>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: normalize(12),
                    lineHeight: normalize(15),
                    fontFamily: Fonts.Poppins_Medium,
                  }}>
                  Create bill
                </Text>
              </View>
              <View
                style={{
                  height: '100%',
                  width: '20%',
                  justifyContent: 'flex-end',
                  paddingVertical: normalize(5),
                }}>
                <Image
                  source={Icons.back}
                  style={{
                    height: normalize(15),
                    width: normalize(15),
                    tintColor: Colors.white,
                  }}
                />
              </View>
            </Pressable>
          </View>
        </View>
      </Modal>
    );
  };
  const onpressQuickAddDoneButton = () => {
    try {
      if (productName.trim(' ') == '') {
        showErrorAlert('Please enter a product name');
        return;
      }
      if (priceByQuantity.trim(' ') == '') {
        showErrorAlert('Please enter Price');
        return;
      }
      if (priceByQuantity.includes('-') && priceByQuantity.includes(',')) {
        showErrorAlert('enter a numeric Price');
        return;
      }
      if (quantity.trim(' ') == '') {
        showErrorAlert('Please enter Quantity');
        return;
      }
      if (quantity.includes('-') && quantity.includes(',')) {
        showErrorAlert('enter a numeric Quantity number');
        return;
      }
      if (quantity == 0 || quantity < 0) {
        showErrorAlert('quantity must be greater than 0');
        return;
      }

      if (
        wholesalePriceValue.trim(' ') != '' &&
        (wholesalePriceValue.includes('-') || wholesalePriceValue.includes(','))
      ) {
        showErrorAlert('enter a valid wholesale Price value');
        return;
      }
      let newCartArr = [
        ...allCart,
        {
          id: moment(new Date()).unix(),
          productName,
          quantity,
          priceByQuantity,
          totalAmount: parseInt(quantity) * parseInt(priceByQuantity),
          quantityType,
          isAdditionalDetails,
          wholesalePriceValue,
          cessValue,
          gstValue,
          hsnValue,
        },
      ];
      setAllCart(newCartArr);
      setIsQuickAddModal(false);
      setProductName('');
      setQuantity('1');
      setPriceByQuantity('');
      setIsAddMyInventory(false);
      setWholesalePriceValue('');
      setCessValue('');
      setGstValue('');
      setHsnValue('');
      setQuantityType('piece');
      // console.log({
      //   productName,
      //   quantity,
      //   priceByQuantity,
      //   isAdditionalDetails,
      //   wholesalePriceValue,
      //   cessValue,
      //   gstValue,
      //   hsnValue,
      // });
    } catch (error) {
      console.error('onpresssQuickAddDoneButton>', error);
    }
  };
  const quickAddModal = () => {
    return (
      <Modal
        isVisible={isQuickAddModal}
        onBackdropPress={toggleQuickAddModal}
        onBackButtonPress={toggleQuickAddModal}
        style={{
          justifyContent: 'flex-end',
          margin: 0,
        }}>
        <View
          style={{
            backgroundColor: 'white',
            paddingHorizontal: normalize(15),
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            width: '100%',
          }}>
          <View
            style={{
              paddingTop: normalize(15),
            }}>
            <Text
              style={{
                color: '#001840',
                fontSize: normalize(18),
                lineHeight: normalize(20),
                fontFamily: Fonts.Poppins_SemiBold,
                marginBottom: normalize(10),
              }}>
              Quick Add
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: normalize(15),
                marginBottom: normalize(15),
                alignItems: 'center',
              }}>
              <Pressable
                onPress={() => {
                  setIsAddMyInventory(!isAddMyInventory);
                }}
                style={{
                  height: normalize(15),
                  width: normalize(15),
                  marginRight: normalize(8),
                  borderColor: '#001840',
                  backgroundColor: isAddMyInventory ? '#001840' : Colors.white,
                  borderWidth: normalize(1.5),
                  borderRadius: normalize(3),
                }}
              />
              <Text
                style={{
                  color: '#001840',
                  fontSize: normalize(11),
                  lineHeight: normalize(13),
                  fontFamily: Fonts.Poppins_SemiBold,
                }}>
                Add this product to my inventory
              </Text>
            </View>
            <View
              style={{
                marginVertical: normalize(8),
              }}>
              <Text
                style={{
                  color: '#001840',
                  fontSize: normalize(11.5),
                  lineHeight: normalize(13),
                  fontFamily: Fonts.Poppins_Medium,
                }}>
                Product Name
              </Text>
              <TextInputItem
                placeholder={''}
                width={'95%'}
                height={normalize(45)}
                borderWidth={1}
                borderRadius={10}
                marginTop={normalize(5)}
                marginBottom={normalize(0)}
                color={'#001840'}
                value={productName}
                onChangeText={val => setProductName(val)}
                textColor={Colors.placeholder}
                placeholderTextColor={Colors.placeholder}
                isRightIconVisible={false}
                fontSize={13}
                fontFamily="Poppins-Medium"
              />
            </View>
            <View style={{flexDirection: 'row', marginVertical: normalize(8)}}>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    color: '#001840',
                    fontSize: normalize(11.5),
                    lineHeight: normalize(13),
                    fontFamily: Fonts.Poppins_Medium,
                  }}>
                  {' '}
                  Price/{quantityType}
                </Text>
                <TextInputItem
                  placeholder={''}
                  width={'90%'}
                  height={normalize(45)}
                  borderWidth={1}
                  borderRadius={10}
                  marginTop={normalize(5)}
                  marginBottom={normalize(0)}
                  color={'#001840'}
                  value={priceByQuantity}
                  onChangeText={val => setPriceByQuantity(val)}
                  textColor={Colors.placeholder}
                  placeholderTextColor={Colors.placeholder}
                  isRightIconVisible={false}
                  fontSize={13}
                  fontFamily="Poppins-Medium"
                  keyboardType={'number-pad'}
                />
              </View>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    color: '#001840',
                    fontSize: normalize(11),
                    lineHeight: normalize(13),
                    fontFamily: Fonts.Poppins_Medium,
                  }}>
                  Quantity
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '90%',
                    alignItems: 'center',
                    height: normalize(45),
                    borderWidth: 1,
                    borderColor: isActiveOfferFocus
                      ? '#001840'
                      : Colors.lightGrey,
                    borderRadius: 10,
                    marginTop: normalize(5),
                    backgroundColor: Colors.white,
                    paddingHorizontal: normalize(10),
                  }}>
                  <View style={{flex: 1}}>
                    <TextInput
                      value={quantity}
                      onChangeText={text => {
                        setQuantity(text);
                      }}
                      onBlur={() => {
                        setIsActiveOfferFocus(false);
                      }}
                      onFocus={() => setIsActiveOfferFocus(true)}
                      style={{
                        color: isActiveOfferFocus
                          ? '#001840'
                          : Colors.placeholder,
                      }}
                      placeholder="0"
                      maxLength={8}
                      keyboardType="number-pad"
                    />
                  </View>
                  <Dropdown
                    data={quantityTypeArr.reverse()}
                    value={quantityType}
                    style={[
                      {
                        height: normalize(25),
                        width: '60%',
                        borderRadius: normalize(8),
                        borderColor: Colors.backgroundMedium,
                        borderWidth: normalize(1),
                        paddingHorizontal: normalize(10),
                        backgroundColor: Colors.white,
                      },
                      (isOfferTypeDropDown || offerValue != null) && {
                        borderColor: '#001840',
                      },
                    ]}
                    placeholderStyle={{
                      fontSize: normalize(10),
                      fontFamily: Fonts.Poppins_Regular,
                      color: Colors.placeholder,
                    }}
                    selectedTextStyle={{
                      fontSize: normalize(10),
                      fontFamily: Fonts.Poppins_Regular,
                      color: '#001840',
                    }}
                    iconStyle={[
                      {width: 20, height: 20},
                      isOfferTypeDropDown && {tintColor: '#001840'},
                    ]}
                    dropdownPosition="top"
                    labelField="label"
                    valueField="value"
                    placeholder={'Select'}
                    onFocus={() => setIsOfferTypeDropDown(true)}
                    onBlur={() => setIsOfferTypeDropDown(false)}
                    onChange={item => {
                      // console.log('item: ' , item);
                      setQuantityType(item.value);
                    }}
                  />
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              height: normalize(1.5),
              width: '100%',
              alignSelf: 'center',
              backgroundColor: Colors.lightdark_White1,
              marginTop: normalize(15),
              marginBottom: normalize(20),
            }}
          />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: normalize(8),
            }}>
            <Text
              style={{
                color: '#001840',
                fontSize: normalize(15),
                fontFamily: Fonts.Poppins_Medium,
              }}>
              Additional Details
            </Text>
            <TouchableOpacity
              onPress={() => {
                setIsAdditionalDetails(!isAdditionalDetails);
              }}
              style={{
                height: normalize(15),
                width: normalize(15),
                transform: [{rotate: isAdditionalDetails ? '0deg' : '180deg'}],
              }}>
              <Image
                source={Icons.down}
                style={{height: '100%', width: '100%', resizeMode: 'contain'}}
              />
            </TouchableOpacity>
          </View>

          {isAdditionalDetails && (
            <View style={{marginBottom: normalize(20)}}>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-between',
                  marginTop: normalize(8),
                }}>
                {customHalfScreenTextInput(
                  true,
                  wholesalePriceValue,
                  setWholesalePriceValue,
                  'Wholesale price',
                  'number-pad',
                )}

                {customHalfScreenTextInput(
                  false,
                  cessValue,
                  setCessValue,
                  'Cess',
                  'name-phone-pad',
                )}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-between',
                  marginTop: normalize(20),
                }}>
                {customHalfScreenTextInput(
                  false,
                  gstValue,
                  setGstValue,
                  'GST',
                  'number-pad',
                )}

                {customHalfScreenTextInput(
                  false,
                  hsnValue,
                  setHsnValue,
                  'Hsn',
                  'number-pad',
                )}
              </View>
            </View>
          )}

          <Pressable
            onPress={onpressQuickAddDoneButton}
            style={{
              height: normalize(40),
              width: '100%',
              backgroundColor: '#001840',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: normalize(8),
              marginBottom: normalize(15),
              borderRadius: normalize(5),
              alignSelf: 'center',
            }}>
            <Text
              style={{
                color: Colors.white,
                fontSize: normalize(13),
                lineHeight: normalize(15),
                fontFamily: Fonts.Poppins_Medium,
              }}>
              Done
            </Text>
          </Pressable>
        </View>
      </Modal>
    );
  };
  const addCustomerModal = () => {
    return (
      <Modal
        isVisible={isAddCustomerModal}
        onBackdropPress={toggleAddCustomerModal}
        onBackButtonPress={toggleAddCustomerModal}
        style={{
          justifyContent: 'flex-end',
          margin: 0,
        }}>
        <View
          style={{
            backgroundColor: 'white',
            paddingHorizontal: normalize(15),
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            width: '100%',
          }}>
          <View
            style={{
              paddingTop: normalize(15),
            }}>
            <Text
              style={{
                color: '#001840',
                fontSize: normalize(13),
                lineHeight: normalize(15),
                fontFamily: Fonts.Poppins_SemiBold,
                marginBottom: normalize(10),
              }}>
              Customer info:
            </Text>

            <View style={{flexDirection: 'row', marginBottom: normalize(8)}}>
              <View style={{flex: 1}}>
                <TextInputItem
                  placeholder={'Phone Number'}
                  width={'90%'}
                  height={normalize(45)}
                  borderWidth={1}
                  borderRadius={10}
                  marginTop={normalize(5)}
                  marginBottom={normalize(0)}
                  color={'#001840'}
                  value={cashCollected}
                  onChangeText={val => setCashCollected(val)}
                  textColor={Colors.placeholder}
                  placeholderTextColor={Colors.placeholder}
                  isRightIconVisible={false}
                  fontSize={13}
                  fontFamily="Poppins-Medium"
                />
              </View>
              <View style={{flex: 1}}>
                <TextInputItem
                  placeholder={'Name'}
                  width={'90%'}
                  height={normalize(45)}
                  borderWidth={1}
                  borderRadius={10}
                  marginTop={normalize(5)}
                  marginBottom={normalize(0)}
                  color={'#001840'}
                  value={cashCollected}
                  onChangeText={val => setCashCollected(val)}
                  textColor={Colors.placeholder}
                  placeholderTextColor={Colors.placeholder}
                  isRightIconVisible={false}
                  fontSize={13}
                  fontFamily="Poppins-Medium"
                />
              </View>
            </View>

            <TextInputItem
              placeholder={'Notes'}
              width={'95%'}
              height={normalize(45)}
              borderWidth={1}
              borderRadius={10}
              marginTop={normalize(5)}
              marginBottom={normalize(8)}
              color={'#001840'}
              value={cashCollected}
              onChangeText={val => setCashCollected(val)}
              textColor={Colors.placeholder}
              placeholderTextColor={Colors.placeholder}
              isRightIconVisible={false}
              fontSize={13}
              fontFamily="Poppins-Medium"
            />

            <TextInputItem
              placeholder={'Enter Birth date'}
              width={'95%'}
              height={normalize(45)}
              borderWidth={1}
              borderRadius={10}
              marginTop={normalize(5)}
              marginBottom={normalize(8)}
              color={'#001840'}
              value={cashCollected}
              onChangeText={val => setCashCollected(val)}
              textColor={Colors.placeholder}
              placeholderTextColor={Colors.placeholder}
              isRightIconVisible={false}
              fontSize={13}
              fontFamily="Poppins-Medium"
            />
            <TextInputItem
              placeholder={'Address'}
              width={'95%'}
              height={normalize(45)}
              borderWidth={1}
              borderRadius={10}
              marginTop={normalize(5)}
              marginBottom={normalize(8)}
              color={'#001840'}
              value={cashCollected}
              onChangeText={val => setCashCollected(val)}
              textColor={Colors.placeholder}
              placeholderTextColor={Colors.placeholder}
              isRightIconVisible={false}
              fontSize={13}
              fontFamily="Poppins-Medium"
            />
            <TextInputItem
              placeholder={'Party Discount'}
              width={'95%'}
              height={normalize(45)}
              borderWidth={1}
              borderRadius={10}
              marginTop={normalize(5)}
              marginBottom={normalize(8)}
              color={'#001840'}
              value={cashCollected}
              onChangeText={val => setCashCollected(val)}
              textColor={Colors.placeholder}
              placeholderTextColor={Colors.placeholder}
              isRightIconVisible={false}
              fontSize={13}
              fontFamily="Poppins-Medium"
            />
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Pressable
              style={{
                height: normalize(40),
                width: '45%',
                backgroundColor: '#001840',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: normalize(8),
                marginBottom: normalize(15),
                borderRadius: normalize(5),
                alignSelf: 'center',
              }}>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: normalize(13),
                  lineHeight: normalize(15),
                  fontFamily: Fonts.Poppins_Medium,
                }}>
                Cancel
              </Text>
            </Pressable>
            <Pressable
              style={{
                height: normalize(40),
                width: '45%',
                backgroundColor: '#34c85a',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: normalize(8),
                marginBottom: normalize(15),
                borderRadius: normalize(5),
                alignSelf: 'center',
              }}>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: normalize(13),
                  lineHeight: normalize(15),
                  fontFamily: Fonts.Poppins_Medium,
                }}>
                Save
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    );
  };

  const customHalfScreenTextInput = (
    isRS,
    value,
    setValue,
    title,
    keyboardType,
  ) => {
    return (
      <View
        style={{
          height: normalize(45),
          width: '45%',
          borderRadius: 10,
          borderWidth: 1,
          borderColor: Colors.placeholder,
        }}>
        <View
          style={{
            backgroundColor: Colors.white,
            position: 'absolute',
            left: normalize(10),
            top: -normalize(6),
            paddingHorizontal: normalize(2),
          }}>
          <Text
            style={{
              color: '#001840',
              fontSize: normalize(10),
              lineHeight: normalize(12),
              fontFamily: Fonts.Poppins_Medium,
              marginBottom: normalize(10),
            }}>
            {title}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            padding: normalize(2),
            paddingHorizontal: normalize(5),
            flexDirection: isRS ? 'row' : 'column',
            alignItems: 'center',
          }}>
          {isRS && (
            <Text
              style={{
                color: '#001840',
                fontSize: normalize(11),
                fontFamily: Fonts.Poppins_Medium,
              }}>
              Rs.
            </Text>
          )}
          <TextInput
            value={value}
            onChangeText={val => {
              setValue(val);
            }}
            style={{
              width: '90%',
              color: '#001840',
              fontSize: normalize(12),
              lineHeight: normalize(13),
              fontFamily: Fonts.Poppins_Medium,
            }}
            keyboardType={keyboardType ? keyboardType : 'default'}
          />
        </View>
      </View>
    );
  };


  const generateRandomSessionId = () => {
    // Generate a random alphanumeric string for the session ID
    const randomSessionId = Math.random().toString(36).substring(2, 15);
    return randomSessionId;
  };
  const sessionId = generateRandomSessionId();
 
 
  const AddToCart=async()=>{
    var dataValue;
    await AsyncStorage.getItem('user_id').then(value => {
      if (value != null) {
        const data = value;
        dataValue = data;
      }
    });
    
    let obj = new FormData();
    obj.append('user_id', dataValue);
    obj.append('sale_id',sessionId);
    obj.append('invoice_no',sessionId);
    obj.append('sid',sessionId);
    dispatch(addtoCartRequest(obj));
  }

  const getCartDetails=async()=>{
    var dataValue;
    await AsyncStorage.getItem('user_id').then(value => {
      if (value != null) {
        const data = value;
        dataValue = data;
      }
    });
    
    let obj = new FormData();
    obj.append('user_id', dataValue);
    obj.append('sid',sessionId);
    dispatch(getSaleCartDetailsRequest(obj));
  }

  // React.useEffect(() => {
  //   const unsubscribe = props?.navigation.addListener('focus', () => {
      
  //   });
  //   return unsubscribe;
  // }, [navigation]);


  let status = '';
  if (status == '' || ProductReducer.status != status) {
    switch (ProductReducer.status) {
      case 'Product/addtoCartRequest':
        status = ProductReducer.status;
        break;
      case 'Product/addtoCartSuccess':
        status = ProductReducer.status;
        getCartDetails();
        break;
      case 'Product/addtoCartFailure':
        status = ProductReducer.status;
        break;
    
    }
  }



  const renderProductItem = ({item}) => {
    console.log(item, '>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    let matchingProductFound = false;
    if (
      searchQuery.length > 0 &&
      !item.product_name?.toLowerCase()?.includes(searchQuery?.toLowerCase())
    ) {
      // Set the flag to true to indicate that a matching product is found
      matchingProductFound = true;
    }
    if (!matchingProductFound) {
      return (
        <View
          underlayColor={Colors.lightGray} // Change the color when pressed
          style={styles.productCard}>
          <View style={styles.productCardContainer}>
            <Image
              source={item.image ? {uri: item.image} : Icons.gift}
              style={styles.productImage}
            />
            <View style={styles.productCardContent}>
              <Text style={styles.productName}>{item.product_name}</Text>
              {/* <Text>Batch No: {item.batch_no}</Text> */}
              <View style={{flexDirection: 'row'}}>
                <Text>Mrp:{item.mrp}</Text>
                <Text>{'|'}</Text>
                <Text>Purchase Price:{item.purchase_price}</Text>
              </View>
              {/* <Text>Mobile Sale Price: {item.mobile_sale_price}</Text> */}
              {/* <Text>Unit Store Price: {item.unit_store_price}</Text> */}
              {/* <Text>Wholesale Sale Price:{item.wholesale_sale_price}</Text> */}
              <Text>avaliable_stock:{item.avaliable_stock}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.addButton} onPress={AddToCart}>
            <Text style={{color: 'white', fontWeight: '700', fontSize: 14}}>
              Add
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  const RenderProductModal = () => {
    return (
      <Modal
        isVisible={isAddProductModal}
        onBackdropPress={toggleAddProductModal}
        onBackButtonPress={toggleAddProductModal}
        style={{
          justifyContent: 'flex-end',
          margin: 0,
        }}>
        <View
          style={{
            backgroundColor: 'white',
            paddingHorizontal: normalize(15),
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            width: '100%',
            height: '90%',
          }}>
          <View
            style={{
              paddingTop: normalize(15),
            }}>
            {/* <Text
              style={{
                color: '#001840',
                fontSize: normalize(13),
                lineHeight: normalize(15),
                fontFamily: Fonts.Poppins_SemiBold,
                marginBottom: normalize(10),
              }}>
              Customer info:
            </Text> */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Search product"
                value={searchQuery}
                onChangeText={text => setSearchQuery(text)}
              />
            </View>
            <FlatList
              data={ProductReducer?.getProductRes} // Use your product data from Redux here
              renderItem={renderProductItem}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{
                marginTop: 20,
                paddingBottom: normalize(120),
              }}
              onEndReached={loadMoreProducts}
              onEndReachedThreshold={0.1}
              ListFooterComponent={() =>
                loading && <ActivityIndicator size="large" color="black" />
              }
              ListEmptyComponent={() => (
                <View style={styles.noProductContainer}>
                  <Text style={styles.noProductText}>No products found</Text>
                </View>
              )}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </Modal>
    );
  };

  const cartPlusMinusQuantity = (id, type) => {
    try {
      let oldarr = allCart;
      let newarr = [];

      oldarr.map(item => {
        if (item.id == id) {
          if (type == 'plus') {
            item.quantity = parseInt(item.quantity) + 1;

            item.totalAmount =
              parseInt(item.priceByQuantity) * parseInt(item.quantity);

            newarr.push(item);
          } else {
            if (item.quantity == 1) {
              item.quantity = 1;
              item.totalAmount =
                parseInt(item.quantity) * parseInt(item.priceByQuantity);
              newarr.push(item);
            } else if (item.quantity > 1) {
              item.quantity = parseInt(item.quantity) - 1;
              item.totalAmount =
                parseInt(item.priceByQuantity) * parseInt(item.quantity);
              newarr.push(item);
            }
          }
        } else {
          newarr.push(item);
        }
      });
      setAllCart(newarr);
    } catch (error) {
      console.error('cartPlusMiinusQuantity>>', error);
    }
  };

  const ItemCard = ({item, index}) => {
    return (
      <View
        key={index}
        style={{
          paddingVertical: normalize(10),
          borderBottomWidth: normalize(1),
          borderBottomColor: Colors.lightGrey,
          marginBottom: index == allCart.length - 1 ? normalize(100) : 0,
        }}>
        <View
          style={{
            height: normalize(90),
            width: '100%',
            paddingHorizontal: normalize(20),
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
            }}>
            <View
              style={{
                flex: 0.8,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View style={{height: '80%', width: '80%'}}>
                <Image
                  source={Icons.groceries}
                  style={{height: '100%', width: '100%', resizeMode: 'contain'}}
                />
              </View>
            </View>
            <View
              style={{
                flex: 2,
                paddingTop: normalize(8),
                marginHorizontal: normalize(3),
              }}>
              <Text
                numberOfLines={3}
                style={{
                  color: '#001840',
                  fontSize: normalize(11.5),
                  fontFamily: Fonts.Poppins_SemiBold,
                  lineHeight: normalize(14),
                  width: '90%',
                }}>
                {item.productName}
              </Text>
            </View>
            <View style={{flex: 1, paddingTop: normalize(8)}}>
              <Text
                style={{
                  color: '#001840',
                  fontSize: normalize(11),
                  fontFamily: Fonts.Poppins_SemiBold,
                  lineHeight: normalize(13),
                }}>
                Rs. {parseInt(item.totalAmount)}
              </Text>
            </View>
          </View>
          <View
            style={{
              height: normalize(30),
              width: '100%',
              flexDirection: 'row',
            }}>
            {/* edit button */}
            <View
              style={{
                flex: 0.9,
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}>
              <Pressable
                disabled
                onPress={() => {
                  setEditCartId(item.id);
                  toggleQuickEditModal();
                }}
                style={{
                  height: '80%',
                  width: '90%',
                  borderRadius: normalize(20),
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  borderWidth: normalize(1),
                  borderColor: '#001840',
                  opacity: 0,
                }}>
                <Image
                  source={Icons.edit}
                  style={{
                    height: normalize(12),
                    width: normalize(12),
                    tintColor: '#001840',
                    marginRight: normalize(3),
                  }}
                />
                <Text
                  style={{
                    color: '#001840',
                    fontSize: normalize(10),
                    fontFamily: Fonts.Poppins_Bold,
                    lineHeight: normalize(13),
                  }}>
                  Edit
                </Text>
              </Pressable>
            </View>
            {/* increase decrease quantity */}
            <View
              style={{flex: 3, justifyContent: 'center', alignItems: 'center'}}>
              <View
                style={{
                  height: '90%',
                  width: '95%',
                  borderRadius: normalize(5),
                  flexDirection: 'row',
                  overflow: 'hidden',
                  borderWidth: normalize(1),
                  borderColor: '#001840',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    cartPlusMinusQuantity(item.id, 'minus');
                  }}
                  style={{
                    flex: 1,
                    borderRightWidth: normalize(1),
                    borderRightColor: '#001840',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: '#001840',
                      fontSize: normalize(15),
                      fontFamily: Fonts.Poppins_Bold,
                    }}>
                    -
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    flex: 2.4,
                    borderRightWidth: normalize(1),
                    borderRightColor: '#001840',
                    backgroundColor: Colors.reply,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: '#001840',
                      fontSize: normalize(11),
                      fontFamily: Fonts.Poppins_SemiBold,
                      lineHeight: normalize(13),
                    }}>
                    {item.quantity}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    cartPlusMinusQuantity(item.id, 'plus');
                  }}
                  style={{
                    flex: 1,
                    borderRightWidth: normalize(1),
                    borderRightColor: '#001840',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: '#001840',
                      fontSize: normalize(15),
                      fontFamily: Fonts.Poppins_Bold,
                    }}>
                    +
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    flex: 0.8,
                    justifyContent: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: '#001840',
                      fontSize: normalize(12),
                      fontFamily: Fonts.Poppins_Medium,
                    }}>
                    {item.quantityType == 'piece' ? 'Pc' : item.quantityType}
                  </Text>
                </View>
              </View>
            </View>
            {/* delete item */}
            <View
              style={{
                flex: 0.6,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  let newArr = allCart.filter(i => i.id != item.id);
                  setAllCart(newArr);
                }}
                style={{
                  height: normalize(20),
                  width: normalize(20),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={Icons.delete}
                  style={{
                    height: '80%',
                    width: '80%',
                    resizeMode: 'contain',
                    tintColor: '#001840',
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {isQuickEditModal && editCartId == item.id && quickEditModal(item)}
      </View>
    );
  };
  const getTotalAmount = () => {
    try {
      let allArr = allCart;
      let amount = 0;
      allArr.map((item, index) => {
        amount = amount + item.totalAmount;
      });
      return amount;
    } catch (error) {
      console.error('getTotalAmount>>>', error);
    }
  };
  const getTotalAmountAfterOffer = () => {
    try {
      if (applyOffer.trim(' ') == '') {
        return 0;
      }
      if (offerValue == 'rupee') {
        let a = applyOffer.replace(/[,-]/g, '');
        return getTotalAmount() - parseInt(a);
      } else {
        let a = applyOffer.replace(/[,-]/g, '');
        let offer = a / 100;
        let b = getTotalAmount() * offer;
        return getTotalAmount() - b;
      }
    } catch (error) {
      console.error('getTotallAmountAfterOffer>>');
    }
  };
  const addtwozero = number => {
    try {
      if (!number.toString().includes('.')) {
        return `${number}.00`;
      } else {
        return number;
      }
    } catch (error) {
      console.error('addtwozero>>', error);
    }
  };
  const cashReturnAmount = number => {
    try {
      let a = number.replace(/[,-]/g, '');
      return a - getTotalAmountAfterOffer();
    } catch (error) {
      console.error('casshReturnAmount>>');
    }
  };

  const quickEditModal = item => {
    return (
      <Modal
        isVisible={isQuickEditModal}
        onBackdropPress={() => {
          setEditCartId(0);
          toggleQuickEditModal();
        }}
        onBackButtonPress={() => {
          setEditCartId(0);
          toggleQuickEditModal();
        }}
        style={{
          justifyContent: 'flex-end',
          margin: 0,
        }}>
        <View
          style={{
            backgroundColor: 'white',
            paddingHorizontal: normalize(15),
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            width: '100%',
          }}>
          <View
            style={{
              paddingTop: normalize(15),
            }}>
            <Text
              style={{
                color: '#001840',
                fontSize: normalize(18),
                lineHeight: normalize(20),
                fontFamily: Fonts.Poppins_SemiBold,
                marginBottom: normalize(10),
              }}>
              Quick Add
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: normalize(15),
                marginBottom: normalize(15),
                alignItems: 'center',
              }}>
              <Pressable
                onPress={() => {
                  setIsAddMyInventory(!isAddMyInventory);
                }}
                style={{
                  height: normalize(15),
                  width: normalize(15),
                  marginRight: normalize(8),
                  borderColor: '#001840',
                  backgroundColor: isAddMyInventory ? '#001840' : Colors.white,
                  borderWidth: normalize(1.5),
                  borderRadius: normalize(3),
                }}
              />
              <Text
                style={{
                  color: '#001840',
                  fontSize: normalize(11),
                  lineHeight: normalize(13),
                  fontFamily: Fonts.Poppins_SemiBold,
                }}>
                Add this product to my inventory
              </Text>
            </View>
            <View
              style={{
                marginVertical: normalize(8),
              }}>
              <Text
                style={{
                  color: '#001840',
                  fontSize: normalize(11.5),
                  lineHeight: normalize(13),
                  fontFamily: Fonts.Poppins_Medium,
                }}>
                Product Name
              </Text>
              <TextInputItem
                placeholder={''}
                width={'95%'}
                height={normalize(45)}
                borderWidth={1}
                borderRadius={10}
                marginTop={normalize(5)}
                marginBottom={normalize(0)}
                color={'#001840'}
                value={productName}
                onChangeText={val => setProductName(val)}
                textColor={Colors.placeholder}
                placeholderTextColor={Colors.placeholder}
                isRightIconVisible={false}
                fontSize={13}
                fontFamily="Poppins-Medium"
              />
            </View>
            <View style={{flexDirection: 'row', marginVertical: normalize(8)}}>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    color: '#001840',
                    fontSize: normalize(11.5),
                    lineHeight: normalize(13),
                    fontFamily: Fonts.Poppins_Medium,
                  }}>
                  {' '}
                  Price/{quantityType}
                </Text>
                <TextInputItem
                  placeholder={''}
                  width={'90%'}
                  height={normalize(45)}
                  borderWidth={1}
                  borderRadius={10}
                  marginTop={normalize(5)}
                  marginBottom={normalize(0)}
                  color={'#001840'}
                  value={priceByQuantity}
                  onChangeText={val => setPriceByQuantity(val)}
                  textColor={Colors.placeholder}
                  placeholderTextColor={Colors.placeholder}
                  isRightIconVisible={false}
                  fontSize={13}
                  fontFamily="Poppins-Medium"
                  keyboardType={'number-pad'}
                />
              </View>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    color: '#001840',
                    fontSize: normalize(11),
                    lineHeight: normalize(13),
                    fontFamily: Fonts.Poppins_Medium,
                  }}>
                  Quantity
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '90%',
                    alignItems: 'center',
                    height: normalize(45),
                    borderWidth: 1,
                    borderColor: isActiveOfferFocus
                      ? '#001840'
                      : Colors.lightGrey,
                    borderRadius: 10,
                    marginTop: normalize(5),
                    backgroundColor: Colors.white,
                    paddingHorizontal: normalize(10),
                  }}>
                  <View style={{flex: 1}}>
                    <TextInput
                      value={quantity}
                      onChangeText={text => {
                        setQuantity(text);
                      }}
                      onBlur={() => {
                        setIsActiveOfferFocus(false);
                      }}
                      onFocus={() => setIsActiveOfferFocus(true)}
                      style={{
                        color: isActiveOfferFocus
                          ? '#001840'
                          : Colors.placeholder,
                      }}
                      placeholder="0"
                      maxLength={8}
                      keyboardType="number-pad"
                    />
                  </View>
                  <Dropdown
                    data={quantityTypeArr.reverse()}
                    value={quantityType}
                    style={[
                      {
                        height: normalize(25),
                        width: '60%',
                        borderRadius: normalize(8),
                        borderColor: Colors.backgroundMedium,
                        borderWidth: normalize(1),
                        paddingHorizontal: normalize(10),
                        backgroundColor: Colors.white,
                      },
                      (isOfferTypeDropDown || offerValue != null) && {
                        borderColor: '#001840',
                      },
                    ]}
                    placeholderStyle={{
                      fontSize: normalize(10),
                      fontFamily: Fonts.Poppins_Regular,
                      color: Colors.placeholder,
                    }}
                    selectedTextStyle={{
                      fontSize: normalize(10),
                      fontFamily: Fonts.Poppins_Regular,
                      color: '#001840',
                    }}
                    iconStyle={[
                      {width: 20, height: 20},
                      isOfferTypeDropDown && {tintColor: '#001840'},
                    ]}
                    dropdownPosition="top"
                    labelField="label"
                    valueField="value"
                    placeholder={'Select'}
                    onFocus={() => setIsOfferTypeDropDown(true)}
                    onBlur={() => setIsOfferTypeDropDown(false)}
                    onChange={item => {
                      // console.log('item: ' , item);
                      setQuantityType(item.value);
                    }}
                  />
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              height: normalize(1.5),
              width: '100%',
              alignSelf: 'center',
              backgroundColor: Colors.lightdark_White1,
              marginTop: normalize(15),
              marginBottom: normalize(20),
            }}
          />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: normalize(8),
            }}>
            <Text
              style={{
                color: '#001840',
                fontSize: normalize(15),
                fontFamily: Fonts.Poppins_Medium,
              }}>
              Additional Details
            </Text>
            <TouchableOpacity
              onPress={() => {
                setIsAdditionalDetails(!isAdditionalDetails);
              }}
              style={{
                height: normalize(15),
                width: normalize(15),
                transform: [{rotate: isAdditionalDetails ? '0deg' : '180deg'}],
              }}>
              <Image
                source={Icons.down}
                style={{height: '100%', width: '100%', resizeMode: 'contain'}}
              />
            </TouchableOpacity>
          </View>

          {isAdditionalDetails && (
            <View style={{marginBottom: normalize(20)}}>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-between',
                  marginTop: normalize(8),
                }}>
                {customHalfScreenTextInput(
                  true,
                  wholesalePriceValue,
                  setWholesalePriceValue,
                  'Wholesale price',
                  'number-pad',
                )}

                {customHalfScreenTextInput(
                  false,
                  cessValue,
                  setCessValue,
                  'Cess',
                  'name-phone-pad',
                )}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-between',
                  marginTop: normalize(20),
                }}>
                {customHalfScreenTextInput(
                  false,
                  gstValue,
                  setGstValue,
                  'GST',
                  'number-pad',
                )}

                {customHalfScreenTextInput(
                  false,
                  hsnValue,
                  setHsnValue,
                  'Hsn',
                  'number-pad',
                )}
              </View>
            </View>
          )}

          <Pressable
            onPress={onpressQuickAddDoneButton}
            style={{
              height: normalize(40),
              width: '100%',
              backgroundColor: '#001840',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: normalize(8),
              marginBottom: normalize(15),
              borderRadius: normalize(5),
              alignSelf: 'center',
            }}>
            <Text
              style={{
                color: Colors.white,
                fontSize: normalize(13),
                lineHeight: normalize(15),
                fontFamily: Fonts.Poppins_Medium,
              }}>
              Done
            </Text>
          </Pressable>
        </View>
      </Modal>
    );
  };

  const createBillOnPress = () => {
    try {
      if (allCart.length == 0) {
        showErrorAlert('enter at least one item');
        return;
      }

      console.log(allCart);
    } catch (error) {
      console.error('createBillOnPress>', error);
    }
  };

  return (
    <SafeView backgroundColor={Colors.white}>
      {/* <View
        style={{
          height: normalize(36),
          width: width,
          flexDirection: 'row',
          borderBottomColor: '#001840',
          borderBottomWidth: normalize(2),
          alignItems: 'flex-end',
        }}>
        <View style={{flex: 1}}>
          <View
            style={{
              height: '98%',
              width: normalize(70),
              backgroundColor: '#102A70',
              borderTopRightRadius: normalize(8),
              borderTopLeftRadius: normalize(8),
              paddingHorizontal: normalize(4),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: Colors.white,
                marginRight: normalize(8),
                fontSize: normalize(11),
                fontFamily: Fonts.Poppins_Medium,
                lineHeight: normalize(18),
              }}>
              Bill 1
            </Text>
            <Image
              source={Icons.item1}
              style={{
                height: normalize(7),
                width: normalize(7),
                tintColor: Colors.white,
              }}
            />
          </View>
        </View>
        <TouchableOpacity
          style={{
            height: '98%',
            width: normalize(33),
            backgroundColor: '#102A70',
            borderTopRightRadius: normalize(5),
            borderTopLeftRadius: normalize(5),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={Icons.plus}
            style={{
              height: normalize(15),
              width: normalize(15),
              tintColor: Colors.white,
            }}
          />
        </TouchableOpacity>
      </View> */}

      <LinearGradient
        colors={['#001840', '#102A70']}
        style={{
          height: normalize(36),
          width: '100%',
          paddingHorizontal: normalize(4),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottomColor: Colors.white,
          borderBottomWidth: normalize(1),
        }}>
        <Text
          style={{
            color: Colors.white,
            marginRight: normalize(8),
            fontSize: normalize(13),
            fontFamily: Fonts.Poppins_Medium,
            lineHeight: normalize(18),
          }}>
          Create Bill
        </Text>
      </LinearGradient>

      <View
        style={{
          height: normalize(80),
          width: width,
          flexDirection: 'row',
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
          }}>
          <View
            style={{
              height: '100%',
              width: normalize(28),
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}>
            <TouchableOpacity
              onPress={() => props.navigation.goBack()}
              style={{}}>
              <Image
                source={Icons.leftArrow}
                style={{
                  height: normalize(18),
                  width: normalize(18),
                  tintColor: '#001840',
                }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'space-around',
              paddingVertical: normalize(3),
            }}>
            <Text
              disabled
              onPress={toggleAddCustomerModal}
              style={{
                color: '#34c85a',
                fontSize: normalize(14),
                fontFamily: Fonts.Poppins_SemiBold,
                lineHeight: normalize(15),
                opacity: 0.5,
              }}>
              +Add Customer
            </Text>
            <Dropdown
              data={languageOptions}
              value={value}
              style={[styles.dropdown, isFocus && {borderColor: '#001840'}]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={[styles.iconStyle, isFocus && {tintColor: '#001840'}]}
              labelField="label"
              valueField="value"
              placeholder={'Select'}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setValue(item.value);
              }}
            />
            <View
              style={{
                height: normalize(23),
                width: '90%',
                borderRadius: normalize(15),
                borderColor: '#001840',
                borderWidth: normalize(1.5),
                flexDirection: 'row',
                overflow: 'hidden',
              }}>
              {typeArr.map((item, index) => {
                return (
                  <Pressable
                    onPress={() => {
                      setType(item.value);
                    }}
                    key={index}
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor:
                        type == item.value ? '#001840' : Colors.white,
                    }}>
                    <Text
                      style={{
                        fontSize: normalize(11),
                        fontFamily: Fonts.Poppins_Medium,
                        color: type == item.value ? Colors.white : '#001840',
                      }}>
                      {item.title}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 0.8,
          }}>
          <LinearGradient
            colors={['#001840', '#102A70']}
            style={{
              flex: 1,
            }}>
            <Pressable
              onPress={toggleAddDiscountModal}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: normalize(12),
                  fontFamily: Fonts.Poppins_Medium,
                }}>
                Total (₹)
              </Text>
              <Text
                style={{
                  color: 'white',
                  fontSize: normalize(18),
                  lineHeight: normalize(20),
                  fontFamily: Fonts.Poppins_SemiBold,
                }}>
                {addtwozero(getTotalAmountAfterOffer())}
                {/* {addtwozero(getTotalAmount())} */}
                {/* {addtwozero(cashReturnAmount(cashCollected))} */}
              </Text>
              <Text
                style={{
                  color: 'white',

                  fontSize: normalize(10),
                  fontFamily: Fonts.Poppins_Medium,
                  // lineHeight: normalize(14),
                }}>
                +Tap to discount
              </Text>
            </Pressable>
          </LinearGradient>
        </View>
      </View>

      <View style={{flex: 1, paddingTop: normalize(20)}}>
        <FlatList data={allCart} renderItem={ItemCard} />
        <View
          style={{
            height: normalize(60),
            width: width,
            position: 'absolute',
            bottom: normalize(5),
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Pressable
            onPress={toggleQuickAddModal}
            style={{
              height: normalize(40),
              width: normalize(100),
              backgroundColor: '#897459',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: normalize(20),
              borderRadius: normalize(5),
            }}>
            <Text
              style={{
                color: Colors.white,
                fontSize: normalize(13),
                lineHeight: normalize(15),
                fontFamily: Fonts.Poppins_Medium,
              }}>
              Quick add
            </Text>
          </Pressable>
          <Pressable
            onPress={createBillOnPress}
            style={{
              height: normalize(40),
              width: normalize(150),
              backgroundColor: '#34c85a',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: normalize(5),
              flexDirection: 'row',
              overflow: 'hidden',
            }}>
            <View style={{flex: 1, paddingLeft: normalize(10)}}>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: normalize(11),
                  fontFamily: Fonts.Poppins_Medium,
                }}>
                Total ({allCart.length})
              </Text>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: normalize(12),
                  lineHeight: normalize(15),
                  fontFamily: Fonts.Poppins_Medium,
                }}>
                Create bill
              </Text>
            </View>
            <View
              style={{
                height: '100%',
                width: '20%',
                justifyContent: 'flex-end',
                paddingVertical: normalize(5),
              }}>
              <Image
                source={Icons.back}
                style={{
                  height: normalize(15),
                  width: normalize(15),
                  tintColor: Colors.white,
                }}
              />
            </View>
          </Pressable>
        </View>
      </View>
      <LinearGradient
        colors={['#001840', '#102A70']}
        style={{
          height: normalize(70),
          width: width,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            height: '60%',
            width: '90%',
            backgroundColor: 'white',
            borderRadius: normalize(8),
            flexDirection: 'row',
            overflow: 'hidden',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: 'center',
              paddingLeft: normalize(20),
            }}
            onPress={toggleAddProductModal}>
            <Text
              style={{
                fontSize: normalize(12),
                lineHeight: normalize(15),
                fontFamily: Fonts.Poppins_Medium,
                color: '#102A70',
              }}>
              Search Name
            </Text>
          </TouchableOpacity>
          <View
            style={{
              height: '70%',
              width: 1.5,
              backgroundColor: '#102A70',
            }}></View>
          <TouchableOpacity
            style={{
              flex: 0.5,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}
            onPress={() => props?.navigation.navigate('Barcode3')}>
            <Text
              style={{
                fontSize: normalize(11),
                lineHeight: normalize(13),
                fontFamily: Fonts.Poppins_Medium,
                color: '#102A70',
              }}>
              Scan
            </Text>
            <Image
              source={Icons.qr}
              style={{height: normalize(20), width: normalize(20)}}
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>
      {isAddDiscountModal && addDiscountModal()}
      {isQuickAddModal && quickAddModal()}
      {isAddCustomerModal && addCustomerModal()}
      {isAddProductModal && RenderProductModal()}
    </SafeView>
  );
};

export default NewBill;
const styles = StyleSheet.create({
  dropdown: {
    height: normalize(25),
    width: '90%',
    borderRadius: normalize(8),
    borderColor: Colors.backgroundMedium,
    borderWidth: normalize(1),
    paddingHorizontal: normalize(10),
    backgroundColor: Colors.white,
  },
  placeholderStyle: {
    fontSize: normalize(12),
    fontFamily: Fonts.Poppins_Medium,
    color: Colors.placeholder,
  },
  selectedTextStyle: {
    fontSize: normalize(12),
    fontFamily: Fonts.Poppins_Medium,
    color: '#001840',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    height: normalize(45),
    borderWidth: 1,
    borderColor: 'gray',
    marginTop: 20,
    borderRadius: 10,
    padding: 10,
    paddingLeft: normalize(30),
  },
  productCard: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    margin: 10,
    elevation: 3, // Add a shadow effect on Android
  },
  productCardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: {
    width: 100,
    height: 100,
    margin: 10,
    borderRadius: 5,
  },
  productCardContent: {
    flex: 1,
    padding: 10,
  },
  productName: {
    fontWeight: 'bold',
  },
  noProductContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  noProductText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
  },
  addButton: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: Colors.darkblue,
    padding: 8,
    paddingHorizontal: 18,
    borderRadius: 5,
  },
});
