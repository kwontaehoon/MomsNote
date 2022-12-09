import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/AntDesign'

const styles = StyleSheet.create({
    container:{
        borderWidth: 1,
        height: '100%',
        backgroundColor: 'white'
    },
    header:{
      borderWidth: 1,
      backgroundColor: '#F5F5F5',
      height: 10,
    },
    main:{
      borderWidth: 1,
      height: '70%',
    },
    container2:{
      borderWidth: 1,
    },
    header2:{
      height: 50,
      backgroundColor: 'yellow',
      justifyContent: 'center',
      padding: 15,
    },
    arrowBox:{
      position: 'absolute',
      right: 15,
      borderWidth: 1,
      width: 30,
      height: 30,
    },
    main2:{
      backgroundColor: 'pink',
      flexDirection: 'row'
    },
    main2Box:{
      borderWidth: 1,
      height: 100
    },

    footer:{
      borderWidth: 1,
      height: '29%',
    },
})
const Talk1Sub = () => {

    const DATA = [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: '전체'
        },
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba2',
          title: '전체2'
        },
    ];

    const DATA2 = [
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba1',
        title: '전체'
      },
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba2',
        title: '전체2'
      },
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba3',
        title: '전체2'
      },
  ];

    const renderItem = ({ item }) => (
      <View style={styles.container2}>
          <View style={styles.header2}>
              <View style={styles.arrowBox}></View>
              <Text>산모용품 (5/13)</Text>
          </View>
          <View style={styles.main2}>
            <FlatList data={DATA2} renderItem={renderItem2}
                keyExtractor={item => item.id}>
            </FlatList>
          </View>
      </View>
    );

    const renderItem2 = ({ item }) => (
      <View style={styles.main2Box}>
          
      </View>
    );

  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <View style={styles.main}>
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