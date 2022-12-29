import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const styles = StyleSheet.create({
    modalContainer:{
        justifyContent: "center",
        alignItems: "center",
    },
    modalView:{
        width: '100%',
        height: '100%',
        backgroundColor: "rgba(0,0,0,0.5)",
        alignItems: "center",
        justifyContent: 'flex-end',
        shadowColor: "#000",
        elevation: 5,
    },
    modalContainer2:{
        width: '94%',
        borderRadius: 15,
        marginBottom: 20,
    },
    main:{
        height: 124,
        backgroundColor: '#424242',
        borderRadius: 10,
        justifyContent: 'center'
    },
    mainBox:{
        height: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 1,
        borderColor: '#757575'
    
    },
    footer:{
        height: 62,
        backgroundColor: '#424242',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderColor: '#757575',
        borderWidth: 1,
    }
})

const CheckBoxModal = ({navigation, modal, setModal, modal2, setModal2, modal3, setModal3, modal6, setModal6, commentsId, info, setBoardState}) => {

    const [userId, setUserId] = useState();
    // console.log('dot modal comments userId: ', commentsId[0]);
    // console.log('dot modal comments commentsId: ', commentsId[1]);
    // console.log(commentsId);
    
     useEffect(()=>{
        const getUserId = async() => {
            const a = await AsyncStorage.getItem('userId');
            setUserId(Number(a));
        }
        getUserId();
    }, []);

    const BoardDelete = async() => {
        try{
            const response = await axios({
                  method: 'delete',
                  url: 'https://momsnote.net/api/board/delete',
                  headers: { 
                    'Authorization': 'bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnb29nbGVfMTIzNDU2Nzg5MCIsImlkIjo0LCJpYXQiOjE2NzE2MDc1MTksImV4cCI6MTY3NDE5OTUxOX0.AWDHv0yNHklAEqHCojyNWWf0vb38L5dT-jFll4fE6Bk', 
                    'Content-Type': 'application/json'
                  },
                  data: { boardId: info[0].boardId }
                });
                console.log('response: ', response.data);
            }catch(error){
              console.log('error: ', error);
            }
        setBoardState(info[0].boardId);
    }

    const CommentDelete = async() => {
        try{
            const response = await axios({
                  method: 'delete',
                  url: 'https://momsnote.net/api/comments/delete',
                  headers: { 
                    'Authorization': 'bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnb29nbGVfMTIzNDU2Nzg5MCIsImlkIjo0LCJpYXQiOjE2NzE2MDc1MTksImV4cCI6MTY3NDE5OTUxOX0.AWDHv0yNHklAEqHCojyNWWf0vb38L5dT-jFll4fE6Bk', 
                    'Content-Type': 'application/json'
                  },
                  data: { commentsId: commentsId[1] }
                });
                console.log('response: ', response.data);
            }catch(error){
              console.log('error: ', error);
            }
            setRecommendState(false);
    }

    const DotFilter = () => {

        switch(true){
            case commentsId[0] !== undefined && commentsId[0] === userId: return(
                <View style={[styles.main, {height: 62}]}>
                    <TouchableOpacity style={[styles.mainBox, {borderColor: '#424242'}]} onPress={()=>{setModal(!modal), CommentDelete()}}><Text style={{color: '#F23737', fontSize: 20}}>삭제하기</Text></TouchableOpacity>
                </View>
            );
            case commentsId[0] !== undefined && commentsId[0] !== userId: return(
                <View style={[styles.main, {height: 62}]}>
                    <TouchableOpacity style={[styles.mainBox, {borderColor: '#424242'}]} onPress={()=>{setModal(!modal), setModal6(!modal6)}}><Text style={{color: '#F23737', fontSize: 20}}>신고하기</Text></TouchableOpacity>
                </View>
            );
            case info[0].userId == userId: return(
                <View style={styles.main}>
                        <TouchableOpacity style={styles.mainBox} onPress={()=>{setModal(!modal), setModal2(!modal2)}}><Text style={{color: '#1E88E5', fontSize: 20}}>게시물 수정</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.mainBox} onPress={()=>{setModal(!modal), BoardDelete(), navigation.goBack('1234')}}><Text style={{color: '#F23737', fontSize: 20}}>삭제하기</Text></TouchableOpacity>
                </View>
            )
            
            default: return(
                <View style={styles.main}>
                        <TouchableOpacity style={styles.mainBox} onPress={()=>{setModal(!modal), setModal2(!modal2)}}><Text style={{color: '#1E88E5', fontSize: 20}}>차단하기</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.mainBox} onPress={()=>{setModal(!modal), setModal3(!modal3)}}><Text style={{color: '#1E88E5', fontSize: 20}}>신고하기</Text></TouchableOpacity>
                </View>
            )
        }
    }

  return (
    <Modal animationType="fade" transparent={true} visible={modal} statusBarTranslucent={true}
            onRequestClose={() => {
            setModal(!modal)}}>
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <View style={styles.modalContainer2}>
                        <DotFilter />
                        <View style={{height: 10}}></View>
                        <TouchableOpacity style={styles.footer} onPress={()=>setModal(!modal)}>
                            <Text style={{color: '#1E88E5', fontWeight: '600', fontSize: 20}}>취소</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
  )
}

export default CheckBoxModal