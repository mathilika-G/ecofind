import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default function InputField(props) {
  return <TextInput {...props} style={[styles.input, props.style]} />;
}

const styles = StyleSheet.create({
  input: { borderWidth: 1, borderRadius: 8, padding: 10 }
});
