import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import Slick from 'react-native-slick'
import { getStatusBarHeight } from "react-native-status-bar-height"

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        marginTop: getStatusBarHeight(),
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
        height: '80%',
    },
    main2:{

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
      backgroundColor: '#000',
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
        backgroundColor: 'pink',
        position: 'absolute',
    },
    footer:{
      height: 56,
      backgroundColor: '#FEA100',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
})
const Main = () => {

    const [page, setPage] = useState(0); // 해당 페이지
    console.log('page: ', page);

    const List = () => {
        if(page === 3){
            return(
                <TouchableOpacity style={styles.footer} onPress={() => AsyncStorage.setItem('login', '1')}>
                  <Text style={{fontSize: 18, fontWeight: '400', color: 'white'}}>시작하기</Text>
                </TouchableOpacity>
            )
        }else{
            return(
                <TouchableOpacity style={styles.footer} onPress={()=>setPage(page+1)}>
                  <Text style={{fontSize: 18, fontWeight: '400', color: 'white'}}>다음</Text>
                </TouchableOpacity>
            )
        }
    }

  return (
    <View style={styles.container}>
        <View style={styles.header}><Text style={{color: '#757575', fontSize: 16}} onPress={()=>setPage(3)}>건너뛰기</Text></View>
        <View style={styles.main}>
            <Slick showsButtons={true} loop={false} index={page}
            dot={<View style={styles.dot}/>}
            activeDot={<View style={styles.dotActive}/>}
            renderPagination={(index, total, context)=>{
                setPage(index);
            }}
            nextButton={<View style={styles.nextButton}></View>}
            buttonWrapperStyle={{backgroundColor: 'greenyellow'}}
          
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
            </Slick>
        </View>
        <List/>
    </View>
  )
}

export default Main