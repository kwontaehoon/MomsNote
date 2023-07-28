import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import { Video, AVPlaybackStatus } from 'expo-av';
import { useSelector, useDispatch } from 'react-redux'

import Like from '../../../../../public/assets/svg/Like.svg'
import Chat from '../../../../../public/assets/svg/Chat.svg'
import { postMyLikeBoard } from '../../../../Redux/Slices/MyLikeBoardSlice'

const styles = StyleSheet.create({
  container:{
    height: '92%',
    backgroundColor: 'white',
    paddingLeft: 10,
    paddingRight: 10,
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
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  videoImage:{
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'white',
    zIndex: 999
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


const Talk1 = ({navigation, route}:any) => {

  const dispatch = useDispatch();
  const info = useSelector((state:unknown) => { return state.myLikeBoard.data; });
  console.log('like board info: ', info);

  useEffect(()=>{
    dispatch(postMyLikeBoard());
  }, []);

  const ImageBox = ({item}:any) => {
    const arr:string[] = [];
    const a = (item.split('|')).filter((x:string) => { if(x.charAt(x.length-1) === '4'){ arr.push(x); }else return x;});
    const infoFiltering = [...arr, ...a];

    if(infoFiltering[0].charAt(infoFiltering[0].length-1) == '4'){
      return(
        <View style={styles.mainBoxSub}>
          <View style={styles.videoImage}><Icon name='play' size={17} style={{color: 'white'}}/></View>
          <Video source={{uri: `https://momsnote.s3.ap-northeast-2.amazonaws.com/board/${infoFiltering[0]}`}} style={{width: 68, height: 68}} resizeMode='cover'/>
        </View>
      )
    }else{
      return(
      <View style={styles.mainBoxSub}>
          <Image source={{uri: `https://momsnote.s3.ap-northeast-2.amazonaws.com/board/${item.split('|')[0]}`}} style={{width: 68, height: 68}}/>
      </View>
      )
    }
  }

  const renderItem2 = ({ item }:any) => (
    <TouchableOpacity style={styles.mainBox} onPress={()=>navigation.navigate('맘스토크 상세내용', {item})} activeOpacity={1}>
        { item.savedName == null ? '' : <ImageBox item={item.savedName}/>  }
        <View style={[styles.mainBoxSub, {paddingTop: 5, width: '65%', alignItems: 'flex-start'}]}>
          <Text style={{fontSize: 15, paddingTop: 2}} numberOfLines={1}>{item.title} </Text>
          <View style={styles.mainBoxSub2}>
            <Text style={{fontSize: 13, color: '#9E9E9E'}}>{item.nickname} </Text>
            <Like width={12} height={17} fill='#9E9E9E'/>
            <Text style={{color: '#9E9E9E'}}> {item.recommend}  </Text>
            <Chat width={12} height={18} fill='#9E9E9E'/>
            <Text style={{fontSize: 13, color: '#9E9E9E'}}> {item.commentsCount}</Text>
          </View>
        </View>
        <View style={[styles.dateBox, {justifyContent: 'center', alignItems: 'flex-end'}]}>
         <Text style={{color: '#9E9E9E', fontSize: 12}}>{moment(item.boardDate).format('YY-MM-DD')}</Text>
        </View>
    </TouchableOpacity>
  ); 

  return info == '0' ? <View style={{marginTop: 250, alignItems: 'center'}}><Text style={{color: '#757575', fontSize: 16}}>등록된 게시물이 없습니다.</Text></View>
  : (
    <View style={styles.container}>
        <FlatList data={info} renderItem={renderItem2}
          keyExtractor={(item, index) => String(index)} showsVerticalScrollIndicator={false}>
        </FlatList>
     </View>
  )
}

export default Talk1