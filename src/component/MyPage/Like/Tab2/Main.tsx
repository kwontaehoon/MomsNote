import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import DropDownPicker from 'react-native-dropdown-picker'
import moment from 'moment'

import Like from '../../../../../public/assets/svg/Like.svg'
import Chat from '../../../../../public/assets/svg/Chat.svg'
import axios from 'axios'

const styles = StyleSheet.create({
  container:{
    height: '91%',
    backgroundColor: 'white',
  },
  main:{
    height: '74%',
    paddingLeft: 10,
    paddingRight: 10,
    position: 'relative',
    zIndex: -100,
  },
  mainBox:{
    borderBottomWidth: 1,
    borderColor: '#EEEEEE',
    height: 100,
    alignItems: 'center',
    flexDirection: 'row',
  },
  mainBoxSub:{
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  dateBox:{
    position: 'absolute',
    right: 10,
    top: 50,
  },
  mainBoxSub2:{
    flexDirection: 'row',
    paddingTop: 4,
    alignItems: 'center',
  },
})


const Talk1 = ({navigation}) => {

  const DATA = [
    {
      id: '0',
      title: '전체'
    },
    {
      id: '1',
      title: '자유게시판'
    },
    {
      id: '2',
      title: '일상이야기'
    },
    {
      id: '3',
      title: '임신정보'
    },
    {
      id: '4',
      title: '고민상담'
    },
    {
      id: '5',
      title: '질문게시판'
    }
  ];

  const [filter, setFilter] = useState([true, false, false, false, false, false]);
  const [info, setInfo] = useState([]); // 게시글 목록
  const [refresh, setRefresh] = useState('ㅋㅋ');

  useEffect(()=>{
    console.log('게시글 목록 업데이트');
    const commentInfo = async() => {
        try{
        const response = await axios({
            method: 'post',
            url: 'https://momsnote.net/api/board/list',
            data : { 
              order: 'new',
              count: 5,
              page: 1,
              subcategory: DATA[filter.findIndex(x => x === true)].title
            }
        });
            setInfo(response.data);
        }catch(error){
            console.log('comment axios error');
        }
    } 
    commentInfo();
  }, [refresh]);

  const renderItem2 = ({ item }) => (
    <TouchableOpacity style={styles.mainBox} onPress={()=>navigation.navigate('맘스토크 상세내용', {item, refresh, setRefresh})}>
        { item.savedName !== null ? <View style={styles.mainBoxSub}>
          <Image source={{uri: `https://momsnote.s3.ap-northeast-2.amazonaws.com/board/${item.savedName.split('|')[0]}`}} style={{width: 68, height: 68}}/>
          </View> : ''
        }
        <View style={[styles.mainBoxSub, {width: '55%', justifyContent: 'flex-start', paddingTop: 5}]}>
          <Text style={{fontSize: 15, paddingTop: 2}}>{item.title} </Text>
          <View style={styles.mainBoxSub2}>
            <Text style={{fontSize: 13, color: '#9E9E9E'}}>{item.nickname} </Text>
            <Like width={12} height={17} fill='#9E9E9E'/>
            <Text style={{color: '#9E9E9E'}}> {item.recommend}  </Text>
            <Chat width={12} height={18} fill='#9E9E9E'/>
            <Text style={{fontSize: 13, color: '#9E9E9E'}}> {item.commentsCount}</Text>
          </View>
        </View>
        <View style={[styles.dateBox, {justifyContent: 'center', alignItems: 'flex-end'}]}>
          <Text style={{color: '#9E9E9E', fontSize: 12}}>{moment().diff(moment(item.boardDate), "days")}일 전</Text>
        </View>
    </TouchableOpacity>
  ); 

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        {info.length === 0 ?
        <FlatList data={info} renderItem={renderItem2} onEndReached={()=>{console.log('afdasfdasfdas')}} onEndReachedThreshold={0.6}
          keyExtractor={item => String(item.boardId)} showsVerticalScrollIndicator={false}>
        </FlatList> : 
        <View style={{marginTop: 150, alignItems: 'center'}}><Text style={{fontSize: 16, color: '#757575'}}>등록된 게시물이 없습니다.</Text></View>}
      </View>
     </View>
  )
}

export default Talk1