import React, {useState} from 'react'
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Modal, ScrollView } from 'react-native'
import Google from '../../../public/assets/svg/google.svg';
import Chat from '../../../public/assets/svg/chat.svg';

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        height: '92%',
        borderWidth: 2,
    },
    header:{
        height: 400,
        borderWidth: 1,
    },
    main:{
        borderWidth: 1,
        height: 200,
        flexDirection: 'row'
    },
    mainBox:{
        borderWidth: 1,
        width: '50%',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 999
    },
    mainBox2:{
        width: 100,
        height: 100,
        borderWidth: 1,
    },
    footer:{
        borderWidth: 1,
        height: 300,
    },

    scrollBox:{
        position: 'absolute',
        borderWidth: 1,
        backgroundColor: 'green',
        width: 300,
        height: 300,
        zIndex: 999,
    },
    
})

const Main = ({navigation}) => {

    const DATA = [
        {
          id: '0',
          title: '산모용품 (0/13)',
          color: '#FFADAD',
          icon: 'material1'
        },
    ];

    const DATA2 = [
        {
          id: '0',
          title: '산모용품 (0/13)',
          color: '#FFADAD',
          icon: 'material1'
        },
        {
          id: '1',
          title: '수유용품 (0/13)',
          color: '#FFADAD'
        },
        {
          id: '2',
          title: '목욕용품 (0/13)',
          color: '#FFADAD'
        },
        {
            id: '3',
            title: '침구류 (0/13)',
            color: '#FFADAD'
        },
        {
            id: '4',
            title: '아기의류 (0/13)',
            color: '#FFADAD'
        },
    ];

    

   

    const renderItem = ({ item }) => (
        <View style={styles.mainBox2}>
            <Text>{item.id}</Text>
        </View>
    );

  return (
    <ScrollView style={styles.container}>
        <View style={{height: 200, borderWidth: 1}}></View>
        <View style={{height: 200, borderWidth: 1, position: 'absolute', zIndex: 999}}>
            <FlatList data={DATA2} renderItem={renderItem}
                keyExtractor={item => item.id} showsVerticalScrollIndicator={false}>
            </FlatList>
        </View>
        <View style={{height: 200, borderWidth: 1}}></View>
        <View style={{height: 200, borderWidth: 1}}></View>
        <View style={{height: 200, borderWidth: 1}}></View>
      
    </ScrollView>
  )
}

export default Main