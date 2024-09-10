import { View, TextInput } from 'react-native';
import React from 'react';

export default function InputFieldCom({
  placeholder,
  keyboardType = 'default',
  secureTextEntry = false
}) {
  return (
    <View
      style={{
        width: 300,
        height: 50,
        backgroundColor: '#FFD1C4',
        paddingHorizontal: 10,
        marginBottom: 20,
      }}
    >
      <TextInput
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        style={{
          height: '100%',
          color: '#fff',
        }}
      />
    </View>
  );
}
