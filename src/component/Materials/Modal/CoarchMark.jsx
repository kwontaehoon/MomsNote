import React, { useState, useEffect } from 'react'
import { getStatusBarHeight } from "react-native-status-bar-height";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Modal, Platform } from 'react-native'
import Icon3 from 'react-native-vector-icons/Feather'
import Checkbox from 'expo-checkbox';
import { useSelector, useDispatch } from 'react-redux';
import { postMaterial } from '../../../Redux/Slices/MaterialSlice'
import More from '../../../../public/assets/svg/More.svg'
import Sort from '../../../../public/assets/svg/Sort.svg'
import Download from '../../../../public/assets/svg/Download.svg'
import Search from '../../../../public/assets/svg/Search.svg'
import Bell from '../../../../public/assets/svg/Bell.svg'
import MyPage from '../../../../public/assets/svg/Mypage.svg'
import ArrowRight from '../../../../public/assets/svg/Arrow-Right.svg'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Close from '../../../../public/assets/svg/Close.svg'

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS == 'ios' ? 0 : getStatusBarHeight(),
  },
  header: {
    height: 55,
    justifyContent: 'center',
    padding: 17,
  },
  headerBar: {
    position: 'absolute',
    right: 20,
    alignItems: 'center',
    flexDirection: 'row',
  },
  header2: {
    height: 55,
    justifyContent: 'center',
    padding: 15,
  },
  headerBox2: {
    position: 'absolute',
    zIndex: 10,
    right: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 10,
    borderStyle: 'dashed',
    borderColor: '#FEA100',
    borderWidth: 2
  },
  main: {
    height: '79%',
  },
  mainBox: {
    height: 300,
  },
  mainBox2: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
  },
  titleBox: {
    justifyContent: 'center',
  },
  arrowBox: {
    position: 'absolute',
    right: 15,
  },
  main3: {
    alignItems: 'center',
    paddingBottom: 15,

  },
  main3Box: {
    width: '90%',
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  main3BoxHeader: {
    height: 44,
    flexDirection: 'row',
    marginBottom: 7,
  },
  filterBox: {
    width: '44%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterSub: {
    paddingLeft: 8,
    paddingTop: 4,
    paddingRight: 8,
    paddingBottom: 4,
    marginRight: 5,
    marginLeft: 5,
    borderRadius: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    marginRight: 8,
    borderRadius: 3,
    marginLeft: 5
  },
  footer: {
    width: '100%',
    height: Platform.OS == 'ios' ? 0 : 80,
    flex: Platform.OS == 'ios' ? 1 : 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerBox: {
    width: '95%',
    height: 52,
    borderRadius: 3,
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
  },
  budgetBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  budgetBox2: {
    position: 'absolute',
    right: 15,
  },
  saveModal: {
    width: '90%',
    height: 40,
    opacity: 0.7,
    borderRadius: 10,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  saveModalBox: {
    width: '100%',
    height: 40,
    position: 'absolute',
    zIndex: 10,
    bottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
    paddingTop: getStatusBarHeight(),
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
    marginBottom: 7,
  },
  imageBox: {
    width: 100,
    height: 100,
    position: 'absolute',
    left: -50,
    top: 50,
    flexDirection: 'row',
  },
  imageBox2: {
    width: 100,
    height: 100,
    position: 'absolute',
    right: -20,
    top: 60,
  },
  imageBox3: {
    width: '100%',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 40,
    flexDirection: 'row',
  },
  imageBox4: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    position: 'absolute',
    left: -110,
    top: -20,
    flexDirection: 'row',
  },
  imageBox5: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    position: 'absolute',
    left: -30,
    top: 20,
  },
  imageBox6: {
    width: 150,
    height: 150,
    position: 'absolute',
    left: 20,
    top: 50,
    zIndex: 999,
  },
  image: {
    width: 50,
    height: 50,
  },
  Top: {
    alignItems: 'flex-end'
  },
  Bottom: {
    justifyContent: 'center'
  },

})

