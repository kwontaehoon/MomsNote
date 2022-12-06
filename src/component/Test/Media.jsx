import * as MediaLibrary from 'expo-media-library'
import React from 'react'
import { Button, View, } from 'react-native'

export default class App extends React.Component {
  _mediaLibraryAsync = async () => {
    let { status } = await MediaLibrary.requestPermissionsAsync();
    console.log('status: ', status);
    let media = await MediaLibrary.getAssetsAsync({
      mediaType: ['video'],
    })
    let video = await MediaLibrary.getAssetInfoAsync(media.assets[0])

    console.log('media: ', media);
    console.log('video: ', video);

    // if(status === 'granted'){
    //     getPhotos();
    // }
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Button
          onPress={this._mediaLibraryAsync}
          title="Do MediaLibrary Stuff"
        />
      </View>
    );
  }
}
