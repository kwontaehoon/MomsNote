import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Keyboard, Image } from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSelector, useDispatch } from 'react-redux'
import { postComment } from '../../../Redux/Slices/CommentSlice'
import { postCommentFlag } from '../../../Redux/Slices/CommentFlag'
import moment from 'moment'

import Like from '../../../../public/assets/svg/Like.svg'
import Like2 from '../../../../public/assets/svg/Heart-1.svg'
import More from '../../../../public/assets/svg/More.svg'

const styles = StyleSheet.create({
    container:{

    },
    box:{
        paddingLeft: 12,
        paddingTop: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileBox:{
        borderWidth: 1,
        width: 28,
        height: 28,
        borderRadius: 14,
        marginRight: 5,
    },
    dotBox:{
        position: 'absolute',
        right: 5,
        top: 10,
    },
    likeBox:{
        paddingLeft: 40,
        flexDirection: 'row',

    },
})
const Comment = ({info, setCommentsId, setInsert, modal, setModal, commentData}) => {


    const commentLike = useSelector(state => { return state.commentFlag.data; });

    const dispatch = useDispatch();

    const commentplus = async(id) => { // 댓글 추천
        console.log('likeComment');
        const token = await AsyncStorage.getItem('token');
        try{
            const response = await axios({ 
                  method: 'post',
                  url: 'https://momsnote.net/api/comments/recommend',
                  headers: { 
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json'
                  },
                  data: {
                    boardId: info[0].boardId,
                    commentsId: id,
                    type: 'plus'
                  }
                });
                console.log('response: ', response.data);
            }catch(error){
              console.log('error: ', error);
            }
            dispatch(postComment(commentData));
            dispatch(postCommentFlag({boardId: info[0].boardId}));
    }

    const dayCalculate = (date:number) => {
        
        switch(true){
          case moment().diff(moment(date), 'minute') < 60: return <Text style={{color: '#9E9E9E', fontSize: 12}}>{moment().diff(moment(date), 'minute')}분 전</Text>
          case moment().diff(moment(date), 'hour') < 24: return<Text style={{color: '#9E9E9E', fontSize: 12}}>{moment().diff(moment(date), 'hour')}시간 전</Text>
          default: return <Text style={{color: '#9E9E9E', fontSize: 12}}>{moment().diff(moment(date), 'day')}일 전</Text>
        }
      }

    const List = () => {
        let arr = [];
        info.filter((x, index) => {
            console.log('x: ', x.commentsDate);
            if(x.step === 0){
                arr.push(
                    
                    <View key={index}>
                        <View style={styles.box}>
                            <TouchableOpacity style={styles.dotBox} onPress={()=>{setModal(!modal), setCommentsId([x.userId, x.commentsId])}}><More /></TouchableOpacity>
                                <Image source={{uri: `https://momsnote.s3.ap-northeast-2.amazonaws.com/profile/${x.profileImage}`}} style={styles.profileBox}/>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={{fontSize: 16, fontWeight: '600', paddingRight: 8}}>{x.nickname}</Text>
                                <Text style={{fontSize: 13, fontWeight: '500', color: '#BDBDBD'}}>{dayCalculate(x.commentsDate)}</Text>
                            </View>
                        </View>
                        
                        { x.deleteFlag ? <View style={{paddingLeft: 45, fontSize: 15, marginBottom: 10, marginRight: 25, lineHeight: 20}}>
                            <Text>삭제된 댓글입니다.</Text></View> : <View>
                        <Text style={{paddingLeft: 45, fontSize: 15, marginBottom: 10, marginRight: 25, lineHeight: 20}}>{x.contents}</Text>
                        <View style={styles.likeBox}>
                            {commentLike.includes(x.commentsId) ? <Like2 width={16} height={16} fill='#FE9000'/>
                            :
                            <Like width={16} height={16} fill='#9E9E9E' onPress={()=>commentplus(x.commentsId)}/>}
                            {commentLike.includes(x.commentsId) ? <Text style={{color: '#FE9000', fontSize: 13, paddingRight: 10}}> 추천 {x.recommend}</Text>
                            :
                            <Text style={{color: '#9E9E9E', fontSize: 13, paddingRight: 10}}> 추천 {x.recommend}</Text>}
                            <Text style={{color: '#9E9E9E', fontSize: 13, fontWeight: '500'}} onPress={
                                    ()=>{
                                        setInsert((prevState) => ({...prevState,
                                        boardId: x.boardId,    
                                        ref: x.ref,
                                        level: 1})),
                                        setCommentsId(x.nickname);}
                                }>댓글달기
                            </Text> 
                        </View>
                        </View>}
                        <List2 number={x.ref}/>
                    </View>
                )
            }
        })
        return arr;
    }
    
    const List2 = (e) => {
        let arr = [];
        info.filter((x, index)=>{
            if(e.number === x.ref && x.level === 1){
            arr.push(
                <View style={{paddingLeft: 27}} key={index}>
                    <View style={styles.box}>
                        <TouchableOpacity style={styles.dotBox} onPress={()=>{setModal(!modal), setCommentsId([x.userId, x.commentsId])}}><More /></TouchableOpacity>
                            <Image source={{uri: `https://momsnote.s3.ap-northeast-2.amazonaws.com/profile/${x.profileImage}`}} style={styles.profileBox}/>
                        <Text style={{fontSize: 16, fontWeight: '600', paddingRight: 8}}>{x.nickname}</Text>
                        <Text style={{fontSize: 13, fontWeight: '500', color: '#BDBDBD'}}>{dayCalculate(x.commentsDate)}</Text>
                    </View>
                  
                  { x.deleteFlag ? <View style={{paddingLeft: 45, fontSize: 15, marginBottom: 10, marginRight: 25, lineHeight: 20}}>
                            <Text>삭제된 댓글입니다.</Text></View> : <View>
                    <Text style={{paddingLeft: 45, fontSize: 15, marginBottom: 10, marginRight: 25, lineHeight: 20}}>{x.contents}</Text>
                    <View style={styles.likeBox}>
                        {commentLike.includes(x.commentsId) ? <Like2 width={16} height={16} fill='#FE9000'/>
                        :
                        <Like width={16} height={16} fill='#9E9E9E' onPress={()=>commentplus(x.commentsId)}/>}
                        {commentLike.includes(x.commentsId) ? <Text style={{color: '#FE9000', fontSize: 13, paddingRight: 10}}> 추천 {x.recommend}</Text>
                        :
                        <Text style={{color: '#9E9E9E', fontSize: 13, paddingRight: 10}}> 추천 {x.recommend}</Text>}
                    </View>
                    </View>}
                </View>
            )
            }
        })
        return arr;
    }

  return commentLike !== '' | commentLike !== undefined ? (
    <>
        <List />
        <View style={styles.commentRes}></View>
    </>
  ): <View><Text>gg</Text></View>
}

export default Comment