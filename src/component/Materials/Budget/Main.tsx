import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/AntDesign'

const styles = StyleSheet.create({
    container:{
        borderWidth: 1,
        height: '100%',
    },
    main:{
      paddingTop: 10,
      height: '70%',
      backgroundColor: 'white'
    },
    mainBox:{
      height: 50,
      backgroundColor: 'yellow',
      justifyContent: 'center',
      padding: 15,
    },
    arrowBox:{
      position: 'absolute',
      right: 15,
      width: 30,
      height: 30,
      alignItems: 'center',
      justifyContent: 'center'
    },
    main2:{
      backgroundColor: 'green',
      flexDirection: 'row'
    },
    main2Box:{
      borderWidth: 1,
      height: 40
    },
    main2Box2:{

    },
    footer:{
      borderWidth: 1,
      height: '30%',
    },
})
const Talk1Sub = () => {

  const DATA = [
    {
      id: '0',
      title: '산모용품 (0/13)',
      color: '#FFADAD',
      icon: 'material1'
    },
    {
      id: '1',
      title: '수유용품 (0/13)',
      color: '#FFD6A5'
    },
    {
      id: '2',
      title: '위생용품 (0/13)',
      color: '#FFADAD'
    },
    {
      id: '3',
      title: '목욕용품 (0/13)',
      color: '#FFADAD'
    },
    {
      id: '4',
      title: '침구류 (0/13)',
      color: '#FFADAD'
    },
    {
      id: '5',
      title: '아기용품 (0/13)',
      color: '#FFADAD'
    },
    {
      id: '6',
      title: '발육용품 (0/13)',
      color: '#FFADAD'
    },
    {
      id: '7',
      title: '가전용품 (0/13)',
      color: '#FFADAD'
    },

  ];

    const renderItem = ({ item }) => (
      <View>
          <View style={[styles.mainBox, {backgroundColor: item.color}]}>
              <View style={styles.arrowBox}><Icon name='angle-down' size={22}/></View>
              <Text style={{fontSize: 15}}>{item.title}</Text>
          </View>
      </View>
    );

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <View></View>
        <FlatList data={DATA} renderItem={renderItem}
              keyExtractor={item => item.id}>
        </FlatList>
      </View>
      <View style={styles.footer}>
        
      </View>
    </View>
  )
}

export default Talk1Sub