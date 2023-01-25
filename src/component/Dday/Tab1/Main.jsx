import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'

const styles = StyleSheet.create({
  container:{
    height: '76%',
    backgroundColor: 'white',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
  },
  main:{
    height: 80,
    flexDirection: 'row',
    backgroundColor: 'white',
    marginBottom: 20,
    shadowColor: "#000",
    elevation: 3,
  },
  mainBox:{
    width: 80,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainBox2:{
    width: '77%',
    justifyContent: 'center',
  }
})


const Talk1 = ({navigation, week}) => {

  const [info, setInfo] = useState([]);
  console.log('오늘의편지 info: ', info);
  const [refresh, setRefresh] = useState(false); // 추천, 댓글 등록, 댓글 삭제 누르면 정보를 다시받아야해서 새로고침 state

    useEffect(()=>{
      const Government = async() => {
        const response = await axios({
          method: 'post',
          url: 'https://momsnote.net/api/letter/list',
          data : {
            subcategory: `${week.findIndex(x => x === true)+1}주`
        }
      });
      setInfo(response.data);
      }
      Government();
    }, [refresh]);
    
    const renderItem = ({ item }) => (
           <TouchableOpacity style={styles.main} onPress={()=>navigation.navigate('오늘의편지 상세페이지', {item, refresh, setRefresh})}>
              <View style={styles.mainBox}><Text>사진</Text></View>
              <View style={styles.mainBox2}><Text style={{fontSize: 15}}>{item.title}</Text></View>
          </TouchableOpacity>
    );

  return info.length !== 0 ? 
    <View style={styles.container}>
         <FlatList data={info} renderItem={renderItem}
            keyExtractor={(item, index) => String(index)} showsVerticalScrollIndicator={false}>
        </FlatList>
     </View> : <View style={{marginTop: 180, alignItems: 'center'}}><Text style={{fontSize: 16, color: '#757575'}}>등록된 게시물이 없습니다.</Text></View>
}

export default Talk1