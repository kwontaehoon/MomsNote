import React, { useState } from 'react'
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import Icon2 from 'react-native-vector-icons/FontAwesome'
import DropDownPicker from 'react-native-dropdown-picker'
import axios from 'axios'
import First from '../../Modal/First'

const styles = StyleSheet.create({
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
        backgroundColor: 'white',
        marginBottom: 35,
        borderRadius: 15,
        padding: 20,
    },
    header:{
        height: '25%',
        alignItems: 'center',
    },
    closeBox:{
        position: 'absolute',
        right: 10,
        alignItems: 'flex-end',
        justifyContent: 'center',
        zIndex: 1
    },
    main:{
        height: '50%',
    },
    
    mainBox:{
        width: 278,
        height: 44,
        borderColor: '#EEEEEE',
        borderWidth: 1,
        justifyContent: 'center',
        paddingLeft: 15,
    },
    arrowBox:{
        position: 'absolute',
        right: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollBox:{
        position: 'absolute',
        height: 200,
        width: 278,
        top: '46.5%',
        left: '15%',
        backgroundColor: 'white',
        zIndex: 999,
        shadowColor: "#000",
        elevation: 5,
        borderWidth: 1,
        borderColor: '#EEEEEE'
    },
    listBox:{
        height: 52,
        justifyContent: 'center',
        paddingLeft: 15,
    },
    dropDownBox:{
        height: '100%',
        borderRadius: 0,
        borderWidth: 0,
    },
    footer:{
        height: 44,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        position: 'relative',
        zIndex: -999
    },

})

const CheckBoxModal = ({modalVisible8, setModalVisible8, modal, setModal, info2}) => {

    const DATA = [
        {
            id: '0',
            title: '산모용품',
        },
        {
            id: '1',
            title: '수유용품',
        },
        {
            id: '2',
            title: '위생용품',
        },
        {
            id: '3',
            title: '목욕용품',
        },
        {
            id: '4',
            title: '침구류',
        },
        {
            id: '5',
            title: '아기의류',
        },
        {
            id: '6',
            title: '발육용품',
        },
        {
            id: '7',
            title: '가전용품',
        },
        {
            id: '8',
            title: '놀이용품',
        }
    ];

    const [titleDisplay, setTitleDisplay] = useState(false); // 품목 리스트 display
    const [info, setInfo] = useState({
        category: '카테고리 선택(필수)',
        grade: '추가',
        needsName: ''
    });
    
    const add = async() => {

        console.log(info.category);
        const filter = info2.filter(x => x.category == info.category && x.needsName == info.needsName);
        console.log('filter: ', filter == '');

        if(filter == ''){

            try{
                const response = await axios({
                      method: 'post',
                      url: 'https://momsnote.net/api/needs/add/needs',
                      headers: { 
                        'Authorization': 'bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnb29nbGVfMTIzNDU2Nzg5MCIsImlkIjo0LCJpYXQiOjE2NzIxMzQ3OTQsImV4cCI6MTY3NDcyNjc5NH0.mWpz6urUmqTP138MEO8_7WcgaNcG2VkX4ZmrjU8qESo', 
                        'Content-Type': 'application/json'
                      },
                      data: info
                    });
                    console.log('response: ', response.data);
                    setModalVisible8(!modalVisible8);
                    setModal(prevState => ({...prevState, open: true, content: '품목이 추가되었습니다.', buttonCount: 1}));
                }catch(error){
                  console.log('error: ', error);
                }
            return;
        }
        setModal(prevState => ({...prevState, open: true, content: '중복된 항목이 존재합니다.', buttonCount: 1}));
        setModalVisible8(!modalVisible8);
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.listBox} onPress={()=>{setInfo((prevState) => ({ ...prevState, category: item.title})), setTitleDisplay(false)}}>
            <Text>{item.title}</Text>
        </TouchableOpacity>
    );

    const arrowIcon = () => {
        if(!titleDisplay){return(<Icon2 name='angle-down' size={22}/>)
        }else return(<Icon2 name='angle-up' size={22}/>)
    }
    

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible8}
            onRequestClose={() => {
            setModalVisible8(!modalVisible8)}}>
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                <View style={[styles.scrollBox, {display: titleDisplay ? 'flex' : 'none'}]}>
                                    <FlatList data={DATA} renderItem={renderItem} initialNumToRender={4} 
                                        keyExtractor={item => item.id}>
                                    </FlatList>
                                </View>
                    <View style={[styles.modalContainer2, {height: 294}]}>
                        <View style={styles.header}>
                            <TouchableOpacity style={styles.closeBox} onPress={()=>setModalVisible8(!modalVisible8)}><Icon name='close' size={24}/></TouchableOpacity>
                            <Text style={{color: '#212121', fontSize: 18, fontWeight: '500'}}>품목 추가</Text>
                        </View>
                        <View style={styles.main}>
                            <TouchableOpacity style={styles.mainBox} onPress={()=>setTitleDisplay(!titleDisplay)}>
                                <View style={styles.arrowBox}>{arrowIcon()}</View>
                                <Text>{info.category}</Text>
                            </TouchableOpacity>
                            <View style={{height: 10}}></View>
                            <TextInput style={[styles.mainBox, {paddingLeft: 15, position: 'relative', zIndex: -999}]} placeholder='품목 명' placeholderTextColor={'#9E9E9E'}
                                onChangeText={(e) => setInfo((prevState) => ({ ...prevState, needsName: e}))}></TextInput>
                        </View>
                        {info.category !== '카테고리 선택(필수)' && info.needsName.length !== 0 ?
                            <TouchableOpacity style={[styles.footer, {backgroundColor: '#FEA100'}]} onPress={add}>
                                <Text style={{color: 'white', fontSize: 16, fontWeight: '600'}}>추가하기</Text>
                            </TouchableOpacity> : 
                            
                            <View style={[styles.footer, {backgroundColor: '#E0E0E0'}]}>
                                <Text style={{color: 'white', fontSize: 16, fontWeight: '600'}}>추가하기</Text>
                            </View>
                        }
                    </View>
                </View>
            </View>
        </Modal>
  )
}

export default CheckBoxModal