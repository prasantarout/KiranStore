import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
} from 'react-native';
import React from 'react';
import SafeView from '../../components/SafeView';
import CommonLinearGradient from '../../components/CommonLinearGradient';
import {Icons} from '../../themes/ImagePath';
import {Colors} from '../../themes/Colors';
import MenuItem from '../../components/MenuItem';

const Report = () => {
  const menuData = [
    {
      title: 'Sales',
      subItems: [
        'Sales Summary',
        'Stock Sales Summary',
        'Sales Summary by Staff',
      ],
      icon: Icons.order,
    },
    {
      title: 'Inventory',
      subItems: [
        'Stock Sales Summary',
        'Stock Summary',
        'Stock balance Summary',
        'Low stock Summary',
        'Out of stock Summary',
        'Expired stock Summary',
        'Loss Summary',
      ],
      icon: Icons.stock,
    },
    {
      title: 'Tax',
      subItems: ['Tax Summary'],
      icon: Icons.tax,
    },
    {
      title: 'Customer',
      subItems: ['Customer Summary'],
      icon: Icons.customers,
    },
    {
      title: 'Purchase',
      subItems: ['Purchase Summary'],
      icon: Icons.supplier,
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
          />
        )}
      />
    );
  };

  return (
    <SafeView backgroundColor={Colors.white}>
      <CommonLinearGradient heading={'Reports'} flag={1} back={false} zindex={1}/>
      <KeyboardAvoidingView
        // style={{ flex: 1 }}
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        enabled>
        <ScrollView
          contentContainerStyle={{flexGrow: 1, paddingBottom: '50%'}}
          showsVerticalScrollIndicator={false}>
          <AccordionMenu data={menuData} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeView>
  );
};

export default Report;

const styles = StyleSheet.create({
  menuItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    margin: 10,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subItem: {
    marginHorizontal: 5,
    padding: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});
