import React, {useState} from 'react'
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Modal, ScrollView } from 'react-native'

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        height: '92%',
        borderWidth: 1,
    },
    header:{
        height: 400,
        borderWidth: 2,
        borderColor: 'blue',
    },
    main:{
        height: 200,
        flexDirection: 'row'
    },
    mainBox:{
        borderWidth: 1,
        borderColor: 'red',
        width: '50%',
        height: 200,

    },
    mainBox2:{
        width: 100,
        height: 100,
        borderWidth: 1,
    },
    footer:{
        height: 300,
        backgroundColor: 'pink'
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

            </View>
            <View style={styles.main}>
    
                    <ScrollView style={styles.mainBox} nestedScrollEnabled={true}>
                        <View style={styles.mainBox2}></View>
                        <View style={styles.mainBox2}></View>
                        <View style={styles.mainBox2}></View>
                        <View style={styles.mainBox2}></View>
                        <View style={styles.mainBox2}></View>
                        <View style={styles.mainBox2}></View>
                        <View style={styles.mainBox2}></View>
                        <View style={styles.mainBox2}></View>
                        <View style={styles.mainBox2}></View>
                    </ScrollView>

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