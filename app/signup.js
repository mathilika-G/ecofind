import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Header from '../components/Header';
import { AuthContext } from '../context/AuthContext';

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { signUp } = useContext(AuthContext);

  const onSignup = async () => {
    const res = await signUp(email.trim(), password, username.trim());
    if (res.success) {
      Alert.alert('Success', 'Account created');
      navigation.replace('Index');
    } else {
      Alert.alert('Error', res.message || 'Could not sign up');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header title="EcoFinds" />
      <View style={styles.container}>
        <Text style={styles.title}>Create Account</Text>
        <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" />
        <TextInput placeholder="Username" value={username} onChangeText={setUsername} style={styles.input} />
        <TextInput placeholder="Password" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
        <TouchableOpacity style={styles.button} onPress={onSignup}><Text style={styles.buttonText}>Sign up</Text></TouchableOpacity>

        <View style={{ flexDirection: 'row', marginTop: 16 }}>
          <Text>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}><Text style={{ color: '#2e8b57' }}>Log in</Text></TouchableOpacity>
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
