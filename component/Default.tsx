import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import Icon from 'react-native-vector-icons/FontAwesome'

const styles = StyleSheet.create({
    container:{
        marginTop: getStatusBarHeight(),
        borderWidth: 2,
    },
    header:{
        height: '8%',
        borderWidth: 2,
        alignItems: 'flex-end',
    },
    headerBox:{
        borderWidth: 1,
        width: '25%',
        height: '100%',
        flexDirection: 'row',
    },
    header2:{
        borderWidth: 1,
        height: '8%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconBox:{
        borderWidth: 1,
        width: '50%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    main:{
        height: '44%',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    photoBox:{
        borderWidth: 1,
        width: '60%',
        height: '70%',
        borderRadius: 999,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ddayBox:{
        borderWidth: 1,
        width: '25%',
        height: '30%',
        position: 'absolute',
        bottom: 0,
        left: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    saveBox:{
        borderWidth: 1,
        width: '25%',
        height: '30%',
        position: 'absolute',
        bottom: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    main2:{
        height: '20%',
        borderWidth: 1,
        flexDirection: 'row',
    },
    bestBox:{
        width: '50%',
        borderWidth: 1,
    },
    titleBox:{
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    best2Box:{
        width: '50%',
        borderWidth: 1,
    },
    main3:{
        height: '20%',
        borderWidth: 1,
    },
    main3Header:{
        borderWidth: 1,
        height: '30%',
    },
    main3Main:{

    },
})
const Default = () => {
    
    
  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <View style={styles.headerBox}>
                <View style={styles.iconBox}><Icon name='bell-o' size={25}/></View>
                <View style={styles.iconBox}><Icon name='user' size={25}/></View>
            </View>
        </View>
        <View style={styles.header2}>
            <Text>이름</Text>
        </View>
        <View style={styles.main}>
            <View style={styles.photoBox}>
                <Text>사진</Text>
            </View>
            <View style={styles.ddayBox}>
                <Text>예정일</Text>
                <Text>날짜</Text>
            </View>
            <View style={styles.saveBox}>
                <Icon name='camera' size={25}/>
                <Text>아기 정보 저장</Text>
            </View>
        </View>
        <View style={styles.main2}>
            <View style={styles.bestBox}>
                <View style={styles.titleBox}>
                    <Text>출산 준비물 리스트 인기글</Text>
                    <Icon name='plus' size={15} />
                </View>
                <Text>1. 글</Text>
                <Text>2. 글</Text>
                <Text>3. 글</Text>
            </View>
            <View style={styles.best2Box}>
                <Text>맘스톡 인기글</Text>
                <Text>1. 글</Text>
                <Text>2. 글</Text>
                <Text>3. 글</Text>
            </View>
        </View>
        <View style={styles.main3}>
            <View style={styles.main3Header}>

            </View>
            <View style={styles.main3Main}>

            </View>
        </View>
    </View>
  )
}

export default Default