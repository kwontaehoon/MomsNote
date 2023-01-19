import React, {useState} from 'react'
import { View, Text, Dimensions, StyleSheet, ScrollView, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';


    
    const images = [
        'https://cdn.pixabay.com/photo/2023/01/14/09/39/beach-7717811_960_720.jpg',
        'https://cdn.pixabay.com/photo/2023/01/14/06/34/squirrel-7717592_960_720.jpg',
        'https://cdn.pixabay.com/photo/2023/01/12/22/13/rose-7714963_960_720.jpg'
    ]

    const WIDETH = Dimensions.get('window').width;
    const HEIGHT = Dimensions.get('window').height;

const SlideTest = () => {

    const [imgActive, setImgActive] = useState(0);

    const onchange = (nativeEvent) => {
        if(nativeEvent){
            const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
            if(slide != imgActive){
                setImgActive(slide);
            }
        }
    }
    
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.wrap}>
            <ScrollView onScroll={({nativeEvent})=>onchange(nativeEvent)}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            horizontal
            style={styles.wrap}
            >
                {
                    images.map((e, index)=>{
                        return(
                            <Image
                                key={e}
                                resizeMode='stretch'
                                style={styles.wrap}
                                source={{uri: e}}
                                 />
                        )
                    })
                }
                
            </ScrollView>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        borderWidth: 1
    },
    wrap:{
        width: WIDETH,
        height: HEIGHT * 0.45,
        borderWidth: 1
    }
})

export default SlideTest