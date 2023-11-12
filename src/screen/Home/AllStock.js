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
  console.log(flag,">>>>>>>>>>>>>>>>>>>>>>>>hello")
  const [start, setStart] = useState(0);
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const isFocus = useIsFocused();
  const dispatch = useDispatch();

  const ProductReducer = useSelector(state => state.ProductReducer);
  console.log(
    ProductReducer?.getProductRes,
    '====================================',
  );

 
    const handleGetProduct = async () => {
    try {
      const user_id = await AsyncStorage.getItem('user_id');
      if (user_id !== null) {
        let obj = new FormData();
        obj?.append('user_id', user_id);
        obj?.append('start', currentPage);
        obj?.append('limit', limit);
        console.log(obj,",,,,,,,,,,,,,,,")
        // return
        dispatch(getProductRequest(obj));
       
        // Dispatch your Redux action here
      } else {
        showErrorAlert('User ID not found. Please log in.');
      }
    } catch (error) {
      showErrorAlert('An error occurred while searching for the product.');
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
  } 

  let status='';
  if (status === '' || ProductReducer.status !== status) {
    switch (ProductReducer.status) {
      case 'Product/getProductByBarcodeRequest':
        status = ProductReducer.status;
        break;

      case 'Product/getProductByBarcodeSuccess':
        status = ProductReducer.status;
        console.log(ProductReducer?.getProductByBarcodeRes,"+++++++++++++++++++++++")
        // dispatch(getProductByBarcodeSuccess(''));
        break;
      case 'Product/getProductByBarcodeFailure':
        status = ProductReducer.status;
        break;
      default:
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
        <TouchableOpacity
          onPress={() => {
            if(!flag==1){
            props?.navigation.navigate('Purchase', {product: item});
          }
          }}
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
                placeholder="Search"
                value={searchQuery}
                onChangeText={text => setSearchQuery(text)}
              />
              <TouchableOpacity
                style={styles.qrIcon}
                onPress={() => {
                  // Handle QR code icon press here
                  props.navigation.navigate('Barcode1',{flag:2});
                }}>
                <Image source={Icons.qr} style={styles.qrImage} />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <FlatList
          data={ProductReducer?.getProductRes} // Use your product data from Redux here
          renderItem={renderProductItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{marginTop: 20, paddingBottom: normalize(120)}}
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
