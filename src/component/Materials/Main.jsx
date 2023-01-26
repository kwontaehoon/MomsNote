import React, { useState, useEffect, useRef } from 'react'
import { getStatusBarHeight } from "react-native-status-bar-height"; 
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator, SafeAreaView, StatusBar, Platform, Animated } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon3 from 'react-native-vector-icons/Feather'
import Checkbox from 'expo-checkbox';
import BrendModal from './Modal/BrendModal'
import CheckboxModal from './Modal/CheckBoxModal';
import NoticeModal from './Modal/NoticeModal';
import GuideModal from './Modal/GuideModal'
import ResetModal from './Modal/ResetModal'
import ResetModal2 from './Modal/ResetModal2'
import DotModal from './Modal/DotModal'
import AddModal from './Modal/AddModal'
import DeleteModal from './Modal/DeleteModal'
import Filter from './Modal/Filter'
import BrandNameFlag from './Modal/BrendNameFlag'
import First from '../Modal/First'
import Second from '../Modal/Second'
import { useIsFocused } from '@react-navigation/native'
import * as MediaLibrary from 'expo-media-library'
import ViewShot from 'react-native-view-shot'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import { postMaterial } from '../../Redux/Slices/MaterialSlice'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import More from '../../../public/assets/svg/More.svg'
import Sort from '../../../public/assets/svg/Sort.svg'
import Download from '../../../public/assets/svg/Download.svg'
import Search from '../../../public/assets/svg/Search.svg'
import Bell from '../../../public/assets/svg/Bell.svg'
import MyPage from '../../../public/assets/svg/Mypage.svg'
import ArrowRight from '../../../public/assets/svg/Arrow-Right.svg'
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
  container:{
    backgroundColor: 'white',
    marginTop: Platform.OS == 'ios' ? 0 : getStatusBarHeight(),
  },
  header:{
    height: 60,
    justifyContent: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#F5F5F5'
  },
  headerBar:{
      position: 'absolute',
      right: 20,
      alignItems: 'center',
      flexDirection: 'row',
  },
  header2:{
    height: 55,
    justifyContent: 'center',
    padding: 15,
  },
  headerBox2:{
    position: 'absolute',
    zIndex: 10,
    right: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  main:{
  },
  mainBox:{
    backgroundColor: '#F5F5F5',
  },
  mainBox2:{
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
  },
  titleBox:{
    justifyContent: 'center',
  },
  arrowBox:{
    position: 'absolute',
    right: 15,
  },
  main3:{
    alignItems: 'center',
    paddingBottom: 15,
    backgroundColor: '#F5F5F5'
  },
  main3Box:{
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
  main3BoxHeader:{
    height: 44,
    flexDirection: 'row',
    marginBottom: 7,
  },
  filterBox:{
    width: '44%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterSub:{
    paddingLeft: 8,
    paddingTop: 4,
    paddingRight: 8,
    paddingBottom: 4,
    marginRight: 5,
    marginLeft: 5,
    borderRadius: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 5,
    borderColor: '#E0E0E0',
  },
  footer:{
    width: '100%',
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 7,
    backgroundColor: 'white',
  },
  footerBox:{
    width: '95%',
    height: 52,
    backgroundColor: '#F5F5F5',
    borderRadius: 3,
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center'
  },
  budgetBox:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  budgetBox2:{
    position: 'absolute',
    right: 15,
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
saveModalBox:{
    width: '100%',
    height: 40,
    position: 'absolute',
    zIndex: 10,
    bottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
},
})

const Navigation = ({navigation, route}) => {

  const DATA = [
    {
      id: 0,
      title: '산모용품',
      icon: require('../../../public/assets/image/1.png'),
    },
    {
      id: 1,
      title: '수유용품',
      icon: require('../../../public/assets/image/2.png'),
    },
    {
      id: 2,
      title: '위생용품',
      icon: require('../../../public/assets/image/3.png'),
    },
    {
      id: 3,
      title: '목욕용품',
      icon: require('../../../public/assets/image/4.png'),
    },
    {
      id: 4,
      title: '침구류',
      icon: require('../../../public/assets/image/5.png'),
    },
    {
      id: 5,
      title: '아기의류',
      icon: require('../../../public/assets/image/6.png'),
    },
    {
      id: 6,
      title: '발육용품',
      icon: require('../../../public/assets/image/7.png'),
    },
    {
      id: 7,
      title: '가전용품',
      icon: require('../../../public/assets/image/8.png'),
    },
    {
      id: 8,
      title: '놀이용품',
      icon: require('../../../public/assets/image/9.png'),
    },
  ];


  const DATA3 = [
    {
      id: '0',
      title: '산모용품 (0/13)',
      color: '#FFADAD',
      icon: 'material1'
    },
  ]

  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const info = useSelector(state => { return state.material.data; });
  console.log('출산준비물: ', info);
  const materialSet = useSelector(state => { return state.material.refresh; });
  const [sumResult, setSumResult] = useState({
    sum: 0,
    exp: 0
  }); // 총 예산
  const ref = useRef();

  const [list, setList] = useState(Array.from({ length: 9 }, () => { return true}));

  const [captureURL, setCaptureURL] = useState(undefined); // 캡쳐 uri
  const [purchaseCheckBox, setPurchaseCheckBox] = useState(); // 체크박스 선택시 모달 안나옴
  
  const [modalVisible, setModalVisible] = useState({
    open: false,
    needsBrandId: null,
    needsId: null,
  }); // check box 선택시 모달
  const [modalVisible2, setModalVisible2] = useState({
    open: false,
    needsId: null,
    needsBrandId: null,
    needsDataId: null
  }); // 브랜드 추가 모달
  const [modalVisible4, setModalVisible4] = useState({
    open: false,
    content: '',
  }); // 구매가이드 모달

  const [modalVisible5, setModalVisible5] = useState(false); // 초기화 모달
  const [modalVisible6, setModalVisible6] = useState({
    open: false,
    content: null // 직접작성인지 추천리스트인지
  }); // 추천 리스트 변경 확인 모달
  console.log('modalVisible6: ', modalVisible6);
  const [modalVisible7, setModalVisible7] = useState(false); // 더보기
  const [modalVisible8, setModalVisible8] = useState(false); // 품목 추가
  const [modalVisible9, setModalVisible9] = useState(false); // 품목 삭제  
  const [modalVisible10, setModalVisible10] = useState(false); // 정렬
  const [modal, setModal] = useState(false); // 브랜드 제품명 필수값 유무
  const [modal2, setModal2] = useState({
    open: false,
    content: '',
    bottomCount: 1,
  }); // First
  const[modal3, setModal3] = useState({
    open: false,
    content: '',
    bottomCount: 2,
  }) // second
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(()=>{
    const materialPurchase = async() =>{
      const asyncStorage = await AsyncStorage.getItem('materialPurchase');
      setPurchaseCheckBox(asyncStorage);
    }
    materialPurchase();
  }, [modalVisible]);

  useEffect(()=>{
    dispatch(postMaterial(materialSet));
  }, [modalVisible, modalVisible8, modalVisible9, isFocused]);

  useEffect(()=>{
    let sum = 0;
    let exp = 0;
    info == undefined ? '' :
    info.filter(x=>{
      if(x.id == 0 && x.needsBrandId !== null){
        exp += x.itemPrice
      } else sum += x.itemPrice;
    });
    setSumResult(prevState => ({...prevState, sum: sum, exp: exp}));
  }, [info]);


  useEffect(()=>{
      save();
  }, [captureURL]);

  const purchase = async(needsId, needsBrandId) =>{
    const token = await AsyncStorage.getItem('token');
    try{
      const response = await axios({
          method: 'post',
          url: 'https://momsnote.net/api/needs/buy/needs',
          headers: { 
            'Authorization': `bearer ${token}`,  
            'Content-Type': 'application/json'
          },
          data: {
            needsBrandId: needsBrandId == null ? 0 : needsBrandId,
            needsId: needsId
          }
      });
      console.log('response: ', response.data);
      }catch(error){
          console.log('출산준비물 구매 error:', error);
      }
      dispatch(postMaterial(materialSet));
  }

  const purchaseCencel = async(needsId) => {
    const token = await AsyncStorage.getItem('token');
    try{
      const response = await axios({
          method: 'post',
          url: 'https://momsnote.net/api/needs/cancel/buy',
          headers: { 
            'Authorization': `bearer ${token}`, 
            'Content-Type': 'application/json'
          },
          data : {
            needsId: needsId
          }
      });
      console.log('response: ', response.data);
      }catch(error){
          console.log('출산준비물 리스트 error:', error);
      }
      dispatch(postMaterial(materialSet));
  }

const save = async() => {
   
    if(captureURL !== undefined){
        let { status } = await MediaLibrary.requestPermissionsAsync();
        const asset = await MediaLibrary.createAssetAsync(captureURL);
        // const moms = await MediaLibrary.getAlbumAsync('맘스노트');

        console.log('status: ', status);
        console.log('asset: ', asset);
        // console.log('moms: ', moms);
       
        
        if(status === 'granted'){
            // const kwon = await MediaLibrary.getAlbumAsync('DCIM');
            // const moms = await MediaLibrary.getAlbumAsync('맘스노트');split
            // if(moms === null){
            //     MediaLibrary.createAlbumAsync('맘스노트', asset);
            // }
            // MediaLibrary.addAssetsToAlbumAsync(moms, moms.id);
            // MediaLibrary.migrateAlbumIfNeededAsync(moms.id);
            // const album = await MediaLibrary.getAlbumAsync('맘스노트');
            // // console.log('album: ', album);

            // MediaLibrary.createAlbumAsync('맘스노트', asset);
            // // const asset = await MediaLibrary.createAssetAsync(captureURL);
        }
    }
    setTimeout(() => {
      setCaptureURL(undefined);
    }, 2000);
  }

  const arrow = (e) => { // arrow 누르면 서브페이지 display
    let arr = [...list];
    arr[e] = !arr[e];
    setList(arr);
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

  const capture = async() => {
    opacity_ani();
    setCaptureURL('1');

    ref.current.capture().then(uri => {
        setCaptureURL(uri);
      });
  }

  const optionBox = (e) => {
    switch(e){
      case '필수': return ( <View style={[styles.filterSub, {backgroundColor: '#E57373'}]}><Text style={{fontSize: 12, fontWeight: 'bold', color: 'white'}}>필수</Text></View> )
      case '권장': return ( <View style={[styles.filterSub, {backgroundColor: '#84C2F3'}]}><Text style={{fontSize: 12, fontWeight: 'bold', color: 'white'}}>권장</Text></View> )
      case '선택': return ( <View style={[styles.filterSub, {borderWidth: 1}]}><Text style={{fontSize: 12, fontWeight: 'bold'}}>선택</Text></View> )
      case '추가': return ( <View style={[styles.filterSub, {backgroundColor: '#F5A256'}]}><Text style={{fontSize: 12, fontWeight: 'bold', color: 'white'}}>추가</Text></View> )
    }
  }

  const List = (e) => {
    return (
      <View style={styles.main3Box} key={e.title}>
        <View style={styles.main3BoxHeader}>
          <View style={[styles.filterBox, {width: '12%'}]}><Text>구매</Text></View>
          <View style={[styles.filterBox, {width: '60%'}]}><Text>품목</Text></View>
          <View style={[styles.filterBox, {width: '28%'}]}><Text>브랜드</Text></View>
        </View>
        <List2 title={e.title}/>
      </View>
    )
  }

  const List2 = (title) => {  
    let arr = [];

    info.filter((x, index)=>{

      if(title.title == x.category && x.deleteStatus == 1){
       arr.push(
        <View style={[styles.main3BoxHeader]} key={index}>
          <View style={[styles.filterBox, {width: '12%'}]}>  
          <Checkbox
              style={styles.checkbox}
              value={x.id == 0 ? false : true}
              color={x.id == 0 ? undefined : '#FEB401'}
              onValueChange={()=>{
                switch(true){
                  case x.itemName == null: setModal2(prevState => ({...prevState, open: true, buttonCount: 1, content: '브랜드를 체크해주세요'})); break;
                  case x.id == 0 && purchaseCheckBox == null : setModalVisible(prevState => ({...prevState, open: true, needsBrandId: x.needsBrandId, needsId: x.needsId})); break;
                  case x.id == 0 : purchase(x.needsId, x.needsBrandId); break;
                  default : purchaseCencel(x.needsId);
                }
              }}
              />
          </View>
          <TouchableOpacity style={[styles.filterBox, {flexDirection: 'row', justifyContent: 'flex-start', width: '60%'}]}
            onPress={()=>setModalVisible4(prevState => ({...prevState, open: true, content: x}))}>
            {optionBox(x.grade)}
            <Text style={{fontSize: 13}}>{x.needsName}</Text>
          </TouchableOpacity>
          <View style={[styles.filterBox, {width: '28%'}]}>
            {x.itemName == null ?
          <View style={{width: 24, height: 24, borderRadius: 12, backgroundColor: '#FEB401', alignItems: 'center', justifyContent: 'center'}}>
              <Icon3 name="plus" size={20} style={{color: 'white'}} onPress={()=>setModalVisible2(prevState=>({...prevState, open: true, needsId: x.needsId, needsDataId: x.needsDataId}))}/> 
            </View>: <Text numberOfLines={1} ellipsizeMode='tail' onPress={()=>setModalVisible2(prevState=>({...prevState, open: true, needsId: x.needsId, needsDataId: x.needsDataId, needsBrandId: x.needsBrandId}))}>{x.itemBrand}</Text>}
          </View>
      </View>
      )}
    });
    return arr;
  }

  const renderItem = ({ item }) => (
    <View>
        <ViewShot style={styles.main} ref={ref} options={{ fileName: "MomsNote", format: "png", quality: 1 }}>
          <FlatList data={DATA} renderItem={renderItem3}
              keyExtractor={item => String(item.id)}>
          </FlatList>
      </ViewShot>
    </View>
  );

  const renderItem3 = ({ item }) => (
    <View style={styles.mainBox}>
        <View style={styles.mainBox2}>
          <Image source={item.icon} width={20} height={20}/>
            <View style={[styles.titleBox, {marginLeft: 8}]}><Text style={{fontSize: 16, fontWeight: '500'}}>{item.title}</Text></View>
            <TouchableOpacity style={styles.arrowBox}
              onPress={()=>arrow(item.id)}>{list[item.id] ? <Icon name="angle-up" size={22}/> : <Icon name='angle-down' size={22}/>}
            </TouchableOpacity>
        </View> 
        <View style={[styles.main3, {display: list[item.id] ? 'flex' : 'none'}]}>
          <List title={item.title}/>
        </View>
    </View>
  );

  return info == ''|| info == undefined ? <ActivityIndicator size={'large'} color='#E0E0E0' style={styles.container}/> : (
    <SafeAreaProvider>

        <SafeAreaView style={{ backgroundColor: 'white' }}>
            <StatusBar />
        </SafeAreaView>

		    <SafeAreaView style={[styles.container, {height: Platform.OS == 'ios' ? '94%' : '89%'}]}>

        <CheckboxModal modalVisible={modalVisible} setModalVisible={setModalVisible}/>
        <BrendModal modalVisible2={modalVisible2} setModalVisible2={setModalVisible2} modal={modal} setModal={setModal} setModal2={setModal2}/>
        <GuideModal modalVisible4={modalVisible4} setModalVisible4={setModalVisible4} modalVisible2={modalVisible2} setModalVisible2={setModalVisible2}/>
        <ResetModal modalVisible5={modalVisible5} setModalVisible5={setModalVisible5} modalVisible6={modalVisible6} setModalVisible6={setModalVisible6}/>
        <ResetModal2 modalVisible6={modalVisible6} setModalVisible6={setModalVisible6}/>
        <DotModal modalVisible5={modalVisible5} setModalVisible5={setModalVisible5} modalVisible7={modalVisible7} setModalVisible7={setModalVisible7} modalVisible8={modalVisible8} setModalVisible8={setModalVisible8}
            modalVisible9={modalVisible9} setModalVisible9={setModalVisible9} modal={modal} setModal={setModal}/>
        <AddModal modalVisible8={modalVisible8} setModalVisible8={setModalVisible8} setModal={setModal2} info2={info}/>
        <DeleteModal modalVisible9={modalVisible9} setModalVisible9={setModalVisible9} modal={modal} setModal={setModal2} setModal2={setModal3}/>
        <Filter modalVisible10={modalVisible10} setModalVisible10={setModalVisible10} />
        <BrandNameFlag modal={modal} setModal={setModal} modal2={modalVisible2} setModal2={setModalVisible2}/>
        <First modal={modal2} setModal={setModal2}/>
        <Second modal={modal3} setModal={setModal3}/>

        <View style={styles.header}>
        <Text style={{fontSize: 18, fontWeight: '600'}}>출산준비물</Text>
        <View style={styles.headerBar}>
            <TouchableOpacity style={{marginRight: 16}} onPress={capture}><Download/></TouchableOpacity>
            <TouchableOpacity style={{marginRight: 16}} onPress={()=>navigation.navigate('출산 준비물 검색')}><Search/></TouchableOpacity>
            <TouchableOpacity style={{marginRight: 16}} onPress={()=>navigation.navigate('알림')}><Bell/></TouchableOpacity>
            <TouchableOpacity style={{marginRight: 5}} onPress={()=>navigation.navigate('마이페이지')}><MyPage/></TouchableOpacity>
        </View>
      </View>
      <View style={styles.header2}>
          <View style={styles.headerBox2}>
            <TouchableOpacity activeOpacity={1} style={{paddingRight: 20}} onPress={()=>setModalVisible10(!modalVisible10)}><Sort /></TouchableOpacity>
            <TouchableOpacity activeOpacity={1} onPress={()=>setModalVisible7(!modalVisible7)}><More /></TouchableOpacity>
          </View>
          <Text style={{fontSize: 16, fontWeight: '600'}}>전체 (5/37)</Text>
        </View>
        
        {info !== '' ? <FlatList data={DATA3} renderItem={renderItem}
              keyExtractor={item => item.id} showsVerticalScrollIndicator={false}>
        </FlatList> : <View style={styles.main}></View>}

        <View style={styles.footer}>

          <Animated.View style={[styles.saveModalBox, {opacity: animation, display: captureURL == undefined ? 'none' : 'flex'}]}>
                <View style={styles.saveModal}>
                    <Text style={{color: 'white'}}>출산 리스트가 내 앨범에 저장되었습니다.</Text>
                </View>
          </Animated.View>

          <View style={styles.footerBox}>
            <View style={styles.budgetBox}>
              <Text>총 예산: </Text>
              <Text style={{fontWeight: '500'}}>{(sumResult.sum).toLocaleString()} 원</Text>
            </View>
            <View style={styles.budgetBox2}>
              <TouchableOpacity style={{padding: 10, flexDirection: 'row', alignItems: 'center'}} onPress={()=>navigation.navigate('총 예산', info)}>
                <Text style={{fontSize: 12}}>자세히 보기 </Text>
                <ArrowRight fill={'black'} width={15} height={15}/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
		</SafeAreaView>
    </SafeAreaProvider>

        
  )
}

export default Navigation