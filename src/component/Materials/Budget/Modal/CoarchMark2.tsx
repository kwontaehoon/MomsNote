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
import Close from '../.././../../../public/assets/svg/Close.svg'

import Checkbox from 'expo-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage'

const styles = StyleSheet.create({

    modalContainer:{
        justifyContent: "center",
        alignItems: "center",
    },
    modalView:{
        width: '100%',
        height: '100%',
        backgroundColor: "rgba(0,0,0,0.5)",
        shadowColor: "#000",
        elevation: 5,
        paddingTop: Platform.OS == 'ios' ? 0 : getStatusBarHeight(),
    },
    modalContainer2:{
        width: '80%',
        borderRadius: 15,
    },
    modalBox:{
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modal:{
        backgroundColor: '#FEA100',
        width: '90%',
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        marginBottom: 7,
    },
    imageBox:{
        position: 'absolute',
        left: -100,
        top: -80,
    },
    imageBox2:{
        position: 'absolute',
        left: 50,
        top: 50,
        flexDirection: 'row',
    },
    imageBox3:{
        position: 'absolute',
        left: 70,
        top: -180,
        flexDirection: 'row',
    },
    imageBox4:{
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
    image:{
        width: 50,
        height: 50,
    },
    Top:{
        alignItems: 'center',
        justifyContent: 'center'
    },
    Bottom:{
        justifyContent: 'center'
    },
  header:{
    justifyContent: 'flex-start',
    padding: 18,
    flexDirection: 'row',
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
  },
  titleBox:{
    width: '50%',
    justifyContent: 'center',
},
  arrowBox:{
    position: 'absolute',
    right: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  mainBox2:{
    flexDirection: 'row',
  },
  filterBox:{
    width: '33.4%',
    height: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  mainBox3:{
    flexDirection: 'row',
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
    borderRadius: 5
  },
})

const Talk1Sub = ({modal, setModal, setModal2}) => {

  const DATA = [
    {
      id: 0,
      title: '산모용품',
      icon: require('../../../../../public/assets/image/1.png'),
    },{
      id: 1,
      title: '수유용품',
      icon: require('../../../../../public/assets/image/2.png'),
    },
  ];

  const DATA2 = [
    {needsName: '산모패드', itemName: '마더스베이비', itemPrice: 39900},
    {needsName: '양말', itemName: '마더스베이비', itemPrice: 39900},
    {needsName: '유두 보호 크림', itemName: '마더스베이비', itemPrice: 39900},
    {needsName: '손목 보호대', itemName: '마더스베이비', itemPrice: 39900},
    {needsName: '수유 브라', itemName: '마더스베이비', itemPrice: 39900},
    {needsName: '수유 나시', itemName: '마더스베이비', itemPrice: 39900},
    {needsName: '임부용 팬티', itemName: '마더스베이비', itemPrice: 39900},
  ]

  const [budget, setBudget] = useState();
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useDispatch();
  const materialSet = useSelector(state => state.material.refresh);
  const [list, setList] = useState(Array.from({length: 8}, () => {return false})); // list display
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

  useEffect(()=>{
    dispatch(postMaterial(materialSet));
  }, [modal6, modal5]);

  useEffect(()=>{
    const list = async() =>{
        const async = await AsyncStorage.getItem('coarchMarkBudget');
        setBudget(async);
    }
    list();
}, []);

const close = async() => {
    isChecked ? budget == null ? (AsyncStorage.setItem('coarchMarkBudget', '1'), setModal(false), setModal2(false)) : ''
    : (setModal(false), setModal2(false));
}


  const filtering = (e) => { // 품목 브랜드 가격 부분 none || flex

    return(
        <View style={styles.mainBox2}>
            <View style={styles.filterBox}><Text></Text></View>
            <View style={styles.filterBox}><Text></Text></View>
            <View style={styles.filterBox}><Text></Text></View>
        </View>
    )
  }


  const List = ({title}) => {
    let arr = [];

    DATA2.filter((x, index)=>{
        arr.push(
        <TouchableOpacity style={styles.mainBox3} key={index}>
            <View style={[styles.filterBox2, {justifyContent: 'flex-start'}]}>
              <Text style={{fontWeight: '500'}}></Text>
            </View>
            <View style={styles.filterBox2}><Text></Text></View>
            <TouchableOpacity style={[styles.filterBox2, {justifyContent: 'flex-end'}]} onLongPress={()=>setModal6(prevState => ({...prevState, open: true, content: x}))} delayLongPress={1500} activeOpacity={1}>
              <Text style={{fontWeight: '600'}}></Text>
              <Text></Text>
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
                onPress={()=>arrow(item.id)}>
            </TouchableOpacity>
            <View style={[styles.titleBox, {marginLeft: 8}]}><Text style={{fontSize: 16, fontWeight: '500'}}></Text></View>
          </View>
          <View style={{display: list[item.id] ? 'none' : 'flex'}}>
           { 
            filtering(item.title)
          }
          <TouchableOpacity style={styles.mainBox3}>
              <View style={[styles.filterBox2, {justifyContent: 'flex-start'}]}><Text style={{fontWeight: '500'}}></Text></View>
              <View style={styles.filterBox2}><Text></Text></View>
            <TouchableOpacity style={[styles.filterBox2, {justifyContent: 'flex-end'}]}>
                <Text style={{fontWeight: '600'}}></Text>
                <Text> 원</Text>
            </TouchableOpacity>

          </TouchableOpacity>
              <List title={item.title}/>
          </View>
      </View>
    );

  return (
    

<Modal animationType="fade" transparent={true} visible={modal} statusBarTranslucent={true}
            onRequestClose={() => {setModal(!modal)}}>
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>

                <View style={styles.imageBox4}>
                    <View style={[styles.Top, {alignItems: 'flex-start'}]}><Close fill='white' onPress={()=>close()}/></View>
                        <View style={[styles.Bottom, {paddingTop: 10, flexDirection: 'row'}]}>
                        <Text style={{color: '#FEA100', fontSize: 15, fontWeight: '700'}}>다시 보지 않기</Text>
                        <Checkbox
                            style={styles.checkbox}
                            value={isChecked}
                            onValueChange={()=>setIsChecked(!isChecked)}
                            color={isChecked ? '#FEB401' : '#FEB401'}/>
                    </View>
                </View>

                <View style={styles.header}>
                    <TouchableOpacity></TouchableOpacity>
                    <Text style={{fontSize: 18, fontWeight: '600', marginLeft: 10}}></Text>
                  <View style={styles.headerBar}>
                      <TouchableOpacity style={{marginRight: 5}}><Download/></TouchableOpacity>
                  </View>
                </View>

      <View>
      <View style={styles.main}>

      <View>
          <View style={styles.mainBox}>
            <TouchableOpacity style={styles.arrowBox}></TouchableOpacity>
            <View style={[styles.titleBox, {marginLeft: 8}]}><Text style={{fontSize: 16, fontWeight: '500'}}></Text></View>
          </View>
          <View>
           { 
            filtering('산모용품')
            }
          <TouchableOpacity style={styles.mainBox3}>

                <View style={styles.imageBox2}>
                    <View style={[styles.Top, {justifyContent: 'flex-start'}]}><Image source={require('../../../../../public/assets/coachmark/arrow8.png')} style={styles.image} resizeMode='contain'/></View>
                    <View style={styles.Bottom}>
                        <Text style={{color: 'white', fontSize: 15, textAlign: 'center'}}>꾸~욱 클릭하면</Text>
                        <Text style={{color: 'white', fontSize: 15, textAlign: 'center'}}>삭제가 가능해요!</Text>
                    </View>
                </View>

              <View style={[styles.filterBox2, {justifyContent: 'flex-start', backgroundColor: 'white', borderTopLeftRadius: 10, borderBottomLeftRadius: 10, paddingLeft: 10}]}>
                <Text style={{fontWeight: '500'}}>산모패드</Text>
              </View>
              <View style={[styles.filterBox2, {backgroundColor: 'white', borderBottomRightRadius: 10, borderTopRightRadius: 10}]}><Text>마더스베이비</Text></View>

            <TouchableOpacity style={[styles.filterBox2, {justifyContent: 'flex-end'}]}>
              <View style={{backgroundColor: 'white', flexDirection: 'row', padding: 5, borderRadius: 5}}>

                <View style={styles.imageBox}>
                    <View style={styles.Bottom}>
                        <Text style={{color: 'white', fontSize: 15, textAlign: 'center'}}>꾸~욱 클릭하면</Text>
                        <Text style={{color: 'white', fontSize: 15, textAlign: 'center'}}>금액 수정이 가능해요!</Text>
                    </View>
                    <View style={styles.Top}><Image source={require('../../../../../public/assets/coachmark/arrow7.png')} style={styles.image} resizeMode='contain'/></View>
                </View>

                <Text style={{fontWeight: '600'}}>39,900</Text>
                <Text> 원</Text>
              </View>
            </TouchableOpacity>
        </TouchableOpacity>
              {/* <List title={item.title}/> */}
          </View>
      </View>

        <FlatList data={DATA} renderItem={renderItem} showsVerticalScrollIndicator={false} scrollEnabled={false}
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
          <Text style={{fontSize: 18, fontWeight: '500'}}></Text>
        </View>
        <View style={[styles.footerBox, {padding: 5, paddingLeft: 20}]}>
          <View style={styles.arrowBox}><Text>{(sumResult.sum).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text></View>
          <Text style={{color: '#616161'}}></Text>
        </View>
        <View style={[styles.footerBox, {padding: 5, paddingLeft: 20}]}>
          <View style={styles.arrowBox}><Text>{(sumResult.exp).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text></View>
          <Text style={{color: '#616161'}}></Text>
        </View>
        <TouchableOpacity style={styles.buttonBox} onPress={()=>setModalVisible2(!modalVisible2)}>

            <View style={styles.imageBox3}>
            <View style={[styles.Top, {justifyContent: 'flex-end'}]}><Image source={require('../../../../../public/assets/coachmark/arrow9.png')} style={styles.image} resizeMode='contain'/></View>
                <View style={[styles.Bottom, {paddingTop: '30%'}]}>
                    <Text style={{color: 'white', fontSize: 15, textAlign: 'center'}}>내 출산준비물 리스트를</Text>
                    <Text style={{color: 'white', fontSize: 15, textAlign: 'center'}}>공유 및 비교해요!</Text>
                </View>
            </View>

          <Text style={{color: 'white', fontWeight: '600', fontSize: 16}}>출산 리스트 게시판 공유</Text>
        </TouchableOpacity>
      </View>
        </View>
</View>
</View>
</Modal>
  )
}

export default Talk1Sub