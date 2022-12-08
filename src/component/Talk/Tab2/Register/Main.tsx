import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, SafeAreaView, Modal, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/AntDesign'
import { getStatusBarHeight } from "react-native-status-bar-height"
import * as ImagePicker from 'expo-image-picker';

const styles = StyleSheet.create({
    container:{
        marginTop: getStatusBarHeight(),
        backgroundColor: 'white',
        height: '100%',
    },
    container2:{

    },
    header:{
        height: 60,
        flexDirection: 'row',
    },
    headerBox:{
        alignItems: 'center',
        justifyContent: 'center',
    },
    main:{
        height: 600,
        padding: 20,
    },
    mainBox:{
        height: '20%',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderColor: '#F5F5F5'
    },
    mainBox2:{
        height: 56,
        borderBottomWidth: 1,
        borderColor: '#F5F5F5',
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
    },
    mainBox2Sub:{
        width: '80%',
        justifyContent: 'center',
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
const Register = ({navigation}) => {

    const DATA = [
        {
          id: '0',
          title: '전체'
        },
      ];

    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);

    const cencel = (e) => {
        setModalVisible(!modalVisible);
    }
    const complete = (e) => {
        setModalVisible2(!modalVisible2);
    }
    const modal = (e) => {
        setModalVisible(!modalVisible);
        navigation.goBack();
    }

    const renderItem = ({ item }) => (
        <View style={styles.container2}>
            <View style={styles.header}>
                    <View style={[styles.headerBox, {width: '20%'}]}><Text style={{fontSize: 16}} onPress={()=>cencel(0)}>취소</Text></View>
                    <View style={[styles.headerBox, {width: '60%'}]}><Text style={{fontSize: 25, fontWeight: 'bold'}}>출산리스트 공유 등록</Text></View>
                    <View style={[styles.headerBox, {width: '20%'}]}><Text style={{color: '#FE7000', fontSize: 16, fontWeight: '600'}} onPress={()=>complete(0)}>완료</Text></View>
            </View>
            <View style={styles.main}>
                <View style={styles.mainBox}>
                    <Text style={{color: '#212121', fontSize: 24, fontWeight: '600'}}>맘스톡 게시판에</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{color: '#FE7000', fontSize: 24, fontWeight: '600'}}>출산리스트를 공유</Text>
                        <Text style={{fontSize: 24, fontWeight: '600'}}>해보세요.</Text>
                    </View>
                </View>
                <View style={styles.mainBox2}>
                    <View style={styles.mainBox2Sub}><Text style={{color: '#424242', fontSize: 16}}>나의 출산리스트 보기</Text></View>
                    <View style={[styles.mainBox2Sub, {width: '20%', alignItems: 'flex-end'}]}><Icon name='angle-right' size={25} onPress={()=>navigation.navigate('출산리스트')}/></View>
                </View>
                <TextInput style={styles.mainBox2} placeholder='제목을 입력해주세요.' placeholderTextColor={'#BDBDBD'}></TextInput>
                <TextInput style={[styles.mainBox2, {height: 220, paddingBottom: 180}]} placeholder='게시글 내용을 작성해주세요.' placeholderTextColor={'#BDBDBD'}></TextInput>
            </View>
        </View>
    );


   return(
        <View style={styles.container}>
            <Modal animationType="fade" transparent={true} visible={modalVisible}
                onRequestClose={() => {
                setModalVisible(!modalVisible)}}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <View style={[styles.modalContainer2, {height: 220}]}>
                            <View style={styles.modalBox}>
                                <Text style={{fontSize: 16, paddingTop: 10}}>작성 중인 게시글을 취소합니다.</Text>
                                <Text style={{fontSize: 16, paddingTop: 5}}>해당 내용을 임시저장하시겠습니까?</Text>
                            </View>
                            <View style={styles.modalBox}>
                                <TouchableOpacity style={styles.modal} onPress={cencel}><Text style={{color: 'white', fontSize: 16}}>네</Text></TouchableOpacity>
                                <TouchableOpacity style={[styles.modal, {backgroundColor: 'white', borderWidth: 1, borderColor: '#EEEEEE'}]} onPress={modal}><Text style={{color: 'black', fontSize: 16}}>아니요</Text></TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal animationType="fade" transparent={true} visible={modalVisible2}
            onRequestClose={() => {
            setModalVisible2(!modalVisible2)}}>
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <View style={styles.modalContainer2}>
                        <View style={styles.modalBox}><Text style={{fontSize: 16, paddingTop: 10}}>게시글 내용을 입력해주세요.</Text></View>
                        <View style={styles.modalBox}>
                            <TouchableOpacity style={styles.modal} onPress={complete}><Text style={{color: 'white', fontSize: 16}}>확인</Text></TouchableOpacity>
                        </View>
                        </View>
                    </View>
                </View>
            </Modal>

            <FlatList data={DATA} renderItem={renderItem}
                keyExtractor={item => item.id}>
            </FlatList>
        </View>
  )
}

export default Register
