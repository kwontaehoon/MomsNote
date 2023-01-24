import React, { useState, useEffect } from 'react'
import { getStatusBarHeight } from "react-native-status-bar-height"; 
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, StatusBar } from 'react-native'
import Talk1 from './Tab1/Main'
import Talk2 from './Tab2/Main'

const styles = StyleSheet.create({
    container:{
        height: '100%',
        backgroundColor: 'white',
    },
    headerIcon:{
        margin: 5,
    },
    header:{
        height: 60,
        flexDirection: 'row',
    },
    headerBox:{
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 2,
    },
})
const Main = ({navigation}) => {
    
    const [filter, setFilter] = useState([true, false, false]); // tab

    const List = () => {

        switch(true){
            case filter[0] === true: return <Talk1 navigation={navigation} />
            case filter[1] === true: return <Talk2 navigation={navigation} />
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
            <TouchableOpacity style={[styles.headerBox, {borderBottomColor: filter[0] ? 'orange' : '#BDBDBD'}]} onPress={()=>filter_func(0)}>
                <Text style={{fontWeight: 'bold', fontSize: 18, color: filter[0] ? 'orange' : '#BDBDBD'}}>진행중인 체험단</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.headerBox, {borderBottomColor: filter[1] ? 'orange' : '#BDBDBD'}]} onPress={()=>filter_func(1)}>
                <Text style={{fontWeight: 'bold', fontSize: 18, color: filter[1] ? 'orange' : '#BDBDBD'}}>종료된 체험단</Text>
            </TouchableOpacity>
        </View>
        <List />
    </View>
  )
}

export default Main