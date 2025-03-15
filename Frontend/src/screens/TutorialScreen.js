import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';

export default function TutorialScreen({ navigation }) {
  const handleSkip = () => {
    navigation.navigate('Login');
  };
  return (
    <View style={styles.containerNew}>
      <View style={styles.container}>
        <Text style={styles.title}>Tutorial</Text>
        <Text style={styles.description}>
          Watch this quick tutorial to learn how to get started, or skip to explore the app directly!
        </Text>
        <View style={styles.videoContainer}>
          <WebView
            source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/gemsense-45a8b.appspot.com/o/lv_0_20241220194802.mp4?alt=media&token=509522fb-dc02-444b-8b0d-3743c5008238' }}
            style={styles.videoPlayer}
            allowsFullscreenVideo={true}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
            <Text style={styles.skipButtonText}>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerNew: {
    flex: 1,
    backgroundColor: '#FF4913',
  },
  container: {
    flex: 1,
    backgroundColor: '#FF4913',
    padding: 20,
    justifyContent: 'space-around',
  },
  title: {

    textAlign: 'center',
    fontFamily: 'inter',
    fontSize: 48,
    fontWeight: 'bold',
    // marginBottom: 5,
    color: 'white',
  },
  description: {
    fontSize: 28,
    color: 'black',
    fontWeight:'bold',
    
    textAlign: 'center',
    marginBottom: 20,
  },
  videoContainer: {
    width: '100%',
    height: 250,
    marginBottom: "10%",
  },
  videoPlayer: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  buttonContainer: {
    alignItems: 'center', // Center the button horizontally
    marginTop: 20,
  },
  skipButton: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '50%',
  },
  skipButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
