import React, { useState, useEffect } from 'react'
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
            AsyncStorage.removeItem('login');
            // AsyncStorage.clear();
            const asyncStorage = await AsyncStorage.getItem('login');
            // AsyncStorage.setItem('momsInfo', '전체');
            // AsyncStorage.setItem('momsTalkTab', '전체');
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