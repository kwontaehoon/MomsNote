import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ImageBackground } from 'react-native'
import axios from 'axios'

import Q from '../../../../public/assets/svg/Q.svg'
import A from '../../../../public/assets/svg/A.svg'

const styles = StyleSheet.create({
    container:{
        height: '91%',
        backgroundColor: 'white',
    },
    container2:{

    },
    header:{
        height: '15%',
    },
    headerBox:{
        justifyContent: 'center',
    },
    headerFilterBox:{
        height: 40,
        borderWidth: 1,
        borderColor: '#EEEEEE',
        margin: 5,
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
        height: '85%',
    },
    mainBox:{
        marginTop: 10
    },
    titleBox:{
        justifyContent: 'center',
        backgroundColor: '#FAFAFA',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15
    },
    contentBox:{
        flexDirection: 'row',
        paddingTop: 25,
        paddingBottom: 25,
        borderBottomWidth: 1,
        padding: 15,
        borderColor: '#F5F5F5',
    },
  })


const Talk1 = ({navigation}) => {

    const DATA = [
        {
            id: '0',
            title: '전체'
        },
    ];

  const DATA2 = [
    {
        id: '0',
        title: '전체'
    },
    {
        id: '1',
        title: '임신상담'
    },
    {
        id: '2',
        title: '출산상담'
    },
  ];

    const [filter, setFilter] = useState([true, false, false]); // 서브 카테고리

    const [info, setInfo] = useState([]);
    const [info2, setInfo2] = useState([]);

    const [infoDisplay, setInfoDisplay] = useState([]);
    const [info2Display, setInfo2Display] = useState([]);

    useEffect(()=>{
        const Pregnant = async() => {
          const response = await axios({
            method: 'post',
            url: 'https://momsnote.net/api/qna/list',
            data : {
              category: "임신상담",
          }
        });
        setInfo(response.data);
        setInfoDisplay(Array.from({length: response.data.length}, () => {return false}));
        }
        Pregnant();
      }, []);

    useEffect(()=>{
        const Pregnant2 = async() => {
          const response = await axios({
            method: 'post',
            url: 'https://momsnote.net/api/qna/list',
            data : {
              category: "출산상담",
          }
        });
        setInfo2(response.data);
        setInfo2Display(Array.from({length: response.data.length}, () => {return false}));
        }
        Pregnant2();
    }, []);

    const change = (e) => { // 카테고리 배경색상, 글자 색상 변경
        let arr = Array.from({length: 3}, () => {return false});
        arr[e] = !arr[e];
        setFilter(arr);
    }

    const answer = (category, index) => {
        let arr = [];
        if(category === '임신상담'){
            arr = [...infoDisplay];
            arr[index] = !arr[index];
            setInfoDisplay(arr);
        }else{
            arr = [...info2Display];
            arr[index] = !arr[index];
            setInfo2Display(arr);
        }
    }

    const List = () => { // 임신상담 필터링
        const pregnantComfirm = [];
        info.filter((x, index) => {
            if(x.category === '임신상담'){
                pregnantComfirm.push(
                    <>
                    <TouchableOpacity style={styles.contentBox} onPress={()=>answer(x.category, index)}>
                        <View style={{marginRight: 10}}>{infoDisplay[index] ? <Q fill={'#424242'}/> : <Q fill={'#BDBDBD'} />}</View>
                        <Text>{x.qnaQ}</Text>
                    </TouchableOpacity>
                    <View style={[styles.contentBox, {backgroundColor: '#F5F5F5', display: infoDisplay[index] ? 'flex' : 'none'}]}>
                        <View style={{marginRight: 10}}><A /></View>
                        <Text style={{width: '92%', lineHeight: 20}}>{x.qnaA}</Text>
                    </View>
                    </>
                )
            }
        })
        return pregnantComfirm;
    }

    const List2 = () => { // 출산상담 필터링
        const pregnantComfirm = [];
        info2.filter((x, index) => {
            if(x.category === '출산상담'){
                pregnantComfirm.push(
                    <>
                    <TouchableOpacity style={styles.contentBox} onPress={()=>answer(x.category, index)}>
                        <View style={{marginRight: 10}}>{info2Display[index] ? <Q fill={'#424242'} /> : <Q fill={'#BDBDBD'} />}</View>
                        <Text>{x.qnaQ}</Text>
                    </TouchableOpacity>
                    <View style={[styles.contentBox, {backgroundColor: '#F5F5F5', display: info2Display[index] ? 'flex' : 'none'}]}>
                        <View style={{marginRight: 10}}><A /></View>
                        <Text style={{width: '92%', lineHeight: 20}}>{x.qnaA}</Text>
                    </View>
                    </>
                )
            }
        })
        return pregnantComfirm;
    }

    const renderItem = ({ item }) => (
        <View style={styles.mainBox}>
            <View style={{display: filter[2] ? 'none' : 'flex'}}>
                <View style={styles.titleBox}><Text style={{fontSize: 16,  fontWeight: '700'}}>임신상담({info.length})</Text></View>
                <List />
            </View>
            <View style={{display: filter[1] ? 'none' : 'flex'}}>
                <View style={styles.titleBox}><Text style={{fontSize: 16,  fontWeight: '700'}}>출산상담({info2.length})</Text></View>
                <List2 />
            </View>
        </View>
    );

    const renderItem2 = ({ item }) => (
        <View style={styles.headerBox}>
            <View style={[styles.headerFilterBox, {backgroundColor: filter[item.id] ? '#FEA100' : 'white'}]}>
                <TouchableOpacity onPress={()=>change(item.id)}><Text style={{color: filter[item.id] ? 'white' : 'black', fontWeight: '400'}}>{item.title}</Text></TouchableOpacity>
            </View>
        </View>
    );

    return info !== undefined && info2 !== undefined ? (
        <View style={styles.container}>
            <View style={styles.header}>
                <FlatList data={DATA2} renderItem={renderItem2}
                    keyExtractor={item => item.id} horizontal={true} showsHorizontalScrollIndicator={false}>
                </FlatList>
            </View>
            <View style={styles.main}>
                <FlatList data={DATA} renderItem={renderItem}
                    keyExtractor={item => String(item.qnaId)}>
                </FlatList>
            </View>
        </View>
    ) : <View></View>
    }

export default Talk1