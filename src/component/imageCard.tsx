// components/ImageCard.tsx
import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

interface ImageCardProps {
  imageSource: any; // Tipe untuk sumber gambar
  title: string; // Judul yang ditampilkan
  targetScreen: string; // Nama screen yang ingin dituju
  params?: object; // Parameter opsional untuk navigasi
}

const ImageCard: React.FC<ImageCardProps> = ({
  imageSource,
  title,
  targetScreen,
  params,
}) => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate(targetScreen, params); // Navigasi ke screen target dengan parameter
  };

  return (
    <View style={styles.imageContainer}>
      <TouchableOpacity onPress={handlePress}>
        <Image source={imageSource} style={styles.image} />
        <View style={styles.textOverlay}>
          <Text style={styles.imageText}>{title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: 221,
    borderRadius: 40,
    overflow: 'hidden',
    marginBottom: 16,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textOverlay: {
    position: 'absolute',
    bottom: 28,
    left: 20,
    right: 0,
    height: 'auto', // Tinggi area overlay teks
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  imageText: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ImageCard;
