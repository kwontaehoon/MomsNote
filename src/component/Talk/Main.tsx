import React, { useState, useEffect } from 'react'
import { getStatusBarHeight } from "react-native-status-bar-height"; 
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, StatusBar } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Talk1 from './Tab1/Main'
import Talk2 from './Tab2/Main'
import Talk3 from './Tab3/Main'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { getBoard } from '../../Redux/Slices/BoardSlice'

import Pencil from '../../../public/assets/svg/Pencil.svg'

const styles = StyleSheet.create({
    container:{
        height: '92%',
        backgroundColor: 'white',
    },
    headerIcon:{
        margin: 5,
    },
    header:{
        height: 60,
        flexDirection: 'row',
    },
    headerBox:{
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 2,
    },
    footer:{
        width: 60,
        height: 60,
        position: 'absolute',
        bottom: 20,
        right: 20,
        borderRadius: 999,
        backgroundColor: '#FEA100',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        elevation: 5,
    },
    modalContainer:{
        justifyContent: "center",
        alignItems: "center",
    },
    modalView:{
        width: '100%',
        height: '100%',
        margin: 20,
        backgroundColor: "rgba(0,0,0,0.5)",
        alignItems: "center",
        justifyContent: 'center',
        shadowColor: "#000",
        elevation: 5,
    },
    modalContainer2:{
        width: '80%',
        height: 144,
        backgroundColor: 'white',
        marginBottom: 35,
        borderRadius: 15
    },
    modalBox:{
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal:{
        backgroundColor: '#FEA100',
        width: '90%',
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        marginBottom: 3,
    },
})
const Main = ({navigation}:any) => {

    // useEffect(()=>{
    //     async function b(){
    //         const response = await axios.get('http://192.168.1.140:4000/api/test');
    //         console.log('response: ', response.data);
    //       }
    //       b();
    // }, [])

    const board = useSelector(state => { return state.board.data; });
    console.log('board: ', board);
    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(getBoard());
    }, []);
    

    const [modalVisible, setModalVisible] = useState(false); // imodal
    const [filter, setFilter] = useState([true, false, false]); // tab

    const List = ():any => {

        switch(true){
            case filter[0] === true: return <Talk1 navigation={navigation} />
            case filter[1] === true: return <Talk2 navigation={navigation} />
            case filter[2] === true: return <Talk3 navigation={navigation} />
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
        <Modal animationType="fade" transparent={true} visible={modalVisible}
            onRequestClose={() => {
            setModalVisible(!modalVisible)}}>
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <View style={[styles.modalContainer2, {height: 220}]}>
                        <View style={styles.modalBox}>
                            <Text style={{fontSize: 16, paddingTop: 10}}>작성 중이던 게시글이 존재합니다.</Text>
                            <Text style={{fontSize: 16, paddingTop: 5}}>임시저장된 게시글을 불러오시겠습니까?</Text>
                        </View>
                        <View style={styles.modalBox}>
                            <TouchableOpacity style={styles.modal}><Text style={{color: 'white', fontSize: 16}}>게시글 불러오기</Text></TouchableOpacity>
                           <TouchableOpacity style={[styles.modal, {backgroundColor: 'white', borderWidth: 1, borderColor: '#EEEEEE'}]} onPress={modal}><Text style={{color: 'black', fontSize: 16}}>새로 작성하기</Text></TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
        <View style={styles.header}>
            <TouchableOpacity style={[styles.headerBox, {width: '25%', borderBottomColor: filter[0] ? 'orange' : '#BDBDBD'}]} onPress={()=>filter_func(0)}>
                <Text style={{fontWeight: 'bold', fontSize: 18, color: filter[0] ? 'orange' : '#BDBDBD'}}>맘스 토크</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.headerBox, {width: '50%', borderBottomColor: filter[1] ? 'orange' : '#BDBDBD'}]} onPress={()=>filter_func(1)}>
                <Text style={{fontWeight: 'bold', fontSize: 18, color: filter[1] ? 'orange' : '#BDBDBD'}}>출산리스트공유</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.headerBox, {width: '25%', borderBottomColor: filter[2] ? 'orange' : '#BDBDBD'}]} onPress={()=>filter_func(2)}>
                <Text style={{fontWeight: 'bold', fontSize: 18, color: filter[2] ? 'orange' : '#BDBDBD'}}>체험단</Text>
            </TouchableOpacity>
        </View>
        <List />
        <TouchableOpacity style={[styles.footer, {display: filter[2] ? 'none' : 'flex'}]} onPress={write}>
            <Pencil fill='white'/>
        </TouchableOpacity>
    </View>
  )
}

export default Main