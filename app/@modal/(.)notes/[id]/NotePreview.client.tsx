'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import css from './NotePreview.client.module.css';

export default function NotePreview() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['notes', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const handleClose = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <Modal onClose={handleClose}>
        <div className={css.message}>Loading note...</div>
      </Modal>
    );
  }

  if (isError || !note) {
    return (
      <Modal onClose={handleClose}>
        <div className={css.message}>Error: Note not found</div>
      </Modal>
    );
  }

  return (
    <Modal onClose={handleClose}>
      <div className={css.container}>
        <div className={css.header}>
          <h2 className={css.title}>{note.title}</h2>

          <button onClick={handleClose} className={css.closeButton}>
            &times;
          </button>
        </div>

        {note.tag && <span className={css.tag}>#{note.tag}</span>}

        <p className={css.text}>{note.content}</p>

        <div className={css.footer}>
          <time className={css.date}>
            Created at: {new Date(note.createdAt).toLocaleDateString()}
          </time>
        </div>
      </div>
    </Modal>
  );
}
