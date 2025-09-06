import React, { useContext, useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { ProductContext } from '../context/ProductContext';
import { AuthContext } from '../context/AuthContext';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';

export default function IndexScreen({ navigation }) {
  const { products } = useContext(ProductContext);
  const { user } = useContext(AuthContext);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [filtered, setFiltered] = useState(products);

  useEffect(() => {
    let list = products;
    if (categoryFilter) {
      list = list.filter((p) => p.category === categoryFilter);
    }
    if (search.trim()) {
      list = list.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));
    }
    setFiltered(list);
  }, [products, search, categoryFilter]);

  return (
    <View style={{ flex: 1 }}>
      <Header title="EcoFinds" onProfile={() => navigation.navigate('Dashboard')} showCart onCart={() => navigation.navigate('Cart')} />
      <View style={styles.container}>
        <TextInput placeholder="Search by title..." style={styles.search} value={search} onChangeText={setSearch} />
        <View style={styles.filterRow}>
          {['All', 'Clothing', 'Furniture', 'Electronics', 'Books'].map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.chip, (categoryFilter === null && cat === 'All') || categoryFilter === cat ? styles.chipActive : null]}
              onPress={() => setCategoryFilter(cat === 'All' ? null : cat)}
            >
              <Text style={{ color: (categoryFilter === null && cat === 'All') || categoryFilter === cat ? 'white' : 'black' }}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
            />
          )}
          ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 40 }}>No products found.</Text>}
        />

        <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('AddProduct')}>
          <Text style={{ color: 'white', fontSize: 22 }}>＋</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  search: { borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 12 },
  filterRow: { flexDirection: 'row', marginBottom: 12 },
  chip: { paddingVertical: 6, paddingHorizontal: 10, borderRadius: 20, borderWidth: 1, marginRight: 8 },
  chipActive: { backgroundColor: '#2e8b57', borderColor: '#2e8b57' },
  fab: { position: 'absolute', right: 20, bottom: 24, backgroundColor: '#2e8b57', width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center', elevation: 5 }
});
