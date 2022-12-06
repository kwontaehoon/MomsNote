import React from 'react'
import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import Icon from 'react-native-vector-icons/FontAwesome'
import SelectDropdown from 'react-native-select-dropdown'

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        height: '100%',
        marginTop: getStatusBarHeight(),
    },
    header:{
        borderWidth: 1,
        height: '10%',
        padding: 20,
        justifyContent: 'center'
    },
    closeBox:{
        position: 'absolute',
        right: 0,
        borderWidth: 1,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleBox:{

    },
    main:{
        height: '50%',
        borderWidth: 1,
    },
    mainBox:{
        borderWidth: 1,
        width: 100,
        height: 100,
    },
    footer:{
        height: '40%',
        borderWidth: 1,
        backgroundColor: '#F5F5F5',
        padding: 20,
    },
    footerBox:{
        borderWidth: 1,
        height: '20%',
        justifyContent: 'center',
    },
    initBox:{
        position: 'absolute',
        right: 0,
        width: 80,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        borderWidth: 1,
    },
    footerBox2:{
        height: '60%',
        borderWidth: 1,
    },
    InputBox:{
        borderWidth: 1,
        marginBottom: 5,
        height: 40,
        padding: 10,
    },
})

const Main = () => {
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
          color: '#FFADAD'
        },
        {
          id: '2',
          title: '위생용품 (0/13)',
          color: '#FFADAD'
        },
    ];

    const Filter = ['1', '2', '3'];
    const renderItem = ({ item }) => (
        <View style={styles.mainBox}>
            <Text>gg</Text>
        </View>
      );

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <View style={styles.closeBox}><Icon name='close' size={22}/></View>
            <View style={styles.titleBox}>
                <Text style={{fontSize: 16, color: '#212121', fontWeight: '700'}}>브랜드 선택</Text>
                <Text style={{color: '#212121'}}>수유브라 Best</Text>
            </View>
        </View>
        <View style={styles.main}>
            <FlatList data={DATA} renderItem={renderItem}
              keyExtractor={item => item.id}>
            </FlatList>
        </View>
        <View style={styles.footer}>
            <View style={styles.footerBox}>
                <View style={styles.initBox}>
                    <Text style={{marginRight: 7, color: '#757575'}}>초기화</Text>
                    <Icon name='refresh' size={22} style={{color: '#757575'}}/>
                </View>
                <Text style={{fontSize: 16, color: '#212121', fontWeight: '700'}}>브랜드 추가</Text>
            </View>
            <View style={styles.footerBox2}>
                <View style={styles.InputBox}>
                <SelectDropdown data={Filter} defaultValue={Filter[0]} buttonStyle={{width: '100%', height: '100%', borderWidth: 1}}
          buttonTextStyle={{fontSize: 13}} rowTextStyle={{fontSize: 14}}
	        onSelect={(selectedItem, index) => {
		          console.log(selectedItem, index)
          	}}
            renderDropdownIcon={isOpened => {
              return <Icon name={isOpened ? 'angle-up' : 'angle-down'} color={'#444'} size={18} />;
            }}
            />
                </View>
                <TextInput style={styles.InputBox} placeholder='브랜드명/제품명(필수)' placeholderTextColor={'#9E9E9E'}></TextInput>
                <TextInput style={styles.InputBox} placeholder='가격(원)' placeholderTextColor={'#9E9E9E'}></TextInput>
            </View>
        </View>
    </View>
  )
}

export default Main