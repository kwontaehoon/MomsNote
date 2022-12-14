import React, { useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/AntDesign'

const styles = StyleSheet.create({
    container:{
        height: '100%',
        backgroundColor: 'white',
    },
    container2:{

    },
    header:{
        flexDirection: 'row',
        height: 70,
        alignItems: 'flex-end',
        paddingLeft: 20,
        borderTopWidth: 1,
        borderColor: '#F5F5F5',
    },
    profileBox:{
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
    },
    infoBox:{
        height: 42,
        marginLeft: 7,
    },
    main:{
        height: 800,
        borderBottomWidth: 1,
        borderColor: '#EEEEEE'
    },
    mainBox:{
        height: 70,
        padding: 20,
    },
    mainBox2:{
        height: 300,
        padding: 20,
    },
    mainBox3:{
        height: 50,
        flexDirection: 'row',
        borderColor: '#F5F5F5',
        borderBottomWidth: 1,
    },
    likeBox:{
        width: '60%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
    },
    lookupBox:{
        width: '40%',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingRight: 20,
    },
    mainBox4:{
        height: 200
    },
    footer:{
        height: 60,
        flexDirection: 'row',
        borderWidth: 1,
        alignItems: 'center',
        padding: 20,
        borderColor: '#F5F5F5'
    },
    profileBox2:{
        width: 40,
        height: 40,
        borderWidth: 1,
        borderRadius: 20,
    },
    textInput:{
        borderRadius: 99,
        width: 306,
        height: 40,
        marginLeft: 12,
        paddingLeft: 12,
        backgroundColor: '#F5F5F5'
    }
})
const Talk1Sub = ({route}) => {

    const DATA = [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: '전체'
        },
    ];

    console.log('route: ', route.params);
    const info = route.params;

    const [comment, setComment] = useState([]);

    const renderItem = ({ item }) => (
        <View style={styles.container2}>
            <View style={styles.header}>
                <View style={styles.profileBox}></View>
                <View style={styles.infoBox}>
                    <Text style={{color: '#212121', fontSize: 16, fontWeight: '500'}}></Text>
                    <Text style={{color: '#9E9E9E', fontSize: 13}}></Text>
                </View>
            </View>
            <View style={styles.main}>
                <View style={styles.mainBox}>
                    <Text style={{fontSize: 20, fontWeight: '400'}}></Text>
                </View>
                <View style={styles.mainBox2}>
                    <Text></Text>
                </View>
                <View style={styles.mainBox3}>
                    <View style={styles.likeBox}>
                        <Icon name='user' size={20} style={{paddingLeft: 10}}/>
                        <Text style={{color: '#9E9E9E', fontSize: 13}}> 추천 13</Text>
                        <Icon name='user' size={20} style={{paddingLeft: 10}}/>
                        <Text style={{color: '#9E9E9E', fontSize: 13}}> 댓글 5</Text>
                    </View>
                    <View style={styles.lookupBox}>
                        <Text style={{fontSize: 13, color: '#9E9E9E'}}>조회수 134</Text>
                    </View>
                </View>
                <View style={styles.mainBox4}>
                    {comment.length !== 0 ?
                    <View style={styles.commentBox}>
                        <Text></Text>
                    </View> :
                    <View style={{alignItems: 'center', justifyContent: 'center', paddingTop: 60}}>
                        <Text style={{color: '#757575', fontSize: 15}}>아직 댓글이 없습니다.</Text>
                        <Text style={{color: '#757575', fontSize: 15}}>먼저 댓글을 남겨 소통을 시작해보세요!</Text>
                    </View>}
                </View>
            </View>
        </View>
      );


  return (
    <View style={styles.container}>
        <FlatList data={DATA} renderItem={renderItem}
            keyExtractor={item => item.id}>
        </FlatList>
        <View style={styles.footer}>
            <View style={styles.profileBox2}></View>
            <TextInput style={styles.textInput} placeholder='댓글을 입력해주세요.' placeholderTextColor={'#BDBDBD'}></TextInput>
        </View>
    </View>
  )
}

export default Talk1Sub