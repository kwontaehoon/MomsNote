import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Switch, Modal } from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSelector } from 'react-redux'
import { postUser } from '../../../Redux/Slices/UserSlice'
import { useDispatch } from 'react-redux'
import TimeWheelStart from './Modal/TimeWheelStart'
import TimewheelEnd from './Modal/TimeWheelEnd'

const styles = StyleSheet.create({
    container:{
        height: '100%',
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
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

    },
    main2Box:{
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
    },
    main3:{

    },
    modalContainer:{
        justifyContent: "center",
        alignItems: "center",
    },
    modalView:{
        width: '100%',
        height: '100%',
        backgroundColor: "rgba(0,0,0,0.5)",
        alignItems: "center",
        justifyContent: 'center',
        shadowColor: "#000",
        elevation: 5,
    },
    modalContainer2:{
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 15
    },
    modalBox:{
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
    },
    modal:{
        backgroundColor: '#FEA100',
        width: '90%',
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        marginBottom: 7,
    },
})

const Main = ({navigation}) => {

    const DATA = [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: '전체'
        },
    ];


    const dispatch = useDispatch();
    const [isEnabled, setIsEnabled] = useState(Array.from({length: 3}, () => { return false })); // 스위치 토글
    const [clockDisplay, setClockDisplay] = useState(false); // 시작 종료 시간 display
    const [modalVisible, setModalVisible] = useState(false); // 알람 끄기 modal
    const [modalVisible2, setModalVisible2] = useState(false); // 로그아웃 modal
    const [modal2, setModal2] = useState({
        open: false,
        content: false
    }); // 마케팅 수신동의
    const [modal3, setModal3] = useState({
        open: '',
        clock: '',
        hours: '00',
        minutes: '00'
    }); // 알람 시작시간
    const [modal4, setModal4] = useState({
        open: '',
        clock: '',
        hours: '00',
        minutes: '00'
    }); // 알람 끝나는 시간

    const [loading, setLoading] = useState(false);

    const [mode, setMode] = useState('time');
    const [show, setShow] = useState(false);
    const [clock, setClock] = useState('start');

    const [alarmStart, setAlarmStart] = useState('22:00');
    const [alarmEnd, setAlarmEnd] = useState('07:00');

    const user = useSelector(state => {return state.user.data});

    useEffect(()=>{
        dispatch(postUser());
        const user2 = async() => {
            setLoading(false);

            const arr = Array.from({length: 3}, () => {return false});

            const activeAlarm = await AsyncStorage.getItem('activeAlarm');
            const alarmSetting = await AsyncStorage.getItem('alarmSetting');

            const alarmStartClock = await AsyncStorage.getItem('alarmStartClock');
            const alarmStartHours = await  AsyncStorage.getItem('alarmStartHours');
            const alarmStartMinutes = await  AsyncStorage.getItem('alarmStartMinutes');

            const alarmEndClock = await AsyncStorage.getItem('alarmEndClock');
            const alarmEndHours = await  AsyncStorage.getItem('alarmEndHours');
            const alarmEndMinutes = await  AsyncStorage.getItem('alarmEndMinutes');

            (modal2.content || !user.marketing) ? arr[0] = false : arr[0] = true;
            !activeAlarm ? '' : arr[1] = true;
            !alarmSetting ? '' : arr[2] = true;

            setIsEnabled(arr);
            if(alarmStartHours && alarmStartMinutes){
                setModal3(prevState => ({...prevState, clock: alarmStartClock, hours: alarmStartHours, minutes: alarmStartMinutes}));
            }
            if(alarmEndHours && alarmEndMinutes){
                setModal4(prevState => ({...prevState, clock: alarmEndClock, hours: alarmEndHours, minutes: alarmEndMinutes}));
            }
            setLoading(true);
        }
        user2();
    }, [modal2]);

    const modal = (e) => {
        let arr = [...isEnabled];
        if(e === 0){
            arr[1] = false;
            arr[2] = false;
            setIsEnabled(arr);
            setModalVisible(!modalVisible);
        }else{
            setModalVisible(!modalVisible);
        }
    }

    const toggleSwitch = async(e) => {
        let arr = [...isEnabled];

        if(e == 0 && isEnabled[0]){
            setModal2({open: !modal2.open});
            return;
        }else if(e === 0 && !isEnabled[0]){
            arr[0] = true;
            setIsEnabled({...isEnabled, content: false});
            marketing(true);
        }

        if(e == 1 && isEnabled[1]){
            setModalVisible(!modalVisible);
            await AsyncStorage.removeItem('activeAlarm'); 
            await AsyncStorage.removeItem('alarmSetting'); 
        }else if(e === 1 && !isEnabled[1]){
            arr[e] = !arr[e];
            await AsyncStorage.setItem('activeAlarm', '1');
        }

        if(e === 2 && isEnabled[2]){
            await AsyncStorage.removeItem('alarmSetting');
            arr[2] = false;
        }else if(e === 2 && !isEnabled[2]){
            await AsyncStorage.setItem('alarmSetting', '1');
            arr[2] = true;
        }
        setIsEnabled(arr);
    }

    const marketing = async(e) => {
        const token = await AsyncStorage.getItem('token');
        try{
            const response = await axios({
                method: 'post',
                url: `https://momsnote.net/api/marketing/update`,
                headers: { 
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json'
                  },
                data: {marketing: e}
            });

            let arr= [...isEnabled];
            e ? arr[0] = true : (arr[0] = false, etModal2({...modal2, open: modal2.open}))
            setIsEnabled(arr);
            }catch(error){
            }
    }

    const logout = async() => {
        const token = await AsyncStorage.getItem('token');
        try{
            const response = await axios({
                method: 'post',
                url: `https://kapi.kakao.com/v1/user/logout`,
                headers: { 
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/x-www-form-urlencoded'
                  },
            });
            }catch(error){
            }
            AsyncStorage.setItem('login', '1');
            setModalVisible2(!modalVisible2);
            navigation.reset({routes: [{name: "초기접근"}]});
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
                        <TouchableOpacity style={styles.clockBox} onPress={()=>setModal3(!modal3)}>
                            <Text style={styles.text}>{modal3.clock == 'PM' ?  Number(modal3.hours?.split('').filter(x=> x !== '시').join(''))+12 : modal3.hours?.split('').filter(x=> x !== '시').join('')} : {modal3.minutes?.split('').filter(x=> x !== '분').join('')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={[styles.mainBox, {display: isEnabled[2] ? 'flex' : 'none'}]}>
                    <View style={styles.mainBoxSub}><Text style={styles.text}>종료 시간</Text></View>
                    <View style={[styles.mainBoxSub, {alignItems: 'flex-end'}]}>
                        <TouchableOpacity style={styles.clockBox} onPress={()=>setModal4(!modal4)}>
                            <Text style={styles.text}>{modal4.clock == 'PM' ? Number(modal4.hours?.split('').filter(x=> x !== '시').join(''))+12 : modal4.hours?.split('').filter(x=> x !== '시').join('')} : {modal4.minutes?.split('').filter(x=> x !== '분').join('')}</Text>
                            </TouchableOpacity>
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
                    <View style={[styles.mainBoxSub, {alignItems: 'flex-end'}]}><Text style={{fontSize: 13, color: '#9E9E9E'}}>현재 1.0.9 / 최신 1.0.9</Text></View>
                </View>
                <View style={styles.mainBox}>
                    <View style={styles.mainBoxSub}><Text style={styles.text} onPress={()=>setModalVisible2(!modalVisible2)}>로그아웃</Text></View>
                </View>
            </View>
        </View>
      );

  return !loading ? 
    <View style={styles.container}><ActivityIndicator size={'large'} color={'#E0E0E0'}/></View>
     : (
    <View style={styles.container}>

        <TimeWheelStart modal={modal3} setModal={setModal3}/>
        <TimewheelEnd modal={modal4} setModal={setModal4} />
        

        <Modal animationType="fade" transparent={true} visible={modalVisible} statusBarTranslucent={true}
            onRequestClose={() => {
            setModalVisible(!modalVisible)}}>
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <View style={styles.modalContainer2}>
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
        <Modal animationType="fade" transparent={true} visible={modalVisible2} statusBarTranslucent={true}
            onRequestClose={() => {
            setModalVisible2(!modalVisible2)}}>
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <View style={styles.modalContainer2}>
                        <View style={[styles.modalBox, {paddingTop: 20}]}>
                            <Text style={{fontSize: 16, paddingTop: 10}}>로그아웃 하시겠습니까?</Text>
                        </View>
                        <View style={styles.modalBox}>
                            <TouchableOpacity style={styles.modal} onPress={logout}><Text style={{color: 'white', fontSize: 16}}>로그아웃</Text></TouchableOpacity>
                            <TouchableOpacity style={[styles.modal, {backgroundColor: 'white', borderWidth: 1, borderColor: '#EEEEEE'}]} onPress={()=>setModalVisible2(!modalVisible2)}><Text style={{color: 'black', fontSize: 16}}>취소</Text></TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
        <Modal animationType="fade" transparent={true} visible={modal2.open} statusBarTranslucent={true}
            onRequestClose={() => {
            setModal2({...modal2, open: false})}}>
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <View style={styles.modalContainer2}>
                        <View style={[styles.modalBox, {paddingTop: 30}]}>
                            <Text style={{fontSize: 16, lineHeight: 25, textAlign: 'center'}}>각종 이벤트 알림을 받으실 수 없습니다. 마케팅 수신동의를 해제하시겠습니까?</Text>
                        </View>
                        <View style={styles.modalBox}>
                            <TouchableOpacity style={styles.modal} 
                                onPress={()=>{
                                    marketing(false);
                                    const arr = [...isEnabled];
                                    arr[0] = false;
                                    setIsEnabled(arr);
                                    setModal2({...modal2, open: false, content: true});
                                    }}>
                                <Text style={{color: 'white', fontSize: 16}}>해제</Text></TouchableOpacity>
                            <TouchableOpacity style={[styles.modal, {backgroundColor: 'white', borderWidth: 1, borderColor: '#EEEEEE'}]} onPress={()=>setModal2({...modal2, open: false})}><Text style={{color: 'black', fontSize: 16}}>취소</Text></TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>

        {/* {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            onChange={onChange}
            style={Platform.OS == 'ios' ? {position: 'absolute',bottom: 20, borderWidth: 1, width: '100%'} : {width: 100, height: 100, backgroundColor: 'blue'}}
            display={Platform.OS == 'ios' ? 'spinner' : ''}
          />
        )} */}
        
        <FlatList data={DATA} renderItem={renderItem}
            keyExtractor={item => item.id} showsVerticalScrollIndicator={false}>
        </FlatList>
    </View>
  )
}

export default Main