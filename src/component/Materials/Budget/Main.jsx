import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Animated, Platform, SafeAreaView, StatusBar } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useSelector } from 'react-redux'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import * as MediaLibrary from 'expo-media-library'
import ViewShot from 'react-native-view-shot'
import ShareModal from './Modal/ShareModal'
import ShareModal2 from './Modal/ShareModal2'
import ConfirmModal from './Modal/ConfirmModal'
import DotModal from './Modal/DotModal'
import PriceEdit from './Modal/PriceEdit'
import FirstModal from '../../Modal/First'
import CoarchMark from './Modal/CoarchMark'

import Download from '../../../../public/assets/svg/Download.svg'
import Back from '../../../../public/assets/svg/Back.svg'

import { useDispatch } from 'react-redux'
import { postMaterial } from '../../../Redux/Slices/MaterialSlice'
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import M1 from '../../../../public/assets/svg/1.svg'
import M2 from '../../../../public/assets/svg/2.svg'
import M3 from '../../../../public/assets/svg/3.svg'
import M4 from '../../../../public/assets/svg/4.svg'
import M5 from '../../../../public/assets/svg/5.svg'
import M6 from '../../../../public/assets/svg/6.svg'
import M7 from '../../../../public/assets/svg/7.svg'
import M8 from '../../../../public/assets/svg/8.svg'
import M9 from '../../../../public/assets/svg/9.svg'

