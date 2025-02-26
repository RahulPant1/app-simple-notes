import React from 'react';
import { StyleSheet, View, FlatList, useColorScheme } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import NoteCard, { Note } from '../../components/NoteCard';
import SearchBar from '../../components/SearchBar';
import { getNotes, deleteNote, updateNote } from '../../utils/storage';

export default function NotesScreen() {
  const [notes, setNotes] = React.useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const loadNotes = async () => {
    const savedNotes = await getNotes();
    setNotes(savedNotes.sort((a, b) => {
      // Sort by pinned status first
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      // Then sort by date
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }));
  };

  useFocusEffect(
    React.useCallback(() => {
      loadNotes();
    }, [])
  );

  const handleDelete = async (id: string) => {
    await deleteNote(id);
    await loadNotes();
  };

  const handleTogglePin = async (id: string) => {
    const note = notes.find(n => n.id === id);
    if (note) {
      const updatedNote = { ...note, isPinned: !note.isPinned };
      await updateNote(updatedNote);
      await loadNotes();
    }
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? '#000000' : '#f2f2f2' },
      ]}>
      <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
      <FlatList
        data={filteredNotes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NoteCard
            note={item}
            onDelete={handleDelete}
            onTogglePin={handleTogglePin}
          />
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    paddingVertical: 8,
  },
});