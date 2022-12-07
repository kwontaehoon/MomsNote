import React, { useState } from 'react'
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Modal } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import Icon from 'react-native-vector-icons/FontAwesome'
import DropDownPicker from 'react-native-dropdown-picker'

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        height: '100%',
        marginTop: getStatusBarHeight(),
    },
    container2:{

    },
    header:{
        height: 78,
        padding: 20,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderColor: '#EEEEEE',
        borderWidth: 2,
    },
    closeBox:{
        position: 'absolute',
        right: 0,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleBox:{

    },
    main:{
        height: 340,
        padding: 20,
        borderWidth: 2,
    },
    mainBox:{
        borderWidth: 1,
        width: 100,
        height: 100,
    },
    footer:{
        height: 400,
        backgroundColor: '#F5F5F5',
        padding: 20,
    },
    footerBox:{
        height: 40,
    },
    initBox:{
        position: 'absolute',
        right: 0,
        width: 80,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    footerBox2:{
        borderWidth: 1,
    },
    InputBox:{
        borderWidth: 1,
        borderColor: '#EEEEEE',
        backgroundColor: 'white',
        marginBottom: 5,
        height: 50,
        padding: 10,
        borderRadius: 0,
    },
    hashBox:{
        height: 50,
        padding: 10,
        justifyContent: 'center',
    },
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
        width: '80%',
        height: 144,
        backgroundColor: 'white',
        marginBottom: 35,
        borderRadius: 15
    },
    modalBox:{
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal:{
        backgroundColor: '#FEA100',
        width: '90%',
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        marginBottom: 3,
    },
})

const Main = ({navigation}) => {

    const DATA = [
        {
          id: '0',
          title: '산모용품 (0/13)',
          color: '#FFADAD',
          icon: 'material1'
        },
    ];

    const DATA2 = [
        {
          id: '0',
          title: '산모용품 (0/13)',
          color: '#FFADAD',
          icon: 'material1'
        },
        {
          id: '1',
          title: '수유용품 (0/13)',
          color: '#FFADAD'
        },
        {
          id: '2',
          title: '위생용품 (0/13)',
          color: '#FFADAD'
        },
        {
            id: '3',
            title: '위생용품 (0/13)',
            color: '#FFADAD'
        },
        {
            id: '4',
            title: '위생용품 (0/13)',
            color: '#FFADAD'
        },
    ];

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: '1', value: '1'},
        {label: '2', value: '2'},
        {label: '3', value: '3'},
        {label: '4', value: '4'}
    ]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);

    const complete = () => {
        console.log('complete')
        setModalVisible(!modalVisible);
    }

    const renderItem = ({ item }) => (
        <View style={styles.container2}>
           <View style={styles.header}>
                <View style={styles.closeBox}><Icon name='close' size={22} onPress={()=>navigation.goBack()}/></View>
                <View style={styles.titleBox}>
                    <Text style={{fontSize: 18, color: '#212121', fontWeight: '700'}}>브랜드 선택</Text>
                    <Text style={{color: '#212121'}}>수유브라 Best</Text>
                </View>
            </View>
            <View style={styles.main}>
                <FlatList data={DATA2} renderItem={renderItem2}
                    keyExtractor={item => item.id}>
                </FlatList>
            </View>
            <View style={styles.footer}>
                <View style={styles.footerBox}>
                    <View style={styles.initBox}>
                        <Text style={{marginRight: 7, color: '#757575'}}>초기화</Text>
                        <Icon name='refresh' size={22} style={{color: '#757575'}}/>
                    </View>
                    <Text style={{fontSize: 16, color: '#212121', fontWeight: '700'}}>브랜드 추가</Text>
                </View>
                <View style={styles.footerBox2}>
                    <DropDownPicker open={open} value={value} items={items} style={styles.InputBox} placeholder='수량 선택'
                        placeholderStyle={{color: '#9E9E9E'}} textStyle={{fontSize: 15}}
                        setOpen={setOpen} setValue={setValue} setItems={setItems} max={2} min={2}/>
                    <TextInput style={styles.InputBox} placeholder='브랜드명/제품명(필수)' placeholderTextColor={'#9E9E9E'}></TextInput>
                    <TextInput style={styles.InputBox} placeholder='가격(원)' placeholderTextColor={'#9E9E9E'}></TextInput>
                    <TouchableOpacity style={[styles.InputBox, {backgroundColor: '#FEA100', alignItems: 'center', justifyContent: 'center', borderRadius: 2}]} onPress={complete}>
                        <Text style={{color: 'white', fontSize: 16, fontWeight: '600'}}>적용</Text>
                    </TouchableOpacity>
                    <View style={styles.hashBox}><Text style={{color: '#424242', fontSize: 13}}>#해시태그</Text></View>
                </View>
            </View>
        </View>
      );

    const renderItem2 = ({ item }) => (
        <View style={styles.mainBox}>
            <Text>{item.title}</Text>
        </View>
    );

  return (
    <View style={styles.container}>

        <Modal animationType="fade" transparent={true} visible={modalVisible}
            onRequestClose={() => {
            setModalVisible(!modalVisible)}}>
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <View style={styles.modalContainer2}>
                        <View style={styles.modalBox}><Text style={{fontSize: 16, paddingTop: 10}}>수량을 선택해주세요.</Text></View>
                        <View style={styles.modalBox}>
                            <TouchableOpacity style={styles.modal} onPress={complete}><Text style={{color: 'white', fontSize: 16}}>확인</Text></TouchableOpacity>
                        </View>
                        </View>
                    </View>
                </View>
            </Modal>

        <FlatList data={DATA} renderItem={renderItem}
            keyExtractor={item => item.id} showsVerticalScrollIndicator={false}>
        </FlatList>
    </View>
  )
}

export default Main