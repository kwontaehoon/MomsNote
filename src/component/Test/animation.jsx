import React, { useRef, useEffect, useState } from 'react';
import { Animated, Text, View, Button } from 'react-native';

const FadeInView = (props) => {
    const animation = useRef(new Animated.Value(0)).current;
    const [scroll, setScroll] = useState(false);
    console.log('scroll: ', scroll);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: scroll ? 0 : 200,
      useNativeDriver: true, // 애니메이션 처리작업을 자바스크립트 엔진이 아닌
      // 네이티브 레벨에서 진행하게 하는 옵션 
    }).start();
  }, [scroll]);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Animated.View style={{width: 200, height: 200, backgroundColor: 'green', translateY: animation}}>
        
        </Animated.View>
        <Button title='버튼' onPress={()=>setScroll(!scroll)}></Button>
    </View>
  );
}

export default FadeInView