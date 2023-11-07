import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import SafeView from '../../components/SafeView';
import CommonLinearGradient from '../../components/CommonLinearGradient';
import TextInputItem from '../../components/TextInputItem';
import { Colors } from '../../themes/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetailsRequest } from '../../redux/reducer/ProductReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Search = () => {
  // const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const dispatch = useDispatch();
  // Handle search functionality
  const handleSearch = (text) => {
    setSearch(text);
    const filteredResults = products.filter(product =>
      product.name.toLowerCase().includes(text.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  const ProductReducer = useSelector(state => state.ProductReducer);
  console.log(ProductReducer?.prodctDetailsRes,"FF>>>>>>>>>")

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(
        function (item) {
          const itemData = item.title
            ? item.title.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  React.useEffect(() => {
    // fetch('https://jsonplaceholder.typicode.com/posts')
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     setFilteredDataSource(responseJson);
    //     setMasterDataSource(responseJson);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
    getProductDetails();
  }, []);

 async function getProductDetails(){
    var dataValue;
    await AsyncStorage.getItem('user_id').then(value => {
      if (value != null) {
        const data = value;
        dataValue = data;
      }
    });
    let obj=new FormData();
    obj.append('user_id',dataValue);
    obj.append('product_id',ProductReducer?.prodctDetailsRes?.product_id);
    obj.append("variant_id",ProductReducer?.prodctDetailsRes?.variant_id);
    dispatch(getProductDetailsRequest(obj));
  }

  const ItemView = ({item}) => {
    return (
      // Flat List Item
      <Text
        style={styles.itemStyle}
        onPress={() => getItem(item)}>
        {item.id}
        {'.'}
        {item.title.toUpperCase()}
      </Text>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  return (
    <SafeView>
      <CommonLinearGradient heading={'Search by Name'} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        enabled
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              marginHorizontal: normalize(20),
              marginTop: normalize(20),
            }}
          >
            <TextInputItem
              placeholder={'Search'}
              width={'100%'}
              height={normalize(50)}
              borderWidth={1}
              borderRadius={10}
              marginTop={normalize(10)}
              onChangeText={(text) => searchFilterFunction(text)}
              value={search}
              textColor={Colors.placeholder}
              placeholderTextColor={Colors.placeholder}
              isRightIconVisible={false}
              fontSize={13}
              fontFamily="Poppins-Medium"
            />
          </View>
          <View style={{ marginHorizontal: normalize(20) }}>
          {/* <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
          /> */}
              <Text style={styles.noProductFound}>No product found</Text>
            {/* )} */}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeView>
  );
};

export default Search;

const styles = StyleSheet.create({
  noProductFound: {
    marginTop: 10,
    textAlign: 'center',
    color:Colors.placeholder,
  },
  itemStyle: {
    padding: 10,
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
  },
});

// const products = [
//   { id: 1, name: 'Product A' },
//   { id: 2, name: 'Product B' },
//   { id: 3, name: 'Product C' },
//   // Add more products here
// ];
