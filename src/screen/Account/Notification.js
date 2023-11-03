import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,Image
} from 'react-native';
import React from 'react';
import SafeView from '../../components/SafeView';
import CommonLinearGradient from '../../components/CommonLinearGradient';
import {horizontalScale, moderateScale, verticalScale} from '../../utils/helpers/dimen1';
import { Colors } from '../../themes/Colors';
import { Icons } from '../../themes/ImagePath';
const Notification = () => {
  const dummyNotifications = [
    {id: '1', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
    {
      id: '2',
      text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      id: '3',
      text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    },
    // Add more notifications with Lorem Ipsum text
  ];

  const renderNotificationItem = ({item}) => (
    <View style={[styles.notificationItem, styles.notificationItemMargin]}>
      <Text style={styles.notificationText}>{item.text}</Text>
    </View>
  );

  return (
    <SafeView>
      <CommonLinearGradient heading={'Notification'} />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: '50%'}}>
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              marginTop: verticalScale(30),
            }}>
            <View style={styles.container}>
              {dummyNotifications?.length > 0 ? (
                <FlatList
                  data={dummyNotifications}
                  showsVerticalScrollIndicator={false}
                  renderItem={({item}) => (
                    <View
                      key={item._id}
                      style={{
                        height: horizontalScale(100),
                        width: '100%',
                        // margin: normalize(5),
                        alignSelf: 'center',
                        alignItems: 'center',
                        borderRadius: 30,
                        backgroundColor:
                          item.marked_as_read === false
                            ? Colors.blue
                            : Colors.white,
                        flexDirection: 'row',
                        shadowOffset: {width: -2, height: 4},
                        shadowColor: Colors.lightGrey,
                        shadowOpacity: 0.9,
                        shadowRadius: 3,
                        paddingHorizontal: 20,
                        borderWidth:1,
                        marginVertical: moderateScale(10),
                      }}>
                      <TouchableOpacity style={{width: '15%'}}>
                        <Image
                          source={Icons.user}
                          style={{
                            height: horizontalScale(35),
                            width: horizontalScale(35),
                            borderRadius: horizontalScale(50),
                            resizeMode: 'contain',
                          }}
                        />
                      </TouchableOpacity>
                      <View
                        style={{
                          width: '84%',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            width: '100%',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              color: Colors.textcolor,
                              fontSize: 14,
                              fontFamily: 'Poppins-Medium',
                              width: verticalScale(250),
                            }}>
                            {item?.text}
                          </Text>
                          {/* <Text
                            style={{
                              color: Colors.textlightgrey,
                              fontSize: 10,
                              fontFamily: 'Poppins-Medium',
                            }}>
                            {moment(item?.createdAt).fromNow()}
                          </Text> */}
                        </View>

                        {/* <Text
                          style={{
                            color: Colors.black,
                            width: '100%',
                            fontSize: 12,
                            fontFamily: 'Poppins-Regular',
                            marginTop: verticalScale(5),
                          }}>
                          {item?.notification_message}
                        </Text> */}

                      
                      </View>
                    </View>
                  )}
                />
              ) : (
                <Text
                  style={{
                    color: Colors.lightGrey,
                    fontSize: 16,
                    fontFamily: 'Poppins-SemiBold',
                    textAlign: 'center',
                    marginTop: normalize(30),
                  }}>
                  No new notifications available!
                </Text>
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeView>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'white',
  },
  notificationItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 10,
    // margin:10
  },
  notificationText: {
    fontSize: 16,
    color: '#333',
  },
  notificationItemMargin: {
    marginBottom: 10, // Adjust the margin as needed
  },
});
