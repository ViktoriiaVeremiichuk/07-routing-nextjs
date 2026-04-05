'use client';

import NoteList from '@/components/NoteList/NoteList';
import { Note } from '@/types/note';

interface NotesClientProps {
  notes: Note[];
}

export default function NotesClient({ notes }: NotesClientProps) {
  return (
    <div>
      <NoteList notes={notes} />
    </div>
  );
}
