import React from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import Icon from 'react-native-vector-icons/FontAwesome'

const styles = StyleSheet.create({
    container:{
        height: '100%',
        backgroundColor: 'white',
        padding: 15,
    },
    header:{
        height: '3%',
    },
    main:{
        height: '97%',
    },
    mainBox:{
        borderTopWidth: 1,
        borderColor: '#EEEEEE',
        height: 80,
        padding: 10,
        justifyContent: 'center'
    }
})
const InquiryDetail = ({navigation}) => {

    const DATA = [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: '전체'
        },
        {
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
          title: '자유게시판'
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72',
          title: '일상이야기'
        },
        {
            id: '1',
            title: '임신정보'
        },
        {
            id: '2',
            title: '고민상담'
        },
        {
            id: '3',
            title: '질문게시판'
        },
        {
            id: '4',
            title: '질문게시판'
        },
    ];

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.mainBox} onPress={()=>navigation.navigate('공지사항2')}>
           <Text>공지사항</Text>
           <Text>2022/11/01</Text>
        </TouchableOpacity>
      );

  return (
    <View style={styles.container}>
        <View style={styles.header}></View>
        <View style={styles.main}>
        <FlatList data={DATA} renderItem={renderItem}
          keyExtractor={item => item.id} >
        </FlatList>
        </View>
    </View>
  )
}

export default InquiryDetail