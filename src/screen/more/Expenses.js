import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SafeView from '../../components/SafeView'
import CommonLinearGradient from '../../components/CommonLinearGradient'
const Expenses = () => {
  return (
    <SafeView>
      <CommonLinearGradient heading={'Expenses'}/>
    </SafeView>
  )
}

export default Expenses

const styles = StyleSheet.create({})