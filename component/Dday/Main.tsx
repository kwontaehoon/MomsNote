import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/AntDesign'

const styles = StyleSheet.create({
  container:{
    marginTop: getStatusBarHeight(),
    borderWidth: 1,
    height: '89%',
  },
  header:{
    borderWidth: 1,
    height: '10%',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
  },
  headerBox:{
    position: 'absolute',
    right: 0,
    flexDirection: 'row'
  },
  iconBox:{
    margin: 5,
  },
  header2:{
    borderWidth: 1,
    flexDirection: 'row',
    height: '8%',
  },
  header2Box:{
    width: '50%',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header3:{
    borderWidth: 1,
    height: '6%',
  },
  header4:{
    borderWidth: 1,
    height: '6%',
  },
  main:{
    hegiht: '70%',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
const Navigation = () => {
  return (
    <View style={styles.container}>
        <View style={styles.header}>
          <Text>맘스 정보</Text>
          <View style={styles.headerBox}>
                <View style={styles.iconBox}><Icon2 name='search1' size={22}/></View>
                <View style={styles.iconBox}><Icon name='bell-o' size={22}/></View>
                <View style={styles.iconBox}><Icon name='user-o' size={22}/></View>
          </View>
        </View>
        <View style={styles.header2}>
          <View style={styles.header2Box}>
            <Text>오늘의 편지</Text>
          </View>
          <View style={styles.header2Box}>
            <Text>이 시기에는?</Text>
          </View>
        </View>
          <View style={styles.header3}></View>
          <View style={styles.header4}></View>
          <View style={styles.main}>
            <Text>등록된 게시물이 없습니다.</Text>
          </View>
    </View>
  )
}

export default Navigation