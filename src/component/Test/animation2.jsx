import React, { useRef, useEffect, useState } from 'react';
import { Animated, Text, View, Button } from 'react-native';

const FadeInView = (props) => {
    const animation = useRef(new Animated.Value(1)).current;
    const [scroll, setScroll] = useState(false);
    console.log('scroll: ', scroll);

  const opacity = () => {
    Animated.timing(animation, {
      toValue: 0,
      useNativeDriver: true, // 애니메이션 처리작업을 자바스크립트 엔진이 아닌
      // 네이티브 레벨에서 진행하게 하는 옵션 
      duration: 500,
    }).start(()=>{
      Animated.timing(animation, {
        toValue: 1,
        useNativeDriver: true,
        duration: 500
      }).start();
    });
  }

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Animated.View style={{width: 200, height: 200, backgroundColor: 'green', opacity: animation}}>
        
        </Animated.View>
        <Button title='버튼' onPress={opacity}></Button>
    </View>
  );
}

export default FadeInView