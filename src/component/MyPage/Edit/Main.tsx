import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import AsyncStorage from '@react-native-async-storage/async-storage'

import Tab1 from './Tab1/Main'
import Tab2 from './Tab2/Main'

const styles = StyleSheet.create({
    container:{
        height: '100%',
        backgroundColor: 'white',
    },
    container2:{

    },
    header:{
        height: 60,
        flexDirection: 'row',
      },
    headerBox:{
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 2,
    },
})
const Withdraw = ({navigation}) => {
   
    const [filter, setFilter] = useState([true, false]); // filter tab
    const [application , setApplication] = useState(); // 체험단 신청정보 있는지 유무
    console.log('체험단 신청정보: ', application);

    useEffect(()=>{

        const applicationInfo = async() => {
            const application = await AsyncStorage.getItem('applicationFlag');
            setApplication(123);
        }
        applicationInfo();

    }, [])

     

    const filter_func = (e) => { // filter tab 변경
        let arr = [false, false];
        arr[e] = true;
        setFilter(arr);
    }
    const List = ():any => {
        switch(true){
            case filter[0] === true: return <Tab1 navigation={navigation} application={application}/>
            case filter[1] === true: return <Tab2 navigation={navigation}/>
        }
    }

  return (
    <View style={styles.container}>
        {
        application !== null ? <View style={styles.header}>
            <TouchableOpacity style={[styles.headerBox, {width: '50%', borderBottomColor: filter[0] ? 'orange' : '#BDBDBD'}]} onPress={()=>filter_func(0)}>
                <Text style={{fontWeight: 'bold', fontSize: 18, color: filter[0] ? 'orange' : '#BDBDBD'}}>계정 정보</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.headerBox, {width: '50%', borderBottomColor: filter[1] ? 'orange' : '#BDBDBD'}]} onPress={()=>filter_func(1)}>
                <Text style={{fontWeight: 'bold', fontSize: 18, color: filter[1] ? 'orange' : '#BDBDBD'}}>회원 정보</Text>
            </TouchableOpacity>
        </View> : ''
        }
        <List navigation={navigation}/>
    </View>
  )
}

export default Withdraw