import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import React from 'react';
import MyStatusBar from '../../utils/helpers/MyStatusBar';
import {Colors} from '../../themes/Colors';
import normalize from '../../utils/helpers/dimen';
import {Icons} from '../../themes/ImagePath';
import { useDispatch } from 'react-redux';
import { clearBarcodeDetailsRequest, clearProductDetailsRequest } from '../../redux/reducer/ProductReducer';
const Home = (props) => {
  const dispatch=useDispatch()

  let item = [
    {
      id: 1,
      icon: Icons.rupee,
      title: 'Refer and earn',
    },
    {
      id: 2,
      icon: Icons.refresh,
    },
    {
      id: 3,
      icon: Icons.bell,
    },
    {
      id: 4,
      icon: Icons.accounting,
    },
  ];

  const itemTest = [
    {
      id: 1,
      icon: Icons.stock,
      title: 'My\nstock',
    },
    {
      id: 2,
      icon: Icons.supplier,
      title: 'My\nsuppliers',
    },
    {
      id: 3,
      icon: Icons.customers,
      title: 'My\ncustomers',
    },
    {
      id: 4,
      icon: Icons.order,
      title: 'My\norders',
    },
  ];
  

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={{
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: normalize(5),
        marginTop: normalize(20),
        borderRadius: 10,
        // padding: normalize(10),
        width:normalize(55),
        height: normalize(85),
      }}
     onPress={()=>{
      if(item.id===1){
        props.navigation.navigate('TabStack1',{flag:1})
      }else if(item.id===2){
        props.navigation.navigate('MySuppliers')
      }else if(item.id===3){
        props.navigation.navigate('MyCustomers')
      }else if(item.id===4){
        props.navigation.navigate('MyOrders')
      }
     }}
  
      >
      <Image
        source={item.icon}
        style={{height: normalize(30), width: normalize(30)}}
      />
      <Text
        style={{
          color: Colors.black2,
          fontSize: normalize(12),
          
          textAlign: 'center',
          marginTop: normalize(5),
          
        }}
        
        >
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={{flex: 1}}>
      <MyStatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <View style={styles?.backgroundImageContainer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: normalize(20),
            marginTop: Platform.OS === 'android' ? normalize(50) : 0,
          }}>
          <View></View>
          <View>
            <FlatList
              data={item}
              horizontal
              contentContainerStyle={styles.iconListContainer}
              renderItem={({item}) => (
                <TouchableOpacity
                  key={item.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderRadius: 30,
                    borderWidth: item?.id === 1 ? 1 : null,
                    borderColor: item?.id === 1 ? Colors.placeholder : null,
                  }}
                  onPress={()=>{
                    if(item.id===3){
                      props.navigation.navigate('Notification');
                    }else if(item.id===4){
                      props.navigation.navigate('SelfLedger');
                    }else if(item.id===1){
                      props.navigation.navigate('Refer');
                    }
                  }}
                  >
                  <Image source={item.icon} style={styles.icon} />
                  <Text
                    style={{
                      marginRight: item?.id === 1 ? normalize(10) : null,
                    }}>
                    {item?.title}
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id.toString()}
            />
          </View>
        </View>
        <ScrollView
          contentContainerStyle={{flexGrow: 1, paddingBottom: '50%'}}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              backgroundColor: Colors.red,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: normalize(20),
              marginTop: normalize(20),
              borderRadius: 10,
              padding: normalize(4),
              paddingHorizontal: normalize(10),
            }}>
            <Text
              style={{
                color: Colors.white,
                fontSize: normalize(12),
                fontWeight: 'bold',
              }}>
              Trial Expiring Tomorrow
            </Text>
            <TouchableOpacity
              style={{
                borderRadius: normalize(6),
                backgroundColor: Colors.white,
                padding: normalize(10),
              }}>
              <Text
                style={{
                  color: Colors.black,
                  fontSize: normalize(12),
                  fontWeight: 'bold',
                }}>
                Upgrade Now
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: Colors.darkblue,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: normalize(20),
              marginTop: normalize(20),
              borderRadius: 20,
              padding: normalize(18),
              paddingHorizontal: normalize(10),
            }}>
            <View style={{flexDirection: 'column', paddingHorizontal: 10}}>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: normalize(25),
                  fontWeight: 'bold',
                }}>
                New Bill
              </Text>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: normalize(15),
                  fontWeight: 'bold',
                  marginTop: normalize(10),
                }}>
                Create Bill
              </Text>
              <TouchableOpacity
                style={{
                  borderRadius: normalize(5),
                  borderWidth: 1,
                  width: normalize(25),
                  borderColor: Colors.white,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: normalize(10),
                }} 
                onPress={()=>props.navigation.navigate('NewBill')}
                >
                <Image
                  source={Icons.right}
                  style={{height: normalize(15), width: normalize(15)}}
                  tintColor={Colors.white}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                borderRadius: normalize(50),
                backgroundColor: Colors.white,
                height: normalize(100),
                width: normalize(100),
                // backgroundColor: 'red',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: normalize(6),
              }}>
              <Image
                source={Icons.trolley}
                style={{height: normalize(80), width: normalize(80)}}
                // tintColor={Colors.white}
              />
            </View>
          </View>
          <View style={{flexDirection:'row'}}>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.background,
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: normalize(20),
              marginTop: normalize(20),
              borderRadius: 10,
              padding: normalize(14),
              // paddingHorizontal: normalize(10),
              width:'40%',
              borderWidth: 1,
            }}
            onPress={()=>{
              dispatch(clearBarcodeDetailsRequest({}));
              props.navigation.navigate('AddPRoductToMyShop')}}
            >
            <Text
              style={{
                color: Colors.black2,
                fontSize: normalize(14),
                fontWeight: 'bold',
              }}>
              Add Products
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.background,
              justifyContent: 'center',
              alignItems: 'center',
              // marginHorizontal: normalize(20),
              marginTop: normalize(20),
              borderRadius: 10,
              padding: normalize(14),
              width:'40%',
              // paddingHorizontal: normalize(10),
              borderWidth: 1,
            }}
            onPress={() => {
              dispatch(clearProductDetailsRequest([]));
              props.navigation.navigate('Purchase', {purchaseFlag: 15145});
            }}
            >
            <Text
              style={{
                color: Colors.black2,
                fontSize: normalize(14),
                fontWeight: 'bold',
              }}>
              Purchase
            </Text>
          </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.background,
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              marginHorizontal: normalize(20),
              marginTop: normalize(20),
              borderRadius: 10,
              padding: normalize(14),
              paddingHorizontal: normalize(10),
              borderWidth: 1,
            }}
            onPress={()=>props.navigation.navigate('OnlineShop')}
            >
            <View
              style={{
                flexDirection: 'column',
                marginHorizontal: normalize(10),
              }}>
              <Text
                style={{
                  color: Colors.black2,
                  fontSize: normalize(15),
                  // fontWeight: '100',
                }}>
                Set-up your
              </Text>
              <Text
                style={{
                  color: Colors.textlightgrey,
                  fontSize: normalize(24),
                  fontWeight: '500',
                  marginTop: normalize(8),
                }}>
                Online Store
              </Text>
            </View>
            <Image
              source={Icons.food}
              style={{
                height: normalize(60),
                width: normalize(60),
                marginRight: normalize(10),
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.background,
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: normalize(20),
              marginTop: normalize(20),
              borderRadius: 10,
              // padding: normalize(5),
              paddingHorizontal: normalize(10),
            }}>
            <FlatList
              data={itemTest}
              renderItem={renderItem}
              keyExtractor={item => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{marginBottom: normalize(20)}}
            />
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  backgroundImageContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    backgroundColor: Colors.white,
  },
  iconListContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end', // Align icons to the flex-end
  },
  icon: {
    height: normalize(20), // Adjust the size as needed
    width: normalize(20), // Adjust the size as needed
    margin: normalize(8), // Add margin for spacing between icons
  },
});
