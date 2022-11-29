import React, { useState } from 'react'
import { getStatusBarHeight } from "react-native-status-bar-height"; 
import { View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Checkbox from 'expo-checkbox';

const styles = StyleSheet.create({
  container:{
    height: '92%',
    backgroundColor: 'white',
  },
  header:{
    height: '8%',
    flexDirection: 'row',
  },
  headerBox:{
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  iconBox:{
    margin: 5,
  },
  header2:{
    height: '2%',
    backgroundColor: '#F5F5F5'
  },
  header3:{
    height: '6%',
    flexDirection: 'row',
  },
  main:{
    height: '84%',
  },
  mainBox:{
    height: 500,
    borderWidth: 1,
    marginBottom: 10,
  },
  mainBox2:{
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
  },
  titleBox:{
    width: '50%',
    justifyContent: 'center'
  },
  mainBox3:{
    borderWidth: 1,
    height: 400,
  },
  filterBox:{
    height: 35,
    flexDirection: 'row',
  },
  filter:{
    width: '43%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  listBox:{
    borderWidth: 1,
    height: 50,
    flexDirection: 'row',
  },
  list:{
    width: '43%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkbox: {
    margin: 8,
    width: 18,
    height: 18,
    borderRadius: 3,
    borderColor: '#E0E0E0',
  },
  type:{
    flexDirection: 'row',
  },
  typeBox:{
    width: 36,
    height: 20,
    alignItems:'center',
    justifyContent: 'center',
    marginRight: 5,
    borderRadius: 3,
    backgroundColor: '#5291EF'
  },
  brand:{
    width: 120,
    height: 32,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
  },
  footer:{
    width: '100%',
    height: '10%',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 7,
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
  },
  footerBox:{
    width: '95%',
    height: '80%',
    backgroundColor: '#F5F5F5',
    borderRadius: 3,
    flexDirection: 'row',
    padding: 10
  },
  budgetBox:{
    width: '50%',
    justifyContent: 'center',
  }
})

const Navigation = ({navigation}:any) => {

  const DATA = [
    {
      id: '1',
      title: '산모용품 (0/13)',
      color: '#FFADAD'
    },

  ];

  const [list, setList] = useState(Array.from({ length: 7 }, () => { return false}));
  console.log('list: ', list);
  const [isChecked, setChecked] = useState(false); // check box

  const renderItem = ({ item }) => (
    <View style={styles.mainBox}>
        <View style={[styles.mainBox2]}>
            <View style={[styles.titleBox]}><Text>{item.title}</Text></View>
            <TouchableOpacity style={[styles.titleBox, {alignItems: 'flex-end'}]}
            onPress={()=>setList(!list)}><Icon name="angle-down" size={22} /></TouchableOpacity>
        </View>
        <View style={[styles.mainBox3, {display: list ? 'flex' : 'none'}]}>
          <View style={styles.filterBox}>
            <View style={[styles.filter, {width: '14%'}]}><Text>구매</Text></View>
            <View style={styles.filter}><Text>품목</Text></View>
            <View style={styles.filter}><Text>브랜드</Text></View>
          </View>
          <View style={styles.listBox}>
            <View style={[styles.list, {width: '14%'}]}>
            <Checkbox
              style={styles.checkbox}
              value={isChecked}
              onValueChange={setChecked}
              color={isChecked ? '#FEB401' : undefined}
            />
            </View>
            <View style={[styles.list, {alignItems: 'flex-start'}]}>
              <View style={styles.type}>
                <View style={styles.typeBox}><Text style={{color: 'white'}}>권장</Text></View>
                <View style={{paddingTop: 1,}}><Text>산모 패드</Text></View>
              </View>
            </View>
            <View style={styles.list}>
              <View style={styles.brand}>
                <Icon name='plus' size={14} style={{color: '#757575'}}></Icon>
              </View>
            </View>
          </View>
        </View>
    </View>
  ); 

  return (
    <View style={styles.container}>
        <View style={styles.header2}></View>
        <View style={styles.header3}>
          <View style={styles.headerBox}>
            <Text>전체 (5/37)</Text>
          </View>
          <View style={[styles.headerBox, {justifyContent: 'flex-end'}]}>
            <View style={[styles.iconBox, {marginRight: 10}]}><Icon name='filter' size={22} /></View>
            <View style={[styles.iconBox, {marginRight: 10}]}><Icon name='ellipsis-v' size={22} style={{marginLeft: 10}}/></View>
          </View>
        </View>
        <View style={styles.main}>
          <FlatList data={DATA} renderItem={renderItem}
              keyExtractor={item => item.id}>
          </FlatList>
        </View>
        <View style={styles.footer}>
          <View style={styles.footerBox}>
            <View style={styles.budgetBox}><Text>총 예산: 0000원</Text></View>
            <View style={[styles.budgetBox, {alignItems: 'flex-end'}]}>
              <TouchableOpacity onPress={()=> navigation.navigate('총 예산')}><Text>  자세히 보기  <Icon name='angle-right' size={15}/></Text></TouchableOpacity>
            </View>
          </View>
        </View>
    </View>
  )
}

export default Navigation