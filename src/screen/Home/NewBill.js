import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SafeView from '../../components/SafeView'
import CommonLinearGradient from '../../components/CommonLinearGradient'
const NewBill = () => {
  return (
    <SafeView>
        <CommonLinearGradient heading={'New Bill'}/>
    </SafeView>
  )
}

export default NewBill

const styles = StyleSheet.create({})