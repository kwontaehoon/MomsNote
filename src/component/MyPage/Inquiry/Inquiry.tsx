import React, { useState } from 'react'
import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import Icon from 'react-native-vector-icons/FontAwesome'

// 문의하기
const styles = StyleSheet.create({
    container:{
      height: '95%',
      backgroundColor: 'white',
    },
    container2:{

    },
    header:{
      paddingTop: 30,
      height: 130,
      padding: 15,
    },
    headerBox:{
      height: 40,
      justifyContent: 'center',
    },
    headerBox2:{
      height: 52,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    header2:{
      height: 400,
      paddingLeft: 15,
      paddingRight: 15,
    },
    header2Box:{
      height: 52,
      justifyContent: 'center',
    },
    header2Box2:{
      height: '85%',
    },
    inputBox:{
      width: '100%',
      height: 56,
      borderWidth: 1,
      borderColor: 'lightgrey',
      justifyContent: 'center',
      paddingLeft: 10,
      borderRadius: 4,
    },
    footer:{
      marginTop: 30,
      height: 56,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FEA100',
    }
})
const Inquiry2 = () => {

  const [title, setTitle] = useState('');
  console.log('title: ', title);
  const [content, setContent] = useState('');
  console.log('content: ', content);

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: '전체'
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.container2}>
        <View style={styles.header}>
          <View style={styles.headerBox}><Text style={{fontWeight: 'bold'}}>제목</Text></View>
          <View style={styles.headerBox2}>
            <TextInput style={styles.inputBox} placeholder='문의제목 입력' placeholderTextColor={'#BDBDBD'}
            onChangeText={setTitle}></TextInput>
          </View>
        </View>
        <View style={styles.header2}>
          <View style={styles.header2Box}><Text style={{fontWeight: 'bold'}}>내용</Text></View>
          <View style={styles.header2Box2}>
            <TextInput style={[styles.inputBox, {height: 340, paddingBottom: 275}]} placeholder='문의내용 입력' placeholderTextColor={'#BDBDBD'}
            onChangeText={setContent} cursorColor={'#BDBDBD'}></TextInput>
          </View>
        </View>
        <View style={[styles.footer, {backgroundColor: title.length !== 0 && content.length !== 0 ? '#FEA100' : '#E0E0E0'}]}>
          <Text style={{fontSize: 18, fontWeight: '600', color: 'white'}}>문의하기</Text>
        </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList data={DATA} renderItem={renderItem}
          keyExtractor={item => item.id}>
      </FlatList>
    </View>
  )
}

export default Inquiry2