import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Postcode from '@actbase/react-daum-postcode'

const styles = StyleSheet.create({
    container:{
        height: '100%',
    },
    postBox:{
        height: '100%',
    }
})
const Post = ({navigation}) => {

    const getAddressData = data => {
        let defaultAddress = ''; // 기본주소
        if (data.buildingName === 'N') {
          defaultAddress = data.apartment;
        } else {
            defaultAddress = data.buildingName;
        }
        if(data.userSelectedType === 'R'){
            navigation.navigate('신청 정보', data.roadAddress);
        }else
         {
            navigation.navigate('신청 정보', data.jibunAddress);
        }
    };

  return (
    <View style={styles.container}>
        <Postcode style={styles.postBox} jsOptions={{ animation: true }}
        onSelected={data => getAddressData(data)}
        onError={function (){
        throw new Error('Function not implemented.'); }} />
    </View>
  )
}

export default Post