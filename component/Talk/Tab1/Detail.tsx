import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/AntDesign'

const styles = StyleSheet.create({
    container:{
        height: '92%',
    },
    header:{
        height: '12%',
        
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
    },
    infoSubBox:{
        borderWidth: 1,
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    main:{
        height: '88%'
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
        borderWidth: 1,
        height: '8%',
        flexDirection: 'row',
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
    mainBox4:{
        borderWidth: 1,
        height: '33%',
        padding: 20,
    },
    main4Box:{
        borderWidth: 1,
        height: 200,
    },
})
const Talk1Sub = () => {

    const DATA = [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: '전체'
        },
        {
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
          title: '자유게시판'
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72',
          title: '일상이야기'
        },
        {
            id: '1',
            title: '임신정보'
        },
        {
            id: '2',
            title: '고민상담'
        },
        {
            id: '3',
            title: '질문게시판'
        }
    ];

    const renderItem = ({ item }) => (
        <View style={styles.main4Box}>
            
        </View>
      );


  return (
    <View style={styles.container}>

        <View style={styles.header}>
            <View style={styles.headerBox}>
                <View style={styles.profileBox}>
                    <Text>이미지</Text>
                </View>
                <View style={styles.infoBox}>
                    <View style={styles.infoSubBox}><Text>별똥이맘</Text></View>
                    <View style={styles.infoSubBox}><Text>9시간 전</Text></View>
                </View>
            </View>
        </View>
        <View style={styles.main}>
            <View style={styles.mainBox}>
                <Text>제목</Text>
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
            <View style={styles.mainBox4}>
            <FlatList data={DATA} renderItem={renderItem}
                keyExtractor={item => item.id}>
            </FlatList>
            </View>
        </View>
    </View>
  )
}

export default Talk1Sub