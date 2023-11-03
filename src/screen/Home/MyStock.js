import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SafeView from '../../components/SafeView'
import CommonLinearGradient from '../../components/CommonLinearGradient'
const MyStock = () => {
  return (
    <SafeView>
        <CommonLinearGradient heading={'My Stock'}/>
    </SafeView>
  )
}

export default MyStock

const styles = StyleSheet.create({})