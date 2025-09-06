import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Picker } from 'react-native';
import Header from '../components/Header';
import { ProductContext } from '../context/ProductContext';
import categories from '../utils/categories';

export default function AddProductScreen({ navigation }) {
  const { addProduct } = useContext(ProductContext);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const onSubmit = async () => {
    if (!title.trim() || !price.trim()) {
      Alert.alert('Validation', 'Please provide at least title and price.');
      return;
    }
    await addProduct({
      title: title.trim(),
      category,
      description: description.trim(),
      price: Number(price),
      image: null // placeholder image path used in ProductCard
    });
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title="Add New Product" showBack onBack={() => navigation.goBack()} />
      <View style={styles.container}>
        <TextInput placeholder="Product Title" value={title} onChangeText={setTitle} style={styles.input} />
        <Text style={{ marginBottom: 6 }}>Category</Text>
        <View style={styles.pickerWrap}>
          <Picker selectedValue={category} onValueChange={(v) => setCategory(v)}>
            {categories.map((c) => <Picker.Item key={c} label={c} value={c} />)}
          </Picker>
        </View>
        <TextInput placeholder="Description" value={description} onChangeText={setDescription} style={[styles.input, { height: 100 }]} multiline />
        <TextInput placeholder="Price" value={price} onChangeText={setPrice} style={styles.input} keyboardType="numeric" />
        <TouchableOpacity style={styles.uploadBtn}><Text>＋ Add Image (Placeholder)</Text></TouchableOpacity>
        <TouchableOpacity style={styles.submitBtn} onPress={onSubmit}><Text style={{ color: 'white', fontWeight: '700' }}>Submit Listing</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  input: { borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 12 },
  pickerWrap: { borderWidth: 1, borderRadius: 8, marginBottom: 12 },
  uploadBtn: { borderWidth: 1, padding: 12, borderRadius: 8, alignItems: 'center', marginBottom: 12 },
  submitBtn: { backgroundColor: '#2e8b57', padding: 14, borderRadius: 8, alignItems: 'center' }
});
