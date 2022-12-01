import React, { useState } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import {Picker} from '@react-native-picker/picker';

const Test3 = () => {
const [selectedLanguage, setSelectedLanguage] = useState();

  return (
    <Picker
  selectedValue={selectedLanguage}
  onValueChange={(itemValue, itemIndex) =>
    setSelectedLanguage(itemValue)
  }>
  <Picker.Item label="Java" value="java" />
  <Picker.Item label="JavaScript" value="js" />
</Picker>
    );
  };

export default Test3