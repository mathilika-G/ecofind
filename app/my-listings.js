import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Header from '../components/Header';
import { ProductContext } from '../context/ProductContext';
import { AuthContext } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';

export default function MyListingsScreen({ navigation }) {
  const { products, deleteProduct } = useContext(ProductContext);
  const { user } = useContext(AuthContext);

  const myProducts = products.filter((p) => p.ownerId === user?.id);

  return (
    <View style={{ flex: 1 }}>
      <Header title="My Listings" showBack onBack={() => navigation.goBack()} />
      <View style={{ padding: 16, flex: 1 }}>
        <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('AddProduct')}><Text style={{ color: 'white' }}>＋ Add New Product</Text></TouchableOpacity>

        <FlatList
          data={myProducts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <ProductCard product={item} onPress={() => navigation.navigate('ProductDetail', { productId: item.id })} />
              <View style={styles.actions}>
                <TouchableOpacity style={styles.editBtn} onPress={() => navigation.navigate('AddProduct', { editId: item.id })}><Text>Edit</Text></TouchableOpacity>
                <TouchableOpacity style={styles.deleteBtn} onPress={() => deleteProduct(item.id)}><Text style={{ color: 'white' }}>Delete</Text></TouchableOpacity>
              </View>
            </View>
          )}
          ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 40 }}>You haven't listed any products yet.</Text>}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  addBtn: { backgroundColor: '#2e8b57', padding: 12, borderRadius: 8, alignItems: 'center', marginBottom: 12 },
  row: { marginBottom: 14 },
  actions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  editBtn: { padding: 8, borderWidth: 1, borderRadius: 8 },
  deleteBtn: { padding: 8, backgroundColor: '#e74c3c', borderRadius: 8 }
});
