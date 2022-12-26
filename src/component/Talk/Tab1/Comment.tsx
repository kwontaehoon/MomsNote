import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import axios from 'axios'

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
        top: 10
    },
    likeBox:{
        paddingLeft: 40,
        flexDirection: 'row',

    },
})
const Comment = ({info, commentsId, setCommentsId, setInsert, modal5, setModal5}) => {

    console.log('comment info: ', info);

    const [commentLike, setCommentLike] = useState();
    console.log('commentLike: ', commentLike);

    useEffect(()=>{
        const likeInfo = async() => {
            try{
                const response = await axios({
                    method: 'post',
                    url: 'https://momsnote.net/api/comments/recommend/flag',
                    headers: { 
                        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnb29nbGVfMTIzNDU2Nzg5MCIsImlkIjo0LCJpYXQiOjE2NzE1OTE0OTIsImV4cCI6MTY3NDE4MzQ5Mn0.d8GpqvEmnnrUZKumuL4OPzp7wSGXiTo47hGkCSM2HO0', 
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
    }, []);

    const List = () => {
        let arr = [];
        info.filter((x, index) => {
            if(x.step === 0){
            arr.push(
                <View key={index}>
                    <View style={styles.box}>
                        <TouchableOpacity style={styles.dotBox} onPress={()=>{setModal5(!modal5), setCommentsId(x.commentsId)}}><More /></TouchableOpacity>
                        <View style={styles.profileBox}></View>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{fontSize: 16, fontWeight: '600', paddingRight: 8}}>별똥이맘</Text>
                            <Text style={{fontSize: 13, fontWeight: '500', color: '#BDBDBD'}}>16분 전</Text>
                        </View>
                    </View>
                    <Text style={{paddingLeft: 45, fontSize: 15, marginBottom: 10}}>{x.contents}</Text>
                    <View style={styles.likeBox}>
                        <Like width={16} height={16} fill='#9E9E9E'/>
                        <Text style={{color: '#9E9E9E', fontSize: 13, paddingRight: 10}}> 추천 {x.recommend}</Text>
                        <Text style={{color: '#9E9E9E', fontSize: 13, fontWeight: '500'}} onPress={
                                ()=>{
                                    setInsert((prevState) => ({...prevState,
                                    boardId: x.boardId,    
                                    ref: x.ref,
                                    level: 1
                                }))
                            }
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
                        <View style={styles.dotBox}><More /></View>
                        <View style={styles.profileBox}></View>
                        <Text style={{fontSize: 16, fontWeight: '600', paddingRight: 8}}>별똥이맘</Text>
                        <Text style={{fontSize: 13, fontWeight: '500', color: '#BDBDBD'}}>16분 전</Text>
                    </View>
                    <Text style={{paddingLeft: 45, marginBottom: 10}}>{x.contents}</Text>
                    <View style={styles.likeBox}>
                        <TouchableOpacity><Like width={16} height={16} fill='#9E9E9E'/></TouchableOpacity>
                        <Text style={{color: '#9E9E9E', fontSize: 13, paddingRight: 10}}> 추천 {x.recommend}</Text>
                    </View>
                </View>
            )
            }
        })
        return arr;
    }

  return (
    <>
        <List />
        <View style={styles.commentRes}></View>
    </>
  )
}

export default Comment