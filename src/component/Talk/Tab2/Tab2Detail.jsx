import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/AntDesign'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { postShareList } from '../../../Redux/Slices/ShareList'

import Chat from '../../../../public/assets/svg/Chat.svg'
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
        borderBottomWidth: 1,
        borderColor: '#EEEEEE',
        padding: 20,
    },
    mainBox:{
        height: 70,

    },
    mainBox2:{
        height: 60,
    },
    mainBox3:{

    },
    listBox:{
        height: 400,
    },
    listHeader:{
        height: 40,
        backgroundColor: '#F47A79',
        alignItems: 'center',
        justifyContent: 'center',
    },
    arrowBox:{
        position: 'absolute',
        right: 15,
    },
    sum:{
        height: 130,
        borderWidth: 1,
        borderBottomWidth: 0,
        borderColor: '#EEEEEE',
        justifyContent: 'center',
    },
    myList2FooterBox:{
        height: 50,
        justifyContent: 'center',
        paddingLeft: 15,
    },
    budget:{
        position: 'absolute',
        right: 15,
    },
    compare:{
        alignItems: 'center',
        borderWidth: 1,
        borderTopWidth: 0,
        borderColor: '#EEEEEE',
        height: 70,
    },
    compareButton:{
        borderRadius: 4,
        backgroundColor: '#FEA100',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        height: 50,
    },
    mainBox4:{
        borderBottomWidth: 1,
        borderColor: '#F5F5F5',
        paddingLeft: 15,
        height: 50,
        justifyContent: 'center',
    },
    likeBox:{
        width: '60%',
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    lookupBox:{
        position: 'absolute',
        right: 20,
    },
    listMain:{
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EEEEEE',
        paddingLeft: 15,
        paddingRight: 15
    },
    listMain2:{
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: '#F5F5F5'
    },
    filterBox:{
        width: '33.4%',
        height: 30,
        alignItems: 'center',
        justifyContent: 'center'
      },
    filterBox2:{
        width: '33.4%',
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    mainBox5:{
        height: 300,
    },
    footer:{
        width: '100%',
        paddingTop: 10,
        height: 70,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#F5F5F5',
        justifyContent: 'center',
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
        width: 306,
        height: 40,
        marginLeft: 12,
        paddingLeft: 12,
        backgroundColor: '#F5F5F5'
    },
})
const Talk1Sub = ({navigation, route}) => {

    const DATA = [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: '전체'
        },
    ];

    const DATA2 =[
        {
          id: '0',
          title: '산모용품',
          icon: require('../../../../public/assets/image/1.png'),
        },
        {
          id: '1',
          title: '수유용품',
          icon: require('../../../../public/assets/image/2.png'),
        },
        {
          id: '2',
          title: '위생용품',
          icon: require('../../../../public/assets/image/3.png'),
        },
        {
          id: '3',
          title: '목욕용품',
          icon: require('../../../../public/assets/image/4.png'),
        },
        {
          id: '4',
          title: '침구류',
          icon: require('../../../../public/assets/image/5.png'),
        },
        {
          id: '5',
          title: '아기의류',
          color: '#FFADAD',
          icon: require('../../../../public/assets/image/6.png'),
        },
        {
          id: '6',
          title: '발육용품',
          icon: require('../../../../public/assets/image/7.png'),
        },
        {
          id: '7',
          title: '가전용품',
          color: '#FFADAD',
          icon: require('../../../../public/assets/image/8.png'),
        },
        {
          id: '8',
          title: '놀이용품',
          icon: require('../../../../public/assets/image/9.png'),
        },
    ];

    const [info, setInfo] = useState();
    console.log('출산리스트 공유 상세페이지 info: ', info);
    const shareList = useSelector(state => { return state.shareList.data; });
    console.log('shareList: ', shareList);
    const [comment, setComment] = useState([]); // 댓글 데이터
    const [list, setList] = useState(Array.from({length: 8}, () => {return false})); // list display

    useEffect(()=>{
        if(shareList !== '' || shareList !== undefined){
            setInfo(shareList.filter(x=> x.boardId == route.params.boardId));
        }
    }, [shareList]);

    const dayCalculate = (date) => {
        switch(true){
          case moment().diff(moment(date), 'minute') < 60: return <Text style={{color: '#9E9E9E', fontSize: 12}}>{moment().diff(moment(date), 'minute')}분 전</Text>
          case moment().diff(moment(date), 'hour') < 24: return<Text style={{color: '#9E9E9E', fontSize: 12}}>{moment().diff(moment(date), 'hour')}시간 전</Text>
          default: return <Text style={{color: '#9E9E9E', fontSize: 12}}>{moment().diff(moment(date), 'day')}일 전</Text>
        }
    }

    const List = () => {
        let arr = [];
        DATA2.map((x, index) => {
            arr.push(
                <>
                    <View style={styles.listMain} key={index}>
                        <TouchableOpacity style={styles.arrowBox}
                            onPress={()=>arrow(x.id)}>{list[x.id] ? <Icon name="angle-up" size={22}/> : <Icon name='angle-down' size={22}/>}
                        </TouchableOpacity>
                        <Image source={x.icon} width={20} height={20}/>
                        <Text style={{fontSize: 15}}>{x.title}</Text>
                    </View>
                    <View style={styles.listMain2}>
                        <View style={styles.filterBox}><Text>품목</Text></View>
                        <View style={styles.filterBox}><Text>브랜드</Text></View>
                        <View style={styles.filterBox}><Text>금액</Text></View>
                    </View>
                    <List2 title={x.title}/>
                </>
            )
        })
        return arr;
    }

    const List2 = (e) => {
        let arr = [];
        info.filter((x, index)=>{
            if(x.category == e.title){
                arr.push(
                     <View style={styles.listMain2} key={index}>
                        <View style={styles.filterBox2}><Text>{x.needsName}</Text></View>
                        <View style={styles.filterBox2}><Text>{x.itemName}</Text></View>
                        <View style={styles.filterBox2}><Text>{x.itemPrice} 원</Text></View>
                    </View>
                )
            }
        })
        return arr;
    }

    const arrow = (e) => { // arrow 누르면 서브페이지 display
        let arr = [...list];
        arr[e] = !arr[e];
        setList(arr);
    }

    const renderItem = ({ item }) => (
        <View>
            <View style={styles.header2}>
                <View style={styles.profileBox}></View>
                <View style={styles.infoBox}>
                    <Text style={{color: '#212121', fontSize: 16, fontWeight: '500'}}>{route.params.nickname}</Text>
                    <Text style={{color: '#9E9E9E', fontSize: 13}}>{dayCalculate(item.boardDate)}</Text>
                </View>
            </View>
            <View style={styles.main}>
                <View style={styles.mainBox}>
                    <Text style={{fontSize: 20, fontWeight: '400'}}>{route.params.title}</Text>
                </View>
                <View style={styles.mainBox2}>
                    <Text>{route.params.contents}</Text>
                </View>
                <View style={styles.mainBox3}>

                    <View style={styles.listHeader}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{fontSize: 15, fontWeight: '600', color: 'white'}}>{route.params.nickname}</Text>
                            <Text style={{fontSize: 15, color: 'white'}}> 님의 출산준비물</Text>
                        </View>
                    </View>

                    <ScrollView style={styles.listBox} nestedScrollEnabled={true}>
                        <List />
                    </ScrollView>

                    <View style={styles.sum}>
                            <View style={styles.myList2FooterBox}>
                                <View style={styles.budget}><Text style={{fontSize: 18, fontWeight: '600'}}>119,700 원</Text></View>
                                <Text style={{fontSize: 18, fontWeight: '600'}}>총 예산</Text>
                            </View>
                            <View style={[styles.myList2FooterBox, {paddingLeft: 20, height: 25}]}>
                                <View style={styles.budget}><Text>119,700 원</Text></View>
                                <Text style={{color: '#616161'}}>ㄴ 구매금액</Text>
                            </View>
                            <View style={[styles.myList2FooterBox, {paddingLeft: 20, height: 25}]}>
                                <View style={styles.budget}><Text>119,700 원</Text></View>
                                <Text style={{color: '#616161'}}>ㄴ 구매예정 금액</Text>
                            </View>
                        </View>
                        <View style={styles.compare}>
                            <TouchableOpacity style={styles.compareButton} onPress={()=>navigation.navigate('출산리스트 비교', route.params.boardId)}>
                                <Text style={{fontSize: 16, fontWeight: '600', color: 'white'}}>내 출산리스트와 비교하기</Text>
                            </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.mainBox4}>
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
                <View style={styles.mainBox5}>
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

      const renderItem2 = ({ item }) => (
        <View style={styles.listBox}>
            
        </View>
      );

  return info !== undefined && info !== '' ? (
    <View style={styles.container}>
         <View style={styles.header}>
                <Back onPress={()=>navigation.goBack()}/>
                <View style={styles.headerBar}>
                    <Share style={{marginRight: 12}}/>
                    <More style={{marginRight: 5}} onPress={()=>setModal(!modal)}/> 
                </View>
        </View>
        <FlatList data={DATA} renderItem={renderItem}
            keyExtractor={item => item.id}>
        </FlatList>
        <View style={styles.footer}>
            <View style={styles.profileBox2}></View>
            <TextInput style={styles.textInput} placeholder='댓글을 입력해주세요.' placeholderTextColor={'#BDBDBD'}></TextInput>
        </View>
    </View>
  ) : <View></View>
}

export default Talk1Sub