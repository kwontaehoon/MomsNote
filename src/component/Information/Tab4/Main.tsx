import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ImageBackground } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
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
        borderWidth: 1,
        padding: 15,
        borderColor: '#F5F5F5',
        alignItems: 'center',
    },
  })


const Talk1 = ({navigation}: any) => {

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
    
    const [info, setInfo] = useState([
        {
            qnaId: '1',
            category: '임신상담',
            qnaQ: '임신 중 어떤 운동이 좋을까요?',
            qnaA: '수영 혹은 임신부를 위한 체조나 요가를 추천 드려요. 가볍게 30분씩 걸으시는 것도 추천드립니다.',
            qnaDate: '',
        }, {
            qnaId: '3',
            category: '임신상담',
            qnaQ: '임신 중에 공항검색기 통과 괜찮나요?',
            qnaA: '공항 검색기 통과 시에 방사선 노출이 있지만, 매우 적은 용량이기 때문에 태아에 미치는 영향은 거의 없습니다. 그러나 자주 방사능에 노출되는 것은 바람직하지 않습니다. 공항 검색기 통과 시에 임산부인 것을 밝히면, 공항 검색기 통과를 제외 한 검사를 받으실 수 있습니다.',
            qnaDate: '',
        },{
            qnaId: '2',
            category: '출산상담',
            qnaQ: '출산 후 한약을 복용해도 괜찮을까요?',
            qnaA: '전문의와 상의 후에 전문한의원에서 모유수유를 전제로 진료상담을 통해 복용하실 것을 권고드립니다.',
            qnaDate: '',
        }, {
            qnaId: '4',
            category: '출산상담',
            qnaQ: '커피는 아예 마시면 안 되나요?',
            qnaA: '엄마가 먹는 음식으로 아기에게 직접적인 영향을 주는 것은 아닙니다. 엄마가 먹는 음식은 일단 엄마가 소화, 흡수하고 영양분응로 모유를 통해 아기에게 전달이 되는 것이니까요. 현재 알려진 커피에 대한 부분은 많이 먹게 되면 아기가 보채거나 잠을 잘 못잘 수 있다고 하지만 하루 한 두 잔 정도는 괜찮습니다. 아기에게 수유한 직후에 드시면 더욱 좋구요.',
            qnaDate: '',
        }
    ]);
    const [filter2, setFilter2] = useState(Array.from({length: info.length}, () => {return false}));
    console.log('filter2: ', filter2);


    // useEffect(()=>{
    //     async function b(){
    //         const response = await axios.get('http://192.168.1.140:4000/api/test');
    //         console.log('response: ', response.data);
    //       }
    //       b();
    // }, [])


    const change = (e) => { // 카테고리 배경색상, 글자 색상 변경
        let arr = Array.from({length: 3}, () => {return false});
        arr[e] = !arr[e];
        setFilter(arr);
    }

    const List = () => { // 임신상담 필터링
        const pregnantComfirm = [];
        info.filter(x => {
            if(x.category === '임신상담'){
                pregnantComfirm.push(
                    <>
                    <View style={styles.contentBox}>
                        <View style={{marginRight: 10}}><Q /></View>
                        <Text>{x.qnaQ}</Text>
                    </View>
                    <View style={[styles.contentBox, {backgroundColor: '#F5F5F5'}]}>
                        <View style={{marginRight: 10}}><A /></View>
                        <Text style={{width: '92%'}}>{x.qnaA}</Text>
                    </View>
                    </>
                )
            }
        })
        return pregnantComfirm;
    }

    const List2 = () => { // 출산상담 필터링
        const pregnantComfirm = [];
        info.filter(x => {
            if(x.category === '출산상담'){
                pregnantComfirm.push(
                    <>
                    <View style={styles.contentBox}>
                        <View style={{marginRight: 10}}><Q /></View>
                        <Text>{x.qnaQ}</Text>
                    </View>
                    <View style={[styles.contentBox, {backgroundColor: '#F5F5F5'}]}>
                        <View style={{marginRight: 10}}><A /></View>
                        <Text style={{width: '92%'}}>{x.qnaA}</Text>
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
                <View style={styles.titleBox}><Text style={{fontSize: 16,  fontWeight: '700'}}>임신상담</Text></View>
                <List />
            </View>
            <View style={{display: filter[1] ? 'none' : 'flex'}}>
                <View style={styles.titleBox}><Text style={{fontSize: 16,  fontWeight: '700'}}>출산상담</Text></View>
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

    return info !== undefined ? (
        <View style={styles.container}>
            <View style={styles.header}>
                <FlatList data={DATA2} renderItem={renderItem2}
                keyExtractor={item => item.id} horizontal={true} showsHorizontalScrollIndicator={false}>
                </FlatList>
            </View>
            <View style={styles.main}>
                <FlatList data={DATA} renderItem={renderItem}
                    keyExtractor={item => item.qnaId}>
                </FlatList>
            </View>
        </View>
    ) : <View></View>
    }

export default Talk1