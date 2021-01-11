import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
  Image
} from 'react-native';
import firebase from 'firebase'
import db from '../config';

export default class WelcomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };
  }
  userLogin = (username,password)=>{
    firebase.auth().signInWithEmailAndPassword(username,password)
    .then(()=>{
      return Alert.alert("Successfully Logged In")
    })
    .catch((error)=>{
      var errorCode = error.code;
      var errorMessage = error.message;
      return Alert.alert(errorMessage);
    })
  }
  userSignUp = (username,password)=>{
    firebase.auth().createUserWithEmailAndPassword(username,password)
    .then((response)=>{
      return Alert.alert("user Added Successfully")
    })
    .catch((error)=>{
     var errorCode = error.code;
      var errorMessage = error.message;
      return Alert.alert(errorMessage);
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView>
        <Text style={styles.heading}>Welcome</Text>
        <Image source={require('../assets/image.jpg')} style={{width:250,height:250}}/>
          
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={(text) => {
              this.setState({
                username: text,
              });
            }}
          />
          <TextInput
            style={styles.input}
            maxLength={20}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text) => {
              this.setState({
                password: text,
              });
            }}
          />
          <TouchableOpacity
            style={styles.LoginButton}
            onPress={() => this.userLogin(this.state.username,this.state.password)}>
            <Text style={styles.LoginText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.LoginButton}
            onPress={() => this.userSignUp(this.state.username,this.state.password)}>
            <Text style={styles.LoginText}>Sign Up</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  heading: {
    alignSelf: 'center',
    fontSize: 25,
  },
  input: {
    textAlign: 'center',
    borderWidth: 1,
    marginTop: 30,
    borderRadius: 5,
  },
  LoginButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    alignSelf: 'center',
    borderWidth: 0.2,
    marginTop: 20,
    padding: 5,
  },
  LoginText: {
    fontSize: 20,
  },
});
