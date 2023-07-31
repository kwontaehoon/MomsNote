import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import Icon2 from 'react-native-vector-icons/FontAwesome'
import Checkbox from 'expo-checkbox'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { postMaterial } from '../../../Redux/Slices/MaterialSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'

import Close from '../../../../public/assets/svg/Close.svg'

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
        width: '80%',
        backgroundColor: 'white',
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
        width: '100%',
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
        width: '70%',
        top: '53%',
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
        width: '100%',
        height: 278,
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
        borderRadius: 12,
        marginRight: 5,
        borderColor: '#E0E0E0',
    },
    filterSub:{
        paddingLeft: 8,
        paddingTop: 4,
        paddingRight: 8,
        paddingBottom: 4,
        marginRight: 5,
        marginLeft: 5,
        borderRadius: 10,
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

const CheckBoxModal = ({setModal, setModal2, modalVisible9, setModalVisible9}) => {

    const DATA = [
        {
            id: '0',
            title: '산모용품',
        },
        {
            id: '1',
            title: '수유용품',
        },
        {
            id: '2',
            title: '위생용품',
        },
        {
            id: '3',
            title: '목욕용품',
        },
        {
            id: '4',
            title: '침구류',
        },
        {
            id: '5',
            title: '아기의류',
        },
        {
            id: '6',
            title: '외출용품',
        },
        {
            id: '7',
            title: '가전용품',
        },
        {
            id: '8',
            title: '놀이용품',
        }
    ];

    const dispatch = useDispatch();
    const material2 = useSelector(state => { return state.material.data; });
    const [material, setMaterial] = useState(material2);
    const materialSet = useSelector(state => { return state.material.refresh; });
    const [titleDisplay, setTitleDisplay] = useState(0); // 품목 리스트 display

    const [info, setInfo] = useState();

    const [data, setData] = useState({
        title: '카테고리 선택(필수)',
        delete: [],
        deleteCencel: []
    });

    useEffect(()=>{
        setMaterial(material2);
    }, [modalVisible9]);

    useEffect(()=>{
        setInfo(material.filter(x => x.category == data.title));
    }, [data.title, material]);

    const submit = async(e) => {
        const token = await AsyncStorage.getItem('token');
        try{
            const response = await axios({
                method: 'post',
                url: 'https://momsnote.net/api/needs/delete',
                headers: { 
                  'Authorization': `bearer ${token}`, 
                  'Content-Type': 'application/json'
                },
                data: { id: data.delete.join() }
                });
            }catch(error){
              console.log('error: ', error);
            }
        try{
            const response = await axios({
                 method: 'post',
                url: 'https://momsnote.net/api/needs/cancel/delete',
                headers: { 
                    'Authorization': `bearer ${token}`, 
                    'Content-Type': 'application/json'
                   },
                data: { id: data.deleteCencel.join() }
                });
            }catch(error){
                console.log('error: ', error);
            }    
        dispatch(postMaterial(materialSet));
    }

    const optionBox = (e) => {
        switch(e){
            case '필수': return ( <View style={[styles.filterSub, {backgroundColor: '#E57373'}]}><Text style={{fontSize: 12, fontWeight: 'bold', color: 'white'}}>필수</Text></View> )
            case '권장': return ( <View style={[styles.filterSub, {backgroundColor: '#84C2F3'}]}><Text style={{fontSize: 12, fontWeight: 'bold', color: 'white'}}>권장</Text></View> )
            case '선택': return ( <View style={[styles.filterSub, {borderWidth: 1}]}><Text style={{fontSize: 12, fontWeight: 'bold'}}>선택</Text></View> )
            case '추가': return ( <View style={styles.filterSub}><Text style={{fontSize: 12, fontWeight: 'bold', color: '#E57373'}}>추가</Text></View> )
          }
    }

    const filter = () => {
        switch(titleDisplay){
            case 0: setTitleDisplay(1); return;
            case 1: setTitleDisplay(0); return;
            case 2: setTitleDisplay(1); return;
        }
    }

    const add = (e, flag) => {
        if(flag == 'delete'){
        const test = material.map(x => {
            if(x.needsId == e){
                return {...x , deleteStatus: 0};
            } return x;
        })
        setMaterial(test);
        const arr = [...data.delete, e];
        const arr2 = data.deleteCencel.filter(x => x.needsId !== e);
        setData(prevState => ({...prevState, delete: arr, deleteCencel: arr2}));


    }else{
        let arr = '';
        const test = material.map(x => {
            if(x.needsId == e){
                return {...x , deleteStatus: 1};
            } return x;
        })
        setMaterial(test);
        data.delete.includes(e) ? arr = data.delete.filter(x => x !== e) : arr = [...data.deleteCencel, e];
        setData(prevState => ({...prevState, deleteCencel: arr}));
    }
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.listBox} onPress={()=>{setData((prevState) => ({ ...prevState, title: item.title})), setTitleDisplay(2)}}>
            <Text>{item.title}</Text>
        </TouchableOpacity>
    );

    const renderItem2 = ({ item, index }) => (
        <View style={styles.listBox2}>
            <View style={styles.listContent}>
            <Checkbox
              style={styles.checkbox}
              value={item.deleteStatus == 0 ? true : false}
              color={item.deleteStatus == 0 ? '#FEB401' : undefined}
              onValueChange={()=>{
                switch(true){
                  case item.deleteStatus == 1 : add(item.needsId ,'delete'); break;
                  default : add(item.needsId);
                }
              }}/></View>
            <View style={[styles.listContent, {width: '20%'}]}>{optionBox(item.grade)}</View>
            <View style={[styles.listContent, {width: '60%', alignItems: 'flex-start'}]}><Text>{item.needsName}</Text></View>
        </View>
    );

    const arrowIcon = () => {
        if(titleDisplay !== 1){return(<Icon2 name='angle-down' size={22}/>)
        }else return(<Icon2 name='angle-up' size={22}/>)
    }
    

  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible9} statusBarTranslucent={true}

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
                    <TouchableOpacity style={styles.closeBox} onPress={()=>setModalVisible9(!modalVisible9)}>
                        <Close fill={'black'}/>
                    </TouchableOpacity>
                    <Text style={{color: '#212121', fontSize: 18, fontWeight: '500'}}>품목 삭제</Text>
                </View>
                <View style={styles.main}>
                    <TouchableOpacity style={styles.mainBox} onPress={filter}>
                        <View style={styles.arrowBox}>{arrowIcon()}</View>
                        <Text>{data.title}</Text>
                    </TouchableOpacity>

                    <View style={[styles.scrollBox2, {display: titleDisplay === 2 ? 'flex' : 'none'}]}>
                        <View style={styles.listTitle}>
                            <View style={styles.listTitleBox}><Text>선택</Text></View>
                            <View style={[styles.listTitleBox, {width: '75%'}]}><Text>품목</Text></View>
                        </View>
                        <FlatList data={info} renderItem={renderItem2}
                            keyExtractor={(item, index) => String(index)}>
                        </FlatList>
                    </View>
                </View>
                {data.title == '카테고리 선택(필수)' ? <View style={[styles.footer, {backgroundColor: '#E0E0E0'}]}>
                    <Text style={{color: 'white', fontSize: 16, fontWeight: '600'}}>적용</Text>
                </View>
                :
                <TouchableOpacity style={[styles.footer, {backgroundColor: '#FEA100'}]} onPress={()=>{
                    data.delete.length == 0 && data.deleteCencel.length == 0 ? (setModal2((prevState) => ({...prevState, open: true, content: ['삭제 혹은 복구된 품목이 없습니다.', '그래도 적용하시겠습니까?'], buttonCount: 2})), setModalVisible9(!modalVisible9))
                    :
                    (submit(), setMaterial(material2), setModal((prevState) => ({...prevState, open: true, content: '출산준비물 리스트가 변경되었습니다.', buttonCount: 1})), setModalVisible9(!modalVisible9), setData(prevState => ({...prevState, delete: [], deleteCencel: []})))}}>
                    <Text style={{color: 'white', fontSize: 16, fontWeight: '600'}}>적용</Text>
                </TouchableOpacity>}
             </View>
            </View>
        </View>
    </Modal>
  )
}

export default CheckBoxModal