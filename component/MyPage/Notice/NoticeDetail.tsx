import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import Icon from 'react-native-vector-icons/FontAwesome'

const styles = StyleSheet.create({
    container:{
        height: '100%',
        backgroundColor: 'white',
    },
    header:{
        height: '12%',
        justifyContent: 'center',
        paddingLeft: 10,
        backgroundColor: '#F5F5F5',
    },
    main:{
        height: '88%',
    },
    mainBox:{
        padding: 10,
    }
})
const NoticeDetail = () => {

    const DATA = [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: '전체'
        },
    ];

    const renderItem = ({ item }) => (
        <View style={styles.mainBox}>
           <Text>안녕하세요. 맘스노트 관리자입니다.</Text>
        </View>
      );


  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Text style={{fontWeight: 'bold', fontSize: 17, marginBottom: 2}}>맘스노트 11월 4주차 공지사항</Text>
            <Text style={{color: '#9E9E9E'}}>2022/11/01</Text>
        </View>
        <View style={styles.main}>
            <FlatList data={DATA} renderItem={renderItem}
                keyExtractor={item => item.id} >
            </FlatList>
        </View>
    </View>
  )
}

export default NoticeDetail