import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState, useRef } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import Swiper from 'react-native-swiper'
import { getStatusBarHeight } from "react-native-status-bar-height"

import OnBoarding1 from '../../../public/assets/svg/onBoarding1.svg'
import OnBoarding2 from '../../../public/assets/svg/onBoarding2.svg'
import OnBoarding3 from '../../../public/assets/svg/onBoarding3.svg'

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        marginTop: getStatusBarHeight(),
        flex: 1,
    },
    main:{
        height: '80%',
    },
    main2:{
        height: '100%',
    },
    header:{
        height: '10%',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 20
    },
    headerBox:{
        height: '15%',
        alignItems: 'center'
    },
    main2Box:{
        height: '75%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    main2ImageBox: {
        maxWidth: 200,
        height: '100%'
    },
    image:{
        width: '100%',
        height: '100%'
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
      alignItems: 'center',
      justifyContent: 'center',
    },
    button:{
        width: '90%',
        height: 56,
        backgroundColor: '#FEA100',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    }
})
const Main = ({navigation}) => {

    const [page, setPage] = useState(0); // 해당 페이지

    const swiper = useRef(null);

    const start = async() => {
        await AsyncStorage.setItem('login', '1');
        navigation.navigate('로그인 페이지', '로그인');
    }

    const List = () => {

        return page == 2 ? (
            <View style={styles.footer}>
                <TouchableOpacity style={styles.button} activeOpacity={1} onPress={start}>
                    <Text style={{fontSize: 18, fontWeight: '400', color: 'white'}}>시작하기</Text>
                </TouchableOpacity>
            </View> 
        ) : (
            <View style={styles.footer}>
                <TouchableOpacity style={styles.button} onPress={() => {swiper.current.scrollBy(1); setPage(page + 1)}} activeOpacity={1}>
                    <Text style={{fontSize: 18, fontWeight: '400', color: 'white'}}>다음</Text>
                </TouchableOpacity>
            </View> 
        )
    }

  return (
    <View style={styles.container}>
        <View style={styles.header}><Text style={{color: '#757575', fontSize: 16}} onPress={start}>건너뛰기</Text></View>
        <View style={styles.main}>
            <Swiper showsButtons={false} loop={false} ref={swiper} onIndexChanged={page => setTimeout(()=>{setPage(page)}, 200)}
            dot={<View style={styles.dot}/>}
            activeDot={<View style={styles.dotActive}/>}
            nextButton={<View style={styles.nextButton}></View>}
        >
                <View testID="Page1" style={styles.main2}>
                    <View style={styles.headerBox}>
                        <Text style={{fontSize: 20}}>출산 전, 걱정말고</Text>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>필요한 준비물 미리 준비해요</Text>
                    </View>
                    <View style={styles.main2Box}>
                        <Image source={require('../../../public/assets/image/onboarding1.png')} style={styles.main2ImageBox}/>   
                    </View>
                </View>

                <View testID="Page1" style={styles.main2}>
                    <View style={styles.headerBox}>
                        <Text style={{fontSize: 20}}>첫 임신, 궁금한게 많으시죠?</Text>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>맘스노트가 해결해드립니다</Text>
                    </View>
                    <View style={styles.main2Box}>
                        <Image source={require('../../../public/assets/image/onboarding2.png')} style={styles.main2ImageBox}/>   
                    </View>
                </View>
        
                <View testID="Page2" style={styles.main2}>
                    <View style={styles.headerBox}>
                        <Text style={{fontSize: 20}}>어떤 브랜드가 좋을까?</Text>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>추천상품을 확인해 보세요</Text>
                    </View>
                    <View style={styles.main2Box}>
                        <Image source={require('../../../public/assets/image/onboarding3.png')} style={styles.main2ImageBox}/>   
                    </View>
                </View>

                <View testID="Page3" style={styles.main2}>
                    <View style={styles.headerBox}>
                        <Text style={{fontSize: 20}}>다른 엄마들은 어떻게 준비할까?</Text>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>출산리스트를 비교해 보세요</Text>
                    </View>
                    <View style={styles.main2Box}>
                        <Image source={require('../../../public/assets/image/onboarding4.png')} style={styles.main2ImageBox}/>   
                    </View>
                </View>

            </Swiper>
        </View>
        <List/>
    </View>
  )
}

export default Main