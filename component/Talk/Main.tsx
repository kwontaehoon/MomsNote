import React, { useState } from 'react'
import { getStatusBarHeight } from "react-native-status-bar-height"; 
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/AntDesign'
import Talk1 from './Talk1'
import Talk2 from './Talk2'
import Talk3 from './Talk3'

const styles = StyleSheet.create({
    container:{
        marginTop: getStatusBarHeight(),
        borderWidth: 2,
        height: '89%',
    },
    header:{
        height: '10%',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    headerBox:{
        position: 'absolute',
        right: 0,
        height: '100%',
        width: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
    },
    headerIcon:{
        margin: 5,
    },
    header2:{
        borderWidth: 1,
        height: '8%',
        flexDirection: 'row',
    },
    header2Box:{
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
const Main = () => {

    const [filter, setFilter] = useState(0);
    console.log('filter: ', filter);


    const List = ():any => {
        switch(filter){
            case 0: return <Talk1/>
            case 1: return <Talk2/>
            case 2: return <Talk3/>
        }
    }

  return (
    <View style={styles.container}>
        <View style={styles.header}>
        <View style={styles.headerBox}>
            <Icon2 name='search1' size={22} style={styles.headerIcon}/>
            <Icon name='bell-o' size={22} style={styles.headerIcon}/>
            <Icon name='user-o' size={22} style={styles.headerIcon}/>
        </View><Text>맘스 톡</Text></View>
        <View style={styles.header2}>
            <TouchableOpacity style={[styles.header2Box, {width: '25%'}]} onPress={()=>setFilter(0)}><Text>맘스토크</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.header2Box, {width: '50%'}]} onPress={()=>setFilter(1)}><Text>출산리스트공유</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.header2Box, {width: '25%'}]} onPress={()=>setFilter(2)}><Text>체험단</Text></TouchableOpacity>
        </View>
        <List />
    </View>
  )
}

export default Main