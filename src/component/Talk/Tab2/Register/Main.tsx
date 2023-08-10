import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Modal, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { getStatusBarHeight } from "react-native-status-bar-height"
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSelector, useDispatch } from 'react-redux'
import { postMaterialShare } from '../../../../Redux/Slices/MaterialShareSlice'

const styles = StyleSheet.create({
    container:{
        marginTop: getStatusBarHeight(),
        backgroundColor: 'white',
        flex: 1,
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
        padding: 10,
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
        padding: 10
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
const Register = ({navigation, route}) => {

    const DATA = [
        {
          id: '0',
          title: '전체'
        },
      ];

    const dispatch = useDispatch();
    const materialShareSet = useSelector(state => { return state.materialShare.refresh });
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [modal2Content, setModal2Content] = useState(''); // 완료시 모달 내용
    const [data, setData] = useState( // post info
        {
            boardCategory: '출산리스트 공유',
            title: '',
            contents: '',
        }
    );
    console.log('data: ', data);
    const [loading, setLoading] = useState();

    useEffect(()=>{
        const load = async() => {
            const asyncStorage = await AsyncStorage.getItem('materialList');
            switch(typeof(route.params)){
                case 'string': setData(JSON.parse(asyncStorage)); break;
                case 'object': {
                        setData(prevState => ({...prevState, title: route.params[0].title, contents: route.params[0].contents,
                            imageFile: [],
                            video: []
                            // imageFile: route.params[0].savedName.split('|').filter(x => x.charAt(x.length-1) == 'g'),
                            // video: route.params[0].savedName.split('|').filter(x => x.charAt(x.length-1) == 4)
                            })
                        )
                    }; break;
                default: AsyncStorage.removeItem('materialList');
        }
        }
        load();
    }, [])
    
    const complete = () => {
        setLoading(true);
        switch(true){
            case data.title === '': setModal2Content('제목을 입력해주세요.'); break;
            case data.contents === '': setModal2Content('게시글 내용을 입력해주세요.'); break;
            default: submit(), navigation.goBack(); return;
        }
        setLoading(false);
        setModalVisible2(!modalVisible2);
    }

    const submit = async() => {
        const token = await AsyncStorage.getItem('token');
        try{
          const response = await axios({
                method: 'post',
                url: 'https://momsnote.net/api/needs/share/save',
                headers: { 
                    'Authorization': `bearer ${token}`, 
                    'Content-Type': 'application/json'
                  },
                data: data
              });
          }catch(error){
            console.log('출산리스트 글쓰기 error: ', error);
          }
          dispatch(postMaterialShare(materialShareSet));
    }

    const boardSave = async(e) => {
        e == 1 ? AsyncStorage.setItem('materialList', JSON.stringify(data)) :  await AsyncStorage.removeItem('materialList');

        setModalVisible(!modalVisible);
        navigation.goBack();
    }

    const renderItem = ({ item }) => (
        <View style={styles.container2}>
            <View style={styles.header}>
                    <View style={[styles.headerBox, {width: '20%'}]}><Text style={{fontSize: 16}} onPress={()=>
                         data.title == '' && data.contents == '' ? 
                         navigation.goBack() : setModalVisible(!modalVisible)}>취소</Text>
                        </View>
                    <View style={[styles.headerBox, {width: '60%'}]}><Text style={{fontSize: 25, fontWeight: 'bold'}}>출산리스트 공유 등록</Text></View>
                    <View style={[styles.headerBox, {width: '20%'}]}><Text style={{color: '#FE7000', fontSize: 16, fontWeight: '600'}} onPress={()=>complete()}>완료</Text></View>
            </View>
            <View style={styles.main}>
                <View style={styles.mainBox}>
                    <Text style={{color: '#212121', fontSize: 24, fontWeight: '600'}}>맘스톡 게시판에</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{color: '#FE7000', fontSize: 24, fontWeight: '600'}}>출산리스트를 공유</Text>
                        <Text style={{fontSize: 24, fontWeight: '600'}}>해보세요.</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.mainBox2} onPress={()=>navigation.navigate('출산리스트')}>
                    <View style={styles.mainBox2Sub}><Text style={{color: '#424242', fontSize: 16}}>나의 출산리스트 보기</Text></View>
                    <View style={[styles.mainBox2Sub, {width: '20%', alignItems: 'flex-end'}]}><Icon name='angle-right' size={25}/></View>
                </TouchableOpacity>
                <TextInput style={styles.mainBox2} placeholder='제목을 입력해주세요.' placeholderTextColor={'#BDBDBD'} multiline={true}
                    value={data.title} onChangeText={(e) =>
                        setData((prevState) => ({
                            ...prevState,
                            title: e
                        }))}></TextInput>
                <TextInput style={[styles.mainBox2, {height: 220, textAlignVertical: 'top'}]} placeholder='게시글 내용을 작성해주세요.' placeholderTextColor={'#BDBDBD'}
                    multiline={true} numberOfLines={100} value={data.contents} onChangeText={(e) =>
                        setData((prevState) => ({
                            ...prevState,
                            contents: e
                        }))}></TextInput>
            </View>
        </View>
    );


   return loading ? <ActivityIndicator size={'large'} color='#E0E0E0' style={styles.container}/> : (
        <View style={styles.container}>
            <Modal animationType="fade" transparent={true} visible={modalVisible} statusBarTranslucent={true}
                onRequestClose={() => {
                setModalVisible(!modalVisible)}}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <View style={styles.modalContainer2}>
                            <View style={[styles.modalBox, {paddingTop: 15}]}>
                                <Text style={{fontSize: 16, paddingTop: 10}}>작성 중인 게시글을 취소합니다.</Text>
                                <Text style={{fontSize: 16, paddingTop: 5}}>해당 내용을 임시저장하시겠습니까?</Text>
                            </View>
                            <View style={styles.modalBox}>
                                <TouchableOpacity style={styles.modal} onPress={()=>boardSave(1)}>
                                    <Text style={{color: 'white', fontSize: 16}}>네</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.modal, {backgroundColor: 'white', borderWidth: 1, borderColor: '#EEEEEE'}]} onPress={()=>boardSave(0)}>
                                    <Text style={{color: 'black', fontSize: 16}}>아니요</Text>
                                </TouchableOpacity>
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
                        <View style={styles.modalBox}><Text style={{fontSize: 16, paddingTop: 10}}>{modal2Content}</Text></View>
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
