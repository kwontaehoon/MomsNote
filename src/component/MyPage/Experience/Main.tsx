import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, StatusBar } from 'react-native'
import Talk1 from './Tab1/Main'
import Talk2 from './Tab2/Main'
import axios from 'axios'

const styles = StyleSheet.create({
    container:{
        height: '100%',
        backgroundColor: 'white',
    },
    headerIcon:{
        margin: 5,
    },
    header:{
        height: 60,
        flexDirection: 'row',
        borderWidth: 1,
    },
    headerBox:{
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 2,
        width: '50%',
    },
})
const Main = ({navigation}:any) => {

    useEffect(()=>{
        async function b(){
            const response = await axios.get('http://192.168.1.140:4000/api/test');
            console.log('response: ', response.data);
          }
          b();
    }, [])

    const [modalVisible, setModalVisible] = useState(false); // imodal
    const [filter, setFilter] = useState([true, false, false]); // tab
    const [info, setInfo] = useState([
        {
            boardId: 1,
            cateGory: '맘스토크',
            subcategory: '출산리스트',
            userId: '별똥맘',
            title: '5주차 맘 입덧 질문있어요',
            contents: '내용입니다.',
            recommend: '3',
            hits: '55',
            boardDate: '2022-12-13'
         },{
            boardId: 2,
            cateGory: '맘스토크',
            subcategory: '출산리스트',
            userId: '동글이',
            title: '좋은 정보 많이 공유해요~',
            contents: '내용입니다2.',
            recommend: '3',
            hits: '55',
            boardDate: '2022-12-13'
         },{
            boardId: 3,
            cateGory: '맘스토크',
            subcategory: '출산리스트',
            userId: '가양이',
            title: '출산전 꼭! 읽어야할 임산부 필수글',
            contents: '내용입니다3.',
            recommend: '3',
            hits: '55',
            boardDate: '2022-12-13'
        }
    ]); // 맘스톡 정보

    const List = ():any => {
        switch(true){
            case filter[0] === true: return <Talk1 navigation={navigation} info={info}/>
            case filter[1] === true: return <Talk2 navigation={navigation} info={info}/>
        }
    }
    const filter_func = (e) => {
        let arr = [false, false, false];
        arr[e] = true;
        setFilter(arr);
    }
    const write = (e) => {
        setModalVisible(!modalVisible);
    }
    const modal = (e) => {
        setModalVisible(!modalVisible);
        filter[0] === true ? navigation.navigate('글쓰기') : navigation.navigate('출산리스트 공유 등록');
    }

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity style={[styles.headerBox, {borderBottomColor: filter[0] ? 'orange' : '#BDBDBD'}]} onPress={()=>filter_func(0)}>
                <Text style={{fontWeight: 'bold', fontSize: 18, color: filter[0] ? 'orange' : '#BDBDBD'}}>진행중인 체험단</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.headerBox, {borderBottomColor: filter[1] ? 'orange' : '#BDBDBD'}]} onPress={()=>filter_func(1)}>
                <Text style={{fontWeight: 'bold', fontSize: 18, color: filter[1] ? 'orange' : '#BDBDBD'}}>종료된 체험단</Text>
            </TouchableOpacity>
        </View>
        <List />
    </View>
  )
}

export default Main