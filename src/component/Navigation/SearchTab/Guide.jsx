import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native'
import { useDispatch } from 'react-redux'
import { postGuideCount } from '../../../Redux/Slices/GuideCountSlice'
import { postGuide } from '../../../Redux/Slices/GuideSlice'
import { Platform } from 'expo-modules-core'

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'white',
  },
  rainboxBox:{
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
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

  const dispatch = useDispatch();
  const [info, setInfo] = useState(route.params);
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

  return info?.length == 0 ? 
    <View style={styles.rainboxBox}>
        <Image source={require('../../../../public/assets/image/rainbow2.png')} />
    </View> : (
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