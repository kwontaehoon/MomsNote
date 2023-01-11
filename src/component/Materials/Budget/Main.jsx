import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TouchableWithoutFeedback } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import Icon from 'react-native-vector-icons/FontAwesome'
import { useSelector } from 'react-redux'

import DeleteModal from './Modal/DeleteModal'
import ShareModal from './Modal/ShareModal'
import ShareModal2 from './Modal/ShareModal2'
import ConfirmModal from './Modal/ConfirmModal'
import DotModal from './Modal/DotModal'

const styles = StyleSheet.create({
    container:{
        height: '100%',
        backgroundColor: 'white'
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
      height: '20%',
      padding: 15,
      borderTopWidth: 1,
      borderColor: '#F5F5F5'
    },
    footerBox:{
      height: 50,
      justifyContent: 'center',
    },
    buttonBox:{
      height: 56,
      backgroundColor: '#FEA100',
      alignItems: 'center',
      justifyContent: 'center',
    },
})
const Talk1Sub = ({route}) => {

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
      title: '발육용품',
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

  const info = useSelector(state => state.material.data);
  console.log('총 예산 info: ', info);
  const [list, setList] = useState(Array.from({length: 8}, () => {return false})); // list display
  console.log('list: ', list);
  const [modalVisible, setModalVisible] = useState(false); // 품목 삭제
  const [modalVisible2, setModalVisible2] = useState(false); // 공유 확인 유무 
  const [modalVisible3, setModalVisible3] = useState(false); // 공유 작성
  const [modalVisible4, setModalVisible4] = useState(false); // 공유 등록 확인
  const [modal5, setModal5] = useState({
    open: false,
    content: null,
  }); // onLongPress dot 모달

  const [sumResult, setSumResult] = useState({
    sum: 0,
    exp: 0
  }); // 총 예산

  console.log('sumResult: ', sumResult);

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


  const List = ({title}) => {
    let arr = [];

    info.filter((x, index)=>{
      if(x.category == title && x.itemName !== null){
          arr.push(
        <TouchableOpacity style={styles.mainBox3} onLongPress={()=>setModal5(prevState => ({...prevState, open: true, content: x}))} delayLongPress={1500} activeOpacity={1} key={index}>
            <View style={[styles.filterBox2, {justifyContent: 'flex-start'}]}><Text style={{fontWeight: '500'}}>{x.needsName}</Text></View>
            <View style={styles.filterBox2}><Text>{x.itemName == null ? '-' : x.itemName}</Text></View>
            <View style={[styles.filterBox2, {justifyContent: 'flex-end'}]}>
              <Text style={{fontWeight: '600'}}>{(x.itemPrice).toLocaleString()}</Text>
              <Text> 원</Text>
            </View>
        </TouchableOpacity>
      )}
    })
    return arr;
  }

  const renderItem = ({ item }) => (
      <View>
          <View style={styles.mainBox}>
            <TouchableOpacity style={styles.arrowBox}
                onPress={()=>arrow(item.id)}>{list[item.id] ? <Icon name="angle-down" size={22}/> : <Icon name='angle-up' size={22}/>}
            </TouchableOpacity>
            <Image source={item.icon} width={20} height={20}/>
            <View style={[styles.titleBox, {marginLeft: 8}]}><Text style={{fontSize: 16, fontWeight: '500'}}>{item.title}</Text></View>
          </View>
          <View style={{display: list[item.id] ? 'none' : 'flex'}}>
           { 
          //  <View style={styles.mainBox2}>
          //     <View style={styles.filterBox}><Text>품목</Text></View>
          //     <View style={styles.filterBox}><Text>브랜드</Text></View>
          //     <View style={styles.filterBox}><Text>금액</Text></View>
          //   </View>
          filtering(item.title)
            }
              <List title={item.title}/>
          </View>
      </View>
    );

  return (
    <View style={styles.container}>

      <DeleteModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
      <ShareModal modalVisible2={modalVisible2} setModalVisible2={setModalVisible2} modalVisible3={modalVisible3} setModalVisible3={setModalVisible3} />
      <ShareModal2 modalVisible3={modalVisible3} setModalVisible3={setModalVisible3} modalVisible4={modalVisible4} setModalVisible4={setModalVisible4}/>
      <ConfirmModal modalVisible4={modalVisible4} setModalVisible4={setModalVisible4} />
      <DotModal modal5={modal5} setModal5={setModal5} />


      <View style={styles.main}>
        <View></View>
        <FlatList data={DATA} renderItem={renderItem} showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id}>
        </FlatList>
      </View>
      <View style={styles.footer}>
        <View style={styles.footerBox}>
          <View style={[styles.arrowBox, {right: 0}]}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontSize: 18, fontWeight: '500'}}>{(sumResult.sum + sumResult.exp).toLocaleString()} </Text>
              <Text>원</Text>
            </View>
          </View>
          <Text style={{fontSize: 18, fontWeight: '500'}}>총 예산</Text>
        </View>
        <View style={[styles.footerBox, {paddingLeft: 20, height: 25}]}>
          <View style={[styles.arrowBox, {right: 0}]}><Text>{(sumResult.sum).toLocaleString()} 원</Text></View>
          <Text style={{color: '#616161'}}>ㄴ 구매 금액</Text>
        </View>
        <View style={[styles.footerBox, {paddingLeft: 20, height: 25}]}>
          <View style={[styles.arrowBox, {right: 0}]}><Text>{(sumResult.exp).toLocaleString()} 원</Text></View>
          <Text style={{color: '#616161'}}>ㄴ 구매 예정 금액</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.buttonBox} onPress={()=>setModalVisible2(!modalVisible2)}>
        <Text style={{color: 'white', fontWeight: '600', fontSize: 16}}>출산 리스트 게시판 공유</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Talk1Sub