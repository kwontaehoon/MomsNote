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
    header2:{
        padding: 10,
        height: 60,
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
        width: 30,
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
    header3:{
        padding: 15,
    },
    header3Box:{
    },
    titleBox:{
        height: 40,
        justifyContent: 'center',
    },
    filterBox:{
        height: 60,
    },
    filter:{
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
    textBox:{
        borderWidth: 1,
        borderColor: '#EEEEEE',
        height: 48,
        marginTop: 20,
        paddingLeft: 10,
    },
    textBox2:{
        borderWidth: 1,
        borderColor: '#EEEEEE',
        height: 200,
        marginTop: 20,
        paddingBottom: 150,
        paddingLeft: 10,
    },
    main:{
        padding: 15,
    },
    mainBox:{
        marginBottom: 20,
    },
    album:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    albumLeft:{
        borderColor: '#E0E0E0',
        borderRadius: 5,
        width: '20%',
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
    albumRight:{
        width: '80%',
    },
    filter2:{
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    start:{
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
    close:{
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

    const DATA = [
        {
          id: '0',
          title: '전체'
        },
    ];

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
            title: '고민 상담'
        },
        {
            id: '4',
            title: '질문 게시판'
        },
    ];
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [filter, setFilter] = useState(Array.from({length: 5}, () => {return false})); // 카테고리
    const [image, setImage] = useState([]); // image
    console.log('image: ', image);
    const [video, setVideo] = useState([]);
    console.log('Video: ', video);

    const change = (e) => { // 카테고리 배경색상, 글자 색상 변경
        let arr = Array.from({length: 5}, () => {return false});
        arr[e] = !arr[e];
        setFilter(arr);
    }

    const pickImage = async () => {
        let arr = [];
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        console.log('result: ', result.assets);
        
  
      if (!result.canceled) {
        arr = [...image];
        arr.push({
            id: image.length,
            image: result.assets[0].uri
        });
        setImage(arr);
      }
    };

    const pickVideo = async () => {
        let arr = [];
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Videos,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        console.log('result: ', result.assets);
        
  
      if (!result.canceled) {
        arr = [];
        arr.push({
            id: video.length,
            image: result.assets[0].uri
        });
        setVideo(arr);
      }
    };

    

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

    const close = (id, name) => {
        let arr = [];
        if(name === 'video'){
            setVideo(arr);
        }else{
            
            const arr2 = image.filter((x, index)=> {return id !== index});
            setImage(arr2);
        }
    }

    const renderItem = ({ item }) => (
        <View style={styles.container2}>
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
            <View style={styles.header3}>
                <View style={styles.header3Box}>
                    <View style={styles.titleBox}><Text style={{fontSize: 16, color: '#424242'}}>카테고리</Text></View>
                    <View style={styles.filterBox}>
                        <FlatList data={DATA2} renderItem={renderItem2}
                            keyExtractor={item => item.id} showsHorizontalScrollIndicator={false} horizontal={true}>
                        </FlatList>
                    </View>
                </View>
            </View>
            <View style={styles.main}>
                <View style={styles.mainBox}>
                    <Text style={{fontSize: 16, color: '#424242'}}>제목</Text>
                    <TextInput style={styles.textBox} placeholder='제목을 입력해주세요.' placeholderTextColor={'#BDBDBD'}></TextInput>
                </View>
                <View style={styles.mainBox}>
                    <Text style={{fontSize: 16, color: '#424242'}}>내용</Text>
                    <TextInput style={styles.textBox2} placeholder='제목을 입력해주세요.' placeholderTextColor={'#BDBDBD'}></TextInput>
                </View>
                <View style={styles.mainBox} >
                    <Text style={{fontSize: 16, color: '#424242'}}>이미지 첨부</Text>
                    <View style={styles.album}>
                        <TouchableOpacity style={styles.albumLeft} onPress={pickImage}>
                            <Icon name='camera' size={22}/>
                            <Text>{image.length}/7</Text>
                        </TouchableOpacity>
                        <View style={styles.albumRight}>
                        <FlatList data={image} renderItem={renderItem3}
                            keyExtractor={item => item.id} showsHorizontalScrollIndicator={false} horizontal={true}>
                        </FlatList>
                        </View>
                    </View>
                </View>
                <View style={styles.mainBox} >
                    <Text style={{fontSize: 16, color: '#424242'}}>동영상 첨부</Text>
                    <View style={styles.album}>
                        <TouchableOpacity style={styles.albumLeft} onPress={pickVideo}>
                            <Icon name='camera' size={22}/>
                            <Text>{video.length}/1</Text>
                        </TouchableOpacity>
                        <View style={styles.albumRight}>
                        <FlatList data={video} renderItem={renderItem4}
                            keyExtractor={item => item.id} showsHorizontalScrollIndicator={false} horizontal={true}>
                        </FlatList>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );

    const renderItem2 = ({ item }) => (
        <TouchableOpacity style={[styles.filter, {backgroundColor: filter[item.id] ? '#FEA100' : 'white'}]} onPress={()=>change(item.id)}>
            <Text style={{color: filter[item.id] ? 'white' : 'black', fontWeight: '400'}}>{item.title}</Text>
        </TouchableOpacity>
    );

    const renderItem3 = ({ item }) => (
        <View style={styles.filter2}>
            <TouchableOpacity style={styles.close} onPress={()=>close(item.id, 'image')}>
                <Icon2 name='close' size={16} style={{color: 'white'}}/>
            </TouchableOpacity>
            <Image source={{ uri: item.image }} style={{ width: 80, height: 80, borderRadius: 5,}} />
        </View>
    );

    const renderItem4 = ({ item }) => (
        <View style={styles.filter2}>
            <TouchableOpacity style={styles.close} onPress={()=>close(item.id, 'video')}>
                <Icon2 name='close' size={16} style={{color: 'white'}}/>
            </TouchableOpacity>
            <View>
                <Image source={{ uri: item.image }} style={{ width: 80, height: 80, borderRadius: 5,}}/>
                <View style={styles.start}>
                    <Icon name='play' size={17} style={{color: 'white'}}/>
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

            <FlatList data={DATA} renderItem={renderItem}
                keyExtractor={item => item.id} showsVerticalScrollIndicator={false}>
            </FlatList>
        </View>
  )
}

export default Register