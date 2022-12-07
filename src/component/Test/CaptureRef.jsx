import React, { useRef, useEffect, useState } from 'react'
import { View, Text, Button, Image, StyleSheet } from 'react-native'
import ViewShot from "react-native-view-shot";
import * as MediaLibrary from 'expo-media-library';


const styles = StyleSheet.create({
    container:{
        height: '100%',
        borderWidth: 3,
    },
    main:{
        borderWidth: 1,
        height: '50%',
    },
    box:{
        width: 400,
        height: 400,
        borderWidth: 1,
    },
    captureView:{
        borderWidth: 1,
        height: 200,
        backgroundColor: 'white'
    },
    image:{
        width: 400,
        height: 400,
    }
})

const CaptureRef = () => {
    const ref = useRef();
    const [test, setTest] = useState();
    console.log('ref: ', ref);
    console.log('test: ', test);

    const capture = () => {
        ref.current.capture().then(uri => {
            console.log("do something with ", uri);
            setTest(uri);
          });
    }
    
    const save = async() => {
        let { status } = await MediaLibrary.requestPermissionsAsync();
        const asset = await MediaLibrary.createAssetAsync(test);
        console.log('status: ', status);
        console.log('asset: ', asset);

        if(status === 'granted'){
            const kwon = await MediaLibrary.getAlbumAsync('DCIM');
            console.log('kwon: ', kwon);
            const album = await MediaLibrary.getAlbumAsync('맘스노트');
            console.log('album: ', album);

            MediaLibrary.createAlbumAsync('맘스노트', asset, true);
            // MediaLibrary.createAlbumAsync('맘스노트', asset, true);
            // const asset = await MediaLibrary.createAssetAsync(test);
        }
       
    }

  return (
    <View style={styles.container}>
        <ViewShot ref={ref} options={{ fileName: "Your-File-Name", width: 400, height: 400, format: "png", quality: 1 }} style={styles.captureView}>
                <Text>g</Text>
                <Text>aa</Text>
                <Text>bb</Text>
        </ViewShot>
        <View style={styles.main}>
            <View style={styles.box}>
                <Image source={{uri: test}} style={styles.image} resizeMode='cover'/>
            </View>
        </View>
        <Button title='캡쳐' onPress={capture}></Button>
        <Button title='저장' onPress={save}></Button>
        
    </View>
  )
}

export default CaptureRef