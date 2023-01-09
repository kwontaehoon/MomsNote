import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const styles = StyleSheet.create({
    container:{
        height: '100%',
    },
    header:{
        height: '13%',
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: 'white',
    },
    headerBox:{
        width: '75%',
        padding: 5,
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
        width: '25%',
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
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
    mainBox:{
        height: 52,
        padding: 15,
        justifyContent: 'center',
        backgroundColor: 'white',

    },
})
const Main = ({navigation}) => {


    const [image, setImage] = useState(null);
    console.log('image: ', image);

    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }

    let data = new FormData();
    data.append('files', {uri: image, name: 'profile.mp4', type: 'image/png'});

    try{
        const response = await axios({
              method: 'post',
              url: 'https://momsnote.net/profile/upload',
              headers: { 
                'Authorization': 'Bearer token', 
              },
              data: data
            });
            console.log('response: ', response.data);
        }catch(error){
          console.log('error: ', error);
        }

  };

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <View style={styles.headerBox}>
                <TouchableOpacity style={styles.profileBox} onPress={pickImage}>
                    {image === null ? <Image source={require('../../../public/assets/image/baby1.png')} onPress={pickImage}/>
                    :  <Image source={{ uri: image }} style={{ width: 72, height: 72, borderRadius: 36}}/>}
                </TouchableOpacity>
                <View style={styles.infoBox}>
                    <Text style={{fontSize: 20, fontWeight : 'bold'}}>닉네임</Text>
                </View>
            </View>
            <View style={styles.headerBox2}>
                <TouchableOpacity style={styles.editBox} onPress={()=>navigation.navigate('내 정보 수정')}>
                    <Text style={{fontSize: 12}}>내 정보 수정</Text>
                </TouchableOpacity>
            </View>
        </View>
        <View style={{backgroundColor: '#F5F5F5', height: '1%'}}></View>
        <View style={styles.main}>
            <View style={styles.mainBox}><Text style={{fontWeight: 'bold'}}>내 활동 관리</Text></View>
            <View style={styles.mainBox}><Text style={{fontSize: 15}}>내가 쓴 게시물</Text></View>
            <View style={styles.mainBox}><Text style={{fontSize: 15}}>내가 쓴 댓글</Text></View>
            <View style={styles.mainBox}><Text style={{fontSize: 15}} onPress={()=>navigation.navigate('추천 게시물')}>추천한 게시물</Text></View>
            <View style={styles.mainBox}><Text style={{fontSize: 15}} onPress={()=>navigation.navigate('신청한 체험단')}>신청한 체험단</Text></View>
        </View>
        <View style={{backgroundColor: '#F5F5F5', height: '1%'}}></View>
        <View style={styles.main2}>
            <View style={styles.mainBox}><Text style={{fontWeight: 'bold'}}>고객센터</Text></View>
            <View style={styles.mainBox}><Text style={{fontSize: 15}}>어플 이용 가이드</Text></View>
            <View style={styles.mainBox}><Text style={{fontSize: 15}}>카카오톡 초대</Text></View>
            <View style={styles.mainBox}><Text style={{fontSize: 15}} onPress={()=>navigation.navigate('공지사항')}>공지사항</Text></View>
            <View style={styles.mainBox}><Text onPress={()=>navigation.navigate('1:1 문의')}>1:1 문의</Text></View>
        </View>
        <View style={styles.main3}></View>
        <View style={{backgroundColor: '#F5F5F5', height: '8%'}}></View>
    </View>
  )
}

export default Main