import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'

// 문의내역
const styles = StyleSheet.create({
    container:{
      height: '95%',
      backgroundColor: 'white',
    },
    main:{
      borderBottomWidth: 1,
      borderColor: '#F5F5F5',
      height: 100,
      padding: 20,
      justifyContent: 'center'
    },
    statusBox:{
      position: 'absolute',
      right: 20,
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',


    },
})
const Inquiry3 = ({navigation}) => {


  const [info, setInfo] = useState([]);
  console.log('info: ', info);
  // const [infoTest, setInfoTest] = useState([
  //   {
  //     inquiryId: 1,
  //     title: '문의사항 제목',
  //     contents: '문의사항 내용입니다',
  //     status: '대기중',
  //     answerDate: '2022.05.21',
  //     inquiryDate: '2022.05.21'
  //   },{
  //     inquiryId: 2,
  //     title: '문의사항 입니다.....',
  //     contents: '문의사항 내용.....',
  //     status: '답변완료',
  //     answerDate: '2022.05.01',
  //     inquiryDate: '2022.05.01'
  //   },{
  //     inquiryId: 3,
  //     title: 'Setting up the development',
  //     contents: 'contents',
  //     status: '대기중',
  //     answerDate: '2022.06.26',
  //     inquiryDate: '2022.06.26'
  //   },{
  //     inquiryId: 4,
  //     title: 'This page will help',
  //     contents: 'ccccccccccccccccccccccc',
  //     status: '답변완료',
  //     answerDate: '2022.11.01',
  //     inquiryDate: '2022.11.01'
  //   },
  // ]);

  useEffect(()=>{
    const Inquiry = async() => {
      const response = await axios({
        method: 'post',
        url: 'https://momsnote.net/api/inquiry/list',
    });
    setInfo(response.data);
    }
    Inquiry();
  }, []);


  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.main} onPress={()=>navigation.navigate('문의 상세', item)}>
      <View style={styles.statusBox}><Text style={{color: '#757575'}}>{item.status}</Text></View>
        <Text style={{fontSize: 15, fontWeight: '600', marginBottom: 3, color: '#424242'}}>{item.title}</Text>
        <Text style={{color: '#9E9E9E'}}>{item.inquiryDate}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
        <FlatList data={info} renderItem={renderItem}
          keyExtractor={item => item.title}>
        </FlatList>
    </View>
  )
}

export default Inquiry3