import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

const HamburgerScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../icon/back-arrow.png')} // Ganti dengan ikon panah Anda
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <Image
            source={require('../img/logo.png')} // Path ke logo Anda
            style={styles.logo}
          />
          <Text style={styles.title}>VegeLens</Text>
        </View>
      </View>

      {/* Menu Options */}
      <View style={styles.menuOptions}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Version</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Laporkan</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Keluar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  backIcon: {
    // position: 'absolute',
    top: 10,
    left: 0,
    width: 30,
    height: 30,
    alignSelf: 'flex-start',
  },
  logoContainer: {
    flex: 1, // Memastikan container mengambil ruang penuh
    justifyContent: 'center', // Mengatur elemen di tengah secara vertikal
    alignItems: 'center', // Mengatur elemen di tengah secara horizontal
    right: 14,
  },

  logo: {
    width: 60,
    height: 60,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 10,
  },
  menuOptions: {
    marginTop: 40,
  },
  menuItem: {
    backgroundColor: '#E0E0E0',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  menuText: {
    fontSize: 16,
    color: '#4CAF50',
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  logoutText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
});

export default HamburgerScreen;
