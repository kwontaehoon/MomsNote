import React, { useState } from 'react'
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import Icon from 'react-native-vector-icons/AntDesign'
import Checkbox from 'expo-checkbox'

const styles = StyleSheet.create({
    container:{
        height: '91%',
        backgroundColor: 'white',
    },
    container2:{

    },
    main:{
        padding: 20,
        paddingTop: 40,
        height: 850,
    },
    mainBox:{
        marginBottom: 30,
    },
    textBox:{
        borderBottomWidth: 1,
        borderColor: '#EEEEEE',
        marginTop: 10,
        height: 52,
        paddingLeft: 10,
        justifyContent: 'center'
    },
    certificateBox:{
        borderWidth: 1,
        borderColor: '#EEEEEE',
        position: 'absolute',
        right: 15,
        bottom: 10,
        borderRadius: 5,
        paddingTop: 8,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 8,
    },
    postBox:{
        position: 'absolute',
        right: 15,
        bottom: 15,
    },
    checkbox: {
        width: 18,
        height: 18,
        marginRight: 8,
        borderRadius: 3,
        borderColor: '#E0E0E0',
    },
    buttonBox:{
        width: '90%',
        height: 56,
        borderRadius: 5,
        backgroundColor: '#E0E0E0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    footer:{
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    footerBox:{
        width: '90%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FEA100',
        borderRadius: 3,
    }
})
const Withdraw = ({navigation}) => {

    const DATA = [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: '전체'
        },
    ];

    const [isChecked, setChecked] = useState(Array.from({length: 3}, ()=>{return false})); // check box
    console.log('isChecked: ', isChecked);

    const change = (e) => { // 텍스트 밑줄 색상 변경
        let arr = [...isChecked];

        switch(true){
            case e === 0 && arr[e] === false: arr = Array.from({length: 3}, ()=>{return true}); setChecked(arr); break;
            case e === 0 && arr[e] === true: arr = Array.from({length: 3}, ()=>{return false}); setChecked(arr); break;
            case e !== 0: arr[0] = false; arr[e] = !arr[e]; setChecked(arr); break;
        }
        if(arr[1] === true && arr[2] === true){
            arr = Array.from({length: 3}, ()=>{return true});
            setChecked(arr);
        }
    }
    
    const renderItem = ({ item }) => (
        <View style={styles.container2}>
            <View style={styles.main}>
                <View style={styles.mainBox}>
                    <Text style={{fontSize: 16, fontWeight: '500'}}>이름</Text>
                    <TextInput style={styles.textBox} placeholder='이름 입력'></TextInput>
                </View>
                <View style={styles.mainBox}>
                    <Text style={{fontSize: 16, fontWeight: '500'}}>연락처</Text>
                    <TextInput style={styles.textBox} placeholder='휴대폰 번호 입력(-제외)'></TextInput>
                    <View style={styles.certificateBox}><Text style={{fontWeight: '500'}}>인증요청</Text></View>
                </View>
                <View style={styles.mainBox}>
                    <Text style={{fontSize: 16, fontWeight: '500'}}>SNS 계정</Text>
                    <Text style={{color: '#757575', marginTop: 5}}>리뷰에 사용할 계정을 하나 이상 입력해주세요.</Text>
                    <TextInput style={styles.textBox} placeholder='네이버 블로그'></TextInput>
                    <TextInput style={styles.textBox} placeholder='인스타그램'></TextInput>
                    <TextInput style={styles.textBox} placeholder='유튜브'></TextInput>
                </View>
                <View style={styles.mainBox}>
                    <Text style={{fontSize: 16, fontWeight: '500'}}>배송지</Text>
                    <View>
                        <View style={styles.textBox}><Text onPress={()=>navigation.navigate('주소 찾기')}>주소 검색하기</Text></View>
                        <View style={styles.postBox}><Icon name='right' size={15} onPress={()=>navigation.navigate('주소 찾기')}/></View>
                    </View>
                    <TextInput style={styles.textBox} placeholder='상세주소 입력'></TextInput>
                </View>
                <View style={styles.footer}>
                <View style={styles.footerBox}>
                    <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>적용</Text>
                </View>
            </View>
            </View>
        </View>
      );

  return (
    <View style={styles.container}>
       <FlatList data={DATA} renderItem={renderItem}
          keyExtractor={item => item.id} showsHorizontalScrollIndicator={false}>
        </FlatList>
    </View>
  )
}

export default Withdraw