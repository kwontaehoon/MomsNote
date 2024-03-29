import React, { useState } from 'react'
import { getStatusBarHeight } from "react-native-status-bar-height"; 
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/AntDesign'
import Tab1 from './Tab1/Main'
import Tab2 from './Tab2/Main'
import Tab3 from './Tab3/Main'

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
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 2,
    },
    footer:{
        width: 60,
        height: 60,
        position: 'absolute',
        bottom: 20,
        right: 20,
        borderRadius: 999,
        backgroundColor: '#FEA100',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        elevation: 5,
    },
})
const Main = ({navigation}:any) => {

    const [filter, setFilter] = useState([true, false, false]);

    const List = ():any => {
        switch(true){
            case filter[0] === true: return <Tab1 navigation={navigation}/>
            case filter[1] === true: return <Tab2 navigation={navigation}/>
            case filter[2] === true: return <Tab3 navigation={navigation}/>
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
            <TouchableOpacity style={[styles.headerBox, {width: '25%', borderBottomColor: filter[0] ? 'orange' : '#EEEEEE'}]} onPress={()=>filter_func(0)}>
                <Text style={{fontWeight: 'bold', fontSize: 18, color: filter[0] ? 'orange' : '#BDBDBD'}}>맘스 토크</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.headerBox, {width: '50%', borderBottomColor: filter[1] ? 'orange' : '#EEEEEE'}]} onPress={()=>filter_func(1)}>
                <Text style={{fontWeight: 'bold', fontSize: 18, color: filter[1] ? 'orange' : '#BDBDBD'}}>출산리스트공유</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.headerBox, {width: '25%', borderBottomColor: filter[2] ? 'orange' : '#EEEEEE'}]} onPress={()=>filter_func(2)}>
                <Text style={{fontWeight: 'bold', fontSize: 18, color: filter[2] ? 'orange' : '#BDBDBD'}}>체험단</Text>
            </TouchableOpacity>
        </View>
        <List />
    </View>
  )
}

export default Main