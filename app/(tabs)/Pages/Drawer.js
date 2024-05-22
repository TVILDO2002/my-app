import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Drawer({ setCurrentScreen }) {
  return (
    <View style={styles.drawer}>
      <TouchableOpacity onPress={() => setCurrentScreen('Home')}>
        <Text style={styles.drawerText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setCurrentScreen('Profile')}>
        <Text style={styles.drawerText}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setCurrentScreen(null)}>
        <Text style={styles.drawerText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  drawer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  drawerText: {
    color: 'white',
    fontSize: 20,
    marginVertical: 20,
  },
});
