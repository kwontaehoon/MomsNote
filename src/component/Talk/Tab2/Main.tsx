import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, ActivityIndicator, Platform } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import axios from 'axios'
import moment from 'moment'
import { useIsFocused } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import Like from '../../../../public/assets/svg/Like.svg'
import Chat from '../../../../public/assets/svg/Chat.svg'
import Pencil from '../../../../public/assets/svg/pencil.svg'
import { useDispatch, useSelector } from 'react-redux'
import { setMaterialShareFilter, setMaterialShareCount } from '../../../Redux/Slices/MaterialShareSlice'
import { postMaterialShare } from '../../../Redux/Slices/MaterialShareSlice'
import { postMaterialShareCount } from '../../../Redux/Slices/MaterialShareCountSlice'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import Swiper from 'react-native-swiper'
import { postListPopular } from '../../../Redux/Slices/ListPopularSlice'

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'white',
  },
  header2:{
    height: 50,
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
  },
  header2FilterBox:{
    justifyContent: 'center',
    paddingLeft: 20,
  },
  filterBox:{
    width: 100,
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  InputBox:{
    borderWidth: 0,
    backgroundColor: '#F5F5F5',
  },
  header3:{
    height: '8%',
    justifyContent: 'center',
    paddingLeft: 20,
    borderBottomWidth: 1,
    borderColor: '#EEEEEE',
    position: 'relative',
    zIndex: -100,
  },
  main:{
    flex: 1,
    position: 'relative',
    zIndex: -100,
  },
  mainBox:{
    borderWidth: 1,
    borderColor: '#F5F5F5',
    justifyContent: 'center',
    padding: 20,
  },
  infoBox:{
    flexDirection: 'row',
    marginTop: 5,
  },
  clockBox:{
    position: 'absolute',
    right: 15,
    bottom: 20,
  },
  footer:{
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 20,
    right: 20,
    borderRadius: 999,
    backgroundColor: '#FEA100',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    elevation: 5,
},
  modalContainer:{
      justifyContent: "center",
      alignItems: "center",
  },
  modalView:{
      width: '100%',
      height: '100%',
      backgroundColor: "rgba(0,0,0,0.5)",
      alignItems: "center",
      justifyContent: 'center',
      shadowColor: "#000",
      elevation: 5,
  },
  modalContainer2:{
      width: '80%',
      backgroundColor: 'white',
      borderRadius: 15
  },
  modalBox:{
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
  },
  modal:{
      backgroundColor: '#FEA100',
      width: '90%',
      height: 44,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 3,
      marginBottom: 7,
  },
  slide:{
    height: '100%',
    justifyContent: 'center'
  },
})


