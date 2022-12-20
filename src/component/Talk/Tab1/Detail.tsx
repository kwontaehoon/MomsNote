import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Image, Animated } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/AntDesign'
import Modal from './Modal/DotModal'
import Modal2 from './Modal/Block'
import Modal3 from './Modal/Declare'
import Modal4 from './Modal/DelareConfirm'

import Chat from '../../../../public/assets/svg/Chat.svg'
import Like from '../../../../public/assets/svg/like.svg'
import Back from '../../../../public/assets/svg/Back.svg'
import More from '../../../../public/assets/svg/More.svg'
import Share from '../../../../public/assets/svg/Share.svg'

const styles = StyleSheet.create({
    container:{
        height: '96%',
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
        borderWidth: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainBox2ImageBox2:{
        borderWidth: 1,
        height: 150,
        flexDirection: 'row',
        padding: 10,
    },
    image:{
        borderWidth: 1,
        width: '90%',
        height: '90%',
    },
    image2:{
        borderWidth: 1,
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
    },
    likeBox:{
        width: '60%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
    },
    lookupBox:{
        width: '40%',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: 20,
    },
    mainBox4:{
        height: 200
    },
    footer:{
        height: 60,
        flexDirection: 'row',
        borderWidth: 1,
        alignItems: 'center',
        padding: 20,
        borderColor: '#F5F5F5'
    },
    profileBox2:{
        width: 40,
        height: 40,
        borderWidth: 1,
        borderRadius: 20,
    },
    textInput:{
        borderRadius: 99,
        width: 306,
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

    const [comment, setComment] = useState([]);
    const [modal, setModal] = useState(false); // dot 모달
    const [modal2, setModal2] = useState(false); // 차단하기
    const [modal3, setModal3] = useState(false); // 차단 확인
    const [modal4, setModal4] = useState(false); // 신고 확인
    const animation = useRef(new Animated.Value(0)).current;

    const ImageBox = () => {
        console.log('이미지길이: ', info[0].image.length);

        let arr = [];
        info.filter((x, index)=>{
            console.log(x);
        });

        return(
            <View style={styles.mainBox2ImageBox2}>
                <TouchableOpacity style={styles.image2} onPress={()=>navigation.navigate('갤러리')}></TouchableOpacity>
                <View style={styles.image2}></View>
                <View style={styles.image2}>
                    <Image source={require('../../../../public/assets/testimage.png')} style={{width: '100%', height: '100%'}} />
                    <View style={{position: 'absolute', top: '40%', left: '40%'}}><Text style={{color: 'white', fontSize: 20, fontWeight: '600'}}>+2</Text></View>
                </View>
            </View>
        )
        // return(
        //     <View style={styles.mainBox2ImageBox}>
        //         <Image source={require('../../../../public/assets/testimage.png')} style={styles.image} resizeMethod='resize'/>
        //     </View>
        // )
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
            <View style={styles.header}>
                <Back onPress={()=>navigation.goBack()}/>
                <View style={styles.headerBar}>
                    <Share style={{marginRight: 8}}/>
                    <More onPress={()=>setModal(!modal)}/>
                </View>
            </View>
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
                {ImageBox()}
                <View style={styles.mainBox3}>
                    <View style={styles.likeBox}>
                        <Like width={16} height={16}/>
                        <Text style={{color: '#9E9E9E', fontSize: 13, paddingRight: 10}}> 추천 13</Text>
                        <Chat width={16} height={16}/>
                        <Text style={{color: '#9E9E9E', fontSize: 13}}> 댓글 5</Text>
                    </View>
                    <View style={styles.lookupBox}>
                        <Text style={{fontSize: 13, color: '#9E9E9E'}}>조회수 134</Text>
                    </View>
                </View>
                <View style={styles.mainBox4}>
                    {comment.length !== 0 ?
                    <View style={styles.commentBox}>
                        <Text></Text>
                    </View> :
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