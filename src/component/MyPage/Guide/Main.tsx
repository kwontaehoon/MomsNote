import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState, useRef, useCallback } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import Swiper from 'react-native-swiper'

import OnBoarding1 from '../../../../public/assets/svg/onBoarding1.svg'
import OnBoarding2 from '../../../../public/assets/svg/onBoarding2.svg'
import OnBoarding3 from '../../../../public/assets/svg/onBoarding3.svg'

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        height: '100%',
    },
    main:{
        height: '80%',
        paddingTop: 30
    },
    main2:{
        height: '100%',
    },
    headerBox:{
        height: '15%',
        alignItems: 'center',
    },
    main2Box:{
        height: '75%',
        alignItems: 'center',
        justifyContent: 'center',
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
      height: 56,
      backgroundColor: '#FEA100',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
})
const Main = ({navigation}) => {

  return (
    <View style={styles.container}>
        <View style={styles.main}>
            <Swiper showsButtons={false} loop={false}
            loadMinimal={true}
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
                        <OnBoarding1 style={styles.image}/>
                    </View>
                </View>
        
                <View testID="Page2" style={styles.main2}>
                    <View style={styles.headerBox}>
                        <Text style={{fontSize: 20}}>어떤 브랜드가 좋을까?</Text>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>추천상품을 확인해 보세요</Text>
                    </View>
                    <View style={styles.main2Box}>
                        <OnBoarding2 style={styles.image}/>
                    </View>
                </View>

                <View testID="Page3" style={styles.main2}>
                    <View style={styles.headerBox}>
                        <Text style={{fontSize: 20}}>다른 엄마들은 어떻게 준비할까?</Text>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>출산리스트를 비교해 보세요</Text>
                    </View>
                    <View style={styles.main2Box}>
                        <OnBoarding3 style={styles.image}/>
                    </View>
                </View>

            </Swiper>
        </View>
    </View>
  )
}

export default Main