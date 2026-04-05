'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { fetchNoteById } from '@/lib/api';
import css from './NoteDetails.client.module.css';

export default function NoteDetails() {
  const { id } = useParams<{ id: string }>();

  const { data: note } = useQuery({
    queryKey: ['notes', id],
    queryFn: () => fetchNoteById(id),
  });

  if (!note) return null;

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
