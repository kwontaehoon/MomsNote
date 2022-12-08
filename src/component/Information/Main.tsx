import React, { useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/AntDesign'
import Tab1 from './Tab1/Main'
import Tab2 from './Tab2/Main'

const styles = StyleSheet.create({
  container:{
    height: '92%',
    backgroundColor: 'white',
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
  main:{
    height: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  }
})
const Information = ({navigation}) => {

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

  const Content = [{
    id: '1',
    content: '제목1'
  },
  {
    id: '2',
    content: '제목2'
  },
  {
    id: '3',
    content: '제목3'
  },
  {
    id: '4',
    content: '제목4'
  },
  {
    id: '5',
    content: '제목5'
  }
  ];

  const [filter, setFilter] = useState([true, false]);

  const filter_func = (e) => {
    let arr = [false, false];
    arr[e] = true;
    setFilter(arr);
  }

  const List = ({navigation}):any => {
    switch(true){
        case filter[0] === true: return <Tab1 navigation={navigation}/>
        case filter[1] === true: return <Tab2 navigation={navigation}/>
      }
  }

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity style={[styles.headerBox, {width: '50%', borderBottomColor: filter[0] ? 'orange' : '#BDBDBD'}]} onPress={()=>filter_func(0)}>
                <Text style={{fontWeight: 'bold', fontSize: 18, color: filter[0] ? 'orange' : '#BDBDBD'}}>행사 정보</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.headerBox, {width: '50%', borderBottomColor: filter[1] ? 'orange' : '#BDBDBD'}]} onPress={()=>filter_func(1)}>
                <Text style={{fontWeight: 'bold', fontSize: 18, color: filter[1] ? 'orange' : '#BDBDBD'}}>Q&A</Text>
            </TouchableOpacity>
        </View>
        <List navigation={navigation}/>
    </View>
  )
}

export default Information