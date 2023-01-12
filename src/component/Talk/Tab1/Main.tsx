import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Modal, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import DropDownPicker from 'react-native-dropdown-picker'
import moment from 'moment'
import { Video, AVPlaybackStatus } from 'expo-av';
import { useSelector, useDispatch } from 'react-redux'
import { postBoard } from '../../../Redux/Slices/BoardSlice'
import Swiper from 'react-native-swiper'
import { setBoardRefresh, setBoardCount, setBoardFilter } from '../../../Redux/Slices/BoardSlice'
import { useIsFocused } from '@react-navigation/native'

import Like from '../../../../public/assets/svg/Like.svg'
import Chat from '../../../../public/assets/svg/Chat.svg'
import Pencil from '../../../../public/assets/svg/pencil.svg'
import AsyncStorage from '@react-native-async-storage/async-storage'

const styles = StyleSheet.create({
  container:{
    height: '91%',
    backgroundColor: 'white',
  },
  header:{
    height: '10%',
    backgroundColor: '#F5F5F5',
  },
  headerFilterBox:{
    height: 40,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    margin: 7,
    borderRadius: 20,
    paddingTop: 8,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  header2:{
    height: 50,
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
  },
  header2FilterBox:{
    width: '68%',
    justifyContent: 'center',
    paddingLeft: 20,
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
  slide:{
    height: '100%',
    justifyContent: 'center'
  },
  main:{
    height: '74%',
    paddingLeft: 10,
    paddingRight: 10,
    position: 'relative',
    zIndex: -100,
  },
  mainBox:{
    borderBottomWidth: 1,
    borderColor: '#EEEEEE',
    height: 100,
    alignItems: 'center',
    flexDirection: 'row',
  },
  mainBoxSub:{
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  videoImage:{
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'white',
    zIndex: 999
},
  dateBox:{
    position: 'absolute',
    right: 10,
    top: 50,
  },
  mainBoxSub2:{
    flexDirection: 'row',
    paddingTop: 4,
    alignItems: 'center',
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
      margin: 20,
      backgroundColor: "rgba(0,0,0,0.5)",
      alignItems: "center",
      justifyContent: 'center',
      shadowColor: "#000",
      elevation: 5,
  },
  modalContainer2:{
      width: '80%',
      height: 144,
      backgroundColor: 'white',
      marginBottom: 35,
      borderRadius: 15
  },
  modalBox:{
      height: '50%',
      justifyContent: 'center',
      alignItems: 'center',
  },
  modal:{
      backgroundColor: '#FEA100',
      width: '90%',
      height: 44,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 3,
      marginBottom: 3,
  },
})


const Talk1 = ({navigation, route}:any) => {

  const DATA = [
    {
      id: '0',
      title: '전체'
    },
    {
      id: '1',
      title: '자유게시판'
    },
    {
      id: '2',
      title: '일상이야기'
    },
    {
      id: '3',
      title: '임신정보'
    },
    {
      id: '4',
      title: '고민상담'
    },
    {
      id: '5',
      title: '질문게시판'
    }
  ];


  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const info = useSelector((state:unknown) => { return state.board.data; });
  console.log('info: ', info);
  const boardSet = useSelector(state => { return state.board.refresh; });
  console.log('boardSet: ', boardSet);

  const [modalVisible, setModalVisible] = useState({
    open: false,
    asyncStorage: ''
  }); // 글쓰기 모달
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('1');
  const [items, setItems] = useState([
    {label: '최신 순', value: '1'}, {label: '인기 순', value: '2'}
  ]);

  const [filter, setFilter] = useState([true, false, false, false, false, false]);

  useEffect(()=>{
    dispatch(postBoard(boardSet));
  }, [boardSet]);

  useEffect(()=>{
    const momsTalk = async() => {
      const asyncStorage = await AsyncStorage.getItem('momsTalk');
      
      setModalVisible(prevState => ({...prevState, asyncStorage: asyncStorage}));
    }
    momsTalk();
  }, [isFocused]);

  const change = (e) => { // 카테고리 배경색상, 글자 색상 변경 onpress
    let arr = Array.from({length: 6}, () => {return false});
    arr[e] = !arr[e];
    setFilter(arr);
    dispatch(setBoardRefresh({subcategory: DATA[e].title}));
  }

  const dayCalculate = (date:number) => {
    switch(true){
      case moment().diff(moment(date), 'minute') < 60: return <Text style={{color: '#9E9E9E', fontSize: 12}}>{moment().diff(moment(date), 'minute')}분 전</Text>
      case moment().diff(moment(date), 'hour') < 24: return<Text style={{color: '#9E9E9E', fontSize: 12}}>{moment().diff(moment(date), 'hour')}시간 전</Text>
      default: return <Text style={{color: '#9E9E9E', fontSize: 12}}>{moment().diff(moment(date), 'day')}일 전</Text>
    }
  }

  const ImageBox = ({item}:any) => {
    const arr:string[] = [];
    const a = (item.split('|')).filter((x:string) => { if(x.charAt(x.length-1) === '4'){ arr.push(x); }else return x;});
    const infoFiltering = [...arr, ...a];

    if(infoFiltering[0].charAt(infoFiltering[0].length-1) == '4'){
      return(
        <View style={styles.mainBoxSub}>
          <View style={styles.videoImage}><Icon name='play' size={17} style={{color: 'white'}}/></View>
          <Video source={{uri: `https://momsnote.s3.ap-northeast-2.amazonaws.com/board/${infoFiltering[0]}`}} style={{width: 68, height: 68}} resizeMode='cover'/>
        </View>
      )
    }else{
      return(
      <View style={styles.mainBoxSub}>
          <Image source={{uri: `https://momsnote.s3.ap-northeast-2.amazonaws.com/board/${item.split('|')[0]}`}} style={{width: 68, height: 68}}/>
      </View>
      )
    }
  }

  const filtering = (e) => {
    console.log('e: ', e.label == '인기 순');
    e.label == '인기 순' ? dispatch(setBoardFilter({filter: 'best'})) : dispatch(setBoardFilter({filter: 'new'}))
  }


  const renderItem = ({ item }:any) => (
    <View style={{justifyContent: 'center'}}>
      <View style={[styles.headerFilterBox, {backgroundColor: filter[item.id] ? '#FEA100' : 'white'}]}>
        <TouchableOpacity onPress={()=>change(item.id)}>
          <Text style={{color: filter[item.id] ? 'white' : 'black', fontWeight: '400'}}>{item.title}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderItem2 = ({ item }:any) => (
    <TouchableOpacity style={styles.mainBox} onPress={()=>navigation.navigate('맘스토크 상세내용', {item})}>
        { item.savedName == null ? '' : <ImageBox item={item.savedName}/>  }
        <View style={[styles.mainBoxSub, {paddingTop: 5, width: '65%', alignItems: 'flex-start'}]}>
          <Text style={{fontSize: 15, paddingTop: 2}}>{item.title} </Text>
          <View style={styles.mainBoxSub2}>
            <Text style={{fontSize: 13, color: '#9E9E9E'}}>{item.nickname} </Text>
            <Like width={12} height={17} fill='#9E9E9E'/>
            <Text style={{color: '#9E9E9E'}}> {item.recommend}  </Text>
            <Chat width={12} height={18} fill='#9E9E9E'/>
            <Text style={{fontSize: 13, color: '#9E9E9E'}}> {item.commentsCount}</Text>
          </View>
        </View>
        <View style={[styles.dateBox, {justifyContent: 'center', alignItems: 'flex-end'}]}>
         {dayCalculate(item.boardDate)}
        </View>
    </TouchableOpacity>
  ); 

  return info == '' && info == undefined ? <View></View> : (
    <View style={styles.container}>
      <View style={styles.header}>
        <FlatList data={DATA} renderItem={renderItem}
          keyExtractor={item => item.id} horizontal={true} showsHorizontalScrollIndicator={false}>
        </FlatList>
      </View>
      <View style={styles.header2}>
        <View style={styles.header2FilterBox}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontSize: 16, fontWeight: '600'}}>{info == undefined ?  0 : info.length}</Text>
            <Text style={{fontSize: 16}}> 건</Text>
          </View>
        </View>
        <View style={[styles.header2FilterBox, {width: '32%'}]}>
        <DropDownPicker open={open} value={value} items={items} style={styles.InputBox} placeholder='최신 순' onSelectItem={(e)=>filtering(e)}
              textStyle={{fontSize: 13}} dropDownContainerStyle={{backgroundColor: 'white', borderColor: 'white'}}
              setOpen={setOpen} setValue={setValue} setItems={setItems} labelStyle={{paddingLeft: 18}}/>
        </View>
      </View>

      <View style={[styles.header3, {display: info == undefined || info == '' ? 'none' : 'flex'}]}>
          <Swiper horizontal={false}
          autoplay={true}
          autoplayTimeout={4.5}
          showsPagination={false}
          >
          <View style={styles.slide}>
            <Text style={{color: 'orange', fontWeight: 'bold'}}>[인기글] 5주차 맘 입덧 질문있어요 슬라이딩 ~</Text>
          </View>
          <View style={styles.slide}>
            <Text style={{color: 'orange', fontWeight: 'bold'}}>[인기글] 임신 7주차 병원 방문시기</Text>
          </View>
          <View style={styles.slide}>
            <Text style={{color: 'orange', fontWeight: 'bold'}}>[인기글] 임신확인서 받았어요!!</Text>
          </View>
        </Swiper>
      </View>

      <View style={styles.main}>
        {info == '' || info == undefined ?
        <View style={{marginTop: 50, alignItems: 'center'}}><Text style={{fontSize: 16, color: '#757575'}}>등록된 게시물이 없습니다.</Text></View>
        :
        <FlatList data={info} renderItem={renderItem2} onEndReached={()=>{
          console.log('데이터받자');
          dispatch(setBoardCount({count: boardSet.page + 1}));
        }} onEndReachedThreshold={0}
          keyExtractor={item => String(item.boardId)} showsVerticalScrollIndicator={false}>
        </FlatList>
        }
      </View>
      <TouchableOpacity style={styles.footer} onPress={()=>
        modalVisible.asyncStorage == null ? navigation.navigate('글쓰기') : setModalVisible(prevState => ({...prevState, open: true}))
        }>
            <Pencil fill={'red'}/>
      </TouchableOpacity>

      <Modal animationType="fade" transparent={true} visible={modalVisible.open}
            onRequestClose={() => {
            setModalVisible(!modalVisible)}}>
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <View style={[styles.modalContainer2, {height: 220}]}>
                        <View style={styles.modalBox}>
                            <Text style={{fontSize: 16, paddingTop: 10}}>작성 중이던 게시글이 존재합니다.</Text>
                            <Text style={{fontSize: 16, paddingTop: 5}}>임시저장된 게시글을 불러오시겠습니까?</Text>
                        </View>
                        <View style={styles.modalBox}>
                            <TouchableOpacity style={styles.modal} onPress={()=>{setModalVisible(prevState => ({...prevState, open: false})), navigation.navigate('글쓰기', '게시글 불러오기')}}>
                              <Text style={{color: 'white', fontSize: 16}}>게시글 불러오기</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.modal, {backgroundColor: 'white', borderWidth: 1, borderColor: '#EEEEEE'}]} onPress={()=>{setModalVisible(prevState => ({...prevState, open: false})), navigation.navigate('글쓰기', '새로 작성하기')}}>
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