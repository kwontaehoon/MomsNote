import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const styles = StyleSheet.create({
container:{
    height: 500,
    backgroundColor: '#F5F5F5',
    padding: 20,
},
})


const Talk1 = ({navigation}: any) => {

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: '전체'
    }
  ];

  const renderItem = ({ item }) => (
    <View style={styles.container2}></View>
  ); 

  return (
    <View style={styles.container}>
        <FlatList data={DATA} renderItem={renderItem}
            keyExtractor={item => item.id} showsHorizontalScrollIndicator={true}>
        </FlatList>
    </View>
  )
}

export default Talk1