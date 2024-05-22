// Header.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function Header({ setCurrentScreen }) {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => setCurrentScreen("Registration")}>
        <Text style={styles.headerText}>Registration</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setCurrentScreen("Login")}>
        <Text style={styles.headerText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    backgroundColor: "black",
  },
  headerText: {
    color: "white",
    fontSize: 20,
    marginHorizontal: 20,
  },
});
