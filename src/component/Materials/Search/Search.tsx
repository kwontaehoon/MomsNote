import React, { useState, useEffect, useRef } from 'react'
import { getStatusBarHeight } from "react-native-status-bar-height"; 
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput, Platform, StatusBar, SafeAreaView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon3 from 'react-native-vector-icons/Feather'
import Checkbox from 'expo-checkbox';
import BrendModal from '../Modal/BrendModal'
import CheckboxModal from '../Modal/CheckBoxModal';
import GuideModal from '../Modal/GuideModal'
import BrandNameFlag from '../Modal/BrendNameFlag'
import FirstModal from '../../Modal/First'
import SecondModal from '../../Modal/Second'
import ViewShot from 'react-native-view-shot'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import { postMaterial, setMaterialRefresh } from '../../../Redux/Slices/MaterialSlice';
import { SafeAreaProvider } from 'react-native-safe-area-context'

import Search from '../../../../public/assets/svg/Search.svg'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Back from '../../../../public/assets/svg/Back.svg'

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
    marginTop: Platform.OS == 'ios' ? 0 : getStatusBarHeight(),
  },
  header:{
    height: 80,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  searchIconBox:{
    position: 'absolute',
    left: 15,
    top: 10,
  },
  textInput:{
    backgroundColor: '#F5F5F5',
    marginLeft : 20,
    width: '90%',
    height: 45,
    paddingLeft: 50,
    justifyContent: 'center',
  },
  main:{
    paddingBottom: 50,
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
    paddingLeft: 10,
    paddingRight: 10,
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
})

