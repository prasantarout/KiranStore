import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Colors } from '../../themes/Colors';
import normalize from '../../utils/helpers/dimen';
import { Dropdown } from 'react-native-element-dropdown';
import MyStatusBar from '../../utils/helpers/MyStatusBar';
import { Fonts } from '../../themes/ImagePath';

const Language = (props) => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const languageOptions = [
    { label: 'English', value: 'english' },
    { label: 'Hindi', value: 'hindi' },
    { label: 'Telugu', value: 'telugu' },
    { label: 'Marathi', value: 'marathi' },
  ];

  const handleLanguageSelect = (value) => {
    setSelectedLanguage(value);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <MyStatusBar backgroundColor={Colors.darkblue} barStyle="light-content" />

      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: '50%',
        }}>
        <Text
          style={{
            fontFamily: Fonts.Poppins_Bold,
            fontWeight: '400',
            fontSize: normalize(15),
            color: Colors.white,
            textAlign: 'center',
          }}>
          Select Your Language
        </Text>
      </View>
    <View style={{marginHorizontal:normalize(30),marginBottom:normalize(41)}}>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={languageOptions}
        // search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select Language' : '...'}
        // searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
        }}
      />
    </View>
      <View style={{ justifyContent: 'center', alignItems: 'center',flex:1 }}>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.white,
            width: normalize(120),
            height: normalize(40),
            borderRadius: 50,
            justifyContent: 'center', // Center the content vertically
            alignItems: 'center', // Center the content horizontally
          }}
          onPress={() => props?.navigation.navigate('BottomNav')}>
          <Text
            style={{
              fontSize: normalize(15),
              fontWeight: '600',
              color: Colors.black,
            }}>
            NEXT
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Language;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.darkblue,
    height: '100%',
  },
  dropdown: {
    height: 50,
    borderColor:Colors.white,
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom:normalize(30)
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color:Colors.white,
  },
  selectedTextStyle: {
    fontSize: 16,
    color:Colors.white
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
