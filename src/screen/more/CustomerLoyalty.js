import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SafeView from '../../components/SafeView'
import CommonLinearGradient from '../../components/CommonLinearGradient'
const CustomerLoyalty = () => {
  return (
   <SafeView>
    <CommonLinearGradient heading={'Customers Loyalty'}/>
   </SafeView>
  )
}

export default CustomerLoyalty

const styles = StyleSheet.create({})