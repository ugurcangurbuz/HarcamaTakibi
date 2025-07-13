import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';

export default function AddExpenseScreen({ navigation }) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [note, setNote] = useState('');

  const handleSave = async () => {
    if (!amount || !category) return;

    try {
      await addDoc(collection(db, 'expenses'), {
        amount: parseFloat(amount),
        category,
        note,
        date: new Date().toISOString().split('T')[0],
        uid: auth.currentUser?.uid || 'guest'
      });
      navigation.goBack();
    } catch (error) {
      console.log('Hata:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Harcama Ekle</Text>
      <TextInput style={styles.input} placeholder="Tutar (₺)" keyboardType="decimal-pad" value={amount} onChangeText={setAmount} />
      <TextInput style={styles.input} placeholder="Kategori (Yemek, Ulaşım...)" value={category} onChangeText={setCategory} />
      <TextInput style={styles.input} placeholder="Açıklama (isteğe bağlı)" value={note} onChangeText={setNote} />
      <TouchableOpacity onPress={handleSave} style={styles.button}>
        <Text style={styles.buttonText}>Kaydet</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: 'white' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 8, marginBottom: 15 },
  button: { backgroundColor: '#007AFF', padding: 15, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: 'bold' }
});