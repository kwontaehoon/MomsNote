import React, { useState } from 'react'
import { getStatusBarHeight } from "react-native-status-bar-height"; 
import { View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/Ionicons'
import Checkbox from 'expo-checkbox';
import { WithLocalSvg } from "react-native-svg"
import material1 from '../../../public/assets/svg/material1.svg'
import Red from '../../../public/assets/svg/Red.svg'
// import material2 from '../../assets/svg/material2.svg'
// import material3 from '../../assets/svg/material3.svg'
// import material4 from '../../assets/svg/material4.svg'
// import material5 from '../../assets/svg/material5.svg'
// import material6 from '../../assets/svg/material6.svg'
// import material7 from '../../assets/svg/material7.svg'
// import material8 from '../../assets/svg/material8.svg'

const styles = StyleSheet.create({
  container:{
    height: '92%',
    backgroundColor: 'white',
  },
  header:{
    height: '8%',
    flexDirection: 'row',
  },
  headerBox:{
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  iconBox:{
    margin: 5,
  },
  header2:{
    height: '2%',
    backgroundColor: '#F5F5F5'
  },
  header3:{
    height: '8%',
    flexDirection: 'row',
  },
  main:{
    height: '84%',
  },
  mainBox:{
    backgroundColor: '#F5F5F5',
    borderTopWidth: 1,
    borderColor: '#F5F5F5'
  },
  mainBox2:{
    flexDirection: 'row',
    padding: 15,
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
    height: 450,
    alignItems: 'center',
  },
  main3Box:{
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 10,
    height: 400,
    marginTop: 10,

  },
  main3BoxHeader:{
    height: 44,
    flexDirection: 'row',
    borderWidth: 1,
  },
  filterBox:{
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
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
    borderWidth: 1,
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
    height: '80%',
    backgroundColor: '#F5F5F5',
    borderRadius: 3,
    flexDirection: 'row',
    padding: 10
  },
  budgetBox:{
    width: '50%',
    justifyContent: 'center',
  }
})

const Navigation = ({navigation}:any) => {

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

  const arrow = (e) => { // arrow 누르면 서브페이지 display
    let arr = [...list];
    arr[e] = !arr[e];
    setList(arr);
  }

  const change = (e) => { // check box
    let arr = [...isChecked];
    arr[e] = !arr[e];
    setChecked(arr);
}

  const List = (e:any) => {
    let number = list.findIndex((x, index, arr)=>{ return x; })
    console.log('number: ', number);

    return (
      <View style={styles.main3Box}>
        <View style={[styles.main3BoxHeader, {marginBottom: 10}]}>
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
         <WithLocalSvg width={22} height={20} asset={`material${1}`}/>
            <View style={[styles.titleBox, {marginLeft: 5}]}><Text>{item.title}</Text></View>
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
        <View style={styles.header2}></View>
        <View style={styles.header3}>
          <View style={styles.headerBox}>
            <Text>전체 (5/37)</Text>
          </View>
          <View style={[styles.headerBox, {justifyContent: 'flex-end'}]}>
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
              <TouchableOpacity onPress={()=> navigation.navigate('총 예산')}><Text>  자세히 보기  <Icon name='angle-right' size={15}/></Text></TouchableOpacity>
            </View>
          </View>
        </View>
    </View>
  )
}

export default Navigation