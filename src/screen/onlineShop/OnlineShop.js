import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  TextInput
} from 'react-native';
import React, {useState} from 'react';
import MyStatusBar from '../../utils/helpers/MyStatusBar';
import {Colors} from '../../themes/Colors';
import SafeView from '../../components/SafeView';
import CommonLinearGradient from '../../components/CommonLinearGradient';
import normalize from '../../utils/helpers/dimen';
import {Icons} from '../../themes/ImagePath';
import { useNavigation } from '@react-navigation/native';
// import {TextInput} from 'react-native-gesture-handler';
const OnlineShop = () => {
  const [onlineStoreChecked, setOnlineStoreChecked] = useState(false);
  const [showOutOfStockChecked, setShowOutOfStockChecked] = useState(false);

  const navigation=useNavigation();
  const handleOnlineStoreToggle = () => {
    setOnlineStoreChecked(!onlineStoreChecked);
  };

  const handleShowOutOfStockToggle = () => {
    setShowOutOfStockChecked(!showOutOfStockChecked);
  };
  return (
    <SafeView backgroundColor={Colors.white}>
      <CommonLinearGradient heading={'Online Shop'} flag={1} back={false} zindex={1}/>
      <KeyboardAvoidingView
        // style={{ flex: 1 }}
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        enabled>
        <ScrollView
          contentContainerStyle={{flexGrow: 1, paddingBottom: '50%'}}
          showsVerticalScrollIndicator={false}>
          <View style={{flex: 1}}>
            <View style={styles.toggleContainer}>
              <View style={styles.toggleRow}>
                <View style={styles.toggleColumn}>
                  <Text style={styles.toggleLabel}>Online Store</Text>
                </View>
                <TouchableOpacity
                  style={[
                    styles.toggleSwitch,
                    onlineStoreChecked && styles.toggleSwitchActive,
                  ]}
                  onPress={handleOnlineStoreToggle}>
                  <View
                    style={[
                      styles.roundButton,
                      onlineStoreChecked && styles.roundButtonActive,
                    ]}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: Colors.backGround,
                  marginTop: normalize(2),
                }}
              />
              <View style={styles.toggleRow}>
                <View style={styles.toggleColumn}>
                  <Text style={styles.toggleLabel}>
                    Show Out of Stock Products
                  </Text>
                </View>
                <TouchableOpacity
                  style={[
                    styles.toggleSwitch,
                    showOutOfStockChecked && styles.toggleSwitchActive,
                  ]}
                  onPress={handleShowOutOfStockToggle}>
                  <View
                    style={[
                      styles.roundButton,
                      showOutOfStockChecked && styles.roundButtonActive,
                    ]}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: Colors.backGround,
                  // marginTop: normalize(10),
                }}
              />
              {onlineStoreChecked && (
                <View style={styles.onlineStoreSettings}>
                  <Text style={styles.onlineStoreLabel}>Online Shop URL:</Text>
                  <View
                    style={{
                      backgroundColor: Colors.background,
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexDirection: 'row',
                      // marginHorizontal: normalize(20),
                      marginTop: normalize(10),
                      borderRadius: 10,
                      padding: normalize(14),
                      height: normalize(50),
                      width: '100%',
                      paddingHorizontal: normalize(10),
                      borderWidth: 1,
                    }}>
                    <Text style={{color: 'blue'}}>https://www.example.com</Text>
                    <View style={{flexDirection: 'row', margin: 5}}>
                      <TouchableOpacity style={{marginRight: normalize(10)}}>
                        <Image
                          source={Icons.copy}
                          style={{width: normalize(20), height: normalize(20)}}
                        />
                        <Text>Copy</Text>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Image
                          source={Icons.share}
                          style={{width: normalize(20), height: normalize(20)}}
                        />
                        <Text>Copy</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: Colors.background,
                      marginTop: normalize(12),
                    }}
                  />
                  <View style={{marginVertical: 20}}>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}
                      onPress={()=>navigation.navigate('OfferforOnlineStore')}
                      >
                      <Text style={styles.onlineStoreLabel}>
                        Create Offer for Online Store
                      </Text>
                      <Image
                        source={Icons.skip}
                        style={{height: 15, width: 15}}
                      />
                    </TouchableOpacity>
                    <View
                      style={{
                        borderBottomWidth: 1,
                        borderBottomColor: Colors.background,
                        marginTop: normalize(12),
                      }}
                    />
                    <TouchableOpacity
                      style={{
                        marginTop: normalize(15),
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }} 
                      onPress={()=>navigation.navigate('TabStack')}
                      >
                      <Text style={styles.onlineStoreLabel}>
                        Enable / Disable Products for Customers
                      </Text>
                      <Image
                        source={Icons.skip}
                        style={{height: 15, width: 15}}
                      />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: Colors.background,
                      marginTop: normalize(1),
                    }}
                  />
                  <View style={{marginTop: normalize(10)}}>
                    <Text style={styles.onlineStoreLabel}>
                      Note for customers
                    </Text>
                    <TextInput
                      style={{
                        padding: normalize(14),
                        height: normalize(60),
                        borderWidth: 1,
                        borderColor: Colors.placeholder,
                        marginTop: normalize(10),
                        borderRadius: 10,
                      }}
                      placeholder=""
                    />
                  </View>
                </View>
              )}
            </View>
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
                  height: normalize(40),
                  width: normalize(100),
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    fontSize: normalize(14),
                    fontWeight: '500',
                    color: Colors.white,
                  }}>
                  Update
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeView>
  );
};

export default OnlineShop;

const styles = StyleSheet.create({
  backgroundImageContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    backgroundColor: Colors.white,
  },
  toggleContainer: {
    flexDirection: 'column',
    width: 300, // Adjust the width as needed
    marginHorizontal: normalize(34), // Center the container horizontally
    marginTop: normalize(20),
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: normalize(10),
  },
  toggleColumn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleLabel: {
    marginRight: 10,
    fontSize: normalize(14),
  },
  toggleSwitch: {
    width: 50, // Adjust the width of the toggle buttons
    height: 25, // Adjust the height of the toggle buttons
    backgroundColor: '#ccc',
    borderRadius: 25, // Make it round
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    position: 'relative',
  },
  toggleSwitchActive: {
    backgroundColor: '#007bff', // Change the color when active
  },
  roundButton: {
    width: 20, // Adjust the width of the round button
    height: 20, // Adjust the height of the round button
    borderRadius: 10, // Make it round
    backgroundColor: '#fff',
    position: 'absolute',
    top: 2.5, // Adjust the position to center vertically
    left: 2.5, // Adjust the position to center horizontally
    transition: 'transform 0.3s ease',
  },
  roundButtonActive: {
    transform: [{translateX: 25}], // Move the button to the right when active
  },
  onlineStoreSettings: {
    marginTop: 10,
  },
  onlineStoreLabel: {
    fontWeight: 'bold',
  },
});
