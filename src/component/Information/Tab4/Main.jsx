import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ImageBackground } from 'react-native'
import axios from 'axios'

import Q from '../../../../public/assets/svg/Q.svg'
import A from '../../../../public/assets/svg/A.svg'
import { useSelector, useDispatch } from 'react-redux'
import { postQna } from '../../../Redux/Slices/QnaSlice'

const styles = StyleSheet.create({
    container:{
        height: '91%',
        backgroundColor: 'white',
    },
  })


const Talk1 = ({navigation}) => {

    const DATA = [
        {
            id: '0',
            title: '전체'
        },
    ];

    const dispatch = useDispatch();
    const qna = useSelector(state => { return state.qna.data; });
    console.log('qna: ', qna);
    const [info, setInfo] = useState();
    console.log('info: ', info);
    const [filter, setFilter] = useState(); // 서브 카테고리
    console.log('filter: ', filter);

    useEffect(()=>{
        dispatch(postQna({category: '전체'}));
    }, []);

    useEffect(()=>{
        const newArray = qna.reduce(function(acc, current) {
            if (acc.findIndex(({ category }) => category === current.category) === -1) {
              acc.push(current);
            }
            return acc;
          }, []);
          setInfo(newArray);
          const arr = Array.from({length: info?.length}, () => { return false; });
          arr[0] = true;
          setFilter(arr);
    }, [qna]);


    const renderItem = ({ item }) => (
        <View></View>
    );

    const renderItem2 = ({ item }) => (
        <View style={styles.headerBox}>
            <View style={[styles.headerFilterBox, {backgroundColor: filter[item.id] ? '#FEA100' : 'white'}]}>
                <TouchableOpacity onPress={()=>change(item.id)}><Text style={{color: filter[item.id] ? 'white' : 'black', fontWeight: '400'}}>{item.title}</Text></TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <FlatList data={info} renderItem={renderItem2}
                    keyExtractor={item => item.id} horizontal={true} showsHorizontalScrollIndicator={false}>
                </FlatList>
            </View>
            <View style={styles.main}>
                <FlatList data={DATA} renderItem={renderItem}
                    keyExtractor={item => String(item.qnaId)}>
                </FlatList>
            </View>
        </View>
    )
 }

export default Talk1