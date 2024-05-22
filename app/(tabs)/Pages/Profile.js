import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useUser } from './UserContext'; // Import the UserContext
import BurgerBar from './BurgerBar';

export default function Profile({ setCurrentScreen }) {
  const { userEmail } = useUser(); // Access userEmail from the context
  const [profile, setProfile] = useState({
    name: '',
    username: '',
    email: '',
    phoneNumber: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userEmail) return; // If userEmail is not available, do nothing
    fetch(`http://localhost:3000/profile-data?email=${userEmail}`)
      .then((response) => response.json())
      .then((result) => {
        setProfile(result);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching profile data:', error);
        setLoading(false);
      });
  }, [userEmail]); // Fetch profile data when userEmail changes

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BurgerBar setCurrentScreen={setCurrentScreen} />
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.text}>Name : {profile.name} </Text>
      <Text style={styles.text}>Username : {profile.username} </Text>
      <Text style={styles.text}>Email : {profile.email} </Text>
      <Text style={styles.text}>Number : {profile.phoneNumber} </Text>
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
  },
  title: {
    color: 'white',
    fontSize: 32,
  },
});
