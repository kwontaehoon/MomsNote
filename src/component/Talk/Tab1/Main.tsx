import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Modal, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import DropDownPicker from 'react-native-dropdown-picker'
import moment from 'moment'

import Like from '../../../../public/assets/svg/Like.svg'
import Chat from '../../../../public/assets/svg/Chat.svg'
import Pencil from '../../../../public/assets/svg/pencil.svg'
import axios from 'axios'

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
    paddingLeft: 10,
    paddingRight: 10,
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


const Talk1 = ({navigation}) => {

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


  const [modalVisible, setModalVisible] = useState(false); // 글쓰기 모달
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('1');
  const [items, setItems] = useState([
    {label: '최신순', value: '1'}, {label: '인기순', value: '2'}, {label: '마감임박', value: '3'},
  ]);

  const [filter, setFilter] = useState([true, false, false, false, false, false]);
  const [info, setInfo] = useState([]); // 게시글 목록
  console.log('info: ', info);
  const [refresh, setRefresh] = useState('ㅋㅋ');

  useEffect(()=>{
    console.log('게시글 목록 업데이트');
    const commentInfo = async() => {
        try{
        const response = await axios({
            method: 'post',
            url: 'https://momsnote.net/api/board/list',
            data : { 
              order: 'new',
              count: 5,
              page: 1,
              subcategory: DATA[filter.findIndex(x => x === true)].title
            }
        });
            setInfo(response.data);
        }catch(error){
            console.log('comment axios error');
        }
    } 
    commentInfo();
  }, [refresh, filter]);

  const change = (e) => { // 카테고리 배경색상, 글자 색상 변경
    let arr = Array.from({length: 6}, () => {return false});
    arr[e] = !arr[e];
    setFilter(arr);
  }

  const dayCalculate = (date) => {
    const a = moment().diff(moment(date), 'minute');
    switch(true){
      case moment().diff(moment(date), 'minute') < 60: return <Text style={{color: '#9E9E9E', fontSize: 12}}>{moment().diff(moment(date), 'minute')}분 전</Text>
      case moment().diff(moment(date), 'hour') < 24: return<Text style={{color: '#9E9E9E', fontSize: 12}}>{moment().diff(moment(date), 'hour')}시간 전</Text>
      default: return <Text style={{color: '#9E9E9E', fontSize: 12}}>{moment().diff(moment(date), 'day')}일 전</Text>
    }
  }

  const renderItem = ({ item }) => (
    <View style={{justifyContent: 'center'}}>
      <View style={[styles.headerFilterBox, {backgroundColor: filter[item.id] ? '#FEA100' : 'white'}]}>
        <TouchableOpacity onPress={()=>change(item.id)}>
          <Text style={{color: filter[item.id] ? 'white' : 'black', fontWeight: '400'}}>{item.title}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderItem2 = ({ item }) => (
    <TouchableOpacity style={styles.mainBox} onPress={()=>navigation.navigate('맘스토크 상세내용', {item, refresh, setRefresh})}>
        { item.savedName !== null ? <View style={styles.mainBoxSub}>
          <Image source={{uri: `https://momsnote.s3.ap-northeast-2.amazonaws.com/board/${item.savedName.split('|')[0]}`}} style={{width: 68, height: 68}}/>
          </View> : ''
        }
        <View style={[styles.mainBoxSub, {width: '55%', justifyContent: 'flex-start', paddingTop: 5}]}>
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FlatList data={DATA} renderItem={renderItem}
          keyExtractor={item => item.id} horizontal={true} showsHorizontalScrollIndicator={false}>
        </FlatList>
      </View>
      <View style={styles.header2}>
        <View style={styles.header2FilterBox}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontSize: 16, fontWeight: '600'}}>{info.length}</Text>
            <Text style={{fontSize: 16}}> 건</Text>
          </View>
        </View>
        <View style={[styles.header2FilterBox, {width: '32%'}]}>
          <DropDownPicker open={open} value={value} items={items} style={styles.InputBox} placeholder='최신 순'
              textStyle={{fontSize: 13}} dropDownContainerStyle={{backgroundColor: '#FAFAFA', borderWidth: 1, borderColor: '#F5F5F5'}}
              setOpen={setOpen} setValue={setValue} setItems={setItems} labelStyle={{paddingLeft: 18}}/>
        </View>
      </View>
      <View style={[styles.header3, {display: info.length === 0 ? 'none' : 'flex'}]}>
        <Text style={{color: 'orange', fontWeight: 'bold'}}>[인기글] 5주차 맘 입덧 질문있어요 슬라이딩 ~</Text>
      </View>
      <View style={styles.main}>
        {info.length !== 0 ?
        <FlatList data={info} renderItem={renderItem2} onEndReached={()=>{console.log('afdasfdasfdas')}} onEndReachedThreshold={0.6}
          keyExtractor={item => String(item.boardId)} showsVerticalScrollIndicator={false}>
        </FlatList> : 
        <View style={{marginTop: 50, alignItems: 'center'}}><Text style={{fontSize: 16, color: '#757575'}}>등록된 게시물이 없습니다.</Text></View>}
      </View>
      <TouchableOpacity style={styles.footer} onPress={()=> setModalVisible(!modalVisible)}>
            <Pencil fill='white'/>
      </TouchableOpacity>

      <Modal animationType="fade" transparent={true} visible={modalVisible}
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
                            <TouchableOpacity style={styles.modal}><Text style={{color: 'white', fontSize: 16}}>게시글 불러오기</Text></TouchableOpacity>
                            <TouchableOpacity style={[styles.modal, {backgroundColor: 'white', borderWidth: 1, borderColor: '#EEEEEE'}]} onPress={()=>{setModalVisible(!modalVisible), navigation.navigate('글쓰기', {setRefresh})}}>
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