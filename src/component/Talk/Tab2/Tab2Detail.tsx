import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/AntDesign'

const styles = StyleSheet.create({
    container:{
        height: '92%',
        backgroundColor: 'white'
    },
    container2:{

    },
    header:{
        height: 80,
        marginTop: 20,
        paddingLeft: 15,
    },
    headerBox:{
        width: '40%',
        height: '100%',
        flexDirection: 'row',
    },
    profileBox:{
        borderWidth: 1,
        width: '50%',
        borderRadius: 999,
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoBox:{
        width: '50%',
        justifyContent: 'center',
    },
    infoSubBox:{
        height: 20,
        justifyContent: 'center',
        marginLeft: 10,
    },
    
    main:{
        height: 600,
        borderBottomWidth: 1,
        borderColor: '#F5F5F5'
    },
    mainBox:{
        height: '13%',
        justifyContent: 'center',
        padding: 15,
    },
    mainBox2:{
        height: '46%',
        padding: 15,
    },
    mainBox3:{
        borderBottomWidth: 1,
        height: '8%',
        flexDirection: 'row',
        borderColor: '#F5F5F5',
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
        paddingRight: 10,
    },
    footer:{
        height: 60,
        flexDirection: 'row'
    },
    footerBox:{
        width: '18%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
    },
    footerBox2:{
        width: '82%',
        justifyContent: 'center',
        padding: 15,
    },
    circleBox:{
        borderWidth: 1,
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    textBox:{
        height: 40,
        borderRadius: 25,
        backgroundColor: '#F5F5F5',
        paddingLeft: 15,
    }
})
const Talk1Sub = () => {

    const DATA = [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: '전체'
        },
    ];

    const renderItem = ({ item }) => (
        <View style={styles.container2}>
            <View style={styles.header}>
            <View style={styles.headerBox}>
                <View style={styles.profileBox}>
                    <Text>이미지</Text>
                </View>
                <View style={styles.infoBox}>
                    <View style={styles.infoSubBox}><Text>별똥이맘</Text></View>
                    <View style={styles.infoSubBox}><Text style={{fontSize: 13, color: '#9E9E9E'}}>9시간 전</Text></View>
                </View>
            </View>
        </View>
        <View style={styles.main}>
            <View style={styles.mainBox}>
                <Text style={{fontSize: 20, fontWeight: '400'}}>제목</Text>
            </View>
            <View style={styles.mainBox2}>
                <Text>내용</Text>
            </View>
            <View style={styles.mainBox3}>
                <View style={styles.likeBox}>
                    <Icon name='user' size={22} style={{paddingLeft: 10}}/>
                    <Text> 추천 13</Text>
                    <Icon name='user' size={22} style={{paddingLeft: 10}}/>
                    <Text> 댓글 5</Text>
                </View>
                <View style={styles.lookupBox}>
                    <Text>조회수 134</Text>
                </View>
            </View>
        </View>
        </View>
      );


  return (
    <View style={styles.container}>
        <FlatList data={DATA} renderItem={renderItem}
            keyExtractor={item => item.id} showsVerticalScrollIndicator={false}>
        </FlatList>
        <View style={styles.footer}>
            <View style={styles.footerBox}>
                <View style={styles.circleBox}></View>
            </View>
            <View style={styles.footerBox2}>
                <TextInput style={styles.textBox} placeholder='댓글을 입력해주세요.'></TextInput>
            </View>
        </View>
    </View>
  )
}

export default Talk1Sub