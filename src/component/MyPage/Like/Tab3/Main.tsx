import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { postExperienceCount } from '../../../../Redux/Slices/ExperienceCountSlice'
import { postMyLikeExp } from '../../../../Redux/Slices/MyLikeExpSlice'


const styles = StyleSheet.create({
  container:{
    height: '91%',
    backgroundColor: 'white',
  },
  header:{
    height: 10,
  },
  header2:{
    height: 50,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  header2FilterBox:{
    width: '68%',
    justifyContent: 'center',
    paddingLeft: 20,
  },
  InputBox:{
    borderWidth: 0,
  },
  main:{
    height: '90%',
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
    paddingLeft: 5
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
  const info = useSelector(state => {return state.myLikeExp.data});
  const infoCount = useSelector(state => { return state.experienceCount.data});
  const experienceCountSet = useSelector(state => { return state.experience.refresh; });

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('1');
  const [items, setItems] = useState([
        {label: '최신 순', value: '1'},
        {label: '인기 순', value: '2'},
  ]);

  useEffect(()=>{
    dispatch(postMyLikeExp());
    dispatch(postExperienceCount(experienceCountSet));
  }, []);

  const filtering = (e) => {
    e.label == '인기 순' ? dispatch(setExperienceFilter({filter: 'best'})) : dispatch(setExperienceFilter({filter: 'new'}))
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.mainBox} onPress={()=>navigation.navigate('체험단 상세페이지', item)}>
      <View style={styles.imageBox}>
        {item.savedName == null ? '' : <Image source={{uri: `https://momsnote.s3.ap-northeast-2.amazonaws.com/board/${item.savedName.split('|')[0]}`}} style={{width: '100%', height: '100%', borderRadius: 8}} />}
      </View>
      <View style={styles.contentBox}>
        <View style={[styles.content, {justifyContent: 'flex-end'}]}><Text style={{color: '#FE9000', fontSize: 13, fontWeight: '600'}}>{moment(item.registrationEndDate).diff(moment(), "days")+1}일 남음</Text></View>
        <View style={styles.content}><Text style={{fontWeight: '500'}} numberOfLines={1} ellipsizeMode={'tail'}>{item.title}</Text></View>
        <View style={[styles.content, {justifyContent: 'flex-end'}]}><Text style={{color: '#9E9E9E', fontSize: 13}}>신청 {item.appCount}명/모집 {item.maxPeople}명</Text></View>
      </View>
    </TouchableOpacity>
  ); 

  return info == '0' ? <View style={{marginTop: 250, alignItems: 'center'}}><Text style={{color: '#757575', fontSize: 16}}>모집중인 체험단이 없습니다.</Text></View>
  : (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <View style={styles.header2}>
        <View style={[styles.header2FilterBox, {paddingBottom: 5}]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontSize: 16, fontWeight: '600'}}>{infoCount}</Text>
            <Text style={{fontSize: 16}}> 건</Text>
          </View>
        </View>
        <View style={[styles.header2FilterBox, {width: '32%'}]}>
        <DropDownPicker open={open} value={value} items={items} style={styles.InputBox} placeholder='최신 순' onSelectItem={(e)=>filtering(e)}
              textStyle={{fontSize: 13}} dropDownContainerStyle={{backgroundColor: 'white', borderColor: 'white'}}
              setOpen={setOpen} setValue={setValue} setItems={setItems}/>
        </View>
      </View>
      <View style={styles.main}>
        <FlatList data={info} renderItem={renderItem} numColumns={2} showsVerticalScrollIndicator={false}
          keyExtractor={item => item.appCount}>
        </FlatList>
      </View>
     </View>
  )
}

export default Talk3