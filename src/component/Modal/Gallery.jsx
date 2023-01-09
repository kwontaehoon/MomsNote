import React from 'react'
import { Text, View, StyleSheet, Image, StatusBar, Button, TouchableOpacity } from 'react-native'
import { getStatusBarHeight } from "react-native-status-bar-height"
import Swiper from 'react-native-swiper'
import { useIsFocused } from '@react-navigation/native'
import { Video, AVPlaybackStatus } from 'expo-av';

import Icon from 'react-native-vector-icons/FontAwesome'
import Close from '../../../public/assets/svg/Close.svg'

const styles = StyleSheet.create({
  wrapper: {},
  container:{
    backgroundColor: 'black',
    height: '97%',
    marginTop: getStatusBarHeight(),
  },
  header:{
    height: '20%',
  },
  closeBox:{
    position: 'absolute',
    right: 20,
    top: 25,
  },
  main:{
    height: '75%',
  },
  mainBox: {
    flex: 1,
  },
  image:{
    width: '100%',
    height: 500,
  },
  videoImage:{
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: 'white',
    zIndex: 999,
},
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  dot:{
    backgroundColor: 'grey',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 8,
    marginRight: 8,
    marginTop: 3,
    marginBottom: 3
  },
  dotActive:{
    backgroundColor: 'white',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 8,
    marginRight: 8,
    marginTop: 3,
    marginBottom: 3
  },
})

const Gallery = ({navigation, route}) => {

  const FocusAwareStatusBar = () => {
    const isFocused = useIsFocused();
    return isFocused ? <StatusBar backgroundColor='black' barStyle={'white'} /> : null;
  }

  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  console.log('이미지 길이: ', route.params);
  const saveName = route.params;
  console.log('saveName: ', saveName);

  return(
    <View style={styles.container}>

      <FocusAwareStatusBar />

        <View style={styles.header}>
          <View style={styles.closeBox}><Close fill={'white'} onPress={()=>navigation.goBack()}/></View>
        </View>
        <View style={styles.main}>

      <Swiper style={styles.wrapper} showsButtons={false} dot={<View style={styles.dot}/>} activeDot={<View style={styles.dotActive}/>}>
        {saveName.map((x) => {
          if(x.charAt(x.length-1) !== '4'){
            console.log('a');
          return(
            <View style={styles.mainBox}>
              <Image source={{uri: `https://momsnote.s3.ap-northeast-2.amazonaws.com/board/${x}`}} style={styles.image} key={x}/>
            </View>
          )}else{
            return(
              <View style={styles.mainBox}>
                {/* <TouchableOpacity style={styles.videoImage}><Icon name='play' size={30} style={{color: 'white'}}
                  onPress={() => status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()}/>
                </TouchableOpacity> */}
                <Video source={{uri: `https://momsnote.s3.ap-northeast-2.amazonaws.com/board/${x}`}}
                  style={styles.image}
                  useNativeControls
                  resizeMode='cover'
                  ref={video}
                  isLooping={false}
                  // onPlaybackStatusUpdate={status => setStatus(() => status)}
                  />
              </View>
            )
          }
        }
      )}
        
      </Swiper>
        
        </View>
    </View>
  )
}

export default Gallery