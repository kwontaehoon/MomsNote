import React from 'react'
import {View, Text} from 'react-native'
import { WithLocalSvg } from "react-native-svg"
import material1 from '../../../public/assets/svg/material1.svg'

const Svg2 = () => {
  return (
    <View style={{borderWidth: 1, height: 100, width: 100}}>
        <WithLocalSvg width={22} height={20} asset={material1}/>
    </View>
  )
}

export default Svg2