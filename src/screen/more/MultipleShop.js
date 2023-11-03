import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState, useRef} from 'react';
import SafeView from '../../components/SafeView';
import CommonLinearGradient from '../../components/CommonLinearGradient';
import {Fonts, Icons} from '../../themes/ImagePath';
import normalize from '../../utils/helpers/dimen';
import CommonBottomSheet from '../../components/BottomSheet';
import TextInputItem from '../../components/TextInputItem';
import {Colors} from '../../themes/Colors';
import {calcW} from '../../utils/helpers/dimen2';
import Modal from 'react-native-modal';
const MultipleShop = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  let item = [
    {
      id: 1,
      title: ' Add New Shop',
      Icon: Icons.crown,
    },
    {
      id: 2,
      title: 'Switch Shop',
      Icon: Icons.skip,
    },
    {
      id: 3,
      title: 'Delete Shop',
      Icon: Icons.crown,
    },
    {
      id: 4,
      title: 'Transfer this shop inventory to another shop',
      Icon: Icons.crown,
    },
  ];

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        if (item?.id === 1) {
          toggleModal();
        }  else if (item?.id === 3) {
          toggleModal();
        } else if (item.id === 4) {
          toggleModal();
        }
      }}>
      <Text style={styles.itemText}>{item.title}</Text>
      <Image source={item.Icon} style={styles.icon} />
    </TouchableOpacity>
  );

  const items = [
    {text: 'Make Multiple Shops', backgroundColor: 'red'},
    {text: 'Customer Loyalty Feature', backgroundColor: 'blue'},
    {text: 'Expense Management', backgroundColor: 'green'},
    {text: 'Batch Management', backgroundColor: 'green'},
    {text: 'Add staff and Store Manager', backgroundColor: 'green'},
    // Add more items as needed
  ];
  return (
    <SafeView>
      <CommonLinearGradient heading={' Add Multiple Shop'} />
      <View style={styles.container}>
        <FlatList
          data={item}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      </View>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        style={{
          justifyContent: 'flex-end',
          margin: 0,
        }}>
        <View
          style={{
            backgroundColor: 'white',
            padding: 20,
            alignItems: 'center',
            height: '50%',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}>
          <View
            style={{
              top: normalize(-50),
              position: 'absolute',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{height: normalize(100), width: normalize(100)}}
              source={Icons.premium}
            />
            <Text
              style={{
                fontSize: normalize(18),
                fontWeight: '700',
                color: Colors.black,
                marginTop: normalize(10),
              }}>
              This is the Premium Feature
            </Text>
          </View>
          <View
            style={{
              position: 'absolute',
              top: normalize(95),
              left: 0,
              marginHorizontal: normalize(40),
            }}>
            <Text style={{fontSize: normalize(13)}}>
              Buy our Premium Plan to:
            </Text>
            <View>
              {items.map((item, index) => (
                <View
                  key={index}
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View
                    style={{
                      width: normalize(12),
                      height: normalize(12),
                      marginTop: normalize(10),
                      backgroundColor: Colors.blue,
                      borderRadius: 2,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        height: normalize(8),
                        width: normalize(8),
                        backgroundColor: 'white',
                        borderRadius: normalize(5),
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      marginLeft: normalize(5),
                      top: normalize(5),
                      fontSize: normalize(13),
                      fontFamily: Fonts.Poppins_Black,
                      marginVertical: 3,
                    }}>
                    {item.text}
                  </Text>
                </View>
              ))}
            </View>

            <TouchableOpacity
              style={{
                backgroundColor: Colors.blue,
                // padding: normalize(15),
                width: '100%',
                height: normalize(45),
                // marginHorizontal: normalize(10),
                justifyContent: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: normalize(15),
                borderRadius: 10,
                marginLeft: 10,
              }}>
              <Text
                style={{
                  fontSize: normalize(18),
                  color: Colors.white,
                  fontWeight: '700',
                }}>
                Upgarde to Pro
              </Text>
              <Image
                style={{
                  height: normalize(15),
                  width: normalize(15),
                  marginLeft: normalize(10),
                }}
                tintColor="white"
                source={Icons.diamond}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeView>
  );
};

export default MultipleShop;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    paddingHorizontal: 20,
    marginTop: normalize(10),
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: normalize(16),
    borderBottomWidth: 1,
    marginHorizontal: normalize(1),
    borderBottomColor: '#ccc',
  },
  icon: {
    width: normalize(12),
    height: normalize(12),
    marginRight: 10,
  },
  itemText: {
    fontSize: normalize(14),
    color: '#333',
  },
});
