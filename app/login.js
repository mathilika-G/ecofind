import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Header from '../components/Header';
import { AuthContext } from '../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useContext(AuthContext);

  const onLogin = async () => {
    const res = await signIn(email.trim(), password);
    if (res.success) {
      navigation.replace('Index');
    } else {
      Alert.alert('Login failed', res.message || 'Invalid credentials');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title="EcoFinds" />
      <View style={styles.container}>
        <Text style={styles.title}>Welcome back</Text>
        <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" />
        <TextInput placeholder="Password" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
        <TouchableOpacity style={styles.button} onPress={onLogin}><Text style={styles.buttonText}>Login</Text></TouchableOpacity>

        <View style={{ flexDirection: 'row', marginTop: 16 }}>
          <Text>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}><Text style={{ color: '#2e8b57' }}>Sign up</Text></TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 20 },
  input: { borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 12 },
  button: { backgroundColor: '#2e8b57', padding: 12, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: '700' }
});
