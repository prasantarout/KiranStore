import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import SafeView from '../../components/SafeView';
import {Colors} from '../../themes/Colors';
import {Icons} from '../../themes/ImagePath';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getProductRequest} from '../../redux/reducer/ProductReducer';
import showErrorAlert from '../../utils/helpers/Toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../utils/helpers/Loader';
const AllStock = props => {
  const flag = props?.route.params?.flag;
  console.log(flag, '>>>>>>>>>>>>>>>>>>>>>>>>hello');
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [offset, setOffset] = useState(1);
  const [isListEnd, setIsListEnd] = useState(false);

  const isFocus = useIsFocused();
  const dispatch = useDispatch();

  const ProductReducer = useSelector(state => state.ProductReducer);
  console.log(
    ProductReducer?.getProductRes,
    '====================================',
  );

  const handleGetProduct = async () => {
    try {
      setLoading(true);

      const user_id = await AsyncStorage.getItem('user_id');
      if (user_id !== null) {
        let obj = new FormData();
        obj?.append('user_id', user_id);
        obj?.append('start', offset);
        obj?.append('limit', limit);

        dispatch(getProductRequest(obj));
      } else {
        showErrorAlert('User ID not found. Please log in.');
        setLoading(false); // Hide loader on error
      }
    } catch (error) {
      showErrorAlert('An error occurred while searching for the product.');
      console.error(error);
      setLoading(false); // Hide loader on error
    }
  };

  useEffect(() => {
    handleGetProduct();
  }, [isFocus, searchQuery, offset]);

  useEffect(() => {
    if (
      ProductReducer?.getProductRes &&
      Array.isArray(ProductReducer.getProductRes)
    ) {
      setTotalPages(Math.ceil(ProductReducer.getProductRes.length / limit));
      setDataSource(prevData => [
        ...prevData,
        ...ProductReducer?.getProductRes,
      ]);
      setLoading(false); // Hide loader when data is fetched
    } else {
      // Handle the case when getProductRes is not an array or is undefined
      setLoading(false); // Hide loader in case of an error or empty data
    }
  }, [ProductReducer?.getProductRes]);

  const getData = () => {
    if (!loading && !isListEnd) {
      setOffset(offset + 1);
      setLoading(false);
    }
  };

  // console.log(ProductReducer?.getProductRes,"cnscxncnx")
  // useEffect(() => {
  //   if (ProductReducer?.getProductRes) {
  //     setTotalPages(Math.ceil(ProductReducer.getProductRes.length / limit));
  //     setAllProducts((prevProducts) => [...prevProducts, ...ProductReducer.getProductRes]);
  //   }
  // }, [ProductReducer?.getProductRes]);

  let status = '';
  if (status === '' || ProductReducer.status !== status) {
    switch (ProductReducer.status) {
      case 'Product/getProductByBarcodeRequest':
        status = ProductReducer.status;
        break;

      case 'Product/getProductByBarcodeSuccess':
        status = ProductReducer.status;
        console.log(
          ProductReducer?.getProductByBarcodeRes,
          '+++++++++++++++++++++++',
        );
        // dispatch(getProductByBarcodeSuccess(''));
        break;
      case 'Product/getProductByBarcodeFailure':
        status = ProductReducer.status;
        break;
      default:
        break;
    }
  }

  const renderFooter = () => {
    return (
      // Footer View with Loader
      <View style={styles.footer}>
        {loading && <ActivityIndicator color="black" style={{margin: 15}} />}
      </View>
    );
  };

  const renderProductItem = ({item}) => {
    console.log(item.image, '>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    const lastIndex = item?.image?.lastIndexOf('/');
    const urlPath = item?.image?.substring(0, lastIndex + 1); // URL path
    const fileName = item?.image?.substring(lastIndex + 1);
    console.log(urlPath+fileName, '>>>>>>>>>>>>>>>>>>>>>>>>>>>>image');
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
        <TouchableOpacity
          onPress={() => {
            if (!flag == 1) {
              props?.navigation.navigate('Purchase', {product: item});
            }
          }}
          underlayColor={Colors.lightGray} // Change the color when pressed
          style={styles.productCard}>
          <View style={styles.productCardContainer}>
            <Image
              source={{ uri: urlPath + fileName }}
              style={styles.productImage}
            />
            <View style={styles.productCardContent}>
              <Text style={styles.productName}>{item.product_name}</Text>
              {/* <Text>Batch No: {item.batch_no}</Text> */}
              <View style={{flexDirection: 'row'}}>
                <Text style={{color: '#000000'}}>Mrp:{item.mrp}</Text>
                <Text style={{color: '#000000'}}>{'|'}</Text>
                <Text style={{color: '#000000'}}>
                  Purchase Price:{item.purchase_price}
                </Text>
              </View>
              {/* <Text>Mobile Sale Price: {item.mobile_sale_price}</Text> */}
              {/* <Text>Unit Store Price: {item.unit_store_price}</Text> */}
              {/* <Text>Wholesale Sale Price:{item.wholesale_sale_price}</Text> */}
              <Text style={{color: '#000000'}}>
                Avaliable Stock:{item.avaliable_stock}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  };
  return (
    <SafeView>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        enabled>
        <Loader
          visible={ProductReducer?.status === 'Product/getProductRequest'}
        />
        <ScrollView
          contentContainerStyle={{flexGrow: 1, paddingBottom: 10}}
          showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholderTextColor={'#000000'}
                placeholder="Search"
                value={searchQuery}
                onChangeText={text => setSearchQuery(text)}
              />
              <TouchableOpacity
                style={styles.qrIcon}
                onPress={() => {
                  // Handle QR code icon press here
                  props.navigation.navigate('Barcode1', {flag: 2});
                }}>
                <Image source={Icons.qr} style={styles.qrImage} />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <FlatList
          data={dataSource?.length > 0 ? dataSource : []} // Use your product data from Redux here
          renderItem={renderProductItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{marginTop: 20, paddingBottom: normalize(120)}}
          onEndReached={getData}
          onEndReachedThreshold={0.1}
          // ListFooterComponent={renderFooter}
          ListEmptyComponent={() => (
            <View style={styles.noProductContainer}>
              <Text style={styles.noProductText}>No products found</Text>
            </View>
          )}
        />
      </KeyboardAvoidingView>
      <TouchableOpacity
        style={styles.fab}
        onPress={() => props.navigation.navigate('AddPRoductToMyShop')}>
        <Image
          source={Icons.plus}
          style={styles.fabIcon}
          tintColor={Colors.white}
        />
      </TouchableOpacity>
    </SafeView>
  );
};

export default AllStock;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: normalize(20),
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
    color: '#000000',
  },
  qrIcon: {
    position: 'absolute',
    left: 10,
    bottom: 0,
    top: normalize(30),
    zIndex: 1,
  },
  qrImage: {
    height: normalize(15),
    width: normalize(15),
  },
  fab: {
    position: 'absolute',
    width: normalize(56),
    height: normalize(56),
    borderRadius: normalize(28),
    backgroundColor: Colors.darkblue,
    justifyContent: 'center',
    alignItems: 'center',

    bottom: normalize(20),
    right: normalize(20),
  },
  fabIcon: {
    height: normalize(24),
    width: normalize(24),
    resizeMode: 'contain',
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
    color: '#000000',
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
});
