export const NOTE_COLORS = {
  red: '#FF3B30',
  orange: '#FF9500',
  yellow: '#FFCC00',
  green: '#34C759',
  mint: '#00C7BE',
  teal: '#30B0C7',
  blue: '#007AFF',
  purple: '#AF52DE',
  pink: '#FF2D55'
} as const;

export type NoteColor = keyof typeof NOTE_COLORS;