import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Fonts, Icons } from '../themes/ImagePath';
import { Colors } from '../themes/Colors';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../utils/helpers/dimen1';
import { useNavigation } from '@react-navigation/native';
import { normalizeUnits } from 'moment';

export default function CommonLinearGradient({
  heading,
  children,
  back,
  zindex,
  flag,
  title,
  onPress
}) {
  const navigation = useNavigation();
  console.log(flag, 'Fsfm;lfml');

  return (
    <LinearGradient
      colors={['#001840', '#102A70']}
      style={[
        styles.container,
        {
          zIndex: zindex,
          overflow: 'hidden',
          borderBottomRightRadius: flag !== 10 ? 30 : 0,
          borderBottomLeftRadius: flag != 10 ? 30 : 0,
        },
      ]}>
      <View style={styles.viewStyle}>
        <View style={styles.viewStyle1}>
          {flag !== 1 && !back && (
            <TouchableOpacity
              style={[
                styles.buttonStyle1,
                { marginLeft: flag !== 1 ? verticalScale(20) : 0 },
              ]}
              onPress={() => navigation.goBack()}>
              <Image source={Icons.back} style={[styles.buttonImg1]} />
            </TouchableOpacity>
          )}
          <Text
            style={{
              color: Colors.white,
              marginLeft: flag !== 1 ? verticalScale(20) : verticalScale(20),
              fontSize: 16,
              fontFamily: 'Poppins-SemiBold',
              fontWeight: 'bold',
            }}>
            {heading}
          </Text>
        </View>
        <View style={styles.viewStyle2}>{children}</View>
        {flag === 16 && (
          <TouchableOpacity
            style={[styles.titleContainer,{marginRight: verticalScale(20)}]}
            onPress={onPress}
          >
            <Text
              style={{
                color: Colors.black,
                fontSize: 16,
                fontFamily: 'Poppins-SemiBold',
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              {title}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    height: horizontalScale(100),
    width: '100%',
  },
  viewStyle: {
    flexDirection: 'row',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewStyle1: {
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
  },
  viewStyle2: {
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  titleContainer: {
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius:20,
  },
  buttonStyle1: {
    height: moderateScale(25),
    width: moderateScale(25),
    backgroundColor: Colors.blue,
    borderRadius: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  buttonImg1: {
    height: verticalScale(18),
    width: horizontalScale(18),
    resizeMode: 'contain',
    tintColor: Colors.white,
  },
  buttonStyle: {
    height: verticalScale(40),
    width: horizontalScale(40),
    backgroundColor: Colors.buttonColor,
    borderRadius: horizontalScale(40) + verticalScale(40) / 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  buttonImg: {
    height: verticalScale(15),
    width: horizontalScale(15),
    resizeMode: 'contain',
    tintColor: Colors.primaryColor,
  },
});
