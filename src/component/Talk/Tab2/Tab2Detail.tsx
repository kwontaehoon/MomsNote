import React, { useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/AntDesign'

const styles = StyleSheet.create({
    container:{
        height: '100%',
        backgroundColor: 'white',
    },
    header:{
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
        borderColor: '#EEEEEE'
    },
    mainBox:{
        height: 70,
        padding: 20,
    },
    mainBox2:{
        height: 60,
        padding: 20,
    },
    mainBox3:{
        padding: 20,
    },
    listBox:{
        borderWidth: 1,
        height: 400,
    },
    listHeader:{
        borderWidth: 1,
        height: 60,
        backgroundColor: '#FEECB3',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
    },
    arrowBox:{
        position: 'absolute',
        right: 15,
        borderWidth: 1,
    },
    listMain:{
        position: 'absolute',
        borderWidth: 1,
        backgroundColor: 'green',
        width: '90%',
        height: 300,
        zIndex: 999,
        left: '5%',
        top: '10%'
    },
    mainBox4:{
        height: 30,
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
    list2:{
        borderWidth: 1,
        height: 80,
    },
    listFooter:{
        borderWidth: 1,

    },
    lookupBox:{
        width: '40%',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: 20,
    },
    mainBox5:{
        height: 500,
        backgroundColor: 'orange'
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
    }
})
const Talk1Sub = ({route}) => {

    const DATA = [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: '전체'
        },
    ];

    const DATA2 = [
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

    console.log('route: ', route.params);
    const info = route.params;

    const [comment, setComment] = useState([]); // 댓글 데이터

    const renderItem = ({ item }) => (
        <View>
            <View style={styles.header}>
                <View style={styles.profileBox}></View>
                <View style={styles.infoBox}>
                    <Text style={{color: '#212121', fontSize: 16, fontWeight: '500'}}>{info.userId}</Text>
                    <Text style={{color: '#9E9E9E', fontSize: 13}}>{info.boardDate}</Text>
                </View>
            </View>
            <View style={styles.main}>
                <View style={styles.mainBox}>
                    <Text style={{fontSize: 20, fontWeight: '400'}}>{info.title}</Text>
                </View>
                <View style={styles.mainBox2}>
                    <Text>{info.contents}</Text>
                </View>
                <View style={styles.mainBox3}>

                    <View style={styles.listBox}>
                        <View style={styles.listHeader}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={{fontSize: 15, fontWeight: '600'}}>{info.userId}</Text>
                                <Text style={{fontSize: 15}}> 님의 출산준비물</Text>
                            </View>
                        </View>

                        

                        {/* <View style={[styles.listHeader, {height: 70, backgroundColor: '#FFADAD', alignItems: 'flex-start'}]}>
                            <View style={styles.arrowBox}><Icon name='angle-down' size={22}/></View>
                            <Text style={{fontSize: 15}}>산모용품 (5/13)</Text>
                        </View> */}
                        {/* <View style={[styles.listHeader, {backgroundColor: 'white', flexDirection: 'row'}]}>
                            <View style={{width: '33.4%', alignItems: 'center'}}><Text>구매</Text></View>
                            <View style={{width: '33.4%', alignItems: 'center'}}><Text>품목</Text></View>
                            <View style={{width: '33.4%', alignItems: 'center'}}><Text>가격</Text></View>
                        </View> */}
                        
                        <View style={[styles.listFooter]}></View>
                    </View>
                </View>
                <View style={styles.mainBox4}>
                    <View style={styles.likeBox}>
                        <Icon name='user' size={20} style={{paddingLeft: 10}}/>
                        <Text style={{color: '#9E9E9E', fontSize: 13}}> 추천 13</Text>
                        <Icon name='user' size={20} style={{paddingLeft: 10}}/>
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
        <View style={styles.list2}>
            <Text>{item.title}</Text>
        </View>
      );


  return (
    <View style={styles.container}>
        <View style={styles.listMain}>
            <FlatList data={DATA2} renderItem={renderItem2}
                keyExtractor={item => item.id}>
            </FlatList>
        </View>
        <FlatList data={DATA} renderItem={renderItem}
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