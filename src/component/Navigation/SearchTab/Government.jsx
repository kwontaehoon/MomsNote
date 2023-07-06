import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { postGuideCount } from '../../../Redux/Slices/GuideCountSlice'
import { postGuide, setGuideRefresh, setGuideCount } from '../../../Redux/Slices/GuideSlice'
import { setGuideCountRefresh } from '../../../Redux/Slices/GuideCountSlice'
import { Platform } from 'expo-modules-core'

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'white',
  },
  header:{
    height: '15%',
    backgroundColor: '#F5F5F5',
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
  },
  header2:{
    height: '10%',
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
  },
  header2FilterBox:{
    width: '68%',
    justifyContent: 'center',
    paddingLeft: 20,
  },
  InputBox:{
    borderWidth: 1,
    borderColor: '#F5F5F5',
    backgroundColor: '#F5F5F5',
    borderRadius: 0,
  },
  main:{
    height: '75%',
    paddingLeft: 10,
    paddingRight: 10,
  },
  mainBox:{
    borderBottomWidth: 1,
        borderColor: '#F5F5F5',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 15,
        paddingTop: 25,
        paddingBottom: 25
    
  },
  mainBox2:{
    width: 80,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainBox3:{
    justifyContent: 'center',
    paddingLeft: 5,
    paddingRight: 5
  }
})


const Talk1 = ({navigation, route}) => {

  const DATA = [
    {
      id: '0',
      title: '전체'
    },{
      id: '1',
      title: '임신초기'
    },{
      id: '2',
      title: '임신중기'
    },{
      id: '3',
      title: '임신후기'
    },{
      id: '4',
      title: '질환'
    },
  ];

  const dispatch = useDispatch();
  const [info, setInfo] = useState(route.params);

  const [loading, setLoading] = useState(false);

  const [refreshing, setRefreshing] = useState(false);


  const onRefreshing = () => {
    if(!refreshing){
      setRefreshing(true);
      dispatch(postGuide(guideSet));
      dispatch(postGuideCount(guideCountSet));
      setRefreshing(false);
    }
  }

  const renderItem2 = ({ item }) => (
    <TouchableOpacity style={styles.mainBox} onPress={()=>navigation.navigate('맘스가이드 상세내용', item)} activeOpacity={1}>
        <View style={styles.mainBox3}><Text style={{fontSize: 15}} numberOfLines={1} >{item.title} </Text></View>
    </TouchableOpacity>
  ); 

  return (
    <View style={[styles.container, {flex: Platform.OS == 'ios' ?  0 : 1}]}>
      <View style={styles.main}>
        <FlatList data={info} renderItem={renderItem2}
          onRefresh={onRefreshing} refreshing={refreshing}
          keyExtractor={item => String(item.boardId)} showsVerticalScrollIndicator={false}>
        </FlatList>
      </View>
     </View>
  )
}

export default Talk1