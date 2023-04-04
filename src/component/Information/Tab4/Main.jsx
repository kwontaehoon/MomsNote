import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, Dimensions, StatusBar } from 'react-native'
import axios from 'axios'

import Q from '../../../../public/assets/svg/Q.svg'
import A from '../../../../public/assets/svg/A.svg'
import { useSelector, useDispatch } from 'react-redux'
import { postQna, setQnaRefresh } from '../../../Redux/Slices/QnaSlice'

const styles = StyleSheet.create({
    container:{
        height: Dimensions.get('window').height -175,
        backgroundColor: 'white',
    },
    header:{
        height: 100,
      },
    headerFilterBox:{
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
    main:{

    },
    mainBox:{
        padding: 15,
        justifyContent: 'center',
        backgroundColor: '#F5F5F5'
    },
    mainBox2:{
        borderBottomWidth: 1,
        borderColor: '#F5F5F5',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 15,
        paddingTop: 25,
        paddingBottom: 25
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
    const [loading, setLoading] = useState(false);
    const qna = useSelector(state => { return state.qna.data; });
    const qnaSet = useSelector(state => { return state.qna.refresh; });
    const [info, setInfo] = useState();
    const [info2, setInfo2] = useState();
    const [test, setTest] = useState();
    const [plus, setPlus] = useState();
    const [filter, setFilter] = useState(); // 서브 카테고리
    const [qnaFilter, setQnaFilter] = useState(Array.from({length: qna.length}, () => { return false }));

    useEffect(()=>{
        dispatch(postQna(qnaSet));
    }, [test, loading]);



    useEffect(()=>{
        const newArray = qna?.reduce(function(acc, current) {
            if (acc.findIndex(({ category }) => category === current.category) === -1) {
              acc.push(current);
            }
            return acc;
          }, []);
          setInfo2(newArray);
          setInfo([{category: '전체'}, ...newArray]);

            const arr = Array.from({length: info?.length}, () => { return false; });
            arr[0] = true;
            setFilter(arr);
          
        setPlus(qna);
    }, [qna]);

    const change = (category, e) => { // 카테고리 배경색상, 글자 색상 변경 onpress
        let arr = Array.from({length: info.length}, () => { return false });
        arr[e] = !arr[e];
        setFilter(arr);
        setTest(e);
        dispatch(setQnaRefresh({category: category, page: 1}));
    }

    const change2 = (e) => {
        let arr = qnaFilter;
        arr[e] = !arr[e];
        setQnaFilter([...arr]);
    }

    const onEnd = async() => {
        setLoading(true);

        try{
            const response = await axios({
                method: 'post',
                url: 'https://momsnote.net/api/qna/list',
                data : {
                    category: info[filter?.findIndex(x => x == true)].category,
                    page: 2
                }
            });
            console.log('response: ', response.data);
            const addInfo = [...plus, ...response.data];
            setPlus(addInfo);

            }catch(error){
                console.log('qna axios error: ', error);
                return undefined;
            }
    }

    const renderItem = ({ item }) => (
        info2?.map((x, index)=>{
            return (
                <View key={index}>
                    <View style={styles.mainBox}>
                        <Text style={{fontSize: 16, fontWeight: '700'}}>{x.category}({plus?.length})</Text>
                    </View>
                    {
                        plus?.map((x, index)=>{
                            return (
                                <View key={index}>
                                    <TouchableOpacity style={styles.mainBox2} onPress={()=>change2(index)}>
                                        {qnaFilter[index] ? <Q fill='black'/> : <Q fill='#BDBDBD' />}
                                        <Text style={{paddingLeft: 10}} numberOfLines={1}>{x.qnaQ}</Text>
                                    </TouchableOpacity>
                                    <View style={[styles.mainBox2, {padding: 15, display: qnaFilter[index] ? 'flex' : 'none'}]}>
                                        <Text>{x.qnaA}</Text>
                                    </View>
                                </View>
                            )
                        })
                    }
                </View>
            )
        })
    );

    const renderItem2 = ({ item, index }) => (
        <View style={{justifyContent: 'center'}}>
            <TouchableOpacity style={[styles.headerFilterBox, {backgroundColor: filter[index] ? '#FEA100' : 'white'}]} onPress={()=>change(item.category, index)}>
                <Text style={{color: filter[index] ? 'white' : 'black', fontWeight: '400', fontSize: 14}}>{item?.category}</Text>
            </TouchableOpacity>
        </View>
    );

    return plus == undefined || qna == '' ?  <ActivityIndicator size={'large'} color='#E0E0E0' style={styles.container}/>
    : (
        <View style={styles.container}>
            <View style={styles.header}>
                <FlatList data={info} renderItem={renderItem2}
                    keyExtractor={(item, index) => String(index)} horizontal={true} showsHorizontalScrollIndicator={false}>
                </FlatList>
            </View>
            <View style={styles.main}>
                <FlatList data={DATA} renderItem={renderItem}
                onEndReached={onEnd}
                showsVerticalScrollIndicator={false} ListFooterComponent={loading && <ActivityIndicator size={'large'} color='#E0E0E0'/>}
                    keyExtractor={item => String(item.qnaId)}>
                </FlatList>
            </View>
        </View>
    )
 }

export default Talk1