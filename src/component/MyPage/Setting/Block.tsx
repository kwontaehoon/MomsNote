import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import Icon from 'react-native-vector-icons/FontAwesome'

const styles = StyleSheet.create({
    container:{
        height: '92%',
        borderTopWidth: 1,
        borderColor: '#EEEEEE',
        backgroundColor: 'white'
    },
    container2:{

    },
    main:{
        height: 100,
        flexDirection: 'row',
        padding: 15,
        borderBottomWidth: 1,
        borderColor: '#EEEEEE',
    },
    mainBox:{
        width: '50%',
        
        flexDirection: 'row',
        alignItems: 'center',
    },
    circleBox:{
        borderWidth: 1,
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 12,
    },
    clickBox:{
        borderWidth: 1,
        width: 80,
        height: 35,
        borderRadius: 5,
    },
})
const Block = () => {


const DATA = [
    {
        id: '1',
        title: '별똥이맘'
    },
    {
        id: '2',
        title: '아이덴잇'
    },
    {
        id: '3',
        title: '맘스노트'
    },
];
const renderItem = ({ item }) => (
    <View style={styles.main}>
        <View style={styles.mainBox}>
            <View style={styles.circleBox}></View>
            <Text>{item.title}</Text>
        </View>
        <View style={[styles.mainBox, {justifyContent: 'flex-end'}]}>
            <View style={styles.clickBox}>

            </View>
        </View>
    </View>
  );

  return (
    <View style={styles.container}>
        <FlatList data={DATA} renderItem={renderItem}
            keyExtractor={item => item.id} showsVerticalScrollIndicator={false}>
        </FlatList>
    </View>
  )
}

export default Block