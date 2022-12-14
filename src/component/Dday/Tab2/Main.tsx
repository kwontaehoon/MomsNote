import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'

const styles = StyleSheet.create({
  container:{
    height: 500,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  main:{
    height: 90,
    flexDirection: 'row',
    backgroundColor: 'white',
    marginBottom: 20,
    shadowColor: "#000",
    elevation: 3,
  },
  mainBox:{
    width: '23%',
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainBox2:{
    width: '77%',
    justifyContent: 'center',
  }
})


const Talk1 = ({navigation, week}: any) => {

    useEffect(()=>{
      get();
      const weekNumber = week.findIndex(x => x === true);
      const b = info.filter(x => x.dDayWeek === weekNumber+1);
      setInfo(b);
    },[]);

    useEffect(()=>{
      // 주차에 맞게 filter링
    }, [week])

    const get = async() => {
      console.log('req3');
      try{
          const response = await axios.get('http://192.168.1.140:4000/test');
          if(response.status === 200){
              console.log('response: ', response.data);
          }
      }catch(error){
          console.log('error: ', error);
      }
  }

    const [info, setInfo] = useState([
      {
        dDayId: '1',
        dDayWeek: 1,
        dDayTitle: '이 시기의 아기',
        dDayContens: '1번 내용',
        dDayImage: '',
      },{
        dDayId: '2',
        dDayWeek: 1,
        dDayTitle: '이 시기의 엄마',
        dDayContens: '2번 내용',
        dDayImage: '',
      },{
        dDayId: '3',
        dDayWeek: 2,
        dDayTitle: '엄마를 위한 어드바이스',
        dDayContens: '3번 내용',
        dDayImage: '',
      },{
        dDayId: '4',
        dDayWeek: 2,
        dDayTitle: '아빠를 위한 어드바이스',
        dDayContens: '4번 내용',
        dDayImage: '5',
      },
      
    ]);
    console.log('info: ', info);
    
    const renderItem = ({ item }) => (
           <TouchableOpacity style={styles.main} onPress={()=>navigation.navigate('이시기에는 상세페이지', item)}>
              <View style={styles.mainBox}><Text>사진</Text></View>
              <View style={styles.mainBox2}><Text style={{fontSize: 15}}>{item.dDayTitle}</Text></View>
          </TouchableOpacity>
    );

    return info.length !== 0 ? 
    <View style={styles.container}>
         <FlatList data={info} renderItem={renderItem}
            keyExtractor={item => item.dDayId} showsHorizontalScrollIndicator={true}>
        </FlatList>
     </View> : <View style={{marginTop: 180, alignItems: 'center'}}><Text style={{fontSize: 16, color: '#757575'}}>등록된 게시물이 없습니다.</Text></View>
}

export default Talk1