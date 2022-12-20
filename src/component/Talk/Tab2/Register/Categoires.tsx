import React, { useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import Icon from 'react-native-vector-icons/FontAwesome'

const styles = StyleSheet.create({
    container:{
        height: '100%',
        backgroundColor: 'white'
    },
    main:{
      height: '75%',
    },
    mainBox:{
      height: 50,
      justifyContent: 'center',
      padding: 15,
      backgroundColor: '#F5F5F5'
    },
    arrowBox:{
      position: 'absolute',
      right: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    mainBox2:{
      flexDirection: 'row',
      borderBottomWidth: 2,
      borderColor: '#F5F5F5'
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
      borderColor: '#F5F5F5'
    },
    filterBox2:{
      width: '33.4%',
      height: 48,
      alignItems: 'center',
      justifyContent: 'center'
    },
    footer:{
      height: '20%',
      padding: 15,
      borderTopWidth: 1,
      borderColor: '#F5F5F5',
    },
    footerBox:{
      height: '33.4%',
      justifyContent: 'center',
    },
    buttonBox:{
      height: 56,
      backgroundColor: '#FEA100',
      alignItems: 'center',
      justifyContent: 'center',
    },
})
const Talk1Sub = () => {

  const [info, setInfo] = useState([
    {
      id: 1,
      title: '산모패드',
      brand: '마더스베이비',
      price: '39,000'
    },{
      id: 1,
      title: '산모패드',
      brand: '마더스베이비',
      price: '39,800'
    },{
      id: 1,
      title: '산모패드',
      brand: '마더스베이비',
      price: '31,000'
    },{
      id: 1,
      title: '산모패드',
      brand: '마더스베이비',
      price: '29,000'
    },
  ])

  const DATA = [
    {
      id: 0,
      title: '산모용품 (0/13)',
      color: '#FFADAD',
      icon: 'material1'
    },
    {
      id: 1,
      title: '산모용품 (0/13)',
      color: '#FFADAD',
      icon: 'material1'
    },
    {
      id: 2,
      title: '산모용품 (0/13)',
      color: '#FFADAD',
      icon: 'material1'
    },
  ];

  const [list, setList] = useState(Array.from({length: 8}, () => {return false})); // list display
  console.log('list: ', list);

  const arrow = (e) => { // arrow 누르면 서브페이지 display
    let arr = [...list];
    arr[e] = !arr[e];
    setList(arr);
  }


  const List = () => {
    let arr = [];
    info.filter((x, index)=>{
      arr.push(
        <View style={styles.mainBox3}>
            <View style={styles.filterBox2}><Text style={{fontWeight: '500'}}>{x.title}</Text></View>
            <View style={styles.filterBox2}><Text>{x.brand}</Text></View>
            <View style={styles.filterBox2}><Text style={{fontWeight: '600'}}>{x.price} 원</Text></View>
        </View>
      )
    })
    return arr;
  }

  const renderItem = ({ item }) => (
      <View>
          <View style={styles.mainBox}>
            <TouchableOpacity style={styles.arrowBox}
                onPress={()=>arrow(item.id)}>{list[item.id] ? <Icon name="angle-down" size={22}/> : <Icon name='angle-up' size={22}/>}
            </TouchableOpacity>
              <Text style={{fontSize: 15}}>{item.title}</Text>
          </View>
          <View style={{display: list[item.id] ? 'none' : 'flex'}}>
            <View style={styles.mainBox2}>
              <View style={styles.filterBox}><Text>품목</Text></View>
              <View style={styles.filterBox}><Text>브랜드</Text></View>
              <View style={styles.filterBox}><Text>금액</Text></View>
            </View>
            <List />
          </View>
      </View>
    );

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <View></View>
        <FlatList data={DATA} renderItem={renderItem}
              keyExtractor={item => item.id}>
        </FlatList>
      </View>
      <View style={styles.footer}>
        <View style={styles.footerBox}>
          <View style={[styles.arrowBox, {right: 0}]}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontSize: 18, fontWeight: '500'}}>119,700 </Text>
              <Text>원</Text>
            </View>
          </View>
          <Text style={{fontSize: 18, fontWeight: '500'}}>총 예산</Text>
        </View>
        <View style={styles.footerBox}>
          <View style={[styles.arrowBox, {right: 0}]}><Text>119,700 원</Text></View>
          <Text style={{color: '#616161'}}>ㄴ 구매 금액</Text>
        </View>
        <View style={styles.footerBox}>
          <View style={[styles.arrowBox, {right: 0}]}><Text>0 원</Text></View>
          <Text style={{color: '#616161'}}>ㄴ 구매 예정 금액</Text>
        </View>
      </View>
    </View>
  )
}

export default Talk1Sub