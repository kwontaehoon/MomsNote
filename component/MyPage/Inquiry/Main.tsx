import React, { useState } from 'react'
import { getStatusBarHeight } from "react-native-status-bar-height"; 
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/AntDesign'
import Inquiry from './Inquiry'
import Inquiry2 from './Inquiry2'

const styles = StyleSheet.create({
    container:{
        height: '100%',
        backgroundColor: 'white',
        paddingBottom: 20,
    },
    header:{
        height: '10%',
        flexDirection: 'row',
    },
    headerBox:{
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#ddd'
    },
})
const Main = ({navigation}) => {

    const [filter, setFilter] = useState(true);
    console.log('filter: ', filter);


    const List = ():any => {
        switch(filter){
            case true: return <Inquiry navigation={navigation}/>
            case false: return <Inquiry2 navigation={navigation}/>
        }
    }

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity style={[styles.headerBox, {borderBottomColor: filter ? 'orange' : 'lightgrey'}]} onPress={()=>setFilter(true)}>
                <Text style={{fontWeight: 'bold', color: filter ? 'orange' : 'lightgrey', fontSize: 18}}>문의하기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.headerBox, {borderBottomColor: filter ? 'lightgrey' : 'orange'}]} onPress={()=>setFilter(false)}>
                <Text style={{fontWeight: 'bold', color: filter ? 'lightgrey' : 'orange', fontSize: 18}}>문의내역</Text>
            </TouchableOpacity>
        </View>
        <List />
    </View>
  )
}

export default Main