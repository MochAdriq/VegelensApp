import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
// import StackNavigation from '../Navigation/Navigator';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import ImageCard from '../component/imageCard';

const HomeScreen = () => {
  const navigation = useNavigation();

  const openCamera = () => {
    const option = {
      mediaType: 'photo',
      quality: 1,
    };

    launchCamera(option, res => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('Error');
      }
    });
  };
  const openGallery = () => {
    const option = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(option, res => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('Error');
      }
    });
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
          targetScreen="InformationScreen" // Nama screen tujuan
          params={{
            imageSource: require('../img/tomat.jpg'),
            title: 'Tomat',
            description:
              'Tomat (*Solanum lycopersicum*) adalah buah dari keluarga *Solanaceae* yang kaya akan nutrisi, seperti vitamin C, vitamin A, dan likopen, yang bermanfaat untuk kesehatan. Buah ini sering berwarna merah, kuning, atau hijau, tergantung varietasnya, dan digunakan dalam berbagai masakan, baik segar maupun olahan. Tomat tumbuh subur di daerah beriklim hangat dengan paparan sinar matahari yang cukup dan tanah yang subur.',
          }} // Parameter untuk screen
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4CAF50',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 16,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#555',
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginLeft: 5,
  },
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
  buttonImage: {
    width: 40,
    height: 40,
  },
  imageSection: {
    marginTop: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
});

export default HomeScreen;
