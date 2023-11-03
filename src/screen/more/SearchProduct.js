import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React from 'react';
import SafeView from '../../components/SafeView';
import CommonLinearGradient from '../../components/CommonLinearGradient';
import {Colors} from '../../themes/Colors';
import normalize from '../../utils/helpers/dimen';
const SearchProduct = () => {
  return (
    <SafeView>
      <CommonLinearGradient heading={'Price Search'} />
      <KeyboardAvoidingView
        // style={{ flex: 1 }}
        style={{flex: 1}}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1, paddingBottom: '5%'}}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 20,
            }}>
            <TouchableOpacity style={styles.inputContainer}>
              <TextInput placeholder="All rpoducts" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: normalize(10),
                backgroundColor: Colors.darkblue,
                paddingHorizontal: normalize(40),
                marginTop: normalize(20),
                borderRadius: normalize(10),
              }}>
              <Text style={{color:Colors.white,fontSize:normalize(14)}}>Search</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeView>
  );
};

export default SearchProduct;

const styles = StyleSheet.create({
  inputContainer: {
    borderBottomWidth: 1,
    // borderRadius: 8,
    padding: 8,
    zIndex: 0,
    backgroundColor: Colors.backGround,
    width: '100%',
  },
});
