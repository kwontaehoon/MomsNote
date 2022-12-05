import React from 'react'
import {View, Text} from 'react-native'
import {WithLocalSvg} from "react-native-svg"
import Logo from '../../assets/Logo.svg'

const Svg2 = () => {
  return (
    <View style={{borderWidth: 1, height: 100, width: 100}}>
        <WithLocalSvg
            width={50}
            height={50}
            asset={Logo}
            />
    </View>
  )
}

export default Svg2