import React, { useState } from 'react'
import { View, Text, Button, StyleSheet, Platform } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';

const styles = StyleSheet.create({
  center: {
    position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: -1,
      flexDirection: 'row',
    },
    separator: {
      width: 3,
    },
})

const Test = () => {
  
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onPressDate = () => { // 날짜 클릭 시
    setMode('date'); // 모달 유형을 date로 변경
    setShow(true); // 모달 open
  };

  const onPressTime = () => { // 시간 클릭 시
    setMode('time'); // 모달 유형을 time으로 변경
    setShow(true); // 모달 open
  };

  const onConfirm = (selectedDate) => { // 날짜 또는 시간 선택 시
    setShow(false); // 모달 close
    onChangeDate(selectedDate); // 선택한 날짜 변경
  };

  const onCancel = () => { // 취소 시
    setShow(false); // 모달 close
  };

  return (
    <View>
      <Button onPress={onPressDate} title="Show date picker!" />
      <Button onPress={onPressTime} title="Show time picker!" />
      <Text>selected: {date.toLocaleString()}</Text>
      <View style={{width: '100%', height: 300, borderWidth: 1}}>
      {show && (
         <DateTimePicker
         isVisible={show}
         mode={mode}
         onConfirm={onConfirm}
         onCancel={onCancel}
         date={date} />
      )}
      </View>
      
    </View>
    );
  };

export default Test