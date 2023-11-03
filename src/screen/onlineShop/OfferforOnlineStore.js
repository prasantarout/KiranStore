import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Image,
  } from 'react-native';
  import React, {useState, useRef} from 'react';
  import SafeView from '../../components/SafeView';
  import CommonLinearGradient from '../../components/CommonLinearGradient';
  import {Icons} from '../../themes/ImagePath';
  import normalize from '../../utils/helpers/dimen';
  import CommonBottomSheet from '../../components/BottomSheet';
  import TextInputItem from '../../components/TextInputItem';
  import {Colors} from '../../themes/Colors';
  import { calcW } from '../../utils/helpers/dimen2';
  const OfferforOnlineStore = props => {
    const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
    const [gstDetails, setGstDetails] = useState('');
    // const bottomSheetRef = useRef(null);
    // const handleClosePress = () => bottomSheetRef.current.close();
    // const toggleBottomSheet = () => {
    //   setBottomSheetVisible(!isBottomSheetVisible);
    //   handleClosePress();
    // };
    let item = [
      {
        id: 1,
        title: 'Single Products',
        Icon: Icons.skip,
      },
      {
        id: 2,
        title: 'Category Banner',
        Icon: Icons.skip,
      },
   
    ];
  
    const renderItem = ({item}) => (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          if (item?.id === 1) {
            props.navigation.navigate('SingleProduct');
          } else if (item?.id === 2) {
            props.navigation.navigate('CategoryBanner');
          }
        }}>
        <Text style={styles.itemText}>{item.title}</Text>
        <Image source={item.Icon} style={styles.icon} />
      </TouchableOpacity>
    );
  
    return (
      <SafeView>
        <CommonLinearGradient heading={'Offer for Online Store'} />
        <View style={styles.container}>
          <FlatList
            data={item}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
          />
        </View>
        {/* <CommonBottomSheet
          isVisible={isBottomSheetVisible}
          onClose={toggleBottomSheet}
          close={bottomSheetRef}>
          <View style={{marginTop: normalize(20)}}>
            <TextInputItem
              viewbordercolor="red"
              placeholder={'Enter Your Voucher Code'}
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
                  width: calcW(0.5),
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    fontSize: normalize(14),
                    fontWeight: '500',
                    color: Colors.white,
                  }}>
                  Redeem Now
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </CommonBottomSheet> */}
      </SafeView>
    );
  };
  
  export default OfferforOnlineStore;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      // backgroundColor: '#fff',
      paddingHorizontal: 20,
      marginTop: normalize(10),
    },
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: normalize(16),
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      marginHorizontal: normalize(1),
    },
    icon: {
      width: normalize(15),
      height: normalize(15),
      marginRight: 10,
    },
    itemText: {
      fontSize: normalize(15),
      color: '#333',
    },
  });
  