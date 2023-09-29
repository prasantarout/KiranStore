import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import MyStatusBar from '../../utils/helpers/MyStatusBar';
import {Colors} from '../../themes/Colors';
import normalize from '../../utils/helpers/dimen';
import {Icons} from '../../themes/ImagePath';
const Home = () => {
  let item = [
    {
      id: 1,
      icon: Icons.rupee,
      title: 'Refer and earn',
    },
    {
      id: 2,
      icon: Icons.refresh,
    },
    {
      id: 3,
      icon: Icons.bell,
    },
    {
      id: 4,
      icon: Icons.accounting,
    },
  ];

  return (
    <View style={{flex: 1}}>
      <MyStatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <View style={styles?.backgroundImageContainer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: normalize(20),
          }}>
          <View></View>
          <View>
            <FlatList
              data={item}
              horizontal
              contentContainerStyle={styles.iconListContainer}
              renderItem={({item}) => (
                <TouchableOpacity
                  key={item.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderRadius: 30,
                    borderWidth: item?.id === 1 ? 1 : null,
                    borderColor: item?.id === 1 ? Colors.placeholder : null,
                  }}>
                  <Image source={item.icon} style={styles.icon} />
                  <Text
                    style={{
                      marginRight: item?.id === 1 ? normalize(10) : null,
                    }}>
                    {item?.title}
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id.toString()}
            />
          </View>
        </View>
        <ScrollView
          contentContainerStyle={{flexGrow: 1, paddingBottom: '50%'}}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              backgroundColor: Colors.red,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: normalize(20),
              marginTop: normalize(20),
              borderRadius: 10,
              padding: normalize(4),
              paddingHorizontal: normalize(10),
            }}>
            <Text
              style={{
                color: Colors.white,
                fontSize: normalize(12),
                fontWeight: 'bold',
              }}>
              Trial Expiring Tomorrow
            </Text>
            <TouchableOpacity
              style={{
                borderRadius: normalize(6),
                backgroundColor: Colors.white,
                padding: normalize(10),
              }}>
              <Text
                style={{
                  color: Colors.black,
                  fontSize: normalize(12),
                  fontWeight: 'bold',
                }}>
                Upgrade Now
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: Colors.red,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: normalize(20),
              marginTop: normalize(20),
              borderRadius: 10,
              padding: normalize(24),
              paddingHorizontal: normalize(10),
            }}>
            <View style={{flexDirection: 'column',marginVertical:10}}>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: normalize(25),
                  fontWeight: 'bold',
                }}>
                New Bill
              </Text>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: normalize(15),
                  fontWeight: 'bold',
                }}>
                New Bill
              </Text>
              <TouchableOpacity style={{
                borderRadius:normalize(5),
                borderWidth:1,
                width:normalize(25),
                borderColor:Colors.white,
                justifyContent:'center',
                alignItems:'center'

              }}>
                <Image
                  source={Icons.right}
                  style={{height: normalize(15), width: normalize(15)}}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{
                borderRadius: normalize(6),
                backgroundColor: Colors.white,
                padding: normalize(10),
              }}>
              <Text
                style={{
                  color: Colors.black,
                  fontSize: normalize(12),
                  fontWeight: 'bold',
                }}>
                Upgrade Now
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  backgroundImageContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    backgroundColor: Colors.white,
  },
  iconListContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end', // Align icons to the flex-end
  },
  icon: {
    height: normalize(20), // Adjust the size as needed
    width: normalize(20), // Adjust the size as needed
    margin: normalize(8), // Add margin for spacing between icons
  },
});
