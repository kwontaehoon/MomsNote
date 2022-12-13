import React from 'react'
import { View, Text, Button } from 'react-native'
import axios from 'axios'

const axiosPost = () => {

    const id = 'dd';
    const password = 1234;

    const req = async() => {
        await axios.post(`http://192.168.1.140:4000/api/test?id=${id}&password=${password}`) // req.query
        .then(function(response){
            console.log(response.data);
        }).catch(function(error){
            console.log('error');
        })
    }

    const req2 = async() => {
        await axios.post(`http://192.168.1.140:4000/api/test/id=${id}/password=${password}`)
        .then(function(response){
            console.log(response.data);
        })
    }
  return (
    <View style={{marginTop: 40}}>
        <Button title='요청' onPress={req}></Button>
        <Button title='요청' onPress={req2}></Button>
    </View>
  )
}

export default axiosPost