import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Modal } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import Checkbox from 'expo-checkbox'
import AsyncStorage from '@react-native-async-storage/async-storage'

const styles = StyleSheet.create({
    container:{
        height: '100%',
        backgroundColor: 'white',
    },
    container2:{

    },
    header:{
        height: 150,
        justifyContent: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderColor: '#EEEEEE',
    },
    main:{
        height: 400,
        padding: 15,
    },
    mainBox:{
        height: 150,
        justifyContent: 'center',
    },
    checkBox:{
        width: 18,
        height: 18,
    },
    mainBox2:{
        borderWidth: 1,
        borderColor: '#EEEEEE',
        height: 150,
        padding: 15,
        paddingBottom: 100,
    },
    main2:{
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50
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
        height: 220,
        backgroundColor: 'white',
        marginBottom: 35,
        borderRadius: 15,
    },
    modalBox:{
        height: '45%',
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
const Main = ({navigation}) => {
    const DATA = [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: '전체'
        },
    ];

    const [isChecked, setCheck] = useState(false); // 체크박스
    const [modalVisible, setModalVisible] = useState(false); // modal

    const withdraw = async() => {
        AsyncStorage.setItem('login', '1');
        
        setModalVisible(!modalVisible);

        navigation.navigate('초기접근');
    }

    const renderItem = ({ item }) => (
        <View style={styles.container2}>
        <View style={styles.header}>
            <Text style={[{fontSize: 20}, {marginBottom: 5}]}>회원 탈퇴 전,</Text>
            <Text style={{fontSize: 20}}>아래의 안내 사항을 꼭 확인해주세요.</Text>
        </View>
        <View style={styles.main}>
            <View style={styles.mainBox}>
                <Text style={{fontWeight: 'bold', fontSize: 15, marginBottom: 7}}>[회원 탈퇴 시 유의사항]</Text>
                <Text style={{marginBottom: 3}}><Icon name='dot-single' size={15}/>
                탈퇴 후 회원님이 직접 등록하신 데이터는 모두 삭제 처리되며,</Text>
                <Text style={{marginBottom: 5}}>재 가입 시 확인이 불가합니다.</Text>
                <Text><Icon name='dot-single' size={15}/>
                탈퇴 후 동일 이메일로 재 가입이 불가합니다.</Text>
            </View>
            <View style={[styles.mainBox, {height: 50}]}>
                <Text style={{marginBottom: 3}}>모든 항목에 동의하시면 아래에 체크 후 탈퇴 사유를 적어주세요.</Text>
                <Text>더 좋은 서비스를 제공하기 위해 소중한 정보로 활용하겠습니다.</Text>
            </View>
            <View style={[styles.mainBox, {flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', height: 50}]}>
                <View><Checkbox style={styles.checkBox}
                    value={isChecked}
                    onValueChange={setCheck}
                    color={isChecked ? '#FEB401' : undefined}/>
                </View>
                <Text style={{marginLeft: 5}}>탈퇴 시 유의사항을 모두 숙지하고 동의</Text>
            </View>
            <TextInput style={styles.mainBox2} placeholder='탈퇴 사유를 작성해주세요.' multiline={true}/>
        </View>
        <TouchableOpacity style={[styles.main2, {backgroundColor: isChecked ? '#FEA100' : '#E0E0E0'}]} onPress={()=>{isChecked ? setModalVisible(!modalVisible) : ''}}>
            <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>회원탈퇴</Text>
        </TouchableOpacity>
    </View>
      );
      
  return (
    <View style={styles.container}>
        <Modal animationType="fade" transparent={true} visible={modalVisible}
            onRequestClose={() => {
            setModalVisible(!modalVisible)}}>
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <View style={styles.modalContainer2}>
                        <View style={styles.modalBox}>
                            <Text style={{fontSize: 16, paddingTop: 10}}>정말로 회원탈퇴를 하시겠습니까?</Text>
                        </View>
                        <View style={styles.modalBox}>
                        <TouchableOpacity style={styles.modal} onPress={withdraw}>
                            <Text style={{color: 'white', fontSize: 16}}>회원탈퇴</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.modal, {backgroundColor: 'white', borderWidth: 1, borderColor: '#EEEEEE'}]} onPress={()=>setModalVisible(!modalVisible)}>
                            <Text style={{color: 'black', fontSize: 16}}>취소</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
        <FlatList data={DATA} renderItem={renderItem}
            keyExtractor={item => item.id} showsVerticalScrollIndicator={false}>
        </FlatList>
    </View>
  )
}

export default Main