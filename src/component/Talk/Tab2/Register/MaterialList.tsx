import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useSelector, useDispatch } from 'react-redux'
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

const styles = StyleSheet.create({
    container:{
        height: '100%',
        backgroundColor: 'white'
    },
    main:{
      height: '80%',
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
      borderColor: '#F5F5F5',
    },
    footerBox:{
      height: 50,
      justifyContent: 'center',
    },
})
const Talk1Sub = ({route}) => {

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
    },
    {
      id: 6,
      title: '외출용품',
      icon: require('../../../../../public/assets/image/7.png'),
    },
    {
      id: 7,
      title: '가전용품',
      icon: require('../../../../../public/assets/image/8.png'),
    },
    {
      id: 8,
      title: '놀이용품',
      icon: require('../../../../../public/assets/image/9.png'),
    },
  ];

  const dispatch = useDispatch();
  const info = useSelector(state => state.material.data);
  const [list, setList] = useState(Array.from({length: 8}, () => {return false})); // list display
  const [sumResult, setSumResult] = useState({
    sum: 0,
    exp: 0
  });

  useEffect(()=>{
    dispatch(postMaterial({ order: 'buy' }));
  }, []);

  useEffect(()=>{
    let sum = 0;
    let exp = 0;
    if(info !== '' && info !== '0'){
      info?.filter(x=>{
        if(x.id == 0 && x.needsBrandId !== null){
          exp += x.itemPrice
        } else sum += x.itemPrice;
      });
    }
    setSumResult(prevState => ({...prevState, sum: sum, exp: exp}));

    const arr = DATA.map(x=>{
      if((info.filter(y => x.title == y.category && y.id == 1).length == 0)){
          return true;
      }else return false;
  }); 
  setList(arr);
  
  }, [info]);

  const arrow = (e) => { // arrow 누르면 서브페이지 display
    let arr = [...list];
    arr[e] = !arr[e];
    setList(arr);
  }

  const filtering = (e) => { // 품목 브랜드 가격 부분 none || flex
    if(info?.filter(x => x.category == e && x.id == 1) == ''){
      return(
        <View style={{height: 100, justifyContent: 'center', alignItems: 'center'}}>
          <Text>선택된 품목이 없습니다.</Text>
        </View>
      )
    }else return(
        <View style={styles.mainBox2}>
            <View style={styles.filterBox}><Text>품목</Text></View>
            <View style={styles.filterBox}><Text>브랜드</Text></View>
            <View style={styles.filterBox}><Text>금액</Text></View>
        </View>
    )
  }

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


  const List = ({title}) => {
    let arr = [];
    info?.filter((x, index)=>{
      if(x.category == title && x.deleteStatus == 1 && x.id == 1){
              arr.push(
        <View style={styles.mainBox3} key={index}>
            <View style={[styles.filterBox2, {justifyContent: 'flex-start'}]}><Text style={{fontWeight: '500'}}>{x.needsName}</Text></View>
            <View style={styles.filterBox2}><Text style={{textAlign: 'center', lineHeight: 20}}>{x.itemName == null ? '-' : x.itemName}</Text></View>
            <View style={[styles.filterBox2, {justifyContent: 'flex-end'}]}>
              <Text style={{fontWeight: '600'}}>{x.itemPrice == null ? 0 : (x.itemPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>
              <Text> 원</Text>
            </View>
        </View>
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

  return info == '' || info == '0' ? <ActivityIndicator size={'large'} color='#E0E0E0' style={styles.container}/> : (
    <View style={styles.container}>
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
              <Text style={{fontSize: 18, fontWeight: '500'}}>{(sumResult.sum + sumResult.exp).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} </Text>
              <Text>원</Text>
            </View>
          </View>
          <Text style={{fontSize: 18, fontWeight: '500'}}>총 예산</Text>
        </View>
        <View style={[styles.footerBox, {paddingLeft: 20, height: 25}]}>
          <View style={[styles.arrowBox, {right: 0}]}><Text>{(sumResult.sum).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원</Text></View>
          <Text style={{color: '#616161'}}>ㄴ 구매 금액</Text>
        </View>
        <View style={[styles.footerBox, {paddingLeft: 20, height: 25}]}>
          <View style={[styles.arrowBox, {right: 0}]}><Text>{(sumResult.exp).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원</Text></View>
          <Text style={{color: '#616161'}}>ㄴ 구매 예정 금액</Text>
        </View>
      </View>
    </View>
  )
}

export default Talk1Sub