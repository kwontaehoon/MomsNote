import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Image, Animated } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import Modal from './Modal/DotModal'
import Modal2 from './Modal/Block'
import Modal3 from './Modal/Declare'
import Modal4 from './Modal/DelareConfirm'
import Modal5 from './Modal/DotModal2'
import Comment from './Comment'

import Chat from '../../../../public/assets/svg/chat.svg'
import Like from '../../../../public/assets/svg/Like.svg'
import Back from '../../../../public/assets/svg/Back.svg'
import More from '../../../../public/assets/svg/More.svg'
import Share from '../../../../public/assets/svg/Share.svg'

const styles = StyleSheet.create({
    container:{
        height: '97%',
        backgroundColor: 'white',
        marginTop: getStatusBarHeight(),
    },
    header:{
        height: 60,
        justifyContent: 'center',
        padding: 20,
    },
    headerBar:{
        position: 'absolute',
        right: 20,
        alignItems: 'center',
        flexDirection: 'row',
    },
    header2:{
        flexDirection: 'row',
        height: 70,
        alignItems: 'flex-end',
        paddingLeft: 20,
        borderTopWidth: 1,
        borderColor: '#F5F5F5',
    },
    profileBox:{
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
    },
    infoBox:{
        height: 42,
        marginLeft: 7,
    },
    main:{
        height: 800,
        borderBottomWidth: 1,
        borderColor: '#EEEEEE'
    },
    mainBox:{
        height: 70,
        padding: 20,
    },
    mainBox2:{
        padding: 20,
    },
    mainBox2ImageBox:{
        height: 400,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainBox2ImageBox2:{
        height: 150,
        flexDirection: 'row',
        padding: 10,
    },
    image:{
        width: '95%',
        height: '95%',
        borderRadius: 4,
    },
    image2:{
        width: '100%',
        height: '100%',
        borderRadius: 4,
    },
    imageBox:{
        width: '31%',
        height: 114,
        borderRadius: 4,
        margin: 5,
    },
    mainBox3:{
        height: 50,
        flexDirection: 'row',
        borderColor: '#F5F5F5',
        borderBottomWidth: 1,
        paddingLeft: 20,
        alignItems: 'center'
    },
    likeBox:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    lookupBox:{
        position: 'absolute',
        right: 20,
    },
    mainBox4:{
        height: 200,
        padding: 20,
        paddingTop: 30,
    },
    commentBox:{
        borderWidth: 1,
        height: 70,

    },
    commentProfile:{
        height: 40,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    dotBox:{

    },
    footer:{
        width: '100%',
        height: 70,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#F5F5F5',
        position: 'absolute',
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    profileBox2:{
        width: 40,
        height: 40,
        borderWidth: 1,
        borderRadius: 20,
    },
    textInput:{
        borderRadius: 99,
        width: '80%',
        height: 40,
        marginLeft: 12,
        paddingLeft: 12,
        backgroundColor: '#F5F5F5'
    },
    alarmBox:{
        width: '100%',
        height: 40,
        bottom: 90,
        position: 'absolute',
        alignItems: 'center',
        opacity: 0.7,
    },
    alarm:{
        width: '90%',
        height: '100%',
        borderRadius: 5,
        paddingLeft: 15,
        justifyContent: 'center',
        backgroundColor: 'black',
    }
})
const Talk1Sub = ({navigation, route}) => {

    const info = [route.params];
    console.log('info: ', info);
    console.log(info[0].savaName === undefined);

    const [comment, setComment] = useState([]);
    const [modal, setModal] = useState(false); // dot 모달 다른사람게시판 차단 및 신고
    const [modal2, setModal2] = useState(false); // 차단하기
    const [modal3, setModal3] = useState(false); // 차단 확인
    const [modal4, setModal4] = useState(false); // 신고 확인
    const [modal5, setModal5] = useState(false) // dot2 모달 본인게시판 수정 및 삭제
    const animation = useRef(new Animated.Value(0)).current;

    const ImageBox = () => {

        switch(info[0].savedName.split('|').length){
            case 1: return(
                <TouchableOpacity style={styles.mainBox2ImageBox} onPress={()=>navigation.navigate('갤러리', info[0].savedName)}>
                    <Image source={{uri: `https://momsnote.s3.ap-northeast-2.amazonaws.com/board/${info[0].savedName.split('|')[0]}`}} style={styles.image}/>
                </TouchableOpacity>
            )
            case 2: return(
                <View style={styles.mainBox2ImageBox2}>
                    <TouchableOpacity style={styles.imageBox} onPress={()=>navigation.navigate('갤러리', info[0].savedName)}>
                        <Image source={{uri: `https://momsnote.s3.ap-northeast-2.amazonaws.com/board/${info[0].savedName.split('|')[0]}`}} style={styles.image2}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.imageBox} onPress={()=>navigation.navigate('갤러리', info[0].savedName)}>
                        <Image source={{uri: `https://momsnote.s3.ap-northeast-2.amazonaws.com/board/${info[0].savedName.split('|')[1]}`}} style={styles.image2}/>
                    </TouchableOpacity>
                </View>
            )
            case 3: return(
                <View style={styles.mainBox2ImageBox2}>
                    <TouchableOpacity style={styles.imageBox} onPress={()=>navigation.navigate('갤러리', info[0].savedName)}>
                        <Image source={{uri: `https://momsnote.s3.ap-northeast-2.amazonaws.com/board/${info[0].savedName.split('|')[0]}`}} style={styles.image2}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.imageBox} onPress={()=>navigation.navigate('갤러리', info[0].savedName)}>
                        <Image source={{uri: `https://momsnote.s3.ap-northeast-2.amazonaws.com/board/${info[0].savedName.split('|')[1]}`}} style={styles.image2}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.imageBox} onPress={()=>navigation.navigate('갤러리', info[0].savedName)}>
                        <Image source={{uri: `https://reactnative.dev/img/tiny_logo.png`}} style={styles.image2}/>
                    </TouchableOpacity>
                </View>
            )
            default: return(
                <View style={styles.mainBox2ImageBox2}>
                    <TouchableOpacity style={styles.imageBox} onPress={()=>navigation.navigate('갤러리')}>
                        <Image source={{uri: `https://momsnote.s3.ap-northeast-2.amazonaws.com/board/${info[0].savedName.split('|')[0]}`}} style={styles.image2}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.imageBox} onPress={()=>navigation.navigate('갤러리', info[0].savedName)}>
                        <Image source={{uri: `https://momsnote.s3.ap-northeast-2.amazonaws.com/board/${info[0].savedName.split('|')[1]}`}} style={styles.image2}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.imageBox} onPress={()=>navigation.navigate('갤러리', info[0].savedName)}>
                        <Image source={{uri: `https://reactnative.dev/img/tiny_logo.png`}} style={styles.image2}/>
                        <View style={{position: 'absolute', top: '40%', left: '40%'}}><Text style={{color: 'white', fontSize: 20, fontWeight: '600'}}>+{info[0].savedName.split('|').length-3}</Text></View>
                    </TouchableOpacity>
                </View>
            )
        }
       
        
    }

    const opacity_ani = () => {
        Animated.timing(animation, {
            toValue: 1,
            useNativeDriver: true,
            duration: 1500,
        }).start(()=>{
            Animated.timing(animation, {
                toValue: 0,
                useNativeDriver: true,
                duration: 1500,
            }).start();
        });
    }

    const renderItem = ({ item }) => (
        <View>
            <View style={styles.header2}>
                <View style={styles.profileBox}></View>
                <View style={styles.infoBox}>
                    <Text style={{color: '#212121', fontSize: 16, fontWeight: '500'}}>{item.userId}</Text>
                    <Text style={{color: '#9E9E9E', fontSize: 13}}>{item.boardDate}</Text>
                </View>
            </View>
            <View style={styles.main}>
                <View style={styles.mainBox}>
                    <Text style={{fontSize: 20, fontWeight: '400'}}>{item.title}</Text>
                </View>
                <View style={styles.mainBox2}>
                    <Text>{item.contents}</Text>
                </View>
                {item.savedName === null ? <View></View> : ImageBox()}
                <View style={styles.mainBox3}>
                    <View style={styles.likeBox}>
                        <Like width={16} height={16} fill='#9E9E9E'/>
                        <Text style={{color: '#9E9E9E', fontSize: 13, paddingRight: 10}}> 추천 13</Text>
                        <Chat width={16} height={16}/>
                        <Text style={{color: '#9E9E9E', fontSize: 13}}> 댓글 5</Text>
                    </View>
                    <View style={styles.lookupBox}>
                        <Text style={{fontSize: 13, color: '#9E9E9E'}}>조회수 134</Text>
                    </View>
                </View>
                <View style={styles.mainBox4}>
                    {comment.length === 0 ?
                    <Comment />:
                    <View style={{alignItems: 'center', justifyContent: 'center', paddingTop: 60}}>
                        <Text style={{color: '#757575', fontSize: 15}}>아직 댓글이 없습니다.</Text>
                        <Text style={{color: '#757575', fontSize: 15}}>먼저 댓글을 남겨 소통을 시작해보세요!</Text>
                    </View>}
                </View>
            </View>
        </View>
      );


  return (
    <View style={styles.container}>

        <Animated.View style={[styles.alarmBox, {opacity: animation}]}>
            <View style={styles.alarm}><Text style={{color: 'white', fontSize: 13, fontWeight: '500'}}>차단하였습니다.</Text></View>
        </Animated.View>

        <Modal modal={modal} setModal={setModal} modal2={modal2} setModal2={setModal2} modal3={modal3} setModal3={setModal3}/>
        <Modal2 modal2={modal2} setModal2={setModal2} modal={modal} setModal={setModal}/>
        <Modal3 modal3={modal3} setModal3={setModal3} modal4={modal4} setModal4={setModal4}/>
        <Modal4 modal4={modal4} setModal4={setModal4} />
        <Modal5 modal5={modal5} setModal5={setModal5}/>

        <View style={styles.header}>
                <Back onPress={()=>navigation.goBack()}/>
                <View style={styles.headerBar}>
                    <Share style={{marginRight: 12}}/>
                    <More style={{marginRight: 5}} onPress={()=>setModal(!modal)}/> 
                </View>
        </View>

        <FlatList data={info} renderItem={renderItem}
            keyExtractor={item => item.id}>
        </FlatList>
        <View style={styles.footer}>
            <View style={styles.profileBox2}></View>
            <TextInput style={styles.textInput} placeholder='댓글을 입력해주세요.' placeholderTextColor={'#BDBDBD'}></TextInput>
        </View>
    </View>
  )
}

export default Talk1Sub