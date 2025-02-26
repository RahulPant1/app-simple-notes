import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useColorScheme } from 'react-native';
import { router } from 'expo-router';
import { Trash2, Pin, Bell } from 'lucide-react-native';
import { NOTE_COLORS } from '../utils/constants';

export interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
  color?: string;
  isPinned?: boolean;
  reminder?: string;
}

interface NoteCardProps {
  note: Note;
  onDelete: (id: string) => void;
  onTogglePin: (id: string) => void;
}

export default function NoteCard({ note, onDelete, onTogglePin }: NoteCardProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <TouchableOpacity
      style={[
        styles.card,
        { backgroundColor: isDark ? '#2a2a2a' : '#ffffff' },
        note.color && { borderLeftWidth: 6, borderLeftColor: note.color }
      ]}
      onPress={() => router.push(`/note/${note.id}`)}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text
            style={[styles.title, { color: isDark ? '#ffffff' : '#000000' }]}
            numberOfLines={1}>
            {note.title}
          </Text>
          <View style={styles.icons}>
            {note.reminder && (
              <Bell size={16} color={isDark ? '#888888' : '#999999'} />
            )}
            <TouchableOpacity onPress={() => onTogglePin(note.id)}>
              <Pin
                size={16}
                color={note.isPinned ? '#007AFF' : (isDark ? '#888888' : '#999999')}
                fill={note.isPinned ? '#007AFF' : 'none'}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Text
          style={[styles.preview, { color: isDark ? '#bbbbbb' : '#666666' }]}
          numberOfLines={2}>
          {note.content}
        </Text>
        <Text
          style={[styles.date, { color: isDark ? '#888888' : '#999999' }]}>
          {new Date(note.date).toLocaleDateString()}
          {note.reminder && ` • Reminder: ${new Date(note.reminder).toLocaleString()}`}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(note.id)}>
        <Trash2 size={20} color="#FF3B30" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  icons: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    marginRight: 8,
  },
  preview: {
    fontSize: 14,
    marginBottom: 8,
  },
  date: {
    fontSize: 12,
  },
  deleteButton: {
    justifyContent: 'center',
    paddingLeft: 16,
  },
});