import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState, useRef, useCallback } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import Swiper from 'react-native-swiper'
import { Navigation } from 'react-native-swiper'
import { getStatusBarHeight } from "react-native-status-bar-height"

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        flex: 1,
        padding: 20,
    },
    header:{
        height: '10%',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    header2:{
        height: '15%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    main:{
        height: '80%'
    },
    dot:{
      backgroundColor: '#D9D9D9',
      width: 8,
      height: 8,
      borderRadius: 4,
      marginLeft: 3,
      marginRight: 3,
      marginTop: 3,
      marginBottom: 3
    },
    dotActive:{
      backgroundColor: '#FEA100',
      width: 8,
      height: 8,
      borderRadius: 4,
      marginLeft: 3,
      marginRight: 3,
      marginTop: 3,
      marginBottom: 3
    },
    nextButton:{
        width: 100,
        height: 100,
    },
    footer:{
      height: 56,
      backgroundColor: '#FEA100',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
})
const Main = ({navigation}) => {

    const [page, setPage] = useState(0); // 해당 페이지

    const swiper = useRef(null)

    const List = () => {

        return page == 3 ? (
            <TouchableOpacity style={styles.footer} activeOpacity={1} onPress={()=>navigation.goBack()}>
                <Text style={{fontSize: 18, fontWeight: '400', color: 'white'}}>이전 페이지로</Text>
            </TouchableOpacity> 
        ) : (
            <TouchableOpacity style={styles.footer} onPress={() => swiper.current.scrollTo(page+1)} activeOpacity={1}>
                <Text style={{fontSize: 18, fontWeight: '400', color: 'white'}}>다음</Text>
            </TouchableOpacity> 
        )
    }

  return (
    <View style={styles.container}>
        <View style={styles.main}>
            <Swiper showsButtons={false} loop={false} ref={swiper} onIndexChanged={(e)=>setPage(e)}
            dot={<View style={styles.dot}/>}
            activeDot={<View style={styles.dotActive}/>}
            nextButton={<View style={styles.nextButton}></View>}
        >
                <View testID="Page1" style={styles.header2}>
                    <Text style={{fontSize: 20}}>출산 전, 걱정말고</Text>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>필요한 준비물 미리 준비해요</Text>
                </View>
        
                <View testID="Page2" style={styles.header2}>
                <Text style={{fontSize: 20}}>첫 임신, 궁금한게 많으시죠?</Text>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>맘스노트가 해결해드립니다.</Text>
                </View>

                <View testID="Page3" style={styles.header2}>
                <Text style={{fontSize: 20}}>어떤 브랜드가 좋을까?</Text>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>추천상품을 확인해보세요</Text>
                </View>

                <View testID="Page4" style={styles.header2}>
                <Text style={{fontSize: 20}}>다른 엄마들은 어떻게 준비할까?</Text>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>출산리스트를 비교해 보세요</Text>
                </View>
            </Swiper>
        </View>
        <List/>
    </View>
  )
}

export default Main