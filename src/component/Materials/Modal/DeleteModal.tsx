import React, { useState } from 'react'
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import Icon2 from 'react-native-vector-icons/FontAwesome'
import DropDownPicker from 'react-native-dropdown-picker'
import Checkbox from 'expo-checkbox'

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
        width: '80%',
        backgroundColor: 'white',
        marginBottom: 35,
        borderRadius: 15,
        padding: 20,
    },
    header:{
        height: 50,
        alignItems: 'center',
    },
    closeBox:{
        position: 'absolute',
        right: 10,
        alignItems: 'flex-end',
        justifyContent: 'center',
        zIndex: 1
    },
    main:{

    },
    mainBox:{
        width: 278,
        height: 44,
        borderColor: '#EEEEEE',
        borderWidth: 1,
        justifyContent: 'center',
        paddingLeft: 15,
    },
    arrowBox:{
        position: 'absolute',
        right: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollBox:{
        position: 'absolute',
        height: 200,
        width: 278,
        top: '51%',
        left: '15%',
        backgroundColor: 'white',
        zIndex: 999,
        shadowColor: "#000",
        elevation: 5,
        borderWidth: 1,
        borderColor: '#EEEEEE'
    },
    listBox:{
        height: 52,
        justifyContent: 'center',
        paddingLeft: 15,
    },
    scrollBox2:{
        width: 278,
        height: 242,
    },
    listTitle:{
        marginTop: 15,
        height: 40,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#EEEEEE',
    },
    listTitleBox:{
        width: '25%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    listBox2:{
        height: 52,
        flexDirection: 'row',
        backgroundColor: '#FAFAFA',
    },
    listContent:{
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 3,
        marginRight: 5,
        borderColor: '#E0E0E0',
    },
    filterSub:{
        height: 20,
        paddingLeft: 8,
        paddingTop: 2,
        paddingbottom: 2,
        paddingRight: 8,
        marginRight: 5,
        marginLeft: 5,
        borderRadius: 2,
    },
    footer:{
        height: 44,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        position: 'relative',
        zIndex: -999
    },

})

const CheckBoxModal = ({modalVisible9, setModalVisible9}) => {

    const DATA = [
        {
            id: '0',
            title: '산모 패드',
            color: '올인원 샴푸 바디워시',
            option: '필수',
            
        },
        {
            id: '1',
            title: '수유 브라',
            color: '#FFADAD',
            option: '권장',
        },
        {
            id: '2',
            title: '손목 보호대',
            color: '#FFADAD',
            option: '선택',
        },
        {
            id: '3',
            title: '양말',
            color: '#FFADAD',
            option: '선택',
        }
    ];

    const [titleDisplay, setTitleDisplay] = useState(0); // 품목 리스트 display
    const [isChecked, setChecked] = useState(Array.from({length: DATA.length}, ()=>{ return false })); // check box
    const [info, setInfo] = useState({
        title: '카테고리 선택(필수)',
        content: ''
    })

    const submit = async() => {
        await axios.post(`http://192.168.1.140:4000/post/test`, {
            info: info
        })
    }

    const change = (e) => { // check box
        let arr = [...isChecked];
        arr[e] = !arr[e];
        setChecked(arr);
      }

    const optionBox = (e) => {
        switch(e){
          case '필수': return ( <View style={[styles.filterSub, {backgroundColor: '#E57373'}]}><Text style={{fontSize: 12, fontWeight: 'bold', color: 'white'}}>필수</Text></View> )
          case '권장': return ( <View style={[styles.filterSub, {backgroundColor: '#5291EF'}]}><Text style={{fontSize: 12, fontWeight: 'bold', color: 'white'}}>권장</Text></View> )
          case '선택': return ( <View style={[styles.filterSub, {backgroundColor: '#83D46F'}]}><Text style={{fontSize: 12, fontWeight: 'bold', color: 'white'}}>선택</Text></View> )
        }
    }

    const filter = () => {
        switch(titleDisplay){
            case 0: setTitleDisplay(1); return;
            case 1: setTitleDisplay(0); return;
            case 2: setTitleDisplay(1); return;
        }
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.listBox} onPress={()=>{setInfo((prevState) => ({ ...prevState, title: item.title})), setTitleDisplay(2)}}>
            <Text>{item.title}</Text>
        </TouchableOpacity>
    );

    const renderItem2 = ({ item }) => (
        <TouchableOpacity style={styles.listBox2} onPress={()=>{setInfo((prevState) => ({ ...prevState, title: item.title}))}}>
            <View style={styles.listContent}>
            <Checkbox
              style={styles.checkbox}
              value={isChecked[item.id]}
              onValueChange={()=>change(item.id)}
              color={isChecked[item.id] ? '#FEB401' : undefined}/></View>
            <View style={[styles.listContent, {width: '20%'}]}>{optionBox(item.option)}</View>
            <View style={[styles.listContent, {width: '60%', alignItems: 'flex-start'}]}><Text>산모 패드</Text></View>
        </TouchableOpacity>
    );

    const arrowIcon = () => {
        if(titleDisplay !== 1){return(<Icon2 name='angle-down' size={22}/>)
        }else return(<Icon2 name='angle-up' size={22}/>)
    }
    

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible9}
            onRequestClose={() => {
            setModalVisible9(!modalVisible9)}}>
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                <View style={[styles.scrollBox, {display: titleDisplay === 1 ? 'flex' : 'none'}]}>
                    <FlatList data={DATA} renderItem={renderItem}
                        keyExtractor={item => item.id}>
                    </FlatList>
                </View>
                    <View style={[styles.modalContainer2]}>
                    <View style={styles.header}>
                <TouchableOpacity style={styles.closeBox} onPress={()=>setModalVisible9(!modalVisible9)}><Icon name='close' size={24}/></TouchableOpacity>
                 <Text style={{color: '#212121', fontSize: 18, fontWeight: '500'}}>품목 삭제</Text>
            </View>
            <View style={styles.main}>
                <TouchableOpacity style={styles.mainBox} onPress={filter}>
                    <View style={styles.arrowBox}>{arrowIcon()}</View>
                    <Text>{info.title}</Text>
                </TouchableOpacity>

                <View style={[styles.scrollBox2, {display: titleDisplay === 2 ? 'flex' : 'none'}]}>
                    <View style={styles.listTitle}>
                        <View style={styles.listTitleBox}><Text>선택</Text></View>
                        <View style={[styles.listTitleBox, {width: '75%'}]}><Text>품목</Text></View>
                    </View>
                    <FlatList data={DATA} renderItem={renderItem2}
                        keyExtractor={item => item.id}>
                    </FlatList>
                </View>
            </View>
            <View style={[styles.footer, {backgroundColor: '#E0E0E0'}]}>
                <Text style={{color: 'white', fontSize: 16, fontWeight: '600'}}>적용</Text>
            </View>
        </View>
    </View>
    </View>
    </Modal>
  )
}

export default CheckBoxModal