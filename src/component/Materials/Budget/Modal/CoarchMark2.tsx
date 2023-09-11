import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Animated, Platform, Modal, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useSelector } from 'react-redux'
import { getStatusBarHeight } from 'react-native-status-bar-height'


import Download from '../../../../../public/assets/svg/Download.svg'
import Back from '../../../../../public/assets/svg/Back.svg'

import { useDispatch } from 'react-redux'
import { postMaterial } from '../../../../Redux/Slices/MaterialSlice'

import M1 from '../../../../../public/assets/svg/1.svg'
import M2 from '../../../../../public/assets/svg/2.svg'
import M3 from '../../../../../public/assets/svg/3.svg'
import M4 from '../../../../../public/assets/svg/4.svg'
import M5 from '../../../../../public/assets/svg/5.svg'
import M6 from '../../../../../public/assets/svg/6.svg'
import M7 from '../../../../../public/assets/svg/7.svg'
import M8 from '../../../../../public/assets/svg/8.svg'
import M9 from '../../../../../public/assets/svg/9.svg'
import Close from '../.././../../../public/assets/svg/Close.svg'

import Checkbox from 'expo-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage'

const styles = StyleSheet.create({

  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: '100%',
    height: '100%',
    backgroundColor: "rgba(0,0,0,0.5)",
    shadowColor: "#000",
    elevation: 5,
    paddingTop: Platform.OS == 'ios' ? 0 : getStatusBarHeight(),
  },
  modalBox: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modal: {
    backgroundColor: '#FEA100',
    width: '90%',
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginBottom: 7
  },
  imageBox: {
    position: 'absolute',
    right: 10,
    top: 50,
  },
  imageBox2: {
    position: 'absolute',
    left: 50,
    top: 60,
    flexDirection: 'row',
    height: 100,
  },
  imageBox3: {
    position: 'absolute',
    left: 70,
    top: -180,
    flexDirection: 'row',
  },
  imageBox4: {
    width: 100,
    height: 100,
    position: 'absolute',
    left: 20,
    top: 50,
  },
  checkbox: {
    width: 20,
    height: 20,
    marginRight: 8,
    borderRadius: 3,
    marginLeft: 5
  },
  image: {
    width: 50,
    height: 50,
  },
  Top: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  Bottom: {
    justifyContent: 'center',
  },
  header: {
    justifyContent: 'flex-start',
    height: '10%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerBar: {
    position: 'absolute',
    right: 20,
    alignItems: 'center',
    flexDirection: 'row',
  },
  main: {
    height: '64%',
  },
  mainBox: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },
  titleBox: {
    width: '50%',
    justifyContent: 'center',
  },
  arrowBox: {
    position: 'absolute',
    right: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  mainBox2: {
    flexDirection: 'row',
  },
  filterBox: {
    width: '33.4%',
    height: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  mainBox3: {
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
  },
  filterBox2: {
    width: '34.4%',
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  footer: {
    height: '26%',
  },
  footerBox: {
    padding: 15,
    justifyContent: 'center',
  },
  buttonBox: {
    width: '100%',
    height: 56,
    position: 'absolute',
    bottom: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#FEA100',
    width: '90%',
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'dashed',
    borderColor: '#FEA100',
    borderWidth: 2,
    borderRadius: 10,
  }
})

const Talk1Sub = ({ modal, setModal, setModal2 }) => {

  const DATA = [
    {
      id: 0,
      title: '산모용품',
      icon: require('../../../../../public/assets/image/1.png'),
    },
    {
      id: 1,
      title: '수유용품',
      icon: require('../../../../../public/assets/image/2.png'),
    },
    {
      id: 2,
      title: '위생용품',
      icon: require('../../../../../public/assets/image/3.png'),
    },
    {
      id: 3,
      title: '목욕용품',
      icon: require('../../../../../public/assets/image/4.png'),
    },
    {
      id: 4,
      title: '침구류',
      icon: require('../../../../../public/assets/image/5.png'),
    },
    {
      id: 5,
      title: '아기의류',
      icon: require('../../../../../public/assets/image/6.png'),
    }
  ];

  const DATA2 = [
    { needsName: '', itemName: '', itemBrand: '', itemPrice: null },
    { needsName: '양말', itemName: '무압박양말', itemBrand: '아르모엘', itemPrice: 2700 },
    { needsName: '유두 보호 크림', itemName: '연고', itemBrand: '비판텐', itemPrice: 37840 },
    { needsName: '손목 보호대', itemName: '손목보호대', itemBrand: '마더스케이', itemPrice: 12000 },
    { needsName: '튼살크림', itemName: '아토팜 매터니티', itemBrand: '아토팜', itemPrice: 13790 },
    { needsName: '산모복대', itemName: '산후목대', itemBrand: '마미즈', itemPrice: 25200 },
  ]

  const info = useSelector(state => state.material.data);
  const [budget, setBudget] = useState();
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useDispatch();
  const materialSet = useSelector(state => state.material.refresh);
  const [list, setList] = useState([true, false, false, false, false, false]); // list display
  const [modalVisible2, setModalVisible2] = useState(false); // 공유 확인 유무 
  const [modal5, setModal5] = useState({
    open: false,
    content: null,
  }); // onLongPress dot 품목삭제 모달

  const [modal6, setModal6] = useState({
    open: false,
    content: null,
  }); // onLongPress 가격 수정 모달

  const [sumResult, setSumResult] = useState({
    sum: 0,
    exp: 0
  }); // 총 예산

  useEffect(() => {
    dispatch(postMaterial(materialSet));
  }, [modal6, modal5]);

  useEffect(() => {
    const list = async () => {
      const async = await AsyncStorage.getItem('coarchMarkBudget');
      setBudget(async);
    }
    list();
  }, []);

  const close = async () => {
    isChecked ? budget == null ? (AsyncStorage.setItem('coarchMarkBudget', '1'), setModal(false), setModal2(false)) : ''
      : (setModal(false), setModal2(false));
  }

  const SVGSelect = (e) => {
    switch (e) {
      case 0: return (<M1 />)
      case 1: return (<M2 />)
      case 2: return (<M3 />)
      case 3: return (<M4 />)
      case 4: return (<M5 />)
      case 5: return (<M6 />)
      case 6: return (<M7 />)
      case 7: return (<M8 />)
      case 8: return (<M9 />)
    }
  }


  const filtering = (e) => { // 품목 브랜드 가격 부분 none || flex
    if (info?.filter(x => x.category == e) == '') {
      return (
        <View style={{ height: 100, justifyContent: 'center', alignItems: 'center' }}>
          <Text>선택된 품목이 없습니다.</Text>
        </View>
      )
    } else return (
      <View style={styles.mainBox2}>
        <View style={styles.filterBox}><Text>품목</Text></View>
        <View style={styles.filterBox}><Text>브랜드</Text></View>
        <View style={styles.filterBox}><Text>금액</Text></View>
      </View>
    )
  }


  const List = ({ title }) => {
    let arr = [];

    DATA2?.filter((x, index) => {
      arr.push(
        <TouchableOpacity style={styles.mainBox3} delayLongPress={1500} activeOpacity={1} key={index}>
          {index == 0 && <View>
            <TouchableOpacity style={styles.mainBox3}>
              <View style={styles.imageBox2}>
                <View style={[styles.Top, { justifyContent: 'flex-start' }]}><Image source={require('../../../../../public/assets/coachmark/arrow8.png')} style={styles.image} resizeMode='contain' /></View>
                <View style={styles.Bottom}>
                  <Text style={{ color: 'white', fontSize: 15, textAlign: 'center' }}>꾸~욱 클릭하면</Text>
                  <Text style={{ color: 'white', fontSize: 15, textAlign: 'center' }}>삭제가 가능해요!</Text>
                </View>
              </View>

              <View style={{ backgroundColor: 'white', flexDirection: 'row', width: '67%', borderRadius: 10, borderStyle: 'dashed', borderWidth: 2, borderColor: '#FEA100', paddingLeft: 10 }}>
                <View style={{ width: '50%', justifyContent: 'center', alignItems: 'flex-start' }}>
                  <Text style={{ fontWeight: '500' }}>산모패드</Text>
                </View>
                <View style={{ width: '50%', justifyContent: 'center', alignItems: 'center' }}>
                  <Text>마더스베이비</Text></View>
              </View>

              <TouchableOpacity style={[styles.filterBox2, { justifyContent: 'flex-end' }]}>

                <View style={{ backgroundColor: 'white', flexDirection: 'row', padding: 10, borderRadius: 10, borderStyle: 'dashed', borderWidth: 2, borderColor: '#FEA100' }}>

                  <View style={styles.imageBox}>
                    <View style={styles.Top}><Image source={require('../../../../../public/assets/coachmark/arrow12.png')} style={styles.image} resizeMode='contain' /></View>
                    <View style={styles.Bottom}>
                      <Text style={{ color: 'white', fontSize: 15, textAlign: 'center' }}>꾸~욱 클릭하면 다른 맘의</Text>
                      <Text style={{ color: 'white', fontSize: 15, textAlign: 'center' }}>브랜드 품목을 내 리스트에</Text>
                      <Text style={{ color: 'white', fontSize: 15, textAlign: 'center' }}>담을 수 있어요!</Text>
                    </View>
                  </View>

                  <Text style={{ fontWeight: '600' }}>39,900</Text>
                  <Text> 원</Text>
                </View>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>}

          <View style={[styles.filterBox2, { justifyContent: 'flex-start' }]}><Text style={{ fontWeight: '500' }}>{x.needsName}</Text></View>
          <View style={styles.filterBox2}><Text numberOfLines={2} style={{ lineHeight: 20 }}>{x.itemBrand == null ? '-' : x.itemBrand}</Text></View>
          <TouchableOpacity style={[styles.filterBox2, { justifyContent: 'flex-end' }]} delayLongPress={1500} activeOpacity={1}>
            <Text style={{ fontWeight: '600' }}>{x.itemPrice == null ? '0' : (x.itemPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>
            <Text> 원</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      )
    })
    return arr;
  }

  const renderItem = ({ item, index }) => (
    <View>
      <View style={styles.mainBox}>
        <TouchableOpacity style={styles.arrowBox}
          onPress={() => arrow(item.id)}>{list[item.id] ? <Icon name="angle-down" size={22} /> : <Icon name='angle-up' size={22} />}
        </TouchableOpacity>
        {SVGSelect(index)}
        <View style={[styles.titleBox, { marginLeft: 8 }]}><Text style={{ fontSize: 16, fontWeight: '500' }}>{item.title}</Text></View>
      </View>
      <View style={{ display: list[index] ? 'flex' : 'none' }}>
        {filtering(item.title)}
        <List title={item.title} />
      </View>
    </View>
  );

  return (
    <Modal animationType="fade" visible={modal} statusBarTranslucent={true}
      onRequestClose={() => { setModal(!modal) }}>
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>

          <View style={styles.imageBox4}>
            <View style={[styles.Top, { alignItems: 'flex-start' }]}><Close fill='white' onPress={() => close()} /></View>
            <View style={[styles.Bottom, { paddingTop: 10, flexDirection: 'row' }]}>
              <Text style={{ color: '#FEA100', fontSize: 15, fontWeight: '700' }}>다시 보지 않기</Text>
              <Checkbox
                style={styles.checkbox}
                value={isChecked}
                onValueChange={() => setIsChecked(!isChecked)}
                color={isChecked ? '#FEB401' : '#FEB401'} />
            </View>
          </View>

          <View style={styles.header}>
            <TouchableOpacity></TouchableOpacity>
            <Text style={{ fontSize: 18, fontWeight: '600', marginLeft: 10 }}></Text>
            <View style={styles.headerBar}>
              <TouchableOpacity style={{ marginRight: 5 }}><Download /></TouchableOpacity>
            </View>
          </View>

          <View style={styles.main}>
            <FlatList data={DATA} renderItem={renderItem} showsVerticalScrollIndicator={false} scrollEnabled={false}
              keyExtractor={item => item.id}>
            </FlatList>
          </View>

          <View style={styles.footer}>
            <View style={styles.footerBox}>
              <View style={styles.arrowBox}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: 18, fontWeight: '500' }}>0 원</Text>
                  <Text></Text>
                </View>
              </View>
              <Text style={{ fontSize: 18, fontWeight: '500' }}>총 예산</Text>
            </View>
            <View style={[styles.footerBox, { padding: 5, paddingLeft: 20 }]}>
              <View style={styles.arrowBox}><Text>{(sumResult.sum).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원</Text></View>
              <Text style={{ color: '#616161' }}>ㄴ 구매 금액</Text>
            </View>
            <View style={[styles.footerBox, { padding: 5, paddingLeft: 20 }]}>
              <View style={styles.arrowBox}><Text>{(sumResult.exp).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원</Text></View>
              <Text style={{ color: '#616161' }}>ㄴ 구매 예정 금액</Text>
            </View>
            <TouchableOpacity style={styles.buttonBox} onPress={() => setModalVisible2(!modalVisible2)}>

              <View style={styles.imageBox3}>
                <View style={[styles.Top, { justifyContent: 'flex-end' }]}><Image source={require('../../../../../public/assets/coachmark/arrow9.png')} style={styles.image} resizeMode='contain' /></View>
                <View style={[styles.Bottom, { paddingTop: '30%' }]}>
                  <Text style={{ color: 'white', fontSize: 15, textAlign: 'center' }}>내 출산준비물 리스트를</Text>
                  <Text style={{ color: 'white', fontSize: 15, textAlign: 'center' }}>공유 및 비교해요!</Text>
                </View>
              </View>

              <View style={styles.button}>
                <Text style={{ color: 'white', fontWeight: '600', fontSize: 18 }}>출산 리스트 게시판 공유</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default Talk1Sub