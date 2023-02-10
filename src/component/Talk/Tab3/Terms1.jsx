import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import axios from 'axios'

const styles = StyleSheet.create({
    container:{
      height: '100%',
      backgroundColor: 'white',  
    },
    header:{
      margin: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
    main:{
      padding: 20,
    },
    footer:{
      height: 100,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonBox:{
      borderWidth: 1,
      width: 170,
      height: 50,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
})
const Terms1 = () => {

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
  ];

  const [info, setInfo] = useState();
  console.log('info: ', info);

  useEffect(()=>{
    const terms = async() => {
      try{
      const response = await axios({
        method: 'post',
        url: 'https://momsnote.net/policy',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : {
          sort: "체험단 유의사항",
          page: 0
      }
    });
    setInfo(response.data);
  }catch(error){
    console.log('error: ', error);
  }
  }
    terms();
  }, []);


  const renderItem = () => {
    return(
      <View>
        <View style={styles.header}>
          <Text style={{fontSize: 24, fontWeight: '700'}}>체험단 유의사항</Text>
        </View>
        <View style={styles.main}>
          <Text style={{fontSize: 16, lineHeight: 22}}># 체험단 응모 시</Text>
          <Text style={{fontSize: 16, lineHeight: 22}}>- 당첨 시 제품을 받게 될 배송지 정보는  신청정보 작성 단계에서 정확하게 입력해주세요.</Text>
          <Text style={{}}> - 잘못된 정보로 인한 제품 오배송은 책임지지 않으며, 당첨이 취소될 수 있습니다.</Text>
          <Text>- 응모시, 작성된 회원정보는 이벤트 진행업체 및 택배사에 제품 배송을 목적으로 공유될 수 있습니다.</Text>
        </View>
    </View>
    )
  }

  return info == '' ? <ActivityIndicator size={'large'} color='#E0E0E0' style={styles.container}/> : (
    <View style={styles.container}>
      <FlatList data={DATA} renderItem={renderItem} keyExtractor={index => String(index)} showsVerticalScrollIndicator={false}></FlatList>
    </View>
  )
}

export default Terms1