import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, Dimensions, StatusBar } from 'react-native'
import axios from 'axios'

import Q from '../../../../public/assets/svg/Q.svg'
import A from '../../../../public/assets/svg/A.svg'
import { useSelector, useDispatch } from 'react-redux'
import { postQna, setQnaRefresh } from '../../../Redux/Slices/QnaSlice'

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height - 175,
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
        marginBottom: 100
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


const Talk1 = ({ navigation }) => {

    const DATA = [
        {
            id: '0',
            title: '전체'
        },
    ];

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    console.log('loading: ', loading);
    const qna = useSelector(state => { return state.qna.data; });
    console.log('qnaaaaa: ', qna);
    const qnaSet = useSelector(state => { return state.qna.refresh; });
    console.log('qna set: ', qnaSet);

    const [categories, setCategories] = useState([]);
    console.log('categories: ', categories);

    const [plus, setPlus] = useState({
        newInfo: [],
        page: 1,
        category: '전체'
    });
    console.log('plus: ', plus);
    const [filter, setFilter] = useState(); // 서브 카테고리
    console.log('filter: ', filter);
    const [qnaFilter, setQnaFilter] = useState(Array.from({ length: qna?.length }, () => { return false }));

    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        dispatch(postQna(qnaSet));
    }, [loading, qnaSet]);


    useEffect(() => {
        if (qna?.length !== 0) {
            setPlus({ ...plus, newInfo: qna });
        }
    }, [qna]);

    useEffect(() => {
        const category = async () => {
            try {
                const response = await axios({
                    method: 'get',
                    url: 'https://momsnote.net/api/qna/category',

                });
                console.log('response: ', response.data);
                setCategories(response.data);

            } catch (error) {
                console.log('qna categories axios error: ', error);
                return undefined;
            }
        }
        category();

        const arr = Array.from({ length: categories?.length }, () => { return false; });
        arr[0] = true;
        setFilter(arr);
    }, []);

    const change = (category, e) => { // 카테고리 배경색상, 글자 색상 변경 onpress
        console.log('category: ', category);
        let arr = Array.from({ length: categories?.length }, () => { return false });
        arr[e] = !arr[e];
        setFilter(arr);
        dispatch(setQnaRefresh({ category: category, page: 1 }));
    }

    const change2 = (e) => {
        let arr = qnaFilter;
        arr[e] = !arr[e];
        setQnaFilter([...arr]);
    }

    const onEnd = async () => {
        try {
            const response = await axios({
                method: 'post',
                url: 'https://momsnote.net/api/qna/list',
                data: {
                    category: categories[filter?.findIndex(x => x)],
                    page: plus.page +1
                }
            });
            const addInfo = [...plus?.newInfo, ...response?.data];
            setPlus({...plus, newInfo: addInfo, page: plus.page+1});

        } catch (error) {
            console.log('qna axios error: ', error);
            return undefined;
        }
    }

    const onRefreshing = async () => {
        if (!refreshing) {
            setRefreshing(true);
            await setRefreshing(false);
        }
    }

    const renderItem = ({ item }) => (
        plus?.newInfo?.map((x, index) => {
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

    const renderItem2 = ({ item, index }) => (
        <View style={{ justifyContent: 'center' }}>
            <TouchableOpacity style={[styles.headerFilterBox, { backgroundColor: filter[index] ? '#FEA100' : 'white' }]} onPress={() => change(item.name, index)}>
                <Text style={{ color: filter[index] ? 'white' : 'black', fontWeight: '400', fontSize: 14 }}>{item?.name}</Text>
            </TouchableOpacity>
        </View>
    );

    return plus == undefined || qna == '' ? <ActivityIndicator size={'large'} color='#E0E0E0' style={styles.container} />
        : (
            <View style={styles.container}>
                <View style={styles.header}>
                    <FlatList data={categories} renderItem={renderItem2}
                        keyExtractor={(item, index) => String(index)} horizontal={true} showsHorizontalScrollIndicator={false}>
                    </FlatList>
                </View>
                <View style={styles.main}>
                    {qna == 0 ||  plus.newInfo == 0 ?
                        <View style={{ marginTop: 150, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#757575' }}>등록된 게시물이 없습니다.</Text>
                        </View> :
                        <View>
                            <View style={styles.mainBox}>
                                <Text style={{ fontSize: 16, fontWeight: '700' }}>{categories[filter?.findIndex(x => x)]?.name}({plus?.newInfo?.length})</Text>
                            </View>
                            <FlatList data={DATA} renderItem={renderItem}
                                onRefresh={onRefreshing} refreshing={refreshing}
                                onEndReached={() => onEnd()}
                                showsVerticalScrollIndicator={false} ListFooterComponent={loading && <ActivityIndicator size={'large'} color='#E0E0E0' />}
                                keyExtractor={item => String(item.qnaId)}>
                            </FlatList>
                        </View>}
                </View>
            </View>
        )
}

export default Talk1