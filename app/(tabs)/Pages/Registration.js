import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import axios from "axios";

export default function Registration({ setCurrentScreen }) {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    email: "",
    phoneNumber: "",
  });
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const [successMessage, setSuccessMessage] = useState(""); // State for success message

  const handleLogin = () => {
    // Perform login logic here
    // For example: validate inputs and authenticate user

    // After successful login, update currentScreen to 'Home'
    setCurrentScreen("Login");
  };

  const handleRegister = () => {
    setErrorMessage(""); // Reset error message
    setSuccessMessage(""); // Reset success message
    
    // Password validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setErrorMessage("Password must be at least 8 characters long, start with a capital letter, and contain at least one number");
      return;
    }

    axios
      .post("http://localhost:3000/register", formData)
      .then((response) => {
        console.log(response.data);
        setSuccessMessage("Account has been created successfully");
        Alert.alert("Success", "Account has been created successfully");
      })
      .catch((error) => {
        console.error("Error registering user:", error);
        if (error.response && error.response.data && error.response.data.error) {
          setErrorMessage(error.response.data.error);
        } else {
          Alert.alert("Error", "Registration failed. Please try again.");
        }
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Registration Form</Text>
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      {successMessage ? <Text style={styles.successText}>{successMessage}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={(text) => setFormData({ ...formData, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={(text) => setFormData({ ...formData, username: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setFormData({ ...formData, password: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setFormData({ ...formData, email: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        keyboardType="numeric"
        onChangeText={(text) => setFormData({ ...formData, phoneNumber: text })}
      />
      <View style={styles.buttonContainer}>
        <Button title="Register" onPress={handleRegister} />
        <Button title="Login" onPress={handleLogin} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    backgroundColor: "white",
    width: 300,
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  successText: {
    color: "green",
    marginBottom: 10,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    gap: 20,
  },
});
