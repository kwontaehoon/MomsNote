import React, { useEffect, useState } from 'react'
import { View, Text, Button } from 'react-native'

const AuthTimer = () => {
  const [time, setTime] = useState(179)
  const [kk, setKK] = useState(false);

  useEffect(() => {
    const timer =
      time > 0 && kk && setInterval(() => setTime(time - 1), 1000);
      return () => clearInterval(timer);
  }, [time, kk])
  const timeFormat = (time) => {
    const m = Math.floor(time / 60).toString()
    let s = (time % 60).toString()
    if (s.length === 1) s = `0${s}`
    return `${m}:${s}`
  }
  return (
    <View>
      <Text>{timeFormat(time)}</Text>
      <Button title='버튼' onPress={()=>setKK(!kk)}/>
    </View>
  )
}

export default AuthTimer