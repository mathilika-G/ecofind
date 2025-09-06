import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import Header from '../components/Header';
import { AuthContext } from '../context/AuthContext';

export default function DashboardScreen({ navigation }) {
  const { user, updateProfile, signOut } = useContext(AuthContext);
  const [username, setUsername] = useState(user?.username || '');

  const save = async () => {
    await updateProfile({ username });
    Alert.alert('Saved', 'Profile updated');
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title="Dashboard" showBack onBack={() => navigation.goBack()} />
      <View style={{ padding: 16 }}>
        <View style={{ alignItems: 'center', marginBottom: 16 }}>
          <Image source={require('../assets/placeholder.png')} style={{ width: 92, height: 92, borderRadius: 46 }} />
        </View>

        <Text>Email</Text>
        <Text style={{ marginBottom: 12 }}>{user?.email}</Text>

        <Text>Username</Text>
        <TextInput value={username} onChangeText={setUsername} style={styles.input} />

        <TouchableOpacity style={styles.saveBtn} onPress={save}><Text style={{ color: 'white' }}>Save</Text></TouchableOpacity>

        <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('MyListings')}><Text>My Listings</Text></TouchableOpacity>
        <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Purchases')}><Text>Previous Purchases</Text></TouchableOpacity>

        <TouchableOpacity style={styles.signout} onPress={() => { signOut(); navigation.replace('Login'); }}>
          <Text style={{ color: 'white' }}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: { borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 12 },
  saveBtn: { backgroundColor: '#2e8b57', padding: 12, borderRadius: 8, alignItems: 'center', marginBottom: 12 },
  link: { paddingVertical: 10 },
  signout: { marginTop: 20, backgroundColor: '#e74c3c', padding: 12, borderRadius: 8, alignItems: 'center' }
});
