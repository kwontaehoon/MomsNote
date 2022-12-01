import React, { useState } from 'react'
import { View, Text, Button, StyleSheet, Platform } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';

const Test = () => {
  
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    console.log('show: ', show);
  
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate;
      setShow(false);
      setDate(currentDate);
    };
  
    const showMode = (currentMode) => {
      if (Platform.OS === 'android') {
        setShow(false);
        // for iOS, add a button that closes the picker
      } 
      setMode(currentMode);
    };
  
    const showDatepicker = () => {
      showMode('date');
      setShow(true);
    };
  
    const showTimepicker = () => {
      showMode('time');
      setShow(true);
    };
  
    return (
      <View>
        <Button onPress={showDatepicker} title="Show date picker!" />
        <Button onPress={showTimepicker} title="Show time picker!" />
        <Text>selected: {date.toLocaleString()}</Text>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            onChange={onChange}
            style={{width: 100, height: 100, backgroundColor: 'blue'}}
          />
        )}
      </View>
    );
  };

export default Test