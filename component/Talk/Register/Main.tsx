import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, SafeAreaView, Modal } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { getStatusBarHeight } from "react-native-status-bar-height"

const styles = StyleSheet.create({
    container:{
        marginTop: getStatusBarHeight(),
        height: '90%',
        backgroundColor: 'white',
    },
    header:{
        height: '8%',
        flexDirection: 'row',
    },
    headerBox:{
        alignItems: 'center',
        justifyContent: 'center',
    },
    header2:{
        height: '8%',
        backgroundColor: '#FEECB3',
        flexDirection: 'row',
    },
    header2Box:{
        width: '75%',
        padding: 5,
        flexDirection: 'row'
    },
    profileBox:{
        borderWidth: 1,
        width: '17%',
        borderRadius: 999,
    },
    infoBox:{
        width: '83%',
        justifyContent: 'center',
        paddingLeft: 8,
    },
    header2Box2:{
        width: '25%',
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    main:{
        height: '16%',
        flexDirection: 'row',
        padding: 5,
    },
    mainBox:{
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cameraBox:{
        borderWidth: 1,
        borderColor: '#E0E0E0',
        width: '70%',
        height: '70%',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    mainBox2:{
        width: '70%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    main2:{
        height: '9%',
        flexDirection: 'row',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'black',
        marginLeft: 10,
        marginRight: 10,
    },
    main2Box:{
        width: '85%',
        justifyContent: 'center',
        paddingLeft: 10,
    },
    main2Box2:{
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    main3:{
        height: '59%',
        marginLeft: 10,
        marginRight: 10,
    },
    main3TitleBox:{
        height: '20%',
        borderBottomWidth: 1,
        paddingLeft: 10,
        paddingTop: 10,
    },
    main3ContentBox:{
        height: '70%',
        paddingLeft: 10,
        paddingTop: 10,
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

    const content = ['카테고리를 선택해주세요.', '제목을 입력해주세요.', '게시글 내용을 입력해주세요.'];
    const content2 = ['이미지는 최대 7장 업로드 가능합니다.', '동영상은 최대 1개만 업로드 가능합니다.'];
    const content3 = ['작성 중이던 게시글을 취소합니다. 해당 내용을 임시 저장하시겠습니까?'];

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
            <View style={styles.header}>
                <View style={[styles.headerBox, {width: '20%'}]}><Text style={{fontSize: 15}} onPress={()=>cencel(0)}>취소</Text></View>
                <View style={[styles.headerBox, {width: '60%'}]}><Text style={{fontSize: 25, fontWeight: 'bold'}}>맘스톡 등록</Text></View>
                <View style={[styles.headerBox, {width: '20%'}]}><Text style={{color: '#FE7000', fontSize: 15}} onPress={()=>complete(0)}>완료</Text></View>
            </View>
            <View style={styles.header2}>
                <View style={styles.header2Box}>
                    <View style={styles.profileBox}></View>
                    <View style={styles.infoBox}><Text style={{fontSize: 20, fontWeight : 'bold'}}>별똥이맘</Text></View>
                </View>
                <View style={styles.header2Box2}>
                    <View><Text>임신 몇주차</Text></View>
                </View>
            </View>
            <View style={styles.main}>
                <View style={styles.mainBox}>
                    <View style={styles.cameraBox}>
                        <Icon name='camera' size={20} />
                        <Text>0/8</Text>
                    </View>
                </View>
                <View style={styles.mainBox2}>
                    <Text>이미지 파일은 최대 7개,  동영상 파일은 최대 1개까지 등록이 가능합니다.</Text>
                </View>
            </View>
            <View style={styles.main2}>
                <View style={styles.main2Box}><Text>카테고리 선택</Text></View>
                <TouchableOpacity style={styles.main2Box2} onPress={()=>navigation.navigate("카테고리 선택")}><Icon name='angle-right' size={20}/></TouchableOpacity>
            </View>
            <SafeAreaView style={styles.main3}>
                <View style={styles.main3TitleBox}><TextInput  placeholder='제목을 입력해주세요.'></TextInput></View>
                <View style={styles.main3ContentBox}><TextInput  placeholder='게시글 내용을 작성해주세요.'></TextInput></View>
            </SafeAreaView>
        </View>
  )
}

export default Register