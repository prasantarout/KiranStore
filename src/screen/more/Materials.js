import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SafeView from '../../components/SafeView'
import CommonLinearGradient from '../../components/CommonLinearGradient'
const Materials = () => {
  return (
   <SafeView>
    <CommonLinearGradient heading={'Materials'}/>
   </SafeView>
  )
}

export default Materials

const styles = StyleSheet.create({})