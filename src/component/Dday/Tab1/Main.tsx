import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const styles = StyleSheet.create({
  container:{
    height: 500,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  main:{
    height: 90,
    flexDirection: 'row',
    backgroundColor: 'white',
    marginBottom: 20,
    shadowColor: "#000",
    elevation: 3,
  },
  mainBox:{
    width: '23%',
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainBox2:{
    width: '77%',
    justifyContent: 'center',
  }
})


const Talk1 = ({navigation}: any) => {

    const DATA = [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: '전체'
        }
    ];
    
    const renderItem = ({ item }) => (
        <View style={styles.container2}>
            <View style={styles.main}>
                <View style={styles.mainBox}><Text>사진</Text></View>
                <View style={styles.mainBox2}><Text style={{fontSize: 15}}>10주차 0일</Text></View>
            </View>
            <View style={styles.main}>
                <View style={styles.mainBox}><Text>사진</Text></View>
                <View style={styles.mainBox2}><Text style={{fontSize: 15}}>10주차 0일</Text></View>
            </View>
            <View style={styles.main}>
                <View style={styles.mainBox}><Text>사진</Text></View>
                <View style={styles.mainBox2}><Text style={{fontSize: 15}}>10주차 0일</Text></View>
            </View>
            <View style={styles.main}>
                <View style={styles.mainBox}><Text>사진</Text></View>
                <View style={styles.mainBox2}><Text style={{fontSize: 15}}>10주차 0일</Text></View>
            </View>
            <View style={styles.main}>
                <View style={styles.mainBox}><Text>사진</Text></View>
                <View style={styles.mainBox2}><Text style={{fontSize: 15}}>10주차 0일</Text></View>
            </View>
            <View style={styles.main}>
                <View style={styles.mainBox}><Text>사진</Text></View>
                <View style={styles.mainBox2}><Text style={{fontSize: 15}}>10주차 0일</Text></View>
            </View>
            <View style={styles.main}>
                <View style={styles.mainBox}><Text>사진</Text></View>
                <View style={styles.mainBox2}><Text style={{fontSize: 15}}>10주차 0일</Text></View>
            </View>
        </View>
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