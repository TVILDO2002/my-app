import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BurgerBar from "./BurgerBar";

export default function Home({ setCurrentScreen }) {
  const [data, setData] = useState({
    temperature: null,
    humidity: null,
    fahrenheit: null,
    co2: null,
    eco2: null,
    tvoc: null,
    rawh2: null,
    rawethanol: null,
    dust: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/sensor-data')
      .then(response => response.json())
      .then(result => {
        setData(result);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching sensor data:', error);
        setLoading(false);
      });
  }, []);

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
      <Text style={styles.text}>Temperature: {data.temperature} °C</Text>
      <Text style={styles.text}>Humidity: {data.humidity} %</Text>
      <Text style={styles.text}>Fahrenheit: {data.fahrenheit} °F</Text>
      <Text style={styles.text}>CO2: {data.co2} ppm</Text>
      <Text style={styles.text}>eCO2: {data.eco2} ppm</Text>
      <Text style={styles.text}>TVOC: {data.tvoc} ppb</Text>
      <Text style={styles.text}>Raw H2: {data.rawh2}</Text>
      <Text style={styles.text}>Raw Ethanol: {data.rawethanol}</Text>
      <Text style={styles.text}>Dust: {data.dust} µg/m³</Text>
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
    margin: 5,
  },
});
