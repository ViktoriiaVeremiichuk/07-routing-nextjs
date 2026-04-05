'use client';

import css from '../[id]/NoteDetails.client.module.css';
import { Note } from '@/types/note'; 

interface NoteDetailsClientProps {
  note: Note; 
}

function NoteDetailsClient({ note }: NoteDetailsClientProps) {
  

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.tag}>{note.tag}</p>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>
          {new Date(note.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}

export default NoteDetailsClient;