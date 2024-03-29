import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform, SafeAreaView, StatusBar,BackHandler } from 'react-native'
import Kakao from '../../../public/assets/svg/kakao.svg'
import Apple from '../../../public/assets/svg/apple.svg'
import GoogleIcon from '../../../public/assets/svg/google.svg'
import Logo from '../../../public/assets/svg/Logo.svg'
import Logo2 from '../../../public/assets/svg/Logo2.svg'
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import * as AppleAuthentication from 'expo-apple-authentication';
import axios from 'axios'
import Modal from './Modal/Withdraw'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useIsFocused } from '@react-navigation/native'
import {
    SafeAreaProvider,
  } from 'react-native-safe-area-context';
import jwtDecode from 'jwt-decode'

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#41BDCC',
    },
    header:{
        height: '10%',
        backgroundColor: '#FAA61A',
        alignItems: 'center',
        justifyContent: 'center'
    },
    main:{
        height: '60%',
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

    const [modal, setModal] = useState(false);

    useEffect(()=>{
        if(route?.params == 'expire'){
            setModal(true);
        }

        const backAction = () => {
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);

    WebBrowser.maybeCompleteAuthSession();
    
    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: '673560692803-8gner3okerjtf8444afhnqptdjfeh6vl.apps.googleusercontent.com',
        // expo: '673560692803-8gner3okerjtf8444afhnqptdjfeh6vl.apps.googleusercontent.com',
        iosClientId: '673560692803-h11u319oi5pni5p6ng84ddvkm3gt6p21.apps.googleusercontent.com',
        androidClientId: '673560692803-b20hb831hqiqh9u1ndvr7dntsr7hdl3h.apps.googleusercontent.com',
      });

    React.useEffect(() => {
        if (response?.type === 'success') {
            const { authentication } = response;
            GoogleGetId(authentication.accessToken);
        }
    }, [response]);

    const GoogleGetId = async(googleAccessToken) => {
        try{
            const response = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${googleAccessToken}`);
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
            const decode = jwtDecode(response2.data.token);
            AsyncStorage.setItem('token', response2.data.token);
            AsyncStorage.setItem('userId', String(decode.id));
                        
            if(response2.data.status == 'success'){
                try{
                    const response3 = await axios({
                        method: 'get',
                        headers: { 
                          'Authorization': `bearer ${response2.data.token}`, 
                          'Content-Type': 'application/json'
                        },
                        url: 'https://momsnote.net/api/main/data',
                    });
                    AsyncStorage.setItem('user', JSON.stringify(response3.data.data));
                    }catch(error){
                        return undefined;
                    }

                navigation.reset({routes: [{name: "main"}]});
                AsyncStorage.setItem('login', '2');
            }else if(response2.data.status == 'expire'){
                setModal(!modal);
                return;
            }else{
                navigation.navigate('추가 정보 입력', ['google', response.data.sub, response.data.email]);
            }


        }catch(error){

        }
    }

    const FocusAwareStatusBar = () => {
        const isFocused = useIsFocused();
        return isFocused ? <StatusBar backgroundColor='#FAA61A' /> : null;
    }

  return (

    <SafeAreaProvider>
        <SafeAreaView style={{ backgroundColor: '#FAA61A' }}>
                <StatusBar />
            </SafeAreaView>
            <FocusAwareStatusBar />
        <SafeAreaView style={[styles.container, {marginBottom: Platform.OS == 'ios' ? 30 : 0}]}>

            <Modal navigation={navigation} route={route} modal={modal} setModal={setModal}/>

            <View style={styles.header}>
                <View style={{position: 'absolute', bottom: '-25%'}}><Logo2 /></View>
            </View>

            <View style={styles.main}>
                <Logo />
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={[styles.footerBox, {backgroundColor: '#FEE500'}]} onPress={()=>navigation.navigate('카카오 로그인', {modal, setModal})}>
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
                        const decode = await jwtDecode(credential.identityToken);
                        AsyncStorage.setItem('userId', decode.email);

                        const response = await axios({
                            method: 'post',
                            url: 'https://momsnote.net/login',
                            headers: { 
                            'Content-Type': 'application/json'
                            },
                            data : {
                                username: `apple_${decode.sub}`
                            }
                        });
                        AsyncStorage.setItem('token', response.data.token);
                        
                        if(response.data.status == 'success'){
                            try{
                                const response2 = await axios({
                                    method: 'get',
                                    headers: { 
                                      'Authorization': `bearer ${response.data.token}`, 
                                      'Content-Type': 'application/json'
                                    },
                                    url: 'https://momsnote.net/api/main/data',
                                });
                                AsyncStorage.setItem('user', JSON.stringify(response2.data.data));
                                }catch(error){
                                    return undefined;
                                }
            
                            navigation.reset({routes: [{name: "main"}]});
                            AsyncStorage.setItem('login', '2');
                        }else if(response.data.status == 'expire'){
                            setModal(!modal);
                        }else{
                            navigation.navigate('추가 정보 입력', ['apple', decode.sub, decode.email]);
                        }
                        
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