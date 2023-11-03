import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import React from 'react';
import SafeView from '../../components/SafeView';
import TextInputItem from '../../components/TextInputItem';
import {Colors} from '../../themes/Colors';
import CommonLinearGradient from '../../components/CommonLinearGradient';
import {TouchableOpacity} from '@gorhom/bottom-sheet';

const BluetoothPrinter = () => {
  return (
    <SafeView>
      <CommonLinearGradient heading={'Connect Bluetooth Printer'} />
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
            <TextInputItem
              viewbordercolor="red"
              placeholder={'Search'}
              width={'100%'}
              height={normalize(50)}
              borderWidth={1}
              borderRadius={10}
              marginTop={normalize(10)}
              value={''}
              //   onChangeText={val => setSearch(val)}
              textColor={Colors.placeholder}
              placeholderTextColor={Colors.placeholder}
              isRightIconVisible={false}
              fontSize={13}
              fontFamily="Poppins-Medium"
            />
             <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text>
                Don't see your blutooth device here?<Text style={{color:'blue'}}>Open blutooth settings</Text></Text>
              </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeView>
  );
};

export default BluetoothPrinter;

const styles = StyleSheet.create({});
