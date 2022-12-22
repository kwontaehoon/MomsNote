import React, { useState } from 'react'
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'

// 문의하기
const styles = StyleSheet.create({
    container:{
      height: '95%',
      backgroundColor: 'white',
    },
    container2:{

    },
    header:{
      paddingTop: 30,
      height: 130,
      padding: 15,
    },
    headerBox:{
      height: 40,
      justifyContent: 'center',
    },
    headerBox2:{
      height: 52,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    header2:{
      height: 400,
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
      height: 56,
      borderWidth: 1,
      borderColor: 'lightgrey',
      justifyContent: 'center',
      paddingLeft: 10,
      borderRadius: 4,
    },
    footer:{
      marginTop: 30,
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
  console.log('dd', info.contents === '');

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: '전체'
    },
  ];

  const submit = async() => {
    try{
      const response = await axios({
            method: 'post',
            url: 'https://momsnote.net/api/inquiry/write',
            headers: { 
              'Content-Type': 'application/json'
            },
            data: info
          });
          console.log('response: ', response.status);
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
          <View style={styles.headerBox2}>
            <TextInput style={styles.inputBox} placeholder='문의제목 입력' placeholderTextColor={'#BDBDBD'}
              onChangeText={(e) => setInfo((prevState) => ({ ...prevState, title: e}))}> 
             </TextInput>
          </View>
        </View>
        <View style={styles.header2}>
          <View style={styles.header2Box}><Text style={{fontWeight: 'bold', fontSize: 15}}>내용</Text></View>
          <View style={styles.header2Box2}>
            <TextInput style={[styles.inputBox, {height: 340, paddingBottom: 290}]} placeholder='문의내용 입력' placeholderTextColor={'#BDBDBD'}
               onChangeText={(e) => setInfo((prevState) => ({ ...prevState, contents: e}))}> 
              </TextInput>
          </View>
        </View>
        
        {info.title.length !== 0 && info.contents.length !== 0 ? 
        <TouchableOpacity style={[styles.footer, {backgroundColor: '#FEA100'}]} onPress={submit}>
        <Text style={{fontSize: 18, fontWeight: '600', color: 'white'}}>문의하기</Text>
      </TouchableOpacity>:
        <View style={[styles.footer, {backgroundColor: '#E0E0E0'}]}>
          <Text style={{fontSize: 18, fontWeight: '600', color: 'white'}}>문의하기</Text>
        </View>}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList data={DATA} renderItem={renderItem}
          keyExtractor={item => item.id}>
      </FlatList>
    </View>
  )
}

export default Inquiry2