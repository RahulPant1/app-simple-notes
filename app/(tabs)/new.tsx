import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Text,
  useColorScheme,
} from 'react-native';
import { router } from 'expo-router';
import { saveNote } from '../../utils/storage';
import ColorPicker from '../../components/ColorPicker';
import DateTimePicker from '../../components/DateTimePicker';

export default function NewNoteScreen() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedColor, setSelectedColor] = useState<string | undefined>();
  const [reminder, setReminder] = useState<Date | null>(null);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  useEffect(() => {
    setTitle('');
    setContent('');
    setSelectedColor(undefined);
    setReminder(null);
  }, []);

  const handleSave = async () => {
    if (title.trim() && content.trim()) {
      const newNote = {
        id: Date.now().toString(),
        title: title.trim(),
        content: content.trim(),
        date: new Date().toISOString(),
        color: selectedColor,
        reminder: reminder?.toISOString(),
      };
      await saveNote(newNote);
      
      setTitle('');
      setContent('');
      setSelectedColor(undefined);
      setReminder(null);
      
      router.back();
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? '#000000' : '#f2f2f2' },
      ]}>
      <TextInput
        style={[
          styles.titleInput,
          {
            backgroundColor: isDark ? '#2a2a2a' : '#ffffff',
            color: isDark ? '#ffffff' : '#000000',
          },
        ]}
        placeholder="Note title"
        placeholderTextColor={isDark ? '#888888' : '#999999'}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[
          styles.contentInput,
          {
            backgroundColor: isDark ? '#2a2a2a' : '#ffffff',
            color: isDark ? '#ffffff' : '#000000',
          },
        ]}
        placeholder="Write your note..."
        placeholderTextColor={isDark ? '#888888' : '#999999'}
        value={content}
        onChangeText={setContent}
        multiline
        textAlignVertical="top"
      />
      <View style={styles.optionsContainer}>
        <Text style={[styles.optionsTitle, { color: isDark ? '#ffffff' : '#000000' }]}>
          Options
        </Text>
        <DateTimePicker
          value={reminder}
          onChange={setReminder}
          onClear={() => setReminder(null)}
        />
        <ColorPicker
          selectedColor={selectedColor}
          onSelectColor={setSelectedColor}
        />
      </View>
      <TouchableOpacity
        style={[
          styles.saveButton,
          { opacity: title && content ? 1 : 0.5 },
          selectedColor && { backgroundColor: selectedColor }
        ]}
        onPress={handleSave}
        disabled={!title || !content}>
        <Text style={styles.saveButtonText}>Save Note</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  titleInput: {
    fontSize: 20,
    fontWeight: '600',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  contentInput: {
    flex: 1,
    fontSize: 16,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  optionsContainer: {
    marginBottom: 16,
  },
  optionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});