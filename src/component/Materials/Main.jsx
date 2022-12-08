import React, { useState } from 'react'
import { getStatusBarHeight } from "react-native-status-bar-height"; 
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/Ionicons'
import Checkbox from 'expo-checkbox';
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
  iconBox:{
    margin: 5,
  },
  header:{
    height: '2%',
    backgroundColor: '#F5F5F5'
  },
  header3:{
    height: '8%',
    flexDirection: 'row',
  },
  header3Box:{
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  main:{
    height: '80%',
  },
  mainBox:{
    backgroundColor: '#F5F5F5',
    borderTopWidth: 1,
    borderColor: '#F5F5F5',
    
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
    padding: 10
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
    paddingLeft: 8,
    paddingTop: 2,
    paddingbottom: 2,
    paddingRight: 8,
    borderWidth: 1,
    marginRight: 3,
  },
  checkbox: {
    width: 24,
    height: 24,
    marginRight: 8,
    borderRadius: 3,
    borderColor: '#E0E0E0',
  },
  footer:{
    width: '100%',
    height: '10%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 7,
    position: 'absolute',
    bottom: 0,
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
  modalContainer:{
    justifyContent: "center",
    alignItems: "center",
  },
  modalView:{
    width: '100%',
    height: '100%',
    margin: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: 'center',
    shadowColor: "#000",
    elevation: 5,
  },
  modalContainer2:{
    width: '80%',
    height: 144,
    backgroundColor: 'white',
    marginBottom: 35,
    borderRadius: 15,
  },
  modalBox:{
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBoxSub:{
    flexDirection: 'row',
    paddingLeft: 30,
    height: '20%',
    alignItems: 'center',
  },
  modal:{
    backgroundColor: '#FEA100',
    width: '90%',
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginBottom: 7,
  },
})

const Navigation = ({navigation}) => {

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
      title: '산모용품 (0/13)',
      color: '#FFADAD'
      
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
    }
  ];

  const [list, setList] = useState(Array.from({ length: 8 }, () => { return false}));
  console.log('list: ', list);
  const [isChecked, setChecked] = useState(Array.from({length: DATA2.length}, ()=>{ return false })); // check box
  const [isChecked2, setChecked2] = useState(false); // check box 선택시 체크 팝업에서의 check box
  const [modalVisible, setModalVisible] = useState(false);

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
  
  const complete = () => {
    setModalVisible(!modalVisible);
  }

  const List = (e) => {
    let number = list.findIndex((x, index, arr)=>{ return x; })
    console.log('number: ', number);

    return (
      <View style={styles.main3Box}>
        <View style={styles.main3BoxHeader}>
          <View style={[styles.filterBox, {width: '15%'}]}><Text>구매</Text></View>
          <View style={[styles.filterBox, {width: '45%'}]}><Text>품목</Text></View>
          <View style={[styles.filterBox, {width: '40%'}]}><Text>브랜드</Text></View>
        </View>
        <FlatList data={DATA2} renderItem={renderItem2}
            keyExtractor={item => item.id} showsHorizontalScrollIndicator={false}>
        </FlatList>
      </View>
    )
  }

  const renderItem = ({ item }) => (
    <View style={styles.mainBox}>
        <View style={styles.mainBox2}>
          <Icon name="camera" size={22} />
            <View style={[styles.titleBox, {marginLeft: 8}]}><Text>{item.title}</Text></View>
            <TouchableOpacity style={styles.arrowBox}
              onPress={()=>arrow(item.id)}><Icon name="angle-down" size={22} />
            </TouchableOpacity>
        </View> 
        <View style={[styles.main3, {display: list[item.id] ? 'flex' : 'none'}]}>
          <List id={item.id}/>
        </View>
    </View>
  );

  const renderItem2 = ({ item }) => (
      <View style={[styles.main3BoxHeader]}>
          <View style={[styles.filterBox, {width: '15%'}]}>
          <Checkbox
              style={styles.checkbox}
              value={isChecked[item.id]}
              onValueChange={()=>change(item.id)}
              color={isChecked[item.id] ? '#FEB401' : undefined}/>
          </View>
          <View style={[styles.filterBox, {width: '45%', flexDirection: 'row', justifyContent: 'flex-start'}]}>
            <View style={styles.filterSub}><Text style={{fontSize: 12}}>필수</Text></View>
            <Text>품목</Text>
          </View>
          <View style={[styles.filterBox, {width: '40%'}]}>
            <View style={{width: 24, height: 24, borderRadius: 12,backgroundColor: '#FEB401', alignItems: 'center', justifyContent: 'center'}}>
              <Icon name="plus" size={10} style={{color: 'white'}} onPress={()=>navigation.navigate('브랜드 선택')}/>
            </View>
          </View>
      </View>
  ); 

  return (
    <View style={styles.container}>

<Modal animationType="fade" transparent={true} visible={modalVisible}
            onRequestClose={() => {
            setModalVisible(!modalVisible)}}>
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <View style={[styles.modalContainer2, {height: 326}]}>
                        <View style={styles.modalBox}>
                            <Text style={{fontSize: 18, paddingTop: 10}}>선택하신 품목을 구매 완료로</Text>
                            <Text style={{fontSize: 18, paddingTop: 3}}>체크 하시겠습니까?</Text>
                            <Text style={{fontSize: 14, paddingTop: 10, color: '#757575'}}>구매 완료 시 출산준비리스트 구매율로 합산되어</Text>
                            <Text style={{fontSize: 14, color: '#757575'}}>다른 사용자들의 구매에 도움이 됩니다.</Text>
                        </View>
                        <View style={styles.modalBoxSub}>
                                <View>
                                <Checkbox
                                  style={styles.checkbox}
                                  value={isChecked2}
                                  onValueChange={setChecked2}
                                  color={isChecked2 ? '#2196F3' : undefined}/>
                                </View>
                                <Text style={{color: '#424242'}}>다시 표시하지 않겠습니다.</Text>
                          </View>
                        <View style={styles.modalBox}>
                            <TouchableOpacity style={styles.modal}><Text style={{color: 'white', fontSize: 16}}>구매 완료</Text></TouchableOpacity>
                            <TouchableOpacity style={[styles.modal, {backgroundColor: 'white', borderWidth: 1, borderColor: '#EEEEEE'}]} onPress={complete}><Text style={{color: 'black', fontSize: 16}}>취소</Text></TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>

        <View style={styles.header}/>
        <View style={styles.header3}>
          <View style={styles.header3Box}>
            <Text>전체 (5/37)</Text>
          </View>
          <View style={[styles.header3Box, {justifyContent: 'flex-end'}]}>
            <View style={[styles.iconBox, {marginRight: 10}]}><Icon2 name='filter' size={22} /></View>
            <View style={[styles.iconBox, {marginRight: 10}]}><Icon name='ellipsis-v' size={22} style={{marginLeft: 10}}/></View>
          </View>
        </View>
        <View style={styles.main}>
          <FlatList data={DATA} renderItem={renderItem}
              keyExtractor={item => item.id}>
          </FlatList>
        </View>
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