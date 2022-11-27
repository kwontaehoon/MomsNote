import React from 'react'
import { getStatusBarHeight } from "react-native-status-bar-height"
import { View, Text, StyleSheet, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

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
    margin: 3,
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
  },

  footer:{
    height: '10%',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
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
      title: 'First Item',
    },
    {
      id: '2',
      title: 'Second Item',
    },
    {
      id: '3',
      title: 'Third Item',
    },
    {
      id: '4',
    },
    {
      id: '5',
    },
    {
      id: '6',
    },
    {
      id: '7',
    },
    {
      id: '8',
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.mainBox}>
        
    </View>
  ); 

  return (
    <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerBox}>
            <Text>출산준비물 리스트</Text>
          </View>
          <View style={[styles.headerBox, {justifyContent: 'flex-end'}]}>
            <View style={styles.iconBox}><Icon name='bell-o' size={25}/></View>
            <View style={styles.iconBox}><Icon name='bell-o' size={25}/></View>
            <View style={styles.iconBox}><Icon name='bell-o' size={25}/></View>
            <View style={styles.iconBox}><Icon name='bell-o' size={25}/></View>
            <View style={styles.iconBox}><Icon name='bell-o' size={25}/></View>
          </View>
        </View>
        <View style={styles.header2}>
          <View style={styles.headerBox}>
            <Text>전체 (5/37)</Text>
          </View>
          <View style={[styles.headerBox, {justifyContent: 'flex-end'}]}>
            <View style={styles.iconBox}><Icon name='bell-o' size={25} /></View>
            <View style={styles.iconBox}><Icon name='bell-o' size={25} style={{marginLeft: 10}}/></View>
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