const styles = StyleSheet.create({
  container:{
      flex: 1,
      backgroundColor: 'white',
      marginTop: Platform.OS == 'ios' ? 0 : getStatusBarHeight(),
  },
  header:{
    justifyContent: 'center',
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
},
headerBar:{
    position: 'absolute',
    right: 20,
    alignItems: 'center',
    flexDirection: 'row',
},
  main:{
    height: '70%',
  },
  mainBox:{
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  titleBox:{
    width: '50%',
    justifyContent: 'center'
},
  arrowBox:{
    position: 'absolute',
    right: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  mainBox2:{
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#F5F5F5',
  },
  filterBox:{
    width: '33.4%',
    height: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  mainBox3:{
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#F5F5F5',
    paddingLeft: 15,
    paddingRight: 15,
  },
  filterBox2:{
    width: '33.4%',
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  footer:{
    height: '26.5%',
  },
  footerBox:{
    padding: 15,
    justifyContent: 'center',
  },
  buttonBox:{
    width: '100%',
    height: 56,
    backgroundColor: '#FEA100',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
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
    zIndex: 1,
    bottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
},
})

const Talk1Sub = ({navigation, route}) => {

  const DATA = [
    {
      id: 0,
      title: '산모용품',
      icon: require('../../../../public/assets/image/1.png'),
    },
    {
      id: 1,
      title: '수유용품',
      icon: require('../../../../public/assets/image/2.png'),
    },
    {
      id: 2,
      title: '위생용품',
      icon: require('../../../../public/assets/image/3.png'),
    },
    {
      id: 3,
      title: '목욕용품',
      icon: require('../../../../public/assets/image/4.png'),
    },
    {
      id: 4,
      title: '침구류',
      icon: require('../../../../public/assets/image/5.png'),
    },
    {
      id: 5,
      title: '아기의류',
      icon: require('../../../../public/assets/image/6.png'),
    },
    {
      id: 6,
      title: '외출용품',
      icon: require('../../../../public/assets/image/7.png'),
    },
    {
      id: 7,
      title: '가전용품',
      icon: require('../../../../public/assets/image/8.png'),
    },
    {
      id: 8,
      title: '놀이용품',
      icon: require('../../../../public/assets/image/9.png'),
    },
  ];

  const ref = useRef();
  const dispatch = useDispatch();
  const info = useSelector(state => state.material.data);
  console.log('총 예산 info: ', info);
  const materialSet = useSelector(state => state.material.refresh);
  const animation = useRef(new Animated.Value(0)).current;
  const [test, setTest] = useState(); // 캡쳐 uri
  const [list, setList] = useState(Array.from({length: 8}, () => {return false})); // list display
  const [modalVisible2, setModalVisible2] = useState(false); // 공유 확인 유무 
  const [modalVisible3, setModalVisible3] = useState(false); // 공유 작성
  const [modalVisible4, setModalVisible4] = useState(false); // 공유 등록 확인
  const [modal5, setModal5] = useState({
    open: false,
    content: null,
  }); // onLongPress dot 품목삭제 모달

  const [modal6, setModal6] = useState({
    open: false,
    content: null,
  }); // onLongPress 가격 수정 모달
  const [modal7, setModal7] = useState({ // 수정되었습니다 모달
    open: false,
    content: '출산리스트가 수정되었습니다.',
    buttonCount: 1
  });

  const [modal8, setModal8] = useState(true); // coarchmark
  const [sumResult, setSumResult] = useState({
    sum: 0,
    exp: 0
  }); // 총 예산

  useEffect(()=>{
    dispatch(postMaterial(materialSet));
  }, [modal6, modal5]);

  useEffect(()=>{
    let sum = 0;
    let exp = 0;

    info.filter(x=>{
      if(x.id == 0 && x.needsBrandId !== null){
        exp += x.itemPrice
      } else sum += x.itemPrice;
    });
    setSumResult(prevState => ({...prevState, sum: sum, exp: exp}));
  }, [info]);

  useEffect(()=>{
    save();
}, [test]);

const SVGSelect = (e) => {
  switch(e){
      case 0: return(<M1 />) 
      case 1: return(<M2 />) 
      case 2: return(<M3 />) 
      case 3: return(<M4 />) 
      case 4: return(<M5 />) 
      case 5: return(<M6 />) 
      case 6: return(<M7 />) 
      case 7: return(<M8 />) 
      case 8: return(<M9 />) 
  }
}

const save = async() => {
   
    if(test !== undefined){
        let { status } = await MediaLibrary.requestPermissionsAsync();
        const asset = await MediaLibrary.createAssetAsync(test);
        const moms = await MediaLibrary.getAlbumAsync('맘스노트');
             
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

  const arrow = (e) => { // arrow 누르면 서브페이지 display
    let arr = [...list];
    arr[e] = !arr[e];
    setList(arr);
  }

  const filtering = (e) => { // 품목 브랜드 가격 부분 none || flex
    if(info.filter(x => x.category == e && x.itemName !== null) == ''){
      return(
        <View style={{height: 100, justifyContent: 'center', alignItems: 'center'}}><Text>검색 결과가 없습니다.</Text></View>
      )
    }else return(
        <View style={styles.mainBox2}>
            <View style={styles.filterBox}><Text>품목</Text></View>
            <View style={styles.filterBox}><Text>브랜드</Text></View>
            <View style={styles.filterBox}><Text>금액</Text></View>
        </View>
    )
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


  const List = ({title}) => {
    let arr = [];

    info.filter((x, index)=>{
      if(x.category == title && x.itemName !== null && x.deleteStatus == 1){
          arr.push(
        <TouchableOpacity style={styles.mainBox3} onLongPress={()=>setModal5(prevState => ({...prevState, open: true, content: x}))} delayLongPress={1500} activeOpacity={1} key={index}>
            <View style={[styles.filterBox2, {justifyContent: 'flex-start'}]}><Text style={{fontWeight: '500'}}>{x.needsName}</Text></View>
            <View style={styles.filterBox2}><Text numberOfLines={2} style={{lineHeight: 20}}>{x.itemName == null ? '-' : x.itemName}</Text></View>
            <TouchableOpacity style={[styles.filterBox2, {justifyContent: 'flex-end'}]} onLongPress={()=>setModal6(prevState => ({...prevState, open: true, content: x}))} delayLongPress={1500} activeOpacity={1}>
              <Text style={{fontWeight: '600'}}>{(x.itemPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>
              <Text> 원</Text>
            </TouchableOpacity>
        </TouchableOpacity>
      )}
    })
    return arr;
  }

  const renderItem = ({ item, index }) => (
      <View>
          <View style={styles.mainBox}>
            <TouchableOpacity style={styles.arrowBox}
                onPress={()=>arrow(item.id)}>{list[item.id] ? <Icon name="angle-down" size={22}/> : <Icon name='angle-up' size={22}/>}
            </TouchableOpacity>
            {SVGSelect(index)}
            <View style={[styles.titleBox, {marginLeft: 8}]}><Text style={{fontSize: 16, fontWeight: '500'}}>{item.title}</Text></View>
          </View>
          <View style={{display: list[item.id] ? 'none' : 'flex'}}>
           { 
            filtering(item.title)
          }
              <List title={item.title}/>
          </View>
      </View>
    );

  return (
    
    <SafeAreaProvider>

        <SafeAreaView style={{ backgroundColor: 'white' }}>
            <StatusBar />
        </SafeAreaView>

        <SafeAreaView style={[styles.container, {height: Platform.OS == 'ios' ? '94%' : '90.5%'}]}>

      <Animated.View style={[styles.saveModalBox, {opacity: animation}]}>
                <View style={styles.saveModal}>
                    <Text style={{color: 'white'}}>총 예산이 내 앨범에 저장되었습니다.</Text>
                </View>
      </Animated.View>

      <ShareModal modalVisible2={modalVisible2} setModalVisible2={setModalVisible2} modalVisible3={modalVisible3} setModalVisible3={setModalVisible3} />
      <ShareModal2 modalVisible3={modalVisible3} setModalVisible3={setModalVisible3} modalVisible4={modalVisible4} setModalVisible4={setModalVisible4}/>
      <ConfirmModal navigation={navigation} modalVisible4={modalVisible4} setModalVisible4={setModalVisible4} />
      <DotModal modal5={modal5} setModal5={setModal5} />
      <PriceEdit modal6={modal6} setModal6={setModal6} setModal7={setModal7} />
      <FirstModal modal={modal7} setModal={setModal7} />
      <CoarchMark modal={modal8} setModal={setModal8}/>

      <View style={styles.header}>
          
                    <TouchableOpacity onPress={()=>navigation.goBack()}><Back /></TouchableOpacity>
                    <Text style={{fontSize: 18, fontWeight: '600', marginLeft: 10}}>총 예산</Text>
                  <View style={styles.headerBar}>
                      <TouchableOpacity style={{marginRight: 5}} onPress={capture}><Download/></TouchableOpacity>
                  </View>
        </View>

      <ViewShot ref={ref} options={{ fileName: "MomsNote", format: "png", quality: 1 }} style={{backgroundColor: 'white'}}>
      <View style={styles.main}>
        <FlatList data={DATA} renderItem={renderItem} showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id}>
        </FlatList>
      </View>
      <View style={styles.footer}>
        <View style={styles.footerBox}>
          <View style={styles.arrowBox}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontSize: 18, fontWeight: '500'}}>{(sumResult.sum + sumResult.exp).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} </Text>
              <Text>원</Text>
            </View>
          </View>
          <Text style={{fontSize: 18, fontWeight: '500'}}>총 예산</Text>
        </View>
        <View style={[styles.footerBox, {padding: 5, paddingLeft: 20}]}>
          <View style={styles.arrowBox}><Text>{(sumResult.sum).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원</Text></View>
          <Text style={{color: '#616161'}}>ㄴ 구매 금액</Text>
        </View>
        <View style={[styles.footerBox, {padding: 5, paddingLeft: 20}]}>
          <View style={styles.arrowBox}><Text>{(sumResult.exp).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원</Text></View>
          <Text style={{color: '#616161'}}>ㄴ 구매 예정 금액</Text>
        </View>
        <TouchableOpacity style={styles.buttonBox} onPress={()=>setModalVisible2(!modalVisible2)}>
          <Text style={{color: 'white', fontWeight: '600', fontSize: 16}}>출산 리스트 게시판 공유</Text>
        </TouchableOpacity>
      </View>
        
        </ViewShot>
        </SafeAreaView>
        </SafeAreaProvider>
  )
}

export default Talk1Sub