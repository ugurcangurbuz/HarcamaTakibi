import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function UserMenu() {
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();

  const handleProfile = () => {
    setVisible(false);
    // navigation.navigate('Profil'); // Profil ekranı varsa açılır
    alert('Profil ekranı açılacak 👤');
  };

  const handleLogout = () => {
    setVisible(false);
    // Firebase logout işlemi buraya eklenebilir
    alert('Çıkış yapıldı 🚪');
  };

  return (
    <View style={{ marginRight: 10 }}>
      <TouchableOpacity onPress={() => setVisible(true)}>
        <Ionicons name="person-circle-outline" size={28} color="white" />
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setVisible(false)}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback>
              <View style={styles.menu}>
                <TouchableOpacity onPress={handleProfile} style={styles.item}>
                  <Text style={styles.text}>👤 Profil</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLogout} style={styles.item}>
                  <Text style={styles.text}>🚪 Çıkış Yap</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 50,
    paddingRight: 15,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  menu: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 10,
    width: 160,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  }
});