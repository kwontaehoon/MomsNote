import React from 'react'
import { View, Text } from 'react-native'
import * as SMS from 'expo-sms';

const SMS = () => {

    const sms = async() => {

    const isAvailable = await SMS.isAvailableAsync();
        if (isAvailable) {
        // do your SMS stuff here
        } else {
        // misfortune... there's no SMS available on this device
        }
    }
  return (
    <View></View>
  )
}

export default SMS