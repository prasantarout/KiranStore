import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Dimensions,
  FlatList,
  SafeAreaView
  
} from 'react-native';
import React,{useState} from 'react';
import SafeView from '../../components/SafeView';
import CommonLinearGradient from '../../components/CommonLinearGradient';
import normalize from '../../utils/helpers/dimen';
import {Fonts, Icons} from '../../themes/ImagePath';
import {Colors} from '../../themes/Colors';
import Modal from 'react-native-modal';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

const {width} = Dimensions.get('window');
const More = props => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible1, setModalVisible1] = useState(false);
 
  // const toggleModal = () => {
  //   setModalVisible(!isModalVisible);
  // };

  const toggleModal1 = () => {
    setModalVisible1(!isModalVisible1);
  };
  const data = [
    {id: 1, title: 'Account', hasBadge: false},
    {id: 2, title: 'Marketing Tools', hasBadge:false},
    {id: 3, title: 'Printer and Invoice Setting', hasBadge: false},
    {id: 4, title: 'Become a Partner and Earn Money', hasBadge:false},
    {id: 5, title: 'Add Staff', hasBadge: true},
    {id: 6, title: 'Search Product', hasBadge: false},
    {id: 7, title: 'Customer Loyalty', hasBadge: true},
    {id: 8, title: 'Barcode Setting', hasBadge: false},
    {id: 9, title: 'Tutorials', hasBadge: false},
    {id: 10, title: 'Add Multiple Shop', hasBadge: true},
    {id: 11, title: 'Expenses', hasBadge:true},
    {id: 12, title: 'Material', hasBadge: false},
  ];

  const items = [
    {text: 'Make Multiple Shops', backgroundColor: 'red'},
    {text: 'Customer Loyalty Feature', backgroundColor: 'blue'},
    {text: 'Expense Management', backgroundColor: 'green'},
    {text: 'Batch Management', backgroundColor: 'green'},
    {text: 'Add staff and Store Manager', backgroundColor: 'green'},
    // Add more items as needed
  ];

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          if (item?.id === 1) {
            props.navigation.navigate('AccountDetails');
          } else if (item.id === 2) {
            props.navigation.navigate('MarketingTools');
          } else if (item.id === 3) {
            props.navigation.navigate('InvoiceSetting');
          } else if (item.id === 4) {
            props.navigation.navigate('PartnerDetails');
          } else if (item.id === 5) {
            toggleModal1()
          } else if (item.id === 6) {
            props.navigation.navigate('SearchProduct');
          } else if (item.id === 7) {
            toggleModal1()
          } else if (item.id === 8) {
            setModalVisible(true)
          } else if (item.id === 9) {
            props.navigation.navigate('Tutorials');
          } else if (item.id === 10) {
            props.navigation.navigate('MultipleShop');
          } else if (item.id === 11) {
            toggleModal1();
          } else if (item.id === 12) {
            props.navigation.navigate('Material');
          }
        }}>
        <Text style={{fontSize: normalize(12), color: Colors.black2}}>
          {item.title}
        </Text>
        <Image
          source={Icons.skip}
          style={{height: normalize(12), width: normalize(12)}}
        />
        {item.hasBadge && <Text style={styles.badge}>New</Text>}
      </TouchableOpacity>
    );
  };

  return (
    <SafeView backgroundColor={Colors.white}>
      <CommonLinearGradient heading={'More'} flag={1} back={false} zindex={1} />
      <KeyboardAvoidingView
        // style={{ flex: 1 }}
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        enabled>
        <ScrollView
          contentContainerStyle={{flexGrow: 1, paddingBottom: '50%'}}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              backgroundColor: Colors.lightdark_White2,
              marginHorizontal: normalize(10),
              paddingVertical: 20,
              marginTop: normalize(10),
              borderRadius: 10,
            }}>
            <View style={styles.container}>
              {/* Profile Picture */}
              <View style={styles.profilePictureContainer}>
                <Image source={Icons.user} style={styles.profilePicture} />
              </View>

              {/* Details */}
              <View style={styles.detailsContainer}>
                <Text style={styles.name}>+91-6370555963</Text>
                <Text style={styles.email}>admin</Text>
                <Text style={styles.email}>subscription expiry today</Text>
                <Text style={styles.email}>Trial expiry today</Text>
              </View>

              {/* Edit Options */}
              <View style={styles.editOptionsContainer}>
                <TouchableOpacity style={styles.editButton} 
                onPress={()=>props.navigation.navigate('ShopDetails')}
                >
                  <Text style={styles.editButtonText}>EDIT</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: Colors.green,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 20,
                padding: normalize(10),
                marginHorizontal: normalize(20),
                borderRadius: normalize(5),
                marginTop: normalize(10),
              }}>
              <Text style={{fontSize: normalize(14), color: Colors.white}}>
                Buy Subscription Now
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              numColumns={2}
              contentContainerStyle={{padding: normalize(10)}}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <Modal
        animationType="pop"
        transparent={true}
        visible={isModalVisible}
        backdropColor='rgba(0, 0, 0, 0.5)'
        backdropOpacity={0.9}
        onBackdropPress={() => setModalVisible(false)}
        >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={{marginHorizontal:normalize(20),marginTop:normalize(20)}}>
            <Text
              style={{
                fontSize: normalize(16),
                fontWeight: '700',
                fontFamily: Fonts.Poppins_Black,
                bottom:normalize(30),
                color:Colors.black
              }}>
              Barcode Setting
            </Text>
            <Text
              style={{
                fontSize: normalize(12),
                fontFamily: Fonts.Poppins_Black,
                bottom:normalize(20)
              }}>
              Please visit bhanumart web app to use barcode settings.
            </Text>
            <Text style={{bottom:normalize(20)}}>Click on Link below-</Text>
            </View>
            <TouchableOpacity
              style={{
                paddingHorizontal: normalize(20),
                paddingVertical: normalize(18),
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: Colors.placeholder,
                marginHorizontal: normalize(20),
                borderRadius: 10,
              }}>
              <Text
                style={{color: Colors.blue, }}>https://bhanumart.com/shop</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={{
                padding: normalize(10),
                backgroundColor: Colors.darkblue,
                alignSelf: 'flex-end',
                marginHorizontal:normalize(20),
                borderRadius:10,
                paddingHorizontal: normalize(20),
                marginTop:normalize(20)
              }} 
              onPress={() => {setModalVisible(false)}}
              >
              <Text style={{fontSize: normalize(10), color: Colors.white}}>
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
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

