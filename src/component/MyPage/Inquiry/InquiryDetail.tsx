import React from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import Icon from 'react-native-vector-icons/FontAwesome'

const styles = StyleSheet.create({
    container:{
        height: '100%',
        backgroundColor: 'white',
    },
    header:{
        backgroundColor: '#F5F5F5',
        height: 80,
        padding: 20,
        justifyContent: 'center',
        borderTopWidth: 1,
        borderColor: '#E0E0E0'
    },
    statusBox:{
        position: 'absolute',
        right: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    main:{
        borderBottomWidth: 1,
        padding: 20,
        borderColor: '#EEEEEE'
    },
    main2:{
        justifyContent: 'center',
        padding: 20,
    },
    main2Box:{
    },
})
const InquiryDetail = ({route}) => {

    console.log('route: ', route.params);

    const renderItem = ({ item }) => (
        <View>
        <View style={styles.header}>
            <View style={styles.statusBox}><Text style={{color: '#757575'}}>{item.status}</Text></View>
            <Text style={{fontSize: 15, fontWeight: '600', marginBottom: 3, color: '#424242'}}>{item.title}</Text>
            <Text style={{color: '#9E9E9E'}}>{item.inquiryDate}</Text>
        </View>
        <View style={styles.main}>
            <Text>{item.contents}</Text>
        </View>
        <View style={styles.main2}>
            <View style={styles.main2Box}>
                <Text style={{fontWeight: '600', fontSize: 15}}>답변 내용</Text>
                <View style={[styles.statusBox, {right: 0}]}><Text style={{color: '#757575'}}>{item.answerDate}</Text></View>
            </View>
            <Text style={{marginTop: 5}}>내용</Text>
        </View>
        </View>
      );

  return (
    <View style={styles.container}>
        <FlatList data={[route.params]} renderItem={renderItem}
          keyExtractor={item => item.title}>
        </FlatList>
    </View>
  )
}

export default InquiryDetail