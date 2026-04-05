import { fetchNoteById } from '@/lib/api';

import Modal from '@/components/Modal/Modal';
import css from '@/components/Modal/Modal.module.css';

interface NotePreviewProps {
  params: Promise<{ id: string }>;
}

async function NotePreview({ params }: NotePreviewProps) {
  const { id } = await params;
  const response = await fetchNoteById(id);

  return (
    <Modal>
      <div className={css.noteContainer}>
        <h3 className={css.noteTitle}>{response.title}</h3>
        <p className={css.noteText}>{response.content}</p>

        {response.tag && (
          <span className={css.noteTag}>Tag: {response.tag}</span>
        )}
      </div>
    </Modal>
  );
}

export default NotePreview;
