import React from 'react'
import { getStatusBarHeight } from "react-native-status-bar-height"; 
import { View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/AntDesign'
import Icon3 from 'react-native-vector-icons/Feather'
import CheckBox from '@react-native-community/checkbox';

const styles = StyleSheet.create({
  container:{
    marginTop: getStatusBarHeight(),
    height: '89%',
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
    height: '74%',
  },
  mainBox:{
    height: 500,
    borderWidth: 1,
    marginBottom: 10,
  },
  mainBox2:{
    flexDirection: 'row',
    padding: 15,
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
  footer:{
    height: '10%',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 7,
  },
  parchase:{
    width: 18,
    height: 18,
    borderWidth: 1,
    borderRadius: 3,
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
  footerBox:{
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  }
})

const Navigation = () => {

  const DATA = [
    {
      id: '1',
      title: '산모용품 (0/13)',
      color: '#FFADAD'
    },

  ];

  const renderItem = ({ item }) => (
    <View style={styles.mainBox}>
        <View style={[styles.mainBox2]}>
            <View style={[styles.titleBox]}><Text>{item.title}</Text></View>
            <TouchableOpacity style={[styles.titleBox, {alignItems: 'flex-end'}]}><Icon name="angle-down" size={22} /></TouchableOpacity>
        </View>
        <View style={styles.mainBox3}>
          <View style={styles.filterBox}>
            <View style={[styles.filter, {width: '14%'}]}><Text>구매</Text></View>
            <View style={styles.filter}><Text>품목</Text></View>
            <View style={styles.filter}><Text>브랜드</Text></View>
          </View>
          <View style={styles.listBox}>
            <View style={[styles.list, {width: '14%'}]}>
            <CheckBox
    disabled={false}
    value={toggleCheckBox}
    onValueChange={(newValue) => setToggleCheckBox(newValue)}
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
    <>

    <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerBox}>
            <Text>출산준비물</Text>
          </View>
          <View style={[styles.headerBox, {justifyContent: 'flex-end'}]}>
            <View style={styles.iconBox}><Icon3 name='refresh-cw' size={22}/></View>
            <View style={styles.iconBox}><Icon2 name='download' size={22}/></View>
            <View style={styles.iconBox}><Icon2 name='search1' size={22}/></View>
            <View style={styles.iconBox}><Icon name='bell-o' size={22}/></View>
            <View style={styles.iconBox}><Icon name='user-o' size={22}/></View>
          </View>
        </View>
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
          <View style={[styles.footerBox, {width: '20%', backgroundColor: 'black'}]}>
            <Text style={{color: 'white'}}>자세히</Text>
          </View>
          <View style={[styles.footerBox, {width: '20%'}]}><Text>총예산</Text></View>
          <View style={[styles.footerBox, {width: '60%'}]}><Text>브랜드 선택시 예산이 표기됩니다.</Text></View>
        </View>
    </View>
    </>
  )
}

export default Navigation