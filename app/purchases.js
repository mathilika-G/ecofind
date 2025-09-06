import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Header from '../components/Header';
import { ProductContext } from '../context/ProductContext';

export default function CartScreen({ navigation }) {
  const { cartItems, getCartProducts, clearCart, purchaseCart } = useContext(ProductContext);
  const cartProducts = getCartProducts();

  const onPurchase = async () => {
    await purchaseCart();
    Alert.alert('Success', 'Purchase recorded');
    navigation.navigate('Purchases');
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title="Cart" showBack onBack={() => navigation.goBack()} />
      <View style={{ padding: 16, flex: 1 }}>
        <FlatList
          data={cartProducts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={{ fontWeight: '700' }}>{item.title}</Text>
              <Text>${item.price}</Text>
            </View>
          )}
          ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 40 }}>Your cart is empty.</Text>}
        />

        {cartProducts.length > 0 && (
          <>
            <TouchableOpacity style={styles.purchaseBtn} onPress={onPurchase}><Text style={{ color: 'white' }}>Purchase</Text></TouchableOpacity>
            <TouchableOpacity style={styles.clearBtn} onPress={clearCart}><Text>Clear Cart</Text></TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderWidth: 1, padding: 12, borderRadius: 8, marginBottom: 10 },
  purchaseBtn: { backgroundColor: '#2e8b57', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 12 },
  clearBtn: { padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 8 }
});
