import React, { useState, useEffect } from 'react'
import { View, Text, Button } from 'react-native'

const CutdownTimer = () => {

    const [minutes, setMinutes] = useState(parseInt(4));
    const [seconds, setSeconds] = useState(parseInt(9));
    const [kk, setKK] = useState(false);

    useEffect(() => {
        const countdown = setInterval(() => {
          if (parseInt(seconds) > 0 && kk) {
            setSeconds(parseInt(seconds) - 1);
          }
          if (parseInt(seconds) === 0) {
            if (parseInt(minutes) === 0) {
                clearInterval(countdown);
            } else {
              setMinutes(parseInt(minutes) - 1);
              setSeconds(59);
            }
          }
        }, 1000);
        return () => clearInterval(countdown);
      }, [minutes, seconds, kk]);


  return (
    <>
    <Text>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</Text>
    <Button title='버튼' onPress={()=>setKK(!kk)}></Button>
    </>
  )
}

export default CutdownTimer