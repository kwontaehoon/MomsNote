import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, Dimensions, StatusBar } from 'react-native'
import axios from 'axios'

import Q from '../../../../public/assets/svg/Q.svg'
import A from '../../../../public/assets/svg/A.svg'
import { useSelector, useDispatch } from 'react-redux'
import { postQna, setQnaRefresh } from '../../../Redux/Slices/QnaSlice'

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: 'white',
    },
    rainboxBox:{
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      },
    header: {
        height: 100,
    },
    headerFilterBox: {
        height: 40,
        borderWidth: 1,
        borderColor: '#EEEEEE',
        margin: 7,
        borderRadius: 20,
        paddingTop: 8,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    main: {
    },
    mainBox: {
        padding: 15,
        justifyContent: 'center',
        backgroundColor: '#F5F5F5'
    },
    mainBox2: {
        borderBottomWidth: 1,
        borderColor: '#F5F5F5',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 15,
        paddingTop: 25,
        paddingBottom: 25
    },
})


const Talk1 = ({ navigation, route }) => {

    const DATA = [
        {
            id: '0',
            title: '전체'
        },
    ];

    const [loading, setLoading] = useState(false);
    const qna = useSelector(state => { return state.qna.data; });
    const [info, setInfo] = useState(route.params);
    const [qnaFilter, setQnaFilter] = useState(Array.from({ length: qna?.length }, () => { return false }));

    const [refreshing, setRefreshing] = useState(false);

    const change2 = (e) => {
        let arr = qnaFilter;
        arr[e] = !arr[e];
        setQnaFilter([...arr]);
    }

    const onRefreshing = async () => {
        if (!refreshing) {
            setRefreshing(true);
            await setRefreshing(false);
        }
    }

    const renderItem = ({ item }) => (
        info?.map((x, index) => {
            return (
                    <View key={index}>
                        <TouchableOpacity style={styles.mainBox2} onPress={() => change2(index)}>
                            {qnaFilter[index] ? <Q fill='black' /> : <Q fill='#BDBDBD' />}
                            <Text style={{ paddingLeft: 10 }} numberOfLines={1}>{x.qnaQ}</Text>
                        </TouchableOpacity>
                        <View style={[styles.mainBox2, { padding: 15, display: qnaFilter[index] ? 'flex' : 'none' }]}>
                            <Text>{x.qnaA}</Text>
                        </View>
                    </View>
            )
        })
    );

    return info.length == 0 ?
        <View style={styles.rainboxBox}>
            <Image source={require('../../../../public/assets/image/rainbow2.png')} />
        </View> : (
        <View style={styles.container}>
            <View style={styles.main}>
                <FlatList data={DATA} renderItem={renderItem}
                    onRefresh={onRefreshing} refreshing={refreshing}
                    showsVerticalScrollIndicator={false} ListFooterComponent={loading && <ActivityIndicator size={'large'} color='#E0E0E0' />}
                    keyExtractor={item => String(item.qnaId)}>
                </FlatList>
            </View>
        </View>
    )
}

export default Talk1