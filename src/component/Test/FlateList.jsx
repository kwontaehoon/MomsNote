import React, {useState} from 'react'
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Modal } from 'react-native'

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        height: '92%',
        borderWidth: 2,
    },
    container2:{

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
    },
    mainBox2:{
        width: 100,
        borderWidth: 1,
    },
    footer:{
        borderWidth: 1,
        height: 300,
    }
    
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
          title: '위생용품 (0/13)',
          color: '#FFADAD'
        },
        {
            id: '3',
            title: '위생용품 (0/13)',
            color: '#FFADAD'
        },
        {
            id: '4',
            title: '위생용품 (0/13)',
            color: '#FFADAD'
        },
    ];

    

    const renderItem = ({ item }) => (
        <View style={styles.container2}>
            <View style={styles.header}></View>
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

  return (
    <View style={styles.container}>
        <FlatList data={DATA} renderItem={renderItem}
            keyExtractor={item => item.id} showsVerticalScrollIndicator={false}>
        </FlatList>
    </View>
  )
}

export default Main