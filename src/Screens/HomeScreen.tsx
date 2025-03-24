import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
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

  const processImage = imageUri => {
    setLoading(true);
    setSelectedImage(imageUri);
    const imageBase64 = imageUri.split('data:image/jpeg;base64,')[1];

    axios({
      method: 'POST',
      url: 'https://classify.roboflow.com/vegetableyolov8classification/1',
      params: {
        api_key: 'RJDr6YuHOWYP1wdFnKbN',
      },
      data: imageBase64,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then(response => {
        setPrediction(response.data);
        setModalVisible(true);
      })
      .catch(error => {
        console.error('Error:', error.message);
      })
      .finally(() => setLoading(false));
  };

  const openCamera = () => {
    launchCamera(
      {mediaType: 'photo', quality: 1, includeBase64: true},
      response => {
        if (!response.didCancel && !response.error && response.assets) {
          processImage(response.assets[0].uri);
        }
      },
    );
  };

  const openGallery = () => {
    launchImageLibrary(
      {mediaType: 'photo', quality: 1, includeBase64: true},
      response => {
        if (!response.didCancel && !response.error && response.assets) {
          processImage(response.assets[0].uri);
        }
      },
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate('HamburgerScreen')}>
          <Image source={require('../icon/menu-bar.png')} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.title}>VegeLens</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput
          placeholder="Search"
          placeholderTextColor="#aaa"
          style={styles.searchInput}
        />
        <Image
          source={require('../icon/search.png')}
          style={styles.searchIcon}
        />
      </View>

      {/* Button Section */}
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

      {/* Image Section */}
      <ScrollView contentContainerStyle={styles.imageSection}>
        <ImageCard
          imageSource={require('../img/tomat.jpg')}
          title="Tomat"
          targetScreen="InformationScreen"
          params={{
            imageSource: require('../img/tomat.jpg'),
            title: 'Tomat',
            description:
              'Tomat (*Solanum lycopersicum*) adalah buah dari keluarga *Solanaceae* yang kaya akan nutrisi, seperti vitamin C, vitamin A, dan likopen, yang bermanfaat untuk kesehatan. Buah ini sering berwarna merah, kuning, atau hijau, tergantung varietasnya, dan digunakan dalam berbagai masakan, baik segar maupun olahan. Tomat tumbuh subur di daerah beriklim hangat dengan paparan sinar matahari yang cukup dan tanah yang subur.',
          }}
        />
      </ScrollView>

      {/* Modal for Prediction Result */}
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
                <Text style={styles.predictionText}>
                  {prediction ? prediction.label : 'No prediction'}
                </Text>
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
  imageSection: {marginTop: 20, paddingHorizontal: 16, alignItems: 'center'},
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  resultImage: {width: 200, height: 200, marginBottom: 10},
  predictionText: {fontSize: 18, fontWeight: 'bold'},
  closeButton: {
    marginTop: 10,
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {color: 'white', fontWeight: 'bold'},
});

export default HomeScreen;
