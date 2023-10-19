import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Platform, Modal } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useSelector } from 'react-redux'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import Download from '../../../../../public/assets/svg/Download.svg'
import Back from '../../../../../public/assets/svg/Back.svg'
import { useDispatch } from 'react-redux'
import { postMaterial } from '../../../../Redux/Slices/MaterialSlice'
import M1 from '../../../../../public/assets/svg/1.svg'
import M2 from '../../../../../public/assets/svg/2.svg'

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
      borderWidth: 2
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
    bottom: 10,
    borderRadius: 5
  },
})

const Talk1Sub = ({modal, setModal}) => {

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


  const info = useSelector(state => state.material.data);
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

const SVGSelect = (e) => {
  switch(e){
      case 0: return(<M1 />) 
      case 1: return(<M2 />) 
  }
}

const filtering = (e) => { // 품목 브랜드 가격 부분 none || flex
    if(info?.filter(x => x.category == e && x.itemName !== null) == ''){
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

    info?.filter((x, index)=>{
      if(x.category == title){
          arr.push(
        <TouchableOpacity style={styles.mainBox3} onLongPress={()=>setModal5(prevState => ({...prevState, open: true, content: x}))} delayLongPress={1500} activeOpacity={1} key={index}>
            <View style={[styles.filterBox2, {justifyContent: 'flex-start'}]}><Text style={{fontWeight: '500'}}>{x.needsName}</Text></View>
            <View style={styles.filterBox2}><Text numberOfLines={2} style={{lineHeight: 20}}>{x.itemName == null ? '-' : x.itemName}</Text></View>
            <TouchableOpacity style={[styles.filterBox2, {justifyContent: 'flex-end'}]} onLongPress={()=>setModal6(prevState => ({...prevState, open: true, content: x}))} delayLongPress={1500} activeOpacity={1}>
              <Text style={{fontWeight: '600'}}>{(x.itemPrice)}</Text>
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
    

<Modal animationType="fade" transparent={false} visible={modal} statusBarTranslucent={true}
            onRequestClose={() => {setModal(!modal)}}>
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                <View style={styles.header}>
                    <TouchableOpacity><Back /></TouchableOpacity>
                    <Text style={{fontSize: 18, fontWeight: '600', marginLeft: 10}}>총 예산</Text>
                  <View style={styles.headerBar}>
                      <TouchableOpacity style={{marginRight: 5}}><Download/></TouchableOpacity>
                  </View>
                </View>

      <View>
      <View style={styles.main}>

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
        </View>
</View>
</View>
</Modal>
  )
}

export default Talk1Sub