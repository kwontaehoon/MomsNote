import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import DropDownPicker from 'react-native-dropdown-picker'

import moment from 'moment'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { postExperience } from '../../../Redux/Slices/ExperienceSlice'
import { setExperienceCount, setExperienceFilter } from '../../../Redux/Slices/ExperienceSlice'
import { postExperienceCount } from '../../../Redux/Slices/ExperienceCountSlice'
import Modal from '../../Modal/First'


const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'white',
  },
  header2:{
    height: 50,
    flexDirection: 'row',
  },
  header2FilterBox:{
    justifyContent: 'center',
    paddingLeft: 20,
  },
  filterBox:{
    width: 90,
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  InputBox:{
    borderWidth: 0,
  },
  main:{
    height: '91%',
    padding: 10,
    position: 'relative',
    zIndex: -100,
  },
  mainBox:{
    width: '50%',
    height: 260,
    padding: 10,
  },
  imageBox:{
    height: '70%',
  },
  contentBox:{
    height: '30%'
  },
  content:{
    height: '33.4%',
    justifyContent: 'center'
  },
  mainBox2:{
    height: '50%',
    justifyContent: 'center',
    paddingLeft: 5,
  },
  mainBox3:{
    height: '50%',
    flexDirection: 'row',
  },
  infoBox:{
    width: '50%',
    paddingLeft: 5,
  },
  clockBox:{
    width: '50%',
    alignItems: 'flex-end',
    paddingRight: 5,
  },
})


const Talk3 = ({navigation}: any) => {

  const dispatch = useDispatch();
  const info = useSelector(state => {return state.experience.data});
  const infoCount = useSelector(state => { return state.experienceCount.data});
  const experienceSet = useSelector(state => { return state.experience.refresh; });

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('1');
  const [items, setItems] = useState([
        {label: '최신 순', value: '1'},
        {label: '인기 순', value: '2'},
  ]);

  const [modal, setModal] = useState({
    open: false,
    content: '이미 모집이 종료된 게시물입니다.',
    buttonCount : 1
  });

  useEffect(()=>{
    setLoading(true);
    dispatch(postExperience(experienceSet));
    dispatch(postExperienceCount(infoCount));
    setLoading(false);
  }, [value]);

  const filtering = (e) => {
    e.label == '인기 순' ? dispatch(setExperienceFilter({filter: 'best'})) : dispatch(setExperienceFilter({filter: 'new'}))
  }

  const renderItem = ({ item }) =>
    item.appCount >= item.maxPeople || moment(item.applicationEndDate).diff(moment(), "days") <= 0 ?
    (
      <TouchableOpacity style={[styles.mainBox, {opacity: 0.5}]} onPress={()=>setModal(prevState=> ({...prevState, open: true}))}>
        <View style={styles.imageBox}>
          { item.savedName !== null ?<Image source={{uri: `https://momsnote.s3.ap-northeast-2.amazonaws.com/board/${item.savedName.split('|')[0]}`}} style={{width: '100%', height: '100%', borderRadius: 8}} /> : ''}
        </View>
        <View style={styles.contentBox}>
          <View style={[styles.content, {justifyContent: 'flex-end'}]}><Text style={{color: '#757575', fontSize: 13, fontWeight: '600'}}>모집 종료</Text></View>
          <View style={styles.content}><Text style={{fontWeight: '500'}}>{item.title}</Text></View>
          <View style={[styles.content, {justifyContent: 'flex-end'}]}><Text style={{color: '#9E9E9E', fontSize: 13}}>신청 {item.appCount}명/모집 {item.maxPeople}명</Text></View>
        </View>
      </TouchableOpacity>
    ):(
    <TouchableOpacity style={styles.mainBox} onPress={()=>navigation.navigate('체험단 상세페이지', item)}>
      <View style={styles.imageBox}>
        { item.savedName !== null ?<Image source={{uri: `https://momsnote.s3.ap-northeast-2.amazonaws.com/board/${item.savedName.split('|')[0]}`}} style={{width: '100%', height: '100%', borderRadius: 8}} /> : ''}
      </View>
      <View style={styles.contentBox}>
        <View style={[styles.content, {justifyContent: 'flex-end'}]}><Text style={{color: '#FE9000', fontSize: 13, fontWeight: '600'}}>{moment(item.applicationEndDate).diff(moment(), "days")}일 남음</Text></View>
        <View style={styles.content}><Text style={{fontWeight: '500'}}>{item.title}</Text></View>
        <View style={[styles.content, {justifyContent: 'flex-end'}]}><Text style={{color: '#9E9E9E', fontSize: 13}}>신청 {item.appCount}명/모집 {item.maxPeople}명</Text></View>
      </View>
    </TouchableOpacity>
  ); 

  return info == undefined ?
      <View style={{height: '70%', alignItems: 'center', justifyContent: 'center'}}><Text style={{fontSize: 16, color: '#757575'}}>모집중인 체험단이 없습니다.</Text></View>
      : (
    <View style={styles.container}>

      <Modal modal={modal} setModal={setModal}/>

      <View style={styles.header2}>
        <View style={[styles.header2FilterBox, {paddingBottom: 5}]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontSize: 16, fontWeight: '600'}}>{infoCount}</Text>
            <Text style={{fontSize: 16}}> 건</Text>
          </View>
        </View>
        <View style={styles.filterBox}>
        <DropDownPicker open={open} value={value} items={items} style={styles.InputBox} placeholder='최신 순' onSelectItem={(e)=>filtering(e)}
              textStyle={{fontSize: 13}} dropDownContainerStyle={{backgroundColor: 'white', borderColor: 'white'}}
              setOpen={setOpen} setValue={setValue} setItems={setItems}/>
        </View>
      </View>

      <View style={styles.main}>
        { info.length == 0 ? <View style={{height: '70%', alignItems: 'center', justifyContent: 'center'}}><Text style={{fontSize: 16, color: '#757575'}}>등록된 게시글이 없습니다.</Text></View>
        :
        <FlatList data={info} renderItem={renderItem} numColumns={2} showsVerticalScrollIndicator={false}
          onEndReached={()=>
          {
            dispatch(setExperienceCount({page: infoCount > (experienceSet.page * 30) ? experienceSet.page + 1 :experienceSet.page, count: infoCount}))
          }} onEndReachedThreshold={0}
          keyExtractor={(item, index) => String(index)}
          ListFooterComponent={loading && <ActivityIndicator />}>
          </FlatList>
}
      </View>
     </View>
  )
}

export default Talk3