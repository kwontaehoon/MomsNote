import React, { useState } from 'react'
import { getStatusBarHeight } from "react-native-status-bar-height"; 
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/Ionicons'
import Icon3 from 'react-native-vector-icons/Feather'
import Icon4 from 'react-native-vector-icons/Entypo'
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
import { WithLocalSvg } from "react-native-svg"
import material1 from '../../../public/assets/svg/material1.svg'
import Red from '../../../public/assets/svg/Red.svg'
import material2 from '../../../public/assets/svg/material2.svg'
import material3 from '../../../public/assets/svg/material3.svg'
import material4 from '../../../public/assets/svg/material4.svg'
import material5 from '../../../public/assets/svg/material5.svg'
import material6 from '../../../public/assets/svg/material6.svg'
import material7 from '../../../public/assets/svg/material7.svg'
import material8 from '../../../public/assets/svg/material8.svg'

const styles = StyleSheet.create({
  container:{
    height: '92%',
    backgroundColor: 'white',
  },
  header:{
    height: 55,
    justifyContent: 'center',
    padding: 15
  },
  headerBox:{
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
    paddingTop: 20,
    paddingBottom: 20,
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
    borderRadius: 3,
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

  console.log('Material Route: ', route.params);

  const DATA = [
    {
      id: '0',
      title: '산모용품 (0/13)',
      color: '#FFADAD',
      icon: 'material1'
    },
    {
      id: '1',
      title: '수유용품 (0/13)',
      color: '#FFADAD'
    },
    {
      id: '2',
      title: '위생용품 (0/13)',
      color: '#FFADAD'
    },
    {
      id: '3',
      title: '목욕용품 (0/13)',
      color: '#FFADAD'
    },
    {
      id: '4',
      title: '침구류 (0/13)',
      color: '#FFADAD'
    },
    {
      id: '5',
      title: '아기용품 (0/13)',
      color: '#FFADAD'
    },
    {
      id: '6',
      title: '발육용품 (0/13)',
      color: '#FFADAD'
    },
    {
      id: '7',
      title: '가전용품 (0/13)',
      color: '#FFADAD'
    },

  ];

  const DATA2 = [
    {
      id: '0',
      title: '산모 패드',
      color: '올인원 샴푸 바디워시',
      option: '필수',
      
    },
    {
      id: '1',
      title: '수유 브라',
      color: '#FFADAD',
      option: '권장',
    },
    {
      id: '2',
      title: '손목 보호대',
      color: '#FFADAD',
      option: '선택',
    },
    {
      id: '3',
      title: '양말',
      color: '#FFADAD',
      option: '선택',
    }
  ];

  const DATA3 = [
    {
      id: '0',
      title: '산모용품 (0/13)',
      color: '#FFADAD',
      icon: 'material1'
    },
  ]

  const [list, setList] = useState(Array.from({ length: 8 }, () => { return false}));
  console.log('list: ', list);
  const [isChecked, setChecked] = useState(Array.from({length: DATA2.length}, ()=>{ return false })); // check box
  const [modalVisible, setModalVisible] = useState(false); // check box 선택시 모달
  const [modalVisible2, setModalVisible2] = useState(false); // 브랜드 추가 모달
  const [modalVisible3, setModalVisible3] = useState(false); // 브랜드 적용됐는지 확인 모달
  const [modalVisible4, setModalVisible4] = useState(false); // 구매가이드 모달
  const [modalVisible5, setModalVisible5] = useState(false); // 초기화 모달
  const [modalVisible6, setModalVisible6] = useState(false); // 추천 리스트 변경 확인 모달
  const [modalVisible7, setModalVisible7] = useState(false); // 더보기
  const [modalVisible8, setModalVisible8] = useState(false); // 품목 추가
  const [modalVisible9, setModalVisible9] = useState(false); // 품목 삭제
  const [modalVisible10, setModalVisible10] = useState(true); // 정렬

  const arrow = (e) => { // arrow 누르면 서브페이지 display
    let arr = [...list];
    arr[e] = !arr[e];
    setList(arr);
  }

  const change = (e) => { // check box
    setModalVisible(!modalVisible);
    let arr = [...isChecked];
    arr[e] = !arr[e];
    setChecked(arr);
  }

  const optionBox = (e) => {
    switch(e){
      case '필수': return ( <View style={[styles.filterSub, {backgroundColor: '#E57373'}]}><Text style={{fontSize: 12, fontWeight: 'bold', color: 'white'}}>필수</Text></View> )
      case '권장': return ( <View style={[styles.filterSub, {backgroundColor: '#5291EF'}]}><Text style={{fontSize: 12, fontWeight: 'bold', color: 'white'}}>권장</Text></View> )
      case '선택': return ( <View style={[styles.filterSub, {backgroundColor: '#83D46F'}]}><Text style={{fontSize: 12, fontWeight: 'bold', color: 'white'}}>선택</Text></View> )
    }
  }

  const List = (e) => {
    let number = list.findIndex((x, index, arr)=>{ return x; })
    console.log('number: ', number);

    return (
      <View style={styles.main3Box}>
        <View style={styles.main3BoxHeader}>
          <View style={[styles.filterBox, {width: 50}]}><Text>구매</Text></View>
          <View style={[styles.filterBox, {width: 157}]}><Text>품목</Text></View>
          <View style={[styles.filterBox, {width: '41%'}]}><Text>브랜드</Text></View>
        </View>
        <FlatList data={DATA2} renderItem={renderItem2}
            keyExtractor={item => item.id} showsHorizontalScrollIndicator={false}>
        </FlatList>
      </View>
    )
  }

  const renderItem3 = ({ item }) => (
    <View style={styles.container2}>
        <View style={styles.header}>
          <View style={styles.headerBox}>
            <Icon2 name='filter' size={22} style={{paddingRight: 30}}/>
            <Icon4 name='dots-three-vertical' size={22} style={{marginRight: 10}} onPress={()=>setModalVisible7(!modalVisible7)}/>
          </View>
          <Text>전체 (5/37)</Text>
        </View>
        <View style={styles.main}>
          <FlatList data={DATA} renderItem={renderItem}
              keyExtractor={item => item.id}>
          </FlatList>
        </View>
        
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.mainBox}>
        <View style={styles.mainBox2}>
          <Icon name="camera" size={22} />
            <View style={[styles.titleBox, {marginLeft: 8}]}><Text>{item.title}</Text></View>
            <TouchableOpacity style={styles.arrowBox}
              onPress={()=>arrow(item.id)}>{list[item.id] ? <Icon name="angle-up" size={22}/> : <Icon name='angle-down' size={22}/>}
            </TouchableOpacity>
        </View> 
        <View style={[styles.main3, {display: list[item.id] ? 'flex' : 'none'}]}>
          <List id={item.id}/>
        </View>
    </View>
  );

  const renderItem2 = ({ item }) => (
      <View style={[styles.main3BoxHeader]}>
          <View style={[styles.filterBox, {width: 50}]}>
          <Checkbox
              style={styles.checkbox}
              value={isChecked[item.id]}
              onValueChange={()=>change(item.id)}
              color={isChecked[item.id] ? '#FEB401' : undefined}/>
          </View>
          <View style={[styles.filterBox, {width: 157, flexDirection: 'row', justifyContent: 'flex-start'}]}>
            {optionBox(item.option)}
            <Text>{item.title}</Text>
          </View>
          <View style={[styles.filterBox, {width: '41%'}]}>
            <View style={{width: 24, height: 24, borderRadius: 12,backgroundColor: '#FEB401', alignItems: 'center', justifyContent: 'center'}}>
              <Icon3 name="plus" size={20} style={{color: 'white'}} onPress={()=>setModalVisible2(!modalVisible2)}/>
            </View>
          </View>
      </View>
  ); 

  return (
    <View style={styles.container}>

        <CheckboxModal modalVisible={modalVisible} setModalVisible={setModalVisible}/>
        <BrendModal modalVisible2={modalVisible2} setModalVisible2={setModalVisible2}/>
        <NoticeModal modalVisible3={modalVisible3} setModalVisible={setModalVisible3}/>
        <GuideModal modalVisible4={modalVisible4} setModalVisible4={setModalVisible4}/>
        <ResetModal modalVisible5={modalVisible5} setModalVisible5={setModalVisible5} modalVisible6={modalVisible6} setModalVisible6={setModalVisible6}/>
        <ResetModal2 modalVisible6={modalVisible6} setModalVisible6={setModalVisible6}/>
        <DotModal modalVisible5={modalVisible5} setModalVisible5={setModalVisible5} modalVisible7={modalVisible7} setModalVisible7={setModalVisible7}/>
        <AddModal modalVisible8={modalVisible8} setModalVisible8={setModalVisible8}/>
        <DeleteModal modalVisible9={modalVisible9} setModalVisible9={setModalVisible9}/>
        <Filter modalVisible10={modalVisible10} setModalVisible10={setModalVisible10} />
        
        
        <FlatList data={DATA3} renderItem={renderItem3}
              keyExtractor={item => item.id}>
        </FlatList>

        <View style={styles.footer}>
          <View style={styles.footerBox}>
            <View style={styles.budgetBox}><Text>총 예산: 0000원</Text></View>
            <View style={[styles.budgetBox, {alignItems: 'flex-end'}]}>
              <TouchableOpacity onPress={()=> navigation.navigate('총 예산')}><Text>자세히 보기  <Icon name='angle-right' size={15}/></Text></TouchableOpacity>
            </View>
          </View>
        </View>
    </View>
  )
}

export default Navigation