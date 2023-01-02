import React, { useState, useEffect } from "react"
import {View, Text, StyleSheet, Button, TouchableOpacity} from 'react-native'

import { useSelector, useDispatch } from 'react-redux'
import { getBoard } from '../../Redux/Slices/BoardSlice'

const styles = StyleSheet.create({
    buttonBox:{
        width: 100,
        height: 100,
        backgroundColor: 'orange',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

const ReduxTest = ({navigation}) => {

    const count = useSelector(state => { return state.board.data; });
    console.log('count: ', count);
    const dispatch = useDispatch();
    
    useEffect(()=>{
        console.log('Redux Test useEffect');
        dispatch(getBoard());
    }, []);

    const List = () => {
        console.log('List입니다.');
    }

  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.buttonBox} onPress={()=>navigation.navigate('리덕스 테스트2')}>
            <Text>다음으로 이동</Text>
            <List />
        </TouchableOpacity>
    </View>
  )
}

export default ReduxTest