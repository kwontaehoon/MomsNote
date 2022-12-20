import React from 'react'
import { View, Text, Button } from 'react-native'
import axios from 'axios'

const AxiosPost = () => {

    const id = 'dd';
    const password = 1234;

    const req = async() => {
        await axios.post(`http://192.168.1.140:4000/post/test?id=${id}&password=${password}`) // req.query
        .then(function(response){
            console.log(response.data);
        }).catch(function(error){
            console.log('error');
        })
    }


    const req2 = async() => {
        await axios.post(`http://192.168.1.140:4000/post/test`, {
            name: 'kk',
            age: 12,
            married: true
        }).then(function(response){
            console.log(response.data);
        }).catch((error) => {
            console.log('error: ', error);
        })
   }

    const req3 = async() => {
        console.log('req3');
        try{
            const response = await axios.get('https://momsnote.net/policy', {
              params: {sort: "이용약관"}
            });
            if(response.status === 200){
                console.log('response: ', response.data);
            }
        }catch(error){
            console.log('error: ', error);
        }
    }

    const req4 = async() => {
      var data = JSON.stringify({
        "boardId": 19
      });
      
      var config = {
        method: 'post',
        url: 'https://momsnote.net/exp/details',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
      
    }

    const req5 = async() => {
        console.log('req5');
        const data = JSON.stringify({
            "username": "google_1234567890"
          });
          
          var config = {
            method: 'post',
            url: 'https://momsnote.net/login',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    
    const req6 = async() => {
      console.log('req6');
      await axios({
        method: 'post',
        url: 'https://momsnote.net/exp',
        data : {
          order: "new",
          count: 5,
          page: 1
      }
    }).then(function(response){
        console.log(response.data);
    }).catch((error) => {
        console.log('error: ', error);
    })
    }
  return (
    <View style={{marginTop: 40}}>
        <Button title='Query' onPress={req}></Button>
        <View style={{height: 30}}></View>
        <Button title='Body' onPress={req2}></Button>
        <View style={{height: 30}}></View>
        <Button title='Get' onPress={req3}></Button>
        <View style={{height: 30}}></View>
        <Button title='Get2' onPress={req4}></Button>
        <View style={{height: 30}}></View>
        <Button title='postman 코드' onPress={req5}></Button>
        <View style={{height: 30}}></View>
        <Button title='postman 응용' onPress={req6}></Button>
    </View>
  )
}

export default AxiosPost