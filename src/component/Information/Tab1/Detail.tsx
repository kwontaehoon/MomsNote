import React from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Platform, Image, Animated, Share, StatusBar, SafeAreaView} from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import { Video } from 'expo-av';
import { SafeAreaProvider } from 'react-native-safe-area-context' 

import Back from '../../../../public/assets/svg/Back.svg'
import Share2 from '../../../../public/assets/svg/Share.svg'
import Icon from 'react-native-vector-icons/FontAwesome'
import RenderHtml from 'react-native-render-html';

const styles = StyleSheet.create({
    container:{
        height: '97%',
        backgroundColor: 'white',
        marginTop: Platform.OS == 'ios' ? 0 : getStatusBarHeight(),
    },
    header:{
        height: 60,
        justifyContent: 'center',
        padding: 20,
    },
    headerBar:{
        position: 'absolute',
        right: 20,
        alignItems: 'center',
        flexDirection: 'row',
    },
    header2:{
        flexDirection: 'row',
        height: 70,
        alignItems: 'flex-end',
        paddingLeft: 20,
        borderTopWidth: 1,
    },
    profileBox:{
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
    },
    infoBox:{
        height: 42,
        marginLeft: 7,
        borderWidth: 1
    },
    main:{

    },
    mainBox:{
        padding: 20,
    },
    mainBox2:{
        paddingRight: 20,
        paddingLeft: 20,
        paddingBottom: 20,
    },
    mainBox2ImageBox:{
        height: 400,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainBox2ImageBox2:{
        height: 150,
        flexDirection: 'row',
        padding: 10,
    },
    image:{
        width: '95%',
        height: '95%',
        borderRadius: 4,
    },
    image2:{
        width: '100%',
        height: '100%',
        borderRadius: 4,
    },
    imageBox:{
        width: '31%',
        height: 114,
        borderRadius: 4,
        margin: 5,
    },
    videoImage:{
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'white',
        zIndex: 999
    },
    mainBox3:{
        height: 50,
        flexDirection: 'row',
        borderColor: '#F5F5F5',
        borderBottomWidth: 1,
    },
    // tbody:{
    //     borderWidth: 2,
        
    // },
    // table:{
    //     borderWidth: 1,
    //     borderColor: 'red'
    // },
    td:{
        borderWidth: 1,
        flex: 1
    },
    p:{

        flex: 1
    }
  })

const Talk1Sub = ({navigation, route}) => {

    const info = [route.params];

    const ImageBox = () => {
        const arr = [];
        const a = (info[0].savedName.split('|')).filter(x => {
            if(x.charAt(x.length-1) === '4'){ arr.push(x); }else return x;
        });
        
        const infoFiltering = [...arr, ...a];
        switch(true){
    
            case info[0].savedName.split('|').length == 1: return(
                <TouchableOpacity style={styles.mainBox2ImageBox} onPress={()=>navigation.navigate('갤러리', infoFiltering)} activeOpacity={1}>
                    {
                    infoFiltering[0].charAt(infoFiltering[0].length-1) !== '4' ?
                    <Image source={{uri: `https://momsnote.s3.ap-northeast-2.amazonaws.com/board/${infoFiltering[0]}`}} style={styles.image}/>
                    :
                    <Video source={{uri: `https://momsnote.s3.ap-northeast-2.amazonaws.com/board/${infoFiltering[0]}`}} style={styles.image2} resizeMode='cover'/>
                    }
                </TouchableOpacity>
            )
            case info[0].savedName.split('|').length < 4: return(
                <View style={styles.mainBox2ImageBox2}>
                    {infoFiltering.map(x=>{
                        if(x.charAt(x.length-1) === '4'){
                            return (
                                <TouchableOpacity style={styles.imageBox} onPress={()=>navigation.navigate('갤러리', infoFiltering)} activeOpacity={1}>
                                    <View style={styles.videoImage}><Icon name='play' size={17} style={{color: 'white'}}/></View>
                                    <Video source={{uri: `https://momsnote.s3.ap-northeast-2.amazonaws.com/board/${x}`}} style={styles.image2} resizeMode='cover'/>
                                </TouchableOpacity>
                            )
                        }else return (
                            <TouchableOpacity style={styles.imageBox} onPress={()=>navigation.navigate('갤러리', infoFiltering)} activeOpacity={1}>
                                    <Image source={{uri: `https://momsnote.s3.ap-northeast-2.amazonaws.com/board/${x}`}} style={styles.image2}/>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            )
            default: return(
                <View style={styles.mainBox2ImageBox2}>
                    <TouchableOpacity style={styles.imageBox} onPress={()=>navigation.navigate('갤러리', infoFiltering)} activeOpacity={1}>
                        <Image source={{uri: `https://momsnote.s3.ap-northeast-2.amazonaws.com/board/${info[0].savedName.split('|')[0]}`}} style={styles.image2}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.imageBox} onPress={()=>navigation.navigate('갤러리', infoFiltering)} activeOpacity={1}>
                        <Image source={{uri: `https://momsnote.s3.ap-northeast-2.amazonaws.com/board/${info[0].savedName.split('|')[1]}`}} style={styles.image2}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.imageBox} onPress={()=>navigation.navigate('갤러리', infoFiltering)} activeOpacity={1}>
                        <Image source={{uri: `https://momsnote.s3.ap-northeast-2.amazonaws.com/board/${info[0].savedName.split('|')[2]}`}} style={styles.image2}/>
                        <View style={{position: 'absolute', top: '40%', left: '40%'}}><Text style={{color: 'white', fontSize: 20, fontWeight: '600'}}>+{info[0].savedName.split('|').length-3}</Text></View>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    const socialShare = () => {
        Share.share({
            message: `[맘스노트] ${info[0].title}`,
        })
    }

    const renderItem = ({ item }) => (
        <View>
            <View style={styles.header}>
                <Back onPress={()=>navigation.goBack()}/>
                <View style={styles.headerBar}>
                    <TouchableOpacity onPress={socialShare}><Share2 style={{marginRight: 12}}/></TouchableOpacity>
                </View>
            </View>
            <View style={styles.main}>
                <View style={styles.mainBox}>
                    <Text style={{fontSize: 20, fontWeight: '400', marginBottom: 3, lineHeight: 25}}>{item.title}</Text>
                </View>
                <View style={styles.mainBox2}>
                    <RenderHtml source={{html: `${item.contents}`}} tagsStyles={styles}/>
                </View>
                {item.savedName === null ? '' : ImageBox()}
            </View>
        </View>
      );


  return (
    <SafeAreaProvider>

        <SafeAreaView style={{ backgroundColor: 'white' }}>
            <StatusBar />
        </SafeAreaView>

        <SafeAreaView style={styles.container}>
        <FlatList data={info} renderItem={renderItem}
            keyExtractor={index => String(index)}>
        </FlatList>
    </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default Talk1Sub