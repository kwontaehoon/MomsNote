import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const styles = StyleSheet.create({
  container:{
    height: '92%',
    backgroundColor: 'white',
  },
  header:{
    height: '8%',
  },
  header2:{
    height: '8%',
  },
  main:{
    height: '84%',
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
})


const Talk1 = ({navigation}: any) => {

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: '전체'
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: '자유게시판'
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: '일상이야기'
    },
    {
        id: '1',
        title: '임신정보'
    },
    {
        id: '2',
        title: '고민상담'
    },
    {
        id: '3',
        title: '질문게시판'
    }
  ];

  const [filter, setFilter] = useState([true, false, false, false]);


  const renderItem = ({ item }) => (
    <View style={styles.headerFilterBox}>
        <TouchableOpacity><Text>{item.title}</Text></TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
        <View style={styles.header}>

        </View>
        <View style={styles.header2}>

        </View>
        <TouchableOpacity style={styles.main} onPress={()=>navigation.navigate('InformationTab1Detail')}>
            <Text>등록된 행사정보가 없습니다.</Text>
        </TouchableOpacity>
     </View>
  )
}

export default Talk1