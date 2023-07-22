import React from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import RenderHtml from 'react-native-render-html'
import moment from 'moment'

const styles = StyleSheet.create({
    container:{
        height: '100%',
        backgroundColor: 'white',
    },
    header:{
        backgroundColor: '#F5F5F5',
        height: 80,
        padding: 20,
        justifyContent: 'center',
        borderTopWidth: 1,
        borderColor: '#E0E0E0'
    },
    main:{
        justifyContent: 'center',
        padding: 20,
    },
})
const InquiryDetail = ({route}) => {

    const renderItem = ({ item }) => (
        <View>
        <View style={styles.header}>
            <Text style={{fontSize: 15, fontWeight: '600', marginBottom: 3, color: '#424242'}}>{item.title}</Text>
            <Text style={{color: '#9E9E9E'}}>{moment(item.inquiryDate).format('YYYY/MM/DD')}</Text>
        </View>
            <View style={styles.main}>
                <RenderHtml source={{html: `${item.contents}`}} tagsStyles={styles} />
            </View>
        </View>
      );

  return (
    <View style={styles.container}>
        <FlatList data={[route.params]} renderItem={renderItem}
          keyExtractor={item => item.title}>
        </FlatList>
    </View>
  )
}

export default InquiryDetail