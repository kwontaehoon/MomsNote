import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import axios from 'axios'

import ArrowRight from '../../../../public/assets/svg/Arrow-Right.svg'

const styles = StyleSheet.create({
    container:{
      height: '100%',
      backgroundColor: 'white',
      display: 'flex',
      flexDirection: 'column'
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
      marginLeft: 20,
      marginRight: 20,
      flex: 1,
    },
    buttonBox:{
      width: '100%',
      height: 50,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      flexDirection: 'row',
      height: '100%',
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1
    }
})
const Terms1 = ({navigation}) => {

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
  ];

  const [page, setPage] = useState(0);

  useEffect(()=>{
    const terms = async() => {
      const response = await axios({
        method: 'post',
        url: 'https://momsnote.net/policy',
        data : {
          sort: "개인정보처리방침",
          page: page
      }
    });
    setInfo(response?.data?.data);
    }
    terms();
  }, [page]);

  const [info, setInfo] = useState();

  const renderItem = () => {
    return (
      <View>
        <View style={styles.header}>
          <Text style={{fontSize: 24, fontWeight: '700'}}>맘스노트 개인정보처리방침</Text>
        </View>
        <View style={styles.main}>
          <Text style={{fontSize: 16, lineHeight: 22}}>{info.policy}</Text>
        </View>
        <View style={styles.footer}>
          <View style={styles.buttonBox}>
            <TouchableOpacity style={[styles.button, {marginRight: 5}]} onPress={()=>page == 0 ? '' : setPage(page-1)}>
              <Text style={{marginRight: 10}}>이전 이용약관 보기</Text>
              <ArrowRight fill='black' width={16} height={16}/>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {marginLeft: 5}]} onPress={()=> page+1 == info.count ? '' : setPage(page+1)}>
              <Text style={{marginRight: 10}}>다음 이용약관 보기</Text>
              <ArrowRight fill='black' width={16} height={16}/>
            </TouchableOpacity>
          </View>
        </View>
    </View>
    )
  }

  return info == undefined || info == '' ? <ActivityIndicator size={'large'} color='#E0E0E0' style={styles.container}/> : (
    <View style={styles.container}>
      <FlatList data={DATA} renderItem={renderItem} keyExtractor={index => String(index)} showsVerticalScrollIndicator={false}></FlatList>
    </View>
  )
}

export default Terms1