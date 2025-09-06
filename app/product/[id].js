import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Header from '../../components/Header';
import { ProductContext } from '../../context/ProductContext';
import { AuthContext } from '../../context/AuthContext';

export default function ProductDetail({ route, navigation }) {
  const { productId } = route.params;
  const { products, addToCart } = useContext(ProductContext);
  const { user } = useContext(AuthContext);

  const product = products.find((p) => p.id === productId);
  if (!product) {
    return (
      <View style={{ flex: 1 }}>
        <Header title="Product" showBack onBack={() => navigation.goBack()} />
        <View style={{ padding: 20 }}><Text>Product not found.</Text></View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Header title="Product Details" showBack onBack={() => navigation.goBack()} />
      <View style={styles.container}>
        <Image source={require('../../assets/placeholder.png')} style={styles.image} />
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price}</Text>
        <Text style={{ fontWeight: '700', marginTop: 8 }}>{product.category}</Text>
        <Text style={{ marginTop: 8 }}>{product.description || 'No description provided.'}</Text>

        <TouchableOpacity style={styles.cartBtn} onPress={() => { addToCart(product.id); Alert.alert('Added', 'Product added to cart'); }}>
          <Text style={{ color: 'white', fontWeight: '700' }}>Add to Cart</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, alignItems: 'center' },
  image: { width: 220, height: 220, marginBottom: 16 },
  title: { fontSize: 20, fontWeight: '700' },
  price: { fontSize: 18, marginTop: 6 },
  cartBtn: { marginTop: 20, backgroundColor: '#2e8b57', padding: 14, borderRadius: 8, alignItems: 'center', width: '100%' }
});
