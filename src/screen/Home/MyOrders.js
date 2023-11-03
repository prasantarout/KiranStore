import { StyleSheet, Text, View,KeyboardAvoidingView,ScrollView,TextInput } from 'react-native'
import React from 'react'
import SafeView from '../../components/SafeView'
import CommonLinearGradient from '../../components/CommonLinearGradient'
const MyOrders = () => {
  return (
    <SafeView>
        <CommonLinearGradient heading={'My Orders'}/>
        <KeyboardAvoidingView
        // style={{ flex: 1 }}
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        enabled>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <TextInput
              style={styles.textInput}
              placeholder="Search"
            />
            </View>
        </ScrollView>
        </KeyboardAvoidingView>
    </SafeView>
  )
}

export default MyOrders

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: normalize(20),
  },
})