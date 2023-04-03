import React from 'react'
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native'
import WheelPickerExpo from 'react-native-wheel-picker-expo';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
    modalContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        width: '100%',
        height: '100%',
        backgroundColor: "rgba(0,0,0,0.5)",
        alignItems: "center",
        justifyContent: 'center',
        shadowColor: "#000",
        elevation: 5,
    },
    modalContainer2: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 15
    },
    wheelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalBox:{
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
    },
    modal:{
        backgroundColor: '#FEA100',
        width: '90%',
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        marginBottom: 7,
    },
    selectedStyle1: { borderColor: '#202124', borderWidth: 2 },
    selectedStyle2: { borderColor: '#202124', borderWidth: 2 },
})

const TimeWheel = ({ modal, setModal }) => {

    const SelectClock = 'AM,PM'.split(',');
    const SelectHours = Array.from({length: 13}, (x, index) => {
        if(String(index).split('').length == 1){
            return `0${index} 시`;
        }return `${index} 시`;
    });
    const SelectMinutes = Array.from({length: 61}, (x, index) => {
        if(String(index).split('').length == 1){
            return `0${index} 분`;
        }return `${index} 분`;
    });

    return (
        <Modal animationType="fade" transparent={true} visible={modal.open} statusBarTranslucent={true}
            onRequestClose={() => {
                setModal(prevState => ({...prevState, open: false}))
            }}>
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <View style={styles.modalContainer2}>
                        <View style={styles.wheelContainer}>
                            <WheelPickerExpo
                                selectedStyle={styles.selectedStyle1}
                                width={50}
                                height={300}
                                initialSelectedIndex={1}
                                items={SelectClock.map((name) => ({ label: name, value: '' }))}
                                onChange={({ item }) => {setModal(prevState => ({...prevState, hours: item.label})), AsyncStorage.setItem('alarmEndClock', item.label)}}
                                renderItem={(props) => (
                                    <Text
                                        style={[
                                            styles.text,
                                            { fontSize: props.fontSize, color: props.fontColor, textAlign: props.textAlign },
                                        ]}>
                                        {props.label}
                                    </Text>
                                )}
                            />

                            <WheelPickerExpo
                                selectedStyle={styles.selectedStyle1}
                                width={100}
                                height={300}
                                initialSelectedIndex={2}
                                items={SelectHours.map((name) => ({ label: name, value: '' }))}
                                onChange={({ item }) => {setModal(prevState => ({...prevState, hours: item.label})), AsyncStorage.setItem('alarmEndHours', item.label.split('').filter(x => x !== ' ').join(''))}}
                                renderItem={(props) => (
                                    <Text
                                        style={[
                                            styles.text,
                                            { fontSize: props.fontSize, color: props.fontColor, textAlign: props.textAlign },
                                        ]}>
                                        {props.label}
                                    </Text>
                                )}
                            />

                            <WheelPickerExpo
                                selectedStyle={styles.selectedStyle2}
                                width={100}
                                height={300}
                                initialSelectedIndex={3}
                                items={SelectMinutes.map((name) => ({ label: name, value: '' }))}
                                onChange={({ item }) =>  {setModal(prevState => ({...prevState, minutes: item.label})), AsyncStorage.setItem('alarmEndMinutes', item.label.split('').filter(x => x !== ' ').join(''))}}
                                renderItem={(props) => (
                                    <Text
                                        style={[
                                            styles.text,
                                            { fontSize: props.fontSize, color: props.fontColor, textAlign: props.textAlign },
                                        ]}>
                                        {props.label}
                                    </Text>
                                )}
                            />
                        </View>
                        <View style={styles.modalBox}>
                            <TouchableOpacity style={styles.modal} onPress={()=>setModal(prevState => ({...prevState, open: false}))}><Text style={{color: 'white', fontSize: 16}}>적용</Text></TouchableOpacity>
                        </View>
                    </View>

                </View>
            </View>
        </Modal>
    )
}

export default TimeWheel
