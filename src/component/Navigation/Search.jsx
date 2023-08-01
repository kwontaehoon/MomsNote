import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, SafeAreaView, Image, StatusBar } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import axios from 'axios'
import moment from 'moment'
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Modal from './Modal/DotModal'
import Modal2 from './Modal/CommentDelete'

import Back from '../../../public/assets/svg/Back.svg'
import Search from '../../../public/assets/svg/Search.svg'
import Arrow from '../../../public/assets/svg/Arrow-Right.svg'
import Chat from '../../../public/assets/svg/Chat.svg'
import Like from '../../../public/assets/svg/Like.svg'
import More from '../../../public/assets/svg/More.svg'

import Q from '../../../public/assets/svg/Q.svg'

const styles = StyleSheet.create({
  container: {
    height: '87%',
    marginTop: Platform.OS == 'ios' ? 0 : getStatusBarHeight(),
  },
  header: {
    height: 80,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  searchIconBox: {
    position: 'absolute',
    left: 15,
    top: 10,
  },
  textInput: {
    backgroundColor: '#F5F5F5',
    marginLeft: 20,
    width: '90%',
    height: 45,
    paddingLeft: 50,
    justifyContent: 'center',
  },
  main: {
    backgroundColor: 'white',
  },
  titleBox: {
    padding: 15,
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  arrowBox: {
    position: 'absolute',
    right: 10,
  },
  momstalk: {
    height: 80,
    borderTopWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: '#F5F5F5',
  },
  mainBox: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  profile: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 5,
  },
  profile2: {
    width: 44,
    height: 44,
    marginRight: 10,
  },
  dateBox: {
    position: 'absolute',
    right: 0,
    bottom: 20,
  },
  dotBox: {
    position: 'absolute',
    right: 0,
    top: 20,
  },
  notBox: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qna: {
    borderBottomWidth: 1,
    borderColor: '#F5F5F5',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 15,
    paddingTop: 25,
    paddingBottom: 25
  },
  qnaAnswerBox: {
    borderBottomWidth: 1,
    borderColor: '#F5F5F5',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 15,
},
  dateBox2: {
    flex: 1,
    display: 'flex',
    alignItems: 'flex-end',
    marginLeft: 10
  },
})

const Main = ({ navigation }) => {

  const DATA = [
    {
      id: '0',
      title: '전체'
    }
  ];

  const [search, setSearch] = useState('');

  const [momsSearch, setMomsSearch] = useState();
  const [materialSearch, setMaterialSearch] = useState();
  const [commentSearch, setCommentSearch] = useState();
  console.log('commentSearch: ', commentSearch);
  const [experienceSearch, setExperienceSearch] = useState();
  const [guideSearch, setGuideSearch] = useState();
  const [eventSearch, setEventSearch] = useState();
  const [governmentSearch, setGovernmentSearch] = useState();
  const [qnaSearch, setQnaSearch] = useState();
  const [qnaFilter, setQnaFilter] = useState([]);

  const [refreshing, setRefreshing] = useState(false);

  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);

  useEffect(() => {
    const boardSearch = async () => {
      try {
        const response = await axios({
          method: 'post',
          url: 'https://momsnote.net/api/search/board',
          headers: {
            'Content-Type': 'application/json'
          },
          data: { keyword: search }
        });
        setMomsSearch(response.data);
      } catch (error) {
        console.log('boardSearch axios error', error);
        setMomsSearch(undefined);
      }
    }
    boardSearch();
  }, [search]);

  useEffect(() => {
    const materialSearch = async () => {
      try {
        const response = await axios({
          method: 'post',
          url: 'https://momsnote.net/api/search/needs',
          headers: {
            'Content-Type': 'application/json'
          },
          data: { keyword: search }
        });
        setMaterialSearch(response.data);
      } catch (error) {
        console.log('materialSerach axios error', error);
        setMaterialSearch(undefined);
      }
    }
    materialSearch();
  }, [search]);

  useEffect(() => {
    const experienceSearch = async () => {
      try {
        const response = await axios({
          method: 'post',
          url: 'https://momsnote.net/api/search/comments',
          headers: {
            'Content-Type': 'application/json'
          },
          data: { keyword: search }
        });
        setCommentSearch(response.data);
      } catch (error) {
        console.log('commentSearch axios error', error);
        setCommentSearch(undefined);
      }
    }
    experienceSearch();
  }, [search]);

  useEffect(() => {
    const commentSearch = async () => {
      try {
        const response = await axios({
          method: 'post',
          url: 'https://momsnote.net/api/search/experience',
          headers: {
            'Content-Type': 'application/json'
          },
          data: { keyword: search }
        });
        console.log('experienceSearch: ', response.data);
        setExperienceSearch(response.data);
      } catch (error) {
        console.log('experienceSearch axios error', error);
        setExperienceSearch(undefined);
      }
    }
    commentSearch();
  }, [search]);

  useEffect(() => {
    const guideSearch = async () => {
      try {
        const response = await axios({
          method: 'post',
          url: 'https://momsnote.net/api/search/guide/list',
          headers: {
            'Content-Type': 'application/json'
          },
          data: { keyword: search }
        });
        console.log('guideSearch: ', response.data);
        setGuideSearch(response.data);
      } catch (error) {
        console.log('guideSearch axios error', error);
        setGuideSearch(undefined);
      }
    }
    guideSearch();
  }, [search]);

  useEffect(() => {
    const eventSearch = async () => {
      try {
        const response = await axios({
          method: 'post',
          url: 'https://momsnote.net/api/search/event',
          headers: {
            'Content-Type': 'application/json'
          },
          data: { keyword: search }
        });
        console.log('eventSearch: ', response.data);
        setEventSearch(response.data);
      } catch (error) {
        console.log('eventSearch axios error', error);
        setEventSearch(undefined);
      }
    }
    eventSearch();
  }, [search]);

  useEffect(() => {
    const governmentSearch = async () => {
      try {
        const response = await axios({
          method: 'post',
          url: 'https://momsnote.net/api/search/support',
          headers: {
            'Content-Type': 'application/json'
          },
          data: { keyword: search }
        });
        console.log('governmentSearch: ', response.data);
        setGovernmentSearch(response.data);
      } catch (error) {
        console.log('governmentSearch axios error', error);
        setGovernmentSearch(undefined);
      }
    }
    governmentSearch();
  }, [search]);

  useEffect(() => {
    const qnaSearch = async () => {
      try {
        const response = await axios({
          method: 'post',
          url: 'https://momsnote.net/api/search/qna',
          headers: {
            'Content-Type': 'application/json'
          },
          data: { keyword: search }
        });
        console.log('qnaSearch: ', response.data);
        setQnaSearch(response.data);
        setQnaFilter(Array.from({ length: response?.data?.length }, () => { return false }));
      } catch (error) {
        console.log('qnaSearch axios error', error);
        setQnaSearch(undefined);
      }
    }
    qnaSearch();
  }, [search]);


  const dayCalculate = (date) => {
    switch (true) {
      case moment().diff(moment(date), 'minute') < 60: return <Text style={{ color: '#9E9E9E', fontSize: 12 }}>{moment().diff(moment(date), 'minute')}분 전</Text>
      case moment().diff(moment(date), 'hour') < 24: return <Text style={{ color: '#9E9E9E', fontSize: 12 }}>{moment().diff(moment(date), 'hour')}시간 전</Text>
      default: return <Text style={{ color: '#9E9E9E', fontSize: 12 }}>{moment().diff(moment(date), 'day')}일 전</Text>
    }
  }

  const dayCalculate2 = (date) => {
    switch (true) {
      case moment().diff(moment(date), 'minute') > 60: return <Text style={{ color: '#9E9E9E', fontSize: 12 }}>{moment(date).diff(moment(), 'minute')}분 전</Text>
      case moment().diff(moment(date), 'hour') > 24: return <Text style={{ color: '#9E9E9E', fontSize: 12 }}>{moment(date).diff(moment(), 'hour')}시간 전</Text>
      default: return <Text style={{ color: '#9E9E9E', fontSize: 12 }}>{moment(date).diff(moment(), 'day')}일 전</Text>
    }
  }

  const onRefreshing = async () => {
    if (!refreshing) {
      await setRefreshing(true);
      setRefreshing(false);
    }
  }

  const dateFilter = (item) => {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    return (<Text>{`${item.eventStartDate.split('-')[1]}.${item.eventStartDate.split('-')[2]}(${days[moment(item.eventStartDate).day()]})`} ~ {`${item.eventEndDate.split('-')[1]}.${item.eventEndDate.split('-')[2]}(${days[moment(item.eventEndDate).day()]})`}</Text>)
  }

  const MomsTalk = () => {
    let arr = [];
    momsSearch?.filter((x, index) => {
      arr.push(
        <TouchableOpacity style={styles.momstalk} key={index} onPress={() => navigation.navigate('맘스토크 상세내용', { item: x })}>
          <View style={styles.dateBox}>
            <Text style={{ fontSize: 12, color: '#9E9E9E' }}>{dayCalculate(x.boardDate)}</Text>
          </View>

          <View>
            <Text>{x.title}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
              <Text style={{ fontSize: 13, color: '#9E9E9E' }}>{x.nickname} </Text>
              <Like width={16} height={16} fill='#9E9E9E' />
              <Text style={{ fontSize: 13, color: '#9E9E9E' }}> {x.recommend} </Text>
              <Chat width={16} height={16} fill='#9E9E9E' />
              <Text style={{ fontSize: 13, color: '#9E9E9E' }}> {x.commentsCount} </Text>
            </View>
          </View>

        </TouchableOpacity>
      )
    })
    return arr;
  }

  const MaterialShare = () => {
    let arr = [];
    materialSearch?.filter((x, index) => {
      arr.push(
        <TouchableOpacity style={styles.momstalk} key={index} onPress={() => navigation.navigate('출산리스트 공유 상세내용', x)}>
          <View style={styles.dateBox}>
            <Text style={{ fontSize: 13, color: '#9E9E9E' }}>{dayCalculate(x.boardDate)}</Text>
          </View>

          <View>
            <Text>{x.title}</Text>
            <View style={{ flexDirection: 'row', marginTop: 4 }}>
              <Text style={{ fontSize: 13, color: '#9E9E9E' }}>{x.nickname}</Text>
              <Like height={17} />
              <Text style={{ fontSize: 13, color: '#9E9E9E' }}> {x.recommend}</Text>
              <Chat height={17} />
              <Text style={{ fontSize: 13, color: '#9E9E9E' }}> {x.commentsCount}</Text>
            </View>
          </View>

        </TouchableOpacity>
      )
    })
    return arr;
  }

  const Comment = () => {
    let arr = [];
    commentSearch?.filter((x, index) => {
      arr.push(
        <TouchableOpacity style={styles.momstalk} key={index} onPress={() => navigation.navigate('맘스토크 상세내용', {item: x})}>
          <TouchableOpacity style={styles.dotBox} onPress={() => setModal(!modal)}><More /></TouchableOpacity>
          <Image source={{ uri: `https://momsnote.s3.ap-northeast-2.amazonaws.com/profile/${x.profileImage}` }} style={styles.profile} />
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 3 }}>
              <Text style={{ fontWeight: '600' }}>{x.nickname}</Text>
              <Text style={{ marginLeft: 5 }}>{dayCalculate(x.commentsDate)}</Text>
            </View>
            <Text>{x.contents}</Text>
          </View>
        </TouchableOpacity>
      )
    })
    return arr;
  }
  const Experience = () => {
    let arr = [];
    experienceSearch?.filter((x, index) => {
      arr.push(
        <TouchableOpacity style={styles.momstalk} key={index} onPress={() => navigation.navigate('체험단 상세페이지', x)}>
          <View style={styles.dateBox}>{dayCalculate2(x.applicationEndDate)}</View>
          <View style={styles.profile2}>
            {x.savedName == null ? '' : <Image source={{ uri: `https://momsnote.s3.ap-northeast-2.amazonaws.com/board/${x.savedName.split('|')[0]}` }} style={{ width: '100%', height: '100%' }} />}
          </View>
          <View>
            <Text style={{ fontSize: 15, marginBottom: 3 }}>{x.title}</Text>
            <Text style={{ fontSize: 13 }}>모집인원 {x.appCount} / {x.maxPeople}</Text>
          </View>
        </TouchableOpacity>
      )
    })
    return arr;
  }

  const Guide = () => {
    let arr = [];
    guideSearch?.filter((x, index) => {
      arr.push(
        <TouchableOpacity style={[styles.momstalk]} key={index} onPress={() => navigation.navigate('맘스가이드 상세내용', x)}>
          <View style={styles.profile2}>
            {x.savedName == null ? '' : <Image source={{ uri: `https://momsnote.s3.ap-northeast-2.amazonaws.com/board/${x.savedName.split('|')[0]}` }} style={{ width: '100%', height: '100%' }} />}
          </View>
          <View>
            <Text style={{ fontSize: 15, marginBottom: 3 }}>{x.title}</Text>
          </View>
        </TouchableOpacity>
      )
    })
    return arr;
  }

  const Event = () => {
    let arr = [];
    eventSearch?.filter((x, index) => {
      arr.push(
        <TouchableOpacity style={styles.momstalk} key={index} onPress={() => navigation.navigate('행사정보 상세페이지', x)}>
          <Text style={{ fontWeight: '500' }} numberOfLines={1} ellipsizeMode='tail'>{x.title}</Text>
          <View style={styles.dateBox2}>{dateFilter(x)}</View>
        </TouchableOpacity>
      )
    })
    return arr;
  }

  const Government = () => {
    let arr = [];
    governmentSearch?.filter((x, index) => {
      arr.push(
        <TouchableOpacity style={styles.momstalk} key={index} onPress={() => navigation.navigate('정부지원혜택 상세내용', x)}>
          <Text style={{ fontSize: 15, marginBottom: 3 }}>{x.title}</Text>
        </TouchableOpacity>
      )
    })
    return arr;
  }

  const Qna = () => {
    let arr = [];
    qnaSearch?.filter((x, index) => {
      arr.push(
        <View>
          <TouchableOpacity style={styles.momstalk} key={index} onPress={()=>{
            let arr = [...qnaFilter];
            arr[index] = !arr[index];
            setQnaFilter(arr);
          }}>
            {qnaFilter[index] ? <Q fill='black' /> : <Q fill='#BDBDBD' />}
            <Text style={{ paddingLeft: 10 }}>{x.qnaQ}</Text>
          </TouchableOpacity>
          <View style={[styles.qnaAnswerBox, { padding: 15, display: qnaFilter[index] ? 'flex' : 'none' }]}>
            <Text>{x.qnaA}</Text>
          </View>
        </View>
      )
    })
    return arr;
  }

  const renderItem = ({ item }) => (
    <View>
      <TouchableOpacity style={styles.titleBox} onPress={() => navigation.navigate('맘스 톡 서치', momsSearch)}>
        <View style={styles.arrowBox}><Arrow fill='black' height={20} /></View>
        <Text style={{ fontWeight: '600' }}>맘스 톡 {momsSearch !== undefined ? momsSearch?.length : 0}건</Text>
      </TouchableOpacity>
      <View style={styles.mainBox}>
        {momsSearch?.length !== 0 ? <MomsTalk /> :
          <View style={styles.notBox}><Text style={{ fontSize: 16, color: '#9E9E9E' }}>검색결과가 없습니다.</Text></View>}
      </View>
      <TouchableOpacity style={styles.titleBox} onPress={() => navigation.navigate('출산준비물 공유 서치', materialSearch)}>
        <View style={styles.arrowBox}><Arrow fill='black' height={20} /></View>
        <Text style={{ fontWeight: '600' }}>출산준비물 공유 {materialSearch !== undefined ? materialSearch?.length : 0}건</Text>
      </TouchableOpacity>
      <View style={styles.mainBox}>
        {materialSearch?.length !== 0 ? <MaterialShare /> :
          <View style={styles.notBox}><Text style={{ fontSize: 16, color: '#9E9E9E' }}>검색결과가 없습니다.</Text></View>}
      </View>
      <TouchableOpacity style={styles.titleBox} onPress={() => navigation.navigate('댓글 서치', commentSearch)}>
        <View style={styles.arrowBox}><Arrow fill='black' height={20} /></View>
        <Text style={{ fontWeight: '600' }}>댓글 {commentSearch !== undefined ? commentSearch?.length : 0}건</Text>
      </TouchableOpacity>
      <View style={styles.mainBox}>
        {commentSearch?.length !== 0 ? <Comment /> :
          <View style={styles.notBox}><Text style={{ fontSize: 16, color: '#9E9E9E' }}>검색결과가 없습니다.</Text></View>}
      </View>
      <TouchableOpacity style={styles.titleBox} onPress={() => navigation.navigate('체험단 서치', experienceSearch)}>
        <View style={styles.arrowBox}><Arrow fill='black' height={20} /></View>
        <Text style={{ fontWeight: '600' }}>체험단 {experienceSearch !== undefined ? experienceSearch?.length : 0}건</Text>
      </TouchableOpacity>
      <View style={styles.mainBox}>
        {experienceSearch?.length !== 0 ? <Experience /> :
          <View style={styles.notBox}><Text style={{ fontSize: 16, color: '#9E9E9E' }}>검색결과가 없습니다.</Text></View>}
      </View>
      <TouchableOpacity style={styles.titleBox} onPress={() => navigation.navigate('맘스가이드 서치', guideSearch)}>
        <View style={styles.arrowBox}><Arrow fill='black' height={20} /></View>
        <Text style={{ fontWeight: '600' }}>맘스가이드 {guideSearch !== undefined ? guideSearch?.length : 0}건</Text>
      </TouchableOpacity>
      <View style={styles.mainBox}>
        {guideSearch?.length !== 0 ? <Guide /> :
          <View style={styles.notBox}><Text style={{ fontSize: 16, color: '#9E9E9E' }}>검색결과가 없습니다.</Text></View>}
      </View>
      <TouchableOpacity style={styles.titleBox} onPress={() => navigation.navigate('행사정보 서치', eventSearch)}>
        <View style={styles.arrowBox}><Arrow fill='black' height={20} /></View>
        <Text style={{ fontWeight: '600' }}>행사정보 {eventSearch !== undefined ? eventSearch?.length : 0}건</Text>
      </TouchableOpacity>
      <View style={styles.mainBox}>
        {eventSearch?.length !== 0 ? <Event /> :
          <View style={styles.notBox}><Text style={{ fontSize: 16, color: '#9E9E9E' }}>검색결과가 없습니다.</Text></View>}
      </View>
      <TouchableOpacity style={styles.titleBox} onPress={() => navigation.navigate('정부지원혜택 서치', governmentSearch)}>
        <View style={styles.arrowBox}><Arrow fill='black' height={20} /></View>
        <Text style={{ fontWeight: '600' }}>정부지원헤택 {governmentSearch !== undefined ? governmentSearch?.length : 0}건</Text>
      </TouchableOpacity>
      <View style={styles.mainBox}>
        {governmentSearch?.length !== 0 ? <Government /> :
          <View style={styles.notBox}><Text style={{ fontSize: 16, color: '#9E9E9E' }}>검색결과가 없습니다.</Text></View>}
      </View>
      <TouchableOpacity style={styles.titleBox} onPress={() => navigation.navigate('Q&A 서치', qnaSearch)}>
        <View style={styles.arrowBox} ><Arrow fill='black' height={20} /></View>
        <Text style={{ fontWeight: '600' }}>Q&A {qnaSearch !== undefined ? qnaSearch?.length : 0}건</Text>
      </TouchableOpacity>
      <View style={styles.mainBox}>
        {qnaSearch?.length !== 0 ? <Qna /> :
          <View style={styles.notBox}><Text style={{ fontSize: 16, color: '#9E9E9E' }}>검색결과가 없습니다.</Text></View>}
      </View>
    </View>
  );



  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ backgroundColor: 'white' }}>
        <StatusBar />
      </SafeAreaView>
      <SafeAreaView style={styles.container}>

        <Modal modal={modal} setModal={setModal} modal2={modal2} setModal2={setModal2} />
        <Modal2 modal7={modal2} setModal7={setModal2} />

        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}><Back /></TouchableOpacity>
          <View style={styles.textInput}>
            <View style={styles.searchIconBox}><Search width={22} /></View>
            <TextInput placeholder='검색하실 단어를 입력하세요.' onChangeText={(e) => setSearch(e)}></TextInput>
            <TouchableOpacity onPress={() => navigation.navigate('맘스 톡')}></TouchableOpacity>
          </View>
        </View>
        <View style={styles.main}>
          {experienceSearch !== undefined && momsSearch !== undefined && materialSearch !== undefined && commentSearch !== undefined ?
            <FlatList data={DATA} renderItem={renderItem} showsVerticalScrollIndicator={false}
              onRefresh={onRefreshing} refreshing={refreshing}
              keyExtractor={item => item.title}>
            </FlatList>
            : ''
          }
        </View>

      </SafeAreaView>

    </SafeAreaProvider>
  )
}

export default Main