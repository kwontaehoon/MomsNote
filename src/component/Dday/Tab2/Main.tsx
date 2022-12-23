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

  const [info, setInfo] = useState([]);

    useEffect(()=>{
      const Government = async() => {
        const response = await axios({
          method: 'post',
          url: 'https://momsnote.net/api/period/list',
          data : {
            subcategory: `${week.findIndex(x => x === true)+1}주`
        }
      });
      setInfo(response.data);
      }
      Government();
    }, []);
    
    const renderItem = ({ item }) => (
           <TouchableOpacity style={styles.main} onPress={()=>navigation.navigate('이시기에는 상세페이지', item)}>
              <View style={styles.mainBox}><Text>사진</Text></View>
              <View style={styles.mainBox2}><Text style={{fontSize: 15}}>{item.title}</Text></View>
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