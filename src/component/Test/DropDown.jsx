import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import DropDownPicker from 'react-native-dropdown-picker'
const stlyes = StyleSheet.create({
  container:{
    borderWidth: 1,
    backgroundColor: 'red',
    height: 100,
  }
})
export default function App() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
      {label: '산모 용품', value: '1'},
      {label: '수유 용품', value: '2'},
      {label: '위생 용품', value: '3'},
      {label: '목욕 용품', value: '4'},
      {label: '목욕 용품', value: '4'}
  ]);

  return (
    <View style={stlyes.container}>
      <DropDownPicker open={open} value={value} items={items} placeholder='카데고리 선택(필수)' style={{backgroundColor: 'red'}} 
          textStyle={{fontSize: 18}} dropDownContainerStyle={{backgroundColor: 'green'}}
          labelStyle={{backgroundColor: 'blue'}} maxHeight={100}
          placeholderStyle={{}} setOpen={setOpen} setValue={setValue} setItems={setItems}/>
    </View>
  );
}