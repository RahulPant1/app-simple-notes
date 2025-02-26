import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker';

interface DateTimePickerProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  onClear: () => void;
}

export default function DateTimePicker({ value, onChange, onClear }: DateTimePickerProps) {
  const [show, setShow] = React.useState(false);

  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <input
          type="datetime-local"
          value={value ? value.toISOString().slice(0, 16) : ''}
          onChange={(e) => {
            const date = e.target.value ? new Date(e.target.value) : null;
            onChange(date);
          }}
          style={{
            padding: 8,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#ccc',
          }}
        />
        {value && (
          <TouchableOpacity onPress={onClear} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setShow(true)} style={styles.button}>
        <Text>{value ? value.toLocaleString() : 'Set Reminder'}</Text>
      </TouchableOpacity>
      {value && (
        <TouchableOpacity onPress={onClear} style={styles.clearButton}>
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
      )}
      {show && (
        <RNDateTimePicker
          value={value || new Date()}
          mode="datetime"
          onChange={(event, date) => {
            setShow(false);
            if (event.type === 'set' && date) {
              onChange(date);
            }
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  button: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  clearButton: {
    padding: 8,
  },
  clearButtonText: {
    color: '#FF3B30',
  },
});