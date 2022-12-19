import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ImageBackground } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'

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
        padding: 15,
    },
    mainBox:{
        marginTop: 10
    },
    titleBox:{
        justifyContent: 'center',
        backgroundColor: '#FAFAFA',
        paddingTop: 10,
        paddingBottom: 10,
    },
    contentBox:{
        flexDirection: 'row',
        paddingTop: 15,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderColor: '#F5F5F5'
    },
  })


const Talk1 = ({navigation}: any) => {

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

    const [filter, setFilter] = useState([true, false, false, false]);
    const [info, setInfo] = useState([
        {
            qnaId: '1',
            category: '임신상담',
            qnaQ: '여기는 질문 영역입니다.',
            qnaA: '여기는 답변 영역입니다.',
            qnaDate: '',
        },
        {
            qnaId: '2',
            category: '출산상담',
            qnaQ: '질문내역',
            qnaA: '',
            qnaDate: '',
        }, {
            qnaId: '3',
            category: '임신상담',
            qnaQ: '질문내역',
            qnaA: '답변내역',
            qnaDate: '',
        }, {
            qnaId: '4',
            category: '출산상담',
            qnaQ: '질문내역',
            qnaA: '답변내역',
            qnaDate: '',
        }, {
            qnaId: '5',
            category: '임신상담',
            qnaQ: '질문내역',
            qnaA: '답변내역',
            qnaDate: '',
        },
    ]);
    const [info2, setInfo2] = useState();
    console.log('info2: ', info2);
    const [info3, setInfo3] = useState();
    console.log('info3: ', info3);

    useEffect(()=>{
        async function b(){

            const arr = info.filter(x => x.category === '임신상담');
            console.log('arr: ', arr);
            const arr2 = info.filter(x => x.category === '출산상담');
            setInfo2(arr);
            setInfo3(arr2);

            const response = await axios.get('http://192.168.1.140:4000/api/test');
            console.log('response: ', response.data);
    
            
          }
          b();
    }, [])


    const change = (e) => { // 카테고리 배경색상, 글자 색상 변경
        let arr = Array.from({length: 4}, () => {return false});
        arr[e] = !arr[e];
        setFilter(arr);
    }

    const List = () => { // 임신상담 필터링
        let arr = [];
        
        info2.filter(x => {
            arr.push(
                <>
                    <View style={styles.contentBox}>
                        <View style={{padding: 5}}><Text></Text></View>
                        <View style={{justifyContent: 'center'}}><Text>{x.qnaQ}</Text></View>
                    </View>
                    <View style={[styles.contentBox, {backgroundColor: '#F5F5F5'}]}>
                        <View style={{padding: 5}}><Text>A</Text></View>
                        <View style={{justifyContent: 'center'}}><Text>{x.qnaA}</Text></View>
                    </View>
                </>
            )
        })
        console.log('info222222222222222222222: ', info2);
        return arr;

        // return(
        //     <>
        //         <View style={styles.contentBox}>
        //             <View style={{padding: 5}}><Text></Text></View>
        //             <View style={{justifyContent: 'center'}}><Text>{item.qnaQ}</Text></View>
        //         </View>
        //         <View style={[styles.contentBox, {backgroundColor: '#F5F5F5'}]}>
        //             <View style={{padding: 5}}><Text>A</Text></View>
        //             <View style={{justifyContent: 'center'}}><Text>{item.qnaA}</Text></View>
        //         </View>
        //     </>
        // )
    }
    const List2 = () => { // 출산상담 필터링
        
    }

    const renderItem = ({ item }) => (
        <View style={styles.mainBox}>
            {/* <View style={styles.titleBox}><Text style={{fontSize: 16,  fontWeight: '700'}}>임신상담</Text></View> */}
            <List />
            {/* <List2 /> */}
        </View>
    );

    const renderItem2 = ({ item }) => (
        <View style={styles.headerBox}>
            <View style={[styles.headerFilterBox, {backgroundColor: filter[item.id] ? '#FEA100' : 'white'}]}>
                <TouchableOpacity onPress={()=>change(item.id)}><Text style={{color: filter[item.id] ? 'white' : 'black', fontWeight: '400'}}>{item.title}</Text></TouchableOpacity>
            </View>
        </View>
    );

    return info2 !== undefined ? (
        <View style={styles.container}>
            <View style={styles.header}>
                <FlatList data={DATA2} renderItem={renderItem2}
                keyExtractor={item => item.id} horizontal={true} showsHorizontalScrollIndicator={false}>
                </FlatList>
            </View>
            <View style={styles.main}>
                <FlatList data={info} renderItem={renderItem}
                    keyExtractor={item => item.qnaId}>
                </FlatList>
            </View>
        </View>
    ) : <View></View>
    }

export default Talk1