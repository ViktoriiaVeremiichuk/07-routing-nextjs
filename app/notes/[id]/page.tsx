import Modal from '@/components/Modal/Modal';
import NotePreview from './NotePreview.client';
import { fetchNoteById } from '@/lib/api';

export default async function NoteModalPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const note = await fetchNoteById(id);

  return (
    <Modal>
      <NotePreview note={note} />
    </Modal>
  );
}
