import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import SafeView from '../../components/SafeView';
import CommonLinearGradient from '../../components/CommonLinearGradient';
import {verticalScale} from '../../utils/helpers/dimen1';
import {Fonts, Icons} from '../../themes/ImagePath';
import normalize from '../../utils/helpers/dimen';
import {Colors} from '../../themes/Colors';
import Modal from 'react-native-modal';
import TextInputItem from '../../components/TextInputItem';
import MenuItem from '../../components/MenuItem';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {
  ProductDetailsRequest,
  TaxSlotRequest,
  TaxSlotaddRequest,
} from '../../redux/reducer/ProductReducer';
import showErrorAlert from '../../utils/helpers/Toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import connectionrequest from '../../utils/helpers/NetInfo';
import Loader from '../../utils/helpers/Loader';
const ProductManually = props => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(null);

  const [isAccordionOpen, setAccordionOpen] = useState(true);
  const [isDefaultPrice, setIsDefaultPrice] = useState(false);
  const [isDefaultPrice1, setIsDefaultPrice1] = useState(false);
  const [selectedQuantityId, setSelectedQuantityId] = useState(null);

  const dispatch = useDispatch();

  const item=props?.route.params ?props?.route?.params:'';
  console.log(item,"sadhskd??????????????")

  const quantities = ['1', '2', '3', '4', '5'];
  const quantities1 = ['Yes', 'No'];

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleModal2 = () => {
    setModalVisible2(!isModalVisible2);
  };

  const handleQuantitySelect = quantity => {
    setSelectedQuantityId(quantity.id);
    console.log(quantity, 'xzfmlfml');
    setSelectedQuantity(quantity.name);
    toggleModal();
  };
  const handleQuantitySelect1 = (value, variantIndex) => {
    const updatedVariants = [...variants];
    updatedVariants[variantIndex].inclusiveGst = value;
    setVariants(updatedVariants);
    setModalVisible2(false); // Close the modal after selection
  };


  const toggleAccordion = () => {
    setAccordionOpen(!isAccordionOpen);
  };

  const [numTextInputs, setNumTextInputs] = React.useState(1);
  const [show, setShow] = useState(false);

  const [isModalVisible1, setIsModalVisible1] = useState(false);

  const toggleModal1 = () => {
    setIsModalVisible1(!isModalVisible1);
  };
  const items = [
    {text: 'Make Multiple Shops', backgroundColor: 'red'},
    {text: 'Customer Loyalty Feature', backgroundColor: 'blue'},
    {text: 'Expense Management', backgroundColor: 'green'},
    {text: 'Batch Management', backgroundColor: 'green'},
    {text: 'Add staff and Store Manager', backgroundColor: 'green'},
    // Add more items as needed
  ];

  const CustomCheckbox = ({checked, onChange}) => {
    const toggleCheckbox = () => {
      onChange(!checked);
    };

    return (
      <TouchableWithoutFeedback onPress={toggleCheckbox}>
        <View
          style={[
            styles.checkbox,
            checked ? styles.checked : styles.unchecked,
          ]}>
          {checked && (
            <Image
              source={Icons.check}
              style={{width: normalize(15), height: normalize(15)}}
              tintColor="white"
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const handleDefaultPriceChange = value => {
    setIsDefaultPrice(value);
  };
  const handleDefaultPriceChange1 = value => {
    // setIsDefaultPrice(value);
    setIsDefaultPrice1(value);
  };
  const handleDeleteItem = () => {
    // Handle item deletion here
    if (numTextInputs > 0) {
      setNumTextInputs(val => val - 1);
    }
  };

  const menuData = [
    {
      title: 'WholeSales',
      isTextinput: true,
      // icon: Icons.order,
    },
    {
      title: ' Add price based on qunatity',
      isTextinput: true,
      isButton: true,
      // icon: Icons.stock,
    },
    {
      title: 'Add low stock and expiry date ',
      isTextinput: true,
      // icon: Icons.tax,
    },
    {
      title: 'Add buying price and supplier ',
      isTextinput: true,
      // icon: Icons.customers,
    },
    {
      title: 'Add Employee Commission',
      isTextinput: true,
      // icon: Icons.supplier,
    },
    {
      title: 'Category,GST,HSN and More',
      isTextinput: true, // icon: Icons.supplier,
    },
  ];

  const AccordionMenu = ({data}) => {
    return (
      <FlatList
        data={data}
        keyExtractor={item => item.title}
        renderItem={({item}) => (
          <MenuItem
            title={item.title}
            subItems={item.subItems}
            isTextinput={item.isTextinput}
            isButton={item.isButton}
            // icon={item.icon}
            flag={2}
          />
        )}
      />
    );
  };
  useEffect(() => {
    dispatch(TaxSlotRequest());
  }, []);
  const ProductReducer = useSelector(state => state.ProductReducer);
  console.log(ProductReducer?.TaxSlotaddRes?.product_id, 'ffnxnc');

  const [product, setProduct] = useState('');

  const [generatedBarcodes, setGeneratedBarcodes] = useState([]);
  const [selectedBarcode, setSelectedBarcode] = useState('');
  const [CalenderVisible, setCalenderVisible] = useState(false);
  const [CalenderVisible1, setCalenderVisible1] = useState(false);
  const [numVariants, setNumVariants] = useState(1);
  

  const hideDatePicker = () => {
    setCalenderVisible(false);
  };
  const hideDatePicker1 = () => {
    setCalenderVisible1(false);
  };

  const handleConfirm = (date, index) => {
    const formattedDate = moment(date).format('MM/DD/YYYY');
    handleChange(formattedDate, index, 'expiryDate');
    setCalenderVisible(false); // Close the date picker modal
  };

  const handleConfirm1 = (date, index) => {
    const formattedDate = moment(date).format('MM/DD/YYYY');
    handleChange(formattedDate, index, 'expiryDateAlert');
    setCalenderVisible1(false); // Close the date picker modal
  };

  const addVariant = () => {
    setNumVariants(numVariants + 1);
  };

  async function handlePress() {
    var dataValue;
    await AsyncStorage.getItem('user_id').then(value => {
      if (value != null) {
        const data = value;
        dataValue = data;
      }
    });
    if (product === '') {
      showErrorAlert('Please enter product name');
    } else if (selectedQuantity === null) {
      showErrorAlert('Please select quantity');
    } else {
      let obj = new FormData();
      obj.append('user_id', dataValue);
      obj.append('product_name', product);
      obj.append('tax_slot', selectedQuantityId);
      // console.log(obj,">>>>>>>>>>")
      // return
      dispatch(TaxSlotaddRequest(obj));
      // console.log(obj, 'Dsdskjfd');
    }
  }
  // console.log(selectedQuantity, 'sdjlLJ');
  // const [variants, setVariants] = useState([{}]);
  // const [variantData, setVariantData] = useState([{}]);
  // const [generatedBarcodes, setGeneratedBarcodes] = useState([[]]);

  // const handleAddVariant = () => {
  //   const newVariant = {barcode: ''}; // Initialize with an empty barcode
  //   setVariants([...variants, newVariant]);
  //   setVariantData([...variantData, newVariant]);
  //   setGeneratedBarcodes([...generatedBarcodes, '']); // Initialize with an empty barcode
  //   setUserInputBarcode(''); // Clear the selected barcode
  //   // generateRandomBarcode(variants.length); // Generate a new barcode for the new variant
  // };

  // const handleRemoveVariant = index => {
  //   const updatedVariants = [...variants];
  //   updatedVariants.splice(index, 1);
  //   setVariants(updatedVariants);

  //   const updatedVariantData = [...variantData];
  //   updatedVariantData.splice(index, 1);
  //   setVariantData(updatedVariantData);

  //   const updatedGeneratedBarcodes = [...generatedBarcodes];
  //   updatedGeneratedBarcodes.splice(index, 1);
  //   setGeneratedBarcodes(updatedGeneratedBarcodes);
  // };

  // const handleChange = (text, index, field) => {
  //   const updatedVariantData = [...variantData];
  //   updatedVariantData[index][field] = text;
  //   setVariantData(updatedVariantData);

  //   if (field === 'barcode') {
  //     setSelectedBarcode(text);
  //     setUserInputBarcode(text); // Update userInputBarcode with manually entered text
  //   }
  // };

  // const maxBarcodeCount = 5; // Set the maximum allowed barcode count

  // const generateBarcode = () => {
  //   if (generatedBarcodes.length < maxBarcodeCount) {
  //     const randomBarcode = Math.floor(Math.random() * 1000000).toString();
  //     return randomBarcode;
  //   } else {
  //     showErrorAlert('Maximum you have generated 5 barcode numbers at a time');
  //     return null;
  //   }
  // };

  // const generateRandomBarcode = index => {
  //   let newBarcode;
  //   if (userInputBarcode) {
  //     newBarcode = userInputBarcode;
  //   } else {
  //     newBarcode = generateBarcode();
  //   }

  //   // Clear the userInputBarcode and set the barcode for the new variant to an empty string
  //   setUserInputBarcode('');

  //   const updatedVariantData = [...variantData];
  //   updatedVariantData[index].barcodenumber = newBarcode;

  //   // Update the variant data and generated barcodes
  //   setVariantData(updatedVariantData);
  //   setGeneratedBarcodes(prevState => {
  //     const newBarcodes = [...prevState];
  //     newBarcodes[index] = newBarcode;
  //     return newBarcodes;
  //   });
  // };

  // const AddProductDetails = async () => {
  //   // debugger;
  //   var dataValue;
  //   await AsyncStorage.getItem('user_id').then(value => {
  //     if (value != null) {
  //       dataValue = value;
  //     }
  //   });

  //   for (const variantIndex in variantData) {
  //     const variant = variantData;
  //     console.log('Variant Data:', variant);
  //     if (
  //       !variant.variantName ||
  //       !variant.quantity ||
  //       // !variant.barcodenumber ||
  //       !variant.mrp ||
  //       !variant.batch_no ||
  //       !variant.purchase ||
  //       !variant.expiryDate ||
  //       !variant.expiryDateAlert ||
  //       !variant.selectedQuantity1 ||
  //       !variant.mobile_price ||
  //       !variant.store_price ||
  //       !variant.wholesale_price
  //     ) {
  //       showErrorAlert('All fileds are required');
  //       return;
  //     }
  //     let obj = new FormData();
  //     obj.append('user_id', dataValue);
  //     obj.append('product_id', ProductReducer?.TaxSlotaddRes?.product_id);
  //     obj.append('size', variant.variantName);
  //     obj.append('quantity', variant.quantity);
  //     // obj.append('user_id', dataValue);
  //     // obj.append('product_id', ProductReducer?.TaxSlotaddRes?.product_id);
  //     // obj.append('size', variantName);
  //     // obj.append('quantity', quantity);
  //     obj.append('barcode', variant.barcodenumber);
  //     obj.append('mrp', variant.mrp);
  //     obj.append('purchase_price', variant.purchase);
  //     obj.append('batch_no', variant.batch_no);
  //     obj.append('exp_date', variant.expiryDate);
  //     obj.append('exp_date_alert', variant.expiryDateAlert);
  //     obj.append('inclusive_gst', selectedQuantity1);
  //     obj.append('mobile_price', variant.mobile_price);
  //     obj.append('store_price', variant.store_price);
  //     obj.append('wholesale_price', variant.wholesale_price);

  //     console.log(obj, 'jxvxzvx');
  //     // Add other fields and values for the FormData
  //     return;

  //     // Make the API call for this variant's data.`````
  //     connectionrequest()
  //       .then(() => {
  //         dispatch(ProductDetailsRequest(obj));
  //       })
  //       .catch(err => {
  //         showErrorAlert('Please connect To Internet');
  //       });
  //   }

  //   // Continue with the rest of your logic (e.g., navigation or other actions)
  // };

  //  async function AddProductDetails() {
  //     var dataValue;
  //     await AsyncStorage.getItem('user_id').then(value => {
  //       if (value != null) {
  //         const data = value;
  //         dataValue = data;
  //       }
  //     });

  //      if (variantName === '') {
  //       showErrorAlert('Please enter variant');
  //     } else if (quantity === '') {
  //       showErrorAlert('Please enter quantity');
  //     } else if (barcodenumber === '') {
  //       showErrorAlert('Please enter barcode number');
  //     } else if (mrp === '') {
  //       showErrorAlert('Please enter mrp');
  //     } else if (purchase === '') {
  //       showErrorAlert('Please enter purchase');
  //     } else if (batch === '') {
  //       showErrorAlert('Please enter batch');
  //     } else if (expiryDate === '') {
  //       showErrorAlert('Please enter expiry date');
  //     } else if (expiryDateAlert === '') {
  //       showErrorAlert('Please enter expiry date alert');
  //     } else if (selectedQuantity1 === null)
  //       showErrorAlert('Please enter inclusive gst');
  //     } else if (mobileSalePrice === '') {
  //       showErrorAlert('Please enter mobile sale price');
  //     } else if (storeSalePrice === '') {
  //       showErrorAlert('Please enter store sale price');
  //     } else if (WholesalePrice === '') {
  //       showErrorAlert('Please enter whole sale price');
  //     } else {
  //       let obj = new FormData();
  //       // let tempArr = [];
  //       // tempArr.push(ProductReducer?.TaxSlotaddRes?.product_id);
  //       obj.append('user_id',dataValue)
  //       obj.append('product_id', ProductReducer?.TaxSlotaddRes?.product_id);
  //       obj.append('size', variantName);
  //       obj.append('quantity', quantity);
  //       obj.append('barcode', barcodenumber);
  //       obj.append('mrp', mrp);
  //       obj.append('purchase_price', purchase);
  //       obj.append('batch_no', batch);
  //       obj.append('exp_date', expiryDate);
  //       obj.append('exp_date_alert', expiryDateAlert);
  //       obj.append('inclusive_gst', selectedQuantity1);
  //       obj.append('mobile_price', mobileSalePrice);
  //       obj.append('store_price', storeSalePrice);
  //       obj.append('wholesale_price', WholesalePrice);
  //       connectionrequest()
  //         .then(() => {
  //           dispatch(ProductDetailsRequest(obj));
  //           // showErrorAlert("Message sent successfully!");
  //           // setFname("");
  //           // setLname("");
  //           // setEmail("");
  //           // setNumber("");
  //           // setMsg("");
  //         })
  //         .catch(err => {
  //           showErrorAlert('Please connect To Internet');
  //         });
  //     }
  //   }

  let status = '';
  if (status == '' || ProductReducer.status != status) {
    switch (ProductReducer.status) {
      case 'Product/ProductDetailsRequest':
        status = ProductReducer.status;

        break;
      case 'Product/ProductDetailsSuccess':
        status = ProductReducer.status;
        // props.navigation.navigate('MyStock');
        // dispatch(productGetFromWishListRequest({ user_id }));
        break;
      case 'Product/ProductDetailsFailure':
        status = ProductReducer.status;

        break;
    }
  }

  const handleChange = (text, index, field) => {
    const updatedVariants = [...variants];
    updatedVariants[index][field] = text;
    setVariants(updatedVariants);
  };

  const maxBarcodeCount = 5;
  const generateBarcode = () => {
    if (generatedBarcodes.length < maxBarcodeCount) {
      const randomBarcode = Math.floor(100000000000 + Math.random() * 900000000000).toString();
      return randomBarcode;
    } else {
      showErrorAlert('Maximum you have generated 5 barcode numbers at a time');
      return null;
    }
  };

  const handleGenerateRandomBarcode = index => {
    const newBarcode = generateBarcode();

    const updatedVariants = [...variants];
    updatedVariants[index].barcodenumber = newBarcode;

    setVariants(updatedVariants);
  };

  const handleRemoveVariant = index => {
    const updatedVariants = [...variants];
    updatedVariants.splice(index, 1);
    setVariants(updatedVariants);
  };

  const [variants, setVariants] = useState([
    {
      variantName: '',
      quantity: '',
      barcodenumber:item ? item.item : '', // Initialize with an empty barcode
      mrp: '',
      batch_no: '',
      purchase: '',
      expiryDate: '',
      expiryDateAlert: '',
      // selectedQuantity1: '',
      mobile_price: '',
      store_price: '',
      wholesale_price: '',
      inclusiveGst: 'Yes',
    },
  ]);

  const handleAddVariant = () => {
    
    setVariants(prevVariants => [
      ...prevVariants,
      {
        variantName: '',
        quantity: '',
        barcodenumber:'', // Initialize with an empty barcode
        mrp: '',
        batch_no: '',
        purchase: '',
        expiryDate: '',
        expiryDateAlert: '',
        selectedQuantity1: '',
        mobile_price: '',
        store_price: '',
        wholesale_price: '',
        inclusiveGst: 'Yes',
      },
    ]);
    // Check if any of the variant properties are non-empty
    const hasNonEmptyVariant = variants.some(
      variant =>
        variant.variantName ||
        variant.quantity ||
        variant.barcodenumber ||
        variant.mrp ||
        variant.batch_no ||
        variant.purchase ||
        variant.expiryDate ||
        variant.expiryDateAlert ||
        variant.selectedQuantity1 ||
        variant.mobile_price ||
        variant.store_price ||
        variant.wholesale_price
    );
  
    if (hasNonEmptyVariant) {
     
      AddProductDetails();
    }
  };
  



  

  const AddProductDetails = async () => {
    // debugger;
    var dataValue;
    await AsyncStorage.getItem('user_id').then(value => {
      if (value != null) {
        dataValue = value;
      }
    });
      for (const variant of variants) {
      if (
        !variant.variantName ||
        !variant.quantity ||
        !variant.barcodenumber ||
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
        showErrorAlert('All fields are required for the variant');
        return;
      }
      let obj = new FormData();
      obj.append('user_id', dataValue);
      obj.append('product_id', ProductReducer?.TaxSlotaddRes?.product_id);
      obj.append('tax_slot',selectedQuantityId)
      obj.append('size', variant.variantName);
      obj.append('quantity', variant.quantity);
      obj.append('barcode', variant.barcodenumber);
      obj.append('mrp', variant.mrp);
      obj.append('purchase_price', variant.purchase);
      obj.append('batch_no', variant.batch_no);
      obj.append('exp_date', variant.expiryDate);
      obj.append('exp_date_alert', variant.expiryDateAlert);
      obj.append('inclusive_gst', variant.inclusiveGst);
      obj.append('mobile_price', variant.mobile_price);
      obj.append('store_price', variant.store_price);
      obj.append('wholesale_price', variant.wholesale_price);

      try {
        await connectionrequest();
        dispatch(ProductDetailsRequest(obj));
      } catch (err) {
        showErrorAlert('Please connect to the Internet');
      }
    }
  };

  
  async function validateField(){
    for (const variant of variants) {
      if(product===""){
        showErrorAlert('All fields are required for the variant');
        return;
      }else 
      if (
        !variant.variantName ||
        !variant.quantity ||
        !variant.barcodenumber ||
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
        // showErrorAlert('All fields are required for the variant');
        return;
      }
     
        //  connectionrequest();
      //  AddProductDetails();
      props?.navigation?.navigate('TabStack1')
     
    }
  }

  return (
    <SafeView>
      <CommonLinearGradient heading={'Add Product Manually'} />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
        <Loader
          visible={ProductReducer.status === 'Product/ProductDetailsRequest'}
        />
        <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: '5%'}}>
          <View
            style={{
              //   flex: 1,
              width: '90%',
              alignSelf: 'center',
              marginTop: verticalScale(30),
              flexDirection: 'row', // Added flexDirection for horizontal layout
              alignItems: 'center', // Vertically align content
            }}>
            {/* Left Image */}
            <Image
              source={Icons.gift} // Replace with your image source
              style={styles.image}
            />

            {/* Right Content */}
            <View style={styles.rightContent}>
              {/* Text and TextInput Section */}
              <View style={styles.textInputSection}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter product name"
                  value={product}
                  onChangeText={val => setProduct(val)}
                />
              </View>

              {/* Custom Dropdown Section */}
              <View style={styles.dropdownSection}>
                <Text style={styles.label}>Quantity:</Text>
                <Text>{selectedQuantity && selectedQuantity?.slice(4)}</Text>
                <TouchableOpacity
                  style={styles.dropdownButton}
                  onPress={toggleModal}>
                  <Text style={styles.dropdownButtonText}>
                    {selectedQuantity || 'Tax Slot'}
                  </Text>
                  <Image
                    source={Icons.down} // Replace with your down arrow image
                    style={styles.downArrow}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  justifyContent: 'flex-end',
                  alignSelf: 'flex-end',
                  width: '60%',
                  marginTop: normalize(5),
                }}>
                <TouchableOpacity
                  style={{
                    padding: normalize(10),

                    backgroundColor: Colors.darkblue,
                    borderRadius: 10,
                    // paddingHorizontal: normalize(15),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={handlePress}>
                  <Text style={{color: Colors.white}}>Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {variants.map((variant, index) => (
            <>
              <View style={styles.container_section}>
                <View style={styles.accordionHeader}>
                  <TouchableOpacity onPress={toggleAccordion}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Image
                        source={Icons.down}
                        style={{width: normalize(20), height: normalize(20)}}
                      />
                      <Text style={styles.headerText}>
                        Variants #{index + 1}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity>
                      <Image
                        source={Icons.copy}
                        style={{height: normalize(20), width: normalize(20)}}
                      />
                    </TouchableOpacity>
                    {/* {numVariants > 1 &&  */}
                    {variants.length > 1 && (
                      <TouchableOpacity
                        onPress={() => {
                          // if (numVariants > 1) {
                          //   setNumVariants(numVariants - 1);
                          // }
                          handleRemoveVariant(index);
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

                {isAccordionOpen && (
                  <View style={styles.accordionContent}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View style={styles.inputSection}>
                        <Text
                          style={{
                            fontSize: normalize(12),
                            color: Colors.black,
                          }}>
                          Variant Name
                        </Text>
                        <TextInputItem
                          viewbordercolor="red"
                          placeholder={'Ex 1pc,xl,etc.'}
                          width={normalize(150)}
                          height={normalize(50)}
                          borderWidth={1}
                          borderRadius={10}
                          marginTop={normalize(5)}
                          value={variant.variantName}
                          onChangeText={text =>
                            handleChange(text, index, 'variantName')
                          }
                          textColor={Colors.placeholder}
                          placeholderTextColor={Colors.placeholder}
                          isRightIconVisible={false}
                          fontSize={13}
                          fontFamily="Poppins-Medium"
                        />
                      </View>

                      <View style={styles.inputSection}>
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
                          width={normalize(120)}
                          height={normalize(50)}
                          borderWidth={1}
                          borderRadius={10}
                          marginTop={normalize(5)}
                          value={variant.quantity}
                          onChangeText={text =>
                            handleChange(text, index, 'quantity')
                          }
                          textColor={Colors.placeholder}
                          placeholderTextColor={Colors.placeholder}
                          isRightIconVisible={false}
                          fontSize={13}
                          fontFamily="Poppins-Medium"
                        />
                      </View>
                    </View>
                    <View style={styles.inputSection}>
                      <Text
                        style={{
                          fontSize: normalize(12),
                          color: Colors.black,
                        }}>
                        Enter barcode number
                      </Text>
                      <View
                        style={{
                          padding: normalize(10),
                          borderWidth: 1,
                          borderRadius: 5,
                          paddingVertical: normalize(40),
                          marginTop: normalize(10),
                          borderColor: Colors.lightGrey,
                        }}>
                        <View style={styles.container_section1}>
                          <View style={styles.inputContainers}>
                            {/* Left Icon */}
                            <TouchableOpacity onPress={()=>{
                              dispatch(clearBarcodeDetailsRequest({}));
                              props?.navigation?.navigate('Barcode',{flag:1})}}>
                              <Image source={Icons.qr} style={styles.icon} />
                            </TouchableOpacity>

                            {/* TextInput */}
                            <TextInput
                              style={styles.textInputs}
                              placeholder="Enter Barcode Number"
                              // value={userInputBarcode}
                              // onChangeText={text => setUserInputBarcode(text)}

                              value={variant.barcodenumber}
                              onChangeText={text =>
                                handleChange(text, index, 'barcodenumber')
                              }
                            />

                            {/* Right Button */}
                            <TouchableOpacity
                              style={{
                                padding: normalize(10),
                                backgroundColor: Colors.darkblue,
                                borderRadius: 10,
                                paddingHorizontal: normalize(18),
                              }}>
                              <Text style={{color: Colors.white}}>Add</Text>
                            </TouchableOpacity>
                          </View>
                          <ScrollView
                            horizontal={true} // Enable horizontal scrolling
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{flexDirection: 'row'}} // Ensure the content is laid out horizontally
                          >
                            {generatedBarcodes.map((barcode, index) =>
                              barcode ? (
                                <TouchableOpacity
                                  key={index}
                                  style={{
                                    marginTop: normalize(10),
                                    padding: 3,
                                    backgroundColor: Colors.lightGrey,
                                    borderRadius: 10,
                                    marginLeft: 10,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                  }}
                                  onPress={() => {
                                    setSelectedBarcode(barcode);
                                    handleChange(
                                      barcode,
                                      index,
                                      'barcodenumber',
                                    );
                                  }}>
                                  <Text numberOfLines={1}>{barcode}</Text>
                                </TouchableOpacity>
                              ) : null,
                            )}
                          </ScrollView>

                          <TouchableOpacity
                            style={{
                              padding: 10,
                              backgroundColor: Colors.placeholder,
                              borderRadius: 5,
                              marginTop: normalize(10),
                              justifyContent: 'flex-end',
                              alignSelf: 'flex-end',
                            }}
                            onPress={() => handleGenerateRandomBarcode(index)}>
                            <Text>Auto generated barcode</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row', // Text inputs are horizontal
                        justifyContent: 'space-between',
                      }}>
                      <View
                        style={{
                          flexDirection: numTextInputs === 0 ? 'row' : 'column',
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
                              MRP
                            </Text>
                            <TextInputItem
                              viewbordercolor="red"
                              placeholder={'RS.0'}
                              width={normalize(130)}
                              height={normalize(50)}
                              borderWidth={1}
                              borderRadius={10}
                              marginTop={normalize(5)}
                              keyboardType={'numeric'}
                              value={variant.mrp}
                              onChangeText={text =>
                                handleChange(text, index, 'mrp')
                              }
                              textColor={Colors.placeholder}
                              placeholderTextColor={Colors.placeholder}
                              isRightIconVisible={false}
                              fontSize={13}
                              fontFamily="Poppins-Medium"
                            />
                            {/* <View
                                  style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                  }}>
                                  <CustomCheckbox
                                    checked={isDefaultPrice}
                                    onChange={handleDefaultPriceChange}
                                  />
                                  <Text style={{marginLeft: 5}}>
                                    Set as default price
                                  </Text>
                                </View> */}
                          </View>
                          {/* {numTextInputs > 1 && (
                                <TouchableOpacity
                                  onPress={handleDeleteItem}
                                  style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: normalize(80),
                                  }}>
                                  <Image
                                    source={Icons.delete} // Replace with your delete icon image
                                    style={{width: 20, height: 20}}
                                  />
                                </TouchableOpacity>
                              )} */}
                          <View
                            style={[
                              styles.inputSection,
                              {
                                right: numTextInputs > 1 ? 0 : normalize(-15),
                              },
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
                              width={normalize(130)}
                              height={normalize(50)}
                              borderWidth={1}
                              borderRadius={10}
                              keyboardType={'numeric'}
                              marginTop={normalize(5)}
                              value={variant.purchase}
                              onChangeText={text =>
                                handleChange(text, index, 'purchase')
                              }
                              textColor={Colors.placeholder}
                              placeholderTextColor={Colors.placeholder}
                              isRightIconVisible={false}
                              fontSize={13}
                              fontFamily="Poppins-Medium"
                            />
                            {/* <View
                                  style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    bottom: normalize(2),
                                  }}>
                                  <CustomCheckbox
                                    checked={isDefaultPrice1}
                                    onChange={handleDefaultPriceChange1}
                                  />
                                  <Text style={{marginLeft: 5}}>
                                    Including GST
                                  </Text>
                                </View> */}
                          </View>
                        </View>
                        {/* );
                        })} */}
                      </View>
                    </View>
                    {/* <View
                      style={{
                        justifyContent: 'space-around',
                        flexDirection: 'row',
                      }}>
                      <TouchableOpacity
                        onPress={() => setNumTextInputs(val => val + 1)}>
                        <Text style={{color: Colors.green}}>
                          + Add multiple price
                        </Text>
                      </TouchableOpacity>
                      <Text style={{marginLeft: normalize(50)}}>
                        Discount 0%
                      </Text>
                    </View> */}
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
                          placeholder={''}
                          width={normalize(130)}
                          height={normalize(50)}
                          borderWidth={1}
                          borderRadius={10}
                          marginTop={normalize(5)}
                          value={variant.batch_no}
                          onChangeText={text =>
                            handleChange(text, index, 'batch_no')
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
                          onPress={() => setCalenderVisible(!CalenderVisible)}>
                          <TextInputItem
                            viewbordercolor="red"
                            placeholder={'Expiry date'}
                            width={normalize(130)}
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
                            width={normalize(130)}
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
                          onPress={() => toggleModal2(index)}>
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
                          width={normalize(130)}
                          height={normalize(50)}
                          borderWidth={1}
                          borderRadius={10}
                          keyboardType={'numeric'}
                          marginTop={normalize(5)}
                          // value={mobileSalePrice}
                          // onChangeText={val => setMobileSalePrice(val)}
                          value={variant.mobile_price}
                          onChangeText={text =>
                            handleChange(text, index, 'mobile_price')
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
                          width={normalize(130)}
                          height={normalize(50)}
                          borderWidth={1}
                          borderRadius={10}
                          keyboardType={'numeric'}
                          marginTop={normalize(5)}
                          // value={storeSalePrice}
                          // onChangeText={val => setStoreSalePrice(val)}
                          value={variant.store_price}
                          onChangeText={text =>
                            handleChange(text, index, 'store_price')
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
                          width={normalize(275)}
                          height={normalize(50)}
                          borderWidth={1}
                          borderRadius={10}
                          keyboardType={'numeric'}
                          marginTop={normalize(5)}
                          // value={WholesalePrice}
                          // onChangeText={val => setwholePrice(val)}
                          value={variant.wholesale_price}
                          onChangeText={text =>
                            handleChange(text, index, 'wholesale_price')
                          }
                          textColor={Colors.placeholder}
                          placeholderTextColor={Colors.placeholder}
                          isRightIconVisible={false}
                          fontSize={13}
                          fontFamily="Poppins-Medium"
                        />
                      </View>
                    </View>
                    {/* <TouchableOpacity
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    marginHorizontal: normalize(10),
                  }}
                  onPress={() => setShow(!show)}>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                    }}>
                    <Text
                      style={{
                        fontSize: normalize(12),
                        fontFamily: Fonts.Poppins_Medium,
                        color: Colors.black,
                      }}>
                      Additional Details
                    </Text>
                  </TouchableOpacity>
                  <Image
                    style={{width: normalize(20), height: normalize(20)}}
                    source={Icons.down}
                  />
                </TouchableOpacity>
                {show && <AccordionMenu data={menuData} />} */}
                    <DateTimePickerModal
                      textColor={Colors.primaryColor}
                      backdropStyleIOS={Colors.primaryColor}
                      buttonTextColorIOS={Colors.primaryColor}
                      isVisible={CalenderVisible}
                      mode="date"
                      onConfirm={date => handleConfirm(date, index)}
                      onCancel={() => setCalenderVisible(false)}
                    />
                    <DateTimePickerModal
                      textColor={Colors.primaryColor}
                      backdropStyleIOS={Colors.primaryColor}
                      buttonTextColorIOS={Colors.primaryColor}
                      isVisible={CalenderVisible1}
                      mode="date"
                      onConfirm={date => handleConfirm1(date, index)}
                      onCancel={() => setCalenderVisible1(false)}
                    />
                  </View>
                )}
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
                      renderItem={({item, variantIndex}) => (
                        <TouchableOpacity
                          style={styles.modalItem}
                          onPress={() => handleQuantitySelect1(item, index)}>
                          <Text style={styles.modalItemText}>{item}</Text>
                        </TouchableOpacity>
                      )}
                    />
                  </View>
                </View>
              </Modal>
            </>
          ))}

          <View style={{marginHorizontal: normalize(10)}}>
            <TouchableOpacity
              style={{
                paddingHorizontal: normalize(100),
                paddingVertical: normalize(15),
                backgroundColor: '#BBD6C5',
                flexDirection: 'row',
                borderRadius: 10,
              }}
              // onPress={() => toggleModal1()}
              // onPress={addVariant}
              onPress={handleAddVariant}>
              <Text style={{fontSize: normalize(15), color: Colors.black}}>
                Add Variant
              </Text>
              {/* <Image
                style={{
                  width: normalize(20),
                  height: normalize(20),
                  marginLeft: normalize(10),
                }}
                source={Icons.diamond}
                tintColor="white"
              /> */}
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, {backgroundColor: Colors.black2}]}
              onPress={() => console.log('Cancel Pressed')}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, {backgroundColor: Colors.green}]}
              onPress={() =>validateField()}
              
              >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <Modal
        animationType="pop"
        transparent={true}
        visible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        onRequestedClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={ProductReducer?.TaxSlotRes?.tax_slots}
              keyExtractor={item => item}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => handleQuantitySelect(item)}>
                  <Text style={styles.modalItemText}>{item?.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

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
              top: normalize(-50),
              position: 'absolute',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{height: normalize(100), width: normalize(100)}}
              source={Icons.premium}
            />
            <Text
              style={{
                fontSize: normalize(18),
                fontWeight: '700',
                color: Colors.black,
                marginTop: normalize(10),
              }}>
              This is the Premium Feature
            </Text>
          </View>
          <View
            style={{
              position: 'absolute',
              top: normalize(95),
              left: 0,
              marginHorizontal: normalize(40),
            }}>
            <Text style={{fontSize: normalize(13)}}>
              Buy our Premium Plan to:
            </Text>
            <View>
              {items.map((item, index) => (
                <View
                  key={index}
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View
                    style={{
                      width: normalize(12),
                      height: normalize(12),
                      marginTop: normalize(10),
                      backgroundColor: Colors.blue,
                      borderRadius: 2,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        height: normalize(8),
                        width: normalize(8),
                        backgroundColor: 'white',
                        borderRadius: normalize(5),
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      marginLeft: normalize(5),
                      top: normalize(5),
                      fontSize: normalize(13),
                      fontFamily: Fonts.Poppins_Black,
                      marginVertical: 3,
                    }}>
                    {item.text}
                  </Text>
                </View>
              ))}
            </View>

            <TouchableOpacity
              style={{
                backgroundColor: Colors.blue,
                // padding: normalize(15),
                width: '100%',
                height: normalize(45),
                // marginHorizontal: normalize(10),
                justifyContent: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: normalize(15),
                borderRadius: 10,
                marginLeft: 10,
              }}>
              <Text
                style={{
                  fontSize: normalize(18),
                  color: Colors.white,
                  fontWeight: '700',
                }}>
                Upgarde to Pro
              </Text>
              <Image
                style={{
                  height: normalize(15),
                  width: normalize(15),
                  marginLeft: normalize(10),
                }}
                tintColor="white"
                source={Icons.diamond}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeView>
  );
};

export default ProductManually;

const styles = StyleSheet.create({
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
    width: normalize(130),
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
    margin: 10,
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
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    backgroundColor: Colors.darkblue, // Customize the checkbox color when checked
  },
  unchecked: {
    backgroundColor: 'white', // Customize the checkbox color when unchecked
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
    // position: 'absolute',
    // bottom: normalize(30),
    alignItems: 'center',
    left: 0,
  },
  button: {
    flex: 1,

    padding: normalize(14),
    // paddingHorizontal:normalize(20),
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: normalize(20),
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: normalize(14),
  },
});
