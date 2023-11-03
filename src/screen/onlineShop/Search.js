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
import TextInputItem from '../../components/TextInputItem';
import { Colors } from '../../themes/Colors';

const Search = () => {

    const [Search,setSearch ]= React.useState('')

    return (
    <SafeView>
      <CommonLinearGradient heading={'Search by Name'} />
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
              value={Search}
              onChangeText={val => setSearch(val)}
              textColor={Colors.placeholder}
              placeholderTextColor={Colors.placeholder}
              isRightIconVisible={false}
              fontSize={13}
              fontFamily="Poppins-Medium"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeView>
  );
};

export default Search;

const styles = StyleSheet.create({});
