import React, { useState } from 'react'
import { getStatusBarHeight } from "react-native-status-bar-height"; 
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/AntDesign'
import Talk1 from './Tab1/Main'
import Talk2 from './Tab2/Main'
import Talk3 from './Tab3/Main'

const styles = StyleSheet.create({
    container:{
        height: '92%',
        backgroundColor: 'white',
    },
    headerIcon:{
        margin: 5,
    },
    header:{
        height: '8%',
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

    const [modalVisible, setModalVisible] = useState(false); // imodal
    const [filter, setFilter] = useState([true, false, false]); // tab

    const List = ():any => {
        switch(true){
            case filter[0] === true: return <Talk1 navigation={navigation}/>
            case filter[1] === true: return <Talk2 navigation={navigation}/>
            case filter[2] === true: return <Talk3 navigation={navigation}/>
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
        navigation.navigate('글쓰기');
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
                            <Text style={{fontSize: 16, paddingTop: 10}}>게시글 내용을 입력해주세요.</Text>
                            <Text style={{fontSize: 16, paddingTop: 5}}>해당 내용을 임시저장하시겠습니까?</Text>
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
        <TouchableOpacity style={styles.footer} onPress={write}>
            <Icon name="pencil" size={22} style={{color: 'white'}}/>
        </TouchableOpacity>
    </View>
  )
}

export default Main