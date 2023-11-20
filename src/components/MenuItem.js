import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import {Icons} from '../themes/ImagePath';
import normalize from '../utils/helpers/dimen';
const MenuItem = ({
  title,
  subItems,
  icon,
  flag,
  isTextinput,
  isButton,
  text,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <TouchableOpacity
      style={[styles.menuItem, {borderBottomWidth: flag == 2 ? 0 : 1}]}
      onPress={toggleExpansion}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          bottom: normalize(8),
        }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: flag === 2 ? 'space-between' : 'flex-start',
            alignItems: 'center',
          }}>
          {flag === 2 ? null : (
            <Image
              source={icon}
              style={{
                width: flag === 1 ? 10 : 30,
                height: flag === 1 ? 10 : 30,
              }}
            />
          )}
          {flag === 4 && (
            <Text style={{fontSize: normalize(18), right: normalize(40)}}>
              {text}
            </Text>
          )}
          <Text
            style={[
              styles.title,
              {
                fontSize: flag === 1 ? 15 : 18,
                right:
                  flag === 2 ? normalize(22) : flag == 4 ? normalize(40) : 0,
              },
            ]}>
            {title}
          </Text>
        </TouchableOpacity>
        <Image
          source={Icons.down}
          style={{height: 20, width: 20, left: flag === 2 ? normalize(12) : 0}}
        />
      </View>
      {isExpanded && (
        <FlatList
          data={subItems}
          keyExtractor={item => item}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.subItem}>
              <Text style={{fontSize: normalize(13), fontWeight: '400'}}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    // borderWidth: 1,
    borderColor: '#ccc',
    // borderRadius: 5,
    borderBottomWidth: 1,
    margin: normalize(8),
    padding: normalize(8),
    marginHorizontal: normalize(15),
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: normalize(10),
    maxWidth: normalize(230),
    color:'#000000'
  },
  subItem: {
    // marginHorizontal:normalize(30),
    // padding: normalize(10),
    // marginTop: 10,
    // borderWidth: 1,
    borderColor: '#ccc',
    // borderRadius: 5,
    // borderBottomWidth:1
  },
});

export default MenuItem;
