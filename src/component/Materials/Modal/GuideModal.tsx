import React, { useState } from 'react'
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Modal, Image } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import Icon from 'react-native-vector-icons/AntDesign'
import Icon2 from 'react-native-vector-icons/Ionicons'
import drugs from '../../../public/assets/drugs.png'

const styles = StyleSheet.create({
    modalContainer:{
        justifyContent: "center",
        alignItems: "center",
    },
    modalView:{
        width: '100%',
        height: '100%',
        margin: 20,
        backgroundColor: "rgba(0,0,0,0.5)",
        alignItems: "center",
        justifyContent: 'center',
        shadowColor: "#000",
        elevation: 5,
    },
    modalContainer2:{
        width: '90%',
        height: 600,
        backgroundColor: 'white',
        marginBottom: 35,
        borderRadius: 15,
        overflow: 'hidden',
        borderWidth: 1,
    },
    container2:{

    },
    header:{
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeBox:{
        position: 'absolute',
        right: 15,
        alignItems: 'flex-end',
        justifyContent: 'center',
        zIndex: 10
    },
    header2:{
        height: 170,
        justifyContent: 'center',
        alignItems: 'center',
    },
    main:{
        padding: 20,
    },
    mainBox:{
        marginBottom: 30,
    },
    mainBoxSub:{
      width: '33.4%',
      borderWidth: 1,
      borderColor: '#EEEEEE',
    },
    title:{
        backgroundColor: '#424242',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    content:{
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    filterSub:{
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 8,
        paddingRight: 8,
        borderRadius: 3,
      },
    footer:{
        height: 50,
        backgroundColor: '#FEA100',
        justifyContent: 'center',
        alignItems: 'center',
    }
})

const Main = ({modalVisible4, setModalVisible4, modalVisible2, setModalVisible2}) => {

    const optionBox = (e) => {
        switch(e){
          case '필수': return ( <View style={[styles.filterSub, {backgroundColor: '#E57373'}]}><Text style={{fontSize: 12, fontWeight: 'bold', color: 'white'}}>필수</Text></View> )
          case '권장': return ( <View style={[styles.filterSub, {backgroundColor: '#84C2F3'}]}><Text style={{fontSize: 12, fontWeight: 'bold', color: 'white'}}>권장</Text></View> )
          case '선택': return ( <View style={[styles.filterSub, {borderWidth: 1}]}><Text style={{fontSize: 12, fontWeight: 'bold'}}>선택</Text></View> )
          case '추가': return ( <View style={[styles.filterSub, {backgroundColor: '#F5A256'}]}><Text style={{fontSize: 12, fontWeight: 'bold', color: 'white'}}>추가</Text></View> )
        }
      }

    const renderItem = ({ item }) => (
        <View style={styles.container2}>
            <View style={styles.header2}>
                <Image source={{uri: `https://momsnote.s3.ap-northeast-2.amazonaws.com/board/${item.needsImage}`}} style={{width: 150, height: 150}} resizeMode='cover' />
            </View>
            <View style={styles.main}>
                <View style={styles.mainBox}>
                    <Text style={{color: '#212121', fontWeight: '700', paddingBottom: 5}}>제품 설명</Text>
                    <Text style={{lineHeight: 20}}>{item.needsDescription}</Text>
                </View>
                <View style={styles.mainBox}>
                    <Text style={{color: '#212121', fontWeight: '700', paddingBottom: 5}}>구매 팁</Text>
                    <Text style={{lineHeight: 20}}>{item.needsTips}</Text>
                </View>
                <View style={[styles.mainBox, {flexDirection: 'row'}]}>
                    <View style={styles.mainBoxSub}>
                        <View style={styles.title}>
                            <Text style={{color: 'white', fontSize: 13, fontWeight: '600'}}>수량/횟수</Text>
                        </View>
                        <View style={styles.content}>
                            <Text>{item.needsAmount}</Text>
                        </View>
                    </View>
                    <View style={styles.mainBoxSub}>
                        <View style={styles.title}>
                            <Text style={{color: 'white', fontSize: 13, fontWeight: '600'}}>필요성</Text>
                        </View>
                        <View style={styles.content}>
                            <Text>{optionBox(item.grade)}</Text>
                        </View>
                    </View>
                    <View style={styles.mainBoxSub}>
                        <View style={styles.title}>
                            <Text style={{color: 'white', fontSize: 13, fontWeight: '600'}}>필요시기</Text>
                        </View>
                        <View style={styles.content}>
                            <Text>{item.needsTime}</Text>
                        </View>
                    </View>
                </View>
            </View>
            
        </View>
        
      );

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible4.open} statusBarTranslucent={true}
        onRequestClose={() => {
        setModalVisible4(prevState=> ({...prevState, open: true}))}}>
    <View style={styles.modalContainer}>
        <View style={styles.modalView}>
            <View style={styles.modalContainer2}>

                <View style={styles.header}>
                    <TouchableOpacity style={styles.closeBox} onPress={()=>setModalVisible4(prevState => ({...prevState, open: false}))}><Icon name='close' size={24}/></TouchableOpacity>
                    <Text style={{color: '#212121', fontSize: 18, fontWeight: '700'}}>{modalVisible4.content.needsName}</Text>
                </View>

                <FlatList data={[modalVisible4.content]} renderItem={renderItem} showsVerticalScrollIndicator={false}
                    keyExtractor={item => item.id}>
                </FlatList>

                <TouchableOpacity style={styles.footer} onPress={()=>(setModalVisible4(prevState => ({...prevState, open: false})), setModalVisible2(prevState => ({...prevState, open: true, needsId: modalVisible4.content.needsId, needsDateId: modalVisible4.content.needsDateId})))}>
                    <Text style={{fontSize: 16, fontWeight: '600', color: 'white'}}>BEST 제품 바로가기 ></Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
</Modal>
  )
}


export default Main