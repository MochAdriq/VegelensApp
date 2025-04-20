// eslint-disable

import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import ImageCard from '../component/imageCard';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const vegetableData = require('../data/tanaman.json'); // Mengambil data tanaman

  const imageMap = {
    tomato: require('../img/tomat.jpg'),
    radish: require('../img/lobak.jpg'),
    pumpkin: require('../img/labu.jpg'),
    potato: require('../img/kentang.jpg'),
    papaya: require('../img/pepaya.jpg'),
    cucumber: require('../img/mentimun.jpg'),
    cauliflower: require('../img/kembang-kol.jpg'),
    carrot: require('../img/wortel.jpg'),
    capsicum: require('../img/paprika.jpg'),
    cabbage: require('../img/kubis.jpg'),
    broccoli: require('../img/brokoli.jpg'),
    brinjal: require('../img/terong.jpg'),
    bottle_gourd: require('../img/labu-botol.jpg'),
    bitter_gourd: require('../img/pare.jpg'),
    bean: require('../img/kacang-panjang.jpg'),
  };

  useEffect(() => {
    setModalVisible(false);
    setSelectedImage(null);
    setPrediction(null);

    if (searchQuery === '') {
      // Jika search kosong, tampilkan semua data
      setFilteredData(vegetableData);
    } else {
      // Filter berdasarkan nama tanaman (case-insensitive)
      const filtered = vegetableData.filter(veg =>
        veg.nama.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredData(filtered);
    }
  }, [navigation, searchQuery]);

  const handleSeeMore = () => {
    navigation.navigate('InformationScreen', {prediction});
  };

  const processImage = async imageAsset => {
    if (!imageAsset.uri) {
      console.error('URI gambar tidak ditemukan.');
      return;
    }

    setSelectedImage(imageAsset.uri);
    setLoading(true);
    setModalVisible(true); // Tampilkan modal dulu

    try {
      const formData = new FormData();
      formData.append('file', {
        uri: imageAsset.uri,
        name: 'image.jpg',
        type: imageAsset.type || 'image/jpeg',
      });

      const response = await axios.post(
        'https://classify.roboflow.com/vegetableyolov8classification-d883l/1',
        formData,
        {
          params: {
            api_key: 'RJDr6YuHOWYP1wdFnKbN',
          },
          headers: {'Content-Type': 'multipart/form-data'},
        },
      );

      console.log('Response dari Roboflow:', response.data);

      if (response.data && response.data.predictions) {
        const predictionsObj = response.data.predictions;
        let highestConfidence = 0;
        let bestPrediction = 'Tidak ada prediksi yang ditemukan';

        for (const key in predictionsObj) {
          if (predictionsObj[key].confidence > highestConfidence) {
            highestConfidence = predictionsObj[key].confidence;
            bestPrediction = key;
          }
        }

        setPrediction(bestPrediction);
      } else {
        setPrediction('Tidak ada prediksi yang ditemukan');
      }
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      setPrediction('Terjadi kesalahan saat memproses gambar');
    } finally {
      setLoading(false);
    }
  };

  const openCamera = () => {
    launchCamera({mediaType: 'photo', quality: 1}, response => {
      if (!response.didCancel && !response.error && response.assets) {
        processImage(response.assets[0]);
      }
    });
  };

  const openGallery = () => {
    launchImageLibrary({mediaType: 'photo', quality: 1}, response => {
      if (!response.didCancel && !response.error && response.assets) {
        processImage(response.assets[0]);
      }
    });
  };

  const getImageByIdentifier = identifier => {
    const key = identifier.toLowerCase();
    return imageMap[key] || require('../img/dummy-image.jpg');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate('HamburgerScreen')}>
          <Image source={require('../icon/menu-bar.png')} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.title}>VegeLens</Text>
      </View>

      <View style={styles.searchBar}>
        <TextInput
          placeholder="Search"
          placeholderTextColor="#aaa"
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Image
          source={require('../icon/search.png')}
          style={styles.searchIcon}
        />
      </View>

      <View style={styles.buttonSection}>
        <TouchableOpacity style={styles.iconButton} onPress={openGallery}>
          <Image
            source={require('../icon/gallery.png')}
            style={styles.buttonImage}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={openCamera}>
          <Image
            source={require('../icon/camera.png')}
            style={styles.buttonImage}
          />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.imageSection}>
        {filteredData.map(vegetable => (
          <ImageCard
            key={vegetable.identifier}
            imageSource={getImageByIdentifier(vegetable.identifier)}
            title={vegetable.nama}
            targetScreen="InformationScreen"
            params={{
              imageSource: getImageByIdentifier(vegetable.identifier),
              title: vegetable.nama,
              description: vegetable.deskripsi,
              prediction: vegetable.identifier,
            }}
          />
        ))}
      </ScrollView>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {loading ? (
              <ActivityIndicator size="large" color="#4CAF50" />
            ) : (
              <>
                {selectedImage && (
                  <Image
                    source={{uri: selectedImage}}
                    style={styles.resultImage}
                  />
                )}
                <Text
                  style={{fontSize: 16, fontWeight: 'bold', marginBottom: 5}}>
                  Hasil Prediksi:
                </Text>
                <Text style={styles.predictionText}>{prediction}</Text>
                <TouchableOpacity
                  onPress={handleSeeMore}
                  style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>Lihat Selengkapnya</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#4CAF50'},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  icon: {width: 30, height: 30},
  title: {color: '#fff', fontSize: 24, fontWeight: 'bold', marginLeft: 10},
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 16,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  searchInput: {flex: 1, fontSize: 16, color: '#555'},
  searchIcon: {width: 20, height: 20, marginLeft: 5},
  buttonSection: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
    marginHorizontal: 16,
    padding: 16,
  },
  iconButton: {
    width: 70,
    height: 70,
    backgroundColor: '#2E7D32',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonImage: {width: 40, height: 40},
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    padding: 25,
    borderRadius: 20,
    alignItems: 'center',
    width: '85%',
    elevation: 5,
  },

  resultImage: {width: 200, height: 200, marginBottom: 10},
  predictionText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4CAF50',
    marginTop: 15,
    textAlign: 'center',
  },

  closeButton: {
    marginTop: 10,
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },

  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },

  imageSection: {width: 'auto', padding: 16},
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 10,
  },
});

export default HomeScreen;
