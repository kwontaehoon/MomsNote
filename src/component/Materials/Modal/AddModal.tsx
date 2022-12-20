import React, { useState } from 'react'
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import Icon2 from 'react-native-vector-icons/FontAwesome'
import DropDownPicker from 'react-native-dropdown-picker'
import axios from 'axios'

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

const CheckBoxModal = ({modalVisible8, setModalVisible8}) => {

    const DATA = [
        {
            id: '0',
            title: '산모 용품',
        },
        {
            id: '1',
            title: '수유 용품',
        },
        {
            id: '2',
            title: '위생 용품',
        },
        {
            id: '3',
            title: '목욕 용품',
        },
        {
            id: '4',
            title: '침구류',
        },
        {
            id: '5',
            title: '아기 의류',
        },
        {
            id: '6',
            title: '발육 용품',
        },
        {
            id: '7',
            title: '가전 용품',
        }
    ];

    const [titleDisplay, setTitleDisplay] = useState(false); // 품목 리스트 display
    const [info, setInfo] = useState({
        title: '카테고리 선택(필수)',
        content: ''
    })
    console.log('title: ', info.title);
    console.log('content: ', info.content.length);

    const submit = async() => {
        await axios.post(`http://192.168.1.140:4000/post/test`, {
            info: info
        })
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.listBox} onPress={()=>{setInfo((prevState) => ({ ...prevState, title: item.title})), setTitleDisplay(false)}}>
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
                                <Text>{info.title}</Text>
                            </TouchableOpacity>
                            <View style={{height: 10}}></View>
                            <TextInput style={[styles.mainBox, {paddingLeft: 15, position: 'relative', zIndex: -999}]} placeholder='품목 명' placeholderTextColor={'#9E9E9E'}
                                onChangeText={(e) => setInfo((prevState) => ({ ...prevState, content: e}))}></TextInput>
                        </View>
                        {info.title !== '카테고리 선택(필수)' && info.content.length !== 0 ?
                            <TouchableOpacity style={[styles.footer, {backgroundColor: '#FEA100'}]} onPress={()=>setModalVisible8(!modalVisible8)}>
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