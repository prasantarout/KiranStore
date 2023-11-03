import { StyleSheet, Text, View,ScrollView,TextInput,KeyboardAvoidingView,TouchableOpacity} from 'react-native'
import React from 'react'
import SafeView from '../../components/SafeView'
import { Colors } from '../../themes/Colors'
const DisableProducts = () => {
  return (
   <SafeView>
    <KeyboardAvoidingView
        // style={{ flex: 1 }}
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        enabled>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <TextInput style={styles.textInput} placeholder="Search" />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, {backgroundColor: Colors.black2}]}
                onPress={() => console.log('Cancel Pressed')}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, {backgroundColor: Colors.green}]}
                onPress={() => console.log('Create Catalogue Pressed')}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
   </SafeView>
  )
}

export default DisableProducts

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: normalize(20),
  },
  textInput: {
    width: '100%',
    height: normalize(45),
    borderWidth: 1,
    borderColor: 'gray',
    marginTop: 20,
    borderRadius: 10,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
    position: 'absolute',
    bottom: normalize(30),
    alignItems: 'center',
    left: 0,
  },
  button: {
    flex: 1,

    padding: normalize(14),
    // paddingHorizontal:normalize(20),
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: normalize(5),
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: normalize(14),
  },
})