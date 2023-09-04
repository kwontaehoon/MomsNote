import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, SafeAreaView, StatusBar, Platform, Modal } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import Icon from 'react-native-vector-icons/AntDesign'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

import Check from '.././../../../public/assets/svg/Check.svg'

import {
    SafeAreaProvider,
} from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux'
import { postBoardAppFlag } from '../../../Redux/Slices/BoardAppFlagSlice'
import { useSelector } from 'react-redux'


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: Platform.OS == 'ios' ? 0 : getStatusBarHeight(),
    },
    container2: {
    },
    header: {
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerBox: {
        position: 'absolute',
        right: 0,
        width: 70,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
    },
    main: {
        padding: 15
    },
    mainBox: {
        marginBottom: 30,
    },
    mainBox2: {
        borderWidth: 1,
    },
    textBox: {
        marginTop: 10,
        height: 52,
        paddingLeft: 10,
        justifyContent: 'center',
        backgroundColor: '#F5F5F5'
    },
    certificateBox: {
        position: 'absolute',
        right: 15,
        bottom: 15,
    },
    buttonBox: {
        width: '90%',
        height: 56,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#EEEEEE',
    },
    modalContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        width: '100%',
        height: '100%',
        backgroundColor: "rgba(0,0,0,0.5)",
        alignItems: "center",
        justifyContent: 'center',
        shadowColor: "#000",
        elevation: 5,
    },
    modalContainer2: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 15
    },
    modalBox: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
    },
    modal: {
        backgroundColor: '#FEA100',
        width: '90%',
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        marginBottom: 7,
    },
})
const Withdraw = ({ navigation, route }) => {

    console.log('신청 정보 취소 route: ', route.params);

    const DATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            title: '전체'
        },
    ];
    const dispatch = useDispatch();
    const info = useSelector(state => { return state.boardAppFlag.data });
    console.log('신청정보 info: ', info);

    const [SMSFlag, setSMSFlag] = useState({
        open: false,
        flag: 0 // 이미 인증했는지 검증
    }); // 본인인증 확인유무

    const [modal, setModal] = useState(false); // 취소flag
    const [modal2, setModal2] = useState(false); // 취소

    useEffect(() => {
        dispatch(postBoardAppFlag({ experienceId: 109 }));
    }, []);

    const submit = async () => {
        try {
            const response = await axios({
                method: 'post',
                url: 'https://momsnote.net/application/delete',
                data: { applicationId: info.data.applicationId }
            });
            console.log('체험단 신청 취소 response: ', response.data);
            console.log('## response: ', response);
            navigation.goBack();
            setModal2(!modal2);
        } catch (error) {
            console.log('체험단 신청 취소 error: ', error);
        }
    }

    const renderItem = ({ item }) => (
        <View style={styles.container2}>
            <View style={styles.header}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>신청 정보</Text>
                <TouchableOpacity style={styles.headerBox}>
                    <Icon name='close' size={20} onPress={() => navigation.goBack()} />
                </TouchableOpacity>
            </View>
            <View style={styles.main}>
                <View style={styles.mainBox}>
                    <Text style={{ fontSize: 16, fontWeight: '500' }}>이름</Text>
                    <View style={styles.textBox}><Text>{info.data.memberName}</Text></View>
                </View>
                <View style={[styles.mainBox, { marginBottom: SMSFlag.open ? 10 : 30 }]}>

                    <Text style={{ fontSize: 16, fontWeight: '500' }}>연락처</Text>
                    <View style={styles.textBox}>
                        <Text>{info.data.tel}</Text>
                    </View>
                    <TouchableOpacity style={styles.certificateBox}>
                        <Check fill={'green'} />
                    </TouchableOpacity>
                </View>

                <View style={styles.mainBox}>
                    <Text style={{ fontSize: 16, fontWeight: '500' }}>SNS 계정</Text>
                    <Text style={{ color: '#757575', marginTop: 5 }}>리뷰에 사용할 계정은 계정 아이디(네이버는 블로그 주소 아이디)을 입력해주세요.</Text>
                    <View style={styles.textBox}><Text>{info.data.blog}</Text></View>
                    <View style={styles.textBox}><Text>{info.data.insta}</Text></View>
                    <View style={styles.textBox}><Text>{info.data.youtube}</Text></View>
                </View>
                <View style={styles.mainBox}>
                    <Text style={{ fontSize: 16, fontWeight: '500' }}>배송지</Text>
                    <View>
                        <View style={styles.textBox}><Text>{info.data.address}</Text></View>
                    </View>
                    <View style={styles.textBox}><Text>{info.data.addressDetails}</Text></View>
                </View>

                <View style={[styles.mainBox, { alignItems: 'center' }]}>
                    <TouchableOpacity style={styles.buttonBox} onPress={() => setModal(!modal)}><Text style={{ fontSize: 18 }}>신청 취소</Text></TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (

        <SafeAreaProvider>
            <SafeAreaView style={{ backgroundColor: 'white' }}>
                <StatusBar />
            </SafeAreaView>
            {info == 400 ? '' : <SafeAreaView style={styles.container}>

                <FlatList data={DATA} renderItem={renderItem}
                    keyExtractor={item => item.id} showsVerticalScrollIndicator={false}>
                </FlatList>

                <Modal animationType="fade" transparent={true} visible={modal} statusBarTranslucent={true}
                    onRequestClose={() => {
                        setModal(!modal)
                    }}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalView}>
                            <View style={styles.modalContainer2}>
                                <View style={styles.modalBox}>
                                    <Text style={{ fontSize: 16, paddingTop: 10 }}>체험단 신청을 취소하시겠습니까?</Text>
                                    <Text style={{ fontSize: 16, paddingTop: 5 }}>취소할 경우 선정자에서 제외됩니다.</Text>
                                </View>
                                <View style={styles.modalBox}>
                                    <TouchableOpacity style={styles.modal} onPress={() => { setModal(!modal), setModal2(!modal2) }}>
                                        <Text style={{ color: 'white', fontSize: 16 }}>네</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.modal, { backgroundColor: 'white', borderWidth: 1, borderColor: '#EEEEEE' }]} onPress={() => setModal(!modal)}>
                                        <Text style={{ color: 'black', fontSize: 16 }}>아니요</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>

                <Modal animationType="fade" transparent={true} visible={modal2} statusBarTranslucent={true}
                    onRequestClose={() => {
                        setModal2(!modal2)
                    }}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalView}>
                            <View style={styles.modalContainer2}>
                                <View style={styles.modalBox}>
                                    <Text style={{ fontSize: 16, paddingTop: 10 }}>참가하신 체험단 신청이 취소되었습니다.</Text>
                                </View>
                                <View style={styles.modalBox}>
                                    <TouchableOpacity style={styles.modal} onPress={() => { setModal2(!modal2), submit() }}>
                                        <Text style={{ color: 'white', fontSize: 16 }}>확인</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>

            </SafeAreaView>}

        </SafeAreaProvider>

    )
}

export default Withdraw