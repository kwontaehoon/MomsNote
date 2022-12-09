import React, { useState } from 'react'
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import DropDownPicker from 'react-native-dropdown-picker'

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
        height: 144,
        backgroundColor: 'white',
        marginBottom: 35,
        borderRadius: 15,
        padding: 20,
    },
    header:{
        height: '25%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeBox:{
        position: 'absolute',
        right: 15,
        alignItems: 'flex-end',
        justifyContent: 'center',
        zIndex: 10
    },
    main:{
        height: '50%',
        
    },
    mainBox:{
        height: '45%',
        borderColor: '#EEEEEE',
        borderWidth: 1,
    },
    dropDownBox:{
        height: '100%',
        borderRadius: 0,
        borderWidth: 0,
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

const CheckBoxModal = ({modalVisible8, setModalVisible8}) => {

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: '산모 용품', value: '1'},
        {label: '수유 용품', value: '2'},
        {label: '위생 용품', value: '3'},
        {label: '목욕 용품', value: '4'},
        {label: '목욕 용품', value: '4'}
    ]);
    

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible8}
            onRequestClose={() => {
            setModalVisible8(!modalVisible8)}}>
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <View style={[styles.modalContainer2, {height: 294}]}>
                        <View style={styles.header}>
                            <TouchableOpacity style={styles.closeBox} onPress={()=>setModalVisible8(!modalVisible8)}><Icon name='close' size={24}/></TouchableOpacity>
                            <Text style={{color: '#212121', fontSize: 18, fontWeight: '500'}}>품목 추가</Text>
                        </View>
                        <View style={styles.main}>
                            <View style={styles.mainBox}>
                            <DropDownPicker open={open} value={value} items={items} placeholder='카데고리 선택(필수)' style={styles.dropDownBox}
                                dropDownContainerStyle={{borderWidth: 0, borderRadius: 0}} listItemContainerStyle={{height: 52, borderWidth: 2,}}
                                setOpen={setOpen} setValue={setValue} setItems={setItems} maxHeight={220}/>
                            </View>
                            <View style={{height: 10}}></View>
                            <TextInput style={[styles.mainBox, {paddingLeft: 15, position: 'relative', zIndex: -999}]} placeholder='품목 명' placeholderTextColor={'#9E9E9E'}></TextInput>
                        </View>
                        <View style={[styles.footer, {backgroundColor: '#E0E0E0'}]}>
                            <Text style={{color: 'white', fontSize: 16, fontWeight: '600'}}>추가하기</Text>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
  )
}

export default CheckBoxModal