const Talk1 = ({navigation}) => {

  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const materialShareSet = useSelector(state => { return state.materialShare.refresh });
  const info = useSelector(state => { return state.materialShare.data});
  const infoCount = useSelector(state => { return state.materialShareCount.data});

  const ListPopular = useSelector(state => { return state.ListPopular.data });

  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState({
    open: false,
    asyncStorage: ''
  }); // 글쓰기 모달
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('1');
  const [items, setItems] = useState([
    {label: '최신 순', value: '1'},
    {label: '인기 순', value: '2'},
]);

useEffect(()=>{
  setLoading(true);
  dispatch(postMaterialShare(materialShareSet));
  dispatch(postMaterialShareCount());
  dispatch(postListPopular());
  setLoading(false);
}, [value]);


useEffect(()=>{
  const momsTalk = async() => {
    const asyncStorage = await AsyncStorage.getItem('materialList');
    setModalVisible(prevState => ({...prevState, asyncStorage: asyncStorage}));
  }
  momsTalk();
}, [isFocused]);

const dayCalculate = (date) => {
  switch(true){
    case moment().diff(moment(date), 'minute') < 60: return <Text style={{color: '#9E9E9E', fontSize: 12}}>{moment().diff(moment(date), 'minute')}분 전</Text>
    case moment().diff(moment(date), 'hour') < 24: return<Text style={{color: '#9E9E9E', fontSize: 12}}>{moment().diff(moment(date), 'hour')}시간 전</Text>
    default: return <Text style={{color: '#9E9E9E', fontSize: 12}}>{moment(date).format('YY.MM.DD')}</Text>
  }
}

const filtering = (e) => {
  e.label == '인기 순' ? dispatch(setMaterialShareFilter({filter: 'best'})) : dispatch(setMaterialShareFilter({filter: 'new'}))
}

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.mainBox} onPress={()=>navigation.navigate('출산리스트 공유 상세내용', item)}>
        <View style={styles.clockBox}>
          <Text style={{color: '#9E9E9E', fontSize: 12}}>{dayCalculate(item.boardDate)}</Text>
        </View>
        <Text numberOfLines={2} ellipsizeMode={'tail'}>{item.title}</Text>
        <View style={styles.infoBox}>
              <Text style={{color: '#9E9E9E', fontSize: 13}}>{item.nickname} </Text>
              <Like fill='#9E9E9E' width={13} height={17}/>
              <Text style={{color: '#9E9E9E', fontSize: 13}}> {item.recommend}  </Text>
              <Chat fill='#9E9E9E' width={13} height={17}/>
              <Text style={{color: '#9E9E9E', fontSize: 13}}> {item.recommend} </Text>
        </View>
    </TouchableOpacity>
  ); 

  return info == '' ?  <ActivityIndicator size={'large'} color='#E0E0E0' style={styles.container}/> : (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <View style={styles.header2}>
        <View style={styles.header2FilterBox}>
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

      <View style={[styles.header3, {display: info == undefined || info == '0' || info == '' ? 'none' : 'flex'}]}>
          <Swiper horizontal={false}
          autoplay={true}
          autoplayTimeout={4.5}
          showsPagination={false}
          >
          <TouchableOpacity style={styles.slide}>
            <Text style={{color: 'orange', fontWeight: 'bold'}}>[인기글] {ListPopular == '' ? '' : ListPopular[0].title}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.slide}>
            <Text style={{color: 'orange', fontWeight: 'bold'}}>[인기글] {ListPopular == '' || ListPopular.length < 2 ?  '' : ListPopular[1].title}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.slide}>
            <Text style={{color: 'orange', fontWeight: 'bold'}}>[인기글] {ListPopular == '' || ListPopular.length < 3 ?  '' : ListPopular[2].title}</Text>
          </TouchableOpacity>
        </Swiper>
      </View>

      <View style={[styles.main, {height: Platform.OS == 'ios' ? null : '89%', flex: Platform.OS === 'ios' ? 1 : null}]}>
        {info == 0 ?
        <View style={{height: '70%', alignItems: 'center', justifyContent: 'center'}}><Text style={{fontSize: 16, color: '#757575'}}>등록된 게시글이 없습니다.</Text></View>
        :
        <FlatList data={info} renderItem={renderItem} onEndReached={()=>{
          dispatch(setMaterialShareCount({page: infoCount > (materialShareSet.page * 30) ? materialShareSet.page + 1 : materialShareSet.page, count: infoCount}))
        }} onEndReachedThreshold={0}
          keyExtractor={item => String(item.boardId)} showsVerticalScrollIndicator={false}
          ListFooterComponent={loading && <ActivityIndicator />}>
        </FlatList>}
      </View>

      <TouchableOpacity style={[styles.footer, {marginBottom: Platform.OS == 'android' ? 20 + getStatusBarHeight() : 0}]} onPress={()=>
        modalVisible.asyncStorage == null ? navigation.navigate('출산리스트 공유 등록') : setModalVisible(prevState => ({...prevState, open: true}))}>
            <Pencil fill='white'/>
      </TouchableOpacity>

      <Modal animationType="fade" transparent={true} visible={modalVisible.open} statusBarTranslucent={true}
            onRequestClose={() => {
            setModalVisible(!modalVisible)}}>
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <View style={styles.modalContainer2}>
                        <View style={[styles.modalBox, {paddingTop: 15}]}>
                            <Text style={{fontSize: 16, paddingTop: 10}}>작성 중이던 게시글이 존재합니다.</Text>
                            <Text style={{fontSize: 16, paddingTop: 5}}>임시저장된 게시글을 불러오시겠습니까?</Text>
                        </View>
                        <View style={styles.modalBox}>
                            <TouchableOpacity style={styles.modal} onPress={()=>{setModalVisible(prevState => ({...prevState, open: false})), navigation.navigate('출산리스트 공유 등록', '게시글 불러오기')}}>
                              <Text style={{color: 'white', fontSize: 16}}>게시글 불러오기</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.modal, {backgroundColor: 'white', borderWidth: 1, borderColor: '#EEEEEE'}]} onPress={()=>{setModalVisible(prevState => ({...prevState, open: true})), navigation.navigate('출산리스트 공유 등록')}}>
                              <Text style={{color: 'black', fontSize: 16}}>새로 작성하기</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
     </View>
  )
}

export default Talk1