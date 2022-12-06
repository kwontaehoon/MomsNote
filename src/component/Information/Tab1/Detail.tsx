import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/AntDesign'

const styles = StyleSheet.create({
    container:{
        height: '92%',
    },
    container2:{

    },
    container3:{

    },
    header:{
        height: 100,
        borderTopWidth: 1,
        borderColor: '#EEEEEE',
        padding: 15,
        justifyContent: 'center',
    },
    main:{
        padding: 15,
        borderBottomWidth: 1,
        borderColor: '#EEEEEE'
    },
    mainBox:{
        height: 400,
        paddingTop: 30,
        borderWidth: 1,
    },
    mainBox2:{
        height: 60,
        flexDirection: 'row',
    },
    mainBox2Sub:{
        alignItems: 'center',
        flexDirection: 'row',
    },
    main2:{
        height: 400,
        borderWidth: 1,
    },
})
const Talk1Sub = () => {

    const DATA = [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: '전체'
        }
    ];
    const DATA2 = [
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
        <View style={styles.container2}>
            <View style={styles.header}>
                <Text style={{marginBottom: 5, fontSize: 20, fontWeight: '400'}}>12월 박람회 안내</Text>
                <Text>일정: 22.07.08 ~ 22.08.01</Text>
            </View>
            <View style={styles.main}>
                <View style={styles.mainBox}><Text>맘스노트에서 1월 박랍회</Text></View>
                <View style={styles.mainBox2}>
                    <View style={[styles.mainBox2Sub, {width: '25%'}]}>
                        <Icon name='user' size={16} />
                        <Text> 추천 0</Text>
                    </View>
                    <View style={[styles.mainBox2Sub, {width: '25%'}]}>
                        <Icon name='user' size={16} />
                        <Text> 댓글 0</Text>
                    </View>
                    <View style={[styles.mainBox2Sub, {width: '50%', justifyContent: 'flex-end'}]}>
                        <Text>조회수 130</Text>
                    </View>
                </View>
            </View>
            <FlatList data={DATA2} renderItem={renderItem2}
                keyExtractor={item => item.id}>
            </FlatList>
        </View>
    );

    const renderItem2 = ({ item }) => (
        <View style={styles.container3}>
            <View style={styles.main2}></View>
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

export default Talk1Sub