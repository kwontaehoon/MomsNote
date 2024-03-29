import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Talk1 from './Tab1/Main'
import Talk2 from './Tab2/Main'
import Talk3 from './Tab3/Main'
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
        width: '33.4%'                                                
    },
})
const Main = ({navigation, route}) => {

    const isFocused = useIsFocused();

    useEffect(()=>{
        const arr = [false, true, false];
        route.params == '출산 리스트' ? setFilter(arr) : '';
    }, [isFocused]);
    
    const [filter, setFilter] = useState([true, false, false]); // tab

    const List = () => {

        switch(true){
            case filter[0] === true: return <Talk1 navigation={navigation} />
            case filter[1] === true: return <Talk2 navigation={navigation} />
            case filter[2] === true: return <Talk3 navigation={navigation} />
        }
    }

    const filter_func = async(e) => {
        let arr = [false, false, false];
        arr[e] = true;
        setFilter(arr);
        AsyncStorage.setItem('momsTalk_filter', '최신 순');
        AsyncStorage.setItem('materialList_filter', '최신 순');
        AsyncStorage.setItem('event_filter', '최신 순');
        AsyncStorage.setItem('momsTalkTab', '전체');
    }

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity style={[styles.headerBox, {borderBottomColor: filter[0] ? 'orange' : '#EEEEEE'}]} onPress={()=>filter_func(0)}>
                <Text style={{fontWeight: 'bold', fontSize: 16, color: filter[0] ? 'orange' : '#BDBDBD'}}>맘스 토크</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.headerBox, {borderBottomColor: filter[1] ? 'orange' : '#EEEEEE'}]} onPress={()=>filter_func(1)}>
                <Text style={{fontWeight: 'bold', fontSize: 16, color: filter[1] ? 'orange' : '#BDBDBD'}}>출산리스트 공유</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.headerBox, {borderBottomColor: filter[2] ? 'orange' : '#EEEEEE'}]} onPress={()=>filter_func(2)}>
                <Text style={{fontWeight: 'bold', fontSize: 16, color: filter[2] ? 'orange' : '#BDBDBD'}}>체험단</Text>
            </TouchableOpacity>
        </View>
        <List />
    </View>
  )
}

export default Main