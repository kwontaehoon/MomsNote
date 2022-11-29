import React, { useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native'
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
        height: 250,
        backgroundColor: 'yellow'
    },
    main:{
        height: 220,
        padding: 10,
    },
    mainBox:{
        borderBottomWidth: 1,
        borderColor: '#EEEEEE',
        height: '50%',
        justifyContent: 'center',
        paddingTop: 10,
    },
    mainBox2:{
        height: '50%',
        justifyContent: 'center',
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
    main3Box3:{
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
        }
    ];

    const [filter, setFilter] = useState(false);

    const renderItem = ({ item }:any) => (
        
        <View style={styles.container2}>
            <View style={styles.header}>

            </View>
            <View style={styles.main}>
                <View style={styles.mainBox}>
                    <Text style={{color: '#9E9E9E'}}>신청인원 36 / 모집인원 10</Text>
                    <Text style={{fontSize: 25}}>맘스노트 신규체험단 모집</Text>
                </View>
                <View style={styles.mainBox2}>
                    <View style={styles.main2Box}>
                        <View><Text style={{margin: 2}}>신청기간: 22.11.01 ~ 22.11.15</Text></View>
                        <View><Text style={{margin: 2}}>발표일자: 22.11.18</Text></View>
                        <View><Text style={{margin: 2}}>등록기간: 22.12.01</Text></View>
                    </View>
                </View>
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

    const renderItem2 = ({ item }:any) => (
        <List item={item}/>
    );

    const List = ({item}:any) => {
        switch(filter){
            case false : return (
                <View style={styles.main3Box2}>
                    <Text>체험정보</Text>
                </View>
            )
            case true : return (
                <View style={styles.main3Box3}>
                    <Text>선정인원</Text>
                </View>
            )
        }
    }
    const check = () => {
        Alert.alert(
            "체험단 신청을 하시려면 신청정보를 먼저 작성 하셔야합니다. 지금 작성하시겠습니까?",
            "My Alert Msg",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
          );
    }


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
            <TouchableOpacity style={[styles.footerBox, {width: '75%'}]} onPress={check}><Text style={{fontSize: 20, fontWeight: '500'}}>신청서 확인</Text></TouchableOpacity>
        </View>
    </View>
  )
}

export default Talk1Sub