import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { NOTE_COLORS } from '../utils/constants';

interface ColorPickerProps {
  selectedColor?: string;
  onSelectColor: (color: string) => void;
}

export default function ColorPicker({ selectedColor, onSelectColor }: ColorPickerProps) {
  return (
    <View style={styles.container}>
      {Object.entries(NOTE_COLORS).map(([_, color]) => (
        <TouchableOpacity
          key={color}
          style={[
            styles.colorButton,
            { backgroundColor: color },
            selectedColor === color && styles.selected,
          ]}
          onPress={() => onSelectColor(color)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    padding: 16,
  },
  colorButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  selected: {
    borderWidth: 2,
    borderColor: '#000',
  },
});