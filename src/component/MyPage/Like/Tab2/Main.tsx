import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, ActivityIndicator } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import axios from 'axios'
import moment from 'moment'
import { useIsFocused } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import Like from '../../../../../public/assets/svg/Like.svg'
import Chat from '../../../../../public/assets/svg/Chat.svg'
import Pencil from '../../../../../public/assets/svg/pencil.svg'
import { useDispatch, useSelector } from 'react-redux'
import { setMaterialShareFilter, setMaterialShareCount } from '../../../../Redux/Slices/MaterialShareSlice'
import { postMaterialShare } from '../../../../Redux/Slices/MaterialShareSlice'
import { postMaterialShareCount } from '../../../../Redux/Slices/MaterialShareCountSlice'

const styles = StyleSheet.create({
  container:{
    height: '92%',
    backgroundColor: 'white',
  },
  mainBox:{
    borderColor: '#F5F5F5',
    justifyContent: 'center',
    padding: 20,
  },
  infoBox:{
    flexDirection: 'row',
    marginTop: 5,
  },
  clockBox:{
    position: 'absolute',
    right: 15,
    bottom: 20,
  },
})


const Talk1 = ({navigation}) => {

  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const materialShareSet = useSelector(state => { return state.materialShare.refresh });
  console.log('materialShareSet: ', materialShareSet);
  const info = useSelector(state => { return state.materialShare.data});
  console.log('출산준비물 공유 리스트 info: ', info);
  const infoCount = useSelector(state => { return state.materialShareCount.data});
  console.log('출산 준비물 공유 리스트 infoCount: ', infoCount);

  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState({
    open: false,
    asyncStorage: ''
  }); // 글쓰기 모달
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('1');
  const [items, setItems] = useState([
    {label: '최신 순', value: '1'},
    {label: '인기 순', value: '2'},
]);

useEffect(()=>{
  setLoading(true);
  dispatch(postMaterialShare(materialShareSet));
  dispatch(postMaterialShareCount());
  setLoading(false);
}, []);

const dayCalculate = (date) => {
  switch(true){
    case moment().diff(moment(date), 'minute') < 60: return <Text style={{color: '#9E9E9E', fontSize: 12}}>{moment().diff(moment(date), 'minute')}분 전</Text>
    case moment().diff(moment(date), 'hour') < 24: return<Text style={{color: '#9E9E9E', fontSize: 12}}>{moment().diff(moment(date), 'hour')}시간 전</Text>
    default: return <Text style={{color: '#9E9E9E', fontSize: 12}}>{moment().diff(moment(date), 'day')}일 전</Text>
  }
}

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.mainBox} onPress={()=>navigation.navigate('출산리스트 공유 상세내용', item)}>
        <View style={styles.clockBox}>
          <Text style={{color: '#9E9E9E', fontSize: 12}}>{dayCalculate(item.boardDate)}</Text>
        </View>
        <Text>{item.title}</Text>
        <View style={styles.infoBox}>
              <Text style={{color: '#9E9E9E', fontSize: 13}}>{item.nickname} </Text>
              <Like fill='#9E9E9E' width={13} height={17}/>
              <Text style={{color: '#9E9E9E', fontSize: 13}}> {item.recommend}  </Text>
              <Chat fill='#9E9E9E' width={13} height={17}/>
              <Text style={{color: '#9E9E9E', fontSize: 13}}> {item.recommend} </Text>
        </View>
    </TouchableOpacity>
  ); 

  return info == undefined || info == '' ?  <ActivityIndicator size={'large'} color='#E0E0E0' style={styles.container}/> : (
    <View style={styles.container}>
        {info == undefined || info == '' ?
        <View></View>
        :
        <FlatList data={info} renderItem={renderItem} onEndReached={()=>{
          dispatch(setMaterialShareCount({page: infoCount > (materialShareSet.page * 30) ? materialShareSet.page + 1 : materialShareSet.page, count: infoCount}))
        }} onEndReachedThreshold={0}
          keyExtractor={item => String(item.boardId)} showsVerticalScrollIndicator={false}
          ListFooterComponent={loading && <ActivityIndicator />}>
        </FlatList>}
     </View>
  )
}

export default Talk1