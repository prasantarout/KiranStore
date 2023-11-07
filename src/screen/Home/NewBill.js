import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import SafeView from '../../components/SafeView';
import CommonLinearGradient from '../../components/CommonLinearGradient';
import normalize from '../../utils/helpers/dimen';
import {Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../themes/Colors';
import {Fonts, Icons} from '../../themes/ImagePath';
import {TouchableOpacity} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
const {height, width} = Dimensions.get('screen');
const NewBill = props => {
  const [type, setType] = useState('retail');
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState(null);
  const typeArr = [
    {
      title: 'Retail',
      value: 'retail',
    },
    {
      title: 'Wholesale',
      value: 'wholesale',
    },
  ];
  const languageOptions = [
    {value: 'cash', label: 'Cash'},
    {value: 'card', label: 'Card'},
    {value: 'not_paid', label: 'Not Paid'},
    {value: 'upi', label: 'UPI'},
    {value: 'delivery', label: 'Delivery'},
  ];
  return (
    <SafeView backgroundColor={Colors.white}>
      <View
        style={{
          height: normalize(36),
          width: width,
          flexDirection: 'row',
          borderBottomColor: '#001840',
          borderBottomWidth: normalize(2),
          alignItems: 'flex-end',
        }}>
        <View style={{flex: 1}}>
          <View
            style={{
              height: '98%',
              width: normalize(70),
              backgroundColor: '#102A70',
              borderTopRightRadius: normalize(8),
              borderTopLeftRadius: normalize(8),
              paddingHorizontal: normalize(4),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: Colors.white,
                marginRight: normalize(8),
                fontSize: normalize(11),
                fontFamily: Fonts.Poppins_Medium,
                lineHeight: normalize(18),
              }}>
              Bill 1
            </Text>
            <Image
              source={Icons.item1}
              style={{
                height: normalize(7),
                width: normalize(7),
                tintColor: Colors.white,
              }}
            />
          </View>
        </View>
        <TouchableOpacity
          style={{
            height: '98%',
            width: normalize(33),
            backgroundColor: '#102A70',
            borderTopRightRadius: normalize(5),
            borderTopLeftRadius: normalize(5),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={Icons.plus}
            style={{
              height: normalize(15),
              width: normalize(15),
              tintColor: Colors.white,
            }}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: normalize(80),
          width: width,
          flexDirection: 'row',
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
          }}>
          <View
            style={{
              height: '100%',
              width: normalize(28),
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}>
            <TouchableOpacity
              onPress={() => props.navigation.goBack()}
              style={{}}>
              <Image
                source={Icons.back}
                style={{
                  height: normalize(18),
                  width: normalize(18),
                  tintColor: '#001840',
                }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'space-around',
              paddingVertical: normalize(3),
            }}>
            <Text
              style={{
                color: '#34c85a',
                fontSize: normalize(14),
                fontFamily: Fonts.Poppins_SemiBold,
                lineHeight: normalize(15),
              }}>
              +Add Custom
            </Text> 
            <Dropdown
              data={languageOptions}
              value={value}
              style={[styles.dropdown, isFocus && {borderColor: '#001840'}]}
              placeholderStyle={styles.placeholderStyle} 
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={[styles.iconStyle, isFocus && {tintColor: '#001840'}]}
              labelField="label"
              valueField="value"
              placeholder={'Select'}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => { 
                setValue(item.value);
              }}
            />
            <View
              style={{
                height: normalize(23),
                width: '90%',
                borderRadius: normalize(15),
                borderColor: '#001840',
                borderWidth: normalize(1.5),
                flexDirection: 'row',
                overflow: 'hidden',
              }}>
              {typeArr.map((item, index) => {
                return (
                  <Pressable
                    onPress={() => {
                      setType(item.value);
                    }}
                    key={index}
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor:
                        type == item.value ? '#001840' : Colors.white,
                    }}>
                    <Text
                      style={{
                        fontSize: normalize(11),
                        fontFamily: Fonts.Poppins_Medium,
                        color: type == item.value ? Colors.white : '#001840',
                      }}>
                      {item.title}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 0.8,
          }}>
          <LinearGradient
            colors={['#001840', '#102A70']}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: normalize(12),
                fontFamily: Fonts.Poppins_Medium,
              }}>
              Total ($)
            </Text>
            <Text
              style={{
                color: 'white',
                fontSize: normalize(18),
                lineHeight: normalize(20),
                fontFamily: Fonts.Poppins_SemiBold,
              }}>
              0.00
            </Text>
            <Text
              style={{
                color: 'white',

                fontSize: normalize(10),
                fontFamily: Fonts.Poppins_Medium,
                // lineHeight: normalize(14),
              }}>
              +Tap to discount
            </Text>
          </LinearGradient>
        </View>
      </View>

      <View style={{flex: 1}}>
        <View
          style={{
            height: normalize(60),
            width: width,
            position: 'absolute',
            bottom: normalize(5),
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              height: normalize(40),
              width: normalize(100),
              backgroundColor: '#897459',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: normalize(20),
              borderRadius: normalize(5),
            }}>
            <Text
              style={{
                color: Colors.white,
                fontSize: normalize(13),
                lineHeight: normalize(15),
                fontFamily: Fonts.Poppins_Medium,
              }}>
              Quick add
            </Text>
          </View>
          <View
            style={{
              height: normalize(40),
              width: normalize(150),
              backgroundColor: '#34c85a',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: normalize(5),
              flexDirection: 'row',
              overflow: 'hidden',
            }}>
            <View style={{flex: 1, paddingLeft: normalize(10)}}>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: normalize(11),
                  fontFamily: Fonts.Poppins_Medium,
                }}>
                Total (0)
              </Text>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: normalize(12),
                  lineHeight: normalize(15),
                  fontFamily: Fonts.Poppins_Medium,
                }}>
                Create bill
              </Text>
            </View>
            <View
              style={{
                height: '100%',
                width: '20%',
                justifyContent: 'flex-end',
                paddingVertical: normalize(5),
              }}>
              <Image
                source={Icons.item2}
                style={{
                  height: normalize(15),
                  width: normalize(15),
                  tintColor: Colors.white,
                }}
              />
            </View>
          </View>
        </View>
      </View>

      <LinearGradient
        colors={['#001840', '#102A70']}
        style={{
          height: normalize(70),
          width: width,
          backgroundColor: 'pink',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            height: '60%',
            width: '90%',
            backgroundColor: 'white',
            borderRadius: normalize(8),
            flexDirection: 'row',
            overflow: 'hidden',
            alignItems: 'center',
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              paddingLeft: normalize(20),
            }}>
            <Text
              style={{
                fontSize: normalize(12),
                lineHeight: normalize(15),
                fontFamily: Fonts.Poppins_Medium,
                color: '#102A70',
              }}>
              Search Name
            </Text>
          </View>
          <View
            style={{
              height: '70%',
              width: 1.5,
              backgroundColor: '#102A70',
            }}></View>
          <View
            style={{
              flex: 0.5,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}>
            <Text
              style={{
                fontSize: normalize(11),
                lineHeight: normalize(13),
                fontFamily: Fonts.Poppins_Medium,
                color: '#102A70',
              }}>
              Scan
            </Text>
            <Image
              source={Icons.qr}
              style={{height: normalize(20), width: normalize(20)}}
            />
          </View>
        </View>
      </LinearGradient>
    </SafeView>
  );
};

export default NewBill;
const styles = StyleSheet.create({
  dropdown: {
    height: normalize(25),
    width: '90%',
    borderRadius: normalize(8),
    borderColor: Colors.backgroundMedium,
    borderWidth: normalize(1),   
    paddingHorizontal: normalize(10), 
backgroundColor: Colors.white
  },  
  placeholderStyle: {
    fontSize: normalize(12),
    fontFamily: Fonts.Poppins_Medium, 
    color: Colors.placeholder,
  }, 
  selectedTextStyle: {
    fontSize: normalize(12),
    fontFamily: Fonts.Poppins_Medium, 
    color: '#001840',
  }, 
  iconStyle: {
    width: 20,
    height: 20,
  },
});
