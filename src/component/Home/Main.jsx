import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Modal, SafeAreaView, StatusBar, Animated } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/Feather'
import * as MediaLibrary from 'expo-media-library'
import ViewShot from 'react-native-view-shot'
import { WithLocalSvg } from "react-native-svg"

import MainImage from '../../../public/assets/svg/main.svg'

import { useIsFocused } from '@react-navigation/native'

import { useSelector, useDispatch } from 'react-redux'
import { getList } from '../../Redux/Slices/CounterSlice'


const styles = StyleSheet.create({
    container:{
        height: '92%',
        backgroundColor: 'white',
    },
    container2:{

    },
    main:{
        height: 500,
        padding: 20,
        backgroundColor: '#FEECB3',
    },
    mainBox:{
        height: '20%',
        justifyContent: 'center',
    },
    mainBox2:{
        height: '60%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bubble:{
        width: 250,
        height: 30,
        position: 'absolute',
        zIndex: 999,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        transtion: '1s',
    },  
    imageBox:{
        width: '90%',
        height: '90%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainBox3:{
        height: '20%',
        flexDirection: 'row',
    },
    mainBox3Sub:{
        width: '30%',
        justifyContent: 'center',
    },
    captureBox:{
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FFF8E1',
        alignItems: 'center',
        justifyContent: 'center',
    },
    DdayBox:{
        alignItems: 'flex-end',
    },
    main3:{
        height: 250,
        paddingTop: 40,
        paddingBottom: 40,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: 'white',
    },
    main3Box:{
        flexDirection: 'row',
        padding: 3,
    },
    main3Box2:{
        width: '50%',
        padding: 3,
    },
    titleBox:{
        flexDirection: 'row',
        height: '25%',
    },
    title:{
        width: '50%',
        justifyContent: 'center',
        padding: 5
    },
    contentBox:{
        height: '75%',
    },
    content:{
        height: '30.4%',
        justifyContent: 'center',
        paddingLeft: 10,
    },
    main4:{
        backgroundColor: 'white',
        height: 300,
    },
    main4Box:{
        height: '20%',
        paddingLeft: 20,
        paddingRight: 20,
    },
    main4Box2:{
        height: 196,
        justifyContent: 'center',
        alignItems: 'center',
    },
    albumBox:{
        width: 156,
        margin: 10,
        padding: 5,
    },
    albumPhoto:{
        height: 156,
        borderWidth: 1,
        borderRadius: 10,
    },
    albumTitle:{
        height: 30,
        justifyContent: 'center',
    },
    triangle:{
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderLeftWidth: 25,
        borderRightWidth: 5,
        borderBottomWidth: 20,
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderBottomColor: "white",
        position: 'absolute',
        zIndex: 999,
        bottom: -10,
        right: 40,
        transform: [{ rotate: "180deg" }],
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
        marginBottom: 35,
        borderRadius: 15,
    },
    modalBox:{
        height: '15%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBox2:{
        height: '16%',
        justifyContent: 'center',
        paddingLeft: 30,
    },
    modalBox3:{
        height: '30%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal:{
        width: '90%',
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        marginBottom: 7,
        borderColor: '#FE7000',
        borderWidth: 1,
    },
    saveModalBox:{
        width: '100%',
        height: 40,
        position: 'absolute',
        zIndex: 1,
        bottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    saveModal:{
        width: '90%',
        height: 40,
        backgroundColor: 'black',
        opacity: 0.7,
        borderRadius: 10,
        justifyContent: 'center',
        paddingLeft: 20,
        
    },
})
const Home = ({navigation}) => {

    const DATA = [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: 'First Item',
        },
      ];

      const DATA2 = [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: 'First Item',
        },
        {
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
          title: 'Second Item',
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72',
          title: 'Third Item',
        },
        {
            id: '1',
        },
        {
            id: '2',
        },
    ];

    const count = useSelector(state => { return state.counter.data; });
    console.log('count: ', count);
    const dispatch = useDispatch();
    
    useEffect(()=>{
        console.log('useEffect');
        dispatch(getList());
    }, []);

    useEffect(()=>{
        async function b(){
            const response = await axios.get('http://192.168.1.140:4000/api/test');
            console.log('response: ', response.data);
          }
          b();
    }, [])

    const ref = useRef();
    const [test, setTest] = useState(); // 캡쳐 uri
    const [bubble, setBubble] = useState([true, false, false, false]); // 말풍선
    const [modalVisible, setModalVisible] = useState(false);
    const animation = useRef(new Animated.Value(0)).current;

    const [info, setInfo] = useState([
        {
            title: '저와 준비물 비교해 보아요'
        },{
            title: '별똥이 출산 준비물 이예요'
        },{
            title: '별똥이 DDay 입니다'
        }
    ]);
    const [info2, setInfo2] = useState([
        {
            title: '저와 준비물 비교해 보아요'
        },{
            title: '별똥이 출산 준비물 이예요'
        },{
            title: '별똥이 DDay 입니다'
        }
    ]);
    const [info3, setInfo3] = useState([
        {
            imgae: ''
        },{
            image: '',
        },{
            image: ''
        }
    ]);

    useEffect(()=>{
        setModalVisible(!modalVisible);
    }, []);

    useEffect(()=>{
        save();
    }, [test]);

    const save = async() => {
       
        if(test !== undefined){
            let { status } = await MediaLibrary.requestPermissionsAsync();
            const asset = await MediaLibrary.createAssetAsync(test);
            // const moms = await MediaLibrary.getAlbumAsync('맘스노트');

            console.log('status: ', status);
            console.log('asset: ', asset);
            // console.log('moms: ', moms);
           
            
            if(status === 'granted'){
                // const kwon = await MediaLibrary.getAlbumAsync('DCIM');
                // const moms = await MediaLibrary.getAlbumAsync('맘스노트');
                // if(moms === null){
                //     MediaLibrary.createAlbumAsync('맘스노트', asset);
                // }
                // MediaLibrary.addAssetsToAlbumAsync(moms, moms.id);
                // MediaLibrary.migrateAlbumIfNeededAsync(moms.id);
                // const album = await MediaLibrary.getAlbumAsync('맘스노트');
                // // console.log('album: ', album);
    
                // MediaLibrary.createAlbumAsync('맘스노트', asset);
                // // const asset = await MediaLibrary.createAssetAsync(test);
            }
        }
        setTest(undefined);
    }

    const capture = async() => {
        opacity_ani();
        setTest('1');

        ref.current.capture().then(uri => {
            setTest(uri);
          });
    }

    const bubbleRandom = () => {
        let number = bubble.indexOf(true);
        let arr = Array.from({length: 4}, ()=>{return false});
        if(number === 3){ number = -1 }
        arr[number+1] = !arr[number+1];
        setBubble(arr); 
    }
    const opacity_ani = () => {
        Animated.timing(animation, {
            toValue: 1,
            useNativeDriver: true,
            duration: 1500,
        }).start(()=>{
            Animated.timing(animation, {
                toValue: 0,
                useNativeDriver: true,
                duration: 1500,
            }).start();
        });
    }

    const complete = () => { // modal

    }

    const FocusAwareStatusBar = () => {
        const isFocused = useIsFocused();
        return isFocused ? <StatusBar backgroundColor='#FEECB3' /> : null;
    }

    const renderItem = ({ item }) => (
        <View style={styles.container2}>
            <ViewShot style={[styles.main]} ref={ref} options={{ fileName: "MomsNote", format: "png", quality: 1 }}>
                <View style={styles.mainBox}>
                    <Text style={{color: '#424242', fontSize: 18}}>2022년 12월 02일</Text>
                    <Text style={{color: '#212121', fontSize: 32, fontWeight: '700'}}>별똥이</Text>
                </View>
                <View style={styles.mainBox2}>

                    <View style={[styles.bubble, {top: 20, right: 20, display: bubble[0] ? 'flex' : 'none'}]}>
                        <View style={[styles.triangle, {borderBottomColor: bubble[0] ? 'white' : 'transparent'}]}></View>
                        <Text>아무말이나 하고싶어요</Text>
                    </View>
                    <View style={[styles.bubble, {top: 10, right: 70, display: bubble[1] ? 'flex' : 'none'}]}>
                        <View style={[styles.triangle, {borderBottomColor: bubble[1] ? 'white' : 'transparent'}]}></View>
                        <Text>출산리스트 맘스토크 체험단</Text>
                    </View>
                    <View style={[styles.bubble, {top: 60, right: 60, display: bubble[2] ? 'flex' : 'none'}]}>
                        <View style={[styles.triangle, {borderBottomColor: bubble[2] ? 'white' : 'transparent'}]}></View>
                        <Text>First Item Second Item</Text>
                    </View>
                    <View style={[styles.bubble, {top: 40, right: 80, display: bubble[3] ? 'flex' : 'none'}]}>
                        <View style={[styles.triangle, {borderBottomColor: bubble[3] ? 'white' : 'transparent'}]}></View>
                        <Text>IDENITIDENITIDENITIDENIT</Text>
                    </View>

                    <View style={styles.imageBox}><MainImage width={300} height={300} onPress={bubbleRandom}/></View>
                </View>
                <View style={styles.mainBox3}>
                    <View style={styles.mainBox3Sub}>
                        <TouchableOpacity style={[styles.captureBox, {display: test === undefined ? 'flex' : 'none'}]} onPress={capture}>
                            <Icon2 name='download' size={22} style={{color: '#FE9000'}} />
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.mainBox3Sub, {width: '70%'}]}>
                        <View style={styles.DdayBox}>
                            <Text style={{color: '#FE9000', fontSize: 24, fontWeight: '700', marginBottom: 3}}>D-183 (45주차 3일)</Text>
                            <Text style={{color: '#424242', fontSize: 15}}>예정일 : 2022년 10월 31일</Text>
                        </View>
                    </View>
                </View> 
            </ViewShot>
            <View style={styles.main3}>
                <View style={styles.main3Box}>
                    <View style={styles.main3Box2}>
                        <View style={styles.titleBox}>
                            <View style={styles.title}><Text style={{fontSize: 18, fontWeight: 'bold'}}>출산 리스트</Text></View>
                            <View style={[styles.title, {alignItems: 'flex-end'}]}><Text style={{color: '#9E9E9E', fontSize: 13}}>+ 더보기</Text></View>
                        </View>
                        {info.length !== 0 ? <View style={styles.contentBox}>
                            <View style={styles.content}>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={{fontWeight: '700'}}>1 </Text>
                                    <Text> {info[0].title}</Text>
                                </View>
                            </View>
                            <View style={styles.content}>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={{fontWeight: '700'}}>2 </Text>
                                    <Text> {info[1].title}</Text>
                                </View>
                            </View>
                            <View style={styles.content}>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={{fontWeight: '700'}}>3 </Text>
                                    <Text> {info[2].title}</Text>
                                </View>
                            </View>
                        </View> : <View style={[styles.contentBox, {justifyContent: 'center', alignItems: 'center'}]}>
                            <Text style={{color: '#757575'}}>등록된</Text>
                            <Text style={{color: '#757575'}}>게시물이 없습니다.</Text>
                        </View>}
                    </View>
                    <View style={[styles.main3Box2, {borderLeftWidth: 1, borderColor: '#EEEEEE',}]}>
                        <View style={styles.titleBox}>
                            <View style={styles.title}><Text style={{fontSize: 18, fontWeight: 'bold'}}>맘스 토크</Text></View>
                            <View style={[styles.title, {alignItems: 'flex-end'}]}><Text style={{color: '#9E9E9E', fontSize: 13}}>+ 더보기</Text></View>
                        </View>
                        {info.length === 0 ? <View style={styles.contentBox}>
                            <View style={styles.content}>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={{fontWeight: '700'}}>1 </Text>
                                    <Text> {info[0].title}</Text>
                                </View>
                            </View>
                            <View style={styles.content}>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={{fontWeight: '700'}}>2 </Text>
                                    <Text> {info[1].title}</Text>
                                </View>
                            </View>
                            <View style={styles.content}>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={{fontWeight: '700'}}>3 </Text>
                                    <Text> {info[2].title}</Text>
                                </View>
                            </View>
                        </View> : <View style={[styles.contentBox, {justifyContent: 'center', alignItems: 'center'}]}>
                            <Text style={{color: '#757575'}}>등록된</Text>
                            <Text style={{color: '#757575'}}>게시물이 없습니다.</Text>
                        </View>}
                    </View>
                </View>
            </View>
            <View style={styles.main4}>
                <View style={styles.main4Box}>
                    <View style={[styles.titleBox, {height: '100%'}]}>
                        <View style={styles.title}><Text style={{fontSize: 20, fontWeight: 'bold'}}>맘스 정보</Text></View>
                        <View style={[styles.title, {alignItems: 'flex-end'}]}><Text style={{color: '#9E9E9E', fontSize: 13}}>+ 더보기</Text></View>
                    </View>
                </View>
                <View style={styles.main4Box2}>
                {info3.length === 0 ?<FlatList data={DATA2} renderItem={renderItem2}
                        keyExtractor={item => item.id} horizontal={true}>
                </FlatList> : <View><Text style={{color: '#757575'}}>새로운 정보가 없습니다.</Text></View>}
                </View>
            </View>
            

        </View>
    );
    
    const renderItem2 = ({ item }) => (
        <View style={styles.albumBox}>
            <View style={styles.albumPhoto}></View>
            <View style={styles.albumTitle}><Text>{item.title}</Text></View>
        </View>
    );
    
  return count.length !== 0 ? (
    <SafeAreaView style={[styles.container, {backgroundColor: '#FEECB3'}]}>
        
      <FocusAwareStatusBar />
        <Modal animationType="fade" transparent={true} visible={modalVisible}
            onRequestClose={() => {
            setModalVisible(!modalVisible)}}>
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <View style={[styles.modalContainer2, {height: 400}]}>
                        <View style={styles.modalBox}>
                            <Text style={{fontSize: 16, paddingTop: 10, color: '#212121', fontWeight: '600'}}>원하는 출산준비물 리스트를 선택해주세요.</Text>
                        </View>
                        <View style={styles.modalBox3}>
                            <TouchableOpacity style={styles.modal}><Text style={{color: '#FE7000', fontSize: 15, fontWeight: '500'}}>실제맘 추천 리스트</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.modal} onPress={()=> setModalVisible(!modalVisible)}><Text style={{color: '#FE7000', fontSize: 16, fontWeight: '500'}}>직접 작성</Text></TouchableOpacity>
                        </View>
                        <View style={styles.modalBox2}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{color: '#212121', fontWeight: '600', fontSize: 15}}>실제맘 추천 리스트 :</Text>
                                <Text> 많은 임산부들이 추천한 품</Text>
                            </View>
                            <Text>목을 필수, 권장, 선택 항목으로 나눠서 알기 쉽게</Text>
                            <Text>보여준답니다.</Text>
                        </View>
                        <View style={styles.modalBox2}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{color: '#212121', fontWeight: '600', fontSize: 15}}>직접 작성 :</Text>
                                <Text> 카테고리만 기본 제공하며, 필요한 품</Text>
                            </View>
                            <Text>목을 직접 작성할 수 있어요.</Text>
                        </View>
                        <View style={[styles.modalBox2, {height: '15%'}]}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{color: '#EF1E1E'}}>Tip! </Text>
                                <Text style={{color: '#757575'}}>초보엄마라면 추천 리스트를 바탕으로 나에게</Text>
                            </View>
                            <Text style={{color: '#757575'}}>맞는 출산준비물 리스트를 작성해 보세요.</Text>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>

        <FlatList data={DATA} renderItem={renderItem}
            keyExtractor={item => item.id}>
        </FlatList>
        <Animated.View style={[styles.saveModalBox, {opacity: animation}]}>
            <View style={styles.saveModal}>
                <Text style={{color: 'white'}}>출산 리스트가 내 앨범에 저장되었습니다.</Text>
            </View>
        </Animated.View>
    </SafeAreaView>
  ) : ''
}

export default Home