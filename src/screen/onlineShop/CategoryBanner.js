import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React from 'react';
import SafeView from '../../components/SafeView';
import CommonLinearGradient from '../../components/CommonLinearGradient';
import {Icons} from '../../themes/ImagePath';
import normalize from '../../utils/helpers/dimen';
const CategoryBanner = (props) => {
  let item = [
    {
      id: 1,
      title: 'Baby Care',
      Icon: Icons.skip,
    },
    {
      id: 2,
      title: 'Bakery & Cakes & Dairy',
      Icon: Icons.skip,
    },
    {
      id: 3,
      title: 'Beauty & Hygiene',
      Icon: Icons.skip,
    },
    {
      id: 4,
      title: 'Beverages',
      Icon: Icons.skip,
    },
    {
      id: 5,
      title: 'Cleaning & Household',
      Icon: Icons.skip,
    },
    {
      id: 6,
      title: 'Eggs & Meat & Fish',
      Icon: Icons.skip,
    },
    {
      id: 7,
      title: 'Foodgrains & Oil & Masala',
      Icon: Icons.skip,
    },
    {
      id: 8,
      title: 'Fruits & Vegetables',
      Icon: Icons.skip,
    },
    {
      id: 9,
      title: 'Gourment & World Food',
      Icon: Icons.skip,
    },
    {
      id: 10,
      title: 'Health & Wellness',
      Icon: Icons.skip,
    },
    {
      id: 11,
      title: 'Kitchen & Garder & Pets',
      Icon: Icons.skip,
    },
    {
      id: 12,
      title: 'Snacks & Branded Foods',
      Icon: Icons.skip,
    },
  ];

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        props.navigation.navigate('ChangeBannerOffer');
      }}>
      <Text style={styles.itemText}>{item.title}</Text>
      <Image source={item.Icon} style={styles.icon} />
    </TouchableOpacity>
  );

  return (
    <SafeView>
      <CommonLinearGradient heading={'Select Category for banner'} />
      <View style={styles.container}>
        <FlatList
          data={item}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 100}}
        />
      </View>
    </SafeView>
  );
};

export default CategoryBanner;

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
    borderBottomColor: '#ccc',
    marginHorizontal: normalize(1),
  },
  icon: {
    width: normalize(12),
    height: normalize(12),
    marginRight: 10,
  },
  itemText: {
    fontSize: normalize(12),
    color: '#333',
    textTransform: 'uppercase',
  },
});
