import { fetchNoteById } from '@/lib/api';
import NoteDetails from './NoteDetails.client';
import { notFound } from 'next/navigation';
import type { Note } from '@/types/note';

interface NotePageProps {
  params: Promise<{ id: string }>;
}

export default async function NotePage({ params }: NotePageProps) {
  const { id } = await params;
  const note: Note = await fetchNoteById(id);

  if (!note) {
    notFound();
  }

  return (
    <main>
      <NoteDetails note={note} />
    </main>
  );
}
