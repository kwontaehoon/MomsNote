import React, { useState, useEffect } from "react"
import {View, Text, StyleSheet, Button, TouchableOpacity} from 'react-native'

import { useSelector, useDispatch } from 'react-redux'
import { getBoard } from '../../Redux/Slices/BoardSlice'

const styles = StyleSheet.create({
    
})

const ReduxTest = ({navigation}) => {

    const dispatch = useDispatch();
    
    useEffect(()=>{
        console.log('Redux Test2 useEffect');
        dispatch(getBoard());
    }, []);

    const Click = () => {
        dispatch(getBoard());
    }

  return (
    <View style={styles.container}>
        <Button title='버튼입니다.' onPress={Click}></Button>
    </View>
  )
}

export default ReduxTest