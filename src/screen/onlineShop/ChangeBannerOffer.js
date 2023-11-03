import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import React from 'react';
import SafeView from '../../components/SafeView';
import CommonLinearGradient from '../../components/CommonLinearGradient';
import {Icons} from '../../themes/ImagePath';
import normalize from '../../utils/helpers/dimen';
import {Colors} from '../../themes/Colors';
const ChangeBannerOffer = () => {
  return (
    <SafeView>
      <CommonLinearGradient heading={'Change Banner Offer'} />
      <KeyboardAvoidingView
        // style={{ flex: 1 }}
        style={{flex: 1}}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
        <ScrollView
         contentContainerStyle={{flexGrow: 1, paddingBottom: '5%'}}
          showsVerticalScrollIndicator={false}>
          <View style={{flex: 1}}>
            <View
              style={{
                backgroundColor: Colors.lightdark_White,

                elevation: 10,
                marginTop: normalize(20),
                marginHorizontal: normalize(20),
              }}>
              <Image
                source={Icons.baner}
                style={{height: normalize(150), width: normalize(280)}}
                resizeMode="contain"
              />
            </View>
            <View
              style={{
                // marginHorizontal: normalize(10),
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                marginTop: normalize(50),
              }}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                <Image
                  source={Icons.left}
                  style={{width: normalize(20), height: normalize(20)}}
                />
                <Text style={{fontSize: normalize(12), color: Colors.black}}>
                  Previous
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  padding: 10,
                  borderWidth: 1,
                  borderColor: Colors.placeholder,
                  paddingHorizontal: normalize(10),
                  // paddingVertical: normalize(10),
                  // marginHorizontal: normalize(90),
                  borderRadius: 10,
                }}>
                <Text style={{color: Colors.blue}}>Upload Banner Image</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: normalize(12), color: Colors.black}}>
                  Next
                </Text>
                <Image
                  source={Icons.right}
                  style={{
                    width: normalize(20),
                    height: normalize(20),
                    top: normalize(1),
                  }}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.container}>
              <View style={styles.inputGroup}>
                <View style={styles.labelContainer}>
                  <Text
                    style={{
                      fontSize: normalize(12),
                      color: Colors.detailsTextColor,
                    }}>
                    Enter heding
                  </Text>
                </View>
                <TouchableOpacity style={styles.inputContainer}>
                  <TextInput placeholder="up to 10% off per bill" />
                </TouchableOpacity>
              </View>
              <View style={styles.inputGroup}>
                <View style={styles.labelContainer}>
                  <Text
                    style={{
                      fontSize: normalize(12),
                      color: Colors.detailsTextColor,
                    }}>
                    Enter Sub Heding
                  </Text>
                </View>
                <TouchableOpacity style={styles.inputContainer}>
                  <TextInput placeholder="All rpoducts" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, {backgroundColor: Colors.black2}]}
                onPress={() => console.log('Cancel Pressed')}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, {backgroundColor: Colors.green}]}
                onPress={() => console.log('Create Catalogue Pressed')}>
                <Text style={styles.buttonText}>Create Banner</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeView>
  );
};

export default ChangeBannerOffer;

const styles = StyleSheet.create({
  profilePictureContainer: {
    borderRadius: 100, // Make it a circle
    overflow: 'hidden',
    // borderWidth: 5,
    borderColor: Colors.white, // Add a border to the profile picture
    marginHorizontal: normalize(10),
  },
  container: {
    marginHorizontal: normalize(15),
    marginTop: normalize(20),
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  inputGroup: {
    flex: 1,
    marginRight: normalize(10),
    marginVertical: normalize(20),
  },
  labelContainer: {
    backgroundColor: Colors.backgroundLight,
    alignSelf: 'flex-start',
    paddingHorizontal: 3,
    marginStart: 10,
    zIndex: 1,
    elevation: 1,
    shadowColor: 'white',
    position: 'absolute',
    top: normalize(-8),
  },
  inputContainer: {
    borderBottomWidth: 1,
    // borderRadius: 8,
    padding: 8,
    zIndex: 0,
    backgroundColor: Colors.backGround,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
    position: 'absolute',
    bottom: normalize(30),
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
