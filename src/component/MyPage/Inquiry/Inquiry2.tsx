import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, StatusBar, SafeAreaView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { SafeAreaProvider } from 'react-native-safe-area-context' 

// 문의내역
const styles = StyleSheet.create({
    container:{
      height: '95%',
      backgroundColor: 'white',
    },
    main:{
      borderBottomWidth: 1,
      borderColor: '#F5F5F5',
      height: 80,
      padding: 20,
      justifyContent: 'center'
    },
    main2:{
      alignItems: 'center',
      justifyContent: 'center',
      height: '80%',
    },
    statusBox:{
      position: 'absolute',
      right: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
})
const Inquiry3 = ({navigation}) => {

  const [info, setInfo] = useState([]);
  console.log('문의내역 info: ', info);

  useEffect(()=>{
    const Inquiry = async() => {
      const token = await AsyncStorage.getItem('token');
      const response = await axios({
        method: 'post',
        url: 'https://momsnote.net/api/inquiry/list',
        headers: { 
          'Authorization': `bearer ${token}`, 
          'Content-Type': 'application/json'
        },
        data: {}
    });
    if(response.data == ''){ setInfo('0'); }else setInfo(response.data);
    }
    Inquiry();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.main} onPress={()=>navigation.navigate('문의 상세', item)} activeOpacity={1}>
      <View style={styles.statusBox}><Text style={{color: '#757575'}}>{item.status}</Text></View>
        <Text style={{fontSize: 15, fontWeight: '600', marginBottom: 3, color: '#424242'}} numberOfLines={1}>{item.title}</Text>
        <Text style={{color: '#9E9E9E'}}>{`${item.inquiryDate.split('-')[0]}/${item.inquiryDate.split('-')[1]}/${item.inquiryDate.split('-')[2].substring(0, 2)}`}</Text>
    </TouchableOpacity>
  );

  return info == '' ? <ActivityIndicator size={'large'} color='#E0E0E0' style={styles.container}/>
  : (

    <SafeAreaProvider>

        <SafeAreaView style={{ backgroundColor: 'white' }}>
            <StatusBar />
        </SafeAreaView>

        <SafeAreaView style={styles.container}>
      {info == '0' ? 
      <View style={styles.main2}>
        <Text style={{color: '#757575', fontSize: 16}}>문의하신 내역이 없습니다.</Text>
      </View>
      :
        <FlatList data={info} renderItem={renderItem} showsVerticalScrollIndicator={false}
          keyExtractor={item => String(item.inquiryId)}>
        </FlatList>
      }
    </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default Inquiry3