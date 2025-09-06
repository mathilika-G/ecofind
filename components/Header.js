import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Header({ title, showBack, onBack, showCart, onCart, onProfile }) {
  return (
    <View style={styles.wrap}>
      {showBack ? <TouchableOpacity onPress={onBack}><Text style={styles.action}>←</Text></TouchableOpacity> : <View style={{ width: 24 }} />}
      <Text style={styles.title}>{title}</Text>
      <View style={styles.right}>
        {showCart && <TouchableOpacity onPress={onCart}><Text style={styles.action}>🛒</Text></TouchableOpacity>}
        <TouchableOpacity onPress={onProfile}><Text style={styles.action}>👤</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { height: 60, paddingHorizontal: 12, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1 },
  title: { fontSize: 18, fontWeight: '700' },
  action: { fontSize: 20 },
  right: { flexDirection: 'row', width: 70, justifyContent: 'space-between' }
});
