import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height";
const styles = StyleSheet.create({
    container:{
        marginTop: getStatusBarHeight(),
        borderWidth: 2,
    },
    header:{
        height: '12%',
        borderWidth: 2,
        alignItems: 'flex-end',
    },
    headerBox:{
        borderWidth: 1,
        width: 100,
        height: 50,
        flexDirection: 'row',
    },
    header2:{
        borderWidth: 1,
        height: '12%',
    },
    iconBox:{
        borderWidth: 1,
        width: '50%',
        height: '100%',
    },
    main:{
        height: '76%',
        borderWidth: 2,
    },
})
const Default = () => {
    
    
  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <View style={styles.headerBox}>
                <View style={styles.iconBox}></View>
                <View style={styles.iconBox}></View>
            </View>
        </View>
        <View style={styles.header2}>
            <View style={{}}></View>
        </View>
        <View style={styles.main}></View>
    </View>
  )
}

export default Default