import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { postGovernment, setGovernmentCount } from '../../../Redux/Slices/Government'

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

  const dispatch = useDispatch();
  const info = useSelector(state => { return state.government.data });
  console.log('정부지원혜택 info: ', info);
  const governmentSet = useSelector(state => { return state.government.refresh });

  useEffect(()=>{
    dispatch(postGovernment(governmentSet));
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.mainBox} onPress={()=>navigation.navigate('정부지원혜택 상세내용', item)}>
        <View style={styles.mainBox2}><Text style={{fontSize: 15}}>{item.title}</Text></View>
    </TouchableOpacity>
  ); 

  return info == undefined ? <View></View> : (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <View style={styles.header2}>
            <Text style={{fontSize: 16, fontWeight: '600'}}>{info.length}</Text>
            <Text style={{fontSize: 16}}> 건</Text>
      </View>
      <View style={styles.main}>
        <FlatList data={info} renderItem={renderItem} onEndReached={()=>{console.log('밑에닿음'); dispatch(setGovernmentCount({count: governmentSet.page + 1}))}} onEndReachedThreshold={0.6}
          keyExtractor={item => String(item.boardId)}>
        </FlatList>
      </View>
     </View>
  )
}

export default Talk1