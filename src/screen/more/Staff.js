import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SafeView from '../../components/SafeView'
import CommonLinearGradient from '../../components/CommonLinearGradient'
const Staff = () => {
  return (
    <SafeView>
      <CommonLinearGradient heading={'Add Staff'}/>
    </SafeView>
  )
}

export default Staff

const styles = StyleSheet.create({})