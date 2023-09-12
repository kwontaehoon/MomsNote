import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, SafeAreaView, StatusBar, Button } from 'react-native'
import Talk1 from './Tab1/Main'
import Talk2 from './Tab2/Main'

import { useSelector, useDispatch } from 'react-redux'
import { postUser } from '../../Redux/Slices/UserSlice'

const styles = StyleSheet.create({
    container:{
      height: '93%',
      backgroundColor: 'white',
    },
    container2:{

    },
    headerIcon:{
      margin: 5,
    },
    header:{
      height: 60,
      flexDirection: 'row',
    },
    headerBox:{
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: '#EEEEEE',
      borderBottomWidth: 1,
    },
    header2:{
      borderBottomWidth: 1,
      borderColor: '#EEEEEE',
    },
    header2Box:{
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
    },
    header2Box2:{
      height: 50,
    },
    scrollBox:{
      width: 70,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
    },
})
const Main = ({navigation}) => {

    const DATA3 = Array.from({length: 40}, () => {return false}).map((x, index)=>{ return {id: `${index+1}`} });
    const flatListRef = useRef();
    const dispatch = useDispatch();
    const user = useSelector(state => { return state.user.data; });
    console.log('## user: ', user);

    const [filter, setFilter] = useState([true, false]); // filter tab 오늘의편지 or 이 시기에는?
    const [week, setWeek] = useState([]);

    const [selectNumber, setSelectNumber] = useState(0);

    useEffect(()=>{
      dispatch(postUser());
      // const arr = Array.from({length: 40}, () => false);
      // arr[user.week] = true;
      // setWeek(arr);
    }, []);

    useEffect(()=>{
      if(user !== ''){
        const arr = Array.from({length: 40}, () => { return false });
        arr[user.week- 1] = !arr[user.week];
        setWeek(arr);
      }
    }, [user]);

    const List = () => {
        switch(true){
            case filter[0] === true: return <Talk1 navigation={navigation} week={week}/>
            case filter[1] === true: return <Talk2 navigation={navigation} week={week}/>
        }
    }
    const filter_func = (e) => { // filter tab 변경
      let arr = [false, false];
      arr[e] = true;
      setFilter(arr);
    }

    const change = (e) => { // 몇 주차 border, 글자두께 변경
      let arr = Array.from({length: 40}, ()=>{ return false });
      arr[e] = !arr[e];
      setWeek(arr);
    }

    const renderItem = ({ item }) => (
      <TouchableOpacity style={styles.scrollBox} onPress={()=>change(item.id-1)}>
        <Text style={{fontSize: 16, padding: 3, fontWeight: week[item.id-1] ? 'bold' : '400',
        color: week[item.id-1] ? 'black' : '#9E9E9E', borderBottomWidth: week[item.id-1] ? 2 : 0 }}>{item.id}주</Text>
      </TouchableOpacity>
    );

    useEffect( () => {
      if(flatListRef.current){
          flatListRef.current.scrollToIndex({animated: true, index:selectNumber});
      }
  },[selectNumber])

  return (
    <SafeAreaView style={[styles.container, {height: Platform.OS == 'ios' ? null : '93%', flex: Platform.OS === 'ios' ? 1 : null}]}>
      <StatusBar backgroundColor={'white'} />
      <View style={styles.header}>
            <TouchableOpacity style={[styles.headerBox, {width: '50%', borderBottomColor: filter[0] ? 'orange' : '#EEEEEE'}]} onPress={()=>filter_func(0)}>
                <Text style={{fontWeight: 'bold', fontSize: 16, color: filter[0] ? 'orange' : '#BDBDBD'}}>오늘의편지</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.headerBox, {width: '50%', borderBottomColor: filter[1] ? 'orange' : '#EEEEEE'}]} onPress={()=>filter_func(1)}>
                <Text style={{fontWeight: 'bold', fontSize: 16, color: filter[1] ? 'orange' : '#BDBDBD'}}>이 시기에는?</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.header2}>
          <View style={styles.header2Box}><Text style={{fontSize: 16, fontWeight: 'bold'}}>임신주차</Text></View>
          <View style={styles.header2Box2}> 
            <FlatList data={DATA3} renderItem={renderItem}
              ref={flatListRef}
              initialScrollIndex={Number(user?.week)}
              keyExtractor={item => Number(item.id)} horizontal={true} showsHorizontalScrollIndicator={false}>
            </FlatList>
          </View>
        </View>
        <List />
    </SafeAreaView>
  )
}

export default Main