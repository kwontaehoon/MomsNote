import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native'

const styles = StyleSheet.create({
  container:{
    backgroundColor: 'white',
    height: '100%',
  },
  main:{
    height: 110,
    borderWidth: 1,
    justifyContent: 'center',

  }
})
const Main = () => {

  const DATA = [{id: '0',}];

  const [info, setInfo] = useState([]);

  const renderItem = ({ item }) => (
      <View style={styles.main}>
        <Text style={{fontSize: 15, fontWeight: '500', marginBottom: 5}}>gg</Text>
        <Text style={{color: '#9E9E9E', fontSize: 12}}>22.11.11</Text>
      </View>
  );

  return (
    <View style={styles.container}>
      {info.length !== 0 ? <FlatList data={DATA} renderItem={renderItem}
          keyExtractor={item => item.id} showsVerticalScrollIndicator={false}>
      </FlatList> : <View style={{alignItems: 'center', justifyContent: 'center', height: '80%'}}>
        <Image source={require('../../../public/assets/image/rainbow.png')}/>
        <Text style={{fontSize: 16, color: '#757575', marginTop: 24}}>아직 받은 알림이 없습니다.</Text>
        </View>}
    </View>
  )
}

export default Main