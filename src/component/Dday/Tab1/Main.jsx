import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, Image } from 'react-native'
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
    marginRight: 10,
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
  console.log('info: ', info);

  const [refreshing, setRefreshing] = useState(false);

    useEffect(()=>{
      const Government = async() => {
        const response = await axios({
          method: 'post',
          url: 'https://momsnote.net/api/letter/list',
          data : {
            subcategory: `${week.findIndex(x => x === true)+1}`
        }
      });
      if(response.data == ''){ setInfo('0'); }else setInfo(response.data);
      }
      Government();
    }, [refreshing]);

    const ImageBox = (info) => {
      return (
        <Image source={{uri: `https://momsnote.s3.ap-northeast-2.amazonaws.com/board/${info.split('|')[0]}`}} style={styles.mainBox} resizeMode='cover' />
      )
  };

  const onRefreshing = async() => {
    if(!refreshing){
      await setRefreshing(true);
      setRefreshing(false);
    }
  }
    
    const renderItem = ({ item, index }) => (
           <TouchableOpacity style={styles.main} onPress={()=>navigation.navigate('오늘의편지 상세페이지', {item})}>
              {item.savedName === null ? <View style={styles.mainBox}></View> : ImageBox(item.savedName)}
              <View style={styles.mainBox2}><Text style={{fontSize: 15}}>{item.title}</Text></View>
          </TouchableOpacity>
    );

  return info == '' ? <ActivityIndicator size={'large'} color='#E0E0E0' style={styles.container}/> :
    <View style={styles.container}>

      {info == 0 ? 
      <View style={{marginTop: 180, alignItems: 'center'}}>
        <Text style={{fontSize: 16, color: '#757575'}}>등록된 게시물이 없습니다.</Text>
      </View>
      :
         <FlatList data={info} renderItem={renderItem}
            onRefresh={onRefreshing} refreshing={refreshing}
            keyExtractor={(item, index) => String(index)} showsVerticalScrollIndicator={false}>
        </FlatList>
      }

     </View>
}

export default Talk1