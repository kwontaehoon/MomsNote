import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import Start from '../Default/Start'
import Login from '../Default/Login'
import Home from '../Navigation/SubMain'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useIsFocused } from '@react-navigation/native'

const Main = ({navigation}) => {

    const isFocused = useIsFocused();
    const [info, setInfo] = useState();

    useEffect(()=>{
        const login = async() => {
            AsyncStorage.setItem('login', '1');

            const asyncStorage = await AsyncStorage.getItem('login');
            console.log('asyncStorage: ', asyncStorage);
            setInfo(asyncStorage);
        }
        login();

    }, [isFocused]);

    switch(info){
        case '0': return(<Login navigation={navigation} />);
        case '1': return(<Home />);
        default: return(<Start />);
    }
}

export default Main