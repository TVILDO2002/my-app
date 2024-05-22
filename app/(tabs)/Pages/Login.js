import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useUser } from './UserContext'; // Import the UserContext

export default function Login({ setCurrentScreen }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { setUserEmail } = useUser(); // Access setUserEmail from the context

  const handleLogin = () => {
    setErrorMessage(''); // Clear any previous error messages

    axios
      .post('http://localhost:3000/login', { email, password })
      .then((response) => {
        console.log(response.data);
        if (response.data.message === 'Login successful') {
          setUserEmail(email); // Set the user's email in the context
          setCurrentScreen('Home');
        } else {
          setErrorMessage(response.data.error);
        }
      })
      .catch((error) => {
        console.error('Error logging in:', error);
        if (error.response && error.response.data && error.response.data.error) {
          setErrorMessage(error.response.data.error);
        } else {
          setErrorMessage('Login failed. Please try again.');
        }
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login Form</Text>
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={handleLogin} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white',
    width: 300,
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 20, // Added gap for spacing between buttons
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});
