import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, AppState, Image } from 'react-native';
import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';
import * as Animatable from 'react-native-animatable';
import Sound from 'react-native-sound';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAJBcdBaRdGF3qQpAZ8W1gTqhqX20IQEck',
  authDomain: 'esp32-c256f.firebaseapp.com',
  databaseURL: 'https://esp32-c256f-default-rtdb.firebaseio.com',
  projectId: 'esp32-c256f',
  storageBucket: 'esp32-c256f.appspot.com',
  messagingSenderId: '369949579174',
  appId: '1:369949579174:web:c64f07e84f6ea274faa167',
  measurementId: 'G-Q2M3GE50VR',
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);
  const alertSound = new Sound(require("../song/sms.mp3"), Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log('Failed to load the sound', error);
      return;
    }
  });

  useEffect(() => {
    const onValueChange = database()
      .ref('/sensor1/distance') // Path to your data
      .on('value', snapshot => {
        console.log('Snapshot received:', snapshot.val()); // Debugging log
        if (snapshot.exists()) {
          const fieldValue = snapshot.val(); // Directly get the value
          console.log('Field Value:', fieldValue); // Debugging log
          setValue(fieldValue);
          if (fieldValue < 20) {
            if (AppState.currentState === 'active') {
              setModalVisible(true);
              alertSound.play((success) => {
                if (!success) {
                  console.log('Sound playback failed due to audio decoding errors');
                }
              });
            }
          } else {
            setModalVisible(false);
          }
        } else {
          console.log('Data does not exist'); // Debugging log
          setError('Data does not exist');
        }
      });

    return () => database().ref('/sensor1/distance').off('value', onValueChange);
  }, []);



  return (
    <View style={styles.container}>
      <Image source={require('../Images/dustbin.png')} style={styles.image} />
      <Text style={styles.title}>Dustbin Monitor</Text>
      {error && <Text style={styles.errorText}>{error}</Text>}
      {value !== null && (
        <Animatable.Text animation="pulse" easing="ease-out" iterationCount="infinite" style={styles.valueText}>
          Value: {value}%
        </Animatable.Text>
      )}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <Animatable.View animation="bounceIn" style={styles.modalView}>
            <Text style={styles.modalText}>Alert</Text>
            <Text style={styles.modalDescription}>
              Dustbin have only {value} %
            </Text>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Close</Text>
            </TouchableOpacity>
          </Animatable.View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#343a40',
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
    fontSize: 20,
  },
  valueText: {
    fontSize: 24,
    color: '#28a745',
    marginBottom: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    color: '#343a40',
  },
  modalDescription: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
    color: '#343a40',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#28a745',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;
