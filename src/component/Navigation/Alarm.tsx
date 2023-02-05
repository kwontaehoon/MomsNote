import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'
import { postMaterialShare } from '../../Redux/Slices/MaterialShareSlice'
import { postBoard } from '../../Redux/Slices/BoardSlice'

const styles = StyleSheet.create({
  container:{
    backgroundColor: 'white',
    height: '100%',
  },
  main:{
    justifyContent: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderColor: '#F5F5F5',
  }
})
const Main = ({navigation}) => {

  const DATA = [{id: '0'}];

  const dispatch = useDispatch();
  const materialShare = useSelector(state => { return state.materialShare.data});
  console.log('알림 materialShare: ', materialShare);
  const materialShareSet = useSelector(state => { return state.materialShare.refresh });
  const board = useSelector(state => { return state.board.data });
  console.log('알림 board: ', board);
  const boardSet = useSelector(state => { return state.board.refresh; });

  const [info, setInfo] = useState();
  console.log('알람 info: ', info);

  useEffect(()=>{

    dispatch(postMaterialShare(materialShareSet));
    dispatch(postBoard(boardSet));

    const alarm = async() => {
      const token = await AsyncStorage.getItem('token');
      try{
          const response = await axios({
                method: 'post',
                url: 'https://momsnote.net/api/user/notification',
                headers: { 
                  'Authorization': `Bearer ${token}`, 
                  'Content-Type': 'application/json'
                },
                data: {page: 1}
              });
              console.log('response: ', response);
              setInfo(response.data.data);
          }catch(error){
            console.log('알림 error: ', error);
          }
    }
    alarm();
  }, []);

  const navi = async(boardId, category, notificationId) => {
    

    const momsTalk = board.filter(x => x.boardId == boardId);
    const materialList = materialShare.filter(x => x.boardId == boardId);
    console.log('mosmTalk: ', momsTalk);
    

    // try{
    //   const response = await axios({
    //         method: 'post',
    //         url: 'http://localhost/api/user/notification/update',
    //         data: {notificationId: notificationId}
    //       });
    //       console.log('response: ', response);
    //       setInfo(response.data.data);
    //   }catch(error){
    //     console.log('알림 error: ', error);
    //   }

    // momsTalk == '' ?  navigation.navigate('출산리스트 공유 상세내용', materialList) : navigation.navigate('맘스토크 상세내용', {item: momsTalk});
  }

  const List = () => {
    let arr = [];
    info.filter((x, index) => {
      arr.push(
        <TouchableOpacity style={styles.main} key={index} onPress={()=>navi(x.boardId, x.category, x.notificationId)}>
          <Text style={{fontSize: 15, fontWeight: '500', marginBottom: 5, color: info[index].readFlag ? '#9E9E9E' : ''}}>{info[index].nickname}님이 회원님의 게시글에 댓글을 남겼습니다.</Text>
          <Text style={{color: '#9E9E9E', fontSize: 12}}>{moment(info[index].notificationDate).format('YY.MM.DD')}.</Text>
        </TouchableOpacity>
      )
    })
    return arr;
  }
    

  const renderItem = ({ item}) => (
      <List />
  );

  return info == undefined ? <ActivityIndicator size={'large'} color='#E0E0E0' style={styles.container}/>
  :
    <View style={styles.container}>
      
    { info.length == 0 ?
    <View style={{alignItems: 'center', justifyContent: 'center', height: '80%'}}>
    <Image source={require('../../../public/assets/image/rainbow.png')}/>
  <Text style={{fontSize: 16, color: '#757575', marginTop: 24}}>아직 받은 알림이 없습니다.</Text>
  </View>
  :
      <FlatList data={DATA} renderItem={renderItem}
          keyExtractor={item => item.id} showsVerticalScrollIndicator={false}>
      </FlatList>}
    </View>
  }

export default Main