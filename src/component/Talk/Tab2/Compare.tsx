import React, { useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Image } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import Icon from 'react-native-vector-icons/FontAwesome'

import ArrowTop from '../../../../public/assets/svg/Arrow-Top.svg'

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
      borderWidth: 1,
      position: 'absolute',
      bottom: 0,
      width: '100%',
      height: 400,
      zIndex: 800,
      backgroundColor: 'white',
    },
    myList2Header:{
      borderWidth: 1,
      backgroundColor: '#F47A79',
      height: 30,
    },
    myList2Main:{
      borderWidth: 1,
      height: 800,
    },
})
const Talk1Sub = ({navigation, route}) => {

    const DATA = [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: '전체'
        },
    ];

    const [info3, setInfo3] = useState([
        {
          id: '0',
          title: '산모용품 (0/13)',
          icon: require('../../../../public/assets/image/1.png'),
        },
        {
          id: '1',
          title: '수유용품 (0/13)',
          icon: require('../../../../public/assets/image/2.png'),
        },
        {
          id: '2',
          title: '위생용품 (0/13)',
          icon: require('../../../../public/assets/image/3.png'),
        },
        {
          id: '3',
          title: '목욕용품 (0/13)',
          icon: require('../../../../public/assets/image/4.png'),
        },
        {
          id: '4',
          title: '침구류 (0/13)',
          icon: require('../../../../public/assets/image/5.png'),
        },
        {
          id: '5',
          title: '아기의류 (0/13)',
          color: '#FFADAD',
          icon: require('../../../../public/assets/image/6.png'),
        },
        {
          id: '6',
          title: '발육용품 (0/13)',
          icon: require('../../../../public/assets/image/7.png'),
        },
        {
          id: '7',
          title: '가전용품 (0/13)',
          color: '#FFADAD',
          icon: require('../../../../public/assets/image/8.png'),
        },
        {
          id: '8',
          title: '놀이용품 (0/13)',
          icon: require('../../../../public/assets/image/9.png'),
        },
    ]);

    const [list, setList] = useState(Array.from({length: 8}, () => {return false})); // list display

    const List = () => {
        let arr = [];
        info3.map(x => {
            arr.push(
                <>
                    <View style={styles.listMain}>
                        <TouchableOpacity style={styles.arrowBox}
                            onPress={()=>arrow(x.id)}>{list[x.id] ? <Icon name="angle-up" size={22}/> : <Icon name='angle-down' size={22}/>}
                        </TouchableOpacity>
                        <Image source={x.icon}/>
                        <Text style={{fontSize: 16, marginLeft: 8}}>{x.title}</Text>
                    </View>
                    <View style={styles.listMain2}>
                        <View style={styles.filterBox}><Text>품목</Text></View>
                        <View style={styles.filterBox}><Text>브랜드</Text></View>
                        <View style={styles.filterBox}><Text>금액</Text></View>
                    </View>
                </>
            )
        })
        return arr;
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
                  <Text style={{fontSize: 15, fontWeight: '600'}}>닉네임</Text>
                  <Text style={{fontSize: 15}}> 님의 출산준비물</Text>
                </View>
              </View>
            <List />
        </View>
      );

    const renderItem2 = ({ item }) => (
        <View>
          <View style={styles.myList2Header}></View>
          <View style={styles.myList2Main}>
            
          </View>
        </View>
    );

  return (
    <View style={styles.container}>

      <View style={styles.myList}>
        <View style={styles.myListBox}>
          <Text style={{color: 'white', fontWeight: '500', fontSize: 16, marginRight: 5}}>나의 출산준비물</Text>
          <ArrowTop />
        </View>
      </View>

      <View style={styles.myList2}>
        <FlatList data={DATA} renderItem={renderItem2}
            keyExtractor={item => item.id}>
        </FlatList>
        </View>

      
        <FlatList data={DATA} renderItem={renderItem}
            keyExtractor={item => item.id}>
        </FlatList>
    </View>
  )
}

export default Talk1Sub