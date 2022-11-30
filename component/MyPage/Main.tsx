import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const styles = StyleSheet.create({
    container:{
        height: '92%',
        backgroundColor: 'white'
    },
    header:{
        height: '15%',
        flexDirection: 'row',
        marginTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
    headerBox:{
        width: '75%',
        padding: 5,
        flexDirection: 'row',
    },
    profileBox:{
        borderWidth: 1,
        width: '35%',
        borderRadius: 999,
    },
    infoBox:{
        width: '83%',
        justifyContent: 'center',
        paddingLeft: 8,
    },
    headerBox2:{
        width: '25%',
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    editBox:{
        borderWidth: 1,
        borderColor: 'lightgrey',
        borderRadius: 20,
        padding: 10
    },
    main:{
        height: '39%',
    },
    mainBox:{
        height: '20%',
        padding: 15,
        justifyContent: 'center',
    },
    mainBox2:{
        height: '20%',
        padding: 15,
        justifyContent: 'center',
    },
    main2:{
        height: '35%',
    },
    main3:{

    }
})
const Main = ({navigation}) => {
  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <View style={styles.headerBox}>
                <View style={styles.profileBox}></View>
                <View style={styles.infoBox}><Text style={{fontSize: 20, fontWeight : 'bold'}}>닉네임</Text></View>
            </View>
            <View style={styles.headerBox2}>
                <TouchableOpacity style={styles.editBox} onPress={()=>navigation.navigate('내 정보 수정')}><Text>내 정보 수정</Text></TouchableOpacity>
            </View>
        </View>
        <View style={{backgroundColor: '#F5F5F5', height: '2%'}}></View>
        <View style={styles.main}>
            <View style={styles.mainBox}><Text style={{fontWeight: 'bold'}}>내 활동 관리</Text></View>
            <View style={styles.mainBox2}><Text>내가 쓴 게시물</Text></View>
            <View style={styles.mainBox2}><Text>내가 쓴 댓글</Text></View>
            <View style={styles.mainBox2}><Text onPress={()=>navigation.navigate('추천 게시물')}>추천한 게시물</Text></View>
            <View style={styles.mainBox2}><Text>신청한 체험단</Text></View>
        </View>
        <View style={{backgroundColor: '#F5F5F5', height: '2%'}}></View>
        <View style={styles.main2}>
            <View style={styles.mainBox}><Text style={{fontWeight: 'bold'}}>고객센터</Text></View>
            <View style={styles.mainBox2}><Text>어플 이용 가이드</Text></View>
            <View style={styles.mainBox2}><Text>카카오톡 초대</Text></View>
            <View style={styles.mainBox2}><Text onPress={()=>navigation.navigate('공지사항')}>공지사항</Text></View>
            <View style={styles.mainBox2}><Text onPress={()=>navigation.navigate('1:1 문의')}>1:1 문의</Text></View>
        </View>
        <View style={styles.main3}></View>
        <View style={{backgroundColor: '#F5F5F5', height: '8%'}}></View>
    </View>
  )
}

export default Main