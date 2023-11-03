import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import SafeView from '../../components/SafeView';
import CommonLinearGradient from '../../components/CommonLinearGradient';
import {verticalScale} from '../../utils/helpers/dimen1';
import {Colors} from '../../themes/Colors';
import {Fonts, Icons} from '../../themes/ImagePath';
import Carousel, {Pagination} from 'react-native-snap-carousel';
const NewLaunch = props => {
  const [activeSlide, setActiveSlide] = React.useState(0);

  const carouselData = [
    {
      id: '1',
      title: 'Graminway Garlic Peanut Chutney Powder 200 g',
      icon: Icons.product,
      price: 'Rs 100',
    },
    {
      id: '2',
      title: 'Graminway Garlic Peanut Chutney Powder 200 g',
      icon: Icons.product,
      price: 'Rs 100',
    },
    {
      id: '3',
      title: 'Graminway Garlic Peanut Chutney Powder 200 g',
      icon: Icons.product,
      price: 'Rs 100',
    },
    {
      id: '4',
      title: 'Graminway Garlic Peanut Chutney Powder 200 g',
      icon: Icons.product,
      price: 'Rs 100',
    },
    {
      id: '5',
      title: 'Graminway Garlic Peanut Chutney Powder 200 g',
      icon: Icons.product,
      price: 'Rs 100',
    },
    {
      id: '6',
      title: 'Graminway Garlic Peanut Chutney Powder 200 g',
      icon: Icons.product,
      price: 'Rs 100',
    },
    // Add more carousel items here
  ];

  const renderItem = ({item}) => (
    <TouchableOpacity style={styles.carouselCard}>
      <Image
        source={item.icon}
        style={{height: normalize(80), width: normalize(80)}}
      />
      <View style={{marginTop: normalize(15)}}>
        <Text style={[styles.carouselCardText, {color: Colors.black}]}>
          {item.title}
        </Text>
        <Text style={styles.carouselCardText}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeView>
      <CommonLinearGradient heading={'New Launch'} />
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
            <TouchableOpacity
              style={{
                paddingHorizontal: normalize(10),
                paddingVertical: normalize(15),
                backgroundColor: Colors.backGround,
                borderWidth: 1,
                borderRadius: normalize(10),
              }}
              onPress={() => props.navigation.navigate('Search')}>
              <Text
                style={{
                  fontSize: normalize(16),
                  fontWeight: '600',
                  textAlign: 'center',
                }}>
                Change Product
              </Text>
            </TouchableOpacity>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: normalize(30),
              }}>
              <Text
                style={{
                  fontSize: normalize(18),
                  fontWeight: '200',
                  fontFamily: Fonts.Poppins_Bold,
                }}>
                Select Template
              </Text>
              <Carousel
                data={carouselData}
                renderItem={renderItem}
                sliderWidth={300} // Adjust the width as needed
                itemWidth={300} // Adjust the width as needed
                onSnapToItem={index => setActiveSlide(index)} // For pagination
              />
              <Pagination
                dotsLength={carouselData.length}
                activeDotIndex={activeSlide}
                containerStyle={{marginTop: normalize(-5)}}
                dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: 'blue', // Change the indicator color
                }}
                inactiveDotStyle={
                  {
                    // Customize inactive dot style if needed
                  }
                }
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
              />
            </View>
            <TouchableOpacity
              style={{
                paddingHorizontal: normalize(10),
                paddingVertical: normalize(12),
                backgroundColor: Colors.darkblue,
                borderWidth: 1,
                borderRadius: normalize(10),
              }}>
              <Text
                style={{
                  fontSize: normalize(16),
                  fontWeight: '600',
                  textAlign: 'center',
                  color: Colors.white,
                }}>
                Change Image
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View
          style={{
            height: normalize(120),
            backgroundColor: Colors.white,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            elevation: 5,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              marginTop: normalize(40),
            }}>
            <TouchableOpacity>
              <Image
                source={Icons.share}
                style={{height: normalize(20), width: normalize(20)}}
              />
              <Text style={{marginTop: normalize(10)}}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{justifyContent: 'center', alignItems: 'center'}}>
              <Image
                source={Icons.download}
                style={{height: normalize(20), width: normalize(20)}}
              />
              <Text style={{marginTop: normalize(10)}}>Downlod Image</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeView>
  );
};

export default NewLaunch;

const styles = StyleSheet.create({
  carouselCard: {
    width: normalize(240), // Adjust the width as needed
    height: normalize(250), // Adjust the height as needed
    backgroundColor: Colors.lightdark_White5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    marginTop: normalize(15),
  },
  carouselCardText: {
    fontSize: normalize(13),
    // fontWeight: '600',
    textAlign: 'justify',
    lineHeight: 20,
    maxWidth: normalize(200),
  },
});
