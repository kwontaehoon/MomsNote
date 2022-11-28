import React from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import Icon from 'react-native-vector-icons/FontAwesome'

const styles = StyleSheet.create({
    container:{
        marginTop: getStatusBarHeight(),
        borderWidth: 1,
        height: '89%',
    },
    header:{
        height: '6%',
        borderWidth: 2,
        alignItems: 'flex-end',
    },
    headerBox:{
        borderWidth: 1,
        width: '25%',
        height: '100%',
        flexDirection: 'row',
    },
    header2:{
        borderWidth: 1,
        height: '6%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconBox:{
        width: '50%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    main:{
        height: '32%',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    photoBox:{
        borderWidth: 1,
        width: '50%',
        height: '80%',
        borderRadius: 999,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ddayBox:{
        borderWidth: 1,
        width: '25%',
        height: '30%',
        position: 'absolute',
        bottom: 0,
        left: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    saveBox:{
        borderWidth: 1,
        width: '25%',
        height: '30%',
        position: 'absolute',
        bottom: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    main2:{
        height: '20%',
        borderWidth: 1,
        flexDirection: 'row',
    },
    bestBox:{
        width: '50%',
        borderWidth: 1,
        padding: 5,
    },
    titleBox:{
        height: '25%',
        flexDirection: 'row',
    },
    plus:{
        position: 'absolute',
        right: 0,
    },
    text:{
        height: '25%',
    },
    best2Box:{
        width: '50%',
        borderWidth: 1,
        padding: 5,
    },
    footer:{
        height: '36%',
        borderWidth: 1,
    },
    footerHeader:{
        borderWidth: 1,
        height: '25%',
        padding: 15,
    },
    titleBox2:{
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    main3Main:{
        height: '75%',
        borderWidth: 1,
    },
    albumBox:{
        width: 140,
        height: 160,
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
        <View style={styles.albumBox}>
            <View style={styles.albumPhoto}></View>
            <View style={styles.albumTitle}><Text>{item.title}</Text></View>
        </View>
      );
      
    const test = () => {
      navigation.navigate('공지사항');
    }
    
  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <View style={styles.headerBox}>
                <View style={styles.iconBox}><Icon name='bell-o' size={22}/></View>
                <View style={styles.iconBox}><Icon name='user-o' size={22}/></View>
            </View>
        </View>
        <View style={styles.header2}>
            <Text>이름</Text>
        </View>
        <View style={styles.main}>
            <View style={styles.photoBox}>
                <Text>사진</Text>
            </View>
            <View style={styles.ddayBox}>
                <Text>예정일</Text>
                <Text>날짜</Text>
            </View>
            <View style={styles.saveBox}>
                <Icon name='camera' size={25}/>
                <TouchableOpacity onPress={test}><Text>아기 정보 저장</Text></TouchableOpacity>
            </View>
        </View>
        <View style={styles.main2}>
            <View style={styles.bestBox}>
                <View style={styles.titleBox}>
                    <Text>출산 준비물 리스트 인기글</Text>
                    <Icon name='plus' size={15} style={styles.plus}/>
                </View>
                <Text style={styles.text}>1. 글</Text>
                <Text style={styles.text}>2. 글</Text>
                <Text style={styles.text}>3. 글</Text>
            </View>
            <View style={styles.best2Box}>
                <View style={styles.titleBox}>
                    <Text>맘스톡 인기글</Text>
                    <Icon name='plus' size={15} style={styles.plus} />
                </View>
                <Text style={styles.text}>1. 글</Text>
                <Text style={styles.text}>2. 글</Text>
                <Text style={styles.text}>3. 글</Text>
            </View>
        </View>
        <View style={styles.footer}>
            <View style={styles.footerHeader}>
                <View style={styles.titleBox2}>
                    <Text>맘스정보</Text>
                    <Icon name='plus' size={15} style={styles.plus}/>
                </View>
            </View>
            <View style={styles.main3Main}>
                <FlatList data={DATA} renderItem={renderItem}
                    keyExtractor={item => item.id} horizontal={true}>
                </FlatList>
            </View>
        </View>
    </View>
  )
}

export default Home