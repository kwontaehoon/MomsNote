import { useEffect } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import * as ScreenCapture from 'expo-screen-capture';
import * as MediaLibrary from 'expo-media-library';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function ScreenCaptureExample() {
  useEffect(() => {
    if (hasPermissions()) {
      console.log('aaaaaaaaaaaaaaaaaaaaaaaaaa');
      const subscription = ScreenCapture.addScreenshotListener(() => {
        alert('Thanks for screenshotting my beautiful app 😊');
      });
      return () => subscription.remove();
    }
  }, []);

  const hasPermissions = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    return status === 'granted';
  };

  const activate = async () => {
    console.log('activate');
    await ScreenCapture.preventScreenCaptureAsync();
  };

  const deactivate = async () => {
    console.log('deactivate');
    await ScreenCapture.allowScreenCaptureAsync();
  };

  const available = async () => {
    const available = await ScreenCapture.isAvailableAsync();
    console.log('이용가능? ', available);
  };

  return (
    <View style={styles.container}>
      <Button title="Activate" onPress={activate} />
      <Button title="Deactivate" onPress={deactivate} />
      <Button title="Available" onPress={available} />
    </View>
  );
}
