'use client';

import { Note } from '@/types/note';
import css from './NotePreview.client.module.css';

interface NotePreviewProps {
  note: Note;
}

export default function NotePreview({ note }: NotePreviewProps) {
  return (
    <div className={css.container}>
      <h2 className={css.title}>{note.title}</h2>
      <p className={css.text}>{note.content}</p>
      {note.tag && <span className={css.tag}>#{note.tag}</span>}
    </div>
  );
}
