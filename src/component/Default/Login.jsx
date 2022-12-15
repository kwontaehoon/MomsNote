import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Platform, Button } from 'react-native'
import Slick from 'react-native-slick'
import { getStatusBarHeight } from "react-native-status-bar-height"
import { WithLocalSvg } from "react-native-svg"
import kakao from '../../../public/assets/svg/kakao.svg'
import apple from '../../../public/assets/svg/apple.svg'
import google from '../../../public/assets/svg/google.svg'
import Logo from '../../../public/assets/svg/Logo.svg'
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import * as AppleAuthentication from 'expo-apple-authentication'
import * as Linking from 'expo-linking';
import axios from 'axios'


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
    
    const client_id = '7d1cb1e652f5ee8aaffc2e7ce0547c9b';
    useEffect(()=>{
        if(route !== undefined){
            get();
        }
    }, [route])

    const get = async() => {
        try{
            const response = await axios.get(`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${client_id}&redirect_uri=http://192.168.1.140:19000&code=${route.params}`);
            if(response.status === 200){
                console.log('response: ', response.data.id_token);
            }
        }catch(error){
            console.log('error: ', error);
        }
    }

    const [googleToken, setGoogleToken] = useState([]);
    console.log('googleToken: ', googleToken);

    const [kakaoToken, setKakaoToken] = useState([]);
    console.log('kakaoToken: ', kakaoToken);

    const [AppleToken, setAppleToken] = useState([]);
    console.log('AppleToken: ', AppleToken);

    WebBrowser.maybeCompleteAuthSession();
    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: '444409448687-jjajg2r5i863i00st8npnvs8e704gop2.apps.googleusercontent.com',
        // expo: https://auth.expo.io/@gju04195/Project1Type
        iosClientId: '444409448687-r6mi5mhrcc1hifm978d7t4lqaia89tps.apps.googleusercontent.com',
        androidClientId: '444409448687-617ta8ugivu8ekfeh1fuiq6nsup96vc9.apps.googleusercontent.com',
      });

    React.useEffect(() => {
        if (response?.type === 'success') {
            const { authentication } = response;
            console.log('Google: ', authentication);
            setGoogleToken(authentication.accessToken)
        }
    }, [response]);

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
        <View style={styles.header}>
            <WithLocalSvg width={230} height={112} asset={Logo}/>
        </View>
        <View style={styles.footer}>
            <TouchableOpacity style={[styles.footerBox, {backgroundColor: '#FEE500'}]} onPress={()=>navigation.navigate('카카오 로그인')}>
                <View style={styles.iconBox}><WithLocalSvg width={22} height={20} asset={kakao}/></View>
                <Text style={{color: '#212121', fontWeight: '400'}}>카카오톡으로 시작하기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.footerBox, {backgroundColor: '#FFFFFF'}]} onPress={()=>promptAsync()}>
                <View style={styles.iconBox}><WithLocalSvg width={22} height={20} asset={google}/></View>
                <Text style={{color: '#212121', fontWeight: '400'}}>Google로 시작하기</Text>
            </TouchableOpacity>
            <IosLogin />
            {/* <TouchableOpacity style={[styles.footerBox, {backgroundColor: '#000000'}]}>
                <View style={styles.iconBox}><WithLocalSvg width={22} height={20} asset={apple}/></View>
                <Text style={{color: 'white', fontWeight: '400'}}>Apple로 시작하기</Text>
            </TouchableOpacity>  */}
        </View>
    </View>
  )
}

export default Main