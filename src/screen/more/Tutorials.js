import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';
import React from 'react';
import SafeView from '../../components/SafeView';
import CommonLinearGradient from '../../components/CommonLinearGradient';
import {Fonts, Icons} from '../../themes/ImagePath';
import normalize from '../../utils/helpers/dimen';
import {Colors} from '../../themes/Colors';
import MenuItem from '../../components/MenuItem';
const Tutorials = (props) => {
  const menuData = [
    {
      title: 'How to add shop details',
      subItems: [
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      ],
      icon:"(1)"
    },
    {
      title: 'How to add items using search',
      subItems: [
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      ],
      icon:"(2)",
    },
    {
      title: 'How to add items to inventory.',
      subItems: [
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      ],
      icon:"(3)",
    },
    {
      title: 'How to create bill via search.',
      subItems: [
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      ],
      icon:"(4)",
    },
    {
      title: 'How to create bill using mobile camera to scan the barcocde.',
      subItems: [
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      ],
      icon:"(5)",
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
            text={item.icon}
            flag={4}
          />
        )}
      />
    );
  };



  return (
    <SafeView>
      <CommonLinearGradient heading={'Tutorials'} />
      <KeyboardAvoidingView
        // style={{ flex: 1 }}
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        enabled>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          
      <View style={styles.container}>
      <AccordionMenu data={menuData} />
      
      </View>
      </ScrollView>
            </KeyboardAvoidingView>
    </SafeView>
  );
};

export default Tutorials;

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
    width: normalize(15),
    height: normalize(15),
    marginRight: 10,
  },
  itemText: {
    fontSize: normalize(15),
    color: '#333',
  },
});
