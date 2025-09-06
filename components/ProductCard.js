import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function ProductCard({ product, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={require('../assets/placeholder.png')} style={styles.img} />
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: '700' }}>{product.title}</Text>
        <Text style={{ marginTop: 6 }}>${product.price}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', padding: 10, borderWidth: 1, borderRadius: 10, marginBottom: 10, alignItems: 'center' },
  img: { width: 64, height: 64, marginRight: 12 }
});
