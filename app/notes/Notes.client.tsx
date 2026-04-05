'use client';

import css from './Notes.client.module.css';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import SearchBox from '@/components/SearchBox/SearchBox';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import type { NotesResponse } from '@/lib/api';
import { fetchNotes } from '@/lib/api';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

function NotesClient() {
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 12;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 1000);

  const { data, isLoading, isError, isSuccess } = useQuery<NotesResponse>({
    queryKey: ['notes', page, search],
    queryFn: () => fetchNotes(page, perPage, search),
    placeholderData: keepPreviousData,
  });

  if (isError) return <p>Error!</p>;
  if (!data && !isLoading) return <p>No data</p>;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox search={search} onSearch={handleSearch} />

        {isSuccess && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>

        {isModalOpen && (
          <Modal onClose={closeModal}>
            <NoteForm onSuccess={closeModal} />
          </Modal>
        )}
      </header>

      {isLoading ? (
        <p className={css.message}>Loading, please wait...</p>
      ) : data?.notes.length === 0 ? (
        <p className={css.message}>Empty list</p>
      ) : (
        <NoteList notes={data?.notes ?? []} />
      )}
    </div>
  );
}

export default NotesClient;
