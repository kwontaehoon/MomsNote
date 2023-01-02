import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Keyboard } from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux'
import { postComment } from '../../../Redux/Slices/CommentSlice'

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

    const dispatch = useDispatch();
    const [commentLike, setCommentLike] = useState(); // 댓글 추천 여부

    useEffect(()=>{
        const likeInfo = async() => { // 댓글 추천 Flag
            try{
                const response = await axios({
                    method: 'post',
                    url: 'https://momsnote.net/api/comments/recommend/flag',
                    headers: { 
                        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnb29nbGVfMTIzNDU2Nzg5MCIsImlkIjo0LCJpYXQiOjE2NzE1MjMyMDMsImV4cCI6MTY3NDExNTIwM30.dv8l7-7MWKAPpc9kXwxxgUSy84pz_7gvpsJPpa4TX0M', 
                        'Content-Type': 'application/json'
                    },
                    data: { boardId : info[0].boardId }
                });
                setCommentLike(response.data);
            }catch(error){
                console.log('comment like axios error');
            }
        }
        likeInfo();
    }, [commentLike]);

    const commentplus = async(id) => { // 댓글 추천
        console.log('likeComment');
        // try{
        //     const response = await axios({ 
        //           method: 'post',
        //           url: 'https://momsnote.net/api/comments/recommend',
        //           headers: { 
        //             'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnb29nbGVfMTIzNDU2Nzg5MCIsImlkIjo0LCJpYXQiOjE2NzE1MjMyMDMsImV4cCI6MTY3NDExNTIwM30.dv8l7-7MWKAPpc9kXwxxgUSy84pz_7gvpsJPpa4TX0M', 
        //             'Content-Type': 'application/json'
        //           },
        //           data: {
        //             boardId: info[0].boardId,
        //             commentsId: id,
        //             type: 'plus'
        //           }
        //         });
        //         console.log('response: ', response.data);
        //     }catch(error){
        //       console.log('error: ', error);
        //     }
            setCommentLike();
            dispatch(postComment(commentData));
    }

    const List = () => {
        let arr = [];
        info.filter((x, index) => {
            if(x.step === 0){
                arr.push(
                    <View key={index}>
                        <View style={styles.box}>
                            <TouchableOpacity style={styles.dotBox} onPress={()=>{setModal(!modal), setCommentsId([x.userId, x.commentsId])}}><More /></TouchableOpacity>
                            <View style={styles.profileBox}></View>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={{fontSize: 16, fontWeight: '600', paddingRight: 8}}>{x.nickname}</Text>
                                <Text style={{fontSize: 13, fontWeight: '500', color: '#BDBDBD'}}>16분 전</Text>
                            </View>
                        </View>
                        <Text style={{paddingLeft: 45, fontSize: 15, marginBottom: 10}}>{x.contents}</Text>
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
                                        level: 1
                                    }))
                                    setCommentsId(x.nickname);}
                                }>댓글달기
                            </Text> 
                        </View>
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
                        <View style={styles.profileBox}></View>
                        <Text style={{fontSize: 16, fontWeight: '600', paddingRight: 8}}>{x.nickname}</Text>
                        <Text style={{fontSize: 13, fontWeight: '500', color: '#BDBDBD'}}>16분 전</Text>
                    </View>
                    <Text style={{paddingLeft: 45, marginBottom: 10}}>{x.contents}</Text>
                    <View style={styles.likeBox}>
                        {commentLike.includes(x.commentsId) ? <Like2 width={16} height={16} fill='#FE9000'/>
                        :
                        <Like width={16} height={16} fill='#9E9E9E' onPress={()=>commentplus(x.commentsId)}/>}
                        {commentLike.includes(x.commentsId) ? <Text style={{color: '#FE9000', fontSize: 13, paddingRight: 10}}> 추천 {x.recommend}</Text>
                        :
                        <Text style={{color: '#9E9E9E', fontSize: 13, paddingRight: 10}}> 추천 {x.recommend}</Text>}
                    </View>
                </View>
            )
            }
        })
        return arr;
    }

  return commentLike !== undefined ?(
    <>
        <List />
        <View style={styles.commentRes}></View>
    </>
  ): <View></View>
}

export default Comment