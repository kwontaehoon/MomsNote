import React, { useState } from 'react'
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

// 문의하기
const styles = StyleSheet.create({
    container:{
      height: '94.5%',
    },
    container2:{
    },
    header:{
      height: '25%',
      padding: 15,
    },
    headerBox:{
      paddingTop: 10,
      paddingBottom: 10,
      justifyContent: 'center',
    },
    header2:{
      height: '75%',
      paddingLeft: 15,
      paddingRight: 15,
    },
    header2Box:{
      height: 52,
      justifyContent: 'center',
    },
    header2Box2:{
      height: '85%',
    },
    inputBox:{
      width: '100%',
      height: 52,
      borderWidth: 1,
      borderColor: '#EEEEEE',
      justifyContent: 'center',
      paddingLeft: 10,
      borderRadius: 4,
    },
    footer:{
      position: 'absolute',
      bottom: 0,
      width: '100%',
      height: 56,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FEA100',
    }
})
const Inquiry2 = ({filter, setFilter}) => {

  const [info, setInfo] = useState(
    {
      title: "",
      contents: "",
    }
  );
  console.log('1:1문의 작성: ', info);

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: '전체'
    },
  ];

  const submit = async() => {
    const token = await AsyncStorage.getItem('token');
    try{
      const response = await axios({
            method: 'post',
            url: 'https://momsnote.net/api/inquiry/write',
            headers: { 
              'Authorization': `bearer ${token}`, 
              'Content-Type': 'application/json'
            },
            data: info
          });
          console.log('response: ', response.data);
          if(response.data.status === 'success'){
            setFilter(!filter);
          }
      }catch(error){
        console.log('error: ', error);
      }
  }

  const renderItem = ({ item }) => (
    <View style={styles.container2}>
        <View style={styles.header}>
          <View style={styles.headerBox}><Text style={{fontWeight: 'bold', fontSize: 15}}>제목</Text></View>
          <View style={styles.headerBox}>
            <TextInput style={styles.inputBox} placeholder='문의제목 입력' placeholderTextColor={'#BDBDBD'}
              onChangeText={(e) => setInfo((prevState) => ({ ...prevState, title: e}))}> 
             </TextInput>
          </View>
        </View>
        <View style={styles.header2}>
          <View style={styles.headerBox}><Text style={{fontWeight: 'bold', fontSize: 15}}>내용</Text></View>
          <View style={styles.headerBox}>
            <TextInput style={[styles.inputBox, {height: 300, paddingTop: 15}]} placeholder='문의내용 입력' textAlignVertical='top' placeholderTextColor={'#BDBDBD'} multiline={true}
               onChangeText={(e) => setInfo((prevState) => ({ ...prevState, contents: e}))}> 
              </TextInput>
          </View>
        </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList data={DATA} renderItem={renderItem}
          keyExtractor={item => item.id}>
      </FlatList>

      {info.title.length !== 0 && info.contents.length !== 0 ? 
        <TouchableOpacity style={[styles.footer, {backgroundColor: '#FEA100'}]} onPress={submit}>
        <Text style={{fontSize: 18, fontWeight: '600', color: 'white'}}>문의하기</Text>
      </TouchableOpacity>
      :
        <View style={[styles.footer, {backgroundColor: '#E0E0E0'}]}>
          <Text style={{fontSize: 18, fontWeight: '600', color: 'white'}}>문의하기</Text>
        </View>}
    </View>
  )
}

export default Inquiry2