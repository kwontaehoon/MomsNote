import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native'

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
    modalBox:{
        justifyContent: 'center',
        padding: 10,
    },
    modalBox2:{
        height: 44,
        borderWidth: 1,
        borderColor: '#fb8c00',
        justifyContent: 'center',
        borderRadius: 4,
        alignItems: 'center',
        backgroundColor: '#fb8c00'
    },
    buttonBox:{
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 44,
        borderColor: '#EEEEEE'
    },
})
const Main = ({modalVisible5, setModalVisible5, setModalVisible6}) => {

  return (
    <Modal animationType="fade" transparent={true} statusBarTranslucent={true} visible={modalVisible5}
        onRequestClose={() => {
            setModalVisible5(!modalVisible5)}}>
    <View style={styles.modalContainer}>
        <View style={styles.modalView}>
            <View style={styles.modalContainer2}>
               <View style={[styles.modalBox, {justifyContent: 'flex-start'}]}>
                    <Text style={{fontSize: 15, textAlign: 'center', lineHeight: 20}}>출산 준비물 리스트를 초기화합니다. 실제 맘들이 추천한 리스트로 보시겠어요?</Text>
               </View>
               <TouchableOpacity style={styles.modalBox2} onPress={()=>(setModalVisible5(!modalVisible5), setModalVisible6(prevState => ({...prevState, open: true, content: 0})))}>
                    <Text style={{color: 'white', fontSize: 15, fontWeight: '500'}}>네, 추천 리스트로 보여주세요.</Text>
               </TouchableOpacity>
               <View style={styles.modalBox}>
                    <Text style={{fontSize: 15, lineHeight: 20}}>많은 임산부들이 추천한 품목을 필수, 권장, 선택 항목으로 나눠서 알기 쉽게 보여준답니다.</Text>
               </View>
               <TouchableOpacity style={styles.modalBox2} onPress={()=>(setModalVisible5(!modalVisible5), setModalVisible6(prevState => ({...prevState, open: true, content: 1})))}>
                    <Text style={{color: 'white', fontSize: 15, fontWeight: '500'}}>아니요, 직접 작성할게요.</Text>
               </TouchableOpacity>
               <View style={styles.modalBox}>
                    <Text style={{fontSize: 15, lineHeight: 20}}>카테고리만 기본 제공하며, 필요한 품목을 직접 작성할 수 있어요.</Text>
               </View>
               <View style={styles.modalBox}>
                    <Text style={{color: '#EF1E1E', fontSize: 13, lineHeight: 20}}>Tip! 
                        <Text style={{color: '#757575', fontSize: 13}}> 초보 엄마라면 추천 리스트를 바탕으로 나에게 맞는 출산준비물 리스트를 작성해 보세요.</Text>
                    </Text>
               </View>
               <TouchableOpacity style={styles.buttonBox} onPress={()=>setModalVisible5(!modalVisible5)}>
                    <Text style={{fontSize: 15, fontWeight: '500'}}>취소</Text>
               </TouchableOpacity>
            </View>
        </View>
    </View>
</Modal>
  )
}

export default Main