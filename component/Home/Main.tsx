import React from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/Feather'

const styles = StyleSheet.create({
    container:{
        height: '92%',
        backgroundColor: '#FFF8E1',
    },
    container2:{

    },
    main:{
        height: 340,
        padding: 15,
    },
    mainBox:{
        padding: 15,
        backgroundColor: 'white',
        shadowColor: "#000",
        elevation: 5,
    },
    photoBox:{
        height: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FEECB3',
    },
    infoBox:{
        height: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    main2:{
        height: 180,
        padding: 15,
    },
    main2Box:{
        padding: 20,
        backgroundColor: 'white',
        shadowColor: "#000",
        elevation: 5,
        height: '100%',
        borderRadius: 10,
    },
    main2Box2:{
        height: '33.4%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    DDayBox:{
        width: '50%',
    },
    main3:{
        backgroundColor: 'white',
        height: 250,
        paddingTop: 40,
        paddingBottom: 40,
        paddingLeft: 20,
        paddingRight: 20,
    },
    main3Box:{
        flexDirection: 'row',
    },
    main3Box2:{
        width: '50%',
    },
    titleBox:{
        flexDirection: 'row',
        height: '25%',
    },
    title:{
        width: '50%',
        justifyContent: 'center',
        padding: 5
    },
    contentBox:{
        height: '75%',
    },
    content:{
        height: '33.4%',
        justifyContent: 'center',
        paddingLeft: 10,
    },
    main4:{
        backgroundColor: 'white',
        height: 300,
    },
    main4Box:{
        height: '20%',
        paddingLeft: 20,
        paddingRight: 20,
    },
    main4Box2:{
    },
    albumBox:{
        width: 140,
        height: '80%',
        margin: 10,
        padding: 5,
    },
    albumPhoto:{
        height: '80%',
        borderWidth: 1,
        borderRadius: 10,
    },
    albumTitle:{
        height: '20%',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
const Home = ({navigation}:any) => {

    const DATA = [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: 'First Item',
        },
      ];

      const DATA2 = [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: 'First Item',
        },
        {
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
          title: 'Second Item',
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72',
          title: 'Third Item',
        },
        {
            id: '1',
        },
        {
            id: '2',
        },
    ];
    

    const renderItem = ({ item }) => (
        <View style={styles.container2}>
            <View style={styles.main}>
                <View style={styles.mainBox}>
                    <View style={styles.photoBox}><Text></Text></View>
                    <View style={styles.infoBox}>
                        <Text>우리 아기와 함께한 97일</Text>
                    </View>
                </View>
            </View>
            <View style={styles.main2}>
                <View style={styles.main2Box}>
                    <View style={styles.main2Box2}><Text style={{fontSize: 20}}>별똥이</Text></View>
                    <View style={styles.main2Box2}>
                        <View style={styles.DDayBox}><Text style={{color: '#FE9000', fontWeight: 'bold', fontSize: 22}}>D-183 (24주차 1일)</Text></View>
                        <View style={[styles.DDayBox, {alignItems: 'flex-end'}]}><Icon2 name='download' size={22}/></View>                        
                    </View>
                    <View style={styles.main2Box2}><Text style={{color: '#9E9E9E'}}>예정일: 202년 10월 31일</Text></View>
                </View>
            </View>
            <View style={styles.main3}>
                <View style={styles.main3Box}>
                    <View style={styles.main3Box2}>
                        <View style={styles.titleBox}>
                            <View style={styles.title}><Text style={{fontSize: 18, fontWeight: 'bold'}}>출산 리스트</Text></View>
                            <View style={[styles.title, {alignItems: 'flex-end'}]}><Text style={{color: '#9E9E9E'}}>+ 더보기</Text></View>
                        </View>
                        <View style={styles.contentBox}>
                            <View style={styles.content}><Text>글1</Text></View>
                            <View style={styles.content}><Text>글2</Text></View>
                            <View style={styles.content}><Text>글3</Text></View>
                        </View>
                    </View>
                    <View style={[styles.main3Box2, {width: '0.2%', borderWidth: 1, borderColor: '#EEEEEE'}]}></View>
                    <View style={styles.main3Box2}>
                        <View style={styles.titleBox}>
                            <View style={styles.title}><Text style={{fontSize: 18, fontWeight: 'bold'}}>맘스 토크</Text></View>
                            <View style={[styles.title, {alignItems: 'flex-end'}]}><Text style={{color: '#9E9E9E'}}>+ 더보기</Text></View>
                        </View>
                        <View style={styles.contentBox}>
                            <View style={styles.content}><Text>글1</Text></View>
                            <View style={styles.content}><Text>글2</Text></View>
                            <View style={styles.content}><Text>글3</Text></View>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.main4}>
                <View style={styles.main4Box}>
                    <View style={[styles.titleBox, {height: '100%'}]}>
                        <View style={styles.title}><Text style={{fontSize: 20, fontWeight: 'bold'}}>맘스 정보</Text></View>
                        <View style={[styles.title, {alignItems: 'flex-end'}]}><Text style={{color: '#9E9E9E'}}>+ 더보기</Text></View>
                    </View>
                </View>
                <View style={styles.main4Box2}>
                <FlatList data={DATA2} renderItem={renderItem2}
                        keyExtractor={item => item.id} horizontal={true}>
                </FlatList>
                </View>
            </View>
            

        </View>
    );
    
    const renderItem2 = ({ item }) => (
        <View style={styles.albumBox}>
            <View style={styles.albumPhoto}></View>
            <View style={styles.albumTitle}><Text>{item.title}</Text></View>
        </View>
    );
    
  return (
    <View style={styles.container}>
       <FlatList data={DATA} renderItem={renderItem}
            keyExtractor={item => item.id}>
        </FlatList>
    </View>
  )
}

export default Home