const Navigation = ({navigation, route}) => {

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


  const DATA3 = [
    {
      id: '0',
      title: '산모용품 (0/13)',
      color: '#FFADAD',
      icon: 'material1'
    },
  ]


  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [materialSearch, setMaterialSearch] = useState();
  const materialSet = useSelector(state => { return state.material.refresh; });
  const [refresh, setRefresh] = useState();

  const ref = useRef();
  const [list, setList] = useState(Array.from({ length: 9 }, () => { return true}));
  const [purchaseCheckBox, setPurchaseCheckBox] = useState(); // 체크박스 선택시 모달 안나옴
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState({
    open: false,
    needsBrandId: null,
    needsId: null,
    asyncStorage: '',
  }); // check box 선택시 모달
  const [modalVisible2, setModalVisible2] = useState({
    open: false,
    needsId: null,
    needsBrandId: null,
    needsDateId: null
  }); // 브랜드 추가 모달
  const [modalVisible4, setModalVisible4] = useState({
    open: false,
    content: '',
  }); // 구매가이드 모달

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

  useEffect(()=>{
    const materialPurchase = async() =>{
      const asyncStorage = await AsyncStorage.getItem('materialPurchase');
      setPurchaseCheckBox(asyncStorage);
    }
    materialPurchase();
  }, []);

  useEffect(()=>{
    const boardSearch = async() => {
      const token = await AsyncStorage.getItem('token');
        try{
            const response = await axios({
                method: 'post',
                url: 'https://momsnote.net/api/search/needslist',
                headers: { 
                  'Authorization': `bearer ${token}`, 
                  'Content-Type': 'application/json'
                },
                data: { keyword: search}
            });
            console.log('boardSearch: ', response.data);
            setMaterialSearch(response.data);
        }catch(error){
            console.log('materialSearch axios error', error);
            setMaterialSearch(undefined);
        }
    }
    boardSearch();
}, [search, modalVisible, modalVisible2, refresh, refreshing]);

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
    }catch(error){
        console.log('출산준비물 구매 error:', error);
    }
    dispatch(postMaterial({order: 'need'}));
    setRefresh(`구매${needsBrandId}`);
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
    setRefresh(`구매캔슬${needsId}`);
}


  const arrow = (e) => { // arrow 누르면 서브페이지 display
    let arr = [...list];
    arr[e] = !arr[e];
    setList(arr);
  }

  const optionBox = (e) => {
    switch(e){
      case '필수': return ( <View style={[styles.filterSub, {backgroundColor: '#E57373'}]}><Text style={{fontSize: 12, fontWeight: 'bold', color: 'white'}}>필수</Text></View> )
      case '권장': return ( <View style={[styles.filterSub, {backgroundColor: '#84C2F3'}]}><Text style={{fontSize: 12, fontWeight: 'bold', color: 'white'}}>권장</Text></View> )
      case '선택': return ( <View style={[styles.filterSub, {borderWidth: 1}]}><Text style={{fontSize: 12, fontWeight: 'bold'}}>선택</Text></View> )
      case '추가': return ( <View style={[styles.filterSub, {backgroundColor: '#F5A256'}]}><Text style={{fontSize: 12, fontWeight: 'bold', color: 'white'}}>추가</Text></View> )
    }
  }

  const onRefreshing = async() => {
    console.log('@@@@ refreshing');
    if(!refreshing){
      await setRefreshing(true);
      setRefreshing(false);
    }
  }

  const List = ({item}) => {
    return (
      <View style={styles.main3Box} key={item.id}>
        <View style={styles.main3BoxHeader}>
        <View style={[styles.filterBox, {width: '12%'}]}><Text>구매</Text></View>
          <View style={[styles.filterBox, {width: '60%'}]}><Text>품목</Text></View>
          <View style={[styles.filterBox, {width: '28%'}]}><Text>브랜드</Text></View>
        </View>
        {
        materialSearch.filter(x=> x.category == item.title) == '' ? 
        <View style={{height: 100, justifyContent: 'center', alignItems: 'center', paddingBottom: 20}}>
          <Text style={{color: '#9E9E9E', fontSize: 15}}>일치하는 항목이 없습니다.</Text>
        </View> 
        : <List2 item={item}/>
        } 
      </View>
    )
  }

  const List2 = ({item}) => {
    let arr = [];
    materialSearch.filter((x, index)=>{
      if(item.title == x.category && x.deleteStatus == 1){
       arr.push(
        <View style={styles.main3BoxHeader} key={index}>
          <View style={[styles.filterBox, {width: '12%'}]}>  
          <Checkbox
              style={styles.checkbox}
              value={x.id == 0 ? false : true}
              color={x.id == 0 ? undefined : '#FEB401'}
              onValueChange={()=>{
                switch(true){
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
            <Text>{x.needsName}</Text>
          </TouchableOpacity>
          <View style={[styles.filterBox, {width: '28%'}]}>
          {x.itemName == null ?
          <View style={{width: 24, height: 24, borderRadius: 12, backgroundColor: '#FEB401', alignItems: 'center', justifyContent: 'center'}}>
              <Icon3 name="plus" size={20} style={{color: 'white'}} onPress={()=>setModalVisible2(prevState=>({...prevState, open: true, needsId: x.needsId, needsDateId: x.needsDateId}))}/> 
            </View>: <Text numberOfLines={1} ellipsizeMode='tail' onPress={()=>setModalVisible2(prevState=>({...prevState, open: true, needsId: x.needsId, needsDateId: x.needsDateId}))}>{x.itemBrand}</Text>}
          </View>
      </View>
      )}
    })
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

  const renderItem3 = ({ item, index }) => (
    <View style={styles.mainBox}>
        <View style={styles.mainBox2}>
        {SVGSelect(index)}
            <View style={[styles.titleBox, {marginLeft: 8}]}><Text style={{fontSize: 16, fontWeight: '500'}}>{item.title}</Text></View>
            <TouchableOpacity style={styles.arrowBox}
              onPress={()=>arrow(item.id)}>{list[item.id] ? <Icon name="angle-up" size={22}/> : <Icon name='angle-down' size={22}/>}
            </TouchableOpacity>
        </View> 
        <View style={[styles.main3, {display: list[item.id] ? 'flex' : 'none'}]}>
          <List item={item}/>
        </View>
    </View>
  );

  return (
    <SafeAreaProvider>

            <SafeAreaView style={{ backgroundColor: 'white' }}>
                    <StatusBar />
            </SafeAreaView>

            <SafeAreaView style={styles.container}>
                <CheckboxModal modalVisible={modalVisible} setModalVisible={setModalVisible}/>
                <BrendModal modalVisible2={modalVisible2} setModalVisible2={setModalVisible2} modal={modal} setModal={setModal} setModal2={setModal2}/>
                <GuideModal modalVisible4={modalVisible4} setModalVisible4={setModalVisible4} modalVisible2={modalVisible2} setModalVisible2={setModalVisible2}/>
                <FirstModal modal={modal2} setModal={setModal2}/>
                <SecondModal modal={modal3} setModal={setModal3} />
                <BrandNameFlag modal={modal} setModal={setModal} modal2={modalVisible2} setModal2={setModalVisible2}/>

                <View style={styles.header}>
                <TouchableOpacity style={{padding: 5}} onPress={()=>navigation.goBack()}><Back/></TouchableOpacity>
                <View style={styles.textInput}>
                  <View style={styles.searchIconBox}><Search width={22}/></View>
                  <TextInput placeholder='검색하실 단어를 입력하세요.' onChangeText={(e)=>setSearch(e)}></TextInput>
                </View>
              </View>

                {materialSearch == undefined ? <View></View> : <FlatList data={DATA3} renderItem={renderItem}
                      keyExtractor={item => item.id} showsVerticalScrollIndicator={false}
                      onRefresh={onRefreshing} refreshing={refreshing}
                      >
                </FlatList>}
        </SafeAreaView>
</SafeAreaProvider>

  )
}

export default Navigation