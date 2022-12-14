import React, { useState, useEffect} from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'

const styles = StyleSheet.create({
    container:{
        height: '100%',
        backgroundColor: 'white',
    },
    main:{
        height: 80,
        borderTopWidth: 1,
        borderColor: '#F5F5F5',
        justifyContent: 'center',
        padding: 20,
    }
})
const InquiryDetail = ({navigation}) => {


    const [info, setInfo] = useState([
        {
          inquiryId: 1,
          title: '문의사항 제목',
          contents: '문의사항 내용입니다',
          status: '대기중',
          answerDate: '2022.05.21',
          inquiryDate: '2022.05.21'
        },{
          inquiryId: 2,
          title: '문의사항 입니다.....',
          contents: '문의사항 내용.....',
          status: '답변완료',
          answerDate: '2022.05.01',
          inquiryDate: '2022.05.01'
        },{
          inquiryId: 3,
          title: 'Setting up the development',
          contents: 'contents',
          status: '대기중',
          answerDate: '2022.06.26',
          inquiryDate: '2022.06.26'
        },{
          inquiryId: 4,
          title: 'This page will help',
          contents: 'ccccccccccccccccccccccc',
          status: '답변완료',
          answerDate: '2022.11.01',
          inquiryDate: '2022.11.01'
        },
      ]);
      console.log('info: ', info);

    useEffect(()=>{
        get();
      });
    
      const get = async() => {
        try{
          const response = await axios.get('http://192.168.1.140:4000/test');
          if(response.status === 200){
              console.log('response: ', response.data);
          }
        }catch(error){
          console.log('error: ', error);
        }
      }

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.main} onPress={()=>navigation.navigate('공지사항2', item)}>
           <Text style={{fontSize: 15, fontWeight: '600', marginBottom: 3, color: '#424242'}}>{item.title}</Text>
            <Text style={{color: '#9E9E9E'}}>{item.inquiryDate}</Text>
        </TouchableOpacity>
      );

  return (
    <View style={styles.container}>
        <FlatList data={info} renderItem={renderItem}
          keyExtractor={item => item.title} >
        </FlatList>
    </View>
  )
}

export default InquiryDetail