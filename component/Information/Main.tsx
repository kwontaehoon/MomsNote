import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/AntDesign'

const styles = StyleSheet.create({
  container:{
    marginTop: getStatusBarHeight(),
    borderWidth: 1,
    height: '89%',
  },
  header:{
    borderWidth: 1,
    height: '6%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  headerBox:{
    position: 'absolute',
    right: 0,
    flexDirection: 'row'
  },
  iconBox:{
    margin: 5,
  },
  header2:{
    borderWidth: 1,
    height: '10%',
    flexDirection: 'row',
  },
  header2Box:{
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    borderWidth: 1,
  },
  header3:{
    borderWidth: 1,
    height: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header4:{
    borderWidth: 1,
    height: '8%',
  },
  header4FilterBox:{
    borderWidth: 1,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    padding: 10,
  },
  main:{
    borderWidth: 1,
    height: '66%',
  },
  mainBox:{
    borderWidth: 1,
    width: '100%',
    height: 180,
  }
})
const Navigation = () => {

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

  const Content = [{
    id: '1',
    content: '제목1'
  },
  {
    id: '2',
    content: '제목2'
  },
  {
    id: '3',
    content: '제목3'
  },
  {
    id: '4',
    content: '제목4'
  },
  {
    id: '5',
    content: '제목5'
  }
  ]

  const renderItem = ({ item }) => (
    <View style={styles.header4FilterBox}>
        <TouchableOpacity><Text>{item.title}</Text></TouchableOpacity>
    </View>
  );

  const renderItem2 = ({ item }) => (
    <TouchableOpacity style={styles.mainBox}>
        <Text>{item.content}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
        <View style={styles.header}>
          <Text>맘스 정보</Text>
          <View style={styles.headerBox}>
                <View style={styles.iconBox}><Icon2 name='search1' size={22}/></View>
                <View style={styles.iconBox}><Icon name='bell-o' size={22}/></View>
                <View style={styles.iconBox}><Icon name='user-o' size={22}/></View>
            </View>
        </View>
        <View style={styles.header2}>
          <View style={styles.header2Box}><Text>행사 정보</Text></View>
          <View style={styles.header2Box}><Text>Q&A</Text></View>
        </View>
        <View style={styles.header3}>
          <View><Text>스크롤</Text></View>
        </View>
        <View style={styles.header4}>
          <FlatList data={DATA} renderItem={renderItem}
            keyExtractor={item => item.id} horizontal={true}
            showsHorizontalScrollIndicator={false}>
          </FlatList>
        </View>
        <View style={styles.main}>
          <FlatList data={Content} renderItem={renderItem2}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}>
          </FlatList>
        </View>
    </View>
  )
}

export default Navigation