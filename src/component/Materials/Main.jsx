import React, { useState, useEffect, useRef } from 'react'
import { getStatusBarHeight } from "react-native-status-bar-height"; 
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TouchableHighlight } from 'react-native'
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
import FirstModal from '../Modal/First'
import SecondModal from '../Modal/Second'
import * as MediaLibrary from 'expo-media-library'
import ViewShot from 'react-native-view-shot'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import { postMaterial } from '../../Redux/Slices/MaterialSlice';
import { setMaterialRefresh } from '../../Redux/Slices/MaterialSlice';

import More from '../../../public/assets/svg/More.svg'
import Sort from '../../../public/assets/svg/Sort.svg'
import Download from '../../../public/assets/svg/Download.svg'
import Search from '../../../public/assets/svg/Search.svg'
import Bell from '../../../public/assets/svg/Bell.svg'
import MyPage from '../../../public/assets/svg/Mypage.svg'


const styles = StyleSheet.create({
  container:{
    height: '89.5%',
    backgroundColor: 'white',
    marginTop: getStatusBarHeight(),
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
    padding: 15
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
    padding: 20,
    alignItems: 'center',
  },
  titleBox:{
    width: '50%',
    justifyContent: 'center'
  },
  arrowBox:{
    position: 'absolute',
    right: 15,
  },
  main3:{
    alignItems: 'center',
  },
  main3Box:{
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 10,
  },
  main3BoxHeader:{
    height: 44,
    flexDirection: 'row',
    marginBottom: 7
  },
  filterBox:{
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterSub:{
    height: 20,
    paddingLeft: 8,
    paddingTop: 2,
    paddingbottom: 2,
    paddingRight: 8,
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
    padding: 10
  },
  budgetBox:{
    width: '50%',
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

  const dispatch = useDispatch();
  const info = useSelector(state => { return state.material.data; });
  console.log('출산준비물 리스트: ', info);
  const materialSet = useSelector(state => { return state.material.refresh; });
  console.log('materialSet: ', materialSet)
  const [sumResult, setSumResult] = useState(0); // 총 예산
  const ref = useRef();
  const [list, setList] = useState(Array.from({ length: 9 }, () => { return true}));

  const [captureURL, setCaptureURL] = useState(); // 캡쳐 uri
  
  const [modalVisible, setModalVisible] = useState(false); // check box 선택시 모달
  const [modalVisible2, setModalVisible2] = useState({
    open: false,
    needsId: '',
  }); // 브랜드 추가 모달
  const [modalVisible4, setModalVisible4] = useState(false); // 구매가이드 모달
  const [modalVisible5, setModalVisible5] = useState(false); // 초기화 모달
  const [modalVisible6, setModalVisible6] = useState(false); // 추천 리스트 변경 확인 모달
  const [modalVisible7, setModalVisible7] = useState(false); // 더보기
  const [modalVisible8, setModalVisible8] = useState(false); // 품목 추가
  const [modalVisible9, setModalVisible9] = useState(false); // 품목 삭제  
  const [modalVisible10, setModalVisible10] = useState(false); // 정렬
  const [modal, setModal] = useState({
    open: false,
    content: '',
    buttonCount: 1
  }); // fisrt modal
  const [modal2, setModal2] = useState({
    open: false,
    content: ['', ''],
    buttonCount: 1
  }); //second modal

  useEffect(()=>{
    dispatch(postMaterial(materialSet));
  }, []);

  // useEffect(()=>{
  //     save();
  // }, [captureURL]);


  const perchase = async(needsId, needsBrandId) =>{
    try{
      const response = await axios({
          method: 'post',
          url: 'https://momsnote.net/api/needs/buy/needs',
          headers: { 
            'Authorization': 'bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnb29nbGVfMTIzNDU2Nzg5MCIsImlkIjo0LCJpYXQiOjE2NzIyMDczODUsImV4cCI6MTY3NDc5OTM4NX0.LRECgH_NBe10ueCfmefEzEueIrYukBHnXoKRfVqIurQ', 
            'Content-Type': 'application/json'
          },
          data: {
            needsBrandId: needsBrandId,
            needsId: needsId
          }
      });
      console.log('response: ', response.data);
      }catch(error){
          console.log('출산준비물 구매 error:', error);
      }
  }

  // const perchaseCencel = async() => {
  //   try{
  //     const response = await axios({
  //         method: 'post',
  //         url: 'https://momsnote.net/api/needs/cancel/buy',
  //         headers: { 
  //           'Authorization': 'bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnb29nbGVfMTIzNDU2Nzg5MCIsImlkIjo0LCJpYXQiOjE2NzIxMzQ3OTQsImV4cCI6MTY3NDcyNjc5NH0.mWpz6urUmqTP138MEO8_7WcgaNcG2VkX4ZmrjU8qESo', 
  //           'Content-Type': 'application/json'
  //         },
  //         data : {
  //           needsId: isChecked.needsId
  //         }
  //     });
  //     console.log('response: ', response.data);
  //     }catch(error){
  //         console.log('출산준비물 리스트 error:', error);
  //     }
  // }

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
            // const moms = await MediaLibrary.getAlbumAsync('맘스노트');
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
    setCaptureURL(undefined);
  }

  const arrow = (e) => { // arrow 누르면 서브페이지 display
    let arr = [...list];
    arr[e] = !arr[e];
    setList(arr);
  }

  const capture = async() => {
    // opacity_ani();
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
      <View style={styles.main3Box} key={e.id}>
        <View style={styles.main3BoxHeader}>
          <View style={[styles.filterBox, {width: 50}]}><Text>구매</Text></View>
          <View style={[styles.filterBox, {width: 157}]}><Text>품목</Text></View>
          <View style={[styles.filterBox, {width: '41%'}]}><Text>브랜드</Text></View>
        </View>
        <List2 title={e.title}/>
      </View>
    )
  }

  const List2 = (title) => {
    let arr = [];
    let sum = 0;
    info.filter((x, index)=>{
      if(x.id == 1){
        sum += x.itemPrice;
      }
      if(title.title == x.category && x.deleteStatus == 1){
       arr.push(
        <View style={[styles.main3BoxHeader]} key={index}>
          <View style={[styles.filterBox, {width: 50}]}>
          <Checkbox
              style={styles.checkbox}
              value={x.id == 0 ? false : true}
              color={x.id == 0 ? undefined : '#FEB401'}
              onValueChange={()=>{
                switch(true){
                  case x.brandName == null: setModal(prevState => ({...prevState, open: true, buttonCount: 1, content: '브랜드를 체크해주세요'})); break;
                  case x.id == 0 : perchase(x.needsId, x.needsBrandId); break;
                  default : perchaseCencel();
                }
              }}
              />
          </View>
          <View style={[styles.filterBox, {width: 157, flexDirection: 'row', justifyContent: 'flex-start'}]}>
            {optionBox(x.grade)}
            <Text>{x.needsName}</Text>
          </View>
          <View style={[styles.filterBox, {width: '41%'}]}>
            {x.brandName == null ? <View style={{width: 24, height: 24, borderRadius: 12,backgroundColor: '#FEB401', alignItems: 'center', justifyContent: 'center'}}>
              <Icon3 name="plus" size={20} style={{color: 'white'}} onPress={()=>setModalVisible2(prevState=>({...prevState, open: true, needsId: x.needsId}))}/> 
            </View> : <Text>{x.brandName}</Text>}
          </View>
      </View>
      )}
    })
    setSumResult(sum);
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

  return (
    <View style={styles.container}>

        <CheckboxModal modalVisible={modalVisible} setModalVisible={setModalVisible}/>
        <BrendModal modalVisible2={modalVisible2} setModalVisible2={setModalVisible2} setModal={setModal}/>
        <GuideModal modalVisible4={modalVisible4} setModalVisible4={setModalVisible4}/>
        <ResetModal modalVisible5={modalVisible5} setModalVisible5={setModalVisible5} modalVisible6={modalVisible6} setModalVisible6={setModalVisible6}/>
        <ResetModal2 modalVisible6={modalVisible6} setModalVisible6={setModalVisible6}/>
        <DotModal modalVisible5={modalVisible5} setModalVisible5={setModalVisible5} modalVisible7={modalVisible7} setModalVisible7={setModalVisible7} modalVisible8={modalVisible8} setModalVisible8={setModalVisible8}
            modalVisible9={modalVisible9} setModalVisible9={setModalVisible9}/>
        <AddModal modalVisible8={modalVisible8} setModalVisible8={setModalVisible8} modal={modal} setModal={setModal} info2={info}/>
        <DeleteModal info={info} modalVisible9={modalVisible9} setModalVisible9={setModalVisible9} setModal={setModal} setModal2={setModal2}/>
        <Filter modalVisible10={modalVisible10} setModalVisible10={setModalVisible10} />
        <FirstModal modal={modal} setModal={setModal}/>
        <SecondModal modal={modal2} setModal={setModal2} />

        <View style={styles.header}>
        <Text style={{fontSize: 18, fontWeight: '600'}}>출산준비물</Text>
        <View style={styles.headerBar}>
            <Download style={{marginRight: 12}} onPress={capture}/>
            <Search style={{marginRight: 12}} onPress={()=>navigation.navigate('검색')}/>
            <Bell style={{marginRight: 12}} onPress={()=>navigation.navigate('알림')}/>
            <MyPage style={{marginRight: 5}} onPress={()=>navigation.navigate('마이페이지')}/>
        </View>
      </View>
      <View style={styles.header2}>
          <View style={styles.headerBox2}>
            <Sort style={{paddingRight: 50}} onPress={()=>setModalVisible10(!modalVisible10)}/>
            <More onPress={()=>setModalVisible7(!modalVisible7)}/>
          </View>
          <Text style={{fontSize: 16, fontWeight: '600'}}>전체 (5/37)</Text>
        </View>
        
        {info !== undefined ? <FlatList data={DATA3} renderItem={renderItem}
              keyExtractor={item => item.id} showsVerticalScrollIndicator={false}>
        </FlatList> : <View style={styles.main}></View>}

        <View style={styles.footer}>
          <View style={styles.footerBox}>
            <View style={styles.budgetBox}><Text>총 예산: {sumResult}</Text></View>
            <View style={[styles.budgetBox, {alignItems: 'flex-end'}]}>
              <TouchableOpacity onPress={()=> navigation.navigate('총 예산', info)}><Text>자세히 보기  <Icon name='angle-right' size={15}/></Text></TouchableOpacity>
            </View>
          </View>
        </View>
    </View>
  )
}

export default Navigation