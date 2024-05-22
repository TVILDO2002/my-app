import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Animated, Dimensions } from 'react-native';
import Drawer from './Drawer';

export default function BurgerBar({ setCurrentScreen }) {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-Dimensions.get('window').width)).current; // Start off-screen left

  useEffect(() => {
    if (drawerVisible) {
      Animated.timing(slideAnim, {
        toValue: 0, // Slide in to the right
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -Dimensions.get('window').width, // Slide out to the left
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [drawerVisible, slideAnim]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setDrawerVisible(true)}>
        <Text style={styles.burgerText}>☰</Text>
      </TouchableOpacity>
      <Modal
        visible={drawerVisible}
        transparent={true}
        animationType="none"
        onRequestClose={() => setDrawerVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity style={styles.overlayTouchable} onPress={() => setDrawerVisible(false)} />
          <Animated.View style={[styles.drawerContainer, { transform: [{ translateX: slideAnim }] }]}>
            <Drawer setCurrentScreen={setCurrentScreen} />
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10, // Ensure it is above other content
  },
  burgerText: {
    color: 'white',
    fontSize: 30,
  },
  modalOverlay: {
    flex: 1,
    flexDirection: 'row', // Ensure the overlay covers the entire screen
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Make background opaque
  },
  overlayTouchable: {
    flex: 1,
  },
  drawerContainer: {
    width: '60%', // Cover 60% of the screen
    backgroundColor: '#240750',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
