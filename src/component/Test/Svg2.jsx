import React from 'react'
import {View, Text} from 'react-native'
import Chat from '../../../public/assets/svg/chat.svg'
import Download from '../../../public/assets/svg/download.svg'
import Pencil from '../../../public/assets/svg/pencil.svg'
import Like from '../../../public/assets/svg/Like.svg'
import Bell from '../../../public/assets/svg/Bell.svg'
import Share from '../../../public/assets/svg/Share.svg'

const Svg2 = () => {
  return (
    <View style={{borderWidth: 1, height: 100, width: 100}}>
        <Chat fill='red'/>
        <Download fill='red'/>
        <Pencil fill='red' />
        <Like fill='red'/>
        <Bell fill='red'/>
        <Share fill='red'/>
    </View>
  )
}

export default Svg2