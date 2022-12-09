import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import Icon from 'react-native-vector-icons/FontAwesome'
import { WithLocalSvg } from "react-native-svg"
import material1 from '../../../public/assets/svg/Notice.svg'

const styles = StyleSheet.create({
    container:{
        height: '100%',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image:{
      width: '100%',
      height: '100%',
      borderRadius: 10,
      overflow: 'hidden',
  },
})
const InquiryDetail = () => {
  return (
    <View style={styles.container}>
        <WithLocalSvg width={287} height={197} asset={material1}/>
    </View>
  )
}

export default InquiryDetail