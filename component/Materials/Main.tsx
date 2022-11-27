import React from 'react'
import { getStatusBarHeight } from "react-native-status-bar-height"
import { View, Text, StyleSheet, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/AntDesign'
import Icon3 from 'react-native-vector-icons/Feather'

const styles = StyleSheet.create({
  container:{
    marginTop: getStatusBarHeight(),
    borderWidth: 2,
    height: '89%',
  },
  header:{
    width: '100%',
    height: '6%',
    borderWidth: 1,
    flexDirection: 'row',
  },
  headerBox:{
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  iconBox:{
    margin: 5,
  },
  header2:{
    height: '6%',
    borderWidth: 1,
    flexDirection: 'row',
  },
  main:{
    height: '78%',
    borderWidth: 1,
  },
  mainBox:{
    height: 55,
    borderWidth: 1,
    marginBottom: 10,
    justifyContent: 'center',
    paddingLeft: 10,
  },

  footer:{
    height: '10%',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 7,
  },
  footerBox:{
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  }
})

const Navigation = () => {

  const DATA = [
    {
      id: '1',
      title: '산모용품',
    },
    {
      id: '2',
      title: '수유용품',
    },
    {
      id: '3',
      title: '위생용품',
    },
    {
      id: '4',
      title: '목욕용품',
    },
    {
      id: '5',
      title: '침구류'
    },
    {
      id: '6',
      title: '아기의류'
    },
    {
      id: '7',
      title: '의출용품'
    },
    {
      id: '8',
      title: '가전용품'
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.mainBox}>
        <Text>{item.title}</Text>
    </View>
  ); 

  return (
    <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerBox}>
            <Text>출산준비물 리스트</Text>
          </View>
          <View style={[styles.headerBox, {justifyContent: 'flex-end'}]}>
            <View style={styles.iconBox}><Icon3 name='refresh-cw' size={22}/></View>
            <View style={styles.iconBox}><Icon2 name='download' size={22}/></View>
            <View style={styles.iconBox}><Icon2 name='search1' size={22}/></View>
            <View style={styles.iconBox}><Icon name='bell-o' size={22}/></View>
            <View style={styles.iconBox}><Icon name='user-o' size={22}/></View>
          </View>
        </View>
        <View style={styles.header2}>
          <View style={styles.headerBox}>
            <Text>전체 (5/37)</Text>
          </View>
          <View style={[styles.headerBox, {justifyContent: 'flex-end'}]}>
            <View style={[styles.iconBox, {marginRight: 10}]}><Icon name='filter' size={22} /></View>
            <View style={[styles.iconBox, {marginRight: 10}]}><Icon name='ellipsis-v' size={22} style={{marginLeft: 10}}/></View>
          </View>
        </View>
        <View style={styles.main}>
          <FlatList data={DATA} renderItem={renderItem}
              keyExtractor={item => item.id}>
          </FlatList>
        </View>
        <View style={styles.footer}>
          <View style={[styles.footerBox, {width: '20%', backgroundColor: 'black'}]}>
            <Text style={{color: 'white'}}>자세히</Text>
          </View>
          <View style={[styles.footerBox, {width: '20%'}]}><Text>총예산</Text></View>
          <View style={[styles.footerBox, {width: '60%'}]}><Text>브랜드 선택시 예산이 표기됩니다.</Text></View>
        </View>
    </View>
  )
}

export default Navigation