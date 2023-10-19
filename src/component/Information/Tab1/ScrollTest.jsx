import React, {useRef, useState, useEffect} from 'react';
import { FlatList, View, Text,Button, TouchableOpacity, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
    },
    container2: {
  
    },
    header: {
      borderBottomWidth: 1,
      borderColor: '#EEEEEE',
      borderWidth: 1,
    },
    headerBox: {
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerBox2: {
      height: 50,
    },
    scrollBox: {
      width: 70,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2
    },
    main: {
      marginBottom: 100
    },
    main2: {
      borderWidth: 1,
      minHeight: 60,
      flexDirection: 'row',
      padding: 15,
      borderColor: '#F5F5F5',
      alignItems: 'center',
    },
    dateBox: {
      flex: 1,
      display: 'flex',
      alignItems: 'flex-end',
      marginLeft: 10,
    },
  })

const SetCheckBox = () => {

    const data = [
        {
            id: 0,
            title: '전체'
          },
          {
            id: 1,
            title: '전체'
          },
          {
            id: 2,
            title: '전체'
          },
          {
            id: 3,
            title: '전체'
          },
          {
            id: 4,
            title: '전체'
          },
          {
            id: 5,
            title: '전체'
          },
          {
            id: 6,
            title: '전체'
          },
          {
            id: 7,
            title: '전체'
          },
          {
            id: 8,
            title: '전체'
          },
          {
            id: 9,
            title: '전체'
          },
          {
            id: 10,
            title: '전체'
          },
          {
            id: 11,
            title: '전체'
          },
      ];

    const flatListRef = useRef();
    const [selectNumber, setSelectNumber] = useState(8);
    const [week, setWeek] = useState(Array.from({ length: 12 }, () => { return false }));

    useEffect( () => {
      if(flatListRef.current){
          flatListRef.current.scrollToIndex({animated: true, index: selectNumber});
      }
    },[selectNumber])

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.scrollBox} onPress={() => change(item.id)}> 
        <Text style={{
          fontSize: 16, padding: 3, fontWeight: week[item.id] ? 'bold' : '400',
          color: week[item.id] ? 'black' : '#9E9E9E', borderBottomWidth: week[item.id] ? 2 : 0
        }}>{item.id + 1}월</Text>
      </TouchableOpacity>
    );

    return(
      <>
        <View style={{ height: 80 }}>
            <FlatList
                ref={flatListRef}
                initialScrollIndex={0}
                data={data}
                renderItem={renderItem}
                getItemLayout={(data, index) => ({length: 12, offset: 70 * index, index})}
                keyExtractor={item => item.key}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
            />            
        </View>
        <Button
              onPress={ () => setSelectNumber(2)}
              title="클릭!"
              color="#841584"
            />
          </>
    )
}
export default SetCheckBox;