import React, { useRef, useCallback } from 'react'
import { Text, View, Button } from 'react-native'
import Slick from 'react-native-swiper'
import { Navigation } from 'react-native-swiper';

var styles = {
    container:{
        height: 500,
    },
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
}

const SlideTest2 = () => {

    const sliderRef = useRef(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  const navigationNextRef = useRef(null);
  const navigationPrevRef = useRef(null);

    return(
        <View style={styles.container}>
        <Slick style={styles.wrapper}
        modules={[Navigation]}
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.navigation.nextEl = navigationNextRef.current;
          swiper.navigation.prevEl = navigationPrevRef.current;
        }}>
            <View testID="Hello" style={styles.slide1}>
            <Text style={styles.text}>Hello Slick</Text>
            </View>
            <View testID="Beautiful" style={styles.slide2}>
            <Text style={styles.text}>Beautiful</Text>
            </View>
            <View testID="Simple" style={styles.slide3}>
            <Text style={styles.text}>And simple</Text>
            </View>
        </Slick>
        <Button title='다음' ref={navigationNextRef}/>
        <Button title='이전' ref={navigationPrevRef}/>
        </View>
    )
}

export default SlideTest2;