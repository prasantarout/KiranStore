import React, {useEffect, useState} from 'react';
import {Image, View, TouchableOpacity, Text} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import {Icons} from '../../themes/ImagePath';
import normalize from '../../utils/helpers/dimen';
import MyStatusBar from '../../utils/helpers/MyStatusBar';
import {Colors} from '../../themes/Colors';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {splashScreenRequest} from '../../redux/reducer/AuthReducer';

const Square = ({isLight, selected}) => {
  let backgroundColor;
  if (isLight) {
    backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';
  } else {
    backgroundColor = selected ? 'blue' : 'red';
  }
  return (
    <View
      style={{
        width: 6,
        height: 6,
        marginHorizontal: 2,
        backgroundColor,
      }}
    />
  );
};

const backgroundColor = isLight => (isLight ? '#fff' : 'lightblue');
const color = isLight => backgroundColor(!isLight);

const Done = ({isLight, ...props}) => {
  const navigation = useNavigation(); // Use useNavigation within the functional component

  return (
    <TouchableOpacity
      title={'Lets Start'}
      style={{
        backgroundColor: backgroundColor(isLight),
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginRight: normalize(25),
        borderRadius: 5,
      }}
      {...props}
      onPress={() => {
        navigation.navigate('Language');
      }}>
      <Text style={{color: Colors.black}}>Let's Get Start</Text>
    </TouchableOpacity>
  );
};

const Skip = ({isLight, skipLabel, ...props}) => {
  const navigation = useNavigation(); // Use useNavigation within the functional component

  return (
    <TouchableOpacity
      title={'Skip'}
      style={{
        backgroundColor: backgroundColor(isLight),
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginLeft: normalize(25),
        borderRadius: 5,
      }}
      {...props}
      onPress={() => {
        navigation.navigate('Language');
      }}>
      <Text style={{color: Colors.black}}>{skipLabel}</Text>
    </TouchableOpacity>
  );
};

const Next = ({isLight, ...props}) => (
  <TouchableOpacity
    title={'Next'}
    style={{
      backgroundColor: backgroundColor(isLight),
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginRight: normalize(25),
      borderRadius: 5,
    }}
    {...props}>
    <Text style={{color: Colors.black}}>Next</Text>
  </TouchableOpacity>
);

const NavigationScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // const
  const AuthReducer = useSelector(state => state.AuthReducer);
  console.log(AuthReducer.splashScreenRes, 'fjfhf');

  useEffect(() => {
    dispatch(splashScreenRequest());
    // GetItem();
  }, []);

  const [data, setData] = useState([]);
  // const GetItem = (item) => {
  //   let url="https://bhanumart.com/dev/new_api/banners";
  //   // const formData = new FormData();
  //   // formData.append("token",item);
  //   fetch(url, {
  //     method: "GET",
  //     // body: formData,
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if(data.response[0].status==="Valid"){
  //         console.log(data?.response[0].banners[0].image, "sadjk");
  //         setData(data?.response[0].banners)
  //       }
  //       // const question = data?.response[0]?.questions;
  //       // console.log(question[0], "response");
  //     })
  //     .catch((error) => console.log(error));

  // };
  console.log(data, 'data');
  return (
    <View style={{flex: 1}}>
      <MyStatusBar backgroundColor={Colors.white} barStyle="dark-content" />
      <Onboarding
        DotComponent={Square}
        NextButtonComponent={Next}
        SkipButtonComponent={Skip}
        DoneButtonComponent={Done}
        titleStyles={{color: 'blue'}}
        bottomBarColor={Colors.darkblue}
        pages={[
          {
            backgroundColor: '#fff',
            image: (
              <Image
                source={{uri: AuthReducer?.splashScreenRes[0]?.image}}
                style={{height: normalize(250), width: '100%'}}
                resizeMode="stretch"
              />
            ),
            title: 'Low Stock Management',
            subtitle: 'Kirana fast alerts you about low-stock items',
            titleStyles: {color: Colors.black2},
          },
          {
            backgroundColor: '#fff',
            image: (
              <Image
                source={{uri: AuthReducer?.splashScreenRes[1]?.image}}
                style={{height: normalize(250), width: '100%'}}
                resizeMode="stretch"
              />
            ),
            title: 'Early Invoice',
            subtitle:
              'Generating invoices is now a tap away. Share directly with customers via the app.',
            titleStyles: {color: Colors.black2},
          },
          {
            backgroundColor: '#fff',
            image: (
              <Image
                source={{uri: AuthReducer?.splashScreenRes[2]?.image}}
                style={{height: normalize(250), width: '100%'}}
                resizeMode="stretch"
              />
            ),
            title: 'Scan and add inventory',
            subtitle:
              'With over 2 lakh preloaded items, add inventory in just two seconds by scanning barcodes',
            titleStyles: {color: Colors.black2},
          },
          {
            backgroundColor: '#fff',
            image: (
              <Image
                source={{uri: AuthReducer?.splashScreenRes[3]?.image}}
                style={{height: normalize(250), width: '100%'}}
                resizeMode="stretch"
              />
            ),
            title: 'Welcome to Kirana fast',
            subtitle: "Manage your store's inventory in one place",
            titleStyles: {color: Colors.black2},
          },
        ]}
      />
    </View>
  );
};

export default NavigationScreen;
