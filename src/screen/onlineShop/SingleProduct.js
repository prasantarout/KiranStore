import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import SafeView from '../../components/SafeView';
import CommonLinearGradient from '../../components/CommonLinearGradient';
import normalize from '../../utils/helpers/dimen';
import {Colors} from '../../themes/Colors';
const SingleProduct = (props) => {
  return (
    <SafeView>
      <CommonLinearGradient heading={'Single Product'} />
      <KeyboardAvoidingView
        // style={{ flex: 1 }}
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        enabled>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          <View
            style={{marginHorizontal: normalize(20), marginTop: normalize(20)}}>
            <TouchableOpacity
              style={{
                paddingHorizontal: normalize(10),
                paddingVertical: normalize(15),
                backgroundColor: Colors.background,
                borderWidth: 1,
                borderRadius: normalize(10),
              }} 
              onPress={()=> props.navigation.navigate('Search')}
              >
              <Text style={{fontSize: normalize(12), fontWeight: '600'}}>
                Select Product to create offer
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeView>
  );
};

export default SingleProduct;

const styles = StyleSheet.create({});
