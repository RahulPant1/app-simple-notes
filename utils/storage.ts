import AsyncStorage from '@react-native-async-storage/async-storage';
import { Note } from '../components/NoteCard';

const NOTES_KEY = '@notes';

export const saveNote = async (note: Note) => {
  try {
    const existingNotes = await getNotes();
    const updatedNotes = [...existingNotes, note];
    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(updatedNotes));
  } catch (error) {
    console.error('Error saving note:', error);
  }
};

export const getNotes = async (): Promise<Note[]> => {
  try {
    const notes = await AsyncStorage.getItem(NOTES_KEY);
    return notes ? JSON.parse(notes) : [];
  } catch (error) {
    console.error('Error getting notes:', error);
    return [];
  }
};

export const deleteNote = async (id: string) => {
  try {
    const notes = await getNotes();
    const filteredNotes = notes.filter((note) => note.id !== id);
    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(filteredNotes));
  } catch (error) {
    console.error('Error deleting note:', error);
  }
};

export const updateNote = async (updatedNote: Note) => {
  try {
    const notes = await getNotes();
    const updatedNotes = notes.map((note) =>
      note.id === updatedNote.id ? updatedNote : note
    );
    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(updatedNotes));
  } catch (error) {
    console.error('Error updating note:', error);
  }
};

export const getNote = async (id: string): Promise<Note | null> => {
  try {
    const notes = await getNotes();
    return notes.find((note) => note.id === id) || null;
  } catch (error) {
    console.error('Error getting note:', error);
    return null;
  }
};