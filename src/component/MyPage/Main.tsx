import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { postUser } from '../../Redux/Slices/UserSlice';

const styles = StyleSheet.create({
    container:{
        height: '100%',
    },
    header:{
        flexDirection: 'row',
        padding: 10,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    headerBox:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileBox:{
        borderRadius: 36,
    },
    infoBox:{
        justifyContent: 'center',
        marginLeft: 10,
    },
    headerBox2:{
        position: 'absolute',
        right: 10,
    },
    editBox:{
        borderWidth: 1,
        borderColor: 'lightgrey',
        borderRadius: 20,
        paddingTop: 8,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 8,
    },
    main:{

    },
    main2:{
    },
    main3:{
    },
    
    mainBox:{
        padding: 16,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
})
const Main = ({navigation}) => {

    const DATA = [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: '전체'
        },
      ];

    const dispatch = useDispatch();
    const user = useSelector(state => { return state.user.data });
    const [userInfo, setUserInfo] = useState();

    const [refresh, setRefresh] = useState(); // 새로고침
    const isFocused = useIsFocused();

    useEffect(()=>{
        dispatch(postUser());
        
        const user = async() => {
            const user = await AsyncStorage.getItem('user');
            setUserInfo(JSON.parse(user));
        }
        user();
    }, [refresh, isFocused]);

    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });


    if (!result.canceled) {
        AsyncStorage.setItem('user', JSON.stringify(Object.assign(userInfo, {profile: result.assets[0].uri})));
    }
    console.log(result.assets[0].uri);

    AsyncStorage.setItem('user', JSON.stringify(Object.assign(userInfo, {profile: result.assets[0].uri})))

    let data = new FormData();
    data.append('file', {uri: result.assets[0].uri, name: 'profile.jpg', type: 'image/jpeg'});
    const token = await AsyncStorage.getItem('token');
    try{
        const response = await axios({
              method: 'post',
              url: 'https://momsnote.net/api/profile/upload',
              headers: { 
                'Authorization': `Bearer ${token}`, 
              },
              data: data
            });
            console.log('response: ', response.data);
        }catch(error){
          console.log('프로필변경 error: ', error);
        }

        setRefresh(result.assets[0].uri);
  };

  const renderItem = ({ item }) => (
    <>
     <View style={styles.header}>
            <View style={styles.headerBox}>
                <TouchableOpacity style={styles.profileBox} onPress={pickImage}>
                    {userInfo.profile == undefined ? <Image source={require('../../../public/assets/image/baby1.png')}/>
                    :  <Image source={{ uri: `https://momsnote.s3.ap-northeast-2.amazonaws.com/profile/${user.profile}` }} style={{ width: 72, height: 72, borderRadius: 36}}/>}
                </TouchableOpacity>
                <View style={styles.infoBox}>
                    <Text style={{fontSize: 20, fontWeight : 'bold'}}>{userInfo.nickname}</Text>
                </View>
            </View>
            <View style={styles.headerBox2}>
                <TouchableOpacity style={styles.editBox} onPress={()=>navigation.navigate('내 정보 수정')}>
                    <Text style={{fontSize: 12}}>내 정보 수정</Text>
                </TouchableOpacity>
            </View>
        </View>
        <View style={{backgroundColor: '#F5F5F5', height: 10}}></View>
        <View style={styles.main}>
            <View style={styles.mainBox}><Text style={{fontWeight: 'bold'}}>내 활동 관리</Text></View>
            <View style={styles.mainBox}><Text style={{fontSize: 15}} onPress={()=>navigation.navigate('내가 쓴 게시물')}>내가 쓴 게시물</Text></View>
            <View style={styles.mainBox}><Text style={{fontSize: 15}} onPress={()=>navigation.navigate('내가 쓴 댓글')}>내가 쓴 댓글</Text></View>
            <View style={styles.mainBox}><Text style={{fontSize: 15}} onPress={()=>navigation.navigate('추천 게시물')}>추천한 게시물</Text></View>
            <View style={styles.mainBox}><Text style={{fontSize: 15}} onPress={()=>navigation.navigate('신청한 체험단')}>신청한 체험단</Text></View>
        </View>
        <View style={{backgroundColor: '#F5F5F5', height: 10}}></View>
        <View style={styles.main2}>
            <View style={styles.mainBox}><Text style={{fontWeight: 'bold'}}>고객센터</Text></View>
            <View style={styles.mainBox}><Text style={{fontSize: 15}} onPress={()=>navigation.navigate('어플 이용 가이드')}>어플 이용 가이드</Text></View>
            <View style={styles.mainBox}><Text style={{fontSize: 15}}>카카오톡 초대</Text></View>
            <View style={styles.mainBox}><Text style={{fontSize: 15}} onPress={()=>navigation.navigate('공지사항')}>공지사항</Text></View>
            <View style={styles.mainBox}><Text onPress={()=>navigation.navigate('1:1 문의')}>1:1 문의</Text></View>
        </View>
        <View style={styles.main3}></View>
        <View style={{backgroundColor: '#F5F5F5', height: '8%'}}></View>
    </>
  );

  return userInfo == undefined ? <View></View> : (
    <View style={styles.container}>
        <FlatList data={DATA} renderItem={renderItem}
            keyExtractor={item => item.id}>
        </FlatList>
    </View>
  )
}

export default Main