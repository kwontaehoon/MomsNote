import React, { useState } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import Slick from 'react-native-slick'
import { getStatusBarHeight } from "react-native-status-bar-height"

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        marginTop: getStatusBarHeight(),
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
    footer:{
      height: 56,
      backgroundColor: '#FEA100',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
})
const InquiryDetail = () => {

    const [page, setPage] = useState(0); // 해당 페이지
    console.log('page: ', page);

    const List = () => {
        if(page === 3){
            return(
                <View style={styles.footer}><Text style={{fontSize: 18, fontWeight: '400', color: 'white'}}>시작하기</Text></View>
            )
        }else{
            return(
                <View style={styles.footer}><Text style={{fontSize: 18, fontWeight: '400', color: 'white'}}>다음</Text></View>
            )
        }
    }

  return (
    <View style={styles.container}>
        <View style={styles.header}><Text style={{color: '#757575', fontSize: 16}} onPress={()=>setPage(2)}>건너뛰기</Text></View>
        <View style={styles.main}>
            <Slick showsButtons={false} loop={false} index={page}
            dot={<View style={styles.dot}/>}
            activeDot={<View style={styles.dotActive}/>}
            onScrollBeginDrag	= {()=>{
              console.log('aa');
              console.log(page);
            }}
          
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

export default InquiryDetail