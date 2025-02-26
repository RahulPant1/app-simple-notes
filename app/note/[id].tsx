import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Text,
  useColorScheme,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { getNote, updateNote } from '../../utils/storage';
import type { Note } from '../../components/NoteCard';
import ColorPicker from '../../components/ColorPicker';

export default function EditNoteScreen() {
  const { id } = useLocalSearchParams();
  const [note, setNote] = useState<Note | null>(null);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  useEffect(() => {
    loadNote();
  }, [id]);

  const loadNote = async () => {
    if (typeof id === 'string') {
      const loadedNote = await getNote(id);
      setNote(loadedNote);
    }
  };

  const handleSave = async () => {
    if (note && note.title.trim() && note.content.trim()) {
      const updatedNote = {
        ...note,
        title: note.title.trim(),
        content: note.content.trim(),
      };
      await updateNote(updatedNote);
      router.back();
    }
  };

  if (!note) return null;

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
        value={note.title}
        onChangeText={(text) => setNote({ ...note, title: text })}
      />
      <TextInput
        style={[
          styles.contentInput,
          {
            backgroundColor: isDark ? '#2a2a2a' : '#ffffff',
            color: isDark ? '#ffffff' : '#000000',
          },
        ]}
        value={note.content}
        onChangeText={(text) => setNote({ ...note, content: text })}
        multiline
        textAlignVertical="top"
      />
      <ColorPicker
        selectedColor={note.color}
        onSelectColor={(color) => setNote({ ...note, color })}
      />
      <TouchableOpacity
        style={[
          styles.saveButton,
          { opacity: note.title && note.content ? 1 : 0.5 },
          note.color && { backgroundColor: note.color }
        ]}
        onPress={handleSave}
        disabled={!note.title || !note.content}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
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