import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState} from 'react';
import SafeView from '../../components/SafeView';
import CommonLinearGradient from '../../components/CommonLinearGradient';
const EnabledisableProducts = () => {
  const tabs = ['Enable Products', 'Disable Products'];
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <SafeView>
      <CommonLinearGradient heading={'Enable / disable Products'} />
      <KeyboardAvoidingView
        // style={{ flex: 1 }}
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        enabled>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}></ScrollView>
      </KeyboardAvoidingView>
    </SafeView>
  );
};

export default EnabledisableProducts;

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#007AFF',
    height: 100,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  selectedTab: {
    borderBottomColor: 'white',
  },
  tabText: {
    color: 'white',
    fontSize: 16,
  },

  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  button: {
    flex: 1,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginHorizontal: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
