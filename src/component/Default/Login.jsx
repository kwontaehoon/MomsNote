import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Platform, SafeAreaView } from 'react-native'
import Slick from 'react-native-slick'
import { getStatusBarHeight } from "react-native-status-bar-height"
import { WithLocalSvg } from "react-native-svg"
import Kakao from '../../../public/assets/svg/kakao.svg'
import Apple from '../../../public/assets/svg/apple.svg'
import GoogleIcon from '../../../public/assets/svg/google.svg'
import Logo from '../../../public/assets/svg/Logo.svg'
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Linking from 'expo-linking';
import axios from 'axios'
import Modal from './Modal/WithdrawModal'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
    SafeAreaProvider,
    useSafeAreaInsets,
  } from 'react-native-safe-area-context';


const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        padding: 20,
    },
    header:{
        height: '70%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer:{
        height: '30%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    footerBox:{
        width: '90%',
        height: 52,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        borderColor: '#EEEEEE',
        borderWidth: 1, 
    },
    iconBox:{
        position: 'absolute',
        left: 0,
        width: 52,
        height: 52,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
const Main = ({navigation, route}) => {

    console.log('로그인 route: ', route);

    const [googleToken, setGoogleToken] = useState([]);
    console.log('googleToken: ', googleToken);
    
    const [kakaoToken, setKakaoToken] = useState([]);
    console.log('kakaoToken: ', kakaoToken);

    const [AppleToken, setAppleToken] = useState([]);
    console.log('AppleToken: ', AppleToken);

    WebBrowser.maybeCompleteAuthSession();
    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: '673560692803-8gner3okerjtf8444afhnqptdjfeh6vl.apps.googleusercontent.com',
        // expo: 'https://auth.expo.io/@gju04195/Project1Type',
        iosClientId: '673560692803-h11u319oi5pni5p6ng84ddvkm3gt6p21.apps.googleusercontent.com',
        androidClientId: '673560692803-b20hb831hqiqh9u1ndvr7dntsr7hdl3h.apps.googleusercontent.com',
      });

    React.useEffect(() => {
        if (response?.type === 'success') {
            const { authentication } = response;
            console.log('Google: ', authentication);
            GoogleGetId(authentication.accessToken);
        }
    }, [response]);

    const GoogleGetId = async(googleAccessToken) => {
        try{
            const response = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${googleAccessToken}`);
            console.log('response: ', response);
            setGoogleToken(response.data.sub);
            const response2 = await axios({
                method: 'post',
                url: 'https://momsnote.net/login',
                headers: { 
                'Content-Type': 'application/json'
                },
                data : {
                    username: `google_${response.data.sub}`
                }
            });
            console.log('response2: ', response2);
            AsyncStorage.setItem('token', response2.data.token);

            response2.data.status == 'success' ? (navigation.navigate('main'), AsyncStorage.setItem('login', '2')) : navigation.navigate('추가 정보 입력', ['google', response.data.sub]);


        }catch(error){
            console.log('error: ', error);
        }
        // await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${googleAccessToken}`) 
        // .then(function(response){
        //     setGoogleToken(response.data.sub);
        //     navigation.navigate('추가 정보 입력', ['google', response.data.sub]);
        // }).catch(function(error){
        //     console.log('error');
        // })
    }

  return (

    <SafeAreaProvider>
        <SafeAreaView style={{ backgroundColor: 'white' }}></SafeAreaView>

        <SafeAreaView style={[styles.container, {marginBottom: Platform.OS == 'ios' ? 30 : 0}]}>

            <View style={styles.header}>
                <Logo width={230} height={112}/>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={[styles.footerBox, {backgroundColor: '#FEE500'}]} onPress={()=>navigation.navigate('카카오 로그인')}>
                    <View style={styles.iconBox}><Kakao width={22} height={20}/></View>
                    <Text style={{color: '#212121', fontWeight: '400'}}>카카오톡으로 시작하기</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.footerBox, {backgroundColor: '#FFFFFF'}]} onPress={()=>promptAsync()}>
                    <View style={styles.iconBox}><GoogleIcon width={22} height={20}/></View>
                    <Text style={{color: '#212121', fontWeight: '400'}}>Google로 시작하기</Text>
                </TouchableOpacity>

                { Platform.OS == 'ios' ? <TouchableOpacity style={[styles.footerBox, {backgroundColor: '#000000'}]} onPress={ async () => {
                        try {
                        const credential = await AppleAuthentication.signInAsync({
                            requestedScopes: [
                            AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                            AppleAuthentication.AppleAuthenticationScope.EMAIL,
                            ],
                        });
                        // signed in
                        } catch (e) {
                        if (e.code === 'ERR_CANCELED') {
                            // handle that the user canceled the sign-in flow
                        } else {
                            // handle other errors
                        }
                        }
                    }}>
                    <View style={styles.iconBox}><Apple width={22} height={20}/></View>
                    <Text style={{color: 'white', fontWeight: '400'}}>Apple로 시작하기</Text>
                </TouchableOpacity> : ''}
            </View>

        </SafeAreaView>

    </SafeAreaProvider>
  )
}

export default Main