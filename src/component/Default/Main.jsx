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
        nickname: 'test닉',
        email: 'test@test.com',
        dueDate: '2023-05-13',
        babyName: '테스트애기',
        provider: 'google',
        providerId: undefined,
        marketingFlag: 0,
        profileImage: 'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540gju04195%252FProject1Type/ImagePicker/6e1beb2a-4143-4ac9-bf23-8af13fe6dc8e.jpeg',
        memberName: '권신청',
        userId: 16
    }

    useEffect(()=>{
        const login = async() => {
            AsyncStorage.removeItem('login');
            // AsyncStorage.clear()
            // AsyncStorage.setItem('login', '2');
            // AsyncStorage.setItem('user', JSON.stringify(test));
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