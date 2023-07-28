import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { postGovernment, setGovernmentCount } from '../../../Redux/Slices/Government'
import { postGovernmentCount } from '../../../Redux/Slices/GovernmentCountSlice'

const styles = StyleSheet.create({
  container:{
    height: '91%',
    backgroundColor: 'white',
  },
  header:{
    height: 10,
    backgroundColor: '#F5F5F5',
  },
  header2:{
    height: 70,
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    alignItems: 'flex-end',
    padding: 15
  },
  main:{
    height: '87%',
    paddingLeft: 15,
    paddingRight: 15,
  },
  mainBox:{
    borderBottomWidth: 1,
    height: 60,
    borderColor: '#F5F5F5',
    justifyContent: 'center',
  },
  mainBox2:{
    height: '50%',
    justifyContent: 'center',
  },
  mainBox3:{
    height: '50%',
    flexDirection: 'row',
  },
  infoBox:{
    width: '50%',
    flexDirection: 'row'
  },
})


const Talk1 = ({navigation}) => {

  const dispatch = useDispatch();
  const info = useSelector(state => { return state.government.data });
  const governmentSet = useSelector(state => { return state.government.refresh });
  const infoCount = useSelector(state => { return state.governmentCount.data });

  const [loading, setLoading] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  useEffect(()=>{
    dispatch(postGovernment(governmentSet));
    dispatch(postGovernmentCount());
  }, [refreshing]);

  const onRefreshing = async() => {
    if(!refreshing){
      await setRefreshing(true);
      setRefreshing(false);
    }
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.mainBox} onPress={()=>navigation.navigate('정부지원혜택 상세내용', item)}>
        <View style={styles.mainBox2}><Text style={{fontSize: 15}} numberOfLines={1} ellipsizeMode={'tail'}>{item.title}</Text></View>
    </TouchableOpacity>
  ); 

  return info == '' ? <ActivityIndicator size={'large'} color='#E0E0E0' style={styles.container}/>
  : info == '0' ?
  <View style={[styles.container, {justifyContent: 'center', alignItems: 'center'}]}><Text style={{fontSize: 16, color: '#757575'}}>등록된 게시물이 없습니다.</Text></View>
  : (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <View style={styles.header2}>
            <Text style={{fontSize: 16, fontWeight: '600'}}>{infoCount}</Text>
            <Text style={{fontSize: 16}}> 건</Text>
      </View>
      <View style={styles.main}>
        <FlatList data={info} renderItem={renderItem} onEndReached={()=>{
          dispatch(setGovernmentCount({page: infoCount > (governmentSet.page * 30) ? governmentSet.page + 1 : governmentSet.page, count: infoCount}));
        }} onEndReachedThreshold={0}
          onRefresh={onRefreshing} refreshing={refreshing}
          keyExtractor={item => String(item.boardId)} showsVerticalScrollIndicator={false}
          ListFooterComponent={loading && <ActivityIndicator />}>
        </FlatList>
      </View>
     </View>
  )
}

export default Talk1