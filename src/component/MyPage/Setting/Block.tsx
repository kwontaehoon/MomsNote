import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import axios from 'axios'

const styles = StyleSheet.create({
    container:{
        height: '100%',
        borderTopWidth: 1,
        borderColor: '#EEEEEE',
        backgroundColor: 'white'
    },
    container2:{

    },
    main:{
        height: 100,
        flexDirection: 'row',
        padding: 15,
        borderBottomWidth: 1,
        borderColor: '#EEEEEE',
    },
    mainBox:{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    circleBox:{
        borderWidth: 1,
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 12,
    },
    clickBox:{
        borderWidth: 1,
        position: 'absolute',
        right: 0,
        borderRadius: 5,
        borderColor: '#FEA100',
        width: 80,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
})
const Block = () => {

    const [info, setInfo] = useState([]);
    console.log('block info: ', info);

    const [filter, setFilter] = useState(Array.from({length: info.length}, () => false));

    useEffect(()=>{
        const block = async() => {
            try{
                const response = await axios({
                    method: 'post',
                    url: 'https://momsnote.net/api/blocklist',
                    headers: { 
                        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnb29nbGVfMTIzNDU2Nzg5MCIsImlkIjo0LCJpYXQiOjE2NzE1OTE0OTIsImV4cCI6MTY3NDE4MzQ5Mn0.d8GpqvEmnnrUZKumuL4OPzp7wSGXiTo47hGkCSM2HO0', 
                        'Content-Type': 'application/json'
                      },
                    data: {}
                });
                setInfo(response.data);
            }catch(error){
                console.log('block axios error');
            }
        }
        block();
    }, []);

    const unlock = async(id) => {
        try{
            const response = await axios({
                method: 'post',
                url: 'https://momsnote.net/api/unblock',
                headers: { 
                  'Authorization': 'bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnb29nbGVfMTIzNDU2Nzg5MCIsImlkIjo0LCJpYXQiOjE2NzE3ODY2MDAsImV4cCI6MTY3NDM3ODYwMH0.84a-3YTmTMeE9YnQ7OF-jLUkUt-EwN-fmvZNK705eCo', 
                  'Content-Type': 'application/json'
                },
                data: { blockUserId: id }
                });
                console.log('response: ', response.data);
            }catch(error){
              console.log('error: ', error);
            }
    }



    const blockClick = (index) => {
        let arr = [...filter];
        arr[index] = !arr[index];
        setFilter(arr);
    }


    const renderItem = ({ item, index }) => (
        <View style={styles.main}>
            <View style={styles.mainBox}>
                <TouchableOpacity style={[styles.clickBox, {backgroundColor: filter[index] ? '#FEA100' : 'white'}]} onPress={()=>{blockClick(index), unlock(item.blockUserId)}}>
                    {filter[index] ? <Text style={{fontWeight: '600', color: 'white'}}>차단</Text>
                    :
                    <Text style={{fontWeight: '600', color: '#FEA100'}}>차단 해제</Text>}
                </TouchableOpacity>
                <View style={styles.circleBox}></View>
                <Text>{item.nickname}</Text>
            </View>
           
        </View>
    );

  return (
    <View style={styles.container}>
        <FlatList data={info} renderItem={renderItem}
            keyExtractor={item => String(item.blockId)} showsVerticalScrollIndicator={false}>
        </FlatList>
    </View>
  )
}

export default Block