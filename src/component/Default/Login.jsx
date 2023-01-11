import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Platform, Button } from 'react-native'
import Slick from 'react-native-slick'
import { getStatusBarHeight } from "react-native-status-bar-height"
import { WithLocalSvg } from "react-native-svg"
import Kakao from '../../../public/assets/svg/kakao.svg'
import Apple from '../../../public/assets/svg/apple.svg'
import GoogleIcon from '../../../public/assets/svg/google.svg'
import Logo from '../../../public/assets/svg/Logo.svg'
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import * as AppleAuthentication from 'expo-apple-authentication'
import * as Linking from 'expo-linking';
import axios from 'axios'
import Modal from './Modal/WithdrawModal'


const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        marginTop: getStatusBarHeight(),
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
    
    const [modal, setModal] = useState(false); // 회원탈퇴시 모달창

    const [googleToken, setGoogleToken] = useState([]);
    console.log('googleToken: ', googleToken);
    
    const [kakaoToken, setKakaoToken] = useState([]);
    console.log('kakaoToken: ', kakaoToken);

    const [AppleToken, setAppleToken] = useState([]);
    console.log('AppleToken: ', AppleToken);

    WebBrowser.maybeCompleteAuthSession();
    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: '444409448687-7dlgufei4unruhfnpq0o885t4paq1bc0.apps.googleusercontent.com',
        // expo: 'https://auth.expo.io/@gju04195/Project1Type',
        iosClientId: '444409448687-r6mi5mhrcc1hifm978d7t4lqaia89tps.apps.googleusercontent.com',
        androidClientId: '444409448687-617ta8ugivu8ekfeh1fuiq6nsup96vc9.apps.googleusercontent.com',
      });

    React.useEffect(() => {
        if (response?.type === 'success') {
            const { authentication } = response;
            console.log('Google: ', authentication);
            GoogleGetId(authentication.accessToken);
        }
    }, [response]);

    useEffect(()=>{
        route !== undefined ? setModal(!modal) : ''
    }, [route]);

    const GoogleGetId = async(googleAccessToken) => {
        try{
            const response = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${googleAccessToken}`);
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
            })
            response2.data.status !== 'success' ?  navigation.navigate('추가 정보 입력', ['google', response.data.sub]) : navigation.navigate('main');


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

    const IosLogin = () => {
        if(Platform.OS === 'ios'){
            return(
            <AppleAuthentication.AppleAuthenticationButton
                buttonType={AppleAuthentication.AppleAuthenticationButtonType.FULL_NAME}
                buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
                cornerRadius={5}
                style={{ width: 200, height: 44 }}
                onPress={async () => {
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
                }}
            />
            )
        }else{

            // return(
            //     <TouchableOpacity style={[styles.footerBox, {backgroundColor: '#000000'}]}>
            //         <View style={styles.iconBox}><WithLocalSvg width={22} height={20} asset={apple}/></View>
            //         <Text style={{color: 'white', fontWeight: '400'}}>Apple로 시작하기</Text>
            //     </TouchableOpacity>
            // )
        }
    }



  return (
    <View style={styles.container}>

        <Modal modal={modal} setModal={setModal}/>

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
            <IosLogin />
            <TouchableOpacity style={[styles.footerBox, {backgroundColor: '#000000'}]}>
                <View style={styles.iconBox}><Apple width={22} height={20}/></View>
                <Text style={{color: 'white', fontWeight: '400'}}>Apple로 시작하기</Text>
            </TouchableOpacity> 
        </View>
    </View>
  )
}

export default Main