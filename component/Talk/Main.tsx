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
        padding: 10,
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
        height: '8%',
        flexDirection: 'row',
    },
    header2Box:{
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#ddd'
    },
})
const Main = () => {

    const [filter, setFilter] = useState([true, false, false]);
    console.log('filter: ', filter);


    const List = ():any => {
        switch(true){
            case filter[0] === true: return <Talk1/>
            case filter[1] === true: return <Talk2/>
            case filter[2] === true: return <Talk3/>
        }
    }
    const filter_func = (e) => {
        let arr = [false, false, false];
        arr[e] = true;
        setFilter(arr);
    }

  return (
    <View style={styles.container}>
        <View style={styles.header}>
        <View style={styles.headerBox}>
            <Icon2 name='search1' size={22} style={styles.headerIcon}/>
            <Icon name='bell-o' size={22} style={styles.headerIcon}/>
            <Icon name='user-o' size={22} style={styles.headerIcon}/>
        </View><Text style={{fontSize: 23, fontWeight: 'bold'}}>맘스 톡</Text></View>
        <View style={styles.header2}>
            <TouchableOpacity style={[styles.header2Box, {width: '25%', borderBottomColor: filter[0] ? 'orange' : 'lightgrey'}]} onPress={()=>filter_func(0)}>
                <Text style={{fontWeight: 'bold', color: filter[0] ? 'orange' : 'lightgrey'}}>맘스토크</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.header2Box, {width: '50%', borderBottomColor: filter[1] ? 'orange' : 'lightgrey'}]} onPress={()=>filter_func(1)}>
                <Text style={{fontWeight: 'bold', color: filter[1] ? 'orange' : 'lightgrey'}}>출산리스트공유</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.header2Box, {width: '25%', borderBottomColor: filter[2] ? 'orange' : 'lightgrey'}]} onPress={()=>filter_func(2)}>
                <Text style={{fontWeight: 'bold', color: filter[2] ? 'orange' : 'lightgrey'}}>체험단</Text>
            </TouchableOpacity>
        </View>
        <List />
    </View>
  )
}

export default Main