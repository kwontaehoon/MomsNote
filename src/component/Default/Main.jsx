import React, { useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import Start from '../Default/Start'
import Login from '../Default/Login'
import Home from '../Navigation/SubMain'

const Main = () => {

    const arr = 3;

    switch(arr){
        case 1: return(<Start />);
        case 2: return(<Login />);
        case 3: return(<Home />);
    }
}

export default Main