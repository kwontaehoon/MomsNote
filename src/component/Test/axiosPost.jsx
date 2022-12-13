import React from 'react'
import { View, Text, Button } from 'react-native'
import axios from 'axios'

const AxiosPost = () => {

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

    const req3 = async() => {
        console.log('req3');
        try{
            const response = await axios.get('http://192.168.219.106:4000/test');
            if(response.status === 200){
                console.log('response: ', response.data);
            }
        }catch(error){
            console.log('error: ', error);
        }
            
    }
  return (
    <View style={{marginTop: 40}}>
        <Button title='Query' onPress={req}></Button>
        <Button title='Body' onPress={req2}></Button>
        <Button title='Get' onPress={req3}></Button>
    </View>
  )
}

export default AxiosPost