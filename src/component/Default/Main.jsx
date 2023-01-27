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

    const test = {
        username: `google_110233651458722193443`,
        nickname: '태훈구글',
        email: 'gju04195@gmail.com',
        dueDate: '2023-08-10',
        babyName: '애기',
        providerId: '110233651458722193443',
        provider: 'google',
        marketingFlag: 0,
    }

    useEffect(()=>{
        const login = async() => {
            // AsyncStorage.removeItem('userId');
            // AsyncStorage.setItem('userId', '45');
            // AsyncStorage.setItem('user', JSON.stringify(test));
            // AsyncStorage.removeItem('login');
            // AsyncStorage.setItem('login', '2');

           
            // AsyncStorage.clear()
           
            
            const asyncStorage = await AsyncStorage.getItem('login');
            setInfo(asyncStorage);
        }
        login();

    }, [isFocused]);

    switch(info){
        case null : return(<Start navigation={navigation}/>);
        case '1': return(<Login navigation={navigation} />);
        default: return(<Home />);
    }
}

export default Main