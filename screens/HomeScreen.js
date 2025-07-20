import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useIsFocused } from '@react-navigation/native';

export default function HomeScreen({ navigation }) {
  const [total, setTotal] = useState(0);
  const [todayExpenses, setTodayExpenses] = useState([]);
  const isFocused = useIsFocused();

  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  const fetchTodayExpenses = async () => {
    const today = getTodayDate();
    const q = query(
      collection(db, 'expenses'),
      where('date', '==', today),
      where('uid', '==', auth.currentUser?.uid || 'guest')
    );

    const snapshot = await getDocs(q);
    let sum = 0;
    const list = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      sum += data.amount;
      list.push(data);
    });

    setTotal(sum);
    setTodayExpenses(list);
  };

  useEffect(() => {
    if (isFocused) {
      fetchTodayExpenses();
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bugünkü Harcama:</Text>
      <Text style={styles.amount}>{total.toFixed(2)} ₺</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Harcama Ekle')}>
        <Text style={styles.buttonText}>+ Harcama Ekle</Text>
      </TouchableOpacity>

      <Text style={styles.listTitle}>Bugünkü Kayıtlar:</Text>
      <FlatList
        data={todayExpenses}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.category}>{item.category}</Text>
            <Text>{item.amount} ₺</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: 'white' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  amount: { fontSize: 32, fontWeight: 'bold', color: '#007AFF', marginBottom: 20 },
  button: {
    backgroundColor: '#007AFF', padding: 15, borderRadius: 10, alignItems: 'center', marginBottom: 20
  },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  listTitle: { fontSize: 18, fontWeight: '600', marginBottom: 10 },
  item: {
    padding: 10, borderWidth: 1, borderColor: '#ddd', borderRadius: 8,
    marginBottom: 8, flexDirection: 'row', justifyContent: 'space-between'
  },
  category: { fontWeight: 'bold' }
});