import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const InformationScreen = ({route, navigation}) => {
  let {prediction, title, description, imageSource} = route.params || {};
  const vegetableData = require('../data/tanaman.json'); // Mengambil data dari file tanaman.json

  console.log('Prediction yang diterima:', prediction);

  let selectedVegetable = null;
  const cleanPrediction =
    typeof prediction === 'string' ? prediction.split(' ')[0] : '';

  if (cleanPrediction) {
    selectedVegetable = vegetableData.find(
      veg => veg.identifier.toLowerCase() === cleanPrediction.toLowerCase(),
    );
  }

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Image
          source={require('../icon/back-arrow.png')}
          style={styles.backIcon}
        />
      </TouchableOpacity>
      <Text style={styles.title}>
        {selectedVegetable?.nama || title || 'Data Tidak Ditemukan'}
      </Text>

      <Image
        source={imageSource || require('../img/dummy-image.jpg')}
        style={styles.image}
      />

      <Text style={styles.description}>
        {selectedVegetable?.deskripsi ||
          description ||
          'Tidak ada informasi lebih lanjut.'}
      </Text>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Nama Ilmiah:</Text>
        <Text style={styles.value}>
          {selectedVegetable?.nama_ilmiah || '-'}
        </Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Asal:</Text>
        <Text style={styles.value}>{selectedVegetable?.asal || '-'}</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Suhu Ideal:</Text>
        <Text style={styles.value}>{selectedVegetable?.suhu_ideal || '-'}</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Musim Tanam:</Text>
        <Text style={styles.value}>
          {selectedVegetable?.musim_tanam || '-'}
        </Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Jenis Tanah:</Text>
        <Text style={styles.value}>
          {selectedVegetable?.jenis_tanah || '-'}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff', padding: 16},
  title: {fontSize: 24, fontWeight: 'bold', color: '#4CAF50', marginBottom: 10},
  image: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#e0e0e0',
  },
  description: {fontSize: 16, color: '#333', marginBottom: 20},
  infoBox: {
    backgroundColor: '#f7f7f7',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
  },
  label: {fontSize: 16, fontWeight: '600', color: '#4CAF50'},
  value: {fontSize: 16, color: '#333', marginTop: 4},
  backButton: {
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    marginBottom: 20,
  },
  backButtonText: {color: '#fff', fontWeight: 'bold'},
  backIcon: {
    width: 30,
    height: 30,
  },
});

export default InformationScreen;
