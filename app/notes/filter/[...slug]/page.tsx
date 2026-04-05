import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

interface NoteFiltersProps {
  params: Promise<{ slug: string[] }>;
}

async function NoteFilters({ params }: NoteFiltersProps) {
  const { slug } = await params;

  const currentTag = slug[0] === 'all' ? undefined : slug[0];

  const data = await fetchNotes({
    page: 1,
    perPage: 12,
    search: '',
    tag: currentTag,
  });

  return (
    <main>
      <NotesClient notes={data.notes} />
    </main>
  );
}

export default NoteFilters;
