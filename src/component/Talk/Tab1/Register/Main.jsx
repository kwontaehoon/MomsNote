import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, FlatList, TextInput, SafeAreaView, Modal, Image, StatusBar, Platform, BackHandler } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/AntDesign'
import { getStatusBarHeight } from "react-native-status-bar-height"
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { postBoard } from '../../../../Redux/Slices/BoardSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import moment from 'moment'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { postUser } from '../../../../Redux/Slices/UserSlice'
import * as FileSystem from 'expo-file-system'
import { Video } from 'expo-av'

const styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS == 'ios' ? 0 : getStatusBarHeight(),
        backgroundColor: 'white',
        flex: 1,
    },
    container2: {

    },
    header: {
        height: 60,
        flexDirection: 'row',
    },
    headerBox: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    header2: {
        padding: 10,
        height: 60,
        backgroundColor: '#FEECB3',
        flexDirection: 'row',
        alignItems: 'center',
    },
    header2Box: {
        width: '75%',
        flexDirection: 'row',
    },
    profileBox: {
        width: 30,
        height: 30,
        borderRadius: 999,
    },
    infoBox: {
        justifyContent: 'center',
        paddingLeft: 8,
    },
    header2Box2: {
        position: 'absolute',
        right: 10,
    },
    header3: {
        padding: 15,
    },
    header3Box: {
    },
    titleBox: {
        height: 40,
        justifyContent: 'center',
    },
    filterBox: {
        height: 60,
    },
    filter: {
        height: 40,
        borderWidth: 1,
        borderColor: '#EEEEEE',
        margin: 5,
        borderRadius: 20,
        paddingTop: 8,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    textBox: {
        borderWidth: 1,
        borderColor: '#EEEEEE',
        height: 48,
        marginTop: 20,
        paddingLeft: 10,
    },
    textBox2: {
        borderWidth: 1,
        borderColor: '#EEEEEE',
        height: 200,
        marginTop: 20,
        textAlignVertical: "top",
        padding: 10,
        lineHeight: 20,
    },
    main: {
        padding: 15,
    },
    mainBox: {
        marginBottom: 20,
    },
    album: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    albumLeft: {
        borderColor: '#E0E0E0',
        borderRadius: 5,
        width: '20%',
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
    albumRight: {
        width: '80%',
    },
    filter2: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    start: {
        position: 'absolute',
        top: 20,
        left: 20,
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 999,
        zIndex: 999,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    close: {
        position: 'absolute',
        right: 7,
        top: 7,
        width: 20,
        height: 20,
        borderRadius: 10,
        zIndex: 999,
        backgroundColor: '#757575',
        alignItems: 'center',
        justifyContent: 'center',
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
        padding: 10,
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
const Register = ({ navigation, route }) => {

    console.log('## route params: ', route.params);

    const boardSet = useSelector(state => { return state.board.refresh; });

    const DATA = [{ id: '0', title: '전체' }];

    const DATA2 = [
        {
            id: '0',
            title: '자유게시판'
        },
        {
            id: '1',
            title: '일상이야기'
        },
        {
            id: '2',
            title: '임신정보'
        },
        {
            id: '3',
            title: '고민상담'
        },
        {
            id: '4',
            title: '질문게시판'
        },
    ];
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false); // 완료시 모달창
    const [modalVisible2, setModalVisible2] = useState(false); // 취소시 모달창
    const [modal2Content, setModal2Content] = useState(false); // 완료시 모달 내용
    const [filter, setFilter] = useState(Array.from({ length: 5 }, () => { return false })); // 카테고리
    const [userInfo, setUserInfo] = useState();
    const user = useSelector(state => { return state.user.data; });

    const [loading, setLoading] = useState(false); // 완료시 로딩

    const [info, setInfo] = useState( // post info
        {
            title: '',
            contents: '',
            files: '',
            imageFile: [],
            video: [],
        }
    );
    console.log('### info: ', info, route.params);

    useEffect(() => {
        dispatch(postUser());
        const load = async () => {
            const asyncStorage = await AsyncStorage.getItem('momsTalk');
            const user = await AsyncStorage.getItem('user');
            switch (typeof (route.params)) {
                case 'string': setInfo(JSON.parse(asyncStorage)); break;
                case 'object': {
                    const arr = [...filter];
                    arr[DATA2.findIndex(x=>x.title == route.params[0].subcategory)] = true;
                    setFilter(arr)
                    setInfo(prevState => ({
                        ...prevState, title: route.params[0].title, contents: route.params[0].contents,
                        imageFile: !route?.params[0]?.savedName ? '' : route?.params[0]?.savedName.split('|').filter(x => x.charAt(x.length-1) == 'g'),
                        video: !route?.params[0]?.savedName ? '' : route?.params[0]?.savedName.split('|').filter(x => x.charAt(x.length-1) == 4)
                    })
                    )
                }; break;
                default: AsyncStorage.removeItem('momsTalk');
            }
            setUserInfo(JSON.parse(user));
        }
        load();

        const backAction = () => {
            if(info.title.trim() == '' && info.contents.trim() == '' && info.files == '' && info.imageFile.length == 0 && info.video.length == 0){
                navigation.goBack();
            }else{
                setModalVisible(!modalVisible);
            }
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);



    const change = (e) => { // 카테고리 배경색상, 글자 색상 변경
        let arr = Array.from({ length: 5 }, () => { return false });
        arr[e] = !arr[e];
        setFilter(arr);
    }

    const pickImage = async () => {
        if (info.imageFile.length === 7) {
            setModal2Content('이미지는 최대 7장 업로드 가능합니다.');
            setModalVisible2(!modalVisible2); return;
        }
        let arr = [];
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            allowsEditing: false
        });

        if (!result.canceled) {
            arr = [...info.imageFile];
            arr.push(result.assets[0].uri);
            setInfo((prevState) => ({
                ...prevState,
                imageFile: arr
            }))
        }
    };

    const pickVideo = async () => {

        
        if (info.video.length === 1) {
            setModal2Content('동영상은 최대 1개만 업로드 가능합니다.');
            setModalVisible2(!modalVisible2); return;
        }
        let arr = [];
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            arr = [result.assets[0].uri];
            const size = await FileSystem.getInfoAsync(result.uri);
            if(size.size /1024/1024 > 100){
                setModal2Content('100MB 미만의 동영상을 등록해 주세요.');
                setModalVisible2(!modalVisible2);
            }else{
                setInfo((prevState) => ({
                    ...prevState,
                    video: arr
                }));
            }
        }
    };


    const complete = async () => {
        switch (true) {
            case filter.filter(x => x === true).length === 0: setModal2Content('카테고리를 선택해주세요.'); break;
            case info.title === '': setModal2Content('제목을 입력해주세요.'); break;
            case info.contents === '': setModal2Content('게시글 내용을 입력해주세요.'); break;
            case typeof (route.params) == 'object': edit(); return;
            default: submit(); return;
        }
        setModalVisible2(!modalVisible2);
    }

    const submit = async () => {
        setLoading(true);
        let data = new FormData();
        data.append('category', '맘스 토크');
        data.append('subcategory', DATA2[filter.findIndex(x => x === true)].title);
        data.append('title', info.title);
        data.append('contents', info.contents);
        // data.append('files', {uri: info.video, name: 'board.mp4', type: 'video/mp4'});

        if (info.imageFile) {
            info.imageFile.filter(x => {
                data.append('files', { uri: x, name: 'board.png', type: 'image/png' });
            })
        }

        if (info.video) {
            info.video.filter(x => {
                data.append('files', { uri: x, name: 'board.mp4', type: 'video/mp4' });
            })
        }
        const token = await AsyncStorage.getItem('token');
        setTimeout(async() => {
            try {
                const response = await axios({
                    method: 'post',
                    url: 'https://momsnote.net/api/board/write',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `bearer ${token}`
                    },
                    data: data
                });
                console.log('response: ', response.data);
                setLoading(false);
                dispatch(postBoard(boardSet));
                navigation.goBack();
            } catch (error) {
                console.log('error: ', error);
                alert(`게시글 작성 error: ${error}`);
            }
        }, 3000);
        
    }

    const edit = async () => {

        console.log('### submit info: ', info);

        const token = await AsyncStorage.getItem('token');
        let data = new FormData();
        data.append('subcategory', DATA2[filter.findIndex(x => x)].title);
        data.append('title', info.title);
        data.append('contents', info.contents);
        route.params[0] ? data.append('boardId', route.params[0].boardId) : ''
        
        if (info.imageFile) {
            info.imageFile.filter(x => {
                data.append('files', { uri: x, name: 'board.png', type: 'image/png' });
            })
        }

        if (info.video) {
            info.video.filter(x => {
                data.append('files', { uri: x, name: 'board.mp4', type: 'video/mp4' });
            })
        }

        try {
            const response = await axios({
                method: 'post',
                url: 'https://momsnote.net/api/board/update',
                headers: {
                    'Authorization': `bearer ${token}`
                },
                data: data
            });
            console.log('### edit response: ', response.data);
        } catch (error) {
            console.log('### edit 게시판 수정 error: ', error);
        }
        dispatch(postBoard(boardSet));
    }

    const close = (id, name) => {
        let arr = [];
        if (name === 'video') {
            setInfo((prevState) => ({
                ...prevState,
                video: arr
            }))
        } else {
            const arr2 = info.imageFile.filter((x, index) => { return index !== id });
            setInfo((prevState) => ({
                ...prevState,
                imageFile: arr2
            }))
        }
    }

    const boardSave = async (e) => {
        e == 1 ? AsyncStorage.setItem('momsTalk', JSON.stringify(info)) : await AsyncStorage.removeItem('momsTalk');

        setModalVisible(!modalVisible);
        navigation.goBack();
    }


    const renderItem = ({ item }) => (
        <View style={styles.container2}>
            <View style={styles.header}>
                <View style={[styles.headerBox, { width: '20%' }]}>
                    <Text style={{ fontSize: 16 }} onPress={() =>
                        info.title == '' && info.contents == '' && info.files == '' && info.imageFile.length == 0
                            && info.video.length == 0 ?
                            navigation.goBack() : setModalVisible(!modalVisible)
                    }>취소</Text></View>
                <View style={[styles.headerBox, { width: '60%' }]}><Text style={{ fontSize: 25, fontWeight: 'bold' }}>글쓰기</Text></View>
                <View style={[styles.headerBox, { width: '20%' }]}><Text style={{ color: '#FE7000', fontSize: 16, fontWeight: '600' }} onPress={complete}>완료</Text></View>
            </View>
            <View style={styles.header2}>
                <View style={styles.header2Box}>
                    <Image source={{ uri: `https://momsnote.s3.ap-northeast-2.amazonaws.com/profile/${user.profile}` }} style={styles.profileBox} />
                    <View style={styles.infoBox}><Text style={{ fontSize: 20, fontWeight: 'bold' }}>{userInfo.nickname}</Text></View>
                </View>
                <View style={styles.header2Box2}>
                    <View><Text>임신 {user.week}주차</Text></View>
                </View>
            </View>
            <View style={styles.header3}>
                <View style={styles.header3Box}>
                    <View style={styles.titleBox}><Text style={{ fontSize: 16, color: '#424242', fontWeight: '600' }}>카테고리</Text></View>
                    <View style={styles.filterBox}>
                        <FlatList data={DATA2} renderItem={renderItem2}
                            keyExtractor={item => item.id} showsHorizontalScrollIndicator={false} horizontal={true}>
                        </FlatList>
                    </View>
                </View>
            </View>
            <View style={styles.main}>
                <View style={styles.mainBox}>
                    <Text style={{ fontSize: 16, color: '#424242', fontWeight: '600' }}>제목</Text>
                    <TextInput style={styles.textBox} placeholder='제목을 입력해주세요.' placeholderTextColor={'#BDBDBD'} value={info.title}
                        onChangeText={(e) => setInfo((prevState) => ({ ...prevState, title: e }))}>
                    </TextInput>
                </View>
                <View style={styles.mainBox}>
                    <Text style={{ fontSize: 16, color: '#424242', fontWeight: '600' }}>내용</Text>
                    <TextInput style={styles.textBox2} placeholder='게시물 내용을 작성해주세요.' placeholderTextColor={'#BDBDBD'} value={info.contents} multiline={true} numberOfLines={100}
                        onChangeText={(e) => setInfo((prevState) => ({ ...prevState, contents: e }))}>
                    </TextInput>
                </View>
                <View style={styles.mainBox} >
                    <Text style={{ fontSize: 16, color: '#424242', fontWeight: '600' }}>이미지 첨부</Text>
                    <View style={styles.album}>
                        <TouchableOpacity style={styles.albumLeft} onPress={pickImage}>
                            <Icon name='camera' size={22} />
                            <Text>{info.imageFile.length}/7</Text>
                        </TouchableOpacity>
                        <View style={styles.albumRight}>
                            <FlatList data={info.imageFile} renderItem={renderItem3}
                                keyExtractor={(item, index) => String(index)} showsHorizontalScrollIndicator={false} horizontal={true}>
                            </FlatList>
                        </View>
                    </View>
                </View>
                <View style={styles.mainBox} >
                    <Text style={{ fontSize: 16, color: '#424242', fontWeight: '600' }}>동영상 첨부</Text>
                    <View style={styles.album}>
                        <TouchableOpacity style={styles.albumLeft} onPress={pickVideo}>
                            <Icon name='camera' size={22} />
                            <Text>{info.video.length}/1</Text>
                        </TouchableOpacity>
                        <View style={styles.albumRight}>
                            <FlatList data={info.video} renderItem={renderItem4}
                                keyExtractor={item => item.id} showsHorizontalScrollIndicator={false} horizontal={true}>
                            </FlatList>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );

    const renderItem2 = ({ item }) => (
        <TouchableOpacity style={[styles.filter, { backgroundColor: filter[item.id] ? '#FEA100' : 'white' }]} onPress={() => change(item.id)}>
            <Text style={{ color: filter[item.id] ? 'white' : 'black', fontWeight: '400' }}>{item.title}</Text>
        </TouchableOpacity>
    );

    const renderItem3 = ({ item, index }) => (
        <View style={styles.filter2}>
            <TouchableOpacity style={styles.close} onPress={() => close(index, 'image')}>
                <Icon2 name='close' size={16} style={{ color: 'white' }} />
            </TouchableOpacity>
            <Image source={{ uri: !item.includes('file') ?  `https://momsnote.s3.ap-northeast-2.amazonaws.com/board/${item}` : item }} style={{ width: 80, height: 80, borderRadius: 5 }} />
        </View>
    );

    const renderItem4 = ({ item }) => (
        <View style={styles.filter2}>
            <TouchableOpacity style={styles.close} onPress={() => close(item.image, 'video')}>
                <Icon2 name='close' size={16} style={{ color: 'white' }} />
            </TouchableOpacity>
            <View>
                <Video source={{ uri: typeof (route.params) == 'object' ?  `https://momsnote.s3.ap-northeast-2.amazonaws.com/board/${item}` : item }} style={{ width: 80, height: 80, borderRadius: 5 }} />
                <View style={styles.start}>
                    <Icon name='play' size={17} style={{ color: 'white' }} />
                </View>
            </View>
        </View>
    );


    return loading ? <ActivityIndicator size={'large'} color='#E0E0E0' style={styles.container}/> : (
        <SafeAreaProvider>

            <SafeAreaView style={{ backgroundColor: 'white' }}>
                <StatusBar />
            </SafeAreaView>

            {userInfo == undefined ? <View></View> : <SafeAreaView style={[styles.container, { height: Platform.OS == 'ios' ? '94%' : '90.5%' }]}>

                <Modal animationType="fade" transparent={true} visible={modalVisible} statusBarTranslucent={true}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible)
                    }}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalView}>
                            <View style={styles.modalContainer2}>
                                <View style={styles.modalBox}>
                                    <Text style={{ fontSize: 16, paddingTop: 10 }}>작성 중인 내용이 존재합니다.</Text>
                                    <Text style={{ fontSize: 16, paddingTop: 5 }}>해당 내용을 임시저장하시겠습니까?</Text>
                                </View>
                                <View style={styles.modalBox}>
                                    <TouchableOpacity style={styles.modal} onPress={() => boardSave(1)}><Text style={{ color: 'white', fontSize: 16 }}>네</Text></TouchableOpacity>
                                    <TouchableOpacity style={[styles.modal, { backgroundColor: 'white', borderWidth: 1, borderColor: '#EEEEEE' }]} onPress={() => boardSave(0)}>
                                        <Text style={{ color: 'black', fontSize: 16 }}>아니요</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal animationType="fade" transparent={true} visible={modalVisible2} statusBarTranslucent={true}
                    onRequestClose={() => {
                        setModalVisible2(!modalVisible2)
                    }}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalView}>
                            <View style={styles.modalContainer2}>
                                <View style={styles.modalBox}><Text style={{ fontSize: 16, paddingTop: 10 }}>{modal2Content}</Text></View>
                                <View style={styles.modalBox}>
                                    <TouchableOpacity style={styles.modal} onPress={complete}><Text style={{ color: 'white', fontSize: 16 }}>확인</Text></TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>

                <FlatList data={DATA} renderItem={renderItem}
                    keyExtractor={item => item.id} showsVerticalScrollIndicator={false}>
                </FlatList>
            </SafeAreaView>}
        </SafeAreaProvider>
    )
}

export default Register