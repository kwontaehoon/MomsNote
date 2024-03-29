import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Animated, SafeAreaView, StatusBar } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useSelector, useDispatch } from 'react-redux'
import { postMaterial } from '../../../Redux/Slices/MaterialSlice'
import Modal from './Modal/BrandEditModal'
import Modal2 from './Modal/Confirm'
import Modal3 from '../../Modal/First'
import Modal4 from '../../Materials/Budget/Modal/PriceEdit'
import CoarchMark from './Modal/CoarchMark'
import ArrowTop from '../../../../public/assets/svg/Arrow-Top.svg'
import ArrowBottom from '../../../../public/assets/svg/Arrow-Bottom.svg'
import { postShareList } from '../../../Redux/Slices/ShareListSlice'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const styles = StyleSheet.create({
    container:{
        height: '100%',
        backgroundColor: 'white',
    },
    infoBox:{
        height: 42,
        marginLeft: 7,
    },
    main:{

    }, 
    listHeader:{
        height: 40,
        backgroundColor: '#FEECB3',
        alignItems: 'center',
        justifyContent: 'center',
    },
    arrowBox:{
        position: 'absolute',
        right: 15,
    },
    mainBox4:{
        height: 100,
        justifyContent: 'flex-end',
        borderColor: '#F5F5F5',
        borderBottomWidth: 1,
        paddingBottom: 20,
        paddingLeft: 15,
    },
    likeBox:{
        width: '60%',
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    lookupBox:{
        position: 'absolute',
        right: 20,
        bottom: 20,
    },
    listMain:{
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EEEEEE',
        paddingLeft: 15,
        paddingRight: 15
    },
    listMain2:{
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderColor: '#F5F5F5'
    },
    filterBox:{
        width: '33.4%',
        height: 30,
        alignItems: 'center',
        justifyContent: 'center'
      },
    filterBox2:{
        width: '33.4%',
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    myList:{
        position: 'absolute',
        bottom: 60,
        width: '100%',
        alignItems: 'center',
        zIndex: 999,
    },
    myListBox:{
        width: '90%',
        backgroundColor: '#F47A79',
        height: 60,
        borderRadius: 8,
        elevation: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    myList2:{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 390,
        zIndex: 800,
        backgroundColor: 'white',
    },
    myList2Header:{
        backgroundColor: '#F47A79',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderTopStartRadius: 15,
        borderTopEndRadius: 15,
    },
    myList2Footer:{
        height: 140,
        backgroundColor: 'white',
        paddingTop: 10,
    },
    myList2FooterBox:{
        height: 50,
        justifyContent: 'center',
        paddingLeft: 15,
    },
    budget:{
        position: 'absolute',
        right: 15,
    },
})
const Talk1Sub = ({navigation, route}) => {

    const DATA = [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: '전체'
        },
    ];

    const DATA2 = [
        {
          id: '0',
          title: '산모용품',
          icon: require('../../../../public/assets/image/1.png'),
        },
        {
          id: '1',
          title: '수유용품',
          icon: require('../../../../public/assets/image/2.png'),
        },
        {
          id: '2',
          title: '위생용품',
          icon: require('../../../../public/assets/image/3.png'),
        },
        {
          id: '3',
          title: '목욕용품',
          icon: require('../../../../public/assets/image/4.png'),
        },
        {
          id: '4',
          title: '침구류',
          icon: require('../../../../public/assets/image/5.png'),
        },
        {
          id: '5',
          title: '아기의류',
          color: '#FFADAD',
          icon: require('../../../../public/assets/image/6.png'),
        },
        {
          id: '6',
          title: '외출용품',
          icon: require('../../../../public/assets/image/7.png'),
        },
        {
          id: '7',
          title: '가전용품',
          color: '#FFADAD',
          icon: require('../../../../public/assets/image/8.png'),
        },
        {
          id: '8',
          title: '놀이용품',
          icon: require('../../../../public/assets/image/9.png'),
        },
    ];

    const dispatch = useDispatch();
    const info = useSelector(state => { return state.shareList.data; });
    const material = useSelector(state => { return state.material.data; });
    const [list, setList] = useState(Array.from({length: 9}, () => true)); // 게시글 list display
    const [userList, setUserList] = useState(Array.from({length: 9}, () => true));
    const animation = useRef(new Animated.Value(0)).current;
    const [myList, setMyList] = useState(false);

    const [sumResult, setSumResult] = useState({
      sum: 0,
      exp: 0
    });

    const [modal, setModal] = useState({ // 브랜드 선택 모달
      open: false,
      needsId: null,
      needsBrandId: null,
      needsName: '',
      itemPrice: null,
      flag: ''
    });

    const [modal2, setModal2] = useState({
      open: false,
      content: '',
      flag: ''
    }); // 해당 브랜드로 수정하시겠습니까? 모달

    const [modal3, setModal3] = useState({ // 수정되었습니다 모달
      open: false,
      content: '출산리스트가 수정되었습니다.',
      buttonCount: 1
    });

    const [modal4, setModal4] = useState({ // 가격 수정 모달
      open: false,
      content: null
    })
    const [coarchMarkModal, setCoarchMarkModal] = useState(false); // 코치마크

  useEffect(()=>{
    dispatch(postMaterial({ order: 'need'}));
    dispatch(postShareList({ boardId: route.params.boardId }));
  }, [modal4, modal]);

  useEffect(()=>{
    if(modal.flag == 'edit'){
      setModal3({...modal3, open: true, content: '리스트에 적용되었습니다.', flag: ''});
    }
    dispatch(postMaterial({ order: 'need'})); 
  }, [modal]);

  useEffect(()=>{
    let sum = 0;
    let exp = 0;

    if(material !== '' && material !== '0'){
      material.filter(x=>{
        if(x.id == 0 && x.needsBrandId !== null && x.itemPrice !== null){
          exp += x.itemPrice
        } else {
          sum += x.itemPrice;
        }
      });
    }
    setSumResult(prevState => ({...prevState, sum: sum, exp: exp}));
  }, [material]);

  useEffect(()=>{
    const arr = DATA2.map(x=>{
        if((info.filter(y => (x.title == y.category && y.buyStatus == 1)).length !== 0)){
            return true;
        }else return false;
    }); 
    setList(arr);

    const arr2 = DATA2.map(x=>{
      if((material.filter(y => (x.title == y.category && y.id == 1)).length !== 0)){
          return true;
      }else return false;
  }); 
  setUserList(arr2);
}, [info, material]);


  useEffect(()=>{
    const coarch = async() => {
      const coarchMark = await AsyncStorage.getItem('coarchMarkMaterialList');
      !coarchMark ? setCoarchMarkModal(true) : setCoarchMarkModal(false);
    }
    coarch();
  }, []);

  useEffect(()=>{
    if(modal2.flag == 'edit'){
      setModal3(prevState => ({...prevState, open: true, content: '출산리스트가 수정되었습니다.', buttonCount: 1}));
    }
    dispatch(postMaterial({ order: 'need'})); 
  }, [modal2]);

  const filtering = (e, title) => { // 품목 브랜드 가격 부분 none || flex
    if(title.filter(x => x.category == e).length == 0){
      return(
        <View style={{height: 100, justifyContent: 'center', alignItems: 'center'}}><Text>선택된 품목이 없습니다.</Text></View>
      )
    }else return(
        <View style={styles.listMain2}>
            <View style={styles.filterBox}><Text>품목</Text></View>
            <View style={styles.filterBox}><Text>브랜드</Text></View>
            <View style={styles.filterBox}><Text>금액</Text></View>
        </View>
    )
  }

    const List = () => {
        let arr = [];
        DATA2.map((x, index) => {
            arr.push(
                <>
                    <View style={styles.listMain} key={index}>
                        <TouchableOpacity style={styles.arrowBox}
                            onPress={()=>arrow(x.id)}>{list[x.id] ? <Icon name="angle-up" size={22}/> : <Icon name='angle-down' size={22}/>}
                        </TouchableOpacity>
                        <Image source={x.icon}/>
                        <Text style={{fontSize: 16, marginLeft: 8, fontWeight: '500'}}>{x.title}</Text>
                    </View>
                    <View style={{display: list[index] ? 'flex' : 'none'}}>
                        {filtering(x.title, info)}
                        <List2 title={x.title}/>
                    </View>
                </>
            )
        })
        return arr;
    }

    const List2 = (e) => {
      let arr = [];
      info.filter((x, index)=>{
          if(x.category == e.title && x.buyStatus == 1){
              arr.push(
                   <TouchableOpacity style={styles.listMain2} onLongPress={()=>{
                    if(!x.itemBrand){
                      setModal(prevState => ({...prevState, open: true, needsId: x.needsId, needsBrandId: x.needsBrandId, needsName: x.needsName, itemPrice: x.itemPrice, flag: ''}));
                    }else{
                      setModal2({...modal2, open: true, content: x, flag: ''});
                    }
                   
                    }} delayLongPress={1500} activeOpacity={1} key={index}>
                      <View style={styles.filterBox2}><Text>{x.needsName}</Text></View>
                      <View style={styles.filterBox2}><Text>{x.itemBrand}</Text></View>
                      <View style={styles.filterBox2}>
                        <Text style={{fontWeight: '500'}}>{(x.itemPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>
                        <Text> 원</Text>
                      </View>
                  </TouchableOpacity>
              )
          }
      })
      return arr;
  }

    const List3 = () => {
      let arr = [];
      DATA2.map((x, index) => {
          arr.push(
              <>
                  <View style={styles.listMain} key={index}>
                      <TouchableOpacity style={styles.arrowBox}
                          onPress={()=>arrow(x.id)}>{userList[x.id] ? <Icon name="angle-up" size={22}/> : <Icon name='angle-down' size={22}/>}
                      </TouchableOpacity>
                      <Image source={x.icon}/>
                      <Text style={{fontSize: 16, marginLeft: 8, fontWeight: '500'}}>{x.title}</Text>
                  </View>
                  <View style={{display: userList[index] ? 'flex' : 'none'}}>
                        {filtering(x.title, material)}
                        <List4 title={x.title}/>
                  </View>
              </>
          )
      })
      return arr;
  }

    const List4 = (e) => {
      let arr = [];
      material.filter((x, index)=>{
        if(x.category == e.title && x.deleteStatus == 1 && x.id == 1){
        arr.push(
          <View style={styles.listMain2} key={index}>
              <View style={styles.filterBox2}><Text>{x.needsName}</Text></View>
              <View style={styles.filterBox2}><Text>{x.itemBrand}</Text></View>
              <TouchableOpacity style={styles.filterBox2} onLongPress={()=>(setModal4(prevState => ({...prevState, open: true, content: x})))} delayLongPress={1500} activeOpacity={1}>
                <Text style={{fontWeight: '500'}}>{x.itemPrice == null ? '0' : x.itemPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>
                <Text> 원</Text>
              </TouchableOpacity>
          </View>
        )}
      })
      return arr;
    }

  const opacity_ani = () => {
    Animated.timing(animation, {
        toValue: myList ? 0 : 1,
        useNativeDriver: true,
        duration: 1500,
    }).start();
    // .start(()=>{
    //     Animated.timing(animation, {
    //         toValue: 0,
    //         useNativeDriver: true,
    //         duration: 1500,
    //     }).start();
    // });
  }
  const arrow = (e) => { // arrow 누르면 서브페이지 display
        let arr = [...list];
        arr[e] = !arr[e];
        setList(arr);
  }

  const renderItem = ({ item }) => (
        <View style={styles.main}>
          <View style={styles.listHeader}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontSize: 15, fontWeight: '600'}}>{route.params.nickname}</Text>
              <Text style={{fontSize: 15}}> 님의 출산준비물</Text>
            </View>
          </View>
          <List />
        </View>
  );

    const renderItem2 = ({ item }) => (
      <View style={styles.main}>
        <List3 />
      </View>
    );

  return (
    <SafeAreaProvider>

    <SafeAreaView style={{ backgroundColor: 'white' }}>
        <StatusBar />
    </SafeAreaView>

    {material == '' || material == '0' ? '' : <SafeAreaView style={styles.container}>
      <TouchableOpacity style={[styles.myList, {display: myList ? 'none' : 'flex'}]} onPress={()=>{opacity_ani(), setMyList(!myList)}}>
        <View style={styles.myListBox}>
          <Text style={{color: 'white', fontWeight: '500', fontSize: 16, marginRight: 5}}>나의 출산준비물</Text>
          <ArrowTop />
        </View>
      </TouchableOpacity>

      <Animated.View style={[styles.myList2, {opacity: animation, display: myList ? 'flex' : 'none'}]} >
        <TouchableOpacity style={styles.myList2Header} onPress={()=>{opacity_ani(), setMyList(!myList)}}>
          <Text style={{fontSize: 15, fontWeight: '600', color: 'white'}}>나의 출산준비물</Text>
          <ArrowBottom fill={'white'}/>
        </TouchableOpacity>
        <FlatList data={DATA} renderItem={renderItem2}
            keyExtractor={item => item.id}>
        </FlatList>
        <View style={styles.myList2Footer}>
          <View style={styles.myList2FooterBox}>
            <View style={styles.budget}><Text style={{fontSize: 18, fontWeight: '600'}}>{`${(sumResult.sum + sumResult.exp).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원`}</Text></View>
            <Text style={{fontSize: 18, fontWeight: '600'}}>총 예산</Text>
          </View>
          <View style={[styles.myList2FooterBox, {paddingLeft: 20, height: 25}]}>
            <View style={styles.budget}><Text>{`${(sumResult.sum).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원`}</Text></View>
            <Text style={{color: '#616161'}}>ㄴ 구매금액</Text>
          </View>
          <View style={[styles.myList2FooterBox, {paddingLeft: 20, height: 25}]}>
            <View style={styles.budget}><Text>{`${(sumResult.exp).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원`}</Text></View>
            <Text style={{color: '#616161'}}>ㄴ 구매예정 금액</Text>
          </View>
          <View style={styles.myList2FooterButton}><Text style={{color: 'white', fontWeight: '600', fontSize: 16}}>수정</Text></View>
        </View>
      </Animated.View>

      
        <FlatList data={DATA} renderItem={renderItem}
            keyExtractor={item => item.id}>
        </FlatList>

        <Modal modalVisible2={modal} setModalVisible2={setModal} setModal={setModal3}/>
        <Modal2 modal2={modal2} setModal2={setModal2}/>
        <Modal3 modal={modal3} setModal={setModal3}/>
        <Modal4 modal6={modal4} setModal6={setModal4} setModal7={setModal3} />
        <CoarchMark modal={coarchMarkModal} setModal={setCoarchMarkModal}/>

    </SafeAreaView>}
    </SafeAreaProvider>
  )
}

export default Talk1Sub