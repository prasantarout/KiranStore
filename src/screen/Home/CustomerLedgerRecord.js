import { StyleSheet, Text, View,KeyboardAvoidingView,ScrollView,Image,TouchableOpacity,TextInput} from 'react-native'
import React,{useState} from 'react'
import SafeView from '../../components/SafeView'
import CommonLinearGradient from '../../components/CommonLinearGradient'
import normalize from '../../utils/helpers/dimen';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Colors} from '../../themes/Colors';

const CustomerLedgerRecord = () => {
  const [CalenderVisible, setCalenderVisible] = useState(false);
  const hideDatePicker = () => {
    setCalenderVisible(false);
  };

  const handleConfirm = date => {
    // setDob(moment(date).format("MM/DD/YYYY"));
    hideDatePicker();
  };
  return (
    <SafeView>
    <CommonLinearGradient heading={'Customer Ledger Records'} />
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      enabled>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.inputGroup}>
            <View style={styles.labelContainer}>
              <Text>Start Date</Text>
            </View>
            <TouchableOpacity
              style={styles.inputContainer}
              onPress={() => setCalenderVisible(!CalenderVisible)}>
              <TextInput placeholder="Enter start date" editable={false} />
            </TouchableOpacity>
          </View>
          <View style={styles.inputGroup}>
            <View style={styles.labelContainer}>
              <Text>End Date</Text>
            </View>
            <TouchableOpacity
              style={styles.inputContainer}
              onPress={() => setCalenderVisible(!CalenderVisible)}>
              <TextInput placeholder="Enter end date" editable={false} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{right: normalize(15), marginTop: normalize(20)}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: normalize(20),
            }}>
            <Text>Entries</Text>
            <Text>In</Text>
            <Text>Out</Text>
          </View>
        </View>
        <View
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: normalize(18), fontWeight: '800'}}>
            No Entries Yet
          </Text>
        </View>
        <DateTimePickerModal
          textColor={Colors.primaryColor}
          backdropStyleIOS={Colors.primaryColor}
          buttonTextColorIOS={Colors.primaryColor}
          isVisible={CalenderVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  </SafeView>
  )
}

export default CustomerLedgerRecord

const styles = StyleSheet.create({
  container: {
    marginHorizontal: normalize(20),
    marginTop: normalize(20),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  inputGroup: {
    flex: 1,
    marginRight: normalize(10),
  },
  labelContainer: {
    backgroundColor: Colors.backgroundLight,
    alignSelf: 'flex-start',
    paddingHorizontal: 3,
    marginStart: 10,
    zIndex: 1,
    elevation: 1,
    shadowColor: 'white',
    position: 'absolute',
    top: normalize(-8),
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    zIndex: 0,
    width: '100%',
  },
})