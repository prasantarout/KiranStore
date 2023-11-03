import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SafeView from '../../components/SafeView'
import CommonLinearGradient from '../../components/CommonLinearGradient'
const SelfLedger = () => {
  return (
    <SafeView>
        <CommonLinearGradient heading={'Self Ledger'}/>
    </SafeView>
  )
}

export default SelfLedger

const styles = StyleSheet.create({})