const Navigation = ({ modal, setModal }) => {

  const DATA = [
    {
      id: 0,
      title: '산모용품',
      icon: require('../../../../public/assets/image/1.png'),
    },
  ];

  const dispatch = useDispatch();
  const info = useSelector(state => { return state.material.data; });
  const materialSet = useSelector(state => { return state.material.refresh; });
  const [purchaseCount, setPurchaseCount] = useState(null); // 전체 구매 갯수
  const [sumResult, setSumResult] = useState({
    sum: 0,
    exp: 0
  }); // 총 예산

  const [purchaseCheckBox, setPurchaseCheckBox] = useState(); // 체크박스 선택시 모달 안나옴

  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const materialPurchase = async () => {
      const asyncStorage = await AsyncStorage.getItem('materialPurchase');
      setPurchaseCheckBox(asyncStorage);
    }
    materialPurchase();
  }, []);

  useEffect(() => {
    dispatch(postMaterial(materialSet));
  }, []);

  useEffect(() => {
    let sum = 0;
    let exp = 0;
    info == undefined ? '' :
      info?.filter(x => {
        if (x.id == 0 && x.needsBrandId !== null) {
          exp += x.itemPrice
        } else sum += x.itemPrice;
      });
    setSumResult(prevState => ({ ...prevState, sum: sum, exp: exp }));
    setPurchaseCount(info?.filter(x => x.id == 1));
  }, [info]);

  const close = async () => {
    isChecked ? (AsyncStorage.setItem('coarchMarkMaterial', '1'), setModal(!modal)) : setModal(!modal);
  }

  const optionBox = (e) => {
    switch (e) {
      case '필수': return (<View style={[styles.filterSub]}></View>)
    }
  }

  const List = (e) => {
    return (
      <View style={styles.main3Box} key={e.title}>
        <View style={styles.main3BoxHeader}>
          <View style={[styles.filterBox, { width: '12%' }]}><Text></Text></View>
          <View style={[styles.filterBox, { width: '60%' }]}><Text></Text></View>
          <View style={[styles.filterBox, { width: '28%' }]}><Text></Text></View>
        </View>
        <View style={[styles.main3BoxHeader]}>
          <View style={{width: '12%'}}></View>
          <TouchableOpacity style={[styles.filterBox, { flexDirection: 'row', justifyContent: 'flex-start', width: '60%' }]}>
            {optionBox('필수')}
            <View style={{ backgroundColor: 'white', padding: 10, marginLeft: 15, borderRadius: 10, borderStyle: 'dashed', borderColor: '#FEA100', borderWidth: 2 }}>

              <View style={styles.imageBox5}>
                <View style={[styles.Top, { alignItems: 'center' }]}><Image source={require('../../../../public/assets/coachmark/arrow8.png')} style={styles.image} resizeMode='contain' /></View>
                <View style={styles.Bottom}>
                  <Text style={{ color: 'white', fontSize: 15, textAlign: 'center', fontWeight: '700' }}>품목 클릭 시</Text>
                  <Text style={{ color: 'white', fontSize: 15, textAlign: 'center', fontWeight: '700' }}>설명을 볼 수 있어요!</Text>
                </View>

              </View>
              <Text style={{ fontSize: 13 }}>수유 브라</Text>
            </View>
          </TouchableOpacity>
          <View style={[styles.filterBox, { width: '28%' }]}>
            <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 10, borderStyle: 'dashed', borderColor: '#FEA100', borderWidth: 2 }}>

              <View style={styles.imageBox2}>
                <View style={styles.Top}><Image source={require('../../../../public/assets/coachmark/arrow14.png')} style={styles.image} resizeMode='contain' /></View>
                <View style={[styles.Bottom, { justifyContent: 'flex-start', paddingRight: 5 }]}>
                  <Text style={{ color: 'white', fontSize: 15, textAlign: 'center', fontWeight: '700' }}>구매한 브랜드를</Text>
                  <Text style={{ color: 'white', fontSize: 15, textAlign: 'center', fontWeight: '700' }}>선택해보세요!</Text>
                </View>
              </View>

              <View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: '#FEB401', alignItems: 'center', justifyContent: 'center' }}>
                <Icon3 name="plus" size={20} style={{ color: 'white' }} onPress={() => setModalVisible2(prevState => ({ ...prevState, open: true, needsId: x.needsId, needsDataId: x.needsDataId }))} />
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }

  const renderItem3 = ({ item, index }) => (
    <View style={styles.mainBox}>
      <View style={styles.mainBox2}>
        <View style={{ padding: 12 }}></View>
        <View style={[styles.titleBox, { marginLeft: 8 }]}></View>
        <TouchableOpacity style={styles.arrowBox}></TouchableOpacity>
      </View>
      <View style={styles.main3}>
        <List title={item.title} />
      </View>
    </View>
  );

  return (
    <Modal animationType="fade" transparent={true} visible={modal} statusBarTranslucent={true}
      onRequestClose={() => setModal(false)}>
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>

          <View style={styles.imageBox6}>
            <View style={[styles.Top, { alignItems: 'flex-start', padding: 5 }]}>
              <TouchableOpacity onPress={close}>
                <Close fill='white' />
              </TouchableOpacity>
            </View>
            <View style={[styles.Bottom, { paddingTop: 10, flexDirection: 'row', justifyContent: 'flex-start' }]}>
              <Text style={{ color: '#FEA100', fontSize: 15, fontWeight: '700' }}>다시 보지 않기</Text>
              <Checkbox
                style={styles.checkbox}
                value={isChecked}
                onValueChange={() => setIsChecked(!isChecked)}
                color={isChecked ? '#FEB401' : '#FEB401'} />
            </View>
          </View>

          <View style={styles.header}>
            <View style={styles.headerBar}>

              <View style={styles.imageBox}>
                <View style={styles.Bottom}>
                  <Text style={{ color: 'white', fontSize: 15, textAlign: 'center', fontWeight: '700' }}>저장, 검색</Text>
                  <Text style={{ color: 'white', fontSize: 15, textAlign: 'center', fontWeight: '700' }}>기능 활용!</Text>
                </View>
                <View style={styles.Top}><Image source={require('../../../../public/assets/coachmark/arrow4.png')} style={styles.image} resizeMode='contain' /></View>
              </View>

              <View style={{ flexDirection: 'row', backgroundColor: 'white', paddingLeft: 15, paddingTop: 5, paddingBottom: 5, borderRadius: 10, borderStyle: 'dashed', borderColor: '#FEA100', borderWidth: 2 }}>
                <TouchableOpacity style={{ marginRight: 20 }}><Download /></TouchableOpacity>
                <TouchableOpacity style={{ marginRight: 20 }}><Search /></TouchableOpacity>
              </View>
              <TouchableOpacity style={{ marginRight: 20, opacity: 0 }}><Bell /></TouchableOpacity>
              <TouchableOpacity style={{ marginRight: 5, opacity: 0 }}><MyPage /></TouchableOpacity>
            </View>
          </View>
          <View style={styles.header2}>
            <View style={styles.headerBox2}>

              <View style={styles.imageBox}>
                <View style={styles.Bottom}>
                  <Text style={{ color: 'white', fontSize: 15, textAlign: 'center', fontWeight: '700' }}>정렬, 품목</Text>
                  <Text style={{ color: 'white', fontSize: 15, textAlign: 'center', fontWeight: '700' }}>기능 활용!</Text>
                </View>
                <View style={styles.Top}><Image source={require('../../../../public/assets/coachmark/arrow4.png')} style={styles.image} resizeMode='contain' /></View>
              </View>
              <TouchableOpacity activeOpacity={1} style={{ paddingRight: 20 }}><Sort /></TouchableOpacity>
              <TouchableOpacity activeOpacity={1}><More /></TouchableOpacity>
            </View>

          </View>
          <View>
            <View style={styles.main}>

              <View style={styles.imageBox3}>
                <Image source={require('../../../../public/assets/coachmark/tag.png')} resizeMode='cover' />
              </View>

              <FlatList data={DATA} renderItem={renderItem3}
                keyExtractor={item => String(item.id)}>
              </FlatList>
            </View>

            <View style={styles.footer}>
              <View style={styles.footerBox}>
                <View style={styles.budgetBox}>
                  <Text style={{ fontWeight: '500' }}></Text>
                </View>
                <View style={styles.budgetBox2}>
                  <TouchableOpacity style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}>

                    <View style={styles.imageBox4}>
                      <View style={[styles.Bottom, { justifyContent: 'flex-start' }]}>
                        <Text style={{ color: 'white', fontSize: 15, textAlign: 'center', fontWeight: '700' }}>나의 예산 관리가</Text>
                        <Text style={{ color: 'white', fontSize: 15, textAlign: 'center', fontWeight: '700' }}>가능해요!</Text>
                      </View>
                      <View style={[styles.Top, { justifyContent: 'center' }]}><Image source={require('../../../../public/assets/coachmark/arrow15.png')} style={styles.image} resizeMode='contain' /></View>
                    </View>

                    <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 10, flexDirection: 'row', borderStyle: 'dashed', borderColor: '#FEA100', borderWidth: 2 }}>
                      <Text style={{ fontSize: 12 }}>자세히 보기</Text>
                      <ArrowRight fill={'black'} width={15} height={15} />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default Navigation