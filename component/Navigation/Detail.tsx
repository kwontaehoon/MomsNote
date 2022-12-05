import React from 'react'
import { View, Text, Button } from 'react-native'

const Detail = ({navigation}) => {
  return (
    <View>
    <Text>Home</Text>
    <Button
      title="상세보기"
      onPress={() => navigation.push('HomeDetail', {id: 1})}
    />
  </View>
  )
}

export default Detail