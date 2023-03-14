import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, BackHandler, Modal, KeyboardAvoidingView } from 'react-native'
import axios from 'axios'
import { WebView } from 'react-native-webview';

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
        height: '90%',
    },
})

const Main = ({modal4, setModal4, modalVisible2, setModalVisible2}) => {

    const runFirst = `window.ReactNativeWebView.postMessage("this is message from web")`;

  return (
    <Modal animationType="fade" transparent={true} visible={modal4.open} statusBarTranslucent={true}
        onRequestClose={() => {
        setModal4(prevState => ({...prevState, open: false}))}}>
        <KeyboardAvoidingView behavior='height' style={styles.modalContainer}>
            <View style={styles.modalView}>
                <View style={styles.modalContainer2}>
                <WebView
      style={styles.container}
      injectedJavaScript={runFirst}
      source={{ uri: modal4.link }}
    />
                </View>
            </View>
        </KeyboardAvoidingView>
    </Modal>
  )
}

export default Main