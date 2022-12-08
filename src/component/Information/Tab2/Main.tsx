import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ImageBackground } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const styles = StyleSheet.create({
    container:{
      height: '91%',
      backgroundColor: 'white',
      borderWidth: 2,
    },
    container2:{

    },
    header:{
      height: 200,
      borderWidth: 1,
      justifyContent: 'center',
      marginLeft: 5,
    },
    headerBox:{
      justifyContent: 'center',
    },
    headerFilterBox:{
      height: 40,
      borderWidth: 1,
      borderColor: '#EEEEEE',
      margin: 5,
      borderRadius: 20,
      paddingTop: 8,
      paddingLeft: 16,
      paddingRight: 16,
      paddingBottom: 8,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    main:{
      height: 300,
      borderWidth: 1,
    },
    mainBox:{
      height: '33.4%',
    },
    titleBox:{
      height: '25%',
      paddingLeft: 15,
      justifyContent: 'center',
      backgroundColor: '#FAFAFA'
    },
    contentBox:{
      height: '75%',
      paddingLeft: 15,
      justifyContent: 'center',
      alignItems: 'center',
    }
  })


const Talk1 = ({navigation}: any) => {

  const DATA = [
    {
        id: '0',
        title: '전체'
    },
  ];

  const DATA2 = [
    {
        id: '0',
        title: '전체'
    },
    {
        id: '1',
        title: '임신상담'
    },
    {
        id: '2',
        title: '출산상담'
    },
    {
        id: '3',
        title: '육아상담'
    }
  ];

  const [filter, setFilter] = useState([true, false, false, false]);

  const change = (e) => { // 카테고리 배경색상, 글자 색상 변경
    let arr = Array.from({length: 4}, () => {return false});
    arr[e] = !arr[e];
    setFilter(arr);
  }

  const renderItem = ({ item }) => (
    <View style={styles.container2}>
      <View style={styles.header}>
        {/* <FlatList data={DATA2} renderItem={renderItem2}
          keyExtractor={item => item.id} horizontal={true} showsHorizontalScrollIndicator={false}>
        </FlatList> */}
      </View>
      <View style={styles.main}>
        {/* <View style={styles.mainBox}>
            <View style={styles.titleBox}><Text>임신상담</Text></View>
            <View style={styles.contentBox}><Text>등록된 Q&A가 없습니다.</Text>
            </View>
        </View>
        <View style={styles.mainBox}>
            <View style={styles.titleBox}><Text>출산상담</Text></View>
            <View style={styles.contentBox}><Text>등록된 Q&A가 없습니다.</Text></View>
        </View>
        <View style={styles.mainBox}>
            <View style={styles.titleBox}><Text>육아상담</Text></View>
            <View style={styles.contentBox}><Text>등록된 Q&A가 없습니다.</Text></View>
        </View> */}
      </View>
    </View>
  );

  const renderItem2 = ({ item }) => (
    <View style={styles.headerBox}>
    <View style={[styles.headerFilterBox, {backgroundColor: filter[item.id] ? '#FEA100' : 'white'}]}>
        <TouchableOpacity onPress={()=>change(item.id)}><Text style={{color: filter[item.id] ? 'white' : 'black', fontWeight: '400'}}>{item.title}</Text></TouchableOpacity>
    </View>
    </View>
  );

  return (
    <View style={styles.container}>
       <FlatList data={DATA} renderItem={renderItem}
          keyExtractor={item => item.id} horizontal={true} showsHorizontalScrollIndicator={false}>
        </FlatList>
     </View>
  )
}

export default Talk1