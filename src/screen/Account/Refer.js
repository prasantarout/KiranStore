import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions
} from 'react-native';
import React ,{useEffect,useState}from 'react';
import SafeView from '../../components/SafeView';
import CommonLinearGradient from '../../components/CommonLinearGradient';
import {verticalScale} from '../../utils/helpers/dimen1';
import {Fonts, Icons} from '../../themes/ImagePath';
import normalize from '../../utils/helpers/dimen';
import {Colors} from '../../themes/Colors';
import MenuItem from '../../components/MenuItem';
const { width, height } = Dimensions.get('window');
const Refer = (props) => {
  const menuData = [
    {
      title: 'Join Bhanumart fast partner program and earn upto 50k per month',
      subItems: [
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      ],
      icon: Icons.skip,
    },
    {
      title: 'See how commissions works',
      subItems: [
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      ],
      icon: Icons.skip,
    },
    {
      title: 'What happens after joining our program.',
      subItems: [
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      ],
      icon: Icons.skip,
    },
  ];

  let itemView = [
    {
      id: 1,
      title: 'Program Benefits',
      subtitle:
        'Get revenue share when your client purchasesa bhunumart fast subscription',
    },
    {
      id: 2,
      title: 'Hassle freesettlements',
      subtitle:
        'Payment settlements are done within 2 weeks of your clients purchase bhanumart fast subscription.track every payments and your client status from partner dashboard',
    },
    {
      id: 3,
      title: 'Zero investment',
      subtitle:
        'Bhanumart fast program is a zero investment program. You dont have to pay any investment to join the program. You can earn revenue share from your client purchase of bhun',
    },
  ];

  const AccordionMenu = ({data}) => {
    return (
      <FlatList
        data={data}
        keyExtractor={item => item.title}
        renderItem={({item}) => (
          <MenuItem
            title={item.title}
            subItems={item.subItems}
            icon={item.icon}
            flag={1}
          />
        )}
      />
    );
  };

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subtitle}>{item.subtitle}</Text>
    </View>
  );

  useEffect(()=>{
    // dispatch(splashScreenRequest())
    GetItem();
  },[])


  const [data, setData] = useState([]);
  const GetItem = (item) => {
    let url="https://bhanumart.com/dev/new_api/faqs";
    // const formData = new FormData();
    // formData.append("token",item);
    fetch(url, {
      method: "GET",
      // body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if(data.response[0].status==="Valid"){
          setData(data[0],"zdjfl")
          console.log(data?.response[0]?.faqs, "sadjk");
          setData(data?.response[0]?.faqs)
        }        
        // const question = data?.response[0]?.questions;
        // console.log(question[0], "response");
      })
      .catch((error) => console.log(error));
    
  };

  return (
    <SafeView>
      <CommonLinearGradient heading={'Become a Partner'} flag={10} />
      <KeyboardAvoidingView
        // style={{ flex: 1 }}
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        enabled>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              // height: verticalScale(150),
              backgroundColor: '#102A70',
              borderBottomRightRadius: 30,
              borderBottomLeftRadius: 30,
              // justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={Icons.gift}
              style={{height: normalize(45), width: normalize(45)}}
            />
            <View
              style={{
                marginVertical: normalize(15),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: normalize(15),
                  fontFamily: Fonts.Poppins_Medium,
                  color: Colors.white,
                }}>
                Why Partner With Us
              </Text>
              <Text
                style={{
                  fontSize: normalize(11),
                  fontFamily: Fonts.Poppins_Medium,
                  color: Colors.white,
                  maxWidth: '85%',
                  letterSpacing: 2,
                  textAlign: 'center',
                  marginHorizontal: normalize(10),
                  marginVertical: normalize(10),
                  lineHeight: normalize(20),
                }}>
                Bhunumart Fast is the fastest and easiest inventory and billing
                software for Bhunumart Store.Sign up now.
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.backgroundUnlock,
                  borderRadius: 10,
                  padding: normalize(10),
                  paddingHorizontal: normalize(80),
                  justifyContent: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',
                  elevation: 5,
                  marginVertical: normalize(10),
                }}
                onPress={() => {
                  props.navigation.navigate('PartnerDetails');
                }}
                >
                <Text
                  style={{
                    fontSize: normalize(12),
                    fontFamily: Fonts.Poppins_Medium,
                    fontWeight: '600',
                    color: Colors.black,
                  }}>
                  Sign Up
                </Text>
                <Image
                  source={Icons.right}
                  style={{
                    height: normalize(15),
                    width: normalize(15),
                    marginLeft: normalize(10),
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{marginVertical: normalize(20)}}>
            <AccordionMenu data={data?.length>0 && data} />
            <Image
              source={Icons.money}
              style={{
                height: normalize(250),
                width: normalize(250),
                marginHorizontal: normalize(30),
              }}
            />
          </View>
          <View style={styles.container}>
            <FlatList
              data={itemView}
              renderItem={renderItem}
              keyExtractor={item => item.id.toString()}
            />
              <Image
              source={Icons.coin}
              style={{
                height: normalize(250),
                width: normalize(250),
                marginHorizontal: normalize(30),
              }}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeView>
  );
};

export default Refer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  itemContainer: {
    // backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    justifyContent:'center',
    alignItems: 'center',
    // elevation: 2,
  },
  title: {
    fontSize:normalize(20), // 4% of screen width
    fontWeight: '700',
    fontFamily:Fonts.Poppins_Black,
  },
  subtitle: {
    fontSize:normalize(14), // 3.5% of screen width
    marginHorizontal:20,
    lineHeight:20,
    tetxAlign:'center',
    marginTop:normalize(10),
    letterSpacing:0.5
  },
});
