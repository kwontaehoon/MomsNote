import React, { useState } from 'react'
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Switch, Modal } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import Icon from 'react-native-vector-icons/FontAwesome'

const styles = StyleSheet.create({
    container:{
        height: '92%',
        backgroundColor: 'white',
    },
    container2:{

    },
    main:{
    },
    mainBox:{
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
    },
    text:{
        fontSize: 15,
    },
    mainBoxSub:{
        width: '50%',
        justifyContent: 'center',
    },
    clockBox:{
        width: 70,
        height: 30,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    main2:{
        height: 120,
    },
    main2Box:{
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
    },
    main3:{
        height: 360,
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
const Main = ({navigation}) => {

    const DATA = [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: '전체'
        },
    ];

    const [isEnabled, setIsEnabled] = useState(Array.from({length: 3}, () => { return false })); // 스위치 토글
    console.log('isenabled: ', isEnabled);
    const [clockDisplay, setClockDisplay] = useState(false); // 시작 종료 시간 display
    const [modalVisible, setModalVisible] = useState(false); // 알람 끄기 modal
    const [modalVisible2, setModalVisible2] = useState(false); // 로그아웃 modal

    const modal = (e) => {
        console.log('e: ', e);
        let arr = [...isEnabled];
        let arr2 = [1, 2, 3];
        if(e === 0){
            arr[2] === false;
            console.log('arr: ', arr[2]);

            setIsEnabled(arr);
            setModalVisible(!modalVisible);
        }else{
            setModalVisible(!modalVisible);
        }
    }

    const toggleSwitch = (e) => {
        let arr = [...isEnabled];

        if(e === 2 && isEnabled[2] === true){
            setModalVisible(!modalVisible);
            return;
        }
        if(e === 1 && isEnabled[1] === true){
            arr[1] = false;
            arr[2] = false;  
        }else{
            arr[e] = !arr[e];
        }
        setIsEnabled(arr);

       
    }

    const renderItem = ({ item }) => (
        <View style={styles.container2}>
            <View style={[styles.main, {height: isEnabled[2] ? 360 : 240}]}>
                <View style={[styles.mainBox, {height: 50}]}><Text style={{fontSize: 15, fontWeight: 'bold'}}>알림설정</Text></View>
                <View style={styles.mainBox}>
                    <View style={styles.mainBoxSub}><Text style={styles.text}>마케팅 수신 동의</Text></View>
                    <View style={[styles.mainBoxSub, {alignItems: 'flex-end'}]}>
                        <Switch
                            trackColor={{ false: "#767577", true: "#FEA100" }}
                            thumbColor={isEnabled[0] ? "white" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={()=>toggleSwitch(0)}
                            value={isEnabled[0]}/>
                    </View>
                </View>
                <View style={styles.mainBox}>
                    <View style={styles.mainBoxSub}><Text style={styles.text}>활동 알림 받기</Text></View>
                    <View style={[styles.mainBoxSub, {alignItems: 'flex-end'}]}>
                        <Switch
                            trackColor={{ false: "#767577", true: "#FEA100" }}
                            thumbColor={isEnabled[1] ? "white" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={()=>toggleSwitch(1)}
                            value={isEnabled[1]}/>
                    </View>
                </View>
                <View style={styles.mainBox}>
                    <View style={styles.mainBoxSub}><Text style={[styles.text, {color: isEnabled[1] ? 'black' : '#BDBDBD'}]}>알림금지 시간 설정</Text></View>
                    <View style={[styles.mainBoxSub, {alignItems: 'flex-end'}]}>
                        <Switch
                            trackColor={{ false: isEnabled[1] ? "#767577" : "#BDBDBD", true: "#FEA100" }}
                            thumbColor={isEnabled[2] ? "white" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={()=>toggleSwitch(2)}
                            value={isEnabled[2]}
                            disabled={isEnabled[1] ? false : true}/>
                    </View>
                </View>
                <View style={[styles.mainBox, {display: isEnabled[2] ? 'flex' : 'none'}]}>
                    <View style={styles.mainBoxSub}><Text style={styles.text}>시작시간</Text></View>
                    <View style={[styles.mainBoxSub, {alignItems: 'flex-end'}]}>
                        <View style={styles.clockBox}><Text style={styles.text}>22:00</Text></View>
                    </View>
                </View>
                <View style={[styles.mainBox, {display: isEnabled[2] ? 'flex' : 'none'}]}>
                    <View style={styles.mainBoxSub}><Text style={styles.text}>종료 시간</Text></View>
                    <View style={[styles.mainBoxSub, {alignItems: 'flex-end'}]}>
                        <View style={styles.clockBox}><Text style={styles.text}>07:00</Text></View>
                    </View>
                </View>
            </View>
            <View style={{height: 10, backgroundColor: '#F5F5F5'}}></View>
            <View style={styles.main2}>
                <View  style={[styles.mainBox, {height: 50}]}>
                    <Text style={{fontWeight: 'bold'}}>사용자 설정</Text>
                </View>
                <TouchableOpacity style={styles.mainBox} onPress={()=>navigation.navigate('차단한 사용자')}>
                    <Text style={styles.text}>차단 관리</Text>
                </TouchableOpacity>
            </View>
            <View style={{height: 10, backgroundColor: '#F5F5F5'}}></View>
            <View style={styles.main3}>
                <View  style={[styles.mainBox, {height: 50}]}>
                        <View style={styles.mainBoxSub}><Text style={{fontWeight: 'bold'}}>기타</Text></View>
                </View>
                <TouchableOpacity style={styles.mainBox} onPress={()=>navigation.navigate('이용약관')}>
                    <View style={styles.mainBoxSub}><Text style={styles.text}>이용약관</Text></View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.mainBox} onPress={()=>navigation.navigate('개인정보처리방침')}>
                    <View style={styles.mainBoxSub}><Text style={styles.text}>개인정보처리방침</Text></View>
                </TouchableOpacity>
                <View style={styles.mainBox}>
                    <View style={styles.mainBoxSub}><Text style={styles.text}>버전정보</Text></View>
                    <View style={[styles.mainBoxSub, {alignItems: 'flex-end'}]}><Text style={{fontSize: 13, color: '#9E9E9E'}}>현재 1.0.1 / 최신 1.0.2</Text></View>
                </View>
                <View style={styles.mainBox}>
                    <View style={styles.mainBoxSub}><Text style={styles.text} onPress={()=>setModalVisible2(!modalVisible2)}>로그아웃</Text></View>
                </View>
            </View>
        </View>
      );

  return (
    <View style={styles.container}>
        <Modal animationType="fade" transparent={true} visible={modalVisible}
            onRequestClose={() => {
            setModalVisible(!modalVisible)}}>
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <View style={[styles.modalContainer2, {height: 220}]}>
                        <View style={styles.modalBox}>
                            <Text style={{fontSize: 16, paddingTop: 10}}>알림을 끄시면 체험단 선정 알림을</Text>
                            <Text style={{fontSize: 16, paddingTop: 5}}>받으실 수 없습니다.</Text>
                        </View>
                        <View style={styles.modalBox}>
                            <TouchableOpacity style={styles.modal} onPress={()=>modal(0)}><Text style={{color: 'white', fontSize: 16}}>알림 끄기</Text></TouchableOpacity>
                            <TouchableOpacity style={[styles.modal, {backgroundColor: 'white', borderWidth: 1, borderColor: '#EEEEEE'}]} onPress={()=>modal(1)}><Text style={{color: 'black', fontSize: 16}}>취소</Text></TouchableOpacity>
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
                        <View style={[styles.modalBox, {height: '45%'}]}>
                            <Text style={{fontSize: 16, paddingTop: 10}}>로그아웃 하시겠습니까?</Text>
                        </View>
                        <View style={styles.modalBox}>
                            <TouchableOpacity style={styles.modal} onPress={()=>navigation.navigate('')}><Text style={{color: 'white', fontSize: 16}}>로그아웃</Text></TouchableOpacity>
                            <TouchableOpacity style={[styles.modal, {backgroundColor: 'white', borderWidth: 1, borderColor: '#EEEEEE'}]} onPress={()=>setModalVisible2(!modalVisible2)}><Text style={{color: 'black', fontSize: 16}}>취소</Text></TouchableOpacity>
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