import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { useColorScheme } from 'react-native';
import { Search } from 'lucide-react-native';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

export default function SearchBar({ value, onChangeText }: SearchBarProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? '#2a2a2a' : '#f2f2f2' },
      ]}>
      <Search
        size={20}
        color={isDark ? '#888888' : '#999999'}
        style={styles.icon}
      />
      <TextInput
        style={[styles.input, { color: isDark ? '#ffffff' : '#000000' }]}
        placeholder="Search notes..."
        placeholderTextColor={isDark ? '#888888' : '#999999'}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    padding: 12,
    borderRadius: 10,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
});