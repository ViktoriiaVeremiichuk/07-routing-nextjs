import NoteList from '@/components/NoteList/NoteList';
import { fetchNotes } from '@/lib/api';

interface NotesFiltersProps {
  params: Promise<{ slug: [string] }>;
}

async function NoteFilters({ params }: NotesFiltersProps) {
  const { slug } = await params;

  const currentTag = slug[0] === 'all' ? undefined : slug[0];
  const data = await fetchNotes({
    page: 1,
    perPage: 12,
    search: '',
    tag: currentTag,
  });

  console.log(data.notes);

  return (
    <div>
      {/* <h1>Notes by filters</h1> */}

      <NoteList notes={data.notes} />
    </div>
  );
}

export default NoteFilters;
