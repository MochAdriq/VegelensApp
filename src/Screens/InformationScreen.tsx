import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

const InformationScreen = () => {
  const route = useRoute();
  const {imageSource, title, description} = route.params || {}; // Ambil parameter dari navigasi
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <TouchableOpacity
          style={styles.backButton} // Posisi absolute
          onPress={() => navigation.goBack()}>
          <Image
            source={require('../icon/back-arrow.png')} // Ikon panah kembali
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Image
          source={imageSource} // Gambar diambil dari parameter
          style={styles.image}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 16, // Sesuaikan jarak dari atas
    left: 16, // Sesuaikan jarak dari kiri
    zIndex: 1, // Pastikan tombol back muncul di atas gambar
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  imageContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  textContainer: {
    flex: 1,
    backgroundColor: '#32CD32',
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#ffffff',
  },
  backIcon: {
    // position: 'absolute',
    top: 10,
    left: 0,
    width: 30,
    height: 30,
    alignSelf: 'flex-start',
  },
});

export default InformationScreen;
