import React, { useRef, useEffect, useState } from 'react'
import { View, Text, Button, Image, StyleSheet } from 'react-native'
import ViewShot from "react-native-view-shot";

const styles = StyleSheet.create({
    container:{
        height: '100%',
        borderWidth: 3,
    },
    main:{
        borderWidth: 1,
        height: '60%',
    },
    box:{
        width: 400,
        height: 400,
        borderWidth: 1,
    },
    captureView:{
        borderWidth: 1,
        height: 200,
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

  return (
    <View style={styles.container}>
        <ViewShot ref={ref} options={{ fileName: "Your-File-Name", width: 400, height: 400, format: "png", quality: 1 }} style={styles.captureView}>
                <Text>gggggggggg</Text>
                <Text>aa</Text>
                <Text>bb</Text>
        </ViewShot>
        <View style={styles.main}>
            <View style={styles.box}>
                <Image source={{uri: test}} style={styles.image} resizeMode='cover'/>
            </View>
        </View>
        <Button title='캡쳐' onPress={capture}></Button>
    </View>
  )
}

export default CaptureRef