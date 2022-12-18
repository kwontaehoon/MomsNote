import React, {useState} from 'react'
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Modal } from 'react-native'
import Google from '../../../public/assets/svg/google.svg';
import Chat from '../../../public/assets/svg/Chat.svg';

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
        <View>
            <View style={styles.header}>
                <Google width={50} height={50} fill={'red'}/>
                <Chat width={200} height={200} fill={'blue'} />
            </View>
            <View style={styles.main}>
                <View style={styles.mainBox}></View>
                <View style={styles.mainBox}>
                    <FlatList data={DATA2} renderItem={renderItem2}
                        keyExtractor={item => item.id} showsVerticalScrollIndicator={false} horizontal={true}>
                    </FlatList>
                </View>
            </View>
            <View style={styles.footer}></View>
        </View>
      );

    const renderItem2 = ({ item }) => (
        <View style={styles.mainBox2}>
            <Text>{item.id}</Text>
        </View>
    );

    const renderItem3 = ({ item }) => (
        <TouchableOpacity style={{height: 130, borderWidth: 1}}>
            <Text>{item.title}</Text>
        </TouchableOpacity>
    );

  return (
    <View style={styles.container}>
        <FlatList data={DATA} renderItem={renderItem}
            keyExtractor={item => item.id} showsVerticalScrollIndicator={false}>
        </FlatList>
    </View>
  )
}

export default Main