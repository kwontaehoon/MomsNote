import React, { useState } from 'react'
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Modal, Platform } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import Icon from 'react-native-vector-icons/FontAwesome'
import DateTimePicker from '@react-native-community/datetimepicker'
import Close from '../../../../../public/assets/svg/Close.svg'

const styles = StyleSheet.create({
    modalContainer:{
        justifyContent: "center",
        alignItems: "center",
    },
    modalView:{
        width: '100%',
        height: '100%',
        backgroundColor: "rgba(0,0,0,0.5)",
        alignItems: "center",
        justifyContent: 'center',
        shadowColor: "#000",
        elevation: 5,
    },
    modalContainer2:{
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 15,
        paddingRight: 25,
        paddingLeft: 25,
        paddingBottom: 25,
    },
    header:{
        height: 80,
        justifyContent: 'center',
    },
    closeBox:{
        position: 'absolute',
        right: 0,
    },
    main:{
        height: 365,
    },
    mainBox:{
        justifyContent: 'center',
    },
    titleBox:{
        height: 60,
        justifyContent: 'center',
    },
    contentBox:{
        borderWidth: 1,
        borderColor: '#EEEEEE',
        height: 50,
        justifyContent: 'center',
        padding: 15,
        marginBottom: 10,
    },
    textInput:{

    },
    addBox:{
        position: 'absolute',
        right: 0,
        borderWidth: 1,
        paddingLeft: 12,
        paddingTop: 4,
        paddingRight: 12,
        paddingBottom: 4,
        borderRadius: 4,
        borderColor: '#EEEEEE'
    },
    footer:{
        width: '100%',
        backgroundColor: '#E0E0E0',
        height: 50,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
})
const Main = ({modalVisible3, setModalVisible3}) => {

    const DATA = [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: '전체'
        },
    ];

    const [info, setInfo] = useState({
        instagrem: '',
        naver: '',
        youtube: '',
    });
    console.log('url info: ', info);
    const [urlAdd, setUrlAdd] = useState({
        instagrem: false,
        naver: false,
        youtube: false
    }); // 각 url 갯수


    const renderItem = ({ item }) => (
        <>
            <View style={styles.mainBox}>
                <View style={styles.titleBox}>
                    { !urlAdd.instagrem ? 
                        <TouchableOpacity style={styles.addBox} onPress={()=> setUrlAdd((prevState) => ({ ...prevState, instagrem: true}))}>
                            <Text>추가+</Text>
                        </TouchableOpacity>
                        :
                        <View style={styles.addBox}>
                            <Text style={{color: '#BDBDBD'}}>추가+</Text>
                        </View>
                    }
                    <Text style={{fontWeight: '600'}}>인스타그램</Text>
                </View>
                <View style={styles.contentBox}>
                    <TextInput style={styles.textInput} placeholder='URL주소입력' placeholderTextColor={'#BDBDBD'}
                        onChangeText={(e)=> setInfo((prevState) => ({ ...prevState, instagrem: e}))}>
                    </TextInput>
                </View>
                <View style={[styles.contentBox, {display: urlAdd.instagrem ? 'flex' : 'none'}]}>
                    <TextInput style={styles.textInput} placeholder='URL주소입력' placeholderTextColor={'#BDBDBD'}
                        onChangeText={(e)=> setInfo((prevState) => ({ ...prevState, instagrem: e}))}>
                    </TextInput>
                </View>
            </View>

            <View style={styles.mainBox}>
                <View style={styles.titleBox}>
                    { !urlAdd.naver ? 
                    <TouchableOpacity style={styles.addBox} onPress={()=> setUrlAdd((prevState) => ({ ...prevState, naver: true}))}>
                        <Text>추가+</Text>
                    </TouchableOpacity>
                    :
                    <View style={styles.addBox}>
                        <Text style={{color: '#BDBDBD'}}>추가+</Text>
                    </View>
                    }
                    <Text style={{fontWeight: '600'}}>네이버 블로그</Text>
                </View>
                <View style={styles.contentBox}>
                    <TextInput style={styles.textInput} placeholder='URL주소입력' placeholderTextColor={'#BDBDBD'}
                        onChangeText={(e)=> setInfo((prevState) => ({ ...prevState, naver: e}))}>
                    </TextInput>
                </View>
                <View style={[styles.contentBox, {display: urlAdd.naver ? 'flex' : 'none'}]}>
                    <TextInput style={styles.textInput} placeholder='URL주소입력' placeholderTextColor={'#BDBDBD'}
                        onChangeText={(e)=> setInfo((prevState) => ({ ...prevState, naver: e}))}>
                    </TextInput>
                </View>
            </View>

            <View style={styles.mainBox}>
                <View style={styles.titleBox}>
                    { !urlAdd.youtube ? 
                        <TouchableOpacity style={styles.addBox} onPress={()=> setUrlAdd((prevState) => ({ ...prevState, youtube: true}))}>
                            <Text>추가+</Text>
                        </TouchableOpacity>
                        :
                        <View style={styles.addBox}>
                            <Text style={{color: '#BDBDBD'}}>추가+</Text>
                        </View>
                    }
                    <Text style={{fontWeight: '600'}}>유튜브</Text>
                </View>
                <View style={styles.contentBox}>
                    <TextInput style={styles.textInput} placeholder='URL주소입력' placeholderTextColor={'#BDBDBD'}
                        onChangeText={(e)=> setInfo((prevState) => ({ ...prevState, youtube: e}))}>
                    </TextInput>
                </View>
                <View style={[styles.contentBox, {display: urlAdd.youtube ? 'flex' : 'none'}]}>
                    <TextInput style={styles.textInput} placeholder='URL주소입력' placeholderTextColor={'#BDBDBD'}
                        onChangeText={(e)=> setInfo((prevState) => ({ ...prevState, youtube: e}))}>
                    </TextInput>
                </View>
            </View>
        </>
      );

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible3} statusBarTranslucent={true}
        onRequestClose={() => {setModalVisible3(!modalVisible3)}}>

        <KeyboardAvoidingView behavior='height' style={styles.modalContainer}>
            <View style={styles.modalView}>
                <View style={styles.modalContainer2}>
                    <View style={styles.header}>
                        <TouchableOpacity style={styles.closeBox} onPress={()=>setModalVisible3(!modalVisible3)}><Close fill={'black'}/></TouchableOpacity>
                        <Text style={{fontSize: 18, fontWeight: '600', marginBottom: 3}}>컨텐츠 URL 등록</Text>
                        <Text>본인의 해당 SNS 링크를 입력해주세요.</Text>
                    </View>
                    <View style={styles.main}>
                        <FlatList data={DATA} renderItem={renderItem}
                            keyExtractor={item => item.id} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                        </FlatList>
                    </View>

                    {info.instagrem == '' && info.naver == '' && info.youtube == '' ? 
                    <View style={styles.footer}>
                        <Text style={{fontSize: 16, fontWeight: '600', color: 'white'}}>등록 완료</Text>
                    </View> :

                    <View style={[styles.footer, {backgroundColor: '#FEA100'}]}>
                        <Text style={{fontSize: 16, fontWeight: '600', color: 'white'}}>등록 완료</Text>
                    </View>
                    }
                </View>
            </View>
        </KeyboardAvoidingView>
    </Modal>
  )
}

export default Main