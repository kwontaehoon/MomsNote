import React, { useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/AntDesign'

const styles = StyleSheet.create({
    container:{
        height: '92%',
        backgroundColor: 'white',
    },
    container2:{
        borderWidth: 1,
    },
    header:{
        height: 300,
        backgroundColor: 'yellow'
    },
    main:{
        height: 200,
    },
    main2:{
        height: 10,
        backgroundColor: '#F5F5F5'

    },
    main3:{
        height: 380,
    },
    main3Box:{
        height: 56,
        flexDirection: 'row',
    },
    main3FilterBox:{
        width: '50%',
        borderBottomWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    main3Box2:{
        borderWidth: 1,
        height: 100,
    },
    footer:{
        height: '12%',
        flexDirection: 'row',
        padding: 10,
    },
    footerBox:{
        borderWidth: 1,
        borderColor: '#EEEEEE',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
})
const Talk1Sub = () => {

    const DATA = [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: '전체'
        },
    ];

    const DATA2 = [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: '전체'
        },
        {
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
          title: '자유게시판'
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72',
          title: '일상이야기'
        },
        {
            id: '1',
            title: '임신정보'
        },
        {
            id: '2',
            title: '고민상담'
        },
        {
            id: '3',
            title: '질문게시판'
        }
    ];

    const [filter, setFilter] = useState(false);

    const renderItem2 = ({ item }) => (
        <TouchableOpacity style={styles.main3Box2}>
            <Text>{item.title}</Text>
        </TouchableOpacity>
    ); 


    const renderItem = ({ item }) => (
        
        <View style={styles.container2}>
            <View style={styles.header}>

            </View>
            <View style={styles.main}>

            </View>
            <View style={styles.main2}/>
            <View style={styles.main3}>
                <View style={styles.main3Box}>
                    <TouchableOpacity style={[styles.main3FilterBox, {borderBottomColor: filter ? '#BDBDBD' : 'orange'}]} onPress={()=>setFilter(false)}>
                        <Text style={{fontWeight: 'bold', fontSize: 18, color: filter ? '#BDBDBD' : 'orange'}}>체험 정보</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.main3FilterBox, {borderBottomColor: filter ? 'orange' : 'lightgrey'}]} onPress={()=>setFilter(true)}>
                        <Text style={{fontWeight: 'bold', fontSize: 18, color: filter ? 'orange' : 'lightgrey'}}>선정 인원</Text>
                    </TouchableOpacity>
                </View>
                
            <FlatList data={DATA2} renderItem={renderItem2}
            keyExtractor={item => item.id}>
            </FlatList>
            </View>
        </View>
      );


  return (
    <View style={styles.container}>
        <FlatList data={DATA} renderItem={renderItem}
          keyExtractor={item => item.id}>
        </FlatList>
        <View style={styles.footer}>
            <View style={[styles.footerBox, {width: '20%'}]}>
                <Icon name='user' size={22}/>
                <Text> 12</Text>
            </View>
            <View style={[styles.footerBox, {width: '5%', borderWidth: 0}]}></View>
            <View style={[styles.footerBox, {width: '75%'}]}><Text style={{fontSize: 20, fontWeight: '500'}}>신청서 확인</Text></View>
        </View>
    </View>
  )
}

export default Talk1Sub