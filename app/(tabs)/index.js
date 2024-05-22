import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Header from './Pages/Header';
import Home from './Pages/Home';
import Registration from './Pages/Registration';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import { UserProvider } from './Pages/UserContext';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(null); // Start with null or an initial value

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Home':
        return <Home setCurrentScreen={setCurrentScreen} />;
      case 'Registration':
        return <Registration setCurrentScreen={setCurrentScreen} />;
      case 'Login':
        return <Login setCurrentScreen={setCurrentScreen} />;
      case 'Profile':
        return <Profile setCurrentScreen={setCurrentScreen} />;
      default:
        // If currentScreen is null or undefined, render the default view (Login and Registration links)
        return (
          <View style={styles.defaultView}>
            <Header setCurrentScreen={setCurrentScreen} />
          </View>
        );
    }
  };

  return (
    <UserProvider> {/* Wrap your App component with UserProvider */}
      <View style={styles.container}>{renderScreen()}</View>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  defaultView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
});
