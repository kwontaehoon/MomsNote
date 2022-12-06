import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/AntDesign'

const styles = StyleSheet.create({
    container:{
        borderWidth: 1,
        height: '92%',
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



  return (
    <View style={styles.container}>

    </View>
  )
}

export default Talk1Sub