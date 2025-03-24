import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import Modal from 'react-native-modal';
import {BackHandler} from 'react-native';

const HamburgerScreen = ({navigation}) => {
  const [isVersionModalVisible, setVersionModalVisible] = useState(false);
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);

  const toggleVersionModal = () => {
    setVersionModalVisible(!isVersionModalVisible);
  };

  const toggleLogoutModal = () => {
    setLogoutModalVisible(!isLogoutModalVisible);
  };

  const openInstagram = () => {
    Linking.openURL('https://www.instagram.com/vegelens'); // Masukkan link Instagram VegeLens
  };

  const handleLogout = () => {
    // Tambahkan logika logout di sini jika diperlukan
    BackHandler.exitApp();
    console.log('User logged out');
    setLogoutModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../icon/back-arrow.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <Image source={require('../img/logo.png')} style={styles.logo} />
          <Text style={styles.title}>VegeLens</Text>
        </View>
      </View>

      {/* Menu Options */}
      <View style={styles.menuOptions}>
        <TouchableOpacity style={styles.menuItem} onPress={toggleVersionModal}>
          <Text style={styles.menuText}>Version</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={openInstagram}>
          <Text style={styles.menuText}>Laporkan</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={toggleLogoutModal}>
        <Text style={styles.logoutText}>Keluar</Text>
      </TouchableOpacity>

      {/* Version Modal */}
      <Modal
        isVisible={isVersionModalVisible}
        onBackdropPress={toggleVersionModal}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Versi Aplikasi</Text>
          <Text style={styles.modalText}>
            Aplikasi ini berada pada versi 1.0
          </Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={toggleVersionModal}>
            <Text style={styles.closeText}>Tutup</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Logout Confirmation Modal */}
      <Modal
        isVisible={isLogoutModalVisible}
        onBackdropPress={toggleLogoutModal}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Konfirmasi Keluar</Text>
          <Text style={styles.modalText}>Apakah Anda yakin ingin keluar?</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleLogout}>
              <Text style={styles.confirmText}>Ya</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={toggleLogoutModal}>
              <Text style={styles.cancelText}>Tidak</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    width: 30,
    height: 30,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    right: 14,
  },
  logo: {
    width: 60,
    height: 60,
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
    alignItems: 'center',
  },
  menuText: {
    fontSize: 16,
    color: '#4CAF50',
  },
  logoutButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    color: '#fff',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  closeText: {
    color: '#fff',
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  confirmButton: {
    backgroundColor: '#FF5733',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  confirmText: {
    color: '#fff',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  cancelText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default HamburgerScreen;