export default More;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Horizontal layout
    justifyContent: 'space-between', // Distribute content evenly
    alignItems: 'center', // Vertically center items
    // paddingVertical: 20,
  },
  profilePictureContainer: {
    borderRadius: 100, // Make it a circle
    overflow: 'hidden',
    borderWidth: 5,
    borderColor: Colors.white, // Add a border to the profile picture
    marginHorizontal: normalize(10),
  },
  profilePicture: {
    width: normalize(80),
    height: normalize(80),
  },
  item: {
    flex: 1, // Equal width for columns
    margin: 5, // Add margin between items
    padding: 10,
    // borderWidth: 1,
    // borderColor: 'gray',
    borderRadius: 5,
    backgroundColor: Colors.lightdark_White,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // justifyContent:'space-around',
    height: normalize(50),
    ...Platform.select({
      ios: {
        // iOS box shadow
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.1,
        shadowRadius: 0.5,
      },
      android: {
        // Android elevation
        elevation: 1,
      },
    }),
  },
  detailsContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: normalize(15),
  },
  name: {
    fontSize: normalize(14),
    fontWeight: '600',
  },
  email: {
    fontSize: normalize(11),
    color: 'gray',
  },
  editOptionsContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-around',
    alignItems: 'center',
    width: normalize(80),
    // flex: 1, // Allow the edit options to take available space
  },
  editButton: {
    flex: 1, // Equal width for both buttons
    paddingVertical: 5,
    // paddingHorizontal:5,
    borderWidth: 1,
    // padding:5,
    borderColor: 'blue', // Customize the border color
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: normalize(20),
    bottom: normalize(35),
  },
  editButtonText: {
    fontSize: 16,
    color: 'blue', // Customize the text color
  },
  badge: {
    position: 'absolute',
    // bottom:5,
    top: -4,
    right: 1,
    width: 30,
    height: normalize(16),
    backgroundColor: Colors.blue, // Customize badge color
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    color: Colors.white,
    fontSize: normalize(8),
    textAlign: 'center',
    padding: normalize(3),
    fontWeight: '700',
  },
  modalContainer: {
    // flex: 1,
    justifyContent:'center',alignItems: 'center',
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    width: normalize(250),
    height:normalize(250),
    justifyContent: 'center',
   elevation:20, 
   
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
});
