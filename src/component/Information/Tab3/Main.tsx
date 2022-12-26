import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/AntDesign'
import Icon3 from 'react-native-vector-icons/Ionicons'
import DropDownPicker from 'react-native-dropdown-picker'
import { WithLocalSvg } from "react-native-svg"
import like from '../../../../public/assets/svg/Like.svg'
import axios from 'axios'

const styles = StyleSheet.create({
  container:{
    height: '82%',
    backgroundColor: 'white',
  },
  header:{
    height: 10,
    backgroundColor: '#F5F5F5',
  },
  header2:{
    height: 70,
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    alignItems: 'flex-end',
    padding: 15
  },
  main:{
    height: '100%',
    paddingLeft: 15,
    paddingRight: 15
  },
  mainBox:{
    borderBottomWidth: 1,
    height: 60,
    borderColor: '#F5F5F5',
    justifyContent: 'center',
  },
  mainBox2:{
    height: '50%',
    justifyContent: 'center',
  },
  mainBox3:{
    height: '50%',
    flexDirection: 'row',
  },
  infoBox:{
    width: '50%',
    flexDirection: 'row'
  },
})


const Talk1 = ({navigation}) => {

  const [info, setInfo] = useState([]);
  console.log('정부지원혜택 info: ', info);

  useEffect(()=>{
    const Government = async() => {
      const response = await axios({
        method: 'post',
        url: 'https://momsnote.net/api/benefits/list',
        data : {
          count: 5,
          page: 1,
      }
    });
    setInfo(response.data);
    }
    Government();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.mainBox} onPress={()=>navigation.navigate('정부지원혜택 상세내용', item)}>
        <View style={styles.mainBox2}><Text style={{fontSize: 15}}>{item.title}</Text></View>
    </TouchableOpacity>
  ); 

  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <View style={styles.header2}>
            <Text style={{fontSize: 16, fontWeight: '600'}}>{info.length}</Text>
            <Text style={{fontSize: 16}}> 건</Text>
      </View>
      <View style={styles.main}>
        <FlatList data={info} renderItem={renderItem}
          keyExtractor={item => item.id}>
        </FlatList>
      </View>
     </View>
  )
}

export default Talk1